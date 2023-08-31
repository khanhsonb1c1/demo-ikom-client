export default interface ProductItemRecommend {
  id: string | number;
  name: string;
  price: number;
  image_uri: string;

  // Property cho api auction yahoo
  quick_decision_price?: number; // Giá quyết định nhanh
  bid_count?: number; // Số lượng người tham gia đấu giá
  time_left_count?: number; // Thời gian đấu giá còn lại
  time_left_unit?: string; // Đơn vị của thời gian đấu giá còn lại,

  product_condition?: Array<"faulty" | "un_used" | "new">; // Hàng lỗi | Hàng không dùng | Hàng mới
  sale_status?: Array<"sold_out" | "on_sale">; // Đã bán hết | Đang giảm giá
  delivery?: Array<"free_delivery" | "anonymous_delivery">; // Giao hàng miễn phí | Giao hàng ẩn danh

  // Property cho Netmall HardOff
  rank?: string; // Xếp hạng cho sản phẩm

  // Property dành riêng cho Rakuten
  url?: string;
  code?: string; // Tương tự như id
}
