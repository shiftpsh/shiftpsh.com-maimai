export const ratingFactor = (achievement: number) => {
  // Some anomaly values:
  if (achievement === 100_4999) return 0.222;
  if (achievement === 99_9999) return 0.214;
  if (achievement === 98_9999) return 0.206;
  if (achievement === 96_9999) return 0.176;
  if (achievement === 79_9999) return 0.128;
  // The rest of the values:
  if (achievement >= 100.5e4) return 0.224;
  if (achievement >= 100.0e4) return 0.216;
  if (achievement >= 99.5e4) return 0.211;
  if (achievement >= 99.0e4) return 0.208;
  if (achievement >= 98.0e4) return 0.203;
  if (achievement >= 97.0e4) return 0.2;
  if (achievement >= 94.0e4) return 0.168;
  if (achievement >= 90.0e4) return 0.152;
  if (achievement >= 80.0e4) return 0.136;
  if (achievement >= 75.0e4) return 0.12;
  if (achievement >= 70.0e4) return 0.112;
  if (achievement >= 60.0e4) return 0.096;
  if (achievement >= 50.0e4) return 0.08;
  if (achievement >= 40.0e4) return 0.064;
  if (achievement >= 30.0e4) return 0.048;
  if (achievement >= 20.0e4) return 0.032;
  if (achievement >= 10.0e4) return 0.016;
  return 0;
};

export const rating = (achievement: number, internalLevel: number) => {
  const factor = ratingFactor(achievement);
  return (
    (Math.min(100.5e4, achievement) / 10000) * (internalLevel / 10) * factor
  );
};
