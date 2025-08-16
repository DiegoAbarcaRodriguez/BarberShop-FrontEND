import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { TitlesComponent } from "../../shared/components/titles/titles.component";
import { LogoutComponent } from "../../shared/components/logout/logout.component";
import { RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    imports: [
        NavbarComponent,
        TitlesComponent,
        LogoutComponent,
        RouterOutlet
    ],
    templateUrl: 'layout.component.html'
})

export default class LayoutComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}