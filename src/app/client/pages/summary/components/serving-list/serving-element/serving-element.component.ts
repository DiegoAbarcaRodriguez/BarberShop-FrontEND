import { Component, input } from '@angular/core';
import { Serving } from '../../../../../../shared/interfaces';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'summary-serving-element-component',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './serving-element.component.html',
  styleUrls: ['./serving-element.component.scss']
})
export class ServingElementComponent {

  service = input.required<Serving>();

}
