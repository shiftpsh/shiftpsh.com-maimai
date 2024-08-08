export const stampColor = (name: string, type: string) => {
  if (type === "partner") {
    if (/ラズ/.test(name)) return "#ffb0b9";
    if (/シフォン/.test(name)) return "#bed296";
    if (/ソルト/.test(name)) return "#92d0e7";
    if (/乙姫/.test(name)) return "#ff8d94";
    if (/みるく/.test(name)) return "#5ab4ba";
    if (/しゃま/.test(name)) return "#f39601";
    if (/百合咲ミカ/.test(name)) return "#baa8d1";
    if (/黒姫/.test(name)) return "#4f454e";
    if (/らいむっくま＆れもんっくま/.test(name)) return "#d0ed32";
  }
  return "#bf9eff";
};
