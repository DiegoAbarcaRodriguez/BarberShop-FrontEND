import { Component, inject } from '@angular/core';
import { TitlesComponent } from '../../shared/components/titles/titles.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { LogoutComponent } from '../../shared/components/logout/logout.component';
import { BottomTabsComponent } from '../components/bottom-tabs/bottom-tabs.component';


@Component({
  imports: [
    TitlesComponent,
    LogoutComponent,
    NavbarComponent,
    RouterOutlet,
    BottomTabsComponent,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {


}
