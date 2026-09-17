// ============================================================
// main.js — ОБЩИЕ скрипты для ВСЕХ страниц
// Здесь: работа шапки (счётчик корзины) и хранение корзины.
// Корзина хранится в localStorage, поэтому переживает
// обновление вкладки, закрытие браузера и переход по страницам.
// Формат корзины: { "1": 2, "5": 1 }  (id товара -> количество)
// ============================================================

const CART_KEY = 'shop_cart';

// ШАГ 1. Прочитать корзину из localStorage.
// Если там пусто или мусор — вернуть пустой объект.
const getCart = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // Защита: корзина обязана быть объектом вида {id: qty}
    return (parsed && typeof parsed === 'object') ? parsed : {};
  } catch (error) {
    console.warn('Не удалось прочитать корзину:', error);
    return {};
  }
};

// ШАГ 2. Сохранить корзину в localStorage + обновить шапку.
const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
};

// ШАГ 3. Добавить 1 шт. товара в корзину.
const addToCart = (productId) => {
  const cart = getCart();
  const key = String(productId);
  cart[key] = (cart[key] || 0) + 1;
  saveCart(cart);
};

// ШАГ 4. Посчитать общее число товаров (для бейджа в шапке).
const getCartCount = () => {
  const cart = getCart();
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
};

// ШАГ 5. Отрисовать цифру на кнопке «Корзина» в шапке.
const updateCartBadge = () => {
  const badge = document.querySelector('[data-cart-count]');
  if (!badge) return;
  badge.textContent = getCartCount();
};

// ШАГ 6. При загрузке ЛЮБОЙ страницы — обновить бейдж шапки.
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
});
