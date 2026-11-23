/* ==========================================================================
   CALENI — LÓGICA INTERACTIVA, DIAGNÓSTICO, CARRITO Y CUPONES
   ========================================================================== */

// Número de WhatsApp de atención (cámbialo por el número real en formato internacional)
const WHATSAPP_NUMBER = "51999999999";

// Catálogo de productos con precios estimados en Soles (PEN)
const PRODUCTS = [
  {
    id: "kit-anticaida",
    category: "kits",
    tagClass: "tag-caida",
    tagText: "Especialidad: Caída de Cabello",
    name: "Kit Caleni Fortalecedor Anticaída",
    description: "Sistema completo para frenar la caída desde el folículo y medir tu recuperación.",
    includes: [
      "✓ 1 Peine micro-dosificador con mango de corcho",
      "✓ 1 Sérum Elixir Anticaída (30 ml)",
      "✓ 10 Tiras detectoras de daño capilar"
    ],
    price: 119.00
  },
  {
    id: "kit-anticaspa",
    category: "kits",
    tagClass: "tag-caspa",
    tagText: "Especialidad: Control Caspa",
    name: "Kit Caleni Purificante Anticaspa",
    description: "Equilibra la microbiota del cuero cabelludo, elimina la descamación y calma la picazón.",
    includes: [
      "✓ 1 Peine micro-dosificador con mango de corcho",
      "✓ 1 Sérum Elixir Anticaspa (30 ml)",
      "✓ 10 Tiras detectoras de daño capilar"
    ],
    price: 119.00
  },
  {
    id: "serum-anticaida",
    category: "serums",
    tagClass: "tag-caida",
    tagText: "Repuesto Sérum • 30 ml",
    name: "Sérum Elixir Capilar Anticaída",
    description: "Fórmula concentrada de rápida absorción diseñada para recargar tu peine Caleni.",
    includes: [
      "✓ Frasco ámbar con gotero de precisión (30 ml)",
      "✓ Rinde hasta 30 aplicaciones directas a la raíz",
      "✓ Estimula la densidad y resistencia"
    ],
    price: 59.00
  },
  {
    id: "serum-anticaspa",
    category: "serums",
    tagClass: "tag-caspa",
    tagText: "Repuesto Sérum • 30 ml",
    name: "Sérum Elixir Capilar Anticaspa",
    description: "Acción botánica purificante sin resecar las puntas. Ideal para recargar tu peine Caleni.",
    includes: [
      "✓ Frasco ámbar con gotero de precisión (30 ml)",
      "✓ Controla el exceso de sebo y descamación",
      "✓ Sensación fresca y ligera"
    ],
    price: 59.00
  },
  {
    id: "tiras-indicadoras",
    category: "accesorios",
    tagClass: "tag-general",
    tagText: "Diagnóstico Continuo",
    name: "Pack 20 Cintillos Indicadores de Daño",
    description: "Monitorea semana a semana si tu cabello está mejorando con nuestra escala del 1 al 5.",
    includes: [
      "✓ 20 tiras reactivas individuales",
      "✓ Cartilla de lectura colorimétrica (niveles 1–5)",
      "✓ Detecta evolución de caída y caspa"
    ],
    price: 29.00
  }
];

