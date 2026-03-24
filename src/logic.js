
// --- State Management ---
let cart = [];

const CART_STORAGE_KEY = 'lachingada_cart';

function loadCart() {
    const storedCart = sessionStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
        try {
            cart = JSON.parse(storedCart);
        } catch (e) {
            console.error('Error parsing cart from sessionStorage', e);
            cart = [];
        }
    }
    updateCartUI();
}

function saveCart() {
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartUI();
}

function addToCart(item) {
    // Check if item already exists with same customizations
    const existingItemIndex = cart.findIndex(i => 
        i.id === item.id && 
        JSON.stringify(i.removedIngredients) === JSON.stringify(item.removedIngredients) &&
        i.customizations === item.customizations
    );

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    saveCart();
    showToast();
    animateBadge();
}

function updateQuantity(id, delta, removedIngredients, customizations) {
    const itemIndex = cart.findIndex(i => 
        i.id === id && 
        JSON.stringify(i.removedIngredients) === JSON.stringify(removedIngredients) &&
        i.customizations === customizations
    );

    if (itemIndex > -1) {
        cart[itemIndex].quantity += delta;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveCart();
    }
}

function removeFromCart(id, removedIngredients, customizations) {
    const itemIndex = cart.findIndex(i => 
        i.id === id && 
        JSON.stringify(i.removedIngredients) === JSON.stringify(removedIngredients) &&
        i.customizations === customizations
    );

    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        saveCart();
    }
}

// --- UI Updates ---
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update badges
    const badges = document.querySelectorAll('#mobile-cart-badge, #floating-cart-badge');
    badges.forEach(badge => {
        if (totalItems > 0) {
            badge.classList.remove('hidden');
            badge.textContent = totalItems.toString();
        } else {
            badge.classList.add('hidden');
        }
    });

    // Update Drawer
    const drawerItemsContainer = document.getElementById('drawer-items');
    const drawerSubtotal = document.getElementById('drawer-subtotal');
    
    if (drawerItemsContainer) {
        if (cart.length === 0) {
            drawerItemsContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center opacity-40">
                    <span class="material-symbols-outlined text-6xl mb-4">shopping_basket</span>
                    <p class="font-body text-sm uppercase tracking-widest">Tu pedido está vacío</p>
                </div>
            `;
        } else {
            drawerItemsContainer.innerHTML = cart.map(item => `
                <div class="flex gap-4 items-start">
                    <div class="flex-grow">
                        <h4 class="font-headline text-lg text-white">${item.name}</h4>
                        ${item.removedIngredients && item.removedIngredients.length > 0 ? 
                            `<p class="text-[10px] text-white/40 uppercase tracking-widest mt-1">Sin: ${item.removedIngredients.join(', ')}</p>` : ''}
                        ${item.customizations ? `<p class="text-[10px] text-primary uppercase tracking-widest mt-1">${item.customizations}</p>` : ''}
                        <div class="flex items-center gap-4 mt-4">
                            <div class="flex items-center border border-outline-variant/20 rounded-lg">
                                <button onclick="window.updateCartQuantity('${item.id}', -1, ${JSON.stringify(item.removedIngredients || []).replace(/"/g, '&quot;')}, '${item.customizations || ''}')" class="px-3 py-1 text-white/60 hover:text-white">−</button>
                                <span class="px-2 text-sm font-bold text-white">${item.quantity}</span>
                                <button onclick="window.updateCartQuantity('${item.id}', 1, ${JSON.stringify(item.removedIngredients || []).replace(/"/g, '&quot;')}, '${item.customizations || ''}')" class="px-3 py-1 text-white/60 hover:text-white">+</button>
                            </div>
                            <span class="text-sm font-bold text-primary">$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
    if (drawerSubtotal) {
        drawerSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    }

    // Update Cart Page
    renderCartPage();
}

