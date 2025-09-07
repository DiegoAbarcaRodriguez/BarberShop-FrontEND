import { Component, inject, OnInit, signal, computed, OnDestroy, linkedSignal } from '@angular/core';
import { ServiceFormComponent } from './components/service-form.component';
import { TitlesComponent } from '../../../shared/components/titles/titles.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { filter, map, Subscription, switchMap } from 'rxjs';
import { ServingsService } from '../../../shared/services/servings.service';
import { Serving } from '../../../shared/interfaces';

@Component({
  imports: [
    ServiceFormComponent,
    TitlesComponent,
    RouterModule
  ],
  templateUrl: './add-update-service.component.html',
  styles: ``
})
export default class AddUpdateServiceComponent implements OnInit, OnDestroy {

  private _activatedRoute = inject(ActivatedRoute);
  private _servingsService = inject(ServingsService);
  private _router = inject(Router);
  private _subscription?: Subscription;

  title: string = 'Add a new service';
  description: string = 'Fill out all the field to add a new service';
  service?: Serving;

  ngOnInit() {
    this._getService();

  }

  ngOnDestroy() {
    this._subscription?.unsubscribe();
  }


  private _getService() {
    this._subscription = this._activatedRoute.url.pipe(
      filter((urlSegment) => urlSegment.at(0)?.path === 'update-service'),
      switchMap(() => this._activatedRoute.params),
      map(({ id }) => id),
      switchMap(id => this._servingsService.getServiceById(id)),
    )
      .subscribe((service) => {
        if (!service) {
          this._router.navigateByUrl('');
          return;
        }
        this.service = service;
        this.title = 'Upddate a service';
        this.description = 'Fill out all the field to update a service';
      });

  }

}
