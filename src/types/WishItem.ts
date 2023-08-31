export default interface WishItem {
  product_id: string;
  shop: string;
  detail?:
    | {
        id: string;
        name: string;
        price: number;
        image_uri: string;
      }
    | any;
}