// Datos de la escala 1 a 5 de la tira indicadora
const DIAGNOSTIC_LEVELS = {
  1: {
    badge: "Nivel 1 • Equilibrio Natural",
    title: "Raíz Saludable y Protegida",
    desc: "Tu cuero cabelludo presenta un equilibrio óptimo y hebras fuertes. El indicador confirma ausencia de descamación activa o debilitamiento folicular.",
    rec: "Aplica el Sérum Caleni 2 veces por semana de forma preventiva con tu peine dosificador."
  },
  2: {
    badge: "Nivel 2 • Desgaste Leve",
    title: "Inicio de Sensibilidad o Sequedad",
    desc: "Se detectan señales tempranas de estrés capilar (leve caída estacional o ligera descamación superficial).",
    rec: "Inicia rutina 3 veces por semana con el Kit Caleni correspondiente y evalúa en 15 días."
  },
  3: {
    badge: "Nivel 3 • Necesidad Moderada",
    title: "Debilitamiento o Desequilibrio Activo",
    desc: "Tu tira muestra una alteración clara en la raíz. Es el momento clave para actuar antes de que el problema se intensifique.",
    rec: "Uso interdiario del peine micro-dosificador cargado con Sérum Anticaída o Anticaspa."
  },
  4: {
    badge: "Nivel 4 • Alerta Capilar",
    title: "Caída Persistente o Caspa Visible",
    desc: "El folículo requiere nutrición intensiva directa. La micro-dosificación por las puntas del peine ayudará a penetrar sin maltratar la hebra.",
    rec: "Aplicación diaria nocturna durante 3 semanas + control quincenal con cintillo indicador."
  },
  5: {
    badge: "Nivel 5 • Atención Prioritaria",
    title: "Daño Severo en Raíz y Fibra",
    desc: "Nivel máximo de alerta en la escala Caleni. Se recomienda tratamiento intensivo constante y seguimiento personalizado.",
    rec: "Tratamiento intensivo diario con Kit Caleni + asesoría gratuita con nuestro equipo vía WhatsApp."
  }
};

// Cupones válidos
const COUPONS = {
  "CALENI15": { type: "percent", value: 15, label: "15% de descuento" },
  "RAIZ20": { type: "fixed", value: 20, label: "S/ 20.00 de descuento" }
};

let cart = [];
let activeCoupon = null;

// Inicializar aplicación
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  renderProducts("all");
  setupFilters();
  setupDiagnostic();
  setupCart();
  setupForms();
  setupMobileMenu();
  setupNavbarScroll();
  startMotivationalTicker();
});

// Sombra sutil en navbar al hacer scroll
function setupNavbarScroll() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });
}

// Frases motivacionales rotativas
function startMotivationalTicker() {
  const quotes = [
    "✨ Tu cabello tiene necesidad, Caleni tiene soluciones • Código: CALENI15",
    "🌿 Ciencia a la medida de tu raíz • Envío a todo el Perú",
    "♡ Belleza y cuidado en cada detalle • Evalúa tu progreso cada 15 días"
  ];
  let idx = 0;
  const tickerEl = document.getElementById("motivational-ticker");
  setInterval(() => {
    idx = (idx + 1) % quotes.length;
    tickerEl.textContent = quotes[idx];
  }, 5000);
}

// Renderizar catálogo
function renderProducts(filter) {
  const grid = document.getElementById("products-grid");
  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(prod => `
    <article class="product-card">
      <div>
        <span class="prod-tag ${prod.tagClass}">${prod.tagText}</span>
        <h3>${prod.name}</h3>
        <p>${prod.description}</p>
        <ul class="prod-includes">
          ${prod.includes.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>
      <div class="prod-footer">
        <span class="prod-price">S/ ${prod.price.toFixed(2)}</span>
        <button class="btn btn-primary btn-sm" onclick="addToCart('${prod.id}')">
          Agregar
        </button>
      </div>
    </article>
  `).join("");
}

function setupFilters() {
  const btns = document.querySelectorAll(".filter-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(btn.dataset.filter);
    });
  });
}

// Simulador de Tiras Indicadoras (1–5)
function setupDiagnostic() {
  const stripBtns = document.querySelectorAll(".strip-btn");
  stripBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      stripBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const data = DIAGNOSTIC_LEVELS[btn.dataset.level];
      document.getElementById("res-badge").textContent = data.badge;
      document.getElementById("res-title").textContent = data.title;
      document.getElementById("res-desc").textContent = data.desc;
      document.getElementById("res-rec").textContent = data.rec;
    });
  });
}

