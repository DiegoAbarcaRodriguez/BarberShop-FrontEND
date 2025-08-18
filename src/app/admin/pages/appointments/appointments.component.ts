import { Component, inject, linkedSignal, signal } from '@angular/core';
import { SearcherComponent } from "./components/searcher/searcher.component";
import { AppointmentService } from '../../../shared/services/appointment.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { AppointmentItemComponent } from './components/appointments-list/appointment-item.component';
import { SweetAlertService } from '../../../shared/services/sweet-alert.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  imports: [
    SearcherComponent,
    AppointmentItemComponent,
  ],
  templateUrl: './appointments.component.html',
  styleUrl: 'appointments.component.scss'
})
export default class AppointmentsComponent {

  private _appointmentService = inject(AppointmentService);
  private _sweetAlertService = inject(SweetAlertService);

  date = signal('');


  appointments = linkedSignal(() => {
    if (!this.appointmentsResource.value()) return [];
    return this.appointmentsResource.value();

  });

  appointmentsResource = rxResource({
    request: () => ({ date: this.date() }),
    loader: ({ request }) => {
      const { date } = request;

      if (!date) return of(null);

      return this._appointmentService.getAppointmentsByDate(date);
    }
  });

  deleteAppointment(id: string) {
    this._sweetAlertService.showAlert('Do you want to eliminate it?', '', true)
      .then(resp => {
        if (resp.isConfirmed) {
          this._appointmentService.deleteAppointment(id).subscribe({
            next: () => this.appointments.update(appointment => appointment?.filter(({ appointment }) => appointment.id !== id)),
            error: (error: HttpErrorResponse) => this._sweetAlertService.showAlert('<span class="modal-title">Error</span>', `<span class="modal-text">${(error.error.message)}</span>  <i  class="text-danger blink fa-solid fa-circle-exclamation"></i>`)
          });
        }
      })
  }



}
