import { Component, inject } from '@angular/core';
import { TitlesComponent } from '../components/titles/titles.component';
import { LogoutComponent } from '../components/logout/logout.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { BottomTabsComponent } from "../../shared/components/bottom-tabs/bottom-tabs.component";


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
