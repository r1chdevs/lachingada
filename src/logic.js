// --- State ---
let cart = [];
const CART_KEY = 'lachingada_cart';

function loadCart() {
    try { cart = JSON.parse(sessionStorage.getItem(CART_KEY)) || []; }
    catch { cart = []; }
    updateCartUI();
}

function saveCart() {
    sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI();
}

function addToCart(item) {
    const idx = cart.findIndex(i =>
        i.id === item.id &&
        JSON.stringify(i.removedIngredients) === JSON.stringify(item.removedIngredients) &&
        i.customizations === item.customizations
    );
    if (idx > -1) cart[idx].quantity += 1;
    else cart.push({ ...item, quantity: 1 });
    saveCart();
    showToast();
    animateBadge();
}

function updateQuantity(id, delta, removedIngredients, customizations) {
    const idx = cart.findIndex(i =>
        i.id === id &&
        JSON.stringify(i.removedIngredients) === JSON.stringify(removedIngredients) &&
        i.customizations === customizations
    );
    if (idx > -1) {
        cart[idx].quantity += delta;
        if (cart[idx].quantity <= 0) cart.splice(idx, 1);
        saveCart();
    }
}

function removeFromCart(id, removedIngredients, customizations) {
    const idx = cart.findIndex(i =>
        i.id === id &&
        JSON.stringify(i.removedIngredients) === JSON.stringify(removedIngredients) &&
        i.customizations === customizations
    );
    if (idx > -1) { cart.splice(idx, 1); saveCart(); }
}

// --- Emoji helper ---
function getCategoryEmoji(id) {
    if (id.startsWith('burg-'))    return '🍔';
    if (id.startsWith('papa-'))    return '🍟';
    if (id.startsWith('alitas-'))  return '🍗';
    if (id.startsWith('sanduche-'))return '🥪';
    if (id.startsWith('batido-'))  return '🥤';
    if (id.startsWith('bebida-'))  return '🧃';
    if (id.startsWith('cola-'))    return '🥤';
    return '🍽️';
}

// --- Cart UI ---
function updateCartUI() {
    const total    = cart.reduce((s, i) => s + i.quantity, 0);
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    document.querySelectorAll('#mobile-cart-badge, #floating-cart-badge').forEach(b => {
        b.classList.toggle('hidden', total === 0);
        b.textContent = total;
    });

    const drawerItems = document.getElementById('drawer-items');
    const drawerSub   = document.getElementById('drawer-subtotal');

    if (drawerItems) {
        drawerItems.innerHTML = cart.length === 0
            ? `<div class="flex flex-col items-center justify-center py-12 text-center opacity-40">
                 <span class="material-symbols-outlined text-6xl mb-4">shopping_basket</span>
                 <p class="font-body text-sm uppercase tracking-widest">Tu pedido está vacío</p>
               </div>`
            : cart.map((item, idx) => `
                <div class="flex gap-4 items-start">
                  <div class="flex-grow">
                    <h4 class="font-headline text-lg text-white">${item.name}</h4>
                    ${item.removedIngredients?.length ? `<p class="text-[10px] text-white/40 uppercase tracking-widest mt-1">Sin: ${item.removedIngredients.join(', ')}</p>` : ''}
                    ${item.customizations ? `<p class="text-[10px] text-primary uppercase tracking-widest mt-1">${item.customizations}</p>` : ''}
                    <div class="flex items-center gap-4 mt-3">
                      <div class="flex items-center border border-outline-variant/20 rounded-lg">
                        <button onclick="window.updateCartQuantity(${idx},-1)" class="px-3 py-1 text-white/60 hover:text-white">−</button>
                        <span class="px-2 text-sm font-bold text-white">${item.quantity}</span>
                        <button onclick="window.updateCartQuantity(${idx},1)" class="px-3 py-1 text-white/60 hover:text-white">+</button>
                      </div>
                      <span class="text-sm font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>`).join('');
    }
    if (drawerSub) drawerSub.textContent = `$${subtotal.toFixed(2)}`;

    renderCartPage();
}

