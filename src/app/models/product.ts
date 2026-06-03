export interface DeliveryInfo {
  text: string;
  linkText: string;
}

export interface PickupInfo {
  label: string;
  description: string;
  linkText: string;
}

export interface ShippingInfo {
  freeDelivery?: DeliveryInfo;
  pickup?: PickupInfo;
}

export interface Installments {
  count: number;
  amount: number;
}

export interface Product {
  id: string;
  name: string;
  title: string;
  images: string[];
  price: number;
  installments: Installments;
  promoLabel: string;
  features: string[];
  shipping: ShippingInfo;
}

export interface SocialLinks {
  whatsapp: string;
  facebook: string;
  instagram: string;
}

export interface SiteConfig {
  name: string;
  logo: string;
  social: SocialLinks;
}

export interface SiteData {
  site: SiteConfig;
  products: Product[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}
