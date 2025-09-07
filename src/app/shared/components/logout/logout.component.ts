import { Component, computed, inject } from '@angular/core';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { ServingsService } from '../../../shared/services/servings.service';
import { SecurityService } from '../../../shared/services/security.service';
import { Router } from '@angular/router';
import { TimingService } from '../../services/timing.service';

@Component({
  selector: 'shared-logout-component',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  private _appointmentService = inject(AppointmentService);
  private _servingsService = inject(ServingsService);
  private _securityService = inject(SecurityService);
  private _timingService = inject(TimingService);
  private _router = inject(Router);

  userName = computed(() => this._appointmentService.userName());

  logout() {
    this._appointmentService.clearAppointmentData();
    this._servingsService.clearServings();
    this._securityService.clearToken();
    this._timingService.stopCounterToShowAlert();
    this._router.navigateByUrl('/');
  }

}
