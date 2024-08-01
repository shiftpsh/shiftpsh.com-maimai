export const courseRankName = (rank: number) => {
  if (rank === 0) return "初心者";
  if (rank === 1) return "初段";
  if (rank === 2) return "二段";
  if (rank === 3) return "三段";
  if (rank === 4) return "四段";
  if (rank === 5) return "五段";
  if (rank === 6) return "六段";
  if (rank === 7) return "七段";
  if (rank === 8) return "八段";
  if (rank === 9) return "九段";
  if (rank === 10) return "十段";
  // if (rank === 11) return "皆伝";
  if (rank === 12) return "真初段";
  if (rank === 13) return "真二段";
  if (rank === 14) return "真三段";
  if (rank === 15) return "真四段";
  if (rank === 16) return "真五段";
  if (rank === 17) return "真六段";
  if (rank === 18) return "真七段";
  if (rank === 19) return "真八段";
  if (rank === 20) return "真九段";
  if (rank === 21) return "真十段";
  if (rank === 22) return "真皆伝";
  if (rank === 23) return "裏皆伝";
  return "不明";
};

export const courseRankTextColor = (rank: number) => {
  if (rank >= 11) return "#9900ff";
  if (rank >= 1) return "#ff9900";
  return "black";
};
