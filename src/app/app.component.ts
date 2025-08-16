import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarImageComponent } from "./shared/components/sidebar-image/sidebar-image.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SidebarImageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-barberia-front';
}
