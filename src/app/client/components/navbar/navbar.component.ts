import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'client-navbar-component',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {


  private _sharedService = inject(SharedService)


  navigateTo(url: string) {
    this._sharedService.currentUrl.set(url);
  }

}
