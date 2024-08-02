const SUBTITLE_REGEX =
  /^(.+)( feat[ .].+|\(.+\)|\[.+\]|（.+）|～.+～|【.+】|-.+-|－.+－|～ ?.+|〜.+〜|BWV\.1068-2)$/;

// Matched subtitle is actually a part of the title
const SUBTITLE_EXCEPTIONS = [
  "-Phvntom-",
  "-M-",
  "-paradiso-",
  "-RAIKIRI-",
  "-[i]3-",
  "(>∀<)",
  "(ﾟ∀ﾟ)",
  "(改)",
  "【IOSYS】",
];

export const splitTitle = (title: string) => {
  const match = title.match(SUBTITLE_REGEX);
  if (match) {
    const [, title, subtitle] = match;
    if (!SUBTITLE_EXCEPTIONS.includes(subtitle)) {
      return {
        title,
        subtitle,
      };
    }
  }
  return {
    title,
    subtitle: null,
  };
};
