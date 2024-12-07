import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {

    this.loadStyle('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css');
    this.loadStyle('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css');
    this.loadStyle('assets/lib/owlcarousel/assets/owl.carousel.min.css');
    this.loadStyle('assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css');
    this.loadStyle('/assets/css/bootstrap.min.css');
    this.loadStyle('/assets/css/style.css');
    this.loadScript('https://code.jquery.com/jquery-3.4.1.min.js');
    this.loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js');

    this.loadScript('assets/lib/chart/chart.min.js');
    this.loadScript('assets/lib/easing/easing.min.js');
    this.loadScript('assets/lib/waypoints/waypoints.min.js');
    this.loadScript('assets/lib/owlcarousel/owl.carousel.min.js');
    this.loadScript('assets/lib/tempusdominus/js/moment.min.js');
    this.loadScript('assets/lib/tempusdominus/js/moment-timezone.min.js');
    this.loadScript('assets/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js');
    this.loadScript('/assets/js/main.js');


  }

  private loadScript(src: string): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    this.renderer.appendChild(document.body, script);
  }
  private loadStyle(href: string): void {
    const link = this.renderer.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    this.renderer.appendChild(document.head, link);
  }
}
