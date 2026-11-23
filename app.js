const WORKS = window.KUREFUYU_WORKS;
const GENRES = window.KUREFUYU_GENRES;

const grid = document.getElementById("gallery-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTag = document.getElementById("lightbox-tag");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDesc = document.getElementById("lightbox-desc");

function worksOf(category) {
  return WORKS.filter((item) => item.category === category);
}

function thumbMarkup(item) {
  return `
    <div class="work-thumb-wrap">
      <img class="work-thumb" src="${item.image}" alt="${item.title}" loading="lazy" />
    </div>
  `;
}

function tagMarkup(item) {
  const date = item.date ? `<span class="work-date">${item.date}</span>` : "";
  return `<div class="card-meta"><span class="card-tag">${item.categoryLabel}</span>${date}</div>`;
}

/* 通常の作品カード（クリックで拡大表示） */
function createWorkCard(item) {
  const card = document.createElement("article");
  card.className = "work-card";
  card.tabIndex = 0;
  card.innerHTML = `
    ${thumbMarkup(item)}
    <div class="work-body">
      ${tagMarkup(item)}
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
  return card;
}

/* ジャンル別ページへの入口カード（クリックでそのジャンル専門ページへ） */
function createGenreEntry(genre) {
  const works = worksOf(genre.category);
  const cover = works.find((item) => item.id === genre.cover) || works[works.length - 1];

  const card = document.createElement("a");
  card.className = "work-card work-card--link";
  card.href = genre.page;
  card.innerHTML = `
    ${thumbMarkup(cover)}
    <div class="work-body">
      ${tagMarkup(cover)}
      <h3 class="work-title">${cover.title}</h3>
      <p class="work-desc">${cover.description}</p>
      <p class="work-more">全${works.length}作品・時系列で見る<span aria-hidden="true">→</span></p>
    </div>
  `;
  return card;
}

function renderWorks(category = "all") {
  grid.innerHTML = "";

  if (category === "all") {
    GENRES.forEach((genre) => {
      if (genre.page) {
        grid.appendChild(createGenreEntry(genre));
      } else {
        worksOf(genre.category).forEach((item) => grid.appendChild(createWorkCard(item)));
      }
    });
    return;
  }

  const genre = GENRES.find((g) => g.category === category);
  if (!genre) return;

  if (genre.page) {
    grid.appendChild(createGenreEntry(genre));
  } else {
    worksOf(genre.category).forEach((item) => grid.appendChild(createWorkCard(item)));
  }
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
