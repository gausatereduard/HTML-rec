// ============================================================
// category.page.js — ОДИН скрипт для ВСЕХ страниц категорий.
// Какая именно категория нужна — читаем из data-category
// на элементе <main> (пример: <main data-category="electronics">).
// Алгоритм:
//   1. Узнать свою категорию из data-атрибута.
//   2. Загрузить товары только этой категории.
//   3. Поиск фильтрует ВНУТРИ категории.
//   4. Кнопка кладёт товар в корзину (main.js).
// ============================================================

const grid = document.querySelector('[data-products]');
const searchInput = document.querySelector('[data-search]');
const categoryId = document.querySelector('main[data-category]').dataset.category;

// ШАГ 1. Карточка товара (такая же, как на главной).
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

// ШАГ 2. Нарисовать товары.
const renderProducts = (products) => {
  if (products.length === 0) {
    grid.innerHTML = '<p class="text-slate-500">В этой категории ничего не найдено.</p>';
    return;
  }
  grid.innerHTML = products.map(createCard).join('');
};

// ШАГ 3. Взять товары категории + применить поиск.
const refresh = async () => {
  const text = searchInput.value.trim().toLowerCase();
  const ofCategory = await getProductsByCategory(categoryId);
  const visible = ofCategory.filter((item) =>
    !text ||
    item.name.toLowerCase().includes(text) ||
    item.description.toLowerCase().includes(text)
  );
  renderProducts(visible);
};

// ШАГ 4. Добавление в корзину (делегирование кликов).
grid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  addToCart(button.dataset.add);
  button.textContent = 'Добавлено ✓';
  setTimeout(() => { button.textContent = 'Добавить в корзину'; }, 800);
});

// ШАГ 5. Живой поиск + стартовая отрисовка.
searchInput.addEventListener('input', refresh);
document.addEventListener('DOMContentLoaded', refresh);
