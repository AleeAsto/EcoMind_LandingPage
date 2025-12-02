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

    if (btnSidebarRetos) {
        btnSidebarRetos.addEventListener('click', () => {
            if (viewRetosMain && viewRetosSearch) {

                viewRetosSearch.style.display = 'none'; // Ocultar galería
                viewRetosMain.style.display = 'grid';   // Mostrar botones principales
                actividadView.style.display = 'none';
                viewRetosMain.style.display = 'grid';
                if (viewRetosSearch) viewRetosSearch.style.display = 'none';
            }
        });
    }

    // ==========================================
    // 7. MOSTRAR VISTA DE ACTIVIDAD AL HACER CLICK EN UN RETO
    // ==========================================

    const actividadView = document.getElementById('retos-actividad-view');
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

    document.querySelectorAll('.btn-invitar').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.add('invited');
        btn.textContent = "Invitado";
      });
    });

    // 8. PANTALLAS DE LA ACTIVIDAD (detalle → yay → instrucciones)
    // ==========================================
    const screenDetalle = document.getElementById('actividad-screen-detalle');
    const screenYay = document.getElementById('actividad-screen-yay');
    const screenInstr = document.getElementById('actividad-screen-instrucciones');

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

    btnsInvitar.forEach(btn => {if (btn.classList.contains('btn-invitar-disabled')) {
                return; // ya está deshabilitado
            }
            btn.textContent = 'Invitado';
            btn.classList.add('btn-invitar-disabled');
        });
    });

    // BOTÓN VOLVER EN EL MODO ACTIVIDAD
    document.addEventListener('click', (event) => {
      const volverBtn = event.target.closest('.btn-volver-retos');
      if (!volverBtn) return; // si no es un botón de volver, no hacemos nada

      const actividadView   = document.getElementById('retos-actividad-view');
      const viewRetosMain   = document.getElementById('retos-main-view');
      const viewRetosSearch = document.getElementById('retos-search-view');
      if (actividadView)   actividadView.style.display = 'none';
      if (viewRetosMain)   viewRetosMain.style.display   = 'grid';
      if (viewRetosSearch) viewRetosSearch.style.display = 'none';
      if (typeof cambiarPantallaActividad === 'function') {
        cambiarPantallaActividad('detalle');}
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


// --- NAVEGACIÓN INTERNA DE COMUNIDAD ---

  const communityButtons = document.querySelectorAll('.action-big-btn');
  let btnLogros = null;

  communityButtons.forEach(btn => {
    if (btn.innerText.includes('Logros')) {
      btnLogros = btn;
    }
  });

  const pageComunidadMain = document.getElementById('page-comunidad');
  const pageComunidadLogros = document.getElementById('page-comunidad-logros');

  if (btnLogros && pageComunidadMain && pageComunidadLogros) {
    btnLogros.addEventListener('click', () => {
      pageComunidadMain.classList.remove('active');
      pageComunidadLogros.classList.add('active');
    });
  }


  const btnSidebarComunidad = document.querySelector('.dash-item[data-page="comunidad"]');
  if (btnSidebarComunidad) {
    btnSidebarComunidad.addEventListener('click', () => {
      if (pageComunidadLogros.classList.contains('active')) {
        pageComunidadLogros.classList.remove('active');
        pageComunidadMain.classList.add('active');
      }
    });
  }

  // --- NAVEGACIÓN EVENTOS ---
  
  const communityEventosBtn = document.querySelectorAll('.action-big-btn');
  let btnEventos = null;

  // Buscar botón eventos
  communityEventosBtn.forEach(btn => {
    if (btn.innerText.includes('Eventos')) {
      btnEventos = btn;
    }
  });

  const pageComunidadEventos = document.getElementById('page-comunidad-eventos');

  if (btnEventos && pageComunidadMain && pageComunidadEventos) {
    btnEventos.addEventListener('click', () => {
      // Ocultar main y logros
      pageComunidadMain.classList.remove('active');
      if(pageComunidadLogros) pageComunidadLogros.classList.remove('active');
      
      // Mostrar Eventos
      pageComunidadEventos.classList.add('active');
    });
  }

  // Sidebar reset (actualización): Asegurar que cierra Eventos también
  if (btnSidebarComunidad) {
    btnSidebarComunidad.addEventListener('click', () => {
      if (pageComunidadLogros && pageComunidadLogros.classList.contains('active')) {
        pageComunidadLogros.classList.remove('active');
      }
      if (pageComunidadEventos && pageComunidadEventos.classList.contains('active')) {
        pageComunidadEventos.classList.remove('active');
      }
      pageComunidadMain.classList.add('active');
    });
  }


  // --- LÓGICA DEL MODAL CREAR EVENTO ---

  // 1. Obtener elementos
  const modalCrearEvento = document.getElementById('modal-crear-evento');
  // El botón que abre el modal está en la vista de "Eventos"
  const btnAbrirCrearEvento = document.querySelector('.btn-crear-evento'); 
  
  const btnCancelarEvento = document.getElementById('btn-cancelar-crear-evento');
  const btnConfirmarEvento = document.getElementById('btn-confirmar-crear-evento');
  const btnAdjuntarClip = document.querySelector('.btn-adjuntar-clip');


  // 2. Función para abrir el modal
  if (btnAbrirCrearEvento && modalCrearEvento) {
    btnAbrirCrearEvento.addEventListener('click', () => {
      modalCrearEvento.classList.add('active');
      // Opcional: limpiar inputs al abrir
      const inputs = modalCrearEvento.querySelectorAll('input, textarea');
      inputs.forEach(input => input.value = '');
    });
  }

  // 3. Función para cerrar el modal
  function cerrarModalEvento() {
    if (modalCrearEvento) {
      modalCrearEvento.classList.remove('active');
    }
  }

  // Cerrar con botón Cancelar
  if (btnCancelarEvento) {
    btnCancelarEvento.addEventListener('click', cerrarModalEvento);
  }

  // Cerrar con botón Crear (simulación)
  if (btnConfirmarEvento) {
    btnConfirmarEvento.addEventListener('click', () => {
      console.log('Evento creado (simulación)');
      // Aquí iría la lógica real de guardado
      cerrarModalEvento();
    });
  }

  // Simulación botón clip
  if (btnAdjuntarClip) {
    btnAdjuntarClip.addEventListener('click', () => {
        console.log('Simulación: Abrir selector de archivos');
        // No hace nada visual, solo simula el click
    });
  }

  // Cerrar al hacer clic fuera del contenido del modal
  if (modalCrearEvento) {
    modalCrearEvento.addEventListener('click', (e) => {
      if (e.target === modalCrearEvento) {
        cerrarModalEvento();
      }
    });
  }


// =========================================================
  //UNIRSE A EVENTOS
  // =========================================================
  const modalSeleccion = document.getElementById('modal-seleccion-inscripcion');
  const btnIndividual = document.getElementById('btn-opcion-individual');
  const btnFamilia = document.getElementById('btn-opcion-familia');
  const gridEventos = document.querySelector('.eventos-grid');

  const pageExitoIndividual = document.getElementById('page-exito-individual');
  const pageExitoFamilia = document.getElementById('page-exito-familia');
  
  let tarjetaEventoActual = null;

  if (gridEventos) {
    gridEventos.addEventListener('click', (e) => {
      if (e.target.classList.contains('unirse')) {
        tarjetaEventoActual = e.target.closest('.evento-card');
        const titulo = tarjetaEventoActual.querySelector('.evento-title').innerText;
        const fecha = tarjetaEventoActual.getAttribute('data-fecha') || "Fecha pendiente";
        const lugar = tarjetaEventoActual.getAttribute('data-lugar') || "Lugar pendiente";
        document.getElementById('modal-evento-nombre').textContent = titulo;
        document.getElementById('modal-evento-fecha').textContent = fecha;
        document.getElementById('modal-evento-lugar').textContent = lugar;
        if(modalSeleccion) modalSeleccion.classList.add('active');
      }

      const btnX = e.target.closest('.btn-evento-close');
      if (btnX) {
        const card = btnX.closest('.evento-card');
        const btnMain = card.querySelector('.btn-evento-estado');
        if (btnMain.classList.contains('unido')) {
          if(confirm("¿Deseas salirte de este evento?")) {
            btnMain.textContent = "Unirse al evento";
            btnMain.classList.remove('unido');
            btnMain.classList.add('unirse');
            btnMain.style.backgroundColor = "#69A44E"; 
            btnX.classList.remove('red');
            btnX.classList.add('grey');
            btnX.style.backgroundColor = "#C4C4C4";
            const stroke = btnX.querySelector('line'); 
            if(stroke) stroke.style.stroke = "white"; 
          }
        }
      }
    });
  }

  if (btnIndividual) {
    btnIndividual.addEventListener('click', () => {
      if(modalSeleccion) modalSeleccion.classList.remove('active');
      if(pageComunidadEventos) pageComunidadEventos.classList.remove('active');
      if(pageExitoIndividual) pageExitoIndividual.classList.add('active');
    });
  }

  if (btnFamilia) {
    btnFamilia.addEventListener('click', () => {
      if(modalSeleccion) modalSeleccion.classList.remove('active');
      if(pageComunidadEventos) pageComunidadEventos.classList.remove('active');
      if(pageExitoFamilia) pageExitoFamilia.classList.add('active');
    });
  }

  if (modalSeleccion) {
    modalSeleccion.addEventListener('click', (e) => {
      if (e.target === modalSeleccion) modalSeleccion.classList.remove('active');
    });
  }


  const botonesContinuarExito = document.querySelectorAll(
  '#page-exito-individual .btn-continuar-exito, #page-exito-familia .btn-continuar-exito'
);

  botonesContinuarExito.forEach(btn => {
    btn.addEventListener('click', () => {
      if(pageExitoIndividual) pageExitoIndividual.classList.remove('active');
      if(pageExitoFamilia) pageExitoFamilia.classList.remove('active');
      if(pageComunidadEventos) pageComunidadEventos.classList.add('active');
      if (tarjetaEventoActual) {
        transformarTarjetaAUnido(tarjetaEventoActual);
      }
    });
  });

  function transformarTarjetaAUnido(card) {
    const btnMain = card.querySelector('.btn-evento-estado');
    const btnClose = card.querySelector('.btn-evento-close');

    btnMain.textContent = "Ya te uniste";
    btnMain.classList.remove('unirse');
    btnMain.classList.add('unido');
    btnMain.style.backgroundColor = "#C4C4C4"; 

    if (btnClose) {
      btnClose.classList.remove('grey');
      btnClose.classList.add('red');
      btnClose.style.backgroundColor = "#FF5555";
    }
  }

  // Helper para cambiar entre las pantallas de actividad
function setActividadScreen(screenId) {
  document.querySelectorAll('#retos-actividad-view .actividad-screen')
    .forEach(s => s.classList.remove('active'));

  const target = document.getElementById(screenId);
  if (target) target.classList.add('active');
}

// ========= LÓGICA DE INICIAR ACTIVIDAD =========
// Botón "Iniciar Actividad" (pantalla detalle -> YAY -> instrucciones)
const btnIniciarActividad = document.getElementById('btn-iniciar-actividad');

if (btnIniciarActividad) {
  btnIniciarActividad.addEventListener('click', () => {
    // Pantalla 2: YAY
    setActividadScreen('actividad-screen-yay');

    // Después de 1.2s pasamos a instrucciones
    setTimeout(() => {
      setActividadScreen('actividad-screen-instrucciones');
    }, 1200);
  });
}

// ========= LÓGICA DE CHECKBOXES EN INSTRUCCIONES =========
const instrScreen    = document.getElementById('actividad-screen-instrucciones');
const completarBtn   = document.getElementById('btn-completar-actividad');
const stepCheckboxes = instrScreen
  ? instrScreen.querySelectorAll('.instr-checkbox')
  : [];

function actualizarEstadoBotonActividad() {
  if (!completarBtn || stepCheckboxes.length === 0) return;

  const todosMarcados = Array.from(stepCheckboxes).every(cb => cb.checked);

  completarBtn.disabled = !todosMarcados;
  completarBtn.classList.toggle('active', todosMarcados);
}

// Escuchamos cambios en los checks
stepCheckboxes.forEach(cb => {
  cb.addEventListener('change', actualizarEstadoBotonActividad);
});

// Estado inicial al cargar
actualizarEstadoBotonActividad();

// ========= CLICK EN "COMPLETAR ACTIVIDAD" =========
if (completarBtn) {
  completarBtn.addEventListener('click', () => {
    // Si aún está desactivado, no hace nada
    if (completarBtn.disabled) return;

    // Ir a pantalla de felicitación
    setActividadScreen('actividad-screen-completada');
  });
}

// ========= BOTÓN "CONTINUAR" (volver a Retos) =========
const btnActividadContinuar = document.getElementById('btn-actividad-continuar');

if (btnActividadContinuar) {
  btnActividadContinuar.addEventListener('click', () => {
    setActividadScreen('actividad-screen-detalle');
    // Ocultamos la vista de actividad
    const actividadView   = document.getElementById('retos-actividad-view');
    const viewRetosMain   = document.getElementById('retos-main-view');
    const viewRetosSearch = document.getElementById('retos-search-view');
    if (actividadView)   actividadView.style.display = 'none';
    if (viewRetosMain)   viewRetosMain.style.display   = 'grid';
    if (viewRetosSearch) viewRetosSearch.style.display = 'none';
    if (typeof cambiarPantallaActividad === 'function') {
      cambiarPantallaActividad('detalle');}
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================
    // 7. ELIMINAR ACTIVIDAD (RETOS)
    // ==========================================
    
    const modalEliminar = document.getElementById('modal-eliminar-actividad');
    const spanNombreActividad = document.getElementById('nombre-actividad-borrar');
    const btnCancelarBorrado = document.getElementById('btn-cancelar-borrado');
    const btnConfirmarBorrado = document.getElementById('btn-confirmar-borrado');
    let itemParaBorrar = null; // Variable para guardar qué elemento vamos a borrar

    // 1. Agregar evento click a los items borrables
    const itemsBorrables = document.querySelectorAll('.progreso-item[data-deletable="true"]');
    
    itemsBorrables.forEach(item => {
        item.addEventListener('click', function() {
            // Guardamos el elemento HTML completo en la variable
            itemParaBorrar = this;
            
            // Obtenemos el texto del span dentro del item
            const texto = this.querySelector('.p-info span').textContent;
            
            // Ponemos el texto en el modal y lo mostramos
            if(spanNombreActividad) spanNombreActividad.textContent = texto;
            if(modalEliminar) modalEliminar.classList.add('active');
        });
    });

    // 2. Botón Cancelar
    if (btnCancelarBorrado && modalEliminar) {
        btnCancelarBorrado.addEventListener('click', () => {
            modalEliminar.classList.remove('active');
            itemParaBorrar = null; // Limpiamos la variable
        });
    }

    // 3. Botón Confirmar (Eliminar del DOM)
    if (btnConfirmarBorrado && modalEliminar) {
        btnConfirmarBorrado.addEventListener('click', () => {
            if (itemParaBorrar) {
                // Animación simple de desaparición
                itemParaBorrar.style.opacity = '0';
                itemParaBorrar.style.transform = 'translateX(20px)';
                
                setTimeout(() => {
                    itemParaBorrar.remove(); // Elimina el elemento del HTML
                    modalEliminar.classList.remove('active');
                    itemParaBorrar = null;
                }, 300); // Espera 300ms para que se vea la animación
            }
        });
    }

    // 4. Botón Confirmar (Eliminar de verdad)
    if (btnConfirmarBorrado && modalEliminar) {
        btnConfirmarBorrado.addEventListener('click', () => {
            if (itemParaBorrar) {
                // 1. Obtenemos el nombre de la actividad que estamos borrando
                const nombreActividad = itemParaBorrar.querySelector('.p-info span').textContent.trim();

                // 2. Efecto visual en el elemento clickeado
                itemParaBorrar.style.transition = 'all 0.3s ease';
                itemParaBorrar.style.opacity = '0';
                itemParaBorrar.style.transform = 'translateX(20px)';
                
                // 3. Esperamos y borramos TODAS las coincidencias
                setTimeout(() => {
                    // Buscamos TODAS las actividades en la página (widget y modal ver más)
                    const todasLasActividades = document.querySelectorAll('.progreso-item');

                    todasLasActividades.forEach(actividad => {
                        const spanNombre = actividad.querySelector('.p-info span');
                        // Si el nombre coincide, la borramos
                        if (spanNombre && spanNombre.textContent.trim() === nombreActividad) {
                            actividad.remove();
                        }
                    });

                    // Cerramos el modal y limpiamos
                    modalEliminar.classList.remove('active');
                    itemParaBorrar = null;
                }, 300);
            }
        });
    }

    // ==========================================
    // 8. POPUP "VER MÁS" PROGRESO
    // ==========================================
    
    const btnVerMasProgreso = document.querySelector('.btn-ver-mas-small');
    const modalVerMas = document.getElementById('modal-ver-mas-progreso');
    const btnCerrarVerMasX = document.getElementById('btn-cerrar-ver-mas');
    const btnCerrarVerMasAccion = document.getElementById('btn-cerrar-ver-mas-accion');

    // Abrir modal
    if (btnVerMasProgreso && modalVerMas) {
        btnVerMasProgreso.addEventListener('click', () => {
            modalVerMas.classList.add('active');
        });
    }

    // Cerrar con la X
    if (btnCerrarVerMasX && modalVerMas) {
        btnCerrarVerMasX.addEventListener('click', () => {
            modalVerMas.classList.remove('active');
        });
    }

    // Cerrar con el botón "Volver"
    if (btnCerrarVerMasAccion && modalVerMas) {
        btnCerrarVerMasAccion.addEventListener('click', () => {
            modalVerMas.classList.remove('active');
        });
    }

    // Cerrar clickeando fuera
    if (modalVerMas) {
        modalVerMas.addEventListener('click', (e) => {
            if (e.target === modalVerMas) {
                modalVerMas.classList.remove('active');
            }
        });
    }
    
    // ==========================================
    // 9. LIGHTBOX PARA GALERÍA (APRENDE MÁS)
    // ==========================================
    
    const modalLightbox = document.getElementById('modal-lightbox');
    const imgLightbox = document.getElementById('img-lightbox-src');
    const btnCerrarLightbox = document.getElementById('btn-cerrar-lightbox');
    
    // Seleccionamos todas las imágenes dentro de la galería masonry
    const imagenesGaleria = document.querySelectorAll('.masonry-item img');

    // 1. Asignar evento click a cada imagen de la galería
    imagenesGaleria.forEach(img => {
        img.addEventListener('click', () => {
            if(modalLightbox && imgLightbox) {
                // Copiamos la ruta (src) de la imagen clickeada al visor
                imgLightbox.src = img.src; 
                // Mostramos el modal
                modalLightbox.classList.add('active'); 
            }
        });
    });

    // 2. Botón Cerrar
    if(btnCerrarLightbox && modalLightbox) {
        btnCerrarLightbox.addEventListener('click', (e) => {
            // Evita que el click se propague al fondo (opcional, por seguridad)
            e.stopPropagation();
            modalLightbox.classList.remove('active');
        });
    }

    // 3. Cerrar al hacer click en el fondo negro (fuera de la imagen)
    if(modalLightbox) {
        modalLightbox.addEventListener('click', (e) => {
            if(e.target === modalLightbox || e.target.classList.contains('modal-content')) { 
                modalLightbox.classList.remove('active');
            }
        });
    }
}

