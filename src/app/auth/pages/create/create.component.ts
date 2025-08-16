import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email-async.validator';
import { ValidatorFormsService } from '../../../shared/services/validators/validator-forms.service';
import { NotificationComponent } from '../../../shared/components/notification/notification.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { User } from '../../../shared/interfaces';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  imports: [
    ReactiveFormsModule,
    NotificationComponent
  ],
  templateUrl: './create.component.html',
})
export default class CreateComponent {


  private _fb = inject(FormBuilder);
  private _validatorFormsService = inject(ValidatorFormsService);
  private _emailValidator = inject(EmailValidator);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  private _payloadCreateUserRequest = signal<User | undefined>(undefined);

  errorFromServer = signal('');


  form = this._fb.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(this._validatorFormsService.phoneRegex)]],
    email: ['', [Validators.required, Validators.email], [this._emailValidator.validate()]],
    password: ['', [Validators.required, Validators.pattern(this._validatorFormsService.passwordRegex)]],
    confirmingPassword: ['', [Validators.required, Validators.pattern(this._validatorFormsService.passwordRegex)]]
  },
    { updateOn: 'blur', validators: [this._validatorFormsService.passwordsValidator] }
  );


  private _wasValidCreateRequestRef = effect(() => {
    if (!this.createUserResource.value()) return;

    this._router.navigateByUrl('/confirm-account');

  });

  private _wasFailedCreateRequestRef = effect(() => {
    if (!this.createUserResource.error()) return;

    const { error } = this.createUserResource.error() as HttpErrorResponse;

    this.form.reset();
    this.errorFromServer.set(error.message);
    setTimeout(() => {
      this.errorFromServer.set('');
    }, 5000);
  });


  createUserResource = rxResource({
    request: () => ({ body: this._payloadCreateUserRequest() }),
    loader: ({ request }) => {
      const { body } = request;
      if (!body) return of(null);

      return this._authService.createAccount(request.body!);

    },
  });

  hasErrorField(fieldName: string): boolean {
    return this._validatorFormsService.hasErrorField(this.form, fieldName);
  }

  getErrorsByField(fieldName: string) {
    return this._validatorFormsService.getErrorsByField(this.form, fieldName);
  }

  hasEmptyField() {
    return this._validatorFormsService.hasEmptyField(this.form);
  }

  createAccount() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const { confirmingPassword, ...body } = this.form.value;
    this._payloadCreateUserRequest.set(body);

  }

}
