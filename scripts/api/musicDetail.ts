import parse, { HTMLElement } from "node-html-parser";
import { segaAxios } from "../axios";

export interface MusicDetailArgs {
  idx: string;
}

const ENDPOINT = "/record/musicDetail";

const parseMusicDetail = (elem: HTMLElement) => {
  const artist = elem.querySelector(
    "div.main_wrapper > div.basic_block > div.w_250.f_l.t_l > div.m_5.f_12.break"
  )!.text.trim();

  return { artist };
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
