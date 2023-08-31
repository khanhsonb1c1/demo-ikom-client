import type Language from "./Language";

export default interface RakutenCategory {
  genreId: boolean;
  genreLevel: number;
  lang: Language;
  genreName: string;
}
