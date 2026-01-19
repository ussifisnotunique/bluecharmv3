/* ===================================
    GLOBAL STATE
    =================================== */

let selectedProgram = '';

/* ===================================
    INITIALIZE ON PAGE LOAD
    =================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize components
    initNavbar();
    initMobileMenu();
    initLanguageSelector();
    initFloatingButtons();
    initScrollAnimations();
    initBookingForm();
    initServiceBooking();

    // Scroll to top on load to prevent automatic scrolling
    window.scrollTo(0, 0);
});

/* ===================================
    NAVBAR
    =================================== */

function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

/* ===================================
    MOBILE MENU
    =================================== */

function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuToggle.addEventListener('click', function () {
        openMobileMenu();
    });

    mobileMenuClose.addEventListener('click', function () {
        closeMobileMenu();
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeMobileMenu();
        });
    });

    function openMobileMenu() {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        lucide.createIcons();
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    mobileMenu.classList.remove('open');
    document.body.style.overflow = 'auto';
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
    lucide.createIcons();
}

/* ===================================
    LANGUAGE SELECTOR
    =================================== */

function initLanguageSelector() {
    // Desktop selector
    initSelector('language-btn', 'language-menu');
    // Mobile selector
    initSelector('language-btn-mobile', 'language-menu-mobile');
}

function initSelector(btnId, menuId) {
    const languageBtn = document.getElementById(btnId);
    const languageMenu = document.getElementById(menuId);

    console.log('initSelector called for btnId=' + btnId + ', menuId=' + menuId);
    console.log('Elements found: btn=' + !!languageBtn + ', menu=' + !!languageMenu);

    if (languageBtn && languageMenu) {
        console.log('Attaching event listener to ' + btnId);
        languageBtn.addEventListener('click', function () {
            console.log('Clicked ' + btnId + ', current aria-expanded=' + languageBtn.getAttribute('aria-expanded'));
            const isExpanded = languageBtn.getAttribute('aria-expanded') === 'true';
            languageBtn.setAttribute('aria-expanded', !isExpanded);
            languageMenu.classList.toggle('show');
            console.log('Toggled show class on ' + menuId + ', has show=' + languageMenu.classList.contains('show'));
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!languageBtn.contains(e.target) && !languageMenu.contains(e.target)) {
                languageBtn.setAttribute('aria-expanded', 'false');
                languageMenu.classList.remove('show');
            }
        });

        // Close menu when pressing Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                languageBtn.setAttribute('aria-expanded', 'false');
                languageMenu.classList.remove('show');
            }
        });
    }
}

/* ===================================
    FLOATING CONTACT BUTTONS
    =================================== */

function initFloatingButtons() {
    // Tooltips are now handled by Hugo i18n
}

/* ===================================
    SCROLL ANIMATIONS
    =================================== */

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
}

/* ===================================
    BOOKING FORM
    =================================== */

function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');

    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(bookingForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const whatsapp = formData.get('whatsapp');
        const email = formData.get('email');
        const date = formData.get('date');
        const program = formData.get('program');
        const message = formData.get('message');

        const whatsappMessage = `Hello, I want to book ${program} on ${date}. Name: ${name}, Phone: ${phone}, WhatsApp: ${whatsapp}, Email: ${email}, Message: ${message}`;

        const whatsappUrl = `https://wa.me/201065940203?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
    });
}

/* ===================================
    SERVICE BOOKING
    =================================== */

function initServiceBooking() {
    document.querySelectorAll('.service-card-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const programValue = this.getAttribute('data-program');
            const cardId = this.closest('.service-card').id;
            handleBooking(programValue, cardId);
        });
    });
}

/* ===================================
    SERVICE BOOKING HANDLER
    =================================== */

function handleBooking(programValue, cardId) {
    const card = document.getElementById(cardId);

    // Animate card
    if (card) {
        card.classList.add('animating');
        setTimeout(() => {
            card.classList.remove('animating');
        }, 500);
    }

    // Set program and show success
    setTimeout(() => {
        selectedProgram = programValue;
        const programSelect = document.getElementById('program');
        if (programSelect) {
            programSelect.value = programValue;

            // Highlight select
            programSelect.classList.add('highlight');
            setTimeout(() => {
                programSelect.classList.remove('highlight');
            }, 1000);
        }

        // Show success notification
        showSuccessNotification();

        // Scroll to booking
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    }, 300);
}

function showSuccessNotification() {
    const notification = document.getElementById('success-notification');
    if (notification) {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 1500);
    }
}

// Make handleBooking available globally for inline handlers
window.handleBooking = handleBooking;