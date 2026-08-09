"use server";

import { cookies } from "next/headers";

import { signOut } from "@/lib/auth";

import type { ActionResult } from "./types";

export async function logout(): Promise<ActionResult> {
  try {
    // Remove any pending login ticket
    const cookieStore = await cookies();

    cookieStore.delete("login-ticket");

    // Sign out from Auth.js
    await signOut({
      redirect: false,
    });

    return {
      success: "Logged out successfully.",
    };
  } catch {
    return {
      error: "Unable to log out. Please try again.",
    };
  }
}