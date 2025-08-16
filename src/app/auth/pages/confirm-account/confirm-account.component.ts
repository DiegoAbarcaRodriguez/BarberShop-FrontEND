import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NotificationComponent } from '../../../shared/components/notification/notification.component';

@Component({
  imports: [NotificationComponent],
  template: `
    @if(mustShowValidatedMessage()){
      <shared-notification-component [isError]="false" message="Account validated succesfully"></shared-notification-component>
    }
  `
})
export default class ConfirmAccountComponent implements OnInit {

  token = signal<string>('');
  id = signal<string>('');

  mustShowValidatedMessage = signal<boolean>(false);

  private _activatedRoute = inject(ActivatedRoute);
  private _authService = inject(AuthService);

  ngOnInit() {
    this.token.set(this._activatedRoute.snapshot.queryParamMap.get('token') || '');
    this.id.set(this._activatedRoute.snapshot.queryParamMap.get('id') || '');
  }


  wasValidated = effect(() => {
    if (!this.validateAccountResource.value()) return;

    this.mustShowValidatedMessage.set(true);
    this._authService.mustShowLoginOption.set(true);

  });

  validateAccountResource = rxResource({
    request: () => ({ id: this.id(), token: this.token() }),
    loader: ({ request }) => {
      const { id, token } = request;
      if (!id || !token) return of(null);


      return this._authService.validateAccount(id, token);

    },
  });
}
