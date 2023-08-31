export default interface PaginationOtherMarket {
  page: number; // Trang hiện tại
  is_allow_next?: boolean; // Có trang tiếp theo hay không | Trong trường hợp không có total, thì dùng property này để quyết định xem có load thêm trang hay không
  total?: number; // Tổng số lượng trang
}