function renderCartPage() {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartSummary = document.getElementById('cart-summary');
    const emptyState = document.getElementById('empty-cart-state');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    if (!cartItemsList) return;

    if (cart.length === 0) {
        cartItemsList.classList.add('hidden');
        if (cartSummary) cartSummary.classList.add('hidden');
        if (emptyState) emptyState.classList.remove('hidden');
    } else {
        cartItemsList.classList.remove('hidden');
        if (cartSummary) cartSummary.classList.remove('hidden');
        if (emptyState) emptyState.classList.add('hidden');

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;

        cartItemsList.innerHTML = cart.map(item => `
            <div class="cart-item-row bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="flex items-center gap-6 w-full md:w-auto">
                    <div class="w-16 h-16 bg-surface-container-highest rounded-xl flex items-center justify-center text-2xl">
                        ${getCategoryEmoji(item.id)}
                    </div>
                    <div>
                        <h3 class="font-headline text-xl text-white">${item.name}</h3>
                        ${item.removedIngredients && item.removedIngredients.length > 0 ? 
                            `<p class="text-[10px] text-white/40 uppercase tracking-widest mt-1">Sin: ${item.removedIngredients.join(', ')}</p>` : ''}
                        ${item.customizations ? `<p class="text-[10px] text-primary uppercase tracking-widest mt-1">${item.customizations}</p>` : ''}
                    </div>
                </div>
                <div class="flex items-center justify-between w-full md:w-auto gap-8">
                    <div class="flex items-center border border-outline-variant/20 rounded-xl overflow-hidden">
                        <button onclick="window.updateCartQuantity('${item.id}', -1, ${JSON.stringify(item.removedIngredients || []).replace(/"/g, '&quot;')}, '${item.customizations || ''}')" class="px-4 py-2 bg-surface-container-highest text-white hover:bg-primary hover:text-on-primary transition-colors">−</button>
                        <span class="px-6 font-bold text-white">${item.quantity}</span>
                        <button onclick="window.updateCartQuantity('${item.id}', 1, ${JSON.stringify(item.removedIngredients || []).replace(/"/g, '&quot;')}, '${item.customizations || ''}')" class="px-4 py-2 bg-surface-container-highest text-white hover:bg-primary hover:text-on-primary transition-colors">+</button>
                    </div>
                    <div class="text-right min-w-[80px]">
                        <p class="text-xs text-white/40 uppercase tracking-widest mb-1">Subtotal</p>
                        <p class="font-body text-lg font-bold text-primary">$${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button onclick="window.removeCartItem('${item.id}', ${JSON.stringify(item.removedIngredients || []).replace(/"/g, '&quot;')}, '${item.customizations || ''}')" class="material-symbols-outlined text-white/20 hover:text-error transition-colors" aria-label="Eliminar item">close</button>
                </div>
            </div>
        `).join('');
    }
}

function getCategoryEmoji(id) {
    if (id.includes('burger')) return '🍔';
    if (id.includes('papas') || id.includes('salchi')) return '🍟';
    if (id.includes('alitas')) return '🍗';
    if (id.includes('batido')) return '🥤';
    if (id.includes('cola')) return '🥤';
    if (id.includes('tacos')) return '🌮';
    if (id.includes('cesar')) return '🥗';
    if (id.includes('cheesecake')) return '🍰';
    if (id.includes('cafe')) return '☕';
    return '🍽️';
}

// --- Category Tabs Logic ---
function initCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    const items = document.querySelectorAll('.menu-item-card');

    function filterCategory(category, updateUrl = true) {
        tabs.forEach(tab => {
            if (tab.getAttribute('data-category') === category) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        items.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (itemCategory === category) {
                item.classList.remove('hidden-item');
                item.style.position = 'relative';
                item.style.visibility = 'visible';
            } else {
                item.classList.add('hidden-item');
            }
        });

        if (updateUrl) {
            const url = new URL(window.location.href);
            url.searchParams.set('cat', category);
            window.history.pushState({}, '', url);
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            if (category) filterCategory(category);
        });
    });

    // Initial load
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) {
        filterCategory(catParam, false);
    } else {
        // Default category
        filterCategory('hamburgesas', false);
    }
}

// --- Selectors Logic ---
function initSelectors() {
    // Batidos
    const batidoFlavor = document.getElementById('batido-flavor');
    const batidoPriceDisplay = document.getElementById('batido-price-display');
    const addBatidoBtn = document.getElementById('add-batido-btn');

    if (batidoFlavor && batidoPriceDisplay) {
        batidoFlavor.addEventListener('change', () => {
            const selectedOption = batidoFlavor.options[batidoFlavor.selectedIndex];
            const price = selectedOption.getAttribute('data-price');
            if (price) batidoPriceDisplay.textContent = `$${price}`;
        });
    }

    if (addBatidoBtn) {
        addBatidoBtn.addEventListener('click', () => {
            const flavor = batidoFlavor.value;
            const price = parseFloat(batidoFlavor.options[batidoFlavor.selectedIndex].getAttribute('data-price') || '1.50');
            addToCart({
                id: `batido-${flavor.toLowerCase()}`,
                name: `Batido ${flavor}`,
                price: price,
                customizations: `Sabor: ${flavor}`
            });
        });
    }

    // Colas
    const colaFlavor = document.getElementById('cola-flavor');
    const colaSize = document.getElementById('cola-size');
    const colaPriceDisplay = document.getElementById('cola-price-display');
    const addColaBtn = document.getElementById('add-cola-btn');

    if (colaSize && colaPriceDisplay) {
        colaSize.addEventListener('change', () => {
            const selectedOption = colaSize.options[colaSize.selectedIndex];
            const price = selectedOption.getAttribute('data-price');
            if (price) colaPriceDisplay.textContent = `$${price}`;
        });
    }

    if (addColaBtn) {
        addColaBtn.addEventListener('click', () => {
            const flavor = colaFlavor.value;
            const size = colaSize.value;
            const price = parseFloat(colaSize.options[colaSize.selectedIndex].getAttribute('data-price') || '0.75');
            addToCart({
                id: `cola-${flavor.toLowerCase()}-${size.toLowerCase()}`,
                name: `${flavor} ${size}`,
                price: price,
                customizations: `Tamaño: ${size}`
            });
        });
    }
}

