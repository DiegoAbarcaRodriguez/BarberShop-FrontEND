import { DateTime } from 'luxon';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorFormsService } from '../../../../../shared/services/validators/validator-forms.service';
import { NotificationComponent } from '../../../../../shared/components/notification/notification.component';
import { RoundTimeDirective } from '../../../../directives/round-time.directive';
import { AppointmentService } from '../../../../../shared/services/appointment.service';
import { ValidateExistingAppointment } from '../../../../../shared/services/validators/validate-existing-appointment.service';


@Component({
  selector: 'client-appointment-form-component',
  imports: [
    ReactiveFormsModule,
    NotificationComponent,
    RoundTimeDirective
  ],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss'
})
export class AppointmentFormComponent implements OnDestroy, OnInit {

  currentDate = signal('');

  private _fb = inject(FormBuilder);
  private _validatorFormsService = inject(ValidatorFormsService);
  private _validateExistingAppointment = inject(ValidateExistingAppointment);
  private _appointmentService = inject(AppointmentService);

  form = this._fb.group({
    'name': [''],
    'date': ['', [Validators.required, this._validatorFormsService.validateAppointmentDate]],
    'time': ['', [Validators.required, this._validatorFormsService.validateAppointmentTime]]
  }, {
    updateOn: 'blur',
    asyncValidators: [this._validateExistingAppointment]
  })

  constructor() {
    this.currentDate.set(DateTime.now().setZone('America/Mexico_City').toFormat('yyyy-MM-dd'))
  }

  ngOnInit() {
    if (this._appointmentService.appointmentData()) {
      this.form.setValue({ ...this._appointmentService.appointmentData()!, name: this._appointmentService.userName() })
    }
  }

  ngOnDestroy(): void {
    if (this.form.valid) {
      const { name, ...appointmentData } = this.form.value;
      this._appointmentService.setAppointmentData(appointmentData as { date: string, time: string });
    }

  }


  hasErrorField(field: string) {
    return this._validatorFormsService.hasErrorField(this.form, field);
  }

  getErrorsByField(field: string) {
    return this._validatorFormsService.getErrorsByField(this.form, field);

  }


}
