document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = Array.from(document.querySelectorAll('.gallery-items')); // matches your HTML
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    const filterButtons = Array.from(document.querySelectorAll('.filter-button')); // matches your HTML

    let visibleItems = [];
    let currentIndex = 0;

    function updateVisibleItems() {
        visibleItems = galleryItems.filter(item => item.style.display !== 'none');
    }

    function showImage() {
        if (!visibleItems.length) return;
        currentIndex = (currentIndex + visibleItems.length) % visibleItems.length;
        const img = visibleItems[currentIndex].querySelector('img');
        if (!img || !lightboxImg) return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
    }

    // open lightbox on click
    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            updateVisibleItems();
            currentIndex = visibleItems.indexOf(this);
            if (currentIndex === -1) currentIndex = 0;
            showImage();
            if (lightbox) lightbox.classList.add('show');
        });
    });

    // next / prev
    if (nextBtn) nextBtn.addEventListener('click', () => {
        if (!visibleItems.length) return;
        currentIndex = (currentIndex + 1) % visibleItems.length;
        showImage();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        if (!visibleItems.length) return;
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        showImage();
    });

    // close
    if (closeBtn) closeBtn.addEventListener('click', () => {
        if (lightbox) lightbox.classList.remove('show');
    });

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('show');
        });
    }

    // keyboard
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('show')) return;
        if (e.key === 'ArrowRight') nextBtn && nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn && prevBtn.click();
        if (e.key === 'Escape') closeBtn && closeBtn.click();
    });

    // filters
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            galleryItems.forEach(item => {
                item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
            });
            updateVisibleItems();
        });
    });

    // initial
    updateVisibleItems();
});

