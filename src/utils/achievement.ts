export const achievementColor = (achievement: number) => {
  if (achievement < 97e4) return "#4d4d4d";
  if (achievement < 99e4) return "#7fb8db";
  if (achievement < 100e4) return "#edb139";
  if (achievement < 101e4) return "#ed5739";
  return "#f75d0a";
};
