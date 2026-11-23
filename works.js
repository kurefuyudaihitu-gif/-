/* 作品データ（トップページとジャンル別ページで共通利用） */
window.KUREFUYU_WORKS = [
  {
    id: "card-01",
    category: "thanks",
    categoryLabel: "サンクスカード",
    title: "店舗・ショップ向け 感謝カード",
    description: "角丸カードに温かな筆文字風インクで「ありがとうございます」を丁寧に。小さなハートのワンポイント入り。",
    image: "images/card-01-thanks.jpg"
  },
  {
    id: "card-02",
    date: "2026-11-22",
    category: "message",
    categoryLabel: "メッセージ",
    title: "ひとこと応援メッセージ",
    description: "細字ペンですっきりと読みやすく仕上げた前向きなひと言カード。手帳や名刺入れにも収まるサイズ感。",
    image: "images/card-02-step.jpg"
  },
  {
    id: "card-03",
    category: "season",
    categoryLabel: "季節・イベント",
    title: "クリスマス グリーティングカード",
    description: "季節の色合いと「くれふゆ」の落款印をあしらった、あたたかみのある冬のメッセージカード。",
    image: "images/card-03-christmas.jpg"
  },
  {
    id: "card-04",
    date: "2026-11-23",
    category: "message",
    categoryLabel: "メッセージ",
    title: "和風メッセージカード（巡り巡る）",
    description: "深い緑の和紙に、赤い梅結びと銀のひし形をあしらった縁起のよい和風カード。「巡り巡る」の言葉を手書きで添えています。",
    image: "images/card-04-megurimeguru.jpg"
  }
];

/* ジャンル一覧（page があるものは、トップページからジャンル別ページへ遷移） */
window.KUREFUYU_GENRES = [
  { category: "thanks", label: "サンクスカード" },
  {
    category: "message",
    label: "メッセージ",
    page: "message.html",
    cover: "card-02"
  },
  { category: "season", label: "季節・イベント" }
];
