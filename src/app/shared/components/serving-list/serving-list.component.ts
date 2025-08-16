import { Component, input } from '@angular/core';
import { ServingComponent } from './serving/serving.component';
import { Serving } from '../../interfaces';

@Component({
  selector: 'shared-serving-list-component',
  imports: [ServingComponent],
  templateUrl: './serving-list.component.html',
  styleUrl: './serving-list.component.scss'
})
export class ServingListComponent {

  servings = input.required<Serving[]>();
}
