import crypto from "node:crypto";

export function generateInviteCode() {
  return crypto.randomBytes(4).toString("hex").toUpperCase();
}
