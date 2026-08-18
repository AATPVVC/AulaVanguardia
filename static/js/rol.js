document.addEventListener("DOMContentLoaded", () => {
  // 1. EVENTOS DE BOOTSTRAP PARA EL MENÚ DESPLEGABLE
  const dropdownElement = document.getElementById("miDropdownContainer");

  if (dropdownElement) {
    dropdownElement.addEventListener("show.bs.dropdown", () => {
      console.log("El menú desplegable se está abriendo...");
    });
    dropdownElement.addEventListener("shown.bs.dropdown", () => {
      console.log("El menú desplegable está totalmente abierto.");
    });
    dropdownElement.addEventListener("hide.bs.dropdown", () => {
      console.log("El menú desplegable se está cerrando...");
    });
    dropdownElement.addEventListener("hidden.bs.dropdown", () => {
      console.log("El menú desplegable está cerrado.");
    });
  }

  // Carga inicial del círculo
  renderCards();
});

// LISTA DE MIEMBROS DEL EQUIPO
let teamMembers = [
  {
    name: "Cesar Arzola",
    role: "Diseñador UI/UX",
    desc: "Diseño visual de interfaces web y optimización de la experiencia de usuario.",
    image: "../static/images/Cesar.jpg"
  },
  {
    name: "Angel Alvarez",
    role: "Desarrollador Frontend",
    desc: "Desarrollo de sitios interactivos, maquetación adaptable usando HTML, CSS y JS.",
    image: "../static/images/Angel.jpg"
  },
  {
    name: "Gabriel Naranjo",
    role: "Desarrollador Backend",
    desc: "Administración de bases de datos y lógica del servidor para las funciones del sitio.",
    image: "../static/images/Gabriel.png"
  },
  {
    name: "Angelo Pomasongo",
    role: "Project Manager",
    desc: "Liderazgo, planificación de entregas y coordinación general del equipo del proyecto.",
    image: "../static/images/Angelo.jpg"
  },
  {
    name: "Diego Velazquez",
    role: "Especialista QA",
    desc: "Pruebas exhaustivas de software, reporte de errores y control de calidad.",
    image: "../static/images/Diego.png"
  }
];

// ELEMENTOS DEL DOM
const teamCircle = document.getElementById("teamCircle");
const actionBtn = document.getElementById("actionBtn");

// CALCULA DINÁMICAMENTE EL RADIO SEGÚN LA PANTALLA
function obtenerRadio() {
  const width = window.innerWidth;
  if (width <= 480) {
    return 92;
  } else if (width <= 768) {
    return 120;
  } else {
    return 180;
  }
}

// DIBUJA LOS MIEMBROS EN FORMA CÍRCULAR
function renderCards() {
  if (!teamCircle) return;
  teamCircle.innerHTML = "";

  // Crear botón giratorio central si no existe
  if (!document.getElementById("rotateBtn")) {
    const btnCenter = document.createElement("button");
    btnCenter.className = "rotate-btn";
    btnCenter.id = "rotateBtn";
    btnCenter.setAttribute("aria-label", "Rotar personas");
    btnCenter.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M23 4v6h-6"></path>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
      </svg>
    `;
    btnCenter.addEventListener("click", rotateTeam);
    teamCircle.appendChild(btnCenter);
  }

  const total = teamMembers.length;
  const radioActual = obtenerRadio();

  teamMembers.forEach((member, index) => {
    const angulo = (index / total) * (2 * Math.PI) - (Math.PI / 2);

    const x = Math.round(Math.cos(angulo) * radioActual);
    const y = Math.round(Math.sin(angulo) * radioActual);

    const card = document.createElement("div");
    card.classList.add("member-card");
    card.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

    card.innerHTML = `
      <div class="photo-container">
        <img src="${member.image}" alt="${member.name}">
      </div>
      <div class="member-info">
        <p class="name">${member.name}</p>
        <p class="role">${member.role}</p>
      </div>
    `;

    // AHORA SE ACTIVA AL PASAR EL CURSOR (HOVER)
    card.addEventListener("mouseenter", () => showModal(member));
    card.addEventListener("mouseleave", () => closeModal());

    teamCircle.appendChild(card);
  });
}

// MOSTRAR LA VENTANA EMERGENTE
function showModal(member) {
  closeModal(); // Elimina un modal previo si estaba abierto

  const modal = document.createElement("div");
  modal.id = "memberModal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-content">
      <h2>${member.name}</h2>
      <h3>${member.role}</h3>
      <p>${member.desc}</p>
    </div>
  `;

  document.body.appendChild(modal);
}

// CERRAR LA VENTANA EMERGENTE
function closeModal() {
  const modal = document.getElementById("memberModal");
  if (modal) modal.remove();
}

// ROTACIÓN DE POSICIONES
function rotateTeam() {
  closeModal();
  const firstMember = teamMembers.shift();
  teamMembers.push(firstMember);
  renderCards();
}

// EVENTO DEL BOTÓN INFERIOR
if (actionBtn) {
  actionBtn.addEventListener("click", rotateTeam);
}

// REAJUSTAR AL CAMBIAR TAMAÑO DE LA VENTANA
window.addEventListener("resize", renderCards);

// NAVEGACIÓN
function cambioIngles() {
  window.location.href = 'roles_en.html';
}