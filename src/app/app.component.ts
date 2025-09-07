import { Component, inject, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SidebarImageComponent } from "./shared/components/sidebar-image/sidebar-image.component";
import { CounterComponent } from './shared/components/counter/counter.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SidebarImageComponent,
    CounterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _router = inject(Router);

  currentUrl: string = '';

  effectRef = effect(() => {
    this._router.events.subscribe(() => this.currentUrl = this._router.url);
  })
}
