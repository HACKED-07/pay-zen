"use server";

import { prisma } from "@/prisma/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Basic validation
  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  try {
    // 2. Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "An account with this email already exists." };
    }

    // 3. Hash the password
    // 10 is the standard number of salt rounds - a good balance of security and speed
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save the user to the database
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: "Account created successfully! You can now log in." };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
