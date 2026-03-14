import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  console.log("Emptying database...");
  const hashedPassword = await bcrypt.hash("password123", 10);
  await prisma.settlement.deleteMany({});
  await prisma.expenseSplit.deleteMany({});
  await prisma.expense.deleteMany({});
  await prisma.groupMember.deleteMany({});
  await prisma.groupNote.deleteMany({});
  await prisma.groupInvite.deleteMany({});
  await prisma.group.deleteMany({});
  await prisma.walletTransaction.deleteMany({});
  await prisma.wallet.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Creating users...");
  const alice = await prisma.user.create({
    data: {
      name: "Alice Smith",
      email: "alice@example.com",
      password: hashedPassword,
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: "Bob Jones",
      email: "bob@example.com",
      password: hashedPassword,
    },
  });

  const charlie = await prisma.user.create({
    data: {
      name: "Charlie Brown",
      email: "charlie@example.com",
      password: hashedPassword,
    },
  });

  console.log("Creating group...");
  const group = await prisma.group.create({
    data: {
      name: "Goa Trip",
      description: "Weekend getaway with friends",
      inviteCode: "GOA2026",
    },
  });

  console.log("Adding members to group...");
  await prisma.groupMember.createMany({
    data: [
      { groupId: group.id, userId: alice.id, role: "ADMIN" },
      { groupId: group.id, userId: bob.id, role: "MEMBER" },
      { groupId: group.id, userId: charlie.id, role: "MEMBER" },
    ],
  });

  console.log("Creating expenses...");
  const dinner = await prisma.expense.create({
    data: {
      description: "Dinner at Fisherman's Wharf",
      amount: 3000,
      groupId: group.id,
      payerId: alice.id,
      category: "FOOD",
      splitMethod: "EQUAL",
    },
  });

  await prisma.expenseSplit.createMany({
    data: [
      { expenseId: dinner.id, userId: alice.id, amount: 1000 },
      { expenseId: dinner.id, userId: bob.id, amount: 1000 },
      { expenseId: dinner.id, userId: charlie.id, amount: 1000 },
    ],
  });

  const hotel = await prisma.expense.create({
    data: {
      description: "Hotel booking",
      amount: 9000,
      groupId: group.id,
      payerId: bob.id,
      category: "STAY",
      splitMethod: "EQUAL",
    },
  });

  await prisma.expenseSplit.createMany({
    data: [
      { expenseId: hotel.id, userId: alice.id, amount: 3000 },
      { expenseId: hotel.id, userId: bob.id, amount: 3000 },
      { expenseId: hotel.id, userId: charlie.id, amount: 3000 },
    ],
  });

  console.log("Creating settlements...");
  await prisma.settlement.create({
    data: {
      amount: 500,
      groupId: group.id,
      fromId: charlie.id,
      toId: alice.id,
      status: "COMPLETED",
      method: "APP",
    },
  });

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
