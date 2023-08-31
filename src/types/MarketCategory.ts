import type ProductInListOtherMarket from "./ProductInListOtherMarket";

export default interface MarketCategory {
  name: string;
  image_uri: string;
  screen: string;
  star: number;
  description: string;
  path: string;
  color: string;
  top_products: Array<ProductInListOtherMarket>;
  banner: string;
}
