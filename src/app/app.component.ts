import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'GamingStore';

  Components: any = {
    Processor: '',
    Motherboard: '',
    "Graphics Card": '',
    Ram: '',
    Case: '',
    Storage: '',
    "Power Supply": ''
  }

  ngOnInit(): void {
    if(localStorage.getItem('configuration') === null) {
      localStorage.setItem('configuration', JSON.stringify(this.Components));
    }
  }

}
