import { Component, inject, input, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'auth-tabs-component',
  imports: [RouterModule],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {

  currentUrl = input.required<string>();
  authService = inject(AuthService);

  



}
