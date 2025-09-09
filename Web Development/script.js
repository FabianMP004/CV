// Mostrar/Ocultar Educación
window.addEventListener("DOMContentLoaded", function() {
    const btnEdu = document.getElementById("toggle-education");
    const eduSection = document.getElementById("educacion");
    if (btnEdu && eduSection) {
        btnEdu.addEventListener("click", function() {
            if (eduSection.style.display === "none") {
                eduSection.style.display = "";
            } else {
                eduSection.style.display = "none";
            }
        });
    }
});
// Mostrar/Ocultar Experiencia Laboral
window.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("toggle-experience");
    const expSection = document.getElementById("experiencia");
    if (btn && expSection) {
        btn.addEventListener("click", function() {
            if (expSection.style.display === "none") {
                expSection.style.display = "";
            } else {
                expSection.style.display = "none";
            }
        });
    }
});
// Saludo dinámico como popup
function showGreetingPopup() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = "";
    if (hour >= 6 && hour < 12) {
        greeting = "Buenos días";
    } else if (hour >= 12 && hour < 19) {
        greeting = "Buenas tardes";
    } else {
        greeting = "Buenas noches";
    }
    const popup = document.getElementById("greeting-popup");
    if (popup) {
        popup.textContent = greeting;
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.display = "none";
        }, 10000);
    }
}

window.addEventListener("DOMContentLoaded", showGreetingPopup);
// Saludo dinámico según la hora
function setDynamicGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = "";
    if (hour >= 6 && hour < 12) {
        greeting = "Buenos días";
    } else if (hour >= 12 && hour < 19) {
        greeting = "Buenas tardes";
    } else {
        greeting = "Buenas noches";
    }
    const greetingDiv = document.getElementById("dynamic-greeting");
    if (greetingDiv) greetingDiv.textContent = greeting;
}

window.addEventListener("DOMContentLoaded", setDynamicGreeting);
function generatePDF() {
    // Crear una copia del contenido para el PDF
    const originalContent = document.body.cloneNode(true);
    // Crear un contenedor temporal para el PDF
    const pdfContainer = document.createElement('div');
    pdfContainer.style.cssText = `
        background: white;
        padding: 20px;
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
    `;
    // Obtener solo el contenido principal (sin nav y footer)
    const header = originalContent.querySelector('header');
    const main = originalContent.querySelector('main');
    // Añadir contenido al contenedor PDF
    if (header) pdfContainer.appendChild(header.cloneNode(true));
    if (main) pdfContainer.appendChild(main.cloneNode(true));
    // Configuración del PDF
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: 'Fabian_Miranda_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            allowTaint: true
        },
        jsPDF: { 
            unit: 'in', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    };
    // Generar y descargar el PDF
    html2pdf().set(opt).from(pdfContainer).save();
}
// Alternar entre modo claro y oscuro
document.addEventListener("DOMContentLoaded", function() {
    const themeBtn = document.getElementById("toggle-theme");
    themeBtn.addEventListener("click", function() {
        document.body.classList.toggle("light-mode");
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const contactBtn = document.getElementById("toggle-contact");
    const contactInfo = document.getElementById("contact-info");
    if (contactBtn && contactInfo) {
        contactBtn.addEventListener("click", function() {
            if (contactInfo.style.display === "none") {
                contactInfo.style.display = "";
            } else {
                contactInfo.style.display = "none";
            }
        });
    }
});
