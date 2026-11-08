import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

const key2 = process.env.ZALOPAY_KEY2;

if (!key2) {
  throw new Error("Missing ZALOPAY_KEY2");
}

const orderId = "ORD-NAB-1789458657166";

const amount = 7975000;

const callbackData = {
  app_id: Number(process.env.ZALOPAY_APP_ID),
  app_trans_id: "250915_ORDTEST0011234",
  app_time: Date.now(),
  app_user: "nab_coffee_user",
  amount,

  embed_data: JSON.stringify({
    redirecturl:
      `http://localhost:3000/checkout/success?orderId=${orderId}`,
    orderId,
  }),

  item: JSON.stringify([{}]),

  zp_trans_id: 123456789,
  server_time: Date.now(),
  channel: 39,
};

const data = JSON.stringify(callbackData);

const mac = crypto
  .createHmac("sha256", key2)
  .update(data)
  .digest("hex");

console.log("\n========== DATA ==========\n");
console.log(data);

console.log("\n========== MAC ==========\n");
console.log(mac);

console.log("\n========== POSTMAN BODY ==========\n");

console.log(
  JSON.stringify(
    {
      data,
      mac,
      type: 1,
    },
    null,
    2
  )
);