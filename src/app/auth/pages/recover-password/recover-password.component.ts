import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponent } from '../../../shared/components/notification/notification.component';
import { ValidatorFormsService } from '../../../shared/services/validators/validator-forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [
    ReactiveFormsModule,
    NotificationComponent
  ],
  templateUrl: './recover-password.component.html',
  styles: ``
})
export default class RecoverPasswordComponent implements OnInit {

  private _fb = inject(FormBuilder);
  private _validatorFormsService = inject(ValidatorFormsService);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _authService = inject(AuthService);

  private _token = signal('');
  private _id = signal('');
  private _newPassword = signal('');

  errorFromServer = signal('');
  mustShowQueryParametersError = signal(false);

  form = this._fb.group({
    password: ['', [Validators.required, Validators.pattern(this._validatorFormsService.passwordRegex)]],
    confirmingPassword: ['', [Validators.required, Validators.pattern(this._validatorFormsService.passwordRegex)]]
  }, {
    validators: [this._validatorFormsService.passwordsValidator]
  });




  ngOnInit() {
    this._getQueryParams();
  }

  wasValidUpdatePasswordRef = effect(() => {
    if (!this.updatePasswordResource.value()) return;

    this._router.navigateByUrl('/');
  });

  wasFailedUpdatePasswordRef = effect(() => {
    if (!this.updatePasswordResource.error()) return;
    const { error } = this.updatePasswordResource.error() as HttpErrorResponse;

    this.form.reset();
    this.errorFromServer.set(error.message);
    setTimeout(() => {
      this.errorFromServer.set('');
    }, 5000);
  })

  updatePasswordResource = rxResource({
    request: () => ({ id: this._id(), token: this._token(), password: this._newPassword() }),
    loader: ({ request }) => {
      const { id, token, password } = request;
      if (!id || !token || !password) return of(null);


      return this._authService.updatePassword(id, token, password);

    },
  });



  private _getQueryParams() {
    const token = this._activatedRoute.snapshot.queryParamMap.get('token');
    const id = this._activatedRoute.snapshot.queryParamMap.get('id');

    if (!token || !id || token.length < 36 || id.length < 36) this.mustShowQueryParametersError.set(true);

    this._token.set(token!);
    this._id.set(id!);
  }



  hasErrorField(fieldName: string): boolean {
    return this._validatorFormsService.hasErrorField(this.form, fieldName);
  }

  getErrorsByField(fieldName: string) {
    return this._validatorFormsService.getErrorsByField(this.form, fieldName);
  }

  hasEmptyField() {
    return this._validatorFormsService.hasEmptyField(this.form);
  }

  changePassword() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;
    this._newPassword.set(this.form.value.password);

  }

}
