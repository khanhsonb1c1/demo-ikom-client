export default interface ProductInListOtherMarket {
  id: string;
  name: string;
  price: number;
  image_uri: string;
  star: number;
  product_condition?: Array<"faulty" | "un_used" | "new">; // Hàng lỗi | Hàng không dùng | Hàng mới
  sale_status?: Array<"sold_out" | "on_sale">; // Đã bán hết | Đang giảm giá
  delivery?: Array<"free_delivery" | "anonymous_delivery">; // Giao hàng miễn phí | Giao hàng ẩn danh

  shop?: {
    // Shop bán hàng
    id?: string | number;
    name: string;
  };
  brand?: {
    // Branch của sản phẩm
    id?: string | number;
    name: string;
  };
  discount?: {
    // Chi tiết giảm giá cho sale_status:on_sale
    price: number; // Giá đang giảm
    percent: number; // Phần trăm đang giảm
  };

  rate?: {
    ratio: number; // Phần trăm đánh giá tốt của sản phẩm
    count?: number; // Tổng số đánh giá
  };

  // Property cho api auction yahoo
  quick_decision_price?: number; // Giá quyết định nhanh
  bid_count?: number; // Số lượng người tham gia đấu giá
  time_left_count?: number; // Thời gian đấu giá còn lại
  time_left_unit?: string; // Đơn vị của thời gian đấu giá còn lại

  // Property cho Netmall HardOff
  rank?: string; // Xếp hạng cho sản phẩm

  // Property dành riêng cho Rakuten
  url?: string;
  code?: string; // Tương tự như id
}