// Lógica del Carrito de Compras
function setupCart() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");

  const openCart = () => {
    drawer.classList.add("open");
    overlay.classList.add("open");
  };
  const closeCart = () => {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
  };

  document.getElementById("open-cart-btn").addEventListener("click", openCart);
  document.getElementById("close-cart-btn").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);

  // Aplicar cupón
  document.getElementById("apply-coupon-btn").addEventListener("click", () => {
    const code = document.getElementById("coupon-input").value.trim().toUpperCase();
    const feedback = document.getElementById("coupon-feedback");

    if (COUPONS[code]) {
      activeCoupon = { code, ...COUPONS[code] };
      feedback.style.color = "#2E7D32";
      feedback.textContent = `✓ Cupón ${code} aplicado (${activeCoupon.label})`;
      updateCartUI();
    } else {
      activeCoupon = null;
      feedback.style.color = "#C62828";
      feedback.textContent = "Código no válido. Prueba con CALENI15 o RAIZ20.";
      updateCartUI();
    }
  });

  // Finalizar pedido por WhatsApp
  document.getElementById("checkout-whatsapp-btn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío. Agrega un Kit o Sérum Caleni primero.");
      return;
    }

    let message = "Hola *Caleni* 🌿, quisiera realizar el siguiente pedido:\n\n";
    cart.forEach(item => {
      message += `• ${item.qty}x ${item.name} — S/ ${(item.price * item.qty).toFixed(2)}\n`;
    });

    const totals = calculateTotals();
    if (activeCoupon) {
      message += `\n🎟️ Cupón aplicado: *${activeCoupon.code}* (-S/ ${totals.discount.toFixed(2)})`;
    }
    message += `\n💰 *Total a pagar: S/ ${totals.total.toFixed(2)}*\n\nQuedo atento(a) para coordinar el envío. ¡Gracias!`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  });

  updateCartUI();
}

window.addToCart = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
};

window.changeQty = function(productId, delta) {
  const idx = cart.findIndex(item => item.id === productId);
  if (idx === -1) return;

  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) {
    cart.splice(idx, 1);
  }
  updateCartUI();
};

function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  let discount = 0;

  if (activeCoupon && subtotal > 0) {
    if (activeCoupon.type === "percent") {
      discount = subtotal * (activeCoupon.value / 100);
    } else if (activeCoupon.type === "fixed") {
      discount = Math.min(subtotal, activeCoupon.value);
    }
  }

  return {
    subtotal,
    discount,
    total: Math.max(0, subtotal - discount)
  };
}

function updateCartUI() {
  const container = document.getElementById("cart-items");
  const countBadge = document.getElementById("cart-count");

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  countBadge.textContent = totalItems;

  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align:center; color: var(--text-muted); margin-top: 2rem;">Tu carrito está vacío.<br>Descubre nuestros Kits Capilares.</p>`;
  } else {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <small>S/ ${item.price.toFixed(2)} c/u</small>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
        </div>
      </div>
    `).join("");
  }

  const { subtotal, discount, total } = calculateTotals();
  document.getElementById("cart-subtotal").textContent = `S/ ${subtotal.toFixed(2)}`;
  document.getElementById("cart-total").textContent = `S/ ${total.toFixed(2)}`;

  const discountRow = document.getElementById("discount-row");
  if (discount > 0) {
    discountRow.style.display = "flex";
    document.getElementById("cart-discount").textContent = `- S/ ${discount.toFixed(2)}`;
  } else {
    discountRow.style.display = "none";
  }
}

// Formularios de Asesoría WhatsApp y Suscripción
function setupForms() {
  document.getElementById("whatsapp-consult-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("user-name").value.trim();
    const issue = document.getElementById("hair-issue").value.trim();

    const text = `Hola *Caleni* 🌿, mi nombre es *${name}*. Busco asesoría personalizada porque mi cabello presenta lo siguiente:\n\n"${issue}"\n\n¿Qué recomendación me darían?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  });

  document.getElementById("newsletter-form").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("coupon-reveal").style.display = "block";
    document.getElementById("newsletter-email").value = "";
  });

  document.getElementById("copy-coupon-btn").addEventListener("click", () => {
    navigator.clipboard.writeText("CALENI15");
    document.getElementById("copy-coupon-btn").textContent = "¡Copiado!";
  });
}

function setupMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const links = document.getElementById("nav-links");
  btn.addEventListener("click", () => {
    links.classList.toggle("active");
  });
  links.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      links.classList.remove("active");
    });
  });
}
