import { Component, inject, signal } from '@angular/core';
import { SearcherComponent } from "./components/searcher/searcher.component";
import { AppointmentService } from '../../../shared/services/appointment.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  imports: [SearcherComponent],
  templateUrl: './appointments.component.html',
  styles: ``
})
export default class AppointmentsComponent {

  private _appointmentService = inject(AppointmentService);

  date = signal('');

  appointmentsResource = rxResource({
    request: () => ({ date: this.date() }),
    loader: ({ request }) => {
      const { date } = request;

      if (!date) return of(null);

      return this._appointmentService.getAppointmentsByDate(date);
    }
  });



}
