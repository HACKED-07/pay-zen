// lib/settlement.ts
import { prisma } from "@/lib/prisma";

export type SuggestedTransaction = {
  fromUser: string;
  toUser: string;
  amount: number;
};

export async function computeSettlements(
  groupId: string,
): Promise<SuggestedTransaction[]> {
  // 1. Fetch all expenses and their splits for the group
  const expenses = await prisma.expense.findMany({
    where: { groupId },
    include: { splits: true },
  });

  // 2. Calculate the Net Balance for each user
  // Positive balance = Creditor (They are owed money)
  // Negative balance = Debtor (They owe money)
  const balances: Record<string, number> = {};

  for (const expense of expenses) {
    // The payer is owed the total amount of the bill
    balances[expense.payerId] =
      (balances[expense.payerId] || 0) + expense.amount;

    // Everyone in the split (including the payer) owes their specific share
    for (const split of expense.splits) {
      balances[split.userId] = (balances[split.userId] || 0) - split.amount;
    }
  }

  // 3. Separate users into Debtors and Creditors
  const debtors: { userId: string; amount: number }[] = [];
  const creditors: { userId: string; amount: number }[] = [];

  for (const [userId, balance] of Object.entries(balances)) {
    // Rounding to 2 decimal places to avoid floating point math errors
    const roundedBalance = Math.round(balance * 100) / 100;

    if (roundedBalance < 0) {
      debtors.push({ userId, amount: Math.abs(roundedBalance) });
    } else if (roundedBalance > 0) {
      creditors.push({ userId, amount: roundedBalance });
    }
  }

  // Sort by largest amounts first (Greedy approach for optimization)
  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  // 4. Resolve debts
  const suggestedTransactions: SuggestedTransaction[] = [];
  let i = 0; // Debtor index
  let j = 0; // Creditor index

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    // Find the minimum of what the debtor owes and what the creditor is owed
    const settledAmount = Math.min(debtor.amount, creditor.amount);

    suggestedTransactions.push({
      fromUser: debtor.userId,
      toUser: creditor.userId,
      amount: Math.round(settledAmount * 100) / 100, // Keep it clean
    });

    // Update remaining balances
    debtor.amount -= settledAmount;
    creditor.amount -= settledAmount;

    // Move to the next person if their balance is fully settled
    if (debtor.amount < 0.01) i++;
    if (creditor.amount < 0.01) j++;
  }

  return suggestedTransactions;
}
