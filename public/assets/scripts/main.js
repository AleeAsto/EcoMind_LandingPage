// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. DEFINIR TODAS LAS PÁGINAS ---
    const mainPage = document.querySelector('main');
    const signupPage = document.getElementById('signup-page');
    const communityPage = document.getElementById('comunidad-page');
    const parentsGuidePage = document.getElementById('parents-guide-page');
    const faqPage = document.getElementById('faq-page');
    const signinPage = document.getElementById('signin-page');
    
    // Referencias al Header y Footer
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Array con todas las "páginas" para ocultarlas fácilmente
   const allPages = [mainPage, signupPage, signinPage, communityPage, parentsGuidePage, faqPage];

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

    // Mostrar Sign In (nueva)
    function showSignin() {
        hideAllPages();
        if (signinPage) signinPage.style.display = 'block';
        // Ocultar header y footer SÓLO en la página de sign in
        if (header) header.style.display = 'none';
        if (footer) footer.style.display = 'none';
        window.scrollTo(0, 0);
        sessionStorage.setItem('ecomind_page', 'signin');
        history.pushState({ page: 'signin' }, 'Inicia sesión en EcoMind');
    }

    // Mostrar Comunidad (la nueva)
    function showCommunity() {
        hideAllPages();
        if (communityPage) communityPage.style.display = 'block';
        window.scrollTo(0, 0);
        sessionStorage.setItem('ecomind_page', 'community');
        history.pushState({ page: 'community' }, 'Comunidad');
        initComunidadSlider();
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
    } else if (savedPage === 'signin') {
        showSignin();}
    else if (savedPage === 'community') {
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

            // 4.b Navegación entre Sign Up y Sign In
            if (this.classList.contains('link-signin')) {
                // desde "Have an account? Sign In" (en signup)
                e.preventDefault();
                showSignin();
                return;
            }

            if (this.classList.contains('link-signup')) {
                // desde "Don't have an account? Sign up" (en signin)
                e.preventDefault();
                showSignup();
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

        // --- 6. LÓGICA DEL FORMULARIO SIGN IN (NUEVO) ---
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = this.querySelector('input[name="email"]').value.trim();
            const password = this.querySelector('input[name="password"]').value.trim();

            const validEmail = "marcos@gmail.com"; // email válido
            const validPassword = "123";           // contraseña válida

            // Comparamos en minúsculas para no depender de mayúsculas en el correo
            if (email.toLowerCase() === validEmail && password === validPassword) {
                // Opcional: guardar el nombre para usarlo en el dashboard
                // localStorage.setItem('ecomind_user', 'Marcos');

                // Ir al dashboard
                window.location.href = "dashboard.html";
            } else {
                alert("Correo o contraseña incorrectos.");
            }
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

   // --- SLIDER DE COMUNIDAD ---
    function initComunidadSlider() {
    const nextBtn = document.getElementById('nextSlide');
    const prevBtn = document.getElementById('prevSlide');
    const slide1 = document.getElementById('slide1');
    const slide2 = document.getElementById('slide2');

    if (!nextBtn || !prevBtn || !slide1 || !slide2) return;

    // Estado inicial
    slide1.style.display = 'flex';
    slide2.style.display = 'none';
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'block';

    // Evitar múltiples listeners: clonar y reemplazar
    const nextClone = nextBtn.cloneNode(true);
    const prevClone = prevBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(nextClone, nextBtn);
    prevBtn.parentNode.replaceChild(prevClone, prevBtn);

    // Referencias actualizadas
    const next = document.getElementById('nextSlide');
    const prev = document.getElementById('prevSlide');

    // → Siguiente
    next.addEventListener('click', () => {
        slide1.style.display = 'none';
        slide2.style.display = 'flex';
        next.style.display = 'none';
        prev.style.display = 'block';
    });

    // ← Anterior
    prev.addEventListener('click', () => {
        slide2.style.display = 'none';
        slide1.style.display = 'flex';
        prev.style.display = 'none';
        next.style.display = 'block';
    });
    }
    
    // --- 7. MANEJO DEL BOTÓN DE RETROCESO (HISTORIAL) ---
    window.addEventListener('popstate', function(event) {
        // Si no hay estado, ir a la landing
        const state = event.state ? event.state.page : 'landing'; 

        if (state === 'signup') {
            showSignup();
        } else if (state === 'signin') {
            showSignin();
        }   else if (state === 'community') {
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


const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navbar-right");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            // Alternar clase 'active' en el icono y el menú
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Cerrar el menú al hacer clic en cualquier enlace dentro del menú
        document.querySelectorAll(".navbar-right a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }