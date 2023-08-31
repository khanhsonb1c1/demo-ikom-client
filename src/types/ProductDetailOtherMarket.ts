import type ProductItemRecommend from "./ProductItemRecommend";

export default interface ProductDetailOtherMarket {
  item: {
    id: string | number;
    name: string;
    image_list: string[];
    price: number;
    description_html: string;
    description_text: string;
    product_condition: string[]; // Hàng lỗi | Hàng không dùng | Hàng mới
    sale_status?: Array<"sold_out" | "on_sale">; // Đã bán hết | Đang giảm giá
    delivery?: Array<"free_delivery" | "anonymous_delivery">; // Giao hàng miễn phí | Giao hàng ẩn danh

    categories: Array<{
      id: string | number;
      name: string;
    }>;

    shop?: {
      id: string | number;
      name: string;
      image_uri?: string;
      rate?: {
        ratio: number; // Phần trăm đánh giá tốt của sản phẩm
        count?: number; // Tổng số đánh giá
      };

      // Rakuten offical shop
      is39Shop?: boolean;
    };
    branch?: {
      id: string | number;
      name: string;
      image_uri?: string;
    };
    discount?: {
      // Chi tiết giảm giá cho sale_status:on_sale
      price: number; // Giá đang giảm
      percent: number; // Phần trăm đang giảm
    };

    variants?: Array<{
      type: string;
      label: string;
      value: number | string;
    }>;

    rate?: {
      ratio: number; // Phần trăm đánh giá tốt của sản phẩm
      count?: number; // Tổng số đánh giá
      comments?: Array<{
        username: string;
        comment: string;
        created_at: number;
      }>;
    };

    // Property cho api auction yahoo
    quick_decision_price?: number; // Giá quyết định nhanh
    bid_count?: number; // Số lượng người tham gia đấu giá
    bid_list?: Array<{
      username: string;
      bid_count: number;
      created_at: string;
    }>;
    start_time: string;
    end_time: string;

    // Property cho Netmall HardOff
    rank?: string; // Xếp hạng cho sản phẩm
  };
  recommends: Array<ProductItemRecommend>;
}
