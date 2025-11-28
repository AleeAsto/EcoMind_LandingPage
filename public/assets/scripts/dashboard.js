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
    // 5. LÓGICA DE BOTONES (Energía vs Aprende Más)
    // ==========================================
    
    const btnEnergia = document.querySelector('.btn-game-header'); // Botón Arriba (Amarillo)
    const btnAprendeMas = document.querySelector('.btn-game-footer'); // Botón Abajo (Azul)
    const overlayAprende = document.getElementById('aprende-overlay'); // El menú flotante
    
    // Vistas
    const viewRetosMain = document.getElementById('retos-main-view');   // Botones grandes
    const viewRetosSearch = document.getElementById('retos-search-view'); // Nueva galería de imágenes

    // A) Botón ENERGÍA (Arriba) -> Abre el menú flotante (Overlay)
    if (btnEnergia && overlayAprende) {
        btnEnergia.addEventListener('click', (e) => {
            e.preventDefault(); 
            overlayAprende.classList.add('active'); 
        });
    }

    // B) Botón APRENDE MÁS (Abajo) -> Cambia a la vista de búsqueda/galería
    if (btnAprendeMas && viewRetosMain && viewRetosSearch) {
        btnAprendeMas.addEventListener('click', (e) => {
            e.preventDefault();
            
            // ESTO ES LA CLAVE: Oculta uno, muestra el otro
            viewRetosMain.style.display = 'none'; 
            viewRetosSearch.style.display = 'block';
            
            if(overlayAprende) overlayAprende.classList.remove('active');
        });
    }

    // C) Cerrar el menú flotante al hacer click fuera
    if (overlayAprende) {
        overlayAprende.addEventListener('click', (e) => {
            if (e.target === overlayAprende || 
                e.target.classList.contains('close-trigger') || 
                e.target.classList.contains('overlay-content')) {
                overlayAprende.classList.remove('active'); 
            }
        });
    }

    // ==========================================
    // 6. VOLVER AL INICIO (Resetear vista)
    // ==========================================
    
    // Al hacer click en el botón "Retos" del sidebar, volvemos a la vista original
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
    if (btnSidebarRetos) {
        btnSidebarRetos.addEventListener('click', () => {
            if (viewRetosMain && viewRetosSearch) {
                // Ocultar búsqueda
                viewRetosSearch.style.display = 'none';
                // Mostrar principal (usamos 'grid' porque así está en el CSS de .retos-layout)
                viewRetosMain.style.display = 'grid';
                actividadView.style.display = 'none';
                viewRetosMain.style.display = 'grid';
                if (viewRetosSearch) viewRetosSearch.style.display = 'none';
            }
        });
    }

    // ==========================================
    // 7. VISTA DETALLE DE ACTIVIDAD (retos-actividad-view)
    // ==========================================
    const actividadView = document.getElementById('retos-actividad-view');
    const btnVolverRetos = document.getElementById('btn-volver-retos');

    // Usaremos el PRIMER botón de la grilla como ejemplo para abrir la actividad
    const primerRetoBtn = document.querySelector('.game-grid .btn-game-img');

    if (primerRetoBtn && actividadView && viewRetosMain) {
        primerRetoBtn.addEventListener('click', () => {
            // Ocultamos la grilla de retos y la búsqueda
            viewRetosMain.style.display = 'none';
            if (viewRetosSearch) viewRetosSearch.style.display = 'none';

            // Mostramos la vista de actividad
            actividadView.style.display = 'block';

            // Aseguramos que se vea la pantalla de detalle
            cambiarPantallaActividad('detalle');
        });
    }

    // ==========================================
    // 8. PANTALLAS DE LA ACTIVIDAD (detalle → yay → instrucciones)
    // ==========================================
    const screenDetalle = document.getElementById('actividad-screen-detalle');
    const screenYay = document.getElementById('actividad-screen-yay');
    const screenInstr = document.getElementById('actividad-screen-instrucciones');
    const btnIniciarActividad = document.getElementById('btn-iniciar-actividad');

    function cambiarPantallaActividad(nombre) {
        const screens = {
            detalle: screenDetalle,
            yay: screenYay,
            instrucciones: screenInstr
        };

        Object.values(screens).forEach(s => {
            if (s) s.classList.remove('active');
        });

        if (screens[nombre]) {
            screens[nombre].classList.add('active');
        }
    }

    if (btnIniciarActividad && screenDetalle && screenYay && screenInstr) {
        btnIniciarActividad.addEventListener('click', () => {
            // 1) Detalle → YAY
            cambiarPantallaActividad('yay');

            // 2) Después de un ratito → Instrucciones
            setTimeout(() => {
                cambiarPantallaActividad('instrucciones');
            }, 1200); // milisegundos
        });
    }

    // ==========================================
    // 9. ACORDEÓN INVITAR AMIGOS / PARTICIPANTES
    // ==========================================
    const activityToggles = document.querySelectorAll('.js-activity-toggle');

    activityToggles.forEach(header => {
        header.addEventListener('click', () => {
            const card = header.closest('.activity-card');
            const body = card ? card.querySelector('.activity-card-body') : null;
            const chevron = header.querySelector('.activity-chevron');

            if (!body) return;

            const isHidden = body.classList.toggle('is-hidden');
            header.classList.toggle('is-open', !isHidden);

            if (chevron) {
                chevron.textContent = isHidden ? '˅' : '˄';
            }
        });
    });

    // ==========================================
    // 10. BOTONES "INVITAR" → SE QUEDAN GRIS
    // ==========================================
    const btnsInvitar = document.querySelectorAll('.btn-invitar');

    btnsInvitar.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('btn-invitar-disabled')) {
                return; // ya está deshabilitado
            }
            btn.textContent = 'Invitado';
            btn.classList.add('btn-invitar-disabled');
        });
    });

    // Delegación global para todos los botones "Volver"
    document.addEventListener('click', (event) => {
      const volverBtn = event.target.closest('.btn-volver-retos');
      if (!volverBtn) return; // si no es un botón de volver, no hacemos nada

      // 👇 Ajusta estos ids/nombres a los que ya usas en tu código
      const actividadView   = document.getElementById('retos-actividad-view');
      const viewRetosMain   = document.getElementById('retos-main-view');
      const viewRetosSearch = document.getElementById('retos-search-view');

      if (actividadView)   actividadView.style.display = 'none';
      if (viewRetosMain)   viewRetosMain.style.display   = 'grid';
      if (viewRetosSearch) viewRetosSearch.style.display = 'none';

      // Volvemos siempre a la pantalla principal de la actividad (“detalle”)
      if (typeof cambiarPantallaActividad === 'function') {
        cambiarPantallaActividad('detalle');
      }

      // Opcional: scroll arriba
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });


});
