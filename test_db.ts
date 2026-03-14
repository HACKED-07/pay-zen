import { prisma } from './lib/prisma';

async function main() {
  const groups = await prisma.group.findMany({
    include: {
      expenses: {
        orderBy: { date: 'desc' },
      }
    }
  });

  for (const group of groups) {
    console.log(`Group: ${group.name}`);
    console.log(`Expenses Count: ${group.expenses.length}`);
    for (const exp of group.expenses) {
      console.log(`- ${exp.description} (${exp.amount}) on ${exp.date}`);
    }
    console.log('---');
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
