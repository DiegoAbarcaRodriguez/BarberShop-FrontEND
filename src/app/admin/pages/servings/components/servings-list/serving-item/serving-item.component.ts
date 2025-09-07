import { Component, inject, input, OnDestroy, output } from '@angular/core';
import { Serving } from '../../../../../../shared/interfaces';
import { RouterLink } from '@angular/router';
import { ServingsService } from '../../../../../../shared/services/servings.service';
import { Subscription } from 'rxjs';
import { SweetAlertService } from '../../../../../../shared/services/sweet-alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    standalone: true,
    imports: [RouterLink],
    selector: 'admin-serving-item',
    templateUrl: 'serving-item.component.html',
    styleUrl: 'serving-item.component.scss'
})

export class ServingItemComponent implements OnDestroy {


    service = input.required<Serving>();
    onEmitServiceId = output<string>();


    private _servingsService = inject(ServingsService);
    private _sweetAlertService = inject(SweetAlertService);
    private _subscription?: Subscription;


    ngOnDestroy() {
        this._subscription?.unsubscribe();
    }

    deleteService(id: string) {

        this._sweetAlertService.showAlert('Do you want to eliminate it?', '', true)
            .then(resp => {
                if (resp.isConfirmed) {
                    this._subscription = this._servingsService.deleteService(id)
                        .subscribe({
                            next: (service) => {
                                this._sweetAlertService.showAlert(
                                    '<span class="modal-title"> Success</span>',
                                    `<span class="modal-text">The service has been ${this.service() ? 'updated' : 'saved'} successfully! </span> <i class="text-success blink fa-regular fa-circle-check"></i>`
                                ).then(() => this.onEmitServiceId.emit(id));
                            },
                            error: (error: HttpErrorResponse) => {
                                this._sweetAlertService.showAlert(
                                    '<span class="modal-title">Error</span>',
                                    `<span class="modal-text">${error.error.message}</span>   <i  class="text-danger blink fa-solid fa-circle-exclamation"></i>`
                                );
                            }
                        })
                }
            })

    }
}