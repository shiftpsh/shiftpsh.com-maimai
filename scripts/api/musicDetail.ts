import parse, { HTMLElement } from "node-html-parser";
import { segaAxios } from "../axios";
import { parseChartTypeTextImgUrl } from "../utils/parseImageUrl";

export interface MusicDetailArgs {
  idx: string;
}

const ENDPOINT = "/record/musicDetail";

const JACKET_KEY_REGEX = /\/img\/Music\/([0-9a-zA-Z]*)\.png/;

const parseMusicDetail = (elem: HTMLElement) => {
  const type = elem.querySelector(
    "div.main_wrapper > div.basic_block > div.w_250.f_l.t_l > div.m_10 > img"
  )!.attributes.src;
  const title = elem
    .querySelector(
      "div.main_wrapper > div.basic_block > div.w_250.f_l.t_l > div.m_5.f_15.break"
    )!
    .text.trim();
  const artist = elem
    .querySelector(
      "div.main_wrapper > div.basic_block > div.w_250.f_l.t_l > div.m_5.f_12.break"
    )!
    .text.trim();
  const jacketUrl = elem.querySelector(
    "div.main_wrapper > div.basic_block > img"
  )!.attributes.src;

  return {
    title,
    type: parseChartTypeTextImgUrl(type),
    artist,
    jacketKey: jacketUrl.match(JACKET_KEY_REGEX)![1],
  };
};

export const musicDetail = async ({ idx }: MusicDetailArgs) => {
  const { data } = await segaAxios.get(ENDPOINT, {
    params: {
      idx,
    },
  });
  const dom = parse(data, {
    parseNoneClosedTags: true,
  });

  return parseMusicDetail(dom);
};
