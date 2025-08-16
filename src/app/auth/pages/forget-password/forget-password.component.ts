import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponent } from '../../../shared/components/notification/notification.component';
import { ValidatorFormsService } from '../../../shared/services/validators/validator-forms.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [
    ReactiveFormsModule,
    NotificationComponent
  ],
  templateUrl: './forget-password.component.html',
  styles: ``
})
export default class ForgetPasswordComponent {

  private _fb = inject(FormBuilder);
  private _validatorFormsService = inject(ValidatorFormsService);
  private _authService = inject(AuthService);

  private _bodySendEmail = signal('');

  errorFromServer = signal('');
  mustShowSuccesMessage = signal(false);

  form = this._fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  wasValidSendEmailRequestRef = effect(() => {
    if (!this.sendEmailResource.value()) return;

    this.form.reset();
    this.errorFromServer.set('');
    this.mustShowSuccesMessage.set(true);

  });

  wasFailedSendEmailRequestRef = effect(() => {
    if (!this.sendEmailResource.error()) return;

    const { error } = this.sendEmailResource.error() as HttpErrorResponse;

    this.form.reset();
    this.mustShowSuccesMessage.set(false);
    this.errorFromServer.set(error.message);
    setTimeout(() => {
      this.errorFromServer.set('');
    }, 5000);
  });

  sendEmailResource = rxResource({
    request: () => ({ email: this._bodySendEmail() }),
    loader: ({ request }) => {
      const { email } = request;
      if (!email) return of(null);

      return this._authService.sendEmailToRecoverPassword(email);

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

  sendEmail() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    let { email } = this.form.value;
    email = email?.toLocaleLowerCase().trim();

    this._bodySendEmail.set(email || '');

  }

}
