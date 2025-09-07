import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { distinctUntilChanged, Subscription, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

import { TabsComponent } from '../../components/tabs/tabs.component';
import { DescriptionComponent } from '../../components/description/description.component';
import { SweetAlertService } from '../../../shared/services/sweet-alert.service';



@Component({
  imports: [
    DescriptionComponent,
    TabsComponent,
    RouterOutlet,
    RouterModule,
    CommonModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export default class LayoutComponent implements OnInit, OnDestroy {

  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _subscription = new Subscription();
  private _sweetAlertService = inject(SweetAlertService);

  title = signal<string>('');
  description = signal<string>('');
  currentUrl = signal<string>('');



  ngOnInit(): void {
    this._getRouteData();
    this._onChangingRoutes();
    this._onSessionExpiredModal();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _getRouteData() {
    this._subscription.add(this._activatedRoute.children[0]?.data
      .subscribe(({ title, description }) => {
        this.title.set(title);
        this.description.set(description);
        this.currentUrl.set(this._router.url);
      }));
  }

  private _onChangingRoutes() {
    this._subscription.add(this._router.events.pipe(
      distinctUntilChanged(),
      switchMap(() => this._activatedRoute.children[0].data)
    )
      .subscribe(({ title, description }) => {
        this.title.set(title);
        this.description.set(description);
        this.currentUrl.set(this._router.url);
      }));

  }

  private _onSessionExpiredModal() {
    this._subscription.add(
      this._activatedRoute.queryParamMap.subscribe(value => {
        if (value.get('sessionExpired')) {
          this._sweetAlertService.showAlert(
            '<span class="modal-title">Error</span>',
            `<span class="modal-text">The session has expired!</span>   <i  class="text-danger blink fa-solid fa-circle-exclamation"></i>`
          );
        }
      })
    )
  }





}
