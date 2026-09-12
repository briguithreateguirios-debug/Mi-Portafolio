/* =========================
   MENÚ HAMBURGUESA
========================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  const isOpen = navLinks.classList.contains("active");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú" : "Abrir menú"
  );
});


/* Cerrar menú al hacer clic en un enlace */

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  });
});


/* =========================
   BARRAS DE HABILIDADES
========================= */

const skills = document.querySelectorAll(".skill");

const showSkills = () => {
  skills.forEach((skill) => {
    const progress = skill.dataset.progress;
    const progressBar = skill.querySelector(".progress span");
    const percentage = skill.querySelector(".percentage");

    progressBar.style.width = `${progress}%`;

    let current = 0;

    const counter = setInterval(() => {
      if (current >= progress) {
        clearInterval(counter);
      } else {
        current++;
        percentage.textContent = `${current}%`;
      }
    }, 15);
  });
};


/* Detectar cuando las habilidades aparecen en pantalla */

const skillsSection = document.querySelector("#habilidades");

const skillsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showSkills();
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3
  }
);

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}


/* =========================
   TARJETAS DE PROYECTOS
========================= */

const projectLinks = document.querySelectorAll(".project-link");
const formStatus = document.getElementById("form-status");

projectLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const projectName = link.dataset.project;

    formStatus.textContent =
      `Seleccionaste el proyecto "${projectName}". Podés contactarme para conocer más sobre él.`;

    document
      .querySelector("#contacto")
      .scrollIntoView({
        behavior: "smooth"
      });
  });
});


/* =========================
   FORMULARIO
========================= */

const form = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");


/* Mostrar mensaje de error */

function showError(input, message) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");

  formGroup.classList.remove("valid");
  formGroup.classList.add("invalid");

  errorMessage.textContent = message;
}


/* Mostrar campo correcto */

function showSuccess(input) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");

  formGroup.classList.remove("invalid");
  formGroup.classList.add("valid");

  errorMessage.textContent = "";
}


/* Validar nombre */

function validateName() {
  const name = nameInput.value.trim();

  if (name === "") {
    showError(nameInput, "Por favor, escribí tu nombre.");
    return false;
  }

  if (name.length < 2) {
    showError(nameInput, "El nombre debe tener al menos 2 caracteres.");
    return false;
  }

  showSuccess(nameInput);
  return true;
}


/* Validar correo */

function validateEmail() {
  const email = emailInput.value.trim();

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    showError(emailInput, "Por favor, escribí tu correo.");
    return false;
  }

  if (!emailPattern.test(email)) {
    showError(emailInput, "Ingresá un correo electrónico válido.");
    return false;
  }

  showSuccess(emailInput);
  return true;
}


/* Validar mensaje */

function validateMessage() {
  const message = messageInput.value.trim();

  if (message === "") {
    showError(messageInput, "Por favor, escribí un mensaje.");
    return false;
  }

  if (message.length < 10) {
    showError(
      messageInput,
      "El mensaje debe tener al menos 10 caracteres."
    );
    return false;
  }

  showSuccess(messageInput);
  return true;
}


/* =========================
   VALIDACIÓN EN TIEMPO REAL
========================= */

nameInput.addEventListener("input", validateName);

emailInput.addEventListener("input", validateEmail);

messageInput.addEventListener("input", validateMessage);


/* =========================
   ENVIAR FORMULARIO
========================= */

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameValid = validateName();
  const emailValid = validateEmail();
  const messageValid = validateMessage();

  if (nameValid && emailValid && messageValid) {
    formStatus.textContent =
      "¡Mensaje enviado correctamente! Gracias por contactarme 💜";

    form.reset();

    document.querySelectorAll(".form-group").forEach((group) => {
      group.classList.remove("valid");
    });
  } else {
    formStatus.textContent =
      "Revisá los campos marcados antes de enviar.";
  }
});


/* =========================
   ANIMACIÓN DE ENTRADA
========================= */

const animatedElements = document.querySelectorAll(
  ".project-card, .mini-facts div, .hero-text, .hero-card"
);

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15
  }
);

animatedElements.forEach((element) => {
  element.classList.add("hidden");
  animationObserver.observe(element);
});