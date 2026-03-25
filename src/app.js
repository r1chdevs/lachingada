const products = [
  {
    id: 1,
    name: 'Speyside Reserve 18Y',
    price: 145.00,
    category: 'Whiskies',
    sub: 'Malta Única',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpnFwQf-79kbv9OJiowRGRN-mctgK4u29V00dYuz4oLqM7v0J222p10-yR95Pxy6_aUBfKw-KbFKguH9LWriSm6qYamOStQ07BN5dLwZpm16Ga_vVLL8L5umfLT-lFXco1CTSLq7gjxv0HbGVtvOrAEp83JBNgSF9icv_Z81HKuywR2DshF4Q-1OspPMBcnlLLAUplX3klU8tqqPX2_2hrVbgnMbvstW3t9X5A1Vq5sQhtsdPvTB9LR-sgba_xvPyNR6OqS8_fTw',
    rating: 4.9,
    stock: 'En Stock'
  },
  {
    id: 2,
    name: 'Nordic Mist Dry Gin',
    price: 52.00,
    category: 'Ginebra',
    sub: 'Botánico',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKJNPnHPsWfiMr-235EDO55dXBicGreWoBAsm3M4izvCqeH6B5jA9R-Zdwf3n5LPBJnVjHprJPDA5lcCmmbQ4mCbiFY-9EufcbYP9KpvOWHo2JQmbQqSdyJkLm89Y7DGR-_jwvabfnwkJkvM5z-GlQ4ASGrNoWFMv0cdce0bEr2OKCij9VjTb1-7L0foM3SfGKvO1Y68uvFuGu3n8z3kiJ9qoNiLtynLnFc9krlslcyPAyzPk-cR6n8VRRzkoTkA-90yxvnFtYlw',
    rating: 4.7
  },
  {
    id: 3,
    name: 'Veuve Estate 2016',
    price: 89.00,
    category: 'Vinos',
    sub: 'Cabernet',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtB7YlKfBRXpfYWyY1LfMg4ORPGhA4oRZWLYxsU6kjN9F8WhNzjWJ0tY5jvxvWJMyayuGsUEBn9HqMv0JrubWwJKkPwqZk6Zc9x3jiMIyxsHBIDOmcyNSHU1-L1arPRp5j5awtEDoo8X3RWwyPza4Okm-5rfO5n3l5zAkMIbkxn6DrwUsWXl-B_p4s5AayHfv6Xj1fIFL68MgCuaiFiV-bh32oFpQShGpE1fC0M2v0RAB4AARFKup2Ie7f1Dn8rVnXWJA1TDDCZQ',
    rating: 5.0
  },
  {
    id: 4,
    name: 'Oak & Amber Bourbon',
    price: 78.00,
    category: 'Whiskies',
    sub: 'Lote Pequeño',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaTF_8Jnnaeo_L0Tt6Nl7Qt1uGRPBsCScBAio5sQJJLx33KD_hnxmk3_8YZeFFJYO1HsUZE379Tsd0eqGXZfAZebyg4VyOkJadahStnQRKhIpJ9H3AMXN6k6LEydtwyka7Pf9nwtLjB2XHcpEOQpogVOT59itA0Np06IjTRlUdDgCEwNLnS0ssPl3p9dTdgAbM7ZDGhCzLniFk8PCctm9BGksEuhwyolWaNBPcHN-muffJc_hlAGNKorZSFSbpw8H6ixeTrdd0dg',
    rating: 4.8,
    status: 'Limitado'
  },
  {
    id: 5,
    name: 'Azul Cristalino',
    price: 112.00,
    category: 'Tequila',
    sub: 'Añejo',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBub6dZK_GPS190FiVFJIBihTqPyE6C644rLZob3EKO5L7IFb2er4M1MldmKeHF8qIiNmhuHFyo2AidU6S892D0F_CmRO2AuSSlcXUACN3R3V0ompJyHToR1tFmlU4CBEgrHRYoN5cukzRkqNNI7sCEWc1k3ieLvp7EOD1gCOWoRizK7iWFVuR1JflR7R_4MEvVyGdqOSsF3Bd03XtDN9aAz1C1ZV8TzH65VYzoZTIsOhS9LMDqHIAslpgClNuy38aK5bUIU0KUAA',
    rating: 4.9
  },
  {
    id: 6,
    name: 'Torino Rosso Vermouth',
    price: 38.00,
    category: 'Ron',
    sub: 'Aperitivo',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAespV1MRoih8qyf9ag8uAyf26tPWSTUsRzCzFo2CkcclmM_3MV3JnUOVKjPfghtHIe-EKOpXzu53XTjPtdhQyBxgFviPHAiy9j4ABv8IS4wd95mXphYBCySRLJNfbw7LxfpGNTREuMXnjRyomZ5ijtdlWe66SVtjHqlgfM0icCiULIZY_hA2fMb59Bblh4uC1IvRgx-PA_LpKuCnaiqGEV_F8YEtMk4nTAoSU4d5OaqMoOrd0GArrdAk1SktHtg5p8hcuMtBpQyQ',
    rating: 4.6
  },
  {
    id: 7,
    name: 'Mountain Stream Sake',
    price: 64.00,
    category: 'Sake',
    sub: 'Junmai Ginjo',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJdXdYFHO4wOy0UPGmu2Krd4jwzcUZCS9QluD0sBKFljtlWQsFcN4QhYf0Wfx6G0ZIqioSAXR0WI7ASC8uo8HDhAiRlPxaa-qHy0WcH24sKHcG-199rm_pLzC6XEwytSr9xBCzX1pe8gCMr--Dj9XufSNSAV0ZjYywlx9iTiDdVDyI8X_T-eiEb7nQRqMmrGY0GHa4HgYXOerny6clVQjj6yFO92q3w1uJbcAulaOtHYu2bJqlqxITYyP-xasj9FVixIBy13ey6g',
    rating: 4.8
  },
  {
    id: 9,
    name: 'Crystal Glass',
    price: 45.00,
    category: 'Accesorios',
    sub: 'Cristalería',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUsUgnKUckuOiml-01vtICcz0pmIx-9C5gy5hyVDH-BE5ve7SDkB1wK7VGc_GKM2FDAMi878cSNzVcJWkXRYx8_AUvChq9n7RowMisub63k0DA5YzQiteX0YXp-ZqWYThyIVJ42qqZHJJlrzeSq9TNZbySmaX7IGMPa3-YW0uh4sryC_NYJiKqwlBgy2CrGpIl6KrxaFB6h7C8HKxqKjLIkU2Wq6niaI-Rkuy1OoH8jEz95fzHF6kByzlbLKVuXakfj0EWZNKOcA',
    rating: 4.5
  },
  {
    id: 11,
    name: 'Colección Noir 2024',
    price: 4250.00,
    category: 'Colecciones',
    sub: 'Edición Limitada',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf23D7jNWvzU1vfdnk2ymNtR1dABFENBrtDGynDpgnkzaFSTgEkPrTr0vxppkrryMYqSDiMvsUhF0rdpjyE5c8kMmN8h9PP_cp3iMGBSwiReSVpArGCsurL-bzmcJ9uZcHaHPPHfFvzTRuVgC-Ee6roxfiGE1ffwquSHrzg0piIOubMWi5b-X_m1SO12bW1OjWO4BS1Wo1C9Pl8uo02EEPuZDdFZiKc-HPd3laIhfFerWwVzVCHi-NI05lVhEga7reJfqZOPfGvQ',
    rating: 5.0
  },
  {
    id: 12,
    name: 'El Set del Alquimista',
    price: 890.00,
    category: 'Colecciones',
    sub: 'Kit de Mixología',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-cmHffuDkp73MK-9clh33RTxx72LSGwqPIJZ8GIuXaFI_cq9CfWISmbOcrq6R7jt7wqH3b0n_WAnhAE3-fC4-4v_26ltmdhcK17UOzDmuh-hBwgwz3FgOPHCOSrW8p5z4uFiN1J-vkQMp0JYpS7MGsrNyVMsmWAXIgghT6iOt8F28ilmYGkRMnzh6KSO1KdcS0NDQ8Wex1vbdU1Rxqrvo3G_fkBw1chVUSDHuPOqFwrDa4-F9jWA2B5s1_ufW8_WWnrauajfY1A',
    rating: 4.9
  }
];

