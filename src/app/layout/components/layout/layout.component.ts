import {Component, Renderer2} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(private renderer: Renderer2, private http: HttpClient) {}
  private loadStyle(href: string): void {
    const link = this.renderer.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    this.renderer.appendChild(document.head, link);
  }

  private loadScript(src: string): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    this.renderer.appendChild(document.body, script);
  }
  ngOnInit(): void {
    this.loadStyle('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css');
    this.loadStyle('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css');


  }
}
