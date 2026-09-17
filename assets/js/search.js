// ============================================================
// search.js — ВСПОМОГАТЕЛЬНЫЙ скрипт для поиска по «базе данных»
// База = файл assets/data/products.json (моковые данные).
// Все функции ниже — чистые помощники: загрузить, найти, отфильтровать.
// Используются на главной, на страницах категорий и в корзине.
// Только ES6+: const/let, стрелки, async/await, шаблонные строки.
// ============================================================

const DB_URL = 'assets/data/products.json';

// Кэш, чтобы не качать JSON при каждом поиске.
let cachedDb = null;

// ШАГ 1. Загрузить базу один раз (дальше брать из кэша).
const loadDatabase = async () => {
  if (cachedDb) return cachedDb;
  const response = await fetch(DB_URL);
  cachedDb = await response.json();
  return cachedDb;
};

// ШАГ 2. Получить все товары.
const getAllProducts = async () => {
  const db = await loadDatabase();
  return db.products;
};

// ШАГ 3. Получить все категории.
const getAllCategories = async () => {
  const db = await loadDatabase();
  return db.categories;
};

// ШАГ 4. Найти ОДИН товар по id (нужно корзине).
const getProductById = async (id) => {
  const products = await getAllProducts();
  return products.find((item) => item.id === Number(id));
};

// ШАГ 5. Отобрать товары ОДНОЙ категории (для страниц категорий).
const getProductsByCategory = async (categoryId) => {
  const products = await getAllProducts();
  return products.filter((item) => item.category === categoryId);
};

// ШАГ 6. ПОИСК: по названию или описанию (без учёта регистра).
// Пустой запрос возвращает все товары.
const searchProducts = async (query) => {
  const text = query.trim().toLowerCase();
  const products = await getAllProducts();
  if (!text) return products;
  return products.filter((item) =>
    item.name.toLowerCase().includes(text) ||
    item.description.toLowerCase().includes(text)
  );
};

// ШАГ 7. Название категории по её id (для подписей «Электроника» и т.п.).
const getCategoryName = async (categoryId) => {
  const categories = await getAllCategories();
  const found = categories.find((cat) => cat.id === categoryId);
  return found ? found.name : categoryId;
};
