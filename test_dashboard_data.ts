import { getDashboardData } from './lib/dashboard';
import { prisma } from './lib/prisma';

async function main() {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      console.log('No user found');
      return;
    }
    console.log(`Testing with user: ${user.name} (${user.id})`);
    const data = await getDashboardData(user.id);
    if (data.groups.length > 0) {
      console.log('Activity for first group:');
      console.log(JSON.stringify(data.groups[0].activity, null, 2));
    } else {
       console.log('User has no groups');
    }
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
