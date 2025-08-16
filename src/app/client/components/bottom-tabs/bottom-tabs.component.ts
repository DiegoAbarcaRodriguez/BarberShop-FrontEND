import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, inject, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';


@Component({
  selector: 'client-bottom-tabs-component',
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './bottom-tabs.component.html',
  styleUrl: './bottom-tabs.component.scss'
})
export class BottomTabsComponent {
  private _router = inject(Router);
  private _sharedService = inject(SharedService);

  currentUrl = linkedSignal(() => this._sharedService.currentUrl());

  mustShowLeftButton = computed(() => {
    if (!this.currentUrl()) return;
    return this.currentUrl() !== '/book/services'
  });

  mustShowRightButton = computed(() => {
    if (!this.currentUrl()) return;
    return this.currentUrl() !== '/book/summary';
  });

  constructor() {
    this._onRouterChanges();
  }


  navigate(isNext: boolean = true) {
    const conditionToNavigate = isNext ?
      (this._router.url === '/book/appointment' ? '/book/summary' : '/book/appointment')
      : (this._router.url === '/book/appointment' ? '/book/services' : '/book/appointment');

    this.currentUrl.set(conditionToNavigate);
    this._router.navigateByUrl(conditionToNavigate);
  }


  private _onRouterChanges() {
    this.currentUrl.set(this._router.url)
  }




}
