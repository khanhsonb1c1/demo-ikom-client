import type Language from "./Language";

export default interface IkomContent {
  banner_main: string[];
  banner_sale: string[];
  banner_additional_first: string;
  banner_additional_seccond: string;
  description: Language | any;
}
