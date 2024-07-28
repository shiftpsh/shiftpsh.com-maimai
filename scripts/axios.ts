import axios from "axios";
import parse from "node-html-parser";

const LOGIN_PAGE =
  "https://lng-tgk-aime-gw.am-all.net/common_auth/login?site_id=maimaidxex&redirect_url=https://maimaidx-eng.com/maimai-mobile/&back_url=https://maimai.sega.com/";
const LOGIN_API_ENDPOINT =
  "https://lng-tgk-aime-gw.am-all.net/common_auth/login/sid/";

const COOKIE_REGEX = /([^=]+)=([^;]+);/g;
const cookies = new Map<string, Map<string, string>>();

const MAINTENANCE_REGEX = /Sorry, servers are under maintenance/;
const ERROR_REGEX = /ERROR CODE：([0-9a-zA-Z]+)/;

export const segaAxios = axios.create({
  baseURL: "https://maimaidx-eng.com/maimai-mobile/",
  responseType: "text",
  headers: {
    Referer: "https://maimaidx-eng.com",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  },
});

segaAxios.interceptors.request.use((config) => {
  if (!config.url) return config;
  const url = new URL(config.url, segaAxios.defaults.baseURL);
  const cookie = cookies.get(url.hostname);

  if (cookie) {
    const cookieString = Array.from(cookie.entries())
      .map(([key, value]) => `${key}=${value}`)
      .join("; ");
    const headers = config.headers;
    headers.set("Cookie", cookieString);
    return {
      ...config,
      headers,
    };
  }
  return config;
});

segaAxios.interceptors.response.use((response) => {
  if (!response.config.url) return response;
  console.log(
    response.config.url.replace(/\?ssid=.*$/, "?ssid=****"),
    response.config.params
  );
  if (MAINTENANCE_REGEX.test(response.data)) {
    throw new Error("Maintenance is ongoing on maimai-net.");
  }
  if (ERROR_REGEX.test(response.data)) {
    const [, error] = ERROR_REGEX.exec(response.data)!;
    const doc = parse(response.data);
    const errorMessage = doc.querySelector(".p_5.f_12.gray.break")?.text.trim();
    throw new Error(`[${error}] ${errorMessage}`);
  }
  const url = new URL(response.config.url, segaAxios.defaults.baseURL);
  const setCookie = response.headers["set-cookie"];
  if (setCookie) {
    setCookie.forEach((cookie) => {
      COOKIE_REGEX.lastIndex = 0;
      const match = COOKIE_REGEX.exec(cookie);
      if (!match) return;
      const [, key, value] = match;
      const cookieMap = cookies.get(url.hostname) || new Map();
      cookieMap.set(key, value);
      cookies.set(url.hostname, cookieMap);
    });
  }
  return response;
});

export const setCookie = (hostname: string, cookie: string) => {
  const cookieMap = new Map<string, string>();
  cookie.split(";").forEach((pair) => {
    const [key, value] = pair.split("=");
    cookieMap.set(key.trim(), value.trim());
  });
  cookies.set(hostname, cookieMap);
};

export const getCookie = (hostname: string) => {
  const cookieMap = cookies.get(hostname);
  if (!cookieMap) return null;
  return Object.entries(cookieMap)
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");
};

export const clearCookie = (hostname: string) => {
  cookies.delete(hostname);
};

export const login = async (id: string, password: string) => {
  await segaAxios.get(LOGIN_PAGE);

  const formData = new FormData();
  formData.append("sid", id);
  formData.append("password", password);
  formData.append("retention", "1");

  const loginRes = await segaAxios.post(LOGIN_API_ENDPOINT, formData, {
    maxRedirects: 0,
    validateStatus: (status) => status === 302,
  });

  const { location: loginRedirect } = loginRes.headers;

  const ssidRes = await segaAxios.get(loginRedirect, {
    maxRedirects: 0,
    validateStatus: () => true,
  });

  const { location: ssidRedirect } = ssidRes.headers;

  await segaAxios.get(ssidRedirect);
};
