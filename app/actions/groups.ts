"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function addMemberToGroup({
  groupId,
  email,
}: {
  groupId: string;
  email: string;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized." };
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) {
    return { error: "Email is required." };
  }

  const membership = await prisma.groupMember.findUnique({
    where: {
      groupId_userId: {
        groupId,
        userId: session.user.id,
      },
    },
  });

  if (!membership) {
    return { error: "You are not a member of this group." };
  }

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    return { error: "That user is not registered yet." };
  }

  if (user.id === session.user.id) {
    return { error: "You are already in this group." };
  }

  try {
    await prisma.groupMember.create({
      data: {
        groupId,
        userId: user.id,
      },
    });

    return { success: `${user.name || user.email} added to the group.` };
  } catch {
    return { error: "That user is already part of the group." };
  }
}
