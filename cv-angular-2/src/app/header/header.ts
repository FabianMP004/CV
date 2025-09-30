import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class Header {
  ngAfterViewInit() {
    this.showGreetingPopup();
  }

  showGreetingPopup() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = '';
    if (hour >= 6 && hour < 12) {
      greeting = 'Buenos días';
    } else if (hour >= 12 && hour < 19) {
      greeting = 'Buenas tardes';
    } else {
      greeting = 'Buenas noches';
    }
    const popup = document.getElementById('greeting-popup');
    if (popup) {
      popup.textContent = greeting;
      popup.style.display = 'block';
      setTimeout(() => {
        popup.style.display = 'none';
      }, 10000);
    }
  }

  toggleTheme() {
    document.body.classList.toggle('light-mode');
  }

  generatePDF() {
    // Asegúrate de que html2pdf esté disponible globalmente
    // y que los assets estén correctamente configurados
    const header = document.querySelector('header');
    if (!header) return;
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
    // @ts-ignore
    if (window['html2pdf']) {
      // @ts-ignore
      window['html2pdf']().set(opt).from(header).save();
    } else {
      alert('No se encontró html2pdf. Asegúrate de incluir la librería.');
    }
  }

}