// --- Modal Logic ---
let currentModalItem = null;

function initModal() {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('custom-modal');
    const closeBtn = document.getElementById('close-modal');
    const addBtn = document.getElementById('modal-add-btn');
    const ingredientsList = document.getElementById('ingredients-list');
    const modalTitle = document.getElementById('modal-title');

    function openModal(item) {
        currentModalItem = item;
        if (modalTitle) modalTitle.textContent = `Personalizar ${item.name}`;
        if (ingredientsList) {
            ingredientsList.innerHTML = item.ingredients.map(ing => `
                <label class="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl cursor-pointer group hover:bg-primary/10 transition-colors">
                    <span class="font-body text-sm text-white/80 group-hover:text-white">${ing}</span>
                    <input type="checkbox" checked class="rounded border-outline-variant/40 bg-transparent text-primary focus:ring-primary h-5 w-5 ingredient-checkbox" value="${ing}">
                </label>
            `).join('');
        }

        if (overlay) {
            overlay.classList.remove('hidden');
            setTimeout(() => {
                overlay.classList.remove('opacity-0');
                if (modal) modal.classList.remove('translate-y-8');
            }, 10);
        }
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (overlay) {
            overlay.classList.add('opacity-0');
            if (modal) modal.classList.add('translate-y-8');
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 300);
        }
        document.body.style.overflow = '';
        currentModalItem = null;
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            if (!currentModalItem) return;
            const checkboxes = document.querySelectorAll('.ingredient-checkbox');
            const removedIngredients = [];
            checkboxes.forEach(cb => {
                if (!cb.checked) removedIngredients.push(cb.value);
            });

            addToCart({
                id: currentModalItem.id,
                name: currentModalItem.name,
                price: currentModalItem.price,
                removedIngredients: removedIngredients
            });
            closeModal();
        });
    }

    // Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Attach to buttons
    document.querySelectorAll('.customize-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.menu-item-card');
            if (card) {
                const itemData = JSON.parse(card.getAttribute('data-item') || '{}');
                openModal(itemData);
            }
        });
    });
}

// --- Drawer Logic ---
function initDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    const drawer = document.getElementById('cart-drawer');
    const closeBtn = document.getElementById('close-drawer');
    const openBtn = document.getElementById('floating-cart-btn');

    function openDrawer() {
        if (overlay) {
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        }
        if (drawer) drawer.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if (overlay) {
            overlay.classList.add('opacity-0');
            setTimeout(() => overlay.classList.add('hidden'), 300);
        }
        if (drawer) drawer.classList.add('translate-x-full');
        document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
    });
}

// --- Toast Logic ---
let toastTimeout = null;
function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;

    if (toastTimeout) clearTimeout(toastTimeout);

    toast.classList.remove('opacity-0', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');

    toastTimeout = setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-4');
        toast.classList.remove('opacity-100', 'translate-y-0');
    }, 2000);
}

function animateBadge() {
    const badges = document.querySelectorAll('#mobile-cart-badge, #floating-cart-badge');
    badges.forEach(badge => {
        badge.classList.add('animate-bounce');
        setTimeout(() => badge.classList.remove('animate-bounce'), 1000);
    });
}

// --- WhatsApp Logic ---
function initWhatsApp() {
    const btn = document.getElementById('whatsapp-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        if (cart.length === 0) return;

        const PHONE_NUMBER = '595963837148'; // TODO: reemplazar con número real sin + ni espacios, ejemplo: 593912345678
        let message = '🍔 *PEDIDO - LA CHINGADA SODA BAR*\n';
        message += '─────────────────\n';
        
        cart.forEach(item => {
            message += `${item.quantity}x ${item.name}\n`;
            if (item.removedIngredients && item.removedIngredients.length > 0) {
                message += `   Sin: ${item.removedIngredients.join(', ')}\n`;
            }
            if (item.customizations) {
                message += `   ${item.customizations}\n`;
            }
            message += `   $${(item.price * item.quantity).toFixed(2)}\n`;
            message += '─────────────────\n';
        });

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `💰 Total: $${total.toFixed(2)}`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
    });
}

// --- Global Helpers for inline onclick ---
window.updateCartQuantity = (id, delta, removedIngredients, customizations) => {
    updateQuantity(id, delta, removedIngredients, customizations);
};

window.removeCartItem = (id, removedIngredients, customizations) => {
    removeFromCart(id, removedIngredients, customizations);
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    
    // Page specific initializations
    if (document.getElementById('menu-grid')) {
        initCategoryTabs();
        initSelectors();
        initModal();
    }

    if (document.getElementById('cart-items-list')) {
        initWhatsApp();
    }

    // Common components
    initDrawer();

    // Home page "Agregar" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('[data-item]');
            if (card) {
                const itemData = JSON.parse(card.getAttribute('data-item') || '{}');
                addToCart({
                    id: itemData.id,
                    name: itemData.name,
                    price: itemData.price
                });
            }
        });
    });
});
