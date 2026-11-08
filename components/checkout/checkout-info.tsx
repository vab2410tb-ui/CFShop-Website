import { TypeCheckoutInfo } from "@/types/checkout-info";

interface CheckoutInfoProps {
  checkoutInfo: TypeCheckoutInfo;
  updateCheckoutInfo: (data: Partial<TypeCheckoutInfo>) => void;
}

const CheckoutInfo = ({
  checkoutInfo,
  updateCheckoutInfo,
}: CheckoutInfoProps) => {
  return (
    <div>
      <div className="flex justify-between items-baseline flex-wrap mb-3">
        <h2 className="text-[20px] font-bold">Contact us</h2>
      </div>

      {/* Email */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] w-full border rounded-md  pb-[5px] px-2.5 mb-[20px] focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-[12px] pt-[5px] font-medium text-[#0000008F]"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            value={checkoutInfo.email}
            onChange={(e) =>
              updateCheckoutInfo({
                email: e.target.value,
              })
            }
            className="w-full min-w-0 outline-none text-[14px] text-black"
          />
        </div>
        <div className="flex items-center">
          <span>?</span>
        </div>
      </div>

      {/* ----- DELIVERY ---- */}
      <h2 className="text-[20px] font-bold  mb-3">Delivery</h2>
      <div className="flex flex-col gap-4">

        {/* Full Name */}
        <div className="flex flex-col border rounded-xl pb-[5px] px-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
          <label
            htmlFor="fullName"
            className="text-[12px] pt-[5px] font-medium text-[#0000008F]"
          >
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            value={checkoutInfo.fullName}
            onChange={(e) =>
              updateCheckoutInfo({
                fullName: e.target.value,
              })
            }
            className="w-full min-w-0 outline-none text-[14px] text-black"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col border rounded-xl  pb-[5px] px-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
          <label
            htmlFor="phone"
            className="text-[12px] pt-[5px] font-medium text-[#0000008F]"
          >
            Phone
          </label>
          <input
            id="phone"
            type="text"
            value={checkoutInfo.phone}
            onChange={(e) =>
              updateCheckoutInfo({
                phone: e.target.value,
              })
            }
            className="w-full min-w-0 outline-none text-[14px] text-black"
          />
        </div>

        <div className="flex gap-2.5">
          {/* Address */}
          <div className="flex flex-col border rounded-xl  pb-[5px] px-2.5 w-full focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
            <label
              htmlFor="address"
              className="text-[12px] pt-[5px] font-medium text-[#0000008F]"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              value={checkoutInfo.address}
              onChange={(e) =>
                updateCheckoutInfo({
                  address: e.target.value,
                })
              }
              className="w-full min-w-0 outline-none text-[14px] text-black"
            />
          </div>
        </div>

        {/* Ward & Province/City */}
        <div className="flex gap-2.5">
          {/* Ward */}
          <div className="flex flex-col border rounded-xl  pb-[5px] px-2.5 w-full focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
            <label
              htmlFor="ward"
              className="text-[12px] pt-[5px] font-medium text-[#0000008F]"
            >
              Ward
            </label>
            <input
              id="ward"
              type="text"
              value={checkoutInfo.ward}
              onChange={(e) =>
                updateCheckoutInfo({
                  ward: e.target.value,
                })
              }
              className="w-full min-w-0 outline-none text-[14px] text-black"
            />
          </div>

          {/* Province/City */}
          <div className="flex flex-col border rounded-xl  pb-[5px] px-2.5 w-full focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
            <label
              htmlFor="province"
              className="text-[12px] pt-[5px] font-medium text-[#0000008F]"
            >
              Province/City
            </label>
            <input
              id="province"
              type="text"
              value={checkoutInfo.province}
              onChange={(e) =>
                updateCheckoutInfo({
                  province: e.target.value,
                })
              }
              className="w-full min-w-0 outline-none text-[14px] text-black"
            />
          </div>
        </div>
        
        {/* Note */}
        <div className="flex flex-col border rounded-xl  pb-[5px] px-2.5 w-full focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
          <label
            htmlFor="province"
            className="text-[12px] pt-[5px] font-medium text-[#0000008F]"
          >
            Note
          </label>
          <input
            id="note"
            type="text"
            value={checkoutInfo.note}
            onChange={(e) =>
              updateCheckoutInfo({
                note: e.target.value,
              })
            }
            className="w-full min-w-0 outline-none text-[14px] text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutInfo;
