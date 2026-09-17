// ============================================================
// home.page.js — логика ГЛАВНОЙ страницы (index.html)
// Алгоритм:
//   1. Чип выбирает категорию (или «Все»).
//   2. Загрузить товары этой категории из базы (search.js).
//   3. Дополнительно отфильтровать поиском и нарисовать карточки.
//   4. Кнопка «В корзину» кладёт товар (main.js) и обновляет шапку.
// ============================================================

const grid = document.querySelector('[data-products]');
const searchInput = document.querySelector('[data-search]');
const chips = document.querySelectorAll('[data-filter]');

// Текущий фильтр: 'all' — все товары, иначе id категории.
let activeCategory = 'all';

// Классы чипов: выбран / не выбран.
const CHIP_ON = 'px-4 py-1.5 rounded-full text-sm font-medium border bg-slate-900 text-white border-slate-900';
const CHIP_OFF = 'px-4 py-1.5 rounded-full text-sm font-medium border bg-white text-slate-700 border-slate-300';

// ШАГ 1. Одна карточка товара (возвращает HTML-строку).
const createCard = (product) => `
  <article class="bg-white rounded-xl shadow p-5 flex flex-col">
    <div class="text-6xl text-center bg-slate-100 rounded-lg py-6">${product.emoji}</div>
    <h3 class="mt-4 text-lg font-semibold">${product.name}</h3>
    <p class="mt-1 text-sm text-slate-500 flex-1">${product.description}</p>
    <p class="mt-3 text-xl font-bold">${product.price.toLocaleString('ru-RU')}</p>
    <button
      data-add="${product.id}"
      class="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
    >Добавить в корзину</button>
  </article>
`;

// ШАГ 2. Нарисовать список товаров в сетке.
const renderProducts = (products) => {
  if (products.length === 0) {
    grid.innerHTML = '<p class="text-slate-500">Ничего не найдено.</p>';
    return;
  }
  grid.innerHTML = products.map(createCard).join('');
};

// ШАГ 3. Подсветить выбранный чип.
const paintChips = () => {
  chips.forEach((chip) => {
    chip.className = (chip.dataset.filter === activeCategory) ? CHIP_ON : CHIP_OFF;
  });
};

// ШАГ 4. Загрузить товары (категория + поиск) и показать.
const refresh = async () => {
  const text = searchInput.value.trim().toLowerCase();
  const base = (activeCategory === 'all')
    ? await getAllProducts()
    : await getProductsByCategory(activeCategory);
  const visible = base.filter((item) =>
    !text ||
    item.name.toLowerCase().includes(text) ||
    item.description.toLowerCase().includes(text)
  );
  renderProducts(visible);
};

// ШАГ 5. Клик по чипу: запомнить категорию, подсветить, обновить товары.
chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    activeCategory = chip.dataset.filter;
    paintChips();
    refresh();
  });
});

// ШАГ 6. Клик по кнопке «Добавить в корзину» (делегирование).
grid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  addToCart(button.dataset.add);
  button.textContent = 'Добавлено ✓';
  setTimeout(() => { button.textContent = 'Добавить в корзину'; }, 800);
});

// ШАГ 7. Живой поиск при вводе.
searchInput.addEventListener('input', refresh);

// ШАГ 8. Старт: подсветить чип «Все» и показать все товары.
document.addEventListener('DOMContentLoaded', () => {
  paintChips();
  refresh();
});
