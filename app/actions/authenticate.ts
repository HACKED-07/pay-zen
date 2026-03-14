"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

type AuthState = { error: string };

export async function authenticate(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  try {
    await signIn("credentials", {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirectTo: "/",
    });

    return { error: "" };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Invalid email or password." };
      }

      return { error: "Authentication failed. Please try again." };
    }

    throw error;
  }
}
