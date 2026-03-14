import { prisma } from "./lib/prisma";

async function main() {
  console.log("Testing prisma query...");
  try {
    const user = await prisma.user.findFirst();
    console.log("Query successful:");
    console.log(user);
  } catch (err) {
    console.error("Prisma error:", err);
  }
}

main().catch(console.error);
