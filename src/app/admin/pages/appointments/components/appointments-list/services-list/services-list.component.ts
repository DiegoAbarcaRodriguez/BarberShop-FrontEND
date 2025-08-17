import { Component, input, computed } from '@angular/core';
import { Service } from '../../../../../../shared/interfaces';
import { CurrencyPipe } from '@angular/common';

@Component({
    imports: [CurrencyPipe],
    selector: 'admin-services-list',
    templateUrl: 'services-list.component.html',
    styleUrl: 'services-list.component.scss'
})

export class ServicesListComponent {
    services = input<Service[]>();

    total = computed(() => this.services()?.reduce((acc, curr) => acc + (+curr.price), 0));
}