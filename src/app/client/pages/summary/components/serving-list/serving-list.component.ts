import { Component, input } from '@angular/core';

import { Serving } from '../../../../../shared/interfaces';
import { ServingElementComponent } from './serving-element/serving-element.component';

@Component({
  selector: 'summary-serving-list-component',
  imports: [ServingElementComponent],
  templateUrl: './serving-list.component.html',
  styles: ``
})
export class ServingListComponent {

  services = input.required<Serving[]>();

}