// Global State
let cart = JSON.parse(sessionStorage.getItem('atelier_cart')) || {};
let currentCategory = 'Todos';
let searchTerm = '';

function saveCart() {
  sessionStorage.setItem('atelier_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function addToCart(productId) {
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart();
  if (window.renderCart) window.renderCart();
  // Optional: Show a toast or feedback
}

function updateQuantity(productId, delta) {
  if (cart[productId]) {
    cart[productId] += delta;
    if (cart[productId] <= 0) {
      delete cart[productId];
    }
    saveCart();
    if (window.renderCart) window.renderCart();
  }
}

function removeFromCart(productId) {
  delete cart[productId];
  saveCart();
  if (window.renderCart) window.renderCart();
}

// Global Init
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  
  // Catalog Page Logic
  const catalogGrid = document.getElementById('catalog-grid');
  if (catalogGrid) {
    const urlParams = new URLSearchParams(window.location.search);
    currentCategory = urlParams.get('categoria') || 'Todos';
    
    renderProducts();
    
    // Update UI for initial filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      const category = btn.getAttribute('data-category');
      if (category === currentCategory) {
        btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
        btn.classList.add('bg-primary', 'text-white');
      } else {
        btn.classList.remove('bg-primary', 'text-white');
        btn.classList.add('bg-surface-container-high', 'text-on-surface-variant');
      }
    });
    
    // Category Filter Listeners
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-category');
        
        // Update UI
        filterButtons.forEach(b => {
          b.classList.remove('bg-primary', 'text-white');
          b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
        });
        btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
        btn.classList.add('bg-primary', 'text-white');
        
        renderProducts();
      });
    });

    // Search Logic
    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');

    if (searchToggle && searchContainer && searchInput) {
      searchToggle.addEventListener('click', () => {
        const isOpening = searchContainer.classList.contains('w-0');
        if (isOpening) {
          searchContainer.classList.remove('w-0', 'opacity-0');
          searchContainer.classList.add('w-40', 'md:w-64', 'opacity-100', 'px-2');
          searchInput.focus();
        } else {
          closeSearch();
        }
      });

      searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderProducts();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !searchContainer.classList.contains('w-0')) {
          closeSearch();
        }
      });

      function closeSearch() {
        searchContainer.classList.add('w-0', 'opacity-0');
        searchContainer.classList.remove('w-40', 'md:w-64', 'opacity-100', 'px-2');
        searchInput.value = '';
        searchTerm = '';
        renderProducts();
      }
    }
  }

  // Cart Page Logic
  if (document.getElementById('cart-items-list')) {
    window.renderCart = renderCart;
    renderCart();
  }
});

