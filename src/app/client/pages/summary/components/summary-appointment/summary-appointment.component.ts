import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { SweetAlertService } from '../../../../../shared/services/sweet-alert.service';
import { Serving } from '../../../../../shared/interfaces';
import { rxResource } from '@angular/core/rxjs-interop';
import { AppointmentService } from '../../../../../shared/services/appointment.service';
import { of } from 'rxjs';
import { ServingsService } from '../../../../../shared/services/servings.service';
import { Router } from '@angular/router';
import { SecurityService } from '../../../../../shared/services/security.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { FactoryTarget } from '@angular/compiler';


@Component({
  selector: 'summary-appointment-component',
  imports: [
    DatePipe
  ],
  templateUrl: './summary-appointment.component.html',
  styleUrl: './summary-appointment.component.scss'
})
export class SummaryAppointmentComponent {

  userName = input.required<string>();
  appointmentData = input<{ date: string, time: string }>();
  services = input<Serving[]>();
  mustTriggerRequest = signal(false);

  private sweetAlertService = inject(SweetAlertService);
  private _appointmentService = inject(AppointmentService);
  private _sevingsService = inject(ServingsService);
  private _securityService = inject(SecurityService);
  private _router = inject(Router);

  date = computed(() => {
    if (!this.appointmentData()) return;
    const { date } = this.appointmentData()!;
    return new Date(date.replace('-', '/'));
  });

  resultRequestRef = effect(() => {
    if (!this.createAppointmentResource.value()) return;

    this.sweetAlertService.showAlert('<span class="modal-title"> Success</span>',  '<span class="modal-text">The appointment has been saved successfully! </span> <i class="text-success blink fa-regular fa-circle-check"></i>', )
      .then(() => {
        this._appointmentService.clearAppointmentData();
        this._sevingsService.clearServings();
        this._securityService.clearToken();
        this._router.navigateByUrl('/');
      });

  });

  errorRequestRef = effect(() => {
    if (!this.createAppointmentResource.error()) return;

    this.sweetAlertService.showAlert('<span class="modal-title">Error</span>', `<span class="modal-text">${(this.createAppointmentResource.error() as HttpErrorResponse).error.message}</span>   <i  class="text-danger blink fa-solid fa-circle-exclamation"></i>`,);
    this.mustTriggerRequest.set(false);
  });

  createAppointmentResource = rxResource({
    request: (() => ({
      mustTriggerRequest: this.mustTriggerRequest(),
      appointmentData: this.appointmentData()
    })),
    loader: ({ request }) => {
      const { mustTriggerRequest, appointmentData } = request;
      if (!mustTriggerRequest) return of(null);


      return this._appointmentService.createAppointment(appointmentData?.date!, appointmentData?.time!)
    }
  })



  createAppointment() {
    this.mustTriggerRequest.set(true);
  }

}
