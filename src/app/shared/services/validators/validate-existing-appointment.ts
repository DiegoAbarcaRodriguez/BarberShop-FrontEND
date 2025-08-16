import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, of } from 'rxjs';
import { AppointmentService } from '../appointment.service';


export const validateExistingAppointment = (appointmentService: AppointmentService): AsyncValidatorFn => {
    return (form: AbstractControl) => {


        const date = form.get('date')?.value;
        const time = form.get('time')?.value;
        if (!time || !date) return of(null);
        if (time.split(':').at(1) != '00' && time.split(':').at(1) != '30') return of(null);


        return appointmentService.getExistingAppointment(date, time)
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




