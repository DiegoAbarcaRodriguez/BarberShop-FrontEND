import { Component, inject, effect } from '@angular/core';
import { ServingListComponent } from '../../../shared/components/serving-list/serving-list.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { ServingsService } from '../../../shared/services/servings.service';

@Component({
  imports: [ServingListComponent],
  templateUrl: './servings.component.html',
  styleUrl: './servings.component.scss'
})
export default class ServingsComponent {

  servingsService = inject(ServingsService);

  effectRef = effect(() => {
    if (!this.servingsResource.hasValue()) return;

    this.servingsService.updatedServings.set(this.servingsResource.value()!);
  });


  servingsResource = rxResource({
    loader: () => {
      return this.servingsService.getServings();
    }
  });


}
