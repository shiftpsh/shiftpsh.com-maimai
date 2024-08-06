import parse, { HTMLElement } from "node-html-parser";
import { segaAxios } from "../axios";
import { parseClassRank, parseCourseRank } from "../utils/parseImageUrl";
import { parseTrophyTier } from "../utils/parseTrophy";

export interface MusicDetailArgs {
  idx: string;
}

const ENDPOINT = "/playerData";

const parseProfile = (elem: HTMLElement) => {
  const profile = elem.querySelector(
    "div.main_wrapper > div.see_through_block > div.basic_block"
  )!;

  const profileImageSrc = profile.querySelector("img.w_112")!.attributes.src;
  const title = profile.querySelector(
    "div.trophy_block > div.trophy_inner_block > span"
  )!.text;
  const trophyTierClassList =
    profile.querySelector("div.trophy_block")!.classList;
  const trophyTier = parseTrophyTier(trophyTierClassList);
  const name = profile.querySelector("div.name_block")!.text;
  const rating = profile.querySelector("div.rating_block")!.text;

  const courseRankImageSrc =
    profile.querySelector("img.h_35.f_l")!.attributes.src;
  const classRankImageSrc = profile.querySelector("img.p_l_10.h_35.f_l")!
    .attributes.src;
  const stars = profile
    .querySelector("div.p_l_10.f_l > div.p_l_10.f_l.f_14")!
    .text.trim()
    .slice(1);

  const playCountText = elem.querySelector(
    "div.main_wrapper > div.see_through_block > div.m_5.m_b_5.t_r.f_12"
  )?.text;

  const playCountTotal =
    /maimaiDX total play count：([0-9,]+)/
      .exec(playCountText || "")?.[1]
      .replace(/,/g, "") || "0";
  const playCountCurrent =
    /play count of current version：([0-9,]+)/
      .exec(playCountText || "")?.[1]
      .replace(/,/g, "") || "0";

  const courseRank = parseCourseRank(courseRankImageSrc);
  const classRank = parseClassRank(classRankImageSrc);

  return {
    name,
    rating: +rating,
    profileImageSrc,
    trophy: {
      tier: trophyTier,
      title,
    },
    courseRank,
    classRank,
    stars: +stars,
    playCount: {
      total: +playCountTotal,
      current: +playCountCurrent,
    },
  };
};

export const playerData = async () => {
  const { data } = await segaAxios.get(ENDPOINT);
  const dom = parse(data, {
    parseNoneClosedTags: true,
  });

  return parseProfile(dom);
};
