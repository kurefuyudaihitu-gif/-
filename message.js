const GENRE = "message";

const row = document.getElementById("genre-row");
const genreCount = document.getElementById("genre-count");
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTag = document.getElementById("lightbox-tag");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDesc = document.getElementById("lightbox-desc");

/* 同じジャンルの作品を時系列（古い順）に左から並べる */
const works = window.KUREFUYU_WORKS
  .filter((item) => item.category === GENRE)
  .sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")));

function openLightbox(item) {
  lightboxImg.src = item.image;
  lightboxImg.alt = item.title;
  lightboxTag.textContent = item.categoryLabel;
  lightboxTitle.textContent = item.title;
  lightboxDesc.innerHTML = item.description;
  lightbox.hidden = false;
}

function closeLightbox() {
  lightbox.hidden = true;
}

function createWorkCard(item, index) {
  const card = document.createElement("article");
  card.className = "work-card genre-card";
  card.tabIndex = 0;
  card.innerHTML = `
    <div class="work-thumb-wrap">
      <img class="work-thumb" src="${item.image}" alt="${item.title}" loading="lazy" />
    </div>
    <div class="work-body">
      <div class="card-meta">
        <span class="card-tag">${item.categoryLabel}</span>
        ${item.date ? `<span class="work-date">${item.date}</span>` : ""}
      </div>
      <h3 class="work-title">${item.title}</h3>
      <p class="work-desc">${item.description}</p>
      <p class="work-more">拡大して見る<span aria-hidden="true">＋</span></p>
    </div>
  `;
  card.addEventListener("click", () => openLightbox(item));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(item);
    }
  });
  return card;
}

works.forEach((item, index) => row.appendChild(createWorkCard(item, index)));

if (genreCount) {
  genreCount.textContent = `全${works.length}作品`;
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
});
