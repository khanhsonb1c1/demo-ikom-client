import { ikom } from "../http-tomoni";

const version = "v3";

function fetchListOtherMarkets() {
  return ikom.get(`/static/stores-web.json`);
}
function fetchTopProductOtherMarket() {
  return ikom.get(`/top-products`);
}

// Paypay
function fetchPaypayCategories() {
  return ikom.get("/static/paypay/categories.json");
}

function fetchPaypayItems(params?: object) {
  return ikom.get(`/${version}/paypay`, { params });
}

function getPaypayDetailItem(params: { id: string }) {
  return ikom.get(`/${version}/paypay/detail`, { params });
}
// Rakuma
function fetchRakumaCategories() {
  return ikom.get("/static/rakuma/categories.json");
}

function fetchRakumaItems(params?: object) {
  return ikom.get(`/${version}/rakuma`, { params });
}

function getRakumaDetailItem(params: { id: string }) {
  return ikom.get(`/${version}/rakuma/detail`, { params });
}
// Rakuten
function fetchRakutenCategories() {
  return ikom.get(`/static/rakuten/categories.json`);
}

function fetchRakutenitems(params?: object) {
  return ikom.get(`/${version}/rakuten`, { params });
}

function getRakutenDetailItem(params?: object) {
  return ikom.get(`/${version}/rakuten/detail`, { params });
}

function fetchRakutenFilter(params?: object) {
  return ikom.get(`/static/rakuten/filter-config.json`, { params });
}
// Yahoo
function fetchYahooCategories() {
  return ikom.get(`/static/yahoo/categories.json`);
}

function fetchYahooItems(params?: object) {
  return ikom.get(`/${version}/yahoo`, { params });
}

function getYahooDetailItem(params?: object) {
  return ikom.get(`/${version}/yahoo/detail`, { params });
}
// Hard Off
function fetchHardOffCategories() {
  return ikom.get(`/static/netmall/categories.json`);
}

function fetchHardOffItems(params?: object) {
  return ikom.get(`/${version}/netmall`, { params });
}

function getHardOffDetailItem(params?: object) {
  return ikom.get(`/${version}/netmall/detail`, { params });
}
// Mercari
function fetchMercariCategories() {
  return ikom.get(`/static/mercari/categories.json`);
}

function fetchMercariItems(params?: object) {
  return ikom.get(`/${version}/mercari`, { params });
}

function getMercariDetailItem(params?: object) {
  return ikom.get(`/${version}/mercari/detail`, { params });
}
// Amazon
function fetchAmazonCategories() {
  return ikom.get(`/static/amazon/categories.json`);
}

function fetchAmazonItems(params?: object) {
  return ikom.get(`/${version}/amazon`, { params });
}

function getAmazonDetailItem(params?: object) {
  return ikom.get(`/${version}/amazon/detail`, { params });
}

// filter all
function fetchFilterList() {
  return ikom.get(`/static/filter-all-web.json`);
}

// sort all
function fetchSortList() {
  return ikom.get(`/static/sort-all-web.json`);
}

// search all
function fetchWithSearchAll(params: { query: string }) {
  return ikom.get(`/${version}/search`, { params });
}

// get banner + content description ikom
function fetchContentIkom() {
  return ikom.get(`/static/content-ikom.json`);
}
export {
  fetchMercariCategories,
  fetchMercariItems,
  getMercariDetailItem,
  fetchListOtherMarkets,
  fetchTopProductOtherMarket,
  fetchPaypayCategories,
  fetchPaypayItems,
  getPaypayDetailItem,
  fetchRakumaCategories,
  fetchRakumaItems,
  getRakumaDetailItem,
  fetchRakutenCategories,
  getRakutenDetailItem,
  fetchRakutenitems,
  fetchRakutenFilter,
  fetchYahooCategories,
  fetchYahooItems,
  getYahooDetailItem,
  fetchHardOffCategories,
  fetchHardOffItems,
  getHardOffDetailItem,
  fetchFilterList,
  fetchSortList,
  fetchWithSearchAll,
  fetchAmazonCategories,
  fetchAmazonItems,
  getAmazonDetailItem,
  fetchContentIkom,
};