function renderProducts() {
  const catalogGrid = document.getElementById('catalog-grid');
  if (!catalogGrid) return;

  let filtered = currentCategory === 'Todos' 
    ? products.filter(p => p.category !== 'Accesorios' && p.category !== 'Colecciones') 
    : products.filter(p => p.category === currentCategory);

  if (searchTerm) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.category.toLowerCase().includes(searchTerm)
    );
  }

  if (filtered.length === 0) {
    catalogGrid.innerHTML = `
      <div class="col-span-full py-20 text-center">
        <span class="material-symbols-outlined text-6xl text-outline-variant mb-4">search_off</span>
        <p class="text-on-surface-variant font-medium">No se encontraron productos</p>
      </div>
    `;
    return;
  }

  catalogGrid.innerHTML = filtered.map(product => `
    <div class="group flex flex-col gap-4">
      <div class="relative aspect-[4/5] bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm transition-transform duration-500 group-hover:-translate-y-2">
        <img alt="${product.name}" class="w-full h-full object-cover" src="${product.img}"/>
        ${product.stock ? `<div class="absolute top-4 left-4 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">${product.stock}</div>` : ''}
        ${product.status ? `<div class="absolute top-4 right-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">${product.status}</div>` : ''}
        <button onclick="addToCart(${product.id})" class="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 shadow-lg active:scale-90">
          <span class="material-symbols-outlined">add_shopping_cart</span>
        </button>
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-[10px] text-secondary font-black uppercase tracking-[0.2em]">${product.sub}</span>
        <h3 class="text-xl font-bold tracking-tight text-on-surface group-hover:text-secondary transition-colors">${product.name}</h3>
        <div class="flex items-center justify-between">
          <p class="text-lg font-medium text-on-surface-variant">$${product.price.toFixed(2)}</p>
          <div class="flex items-center gap-1 text-secondary">
            <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
            <span class="text-xs font-bold">${product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderCart() {
  const container = document.getElementById('cart-items-list');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const whatsappBtn = document.getElementById('whatsapp-btn');
  
  if (!container) return;

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = products.find(p => p.id === parseInt(id));
    return { ...product, qty };
  });

  if (cartItems.length === 0) {
    container.innerHTML = '<p class="text-center py-12 text-on-surface-variant">Tu carrito está vacío.</p>';
    subtotalEl.textContent = '$ 0.00';
    totalEl.textContent = '$ 0.00';
    if (whatsappBtn) whatsappBtn.disabled = true;
    return;
  }

  if (whatsappBtn) whatsappBtn.disabled = false;

  container.innerHTML = cartItems.map(item => `
    <div class="flex gap-6 items-start group">
      <div class="w-24 h-32 bg-surface-container-lowest rounded-lg overflow-hidden flex-shrink-0">
        <img class="w-full h-full object-cover" alt="${item.name}" src="${item.img}"/>
      </div>
      <div class="flex-grow">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-bold tracking-tight text-on-surface leading-tight">${item.name}</h3>
            <p class="text-sm text-on-surface-variant font-medium mt-1">${item.sub}</p>
          </div>
          <button onclick="removeFromCart(${item.id})" class="text-on-surface-variant hover:text-error transition-colors">
            <span class="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
        <div class="flex justify-between items-end mt-6">
          <div class="flex items-center bg-surface-container-high rounded-full px-1 py-1">
            <button onclick="updateQuantity(${item.id}, -1)" class="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-surface-container-highest rounded-full transition-colors">
              <span class="material-symbols-outlined text-lg">remove</span>
            </button>
            <span class="px-4 text-sm font-bold">${String(item.qty).padStart(2, '0')}</span>
            <button onclick="updateQuantity(${item.id}, 1)" class="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-surface-container-highest rounded-full transition-colors">
              <span class="material-symbols-outlined text-lg">add</span>
            </button>
          </div>
          <span class="text-lg font-bold text-secondary">$ ${(item.price * item.qty).toFixed(2)}</span>
        </div>
      </div>
    </div>
  `).join('');

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  subtotalEl.textContent = `$ ${subtotal.toFixed(2)}`;
  totalEl.textContent = `$ ${subtotal.toFixed(2)}`;

  if (whatsappBtn) {
    whatsappBtn.onclick = () => {
      const message = encodeURIComponent(
        `Hola, me gustaría realizar un pedido:\n\n` +
        cartItems.map(item => `- ${item.name} (x${item.qty}): $${(item.price * item.qty).toFixed(2)}`).join('\n') +
        `\n\nTotal: $${subtotal.toFixed(2)}`
      );
      /* TODO: replace with real WhatsApp number */
      window.open(`https://wa.me/593963837148?text=${message}`, '_blank');
    };
  }
}
