import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { SweetAlertService } from '../../../../../shared/services/sweet-alert.service';
import { Serving } from '../../../../../shared/interfaces';
import { rxResource } from '@angular/core/rxjs-interop';
import { AppointmentService } from '../../../../../shared/services/appointment.service';
import { filter, of, Subscription, switchMap } from 'rxjs';
import { ServingsService } from '../../../../../shared/services/servings.service';
import { Router } from '@angular/router';
import { SecurityService } from '../../../../../shared/services/security.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { FactoryTarget } from '@angular/compiler';
import { servicesAppointmentService } from '../../../../../shared/services/servicesAppointment.service';


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
  services = input<Serving[]>([]);
  mustTriggerRequest = signal(false);

  private sweetAlertService = inject(SweetAlertService);
  private _appointmentService = inject(AppointmentService);
  private _servicesAppointmentService = inject(servicesAppointmentService);
  private _sevingsService = inject(ServingsService);
  private _securityService = inject(SecurityService);
  private _router = inject(Router);

  date = computed(() => {
    if (!this.appointmentData()) return;
    const { date } = this.appointmentData()!;
    return new Date(date.replace('-', '/'));
  });

  servingsId = computed(() => this.services().length === 0 ? [] : this.services()?.map(service => service.id));


  effectRef = effect((onCleanup) => {
    if (!this.appointmentData() || this.servingsId().length === 0 || !this.mustTriggerRequest()) return;


    const { date, time } = this.appointmentData()!;

    let subscription: Subscription;
    subscription = this._appointmentService.createAppointment(date, time)
      .pipe(
        filter((id) => id !== null),
        switchMap((id) => this._servicesAppointmentService.createServiceAppointmentRecord(id, this.servingsId()))
      )
      .subscribe({
        next: (resp) => {

          if (resp) {
            this._handlerSuccess();
            return;
          }
        },
        error: (error: HttpErrorResponse) => {
          this._handlerError(error);
        }
      });


    onCleanup(() => {
      subscription.unsubscribe();
    });

  });

  createAppointment() {
    this.mustTriggerRequest.set(true);
  }

  private _handlerSuccess() {
    this.sweetAlertService.showAlert('<span class="modal-title"> Success</span>', '<span class="modal-text">The appointment has been saved successfully! </span> <i class="text-success blink fa-regular fa-circle-check"></i>',)
      .then(() => {
        this._appointmentService.clearAppointmentData();
        this._sevingsService.clearServings();
        this._securityService.clearToken();
        this._router.navigateByUrl('/');
      });
  }

  private _handlerError(error: HttpErrorResponse) {
    this.sweetAlertService.showAlert('<span class="modal-title">Error</span>', `<span class="modal-text">${(error.error.message)}</span>   <i  class="text-danger blink fa-solid fa-circle-exclamation"></i>`,);
    this.mustTriggerRequest.set(false);
  }

}
