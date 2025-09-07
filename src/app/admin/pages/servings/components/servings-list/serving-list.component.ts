import { Component, inject, linkedSignal } from '@angular/core';
import { ServingItemComponent } from './serving-item/serving-item.component';
import { ServingsService } from '../../../../../shared/services/servings.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Serving } from '../../../../../shared/interfaces';

@Component({
    standalone: true,
    imports: [ServingItemComponent],
    selector: 'admin-serving-list',
    templateUrl: 'serving-list.component.html'
})

export class ServingListComponent {

    private _servingsService = inject(ServingsService);

    services = linkedSignal(() => this.servicesResource.value() ?? []);

    servicesResource = rxResource({
        request: () => ({}),
        loader: () => {
            return this._servingsService.getServings();
        }
    });

    onDeleteService(id: string) {
        this.services.update(current => current.filter(value => value.id !== id));
    }
}
