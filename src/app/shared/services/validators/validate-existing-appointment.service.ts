import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { AppointmentService } from '../appointment.service';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ValidateExistingAppointment implements AsyncValidator {

   
    constructor(private _appointmentService: AppointmentService) {

    }

    validate(form: AbstractControl): Observable<ValidationErrors | null> {
        const date = form.get('date')?.value;
        const time = form.get('time')?.value;
        if (!time || !date) return of(null);
        if (time.split(':').at(1) != '00' && time.split(':').at(1) != '30') return of(null);


        return this._appointmentService?.getExistingAppointment(date, time)
            .pipe(map(({ ok }) => {
                if (!ok) {
                    form.get('date')?.setErrors({ appointmentTaken: true });
                    setTimeout(() => {
                        form.get('date')?.reset();
                        form.get('time')?.reset();
                    }, 2000);
                    return { appointmentTaken: true };
                }
                return null
            }));
    }


}






