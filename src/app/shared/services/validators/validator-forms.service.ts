import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { errorsMap } from '../../constants/errors.map';


@Injectable({ providedIn: 'root' })
export class ValidatorFormsService {


    passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!?\[\]&%$#\-_])[A-Za-z\d@!?\[\]&%$#\-_]{8,}$/;

    phoneRegex = /^\d{10}$/;

    hasEmptyField(form: FormGroup): boolean {
        return Object.values(form.value).includes('') && form.touched;
    }


    hasErrorField(form: FormGroup, fieldName: string): boolean {
        return form.controls[fieldName].touched && form.controls[fieldName].invalid;
    }

    getErrorsByField(form: FormGroup, fieldName: string): string[] {

        const errorKeys = Object.keys(form?.controls[fieldName].errors || {});

        let errorMessages = [];

        for (const key of errorKeys) {

            if (key === 'required') {
                continue;
            }

            errorMessages.push(errorsMap[key]);
        }


        return errorMessages;

    }

    passwordsValidator(form: FormGroup): ValidationErrors | null {
        const password = form.controls['password'].value;
        const confirmingPassword = form.controls['confirmingPassword'].value;

        if (password !== confirmingPassword) form.controls['password'].setErrors({ misMatchedPasswords: true });
        return password !== confirmingPassword ? { misMatchedPasswords: true } : null;
    }

    validateAppointmentDate(control: FormControl): ValidationErrors | null {
        if (!control.value) return null;

        const day = control.value.split('-').at(2);
        const month = control.value.split('-').at(1);
        const year = control.value.split('-').at(0);
        const dayWeek = new Date(year, month - 1, day, 0, 0, 0).getUTCDay();

        if ([0, 6].includes(dayWeek)) {
            return { dateNotValid: true }
        }

        return null


    }

    validateAppointmentTime(control: FormControl): ValidationErrors | null {
        const time = control.value as string;
        if (!time) return null;

        const hour = Number(time.split(':').at(0));
        const minutes = time.split(':').at(1);



        if (hour > 19 || hour < 12) {
            return { timeNotValid: true };
        }

        if (hour === 19 && Number(minutes) > 0) {
            return { timeNotValid: true };
        }



        return null;
    }

    

}