// ============================================================
// cart.page.js — логика страницы КОРЗИНЫ (cart.html)
// Алгоритм:
//   1. Прочитать корзину {id: qty} из localStorage (main.js).
//   2. Для каждого id подтянуть товар из базы (search.js).
//   3. Нарисовать строки + итоговую сумму.
//   4. Кнопки «+ / − / убрать» меняют количество.
//   5. Кнопка «Купить» очищает корзину и показывает уведомление.
// ============================================================

const list = document.querySelector('[data-cart-list]');
const totalEl = document.querySelector('[data-cart-total]');
const buyButton = document.querySelector('[data-buy]');
const notice = document.querySelector('[data-notice]');

// ШАГ 1. Собрать полные строки корзины: товар + количество.
const getCartLines = async () => {
  const cart = getCart(); // { "1": 2, "5": 1 }
  const ids = Object.keys(cart);
  const lines = [];
  for (const id of ids) {
    const product = await getProductById(id);
    if (product) lines.push({ product, qty: cart[id] });
  }
  return lines;
};

// ШАГ 2. Нарисовать корзину и сумму.
const renderCart = async () => {
  const lines = await getCartLines();

  if (lines.length === 0) {
    list.innerHTML = '<p class="text-slate-500">Корзина пуста. Добавьте товары на главной странице.</p>';
    totalEl.textContent = '0';
    buyButton.disabled = true;
    buyButton.classList.add('opacity-50', 'cursor-not-allowed');
    return;
  }

  buyButton.disabled = false;
  buyButton.classList.remove('opacity-50', 'cursor-not-allowed');

  list.innerHTML = lines.map(({ product, qty }) => `
    <div class="bg-white rounded-xl shadow p-4 flex items-center gap-4">
      <div class="text-4xl bg-slate-100 rounded-lg px-4 py-3">${product.emoji}</div>
      <div class="flex-1">
        <h3 class="font-semibold">${product.name}</h3>
        <p class="text-sm text-slate-500">${product.price.toLocaleString('ru-RU')} / шт.</p>
      </div>
      <div class="flex items-center gap-2">
        <button data-dec="${product.id}" class="w-8 h-8 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold">−</button>
        <span class="w-8 text-center font-semibold">${qty}</span>
        <button data-inc="${product.id}" class="w-8 h-8 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold">+</button>
      </div>
      <p class="w-28 text-right font-bold">${(product.price * qty).toLocaleString('ru-RU')}</p>
      <button data-remove="${product.id}" class="text-sm text-red-600 hover:underline">Убрать</button>
    </div>
  `).join('');

  // ШАГ 3. Итоговая сумма = сумма (цена × количество).
  const total = lines.reduce((sum, { product, qty }) => sum + product.price * qty, 0);
  totalEl.textContent = `${total.toLocaleString('ru-RU')}`;
};

// ШАГ 4. Кнопки «+ / − / убрать» (делегирование, корзина — в main.js).
list.addEventListener('click', async (event) => {
  const inc = event.target.closest('[data-inc]');
  const dec = event.target.closest('[data-dec]');
  const remove = event.target.closest('[data-remove]');
  if (!inc && !dec && !remove) return;

  const cart = getCart();

  if (inc) {
    const key = inc.dataset.inc;
    cart[key] = (cart[key] || 0) + 1;
  }
  if (dec) {
    const key = dec.dataset.dec;
    cart[key] = (cart[key] || 1) - 1;
    if (cart[key] <= 0) delete cart[key];
  }
  if (remove) {
    delete cart[remove.dataset.remove];
  }

  saveCart(cart); // сохраняет + обновляет бейдж в шапке
  await renderCart();
});

// ШАГ 5. Кнопка «Купить»: очистить корзину + показать уведомление.
buyButton.addEventListener('click', async () => {
  saveCart({}); // пустая корзина
  await renderCart();
  notice.classList.remove('hidden');
  // Уведомление прячется само через 4 секунды (модальные окна не нужны).
  setTimeout(() => notice.classList.add('hidden'), 4000);
});

// ШАГ 6. Старт: нарисовать корзину при открытии страницы.
document.addEventListener('DOMContentLoaded', renderCart);
