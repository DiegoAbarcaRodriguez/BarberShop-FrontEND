import { Component, inject, linkedSignal } from '@angular/core';
import { ServingListComponent } from './components/serving-list/serving-list.component';
import { ServingsService } from '../../../shared/services/servings.service';
import { SummaryAppointmentComponent } from "./components/summary-appointment/summary-appointment.component";
import { AppointmentService } from '../../../shared/services/appointment.service';
import { NotificationComponent } from '../../../shared/components/notification/notification.component';

@Component({
  imports: [
    ServingListComponent,
    SummaryAppointmentComponent,
    NotificationComponent
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export default class SummaryComponent {
  private _servingsService = inject(ServingsService);
  private _appointmentService = inject(AppointmentService);

  servingsSelected = linkedSignal(() => this._servingsService.updatedServings().filter(service => service.isSelected) || []);

  userName = linkedSignal(() => this._appointmentService.userName());
  appointmentData = linkedSignal(() => this._appointmentService.appointmentData());

}
