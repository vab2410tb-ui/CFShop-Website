// ========================
// 1. ZALOPAY TYPES
// ========================

export interface ZaloPayOrderPayload {
  app_id: number;
  app_trans_id: string;
  app_user: string;
  app_time: number;
  expire_duration_seconds: number,
  item: string;
  embed_data: string;
  amount: number;
  description: string;
  bank_code: string;
  mac: string;
  callback_url: string;
}

export interface ZaloPayCreateResponse {
  return_code: number;
  return_message: string;
  sub_return_code: number;
  sub_return_message: string;
  order_url?: string;
  zp_trans_token?: string;
}

export interface ZaloPayCallbackRequestBody {
  data: string;
  mac: string;
  type?: number;
}

export interface ZaloPayCallbackData {
  app_id: number;
  app_trans_id: string;
  app_time: number;
  app_user: string;
  amount: number;
  embed_data: string;
  item: string;
  zp_trans_id: number;
  server_time: number;
  channel: number;
  merchant_user_id?: string;
  user_fee_amount?: number;
  discount_amount?: number;
}

export interface ZaloPayCallbackResponse {
  return_code: 1 | 0 | -1;
  return_message: string;
}

// ========================
// 2. VNPAY TYPES
// ========================

export interface VnpayOrderPayload {
  vnp_Version: string;
  vnp_Command: string;
  vnp_TmnCode: string;
  vnp_Locale: string;
  vnp_CurrCode: string;
  vnp_TxnRef: string;
  vnp_OrderInfo: string;
  vnp_OrderType: string;
  vnp_Amount: number;
  vnp_ReturnUrl: string;
  vnp_IpAddr: string;
  vnp_CreateDate: string;
  vnp_SecureHash?: string;
  [key: string]: string | number | undefined;
}

export interface VnpayIpnResponse {
  RspCode: "00" | "01" | "02" | "04" | "97" | "99";
  Message: string;
}