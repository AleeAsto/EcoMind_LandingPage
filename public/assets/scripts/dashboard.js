document.addEventListener('DOMContentLoaded', () => {
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

  // Página inicial por si acaso
  showPage('retos');

  // Manejo de pestañas del perfil
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

  // Modal de Compromiso
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

  // Ver perfil de miembro
  const botonesVerPerfil = document.querySelectorAll('.btn-ver-perfil[data-member]');
  const pageMiembroPerfil = document.getElementById('page-miembro-perfil');
  const breadcrumbFamilia = document.getElementById('breadcrumb-familia');

  // Datos de los miembros
  const miembrosData = {
    pepe: {
      nombre: 'Pepe',
      username: 'xXPepePr0Xx',
      avatar: 'assets/images/perfil/pepe.png',
      puntos: '15000',
      amigos: '28',
      racha: '13'
    }
  };

  botonesVerPerfil.forEach(boton => {
    boton.addEventListener('click', () => {
      const memberKey = boton.getAttribute('data-member');
      const memberData = miembrosData[memberKey];

      if (memberData) {
        // Actualizar datos del perfil
        document.getElementById('miembro-avatar').src = memberData.avatar;
        document.getElementById('miembro-nombre').textContent = memberData.nombre;
        document.getElementById('miembro-username').textContent = memberData.username;
        document.getElementById('miembro-puntos').textContent = memberData.puntos;
        document.getElementById('miembro-amigos').textContent = memberData.amigos;
        document.getElementById('breadcrumb-nombre').textContent = memberData.nombre;

        // Ocultar todas las páginas
        pages.forEach(page => page.classList.remove('active'));
        
        // Mostrar página de perfil de miembro
        pageMiembroPerfil.classList.add('active');

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


  const botonesContinuarExito = document.querySelectorAll('.btn-continuar-exito');
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
});