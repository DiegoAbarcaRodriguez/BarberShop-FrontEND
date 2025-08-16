import { Component, inject, output } from '@angular/core';



@Component({
  selector: 'admin-searcher',
  imports: [],
  templateUrl: './searcher.component.html',
  styles: ``
})
export class SearcherComponent {

  onEmitDate = output<string>();

  searchDate(date: any) {
    if (!date) return;
    this.onEmitDate.emit(date.target!.value);
  }
}
