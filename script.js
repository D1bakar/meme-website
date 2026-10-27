const memeData = [
  {
    id: 1,
    title: "When the bug fixes itself",
    category: "Relatable",
    tags: ["debugging", "luck", "developer"],
    artTheme: "theme-relatable",
    artLabel: "Abstract pink and purple placeholder for a lucky coding meme",
    emoji: "😅",
    likes: 21,
  },
  {
    id: 2,
    title: "Cat judge approves your code",
    category: "Animals",
    tags: ["cat", "approval", "code review"],
    artTheme: "theme-cat",
    artLabel: "Orange and yellow placeholder with a cat-inspired vibe",
    emoji: "🐱",
    likes: 34,
  },
  {
    id: 3,
    title: "Keyboard warrior at 2 AM",
    category: "Gaming",
    tags: ["night", "grind", "reaction"],
    artTheme: "theme-gaming",
    artLabel: "Blue and violet placeholder for a gaming meme style",
    emoji: "🎮",
    likes: 18,
  },
  {
    id: 4,
    title: "Monday meeting energy",
    category: "Work",
    tags: ["office", "mood", "monday"],
    artTheme: "theme-work",
    artLabel: "Dark gradient placeholder evoking office mood",
    emoji: "☕",
    likes: 26,
  },
  {
    id: 5,
    title: "Random meme generator in my brain",
    category: "Random",
    tags: ["chaos", "surprise", "humor"],
    artTheme: "theme-random",
    artLabel: "Teal placeholder representing random meme chaos",
    emoji: "🤯",
    likes: 15,
  },
  {
    id: 6,
    title: "When Wi-Fi returns after 10 minutes",
    category: "Relatable",
    tags: ["internet", "relief", "daily life"],
    artTheme: "theme-relatable",
    artLabel: "Pink and purple placeholder for internet relief meme",
    emoji: "📶",
    likes: 40,
  },
];

const categoryControls = document.getElementById("category-controls");
const searchInput = document.getElementById("search-input");
const memeGrid = document.getElementById("meme-grid");
const emptyState = document.getElementById("empty-state");
const resultsCount = document.getElementById("results-count");
const year = document.getElementById("year");

const likedIds = new Set();
let selectedCategory = "All";

const categories = ["All", ...new Set(memeData.map((meme) => meme.category))];

function renderCategoryButtons() {
  categoryControls.innerHTML = "";
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category;
    button.setAttribute("aria-pressed", String(category === selectedCategory));
    button.addEventListener("click", () => {
      selectedCategory = category;
      renderCategoryButtons();
      renderMemes();
    });
    categoryControls.append(button);
  });
}

function matchesSearch(meme, query) {
  const searchableText = `${meme.title} ${meme.tags.join(" ")}`.toLowerCase();
  return searchableText.includes(query.toLowerCase().trim());
}

function getFilteredMemes() {
  const query = searchInput.value;
  return memeData.filter((meme) => {
    const categoryMatch =
      selectedCategory === "All" || meme.category === selectedCategory;
    return categoryMatch && matchesSearch(meme, query);
  });
}

function createMemeCard(meme) {
  const card = document.createElement("article");
  card.className = "meme-card";
  card.setAttribute("role", "listitem");

  const art = document.createElement("div");
  art.className = `meme-art ${meme.artTheme}`;
  art.setAttribute("role", "img");
  art.setAttribute("aria-label", meme.artLabel);
  art.textContent = meme.emoji;

  const body = document.createElement("div");
  body.className = "meme-body";

  const title = document.createElement("h3");
  title.className = "meme-title";
  title.textContent = meme.title;

  const tags = document.createElement("p");
  tags.className = "meme-tags";
  tags.textContent = `#${meme.tags.join(" #")}`;

  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.type = "button";
  const liked = likedIds.has(meme.id);
  likeButton.setAttribute("aria-pressed", String(liked));
  likeButton.textContent = liked
    ? `❤️ Liked (${meme.likes + 1})`
    : `🤍 Like (${meme.likes})`;

  likeButton.addEventListener("click", () => {
    if (likedIds.has(meme.id)) {
      likedIds.delete(meme.id);
    } else {
      likedIds.add(meme.id);
    }
    renderMemes();
  });

  body.append(title, tags, likeButton);
  card.append(art, body);
  return card;
}

function renderMemes() {
  const memes = getFilteredMemes();
  memeGrid.innerHTML = "";

  memes.forEach((meme) => {
    memeGrid.append(createMemeCard(meme));
  });

  resultsCount.textContent = `${memes.length} meme${memes.length === 1 ? "" : "s"} shown`;
  emptyState.hidden = memes.length !== 0;
}

searchInput.addEventListener("input", renderMemes);
year.textContent = new Date().getFullYear();

renderCategoryButtons();
renderMemes();
