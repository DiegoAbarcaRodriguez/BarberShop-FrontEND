import { Component } from '@angular/core';
import { TitlesComponent } from '../../../shared/components/titles/titles.component';
import { ServingListComponent } from './components/servings-list/serving-list.component';

@Component({
  imports: [
    TitlesComponent,
    ServingListComponent
  ],
  templateUrl: './servings.component.html',
  styles: ``
})
export default class ServingsComponent {

}
