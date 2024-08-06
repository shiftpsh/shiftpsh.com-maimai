import parse, { HTMLElement } from "node-html-parser";
import { segaAxios } from "../axios";

export interface MusicDetailArgs {
  idx: string;
}

const ENDPOINT = "/playerData/stampCard";

const parseStampCount = (elem: HTMLElement) => {
  const title = elem.querySelector("div.stampcard_inner_block")?.text.trim();
  if (!title) {
    throw new Error("Failed to parse stamp title.");
  }
  const complete = elem.querySelector("img.stampcard_comp") !== null;
  const stampCount = new Array(10)
    .fill(0)
    .map((_, i) => {
      const stamp = elem.querySelector(`img.stamp_count_${i + 1}`);
      return stamp !== null ? i + 1 : 0;
    })
    .reduce((acc, cur) => Math.max(acc, cur), 0);

  return {
    title,
    complete,
    stampCount,
  };
};

const parseStampCardType = (elem: HTMLElement) => {
  const baseSrc = elem.querySelector("img.stampcard_back")?.attributes.src;
  if (!baseSrc) {
    throw new Error("Failed to parse stamp card type.");
  }

  if (/music/.test(baseSrc)) {
    return "music";
  }
  if (/icon/.test(baseSrc)) {
    return "icon";
  }
  if (/nameplate/.test(baseSrc)) {
    return "nameplate";
  }
  if (/frame/.test(baseSrc)) {
    return "frame";
  }
  return "other";
};

export const stampCard = async () => {
  const { data } = await segaAxios.get(ENDPOINT);
  const dom = parse(data, {
    parseNoneClosedTags: true,
  });

  const partnerElems = dom.querySelectorAll("div[name=type_partner]");
  const otherElems = dom.querySelectorAll("div[name=type_other]");

  const partners = partnerElems.map((elem) => {
    const imageSrc = elem.querySelector("img.stampcard_partner")?.attributes
      .src;
    if (!imageSrc) {
      throw new Error("Failed to parse partner image.");
    }

    return {
      type: "partner",
      image: imageSrc,
      ...parseStampCount(elem),
      max: 10,
    };
  });

  const others = otherElems.map((elem) => {
    const type = parseStampCardType(elem);

    const imageSrc = elem.querySelector(`img.stampcard_${type}`)?.attributes
      .src;
    return {
      type,
      image: imageSrc || null,
      ...parseStampCount(elem),
      max: type === "icon" ? 5 : 10,
    };
  });

  return [...partners, ...others];
};
