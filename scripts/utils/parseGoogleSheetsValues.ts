import { ChartType, Difficulty } from "../../src/types/types";

export const tryParseChartType = (type: string): ChartType => {
  if (/dx/.test(type.toLocaleLowerCase())) return "DX";
  if (/st/.test(type.toLocaleLowerCase())) return "Standard";
  throw new Error(`Unknown chart type: ${type}`);
};

export const tryParseDifficulty = (difficulty: string): Difficulty => {
  if (/re/.test(difficulty.toLocaleLowerCase())) return "Re:MASTER";
  if (/mas/.test(difficulty.toLocaleLowerCase())) return "MASTER";
  if (/exp/.test(difficulty.toLocaleLowerCase())) return "EXPERT";
  if (/adv/.test(difficulty.toLocaleLowerCase())) return "ADVANCED";
  if (/bas/.test(difficulty.toLocaleLowerCase())) return "BASIC";
  throw new Error(`Unknown difficulty: ${difficulty}`);
};

export const tryNormalizeTitle = (title: string): string => {
  const t = title
    // Mostly v15:
    .replace(/\((RM|ReMAS|DX-MAS|MAS|EXP|ADV|BASIC)\)$/, "")
    .replace(/^【(DX|EXP)】/, "")
    .trim();

  // Ad-hoc fixes:
  if (/^.411Ψ892.$/i.test(t)) return '"411Ψ892"';
  if (/^≠彡[゛"]\/了→$/.test(t)) return '≠彡"/了→';
  if (/^管弦楽組曲 第3番 ニ長調/.test(t))
    return "管弦楽組曲 第3番 ニ長調「第2曲（G線上のアリア）」BWV.1068-2";
  if (/^雷切.?-RAIKIRI-$/.test(t)) return "雷切-RAIKIRI-";
  if (/^砂の惑星/i.test(t)) return "砂の惑星 feat. HATSUNE MIKU";
  if (/^超熊猫的周遊記/i.test(t))
    return "超熊猫的周遊記（ワンダーパンダートラベラー）";
  if (/^Bad Apple!! feat\.nomico.?\(REDALiCE Remix\)$/i.test(t))
    return "Bad Apple!! feat.nomico (REDALiCE Remix)";
  if (/^D✪N’T +ST✪P +R✪CKIN’$/.test(t)) return "D✪N’T  ST✪P  R✪CKIN’";
  if (/^FREEDOM DiVE.?\(tpz Overcute Remix\)$/i.test(t))
    return "FREEDOM DiVE (tpz Overcute Remix)";
  if (/^Got more raves\?$/i.test(t)) return "Got more raves？";
  if (/^God knows…$/i.test(t)) return "God knows…";
  if (/^L'epilogue$/i.test(t)) return "L'épilogue";
  if (/^L4TS:2018/i.test(t)) return "L4TS:2018 (feat. あひる & KTA)";
  if (/^Love.s Theme of BADASS/i.test(t))
    return "Love's Theme of BADASS ～バッド・アス 愛のテーマ～";
  if (/^Re.End of (a )?Dream$/i.test(t)) return "Re：End of a Dream";
  if (/^Seyana\./i.test(t))
    return "Seyana. ～何でも言うことを聞いてくれるアカネチャン～";
  if (/^SQUAD.?-Phvntom-$/i.test(t)) return "SQUAD-Phvntom-";
  if (/^System .Z.$/i.test(t)) return "System “Z”";
  if (/^ウッーウッーウマウマ/i.test(t)) return "ウッーウッーウマウマ(ﾟ∀ﾟ)";
  if (/^スカーレット警察のゲットーパトロール..時$/i.test(t))
    return "スカーレット警察のゲットーパトロール24時";
  if (/^ずんだもんの朝食..目覚ましずんラップ.$/i.test(t))
    return "ずんだもんの朝食　〜目覚ましずんラップ〜";
  if (/^ノーポイッ.$/.test(t)) return "ノーポイッ!";
  if (/^ぼくたちいつでも.?しゅわっしゅわ！$/i.test(t))
    return "ぼくたちいつでも　しゅわっしゅわ！";
  if (/^レッツゴー.陰陽師$/i.test(t)) return "レッツゴー!陰陽師";
  if (/^City Escape: ?Act ?1$/i.test(t)) return "City Escape: Act1";
  if (/^Rooftop Run: ?Act ?1$/i.test(t)) return "Rooftop Run: Act1";
  if (/^Sec.et Sleuth$/i.test(t)) return "Secret Sleuth";
  if (/^Party 4U .holy nite mix.$/i.test(t)) return "Party 4U ”holy nite mix”";
  if (/^Excalibur ～Revived Resolution～?$/i.test(t))
    return "Excalibur ～Revived resolution～";
  if (/^Caliburne ～Story of the Legendary sword～?$/i.test(t))
    return "Caliburne ～Story of the Legendary sword～";
  if (/^contrapasso -paradiso-?$/i.test(t)) return "Contrapasso -paradiso-";
  if (/^Love Kills U$/i.test(t)) return "Love Kills U";
  if (/^曖昧Mind$/i.test(t)) return "曖昧mind";
  if (/^Change Our MIRAI.$/.test(t)) return "Change Our MIRAI！";
  if (/^Save This World .MIX$/i.test(t)) return "Save This World νMIX";
  if (/^Boys O.Clock$/i.test(t)) return "Boys O’Clock";
  if (/^J.rqer$/i.test(t)) return "Jörqer";
  if (/^BATTLE NO.1$/i.test(t)) return "BATTLE NO.1";
  if (/^Sqlupp ?\(Camellia's "?Sqleipd\*Hiytex"? Remix\)$/i.test(t))
    return 'Sqlupp (Camellia\'s "Sqleipd*Hiytex" Remix)';
  if (/^居並ぶ穀物と溜息ま.りの運送屋$/.test(t))
    return "居並ぶ穀物と溜息まじりの運送屋";
  if (/^チルノのパーフェクトさんすう教室.⑨周年バージョン$/.test(t))
    return "チルノのパーフェクトさんすう教室　⑨周年バージョン";
  if (/^Bad Apple!! feat.nomico 〜五十嵐 ?撫子 ?Ver.〜$/.test(t))
    return "Bad Apple!! feat.nomico ～五十嵐 撫子 Ver.～";
  if (/^Backyun.+悪い女.$/.test(t)) return "Backyun! －悪い女－";
  if (/^Mj.lnir$/.test(t)) return "Mjölnir";
  if (/^GR.NDIR$/.test(t)) return "GRÄNDIR";
  if (/^【東方ニコカラ】秘神マターラ ?feat\.魂音泉【IOSYS】$/.test(t))
    return "【東方ニコカラ】秘神マターラ feat.魂音泉【IOSYS】";
  if (/^赤心性.カマトト荒療治$/.test(t)) return "赤心性：カマトト荒療治";
  if (/^Session High.$/.test(t)) return "Session High⤴";
  if (/^REVIVER オルタンシア.サーガ/.test(t))
    return "REVIVER オルタンシア・サーガ -蒼の騎士団- オリジナルVer.";
  if (/^Good bye, Merry-Go-Round\.$/i.test(t))
    return "Good bye, Merry-Go-Round.";
  if (/^ファンタジーゾーン/.test(t))
    return "ファンタジーゾーン OPA-OPA! -GMT remix-";
  if (/^紅星ミゼラブル/.test(t)) return "紅星ミゼラブル～廃憶編";
  if (/^Imperishable Night 2006 ?\(2016 Refine\)$/i.test(t))
    return "Imperishable Night 2006 (2016 Refine)";
  if (/^JACKY ?\[Remix]$/i.test(t)) return "JACKY [Remix]";
  if (/^Urban Crusher ?\[Remix]$/i.test(t)) return "Urban Crusher [Remix]";
  if (/^YA.DA.YO ?\[Reborn]$/i.test(t)) return "YA･DA･YO [Reborn]";
  if (/^Like the Wind ?.Reborn.$/i.test(t)) return "Like the Wind [Reborn]";
  if (/^Quartet Theme ?\[Reborn]$/i.test(t)) return "Quartet Theme [Reborn]";
  if (/^Sky High ?\[Reborn]$/i.test(t)) return "Sky High [Reborn]";
  if (/^Space Harrier Main Theme ?\[Reborn]$/i.test(t))
    return "Space Harrier Main Theme [Reborn]";
  if (/^Turn around$/i.test(t)) return "Turn around";
  if (/^Jack-the-Ripper.$/i.test(t)) return "Jack-the-Ripper◆";
  if (/^Tic Tac DREAMIN.$/i.test(t)) return "Tic Tac DREAMIN’";
  if (/^オパ.オパ.RACER/.test(t)) return "オパ! オパ! RACER -GMT mashup-";
  if (/^天狗の落とし文/.test(t)) return "天狗の落とし文 feat. ｙｔｒ";
  if (/^アマノジャクリバース/.test(t))
    return "アマノジャクリバース feat. ｙｔｒ";
  if (/^トルコ行進曲.*オワタ.*$/.test(t))
    return "トルコ行進曲 - オワタ＼(^o^)／";
  if (/^Good Bye, Mr\. ?Jack$/.test(t)) return "Good Bye, Mr. Jack";
  if (/^Yakumo ?>>JOINT STRUGGLE ?\(2019 Update\)$/i.test(t))
    return "Yakumo >>JOINT STRUGGLE (2019 Update)";
  if (/^ナイト・オブ・ナイツ ?\(Cranky Remix\)$/.test(t))
    return "ナイト・オブ・ナイツ (Cranky Remix)";
  if (/^BaBan!!.*甘い罠.$/i.test(t)) return "BaBan!! －甘い罠－";
  if (/^Club Ibuki in Break All$/i.test(t)) return "Club Ibuki in Break All";
  if (/^CYBER Sparks$/i.test(t)) return "CYBER Sparks";
  if (/^Live ?& ?Learn$/i.test(t)) return "Live & Learn";
  if (/^ってゐ！ ?～えいえんてゐVer～$/i.test(t))
    return "ってゐ！ ～えいえんてゐVer～";
  if (/^Grip ?& ?Break down ?!!$/.test(t)) return "Grip & Break down !!";
  if (/^BOUNCE ?& ?DANCE$/.test(t)) return "BOUNCE & DANCE";
  if (/^天国と地獄 ?-言ノ葉リンネ-$/.test(t))
    return "天国と地獄 -言ノ葉リンネ-";
  if (/^玩具狂奏曲 ?-終焉-$/.test(t)) return "玩具狂奏曲 -終焉-";
  if (/^炎歌 ?-ほむらうた-$/.test(t)) return "炎歌 -ほむらうた-";
  if (/^幾四音 ?-Ixion-$/.test(t)) return "幾四音-Ixion-";
  if (/^若い力 ?-SEGA HARD GIRLS MIX-$/.test(t))
    return "若い力 -SEGA HARD GIRLS MIX-";
  if (/^進め！イッスン軍団 ?-Rebellion of the Dwarfs-$/.test(t))
    return "進め！イッスン軍団 -Rebellion of the Dwarfs-";
  if (/^夜明けまであと.秒$/.test(t)) return "夜明けまであと３秒";
  if (/^最終鬼畜妹フランドール・?S$/.test(t))
    return "最終鬼畜妹フランドール・S";
  if (/^ナイト・?オブ・?ナイツ$/.test(t)) return "ナイト・オブ・ナイツ";
  if (/^バーチャルダム.ネーション$/i.test(t))
    return "バーチャルダム　ネーション";
  if (/^\.?[＋+]♂$/.test(t)) return "+♂";
  if (/^Last Brave ?～ ?Go to zero$/i.test(t))
    return "Last Brave ～ Go to zero";
  if (/^オーケー？.?オーライ！$/.test(t)) return "オーケー？　オーライ！";
  if (/^Melody[！!]$/.test(t)) return "Melody！";
  if (/^Yet Another ”?drizzly rain”?$/.test(t))
    return "Yet Another ”drizzly rain”";
  if (/^Mr. ?Wonderland$/.test(t)) return "Mr. Wonderland";
  if (/^Bar.ed Eye$/i.test(t)) return "Barbed Eye";
  if (/^自.無色$/.test(t)) return "自傷無色";
  if (/^Credits.?$/i.test(t)) return "Credits";
  if (/^セハガガガンバッちゃう！！?$/.test(t))
    return "セハガガガンバッちゃう！！";
  if (/^Bad Apple!! feat[. ]nomico$/i.test(t)) return "Bad Apple!! feat nomico";
  if (/^ラブって♡ジュエリー♪(えんじぇる|エンジェル)☆ブレイク！！$/.test(t))
    return "ラブって♡ジュエリー♪えんじぇる☆ブレイク！！";
  if (/^少女幻.戦慄曲 ～Necro Fantasia$/.test(t))
    return "少女幻葬戦慄曲 ～ Necro Fantasia";
  if (/^[lI]evan Polkka$/i.test(t)) return "Ievan Polkka";
  if (/^fake! ?fake!$/i.test(t)) return "fake!fake!";
  if (/^ULTRA B[+＋]K$/.test(t)) return "ULTRA B+K";
  if (/^セイクリッド.ルイン$/.test(t)) return "セイクリッド　ルイン";
  if (/^泣き虫O'clock$/i.test(t)) return "泣き虫O'clock";

  return t;
};

const REMOVED_SONGS = [
  // https://info-maimai.sega.jp/5732/ TUYU
  "泥の分際で私だけの大切を奪おうだなんて",
  "くらべられっ子",
  "あの世行きのバスに乗ってさらば。",
  "アンダーキッズ",
  "テリトリーバトル",
  // https://info-maimai.sega.jp/5109/ BUDDiES+
  "君の知らない物語",
  "Our Fighting",
  "おじゃま虫",
  "はじめまして地球人さん",
  "ヒビカセ",
  "アンチクロックワイズ",
  // https://info-maimai.sega.jp/4170/ BUDDiES
  "インフェルノ",
  "冬のこもりうた",
  "God knows…",
  "秒針を噛む",
  "乙女のルートはひとつじゃない！",
  "Shiny Smily Story",
  "ビックカメラのテーマソング",
  // https://info-maimai.sega.jp/3737/ FESTiVAL+
  "1/3の純情な感情",
  "Paradisus-Paradoxum",
  "六厘歌",
  "ノーポイッ!",
  "町かどタンジェント",
  "紅蓮華",
  "MIRACLE RUSH",
  "Pretender",
  // https://info-maimai.sega.jp/3034/ FESTiVAL
  "毒占欲",
  "ファッとして桃源郷",
  "名探偵連続殺人事件",
  "徒花ネクロマンシー",
  "目覚めRETURNER",
  "青空のラプソディ",
  "ラブ・ドラマティック feat. 伊原六花",
  "異世界かるてっと",
  "オトモダチフィルム",
  "馬と鹿",
  // https://info-maimai.sega.jp/2041/ UNiVERSE+ (none)
  // https://info-maimai.sega.jp/1294/ UNiVERSE
  "かくしん的☆めたまるふぉ～ぜっ！",
  "Deep in Abyss",
  "NOISY LOVE POWER☆",
  "極上スマイル",
  "甲賀忍法帖",
  "Ievan Polkka",
  //
  "U.S.A.",
  "Daydream cafe",
  "ワンダーラスト",
  "POP TEAM EPIC",
  "SAVIOR OF SONG",
  "コネクト",
  "シュガーソングとビターステップ",
  "アリサのテーマ",
  "うまるん体操",
  "全力☆Summer!",
  "絵の上手かった友達",
  "ガヴリールドロップキック",
  "東奔西走行進曲",
  "Mr. Wonderland",
  "The Gong of Knockout",
  "ジャガーノート",
  "アウトサイダー",
  "Arrival of Tears",
];

const NOT_IN_INTL = [
  "金の聖夜霜雪に朽ちて",
  "白い雪のプリンセスは",
  "愛のシュプリーム！",
  "右肩の蝶",
  "電話革命ナイセン",
  "千本桜",
  "片想いサンバ",
  "好き！雪！本気マジック",
  "回レ！雪月花",
  "炉心融解",
  "青春コンプレックス",
  "Dive into the ZONe",
  "fantastic dreamer",
  "Los! Los! Los!",
  "Lost Princess",
  "Magical Sound Shower",
  "Seize The Day",
  "SHINY DAYS",
  "SPiCa",
  "This game",
  "あ・え・い・う・え・お・あお!!",
  "アゲアゲアゲイン",
  "アノーイング！さんさんウィーク！",
  "うまぴょい伝説",
  "お願いマッスル",
  "ガチャガチャきゅ～と・ふぃぎゅ@メイト",
  "ガチャガチャきゅ～と・ふぃぎゅ＠メイト",
  "カラフル×メロディ",
  "キミとボクのミライ",
  "ギリギリ最強あいまいみー！",
  "クノイチでも恋がしたい",
  "クローバー♣クラブ",
  "ココロ",
  "このふざけた素晴らしき世界は、僕の為にある",
  "このふざけた素晴らしき世界は、僕のためにある",
  "しんでしまうとはなさけない！",
  "すろぉもぉしょん",
  "ダブルラリアット",
  "ちがう!!!",
  "どういうことなの！？",
  "なだめスかし Negotiation(TVsize)",
  "フキゲンワルツ",
  "ブリキノダンス",
  "ミラクルペイント",
  "むかしむかしのきょうのぼく",
  "ゆっくりしていってね！！！",
  "ようこそジャパリパークへ",
];

export const suppressTitleWarning = (title: string): boolean => {
  // Suppress title warnings for removed songs, songs not in intl version, etc.
  if (REMOVED_SONGS.includes(title)) return true;
  if (NOT_IN_INTL.includes(title)) return true;
  return false;
};
