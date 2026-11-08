import { auth } from "@/auth";
import { getUserProfile } from "@/data/profile"; 
import OrderForm from "@/components/order/orderForm";

export default async function OrderPage() {
  const session = await auth();
  let userProfile = null;

  if (session?.user?.id) {
    userProfile = await getUserProfile(session.user.id);
  }

  return <OrderForm initialData={userProfile} />;
}