function renderCartPage() {
    const list    = document.getElementById('cart-items-list');
    const summary = document.getElementById('cart-summary');
    const empty   = document.getElementById('empty-cart-state');
    if (!list) return;

    if (cart.length === 0) {
        list.classList.add('hidden');
        summary?.classList.add('hidden');
        empty?.classList.remove('hidden');
        return;
    }

    list.classList.remove('hidden');
    summary?.classList.remove('hidden');
    empty?.classList.add('hidden');

    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const sub = document.getElementById('cart-subtotal');
    const tot = document.getElementById('cart-total');
    if (sub) sub.textContent = `$${subtotal.toFixed(2)}`;
    if (tot) tot.textContent = `$${subtotal.toFixed(2)}`;

    list.innerHTML = cart.map((item, idx) => `
        <div class="cart-item-row bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex items-center gap-6 w-full md:w-auto">
            <div class="w-14 h-14 bg-surface-container-highest rounded-xl flex items-center justify-center text-2xl flex-shrink-0">${getCategoryEmoji(item.id)}</div>
            <div>
              <h3 class="font-headline text-xl text-white">${item.name}</h3>
              ${item.removedIngredients?.length ? `<p class="text-[10px] text-white/40 uppercase tracking-widest mt-1">Sin: ${item.removedIngredients.join(', ')}</p>` : ''}
              ${item.customizations ? `<p class="text-[10px] text-primary uppercase tracking-widest mt-1">${item.customizations}</p>` : ''}
            </div>
          </div>
          <div class="flex items-center justify-between w-full md:w-auto gap-6">
            <div class="flex items-center border border-outline-variant/20 rounded-xl overflow-hidden">
              <button onclick="window.updateCartQuantity(${idx},-1)" class="px-4 py-2 bg-surface-container-highest text-white hover:bg-primary hover:text-on-primary transition-colors">−</button>
              <span class="px-5 font-bold text-white">${item.quantity}</span>
              <button onclick="window.updateCartQuantity(${idx},1)" class="px-4 py-2 bg-surface-container-highest text-white hover:bg-primary hover:text-on-primary transition-colors">+</button>
            </div>
            <div class="text-right min-w-[72px]">
              <p class="text-xs text-white/40 uppercase tracking-widest mb-1">Subtotal</p>
              <p class="font-body text-lg font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button onclick="window.removeCartItem(${idx})" class="material-symbols-outlined text-white/20 hover:text-error transition-colors" aria-label="Eliminar">close</button>
          </div>
        </div>`).join('');
}

// --- Category Tabs ---
function initCategoryTabs() {
    const tabs  = document.querySelectorAll('.category-tab');
    const items = document.querySelectorAll('.menu-item-card');

    function filterCategory(cat, push = true) {
        tabs.forEach(t => t.classList.toggle('active', t.dataset.category === cat));
        items.forEach(item => {
            item.classList.toggle('hidden-item', item.dataset.category !== cat);
        });
        if (push) {
            const u = new URL(window.location.href);
            u.searchParams.set('cat', cat);
            window.history.pushState({}, '', u);
        }
    }

    tabs.forEach(t => t.addEventListener('click', () => filterCategory(t.dataset.category)));

    const cat = new URLSearchParams(window.location.search).get('cat') || 'hamburgesas';
    filterCategory(cat, false);
}

// --- Selectors ---
function initSelectors() {

    // ── Batidos $1.50 ──────────────────────────────────────────────
    const batidoFlavor = document.getElementById('batido-flavor');
    const addBatido    = document.getElementById('add-batido-btn');

    addBatido?.addEventListener('click', () => {
        const flavor = batidoFlavor.value;
        addToCart({
            id: `batido-${flavor.toLowerCase().replace(/\s+/g, '-')}`,
            name: `Batido ${flavor}`,
            price: 1.50,
            customizations: `Sabor: ${flavor}`
        });
    });

    // ── Batidos Premium $1.75 ──────────────────────────────────────
    const batidoPremiumFlavor = document.getElementById('batido-premium-flavor');
    const addBatidoPremium    = document.getElementById('add-batido-premium-btn');

    addBatidoPremium?.addEventListener('click', () => {
        const flavor = batidoPremiumFlavor.value;
        addToCart({
            id: `batido-${flavor.toLowerCase().replace(/\s+/g, '-')}`,
            name: `Batido ${flavor}`,
            price: 1.75,
            customizations: `Sabor: ${flavor}`
        });
    });

    // ── Colas ──────────────────────────────────────────────────────
    const colaFlavor       = document.getElementById('cola-flavor');
    const colaSize         = document.getElementById('cola-size');
    const colaPriceDisplay = document.getElementById('cola-price-display');
    const addCola          = document.getElementById('add-cola-btn');

    // Precios por tamaño
    const colaPrices = {
        'Pequeña': 0.50,
        'Plástico': 0.75,
        '500ml':   1.00,
        '1 Litro': 1.00,
        '¼ Litro': 1.50
    };

    function updateColaPrice() {
        const price = colaPrices[colaSize?.value] ?? 0.50;
        if (colaPriceDisplay) colaPriceDisplay.textContent = `$${price.toFixed(2)}`;
    }

    colaSize?.addEventListener('change', updateColaPrice);
    updateColaPrice(); // precio inicial

    addCola?.addEventListener('click', () => {
        const flavor = colaFlavor.value;
        const size   = colaSize.value;
        const price  = colaPrices[size] ?? 0.50;
        addToCart({
            id: `cola-${flavor.toLowerCase().replace(/\s+/g, '-')}-${size.toLowerCase().replace(/\s+/g, '-')}`,
            name: `${flavor}`,
            price,
            customizations: `Tamaño: ${size}`
        });
    });
}

// --- Modal ---
let currentModalItem = null;

