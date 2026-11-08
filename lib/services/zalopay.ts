import crypto from "crypto";

export const config = {
  app_id: process.env.ZALOPAY_APP_ID!,
  key1: process.env.ZALOPAY_KEY1!,
  key2: process.env.ZALOPAY_KEY2!,
  endpoint: process.env.ZALOPAY_ENDPOINT!,
};

export function createMac(data: string, key: string): string {
  return crypto.createHmac("sha256", key).update(data).digest("hex");
}