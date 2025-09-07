import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { map, of } from 'rxjs';
import { Serving } from '../../../../shared/interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorFormsService } from '../../../../shared/services/validators/validator-forms.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ServingsService } from '../../../../shared/services/servings.service';
import { SweetAlertService } from '../../../../shared/services/sweet-alert.service';
import { Router } from '@angular/router';
import { NotificationComponent } from '../../../../shared/components/notification/notification.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NotificationComponent
    ],
    selector: 'admin-service-form',
    templateUrl: 'service-form.component.html'
})

export class ServiceFormComponent {


    service = input<Serving>();

    private _fb = inject(FormBuilder);
    private _router = inject(Router);
    private _validatorsFormsService = inject(ValidatorFormsService);
    private _servingsService = inject(ServingsService);
    private _sweetAlertService = inject(SweetAlertService);

    private _onSubmittedForm = signal<boolean>(false);

    form: FormGroup = this._fb.group({
        name: ['', [Validators.required]],
        price: [0, [Validators.required, Validators.min(0)]]
    });


    initializeForm = effect(() => {
        if (!this.service()) return;

        this.form.controls['name'].setValue(this.service()?.name);
        this.form.controls['price'].setValue(this.service()?.price);

    });

    handlerSuccessResponse = effect(() => {
        if (!this.onSubmittedFormResource.value()) return;

        this._sweetAlertService.showAlert(
            '<span class="modal-title"> Success</span>',
            `<span class="modal-text">The service has been ${this.service() ? 'updated' : 'saved'} successfully! </span> <i class="text-success blink fa-regular fa-circle-check"></i>`
        ).then(() => this._router.navigateByUrl('/admin/servings'));

    });

    handlerErrorResponse = effect(() => {
        if (!this.onSubmittedFormResource.error()) return;
        this._sweetAlertService.showAlert(
            '<span class="modal-title">Error</span>',
            `<span class="modal-text">${((this.onSubmittedFormResource.error()as HttpErrorResponse).error.message)}</span>   <i  class="text-danger blink fa-solid fa-circle-exclamation"></i>`
        ).then(() => {
            this._onSubmittedForm.set(false);
        });
    });


    onSubmittedFormResource = rxResource({
        request: () => ({ onSubmittedForm: this._onSubmittedForm(), body: this.form.value }),
        loader: ({ request }) => {

            const { onSubmittedForm, body } = request;
            if (!onSubmittedForm) return of(null);

            const { name, price } = this.form.value;

            if (this.service()) {
                return this._servingsService.updateService(this.service()!.id!, { name, price })
            }

            return this._servingsService.createService({ name, price });

        }
    })


    getErrorsFromField(fieldName: string): string[] {
        return this._validatorsFormsService.getErrorsByField(this.form, fieldName);
    }

    hasEmptyFields() {
        return this._validatorsFormsService.hasEmptyField(this.form);
    }

    onSubmit() {
        this.form.markAllAsTouched();
        if (this.form.invalid && this.form.touched) return;

        this._onSubmittedForm.set(true);

    }
}