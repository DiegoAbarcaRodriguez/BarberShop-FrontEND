import { Component, effect, EffectCleanupFn, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorFormsService } from '../../../shared/services/validators/validator-forms.service';
import { NotificationComponent } from '../../../shared/components/notification/notification.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { LoginPayload } from '../../interfaces';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SecurityService } from '../../../shared/services/security.service';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { TimingService } from '../../../shared/services/timing.service';

@Component({
  imports: [
    ReactiveFormsModule,
    NotificationComponent
  ],
  templateUrl: './login.component.html'
})
export default class LoginComponent {

  private _fb = inject(FormBuilder);
  private _validatorFormsService = inject(ValidatorFormsService);
  private _authService = inject(AuthService);
  private _securityService = inject(SecurityService);
  private _appointmentService = inject(AppointmentService);
  private _timingService = inject(TimingService);
  private _router = inject(Router);

  private _body = signal<{ email: string, password: string } | undefined>(undefined);
  errorFromServer = signal('');

  form = this._fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern(this._validatorFormsService.passwordRegex)]]
  });



  wasValidLoginRequestRef = effect(() => {
    if (!this.loginResource.value()) return;

    this._securityService.token = this.loginResource.value()!.token;
    this._appointmentService.setUserName(this.loginResource.value()?.userName || '');
    if (!this.loginResource.value()?.isAdmin) this._timingService.initializeCounterToShowAlert();
    this._router.navigateByUrl('/book/services');

  });

  wasFailedLoginRequestRef = effect(() => {
    if (!this.loginResource.error()) return;
    const { error } = this.loginResource.error() as HttpErrorResponse;

    this.form.reset();
    this.errorFromServer.set(error.message);
    setTimeout(() => {
      this.errorFromServer.set('');
    }, 5000);
  });

  loginResource = rxResource({
    request: () => ({ body: this._body() }),
    loader: ({ request }) => {

      const { body } = request;
      if (!body) return of(null);

      const { email, password } = body!;
      if (!email || !password) return of(null);


      return this._authService.loginAccount(email, password)

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

  login() {

    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    let { email, password } = this.form.value;
    email = email?.toLocaleLowerCase().trim();

    this._body.set({ email, password } as LoginPayload);

  }

}
