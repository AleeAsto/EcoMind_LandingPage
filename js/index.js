// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. DEFINIR TODAS LAS PÁGINAS ---
    const mainPage = document.querySelector('main');
    const signupPage = document.getElementById('signup-page');
    const communityPage = document.getElementById('community-page');
    const parentsGuidePage = document.getElementById('parents-guide-page');
    const faqPage = document.getElementById('faq-page');
    
    // Referencias al Header y Footer
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Array con todas las "páginas" para ocultarlas fácilmente
    const allPages = [mainPage, signupPage, communityPage, parentsGuidePage, faqPage];

    // --- 2. FUNCIONES PARA MOSTRAR PÁGINAS ---

    // Función maestra para ocultar todo
    function hideAllPages() {
        allPages.forEach(page => {
            if (page) page.style.display = 'none';
        });
        // Por defecto, mostrar header y footer
        if (header) header.style.display = 'block';
        if (footer) footer.style.display = 'block';
    }

    // Mostrar Landing Page (la original)
    function showLanding() {
        hideAllPages();
        if (mainPage) mainPage.style.display = 'block';
        window.scrollTo(0, 0);
        sessionStorage.setItem('ecomind_page', 'landing');
        history.pushState({ page: 'landing' }, 'EcoMind');
    }

    // Mostrar Sign Up (la original)
    function showSignup() {
        hideAllPages();
        if (signupPage) signupPage.style.display = 'block';
        // Ocultar header y footer SÓLO en la página de sign up
        if (header) header.style.display = 'none';
        if (footer) footer.style.display = 'none';
        window.scrollTo(0, 0);
        sessionStorage.setItem('ecomind_page', 'signup');
        history.pushState({ page: 'signup' }, 'Únete a EcoMind');
    }

    // Mostrar Comunidad (la nueva)
    function showCommunity() {
        hideAllPages();
        if (communityPage) communityPage.style.display = 'block';
        window.scrollTo(0, 0);
        sessionStorage.setItem('ecomind_page', 'community');
        history.pushState({ page: 'community' }, 'Comunidad');
    }

    // Mostrar Guía para Padres (la nueva)
    function showParentsGuide() {
        hideAllPages();
        if (parentsGuidePage) parentsGuidePage.style.display = 'block';
        window.scrollTo(0, 0);
        sessionStorage.setItem('ecomind_page', 'parents-guide');
        history.pushState({ page: 'parents-guide' }, 'Guía para Padres');
    }

    // Mostrar FAQ (la nueva)
    function showFaq() {
        hideAllPages();
        if (faqPage) faqPage.style.display = 'block';
        window.scrollTo(0, 0);
        sessionStorage.setItem('ecomind_page', 'faq');
        history.pushState({ page: 'faq' }, 'Preguntas Frecuentes');
    }
    
    // Función de Smooth Scroll (del código original)
    function performSmoothScroll(targetElement) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // --- 3. RESTAURAR ESTADO AL CARGAR PÁGINA ---
    const savedPage = sessionStorage.getItem('ecomind_page');
    
    if (savedPage === 'signup') {
        showSignup();
    } else if (savedPage === 'community') {
        showCommunity();
    } else if (savedPage === 'parents-guide') {
        showParentsGuide();
    } else if (savedPage === 'faq') {
        showFaq();
    } else {
        // Por defecto, mostrar la Landing Page
        showLanding();
    }

    // --- 4. MANEJADOR DE CLICS PRINCIPAL ---
    // Un solo manejador para todos los enlaces <a>
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // 1. Navegación entre páginas (Comunidad, Guía, FAQ)
            if (href === '#comunidad') {
                e.preventDefault();
                showCommunity();
                return;
            }
            if (href === '#guia') {
                e.preventDefault();
                showParentsGuide();
                return;
            }
            if (href === '#preguntas') {
                e.preventDefault();
                showFaq();
                return;
            }

            // 2. Navegación a Landing (Logo)
            if (href === '#landing' || this.classList.contains('logo')) {
                e.preventDefault();
                showLanding();
                return;
            }

            // 3. Navegación a Sign Up (Botones de "Unete" y "Explorar")
            if (this.classList.contains('btn-unete') || href === '#unete.html' || href === '#retos') {
                e.preventDefault();
                showSignup();
                return;
            }

            // 4. Navegación para "Regresar" (Desde Sign Up a Landing)
            if (this.id === 'btnRegresar' || this.classList.contains('link-back')) {
                e.preventDefault();
                showLanding();
                return;
            }

            // 5. Smooth Scroll (para enlaces internos en la Landing Page)
            if (href.startsWith('#') && href.length > 1 && !['#landing', '#comunidad', '#guia', '#preguntas', '#unete.html', '#retos'].includes(href)) {
                
                // Si NO estamos en la landing, ir primero
                if (sessionStorage.getItem('ecomind_page') !== 'landing') {
                    showLanding();
                    // Esperar un momento a que se muestre la landing antes de hacer scroll
                    setTimeout(() => {
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            performSmoothScroll(targetElement);
                        }
                    }, 100);
                } else {
                    // Ya estamos en la landing, solo hacer scroll
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        performSmoothScroll(targetElement);
                    }
                }
                return;
            }
            
            // 6. Enlaces de Footer o placeholders
            if (href === '#') {
                e.preventDefault();
                console.log('Enlace de placeholder clickeado.');
            }
        });
    });

    // --- 5. LÓGICA DEL FORMULARIO SIGN UP (ORIGINAL) ---
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const password = this.querySelector('input[name="password"]').value;
            const terms = document.getElementById('terms');
            
            if (terms && !terms.checked) {
                alert('Debes aceptar los términos y condiciones');
                return;
            }
            
            if (!name || !email || !password) {
                alert('Por favor completa todos los campos');
                return;
            }
            
            alert(`¡Bienvenido a EcoMind, ${name}!\nTu registro ha sido exitoso.`);
            this.reset();
        });
    }
    
    // --- 6. BOTONES SOCIALES Y SIGN IN (ORIGINAL) ---
    const btnGoogle = document.querySelector('.btn-google');
    if (btnGoogle) {
        btnGoogle.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Funcionalidad de Sign in with Google en desarrollo');
        });
    }
    
    const btnApple = document.querySelector('.btn-apple');
    if (btnApple) {
        btnApple.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Funcionalidad de Sign in with Apple en desarrollo');
        });
    }
    
    const linkSignIn = document.querySelector('.link-signin');
    if (linkSignIn) {
        linkSignIn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Funcionalidad de Sign In en desarrollo');
        });
    }
    
    // --- 7. MANEJO DEL BOTÓN DE RETROCESO (HISTORIAL) ---
    window.addEventListener('popstate', function(event) {
        // Si no hay estado, ir a la landing
        const state = event.state ? event.state.page : 'landing'; 

        if (state === 'signup') {
            showSignup();
        } else if (state === 'community') {
            showCommunity();
        } else if (state === 'parents-guide') {
            showParentsGuide();
        } else if (state === 'faq') {
            showFaq();
        } else {
            // Por defecto, siempre volver a la landing
            showLanding();
        }
    });

});