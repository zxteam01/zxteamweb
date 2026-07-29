// ZOLA XITERS - Free Fire Remote Panel & HideX Interactive Script

document.addEventListener('DOMContentLoaded', () => {

    /* ---------------------------------------------------
       1. Theme Toggle (Dark / Light Mode)
       --------------------------------------------------- */
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    const savedTheme = localStorage.getItem('zola-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('zola-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-moon';
            themeIcon.style.color = '#ff003c';
        } else {
            themeIcon.className = 'fa-solid fa-sun';
            themeIcon.style.color = '#f59e0b';
        }
    }

    /* ---------------------------------------------------
       2. Counter Animation
       --------------------------------------------------- */
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateCounters() {
        if (animated) return;
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = Math.ceil(target / 40);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = current;
                }
            }, 35);
        });
        animated = true;
    }

    animateCounters();

    /* ---------------------------------------------------
       3. Specification Tabs Switcher (AIM, VISUAL, SPECIAL)
       --------------------------------------------------- */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const activeContent = document.getElementById(targetTab);
            if (activeContent) activeContent.classList.add('active');
        });
    });

    /* ---------------------------------------------------
       4. Interactive Remote Panel Calculator Widget
       --------------------------------------------------- */
    const daysSlider = document.getElementById('daysCount');
    const daysValLabel = document.getElementById('daysVal');
    const optStream = document.getElementById('optStream');
    const optExpressKey = document.getElementById('optExpressKey');
    const optUvFast = document.getElementById('optUvFast');
    const totalPriceEl = document.getElementById('calcTotalPrice');
    const calcOrderBtn = document.getElementById('calcOrderBtn');

    function calculateTotal() {
        if (!daysSlider) return;
        const days = parseInt(daysSlider.value);
        daysValLabel.textContent = `${days} Hari`;

        // Base 10k/day
        let base = days * 10000;
        let addOns = 0;
        if (optUvFast && optUvFast.checked) addOns += 5000; // +5k IDR for UV FAST RESS

        const total = base + addOns;
        totalPriceEl.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    }

    if (daysSlider) {
        daysSlider.addEventListener('input', calculateTotal);
        if (optStream) optStream.addEventListener('change', calculateTotal);
        if (optExpressKey) optExpressKey.addEventListener('change', calculateTotal);
        if (optUvFast) optUvFast.addEventListener('change', calculateTotal);
        calculateTotal();
    }

    if (calcOrderBtn) {
        calcOrderBtn.addEventListener('click', () => {
            const days = daysSlider.value;
            const price = totalPriceEl.textContent;
            const message = `Halo Admin ZOLA XITERS, saya mau order sewa *Remote Panel Free Fire*:%0A- Durasi: ${days} Hari%0A- Estimasi Harga: ${price}%0A- Streamproof Logo: ${optStream.checked ? 'Ya' : 'Tidak'}%0A- Pemasangan via UV FAST RESS (+5k): ${optUvFast.checked ? 'Ya' : 'Tidak'}`;
            
            window.open(`https://wa.me/6289652611028?text=${message}`, '_blank');
        });
    }

    /* ---------------------------------------------------
       5. Package Dialog Modal & WhatsApp Order Generator
       --------------------------------------------------- */
    const dialog = document.getElementById('orderModal');
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalPackageTitle = document.getElementById('modalPackageTitle');
    const modalBadge = document.getElementById('modalBadge');
    const orderForm = document.getElementById('orderForm');

    let selectedPackageName = 'Remote Panel Cosmic FF';
    let selectedPackagePrice = '10K';

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            selectedPackageName = btn.getAttribute('data-package');
            selectedPackagePrice = btn.getAttribute('data-price');

            modalPackageTitle.textContent = `Order ${selectedPackageName}`;
            modalBadge.textContent = selectedPackagePrice;

            if (typeof dialog.showModal === 'function') {
                dialog.showModal();
            } else {
                dialog.setAttribute('open', 'true');
            }
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (typeof dialog.close === 'function') {
                dialog.close();
            } else {
                dialog.removeAttribute('open');
            }
        });
    }

    dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
        ) {
            dialog.close();
        }
    });

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('clientName').value;
            const winVer = document.getElementById('windowsVer').value;
            const notes = document.getElementById('clientNotes').value;

            let text = `Halo Admin ZOLA XITERS! Saya mau beli lisensi *${selectedPackageName}* (${selectedPackagePrice})%0A%0A`;
            text += `*Data Pemesan Free Fire:*%0A`;
            text += `• Nama / Contact: ${encodeURIComponent(name)}%0A`;
            text += `• OS Windows & Emulator: ${encodeURIComponent(winVer)}%0A`;
            if (notes.trim()) {
                text += `• Catatan: ${encodeURIComponent(notes)}%0A`;
            }
            text += `%0AMohon dibantu proses key & pembayaran. Terima kasih!`;

            window.open(`https://wa.me/6289652611028?text=${text}`, '_blank');
            dialog.close();
        });
    }

});
