import type Language from "@/types/Language";

export default interface FilterAllOtherMarket {
  paypay: FilterFull;
  rakuma: FilterFull;
  rakuten: FilterFull;
  mercati: FilterFull;
  yahoo: FilterFull;
  netmall: {
    price: Price;
  };
  amazon: {
    price: Price;
    new_arrivals: NewArrival;
    reviews: Review;
    discount: Discount;
  };
}

interface FilterFull {
  colors: Color;
  price: Price;
  status: Status;
  open: Open;
  shipping: Shipping;
}

interface Color {
  name: string;
  hex: string;
  value: string;
  lang: Language;
}

interface Price {
  name: string;
  value: string;
  lang: Language;
}

interface Open {
  name: string;
  value: string;
  lang: Language;
}
interface Shipping {
  name: string;
  value: string;
  lang: Language;
}
interface Status {
  name: string;
  value: string;
  lang: Language;
}

interface NewArrival {
  title: string;
  value: string;
}

interface Review {
  title: string;
  value: string;
}

interface Discount {
  title: string;
  value: string;
}
