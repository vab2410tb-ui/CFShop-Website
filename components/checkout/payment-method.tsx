import Image from "next/image";
import { Button } from "../ui/button";

export type PaymentMethodType = "cod" | "bank" | "zalopay" | "vnpay";

interface PaymentMethodProps {
  onPlaceOrder: () => void;
  isLoading?: boolean;
  paymentMethod: PaymentMethodType;
  setPaymentMethod: (method: PaymentMethodType) => void;
  children?: React.ReactNode;
}

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
  onPlaceOrder,
  isLoading = false,
  children,
}: PaymentMethodProps) => {
  const imgPayment = [
    { image: "/images/payment-method/logo-visa.png" },
    { image: "/images/payment-method/logo-zalopay.png" },
    { image: "/images/payment-method/ma_symbol.svg" },
  ];

  const payment = (
    <div className="flex gap-2">
      {imgPayment.map((img, i) => (
        <div key={i} className="border flex items-center p-1 rounded-[8px]">
          <Image
            src={img.image}
            alt="card"
            width={35}
            height={25}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );

  const paymentMethods = [
    {
      value: "zalopay",
      label: "Online payment via ZaloPay payment gateway",
      images: payment,
      content: (
        <p>
          You will be redirected to Online Payment via ZaloPay payment gateway to
          complete the purchase process.
        </p>
      ),
    },
    {
      value: "cod",
      label: "Pay on delivery (COD)",
      images: null,
      content: <p>Pay on delivery.</p>,
    },
  ] as const;

  const buttonLabel = paymentMethod === "cod" ? "Place Order" : "Pay Now";

  return (
    <div className="my-[50px]">
      <div className="mb-3">
        <h2 className="text-[20px] font-bold">Payment</h2>
        <p className="text-[#0000008F] text-[14px]">
          All transactions are secure and encrypted.
        </p>
      </div>

      <div className="overflow-hidden border-t-[1px] border-x-[1px] rounded-xl">
        {paymentMethods.map((method) => (
          <div key={method.value} className="border-b-[1px]">
            {/* Header */}
            <label className="flex items-center gap-3 p-4 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value={method.value}
                checked={paymentMethod === method.value}
                onChange={() => setPaymentMethod(method.value)}
                className="peer sr-only"
              />
              <span
                className="
                  relative h-5 w-5 shrink-0 rounded-full border  
                  peer-checked:bg-[#6F7EFF]
                  peer-checked:after:absolute
                  peer-checked:after:left-1/2
                  peer-checked:after:top-1/2
                  peer-checked:after:h-2.5
                  peer-checked:after:w-2.5
                  peer-checked:after:-translate-x-1/2
                  peer-checked:after:-translate-y-1/2
                  peer-checked:after:rounded-full
                  peer-checked:after:bg-white
                "
              />
              <div className="flex justify-between w-full items-center">
                <span className="text-[14px]">{method.label}</span>
                <span>{method.images}</span>
              </div>
            </label>

            {/* Content */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                paymentMethod === method.value
                  ? "grid-rows-[1fr]"
                  : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t p-4 bg-[#0000000B] text-center text-[14px]">
                  {method.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {children}

      <Button
        className="bg-[#6F7EFF] hover:bg-[#8995fc] w-full h-[45px] mt-[24px] disabled:opacity-50"
        type="button"
        onClick={onPlaceOrder}
        disabled={isLoading}
      >
        <span>{buttonLabel}</span>
      </Button>
    </div>
  );
};

export default PaymentMethod;