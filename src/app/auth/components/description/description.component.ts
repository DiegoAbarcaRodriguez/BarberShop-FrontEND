import { Component, input } from '@angular/core';

@Component({
  selector: 'auth-description-component',
  imports: [],
  template: `
    <h1 class="text-center">{{title()}}</h1>
    <p class="text-center">{{legend()}}</p>

  `
})
export class DescriptionComponent {

  title = input.required<string>();
  legend = input.required<string>();

}
