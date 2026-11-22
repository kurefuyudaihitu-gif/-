const WORKS = [
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
  }
];

const grid = document.getElementById("gallery-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTag = document.getElementById("lightbox-tag");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDesc = document.getElementById("lightbox-desc");

function renderWorks(category = "all") {
  const items = category === "all"
    ? WORKS
    : WORKS.filter((item) => item.category === category);

  grid.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "work-card";
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="work-thumb-wrap">
        <img class="work-thumb" src="${item.image}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="work-body">
        <span class="card-tag">${item.categoryLabel}</span>
        <h3 class="work-title">${item.title}</h3>
        <p class="work-desc">${item.description}</p>
      </div>
    `;
    card.addEventListener("click", () => openLightbox(item));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(item);
      }
    });
    grid.appendChild(card);
  });
}

function openLightbox(item) {
  lightboxImg.src = item.image;
  lightboxImg.alt = item.title;
  lightboxTag.textContent = item.categoryLabel;
  lightboxTitle.textContent = item.title;
  lightboxDesc.textContent = item.description;
  lightbox.hidden = false;
}

function closeLightbox() {
  lightbox.hidden = true;
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => {
      b.classList.remove("is-active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("is-active");
    btn.setAttribute("aria-selected", "true");
    renderWorks(btn.dataset.category);
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
});

renderWorks("all");
