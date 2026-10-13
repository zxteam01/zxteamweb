// ===== ZOLA XITERS — app.js =====

// ---- TAB SWITCHER (Fitur) ----
document.querySelectorAll('.tab-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        document.querySelectorAll('.tab-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const target = pill.dataset.for;
        document.querySelectorAll('.tab-body').forEach(body => {
            body.classList.toggle('hidden', body.id !== target);
        });
    });
});

// ---- KALKULATOR ----
const PRICE_PER_DAY = 10000;
const UV_PRICE = 5000;

const slider = document.getElementById('daySlider');
const dayLabel = document.getElementById('dayLabel');
const resultPrice = document.getElementById('resultPrice');
const optUv = document.getElementById('optUv');
const calcOrder = document.getElementById('calcOrder');

function calcTotal() {
    const days = parseInt(slider.value);
    const uv = optUv.checked ? UV_PRICE : 0;
    const total = (days * PRICE_PER_DAY) + uv;

    dayLabel.textContent = `${days} Hari`;
    resultPrice.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    return { days, total, uv };
}

slider.addEventListener('input', calcTotal);
optUv.addEventListener('change', calcTotal);
calcTotal();

calcOrder.addEventListener('click', () => {
    const { days, total, uv } = calcTotal();
    const uvText = uv > 0 ? ' + Pemasangan via UV FAST RESS (+5K)' : '';
    const msg = encodeURIComponent(
        `Halo Admin ZOLA XITERS 👋\n\nSaya mau order dari kalkulator:\n` +
        `Paket: Remote Panel Cosmic\n` +
        `Durasi: ${days} Hari${uvText}\n` +
        `Total: Rp ${total.toLocaleString('id-ID')}\n\n` +
        `Tolong diproses ya, terima kasih!`
    );
    window.open(`https://wa.me/6289652611028?text=${msg}`, '_blank');
});

// ---- MODAL ORDER ----
const modal = document.getElementById('orderModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalBadge = document.getElementById('modalBadge');
const orderForm = document.getElementById('orderForm');

function openModal(title, price) {
    modalBadge.textContent = price;
    modalTitle.textContent = title;
    orderForm.dataset.product = `${title} — ${price}`;
    modal.showModal();
    document.body.style.overflow = 'hidden';
}
window.openModal = openModal;

closeModal.addEventListener('click', () => {
    modal.close();
    document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.close();
        document.body.style.overflow = '';
    }
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const product = orderForm.dataset.product;
    const name = document.getElementById('cName').value.trim();
    const platform = document.getElementById('cPlatform').value;
    const notes = document.getElementById('cNotes').value.trim();

    const msg = encodeURIComponent(
        `Halo Admin ZOLA XITERS 👋\n\nOrder baru nih:\n` +
        `Produk: ${product}\n` +
        `Nama: ${name}\n` +
        `Platform: ${platform}\n` +
        (notes ? `Catatan: ${notes}\n` : '') +
        `\nMohon diproses, thanks!`
    );
    window.open(`https://wa.me/6289652611028?text=${msg}`, '_blank');
    modal.close();
    document.body.style.overflow = '';
    orderForm.reset();
});

// ---- NAVBAR SCROLL EFFECT ----
const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
    topbar.style.borderBottomColor = window.scrollY > 40
        ? 'rgba(232,0,30,0.25)'
        : 'rgba(232,0,30,0.18)';
}, { passive: true });
