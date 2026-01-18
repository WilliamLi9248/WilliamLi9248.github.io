// ==========================================
// PHOTOGRAPHY PAGE - LIGHTBOX & GALLERY
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initLightbox();
    initLazyLoading();
});

// ==========================================
// LIGHTBOX FUNCTIONALITY
// ==========================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

    // Open lightbox on image click
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            openLightbox(images[currentIndex]);
        });
    });

    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigation
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigatePrev();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateNext();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigatePrev();
                break;
            case 'ArrowRight':
                navigateNext();
                break;
        }
    });

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigatePrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    function navigateNext() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                navigateNext();
            } else {
                navigatePrev();
            }
        }
    }
}

// ==========================================
// LAZY LOADING WITH INTERSECTION OBSERVER
// ==========================================
function initLazyLoading() {
    const images = document.querySelectorAll('.gallery-item img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ==========================================
// SMOOTH SCROLL FOR NAV LINKS
// ==========================================
document.querySelectorAll('a[href^="index.html#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Let the browser handle navigation to index.html with hash
    });
});
