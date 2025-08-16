import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { Serving } from '../../../interfaces';
import { ServingsService } from '../../../services/servings.service';

@Component({
  selector: 'shared-serving-component',
  imports: [],
  templateUrl: './serving.component.html',
  styleUrl: './serving.component.scss'
})
export class ServingComponent {

  serving = input.required<Serving>();
  private servingsService = inject(ServingsService);

  toggleService() {
    this.servingsService.updatedServings.update((servings) => servings.map(service => {
      if (service.id === this.serving().id) {
        return {
          ...service,
          isSelected: this.serving().isSelected ? false : true
        };
      }
      return service;
    }));
  }

}
