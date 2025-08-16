import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-titles-component',
  imports: [],
  templateUrl: './titles.component.html'
})
export class TitlesComponent {

  title = input.required<string>();
  description = input.required<string>();

}