function initModal() {
    const overlay  = document.getElementById('modal-overlay');
    const modal    = document.getElementById('custom-modal');
    const closeBtn = document.getElementById('close-modal');
    const addBtn   = document.getElementById('modal-add-btn');
    const ingList  = document.getElementById('ingredients-list');
    const titleEl  = document.getElementById('modal-title');

    function open(item) {
        currentModalItem = item;
        if (titleEl) titleEl.textContent = item.name;
        if (ingList) {
            ingList.innerHTML = (item.ingredients || []).map(ing => `
                <label class="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl cursor-pointer hover:bg-primary/10 transition-colors">
                  <span class="font-body text-sm text-white/80">${ing}</span>
                  <input type="checkbox" checked class="rounded border-outline-variant/40 bg-transparent text-primary focus:ring-primary h-5 w-5 ingredient-checkbox" value="${ing}">
                </label>`).join('');
        }
        overlay?.classList.remove('hidden');
        setTimeout(() => { overlay?.classList.remove('opacity-0'); modal?.classList.remove('translate-y-8'); }, 10);
        document.body.style.overflow = 'hidden';
    }

    function close() {
        overlay?.classList.add('opacity-0');
        modal?.classList.add('translate-y-8');
        setTimeout(() => overlay?.classList.add('hidden'), 300);
        document.body.style.overflow = '';
        currentModalItem = null;
    }

    closeBtn?.addEventListener('click', close);
    overlay?.addEventListener('click', e => { if (e.target === overlay) close(); });
    window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    addBtn?.addEventListener('click', () => {
        if (!currentModalItem) return;
        const removed = [...document.querySelectorAll('.ingredient-checkbox')]
            .filter(cb => !cb.checked).map(cb => cb.value);
        addToCart({
            id: currentModalItem.id,
            name: currentModalItem.name,
            price: currentModalItem.price,
            removedIngredients: removed
        });
        close();
    });

    document.querySelectorAll('.customize-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.menu-item-card');
            if (card) open(JSON.parse(card.dataset.item || '{}'));
        });
    });
}

// --- Drawer ---
function initDrawer() {
    const overlay  = document.getElementById('cart-drawer-overlay');
    const drawer   = document.getElementById('cart-drawer');
    const closeBtn = document.getElementById('close-drawer');
    const openBtn  = document.getElementById('floating-cart-btn');

    const open = () => {
        overlay?.classList.remove('hidden');
        setTimeout(() => overlay?.classList.remove('opacity-0'), 10);
        drawer?.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    };
    const close = () => {
        overlay?.classList.add('opacity-0');
        setTimeout(() => overlay?.classList.add('hidden'), 300);
        drawer?.classList.add('translate-x-full');
        document.body.style.overflow = '';
    };

    openBtn?.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    overlay?.addEventListener('click', close);
    window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// --- Toast ---
let toastT = null;
function showToast() {
    const t = document.getElementById('toast');
    if (!t) return;
    if (toastT) clearTimeout(toastT);
    t.classList.remove('opacity-0', 'translate-y-4');
    t.classList.add('opacity-100', 'translate-y-0');
    toastT = setTimeout(() => {
        t.classList.add('opacity-0', 'translate-y-4');
        t.classList.remove('opacity-100', 'translate-y-0');
    }, 2000);
}

function animateBadge() {
    document.querySelectorAll('#mobile-cart-badge, #floating-cart-badge').forEach(b => {
        b.classList.add('animate-bounce');
        setTimeout(() => b.classList.remove('animate-bounce'), 1000);
    });
}

// --- WhatsApp ---
function initWhatsApp() {
    const btn = document.getElementById('whatsapp-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        if (!cart.length) return;
        const PHONE = '593963837148';
        let msg = '🍔 *PEDIDO - LA CHINGADA SODA BAR*\n─────────────────\n';
        cart.forEach(item => {
            msg += `${item.quantity}x *${item.name}*\n`;
            if (item.removedIngredients?.length) msg += `   ⚠️ Sin: ${item.removedIngredients.join(', ')}\n`;
            if (item.customizations)             msg += `   📝 ${item.customizations}\n`;
            msg += `   💵 $${(item.price * item.quantity).toFixed(2)}\n─────────────────\n`;
        });
        const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
        msg += `💰 *TOTAL: $${total.toFixed(2)}*`;
        window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
    });
}

// --- Upsell buttons (cart.html) ---
function initUpsell() {
    document.querySelectorAll('.upsell-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            addToCart({
                id:    btn.dataset.id,
                name:  btn.dataset.name,
                price: parseFloat(btn.dataset.price)
            });
        });
    });
}

// --- Global helpers ---
window.updateCartQuantity = (idx, delta) => {
    if (cart[idx]) {
        cart[idx].quantity += delta;
        if (cart[idx].quantity <= 0) cart.splice(idx, 1);
        saveCart();
    }
};
window.removeCartItem = (idx) => {
    cart.splice(idx, 1);
    saveCart();
};

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    loadCart();

    if (document.getElementById('menu-grid')) {
        initCategoryTabs();
        initSelectors();
        initModal();
    }

    if (document.getElementById('cart-items-list')) {
        initWhatsApp();
        initUpsell();
    }

    initDrawer();

    // Botones "Agregar" sin personalización
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const card = btn.closest('[data-item]');
            if (card) {
                const d = JSON.parse(card.dataset.item || '{}');
                addToCart({ id: d.id, name: d.name, price: d.price });
            }
        });
    });
});