export interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
  color: string; 
  colorCode?: string;
  
}