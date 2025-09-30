import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  greeting: string = '';
  showGreeting: boolean = false;

  ngOnInit() {
    this.setGreeting();
    this.showGreeting = true;
    setTimeout(() => {
      this.showGreeting = false;
    }, 10000);
  }

  setGreeting() {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 6 && hour < 12) {
      this.greeting = 'Buenos días';
    } else if (hour >= 12 && hour < 19) {
      this.greeting = 'Buenas tardes';
    } else {
      this.greeting = 'Buenas noches';
    }
  }

  toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-mode');
  }

  generatePDF() {
    // @ts-ignore
    const html2pdf = window['html2pdf'];
    if (!html2pdf) {
      alert('html2pdf.js no está cargado.');
      return;
    }
  const header = document.querySelector('app-header');
  const pdfContainer = document.createElement('div');
  pdfContainer.style.cssText = `background: white; padding: 20px; font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;`;
  if (header) pdfContainer.appendChild(header.cloneNode(true));
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: 'Fabian_Miranda_CV.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(pdfContainer).save();
  }
}
