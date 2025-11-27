// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. NAVEGACIÓN PRINCIPAL (SIDEBAR)
    // ==========================================
    const buttons = document.querySelectorAll('.dash-item');
    const pages = document.querySelectorAll('.dash-page');

    function showPage(name) {
        pages.forEach(page => {
            page.classList.toggle('active', page.id === `page-${name}`);
        });

        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.page === name);
        });
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const pageName = btn.dataset.page;
            showPage(pageName);
        });
    });

    // Página inicial por defecto
    showPage('retos');


    // ==========================================
    // 2. PESTAÑAS DEL PERFIL
    // ==========================================
    const perfilTabs = document.querySelectorAll('.perfil-tab');
    const perfilTabContents = document.querySelectorAll('.perfil-tab-content');

    perfilTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            // Actualizar pestañas activas
            perfilTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Actualizar contenido activo
            perfilTabContents.forEach(content => {
                content.classList.toggle('active', content.id === `tab-${tabName}`);
            });
        });
    });


    // ==========================================
    // 3. MODAL DE COMPROMISO
    // ==========================================
    const modalCompromiso = document.getElementById('modal-compromiso');
    const btnEditarCompromiso = document.getElementById('btn-editar-compromiso');
    const btnModalClose = document.getElementById('modal-close');
    const btnGuardarCompromiso = document.getElementById('btn-guardar-compromiso');
    const btnEliminarCompromiso = document.getElementById('btn-eliminar-compromiso');
    const textareaCompromiso = document.getElementById('textarea-compromiso');
    const compromisoTexto = document.getElementById('compromiso-texto');
    const compromisoTextoModal = document.getElementById('compromiso-texto-modal');
    const agregarMas = document.querySelector('.agregar-mas');
    const charCount = document.getElementById('char-count');

    // Función para cambiar a modo edición
    function activarModoEdicion() {
        if (compromisoTextoModal && textareaCompromiso) {
            const textoActual = compromisoTextoModal.textContent.trim();
            textareaCompromiso.value = textoActual;
            textareaCompromiso.style.display = 'block';
            textareaCompromiso.style.width = '100%';
            textareaCompromiso.style.minHeight = '100px';
            textareaCompromiso.style.border = 'none';
            textareaCompromiso.style.background = 'transparent';
            textareaCompromiso.style.resize = 'none';
            textareaCompromiso.style.outline = 'none';
            textareaCompromiso.style.fontFamily = 'Poppins, sans-serif';
            textareaCompromiso.style.fontSize = '0.95rem';
            textareaCompromiso.style.lineHeight = '1.5';
            compromisoTextoModal.style.display = 'none';
            textareaCompromiso.focus();
            if (charCount) {
                charCount.textContent = textareaCompromiso.value.length;
            }
        }
    }

    // Abrir modal
    if (btnEditarCompromiso && modalCompromiso) {
        btnEditarCompromiso.addEventListener('click', () => {
            if (compromisoTexto && compromisoTextoModal) {
                compromisoTextoModal.textContent = compromisoTexto.textContent.trim();
                compromisoTextoModal.style.display = 'block';
                textareaCompromiso.style.display = 'none';
                if (charCount) {
                    charCount.textContent = compromisoTexto.textContent.trim().length;
                }
            }
            modalCompromiso.classList.add('active');
        });
    }

    // Hacer clic en el texto para editar
    if (compromisoTextoModal) {
        compromisoTextoModal.addEventListener('click', activarModoEdicion);
    }

    // Hacer clic en "Agregar más..." para editar
    if (agregarMas) {
        agregarMas.addEventListener('click', activarModoEdicion);
    }

    // Contador de caracteres en tiempo real
    if (textareaCompromiso && charCount) {
        textareaCompromiso.addEventListener('input', () => {
            charCount.textContent = textareaCompromiso.value.length;
        });
    }

    // Cerrar modal con X
    if (btnModalClose && modalCompromiso) {
        btnModalClose.addEventListener('click', () => {
            modalCompromiso.classList.remove('active');
        });
    }

    // Cerrar modal al hacer clic fuera
    if (modalCompromiso) {
        modalCompromiso.addEventListener('click', (e) => {
            if (e.target === modalCompromiso) {
                modalCompromiso.classList.remove('active');
            }
        });
    }

    // Guardar compromiso
    if (btnGuardarCompromiso && textareaCompromiso && compromisoTexto && modalCompromiso) {
        btnGuardarCompromiso.addEventListener('click', () => {
            const nuevoCompromiso = textareaCompromiso.value.trim();
            if (nuevoCompromiso) {
                compromisoTexto.textContent = nuevoCompromiso;
                modalCompromiso.classList.remove('active');
            }
        });
    }

    // Eliminar compromiso
    if (btnEliminarCompromiso && textareaCompromiso && compromisoTexto && modalCompromiso) {
        btnEliminarCompromiso.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres eliminar tu compromiso?')) {
                compromisoTexto.textContent = '';
                textareaCompromiso.value = '';
                modalCompromiso.classList.remove('active');
            }
        });
    }


    // ==========================================
    // 4. LÓGICA DE PERFILES DE FAMILIA
    // ==========================================
    const botonesVerPerfil = document.querySelectorAll('.btn-ver-perfil[data-member]');
    const pageMiembroPerfil = document.getElementById('page-miembro-perfil');
    const breadcrumbFamilia = document.getElementById('breadcrumb-familia');

    const miembrosData = {
        pepe: {
            nombre: 'Pepe',
            username: 'xXPepePr0Xx',
            avatar: 'assets/images/perfil/pepe.png',
            puntos: '15000',
            amigos: '28',
            racha: '13'
        }
        // Puedes agregar más miembros aquí
    };

    botonesVerPerfil.forEach(boton => {
        boton.addEventListener('click', () => {
            const memberKey = boton.getAttribute('data-member');
            const memberData = miembrosData[memberKey];

            if (memberData) {
                // Actualizar datos del perfil
                const avatarEl = document.getElementById('miembro-avatar');
                const nombreEl = document.getElementById('miembro-nombre');
                const userEl = document.getElementById('miembro-username');
                const puntosEl = document.getElementById('miembro-puntos');
                const amigosEl = document.getElementById('miembro-amigos');
                const breadcrumbEl = document.getElementById('breadcrumb-nombre');

                if(avatarEl) avatarEl.src = memberData.avatar;
                if(nombreEl) nombreEl.textContent = memberData.nombre;
                if(userEl) userEl.textContent = memberData.username;
                if(puntosEl) puntosEl.textContent = memberData.puntos;
                if(amigosEl) amigosEl.textContent = memberData.amigos;
                if(breadcrumbEl) breadcrumbEl.textContent = memberData.nombre;

                // Ocultar todas las páginas
                pages.forEach(page => page.classList.remove('active'));
                
                // Mostrar página de perfil de miembro
                if(pageMiembroPerfil) pageMiembroPerfil.classList.add('active');

                // Desactivar todos los botones del sidebar
                buttons.forEach(btn => btn.classList.remove('active'));
            }
        });
    });

    // Volver a Familia desde breadcrumb
    if (breadcrumbFamilia) {
        breadcrumbFamilia.addEventListener('click', () => {
            showPage('perfil');
            // Activar la pestaña de Familia
            const perfilTabFamilia = document.querySelector('.perfil-tab[data-tab="familia"]');
            if (perfilTabFamilia) {
                perfilTabFamilia.click();
            }
        });
    }


    // ==========================================
    // 5. LÓGICA DEL MENÚ OVERLAY (APRENDE MÁS)
    // ==========================================
    const btnAprendeMas = document.querySelector('.btn-game-footer'); 
    const overlayAprende = document.getElementById('aprende-overlay'); 

    // Abrir menú
    if (btnAprendeMas && overlayAprende) {
        btnAprendeMas.addEventListener('click', (e) => {
            e.preventDefault(); 
            overlayAprende.classList.add('active'); 
        });

        // Cerrar menú al hacer click fuera
        overlayAprende.addEventListener('click', (e) => {
            if (e.target === overlayAprende || 
                e.target.classList.contains('close-trigger') || 
                e.target.classList.contains('overlay-content')) {
                
                overlayAprende.classList.remove('active'); 
            }
        });
    }

    // ==========================================
    // 6. LÓGICA DE PANTALLA BUSCAR (NUEVO)
    // ==========================================
    const btnBuscarOverlay = document.querySelector('.btn-cat-buscar'); // Botón verde del menú
    const viewRetosMain = document.getElementById('retos-main-view');   // Vista de botones
    const viewRetosSearch = document.getElementById('retos-search-view'); // Vista de búsqueda
    
    // Botón del sidebar "Retos" (para resetear la vista)
    const btnSidebarRetos = document.querySelector('.dash-item[data-page="retos"]');

    // Al hacer click en "Buscar" dentro del menú overlay
    if (btnBuscarOverlay && viewRetosMain && viewRetosSearch) {
        btnBuscarOverlay.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 1. Cerrar el overlay primero
            if(overlayAprende) overlayAprende.classList.remove('active');

            // 2. Ocultar la vista principal
            viewRetosMain.style.display = 'none';

            // 3. Mostrar la vista de búsqueda
            viewRetosSearch.style.display = 'block';
        });
    }

    // Al hacer click en el sidebar "Retos", volver a la vista principal
    // Esto es útil para que el usuario pueda "salir" de la búsqueda volviendo a clicar en el menú lateral
    if (btnSidebarRetos) {
        btnSidebarRetos.addEventListener('click', () => {
            if (viewRetosMain && viewRetosSearch) {
                // Ocultar búsqueda
                viewRetosSearch.style.display = 'none';
                // Mostrar principal (usamos 'grid' porque así está en el CSS de .retos-layout)
                viewRetosMain.style.display = 'grid'; 
            }
        });
    }

    // ==========================================
    // 7. MOSTRAR VISTA DE ACTIVIDAD AL HACER CLICK EN UN RETO
    // ==========================================

    const botonesReto = document.querySelectorAll('.btn-game-img');
    const viewRetosActividad = document.getElementById('retos-actividad-view');

    botonesReto.forEach(btn => {
        btn.addEventListener('click', () => {
            
            // Ocultar las otras vistas
            if (viewRetosMain) viewRetosMain.style.display = 'none';
            if (viewRetosSearch) viewRetosSearch.style.display = 'none';

            // Mostrar la vista de actividad
            if (viewRetosActividad) viewRetosActividad.style.display = 'block';
        });
    });

    // BOTÓN “VOLVER” EN LA ACTIVIDAD
    const btnVolverRetos = document.getElementById('btn-volver-retos');
    if (btnVolverRetos) {
        btnVolverRetos.addEventListener('click', () => {
            // Cierra actividad y muestra la grilla de retos
            if (viewRetosActividad) viewRetosActividad.style.display = 'none';
            if (viewRetosMain) viewRetosMain.style.display = 'grid';
        });
    }

        // ==========================================
    // 7. MENÚ DESPLEGABLE LADO DERECHO (AMIGOS / PARTICIPANTES)
    // ==========================================
    const toggles = document.querySelectorAll('.js-activity-toggle');

    toggles.forEach(btn => {
        const card = btn.closest('.activity-card');
        const body = card.querySelector('.activity-card-body');

        // estado inicial: solo los que NO tengan is-open empiezan ocultos
        if (!btn.classList.contains('is-open')) {
            body.style.display = 'none';
        }

        btn.addEventListener('click', () => {
            const isOpen = btn.classList.toggle('is-open');
            body.style.display = isOpen ? 'block' : 'none';
        });
    });
    
    document.querySelectorAll('.btn-invitar').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.add('invited');
        btn.textContent = "Invitado";
      });
  });


});