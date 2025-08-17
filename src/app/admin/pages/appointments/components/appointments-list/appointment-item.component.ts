import { Component, input } from '@angular/core';
import { ServicesListComponent } from './services-list/services-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { AppointmentElement } from '../../../../../shared/interfaces';

@Component({
    imports: [
        ServicesListComponent,
        CustomerDetailsComponent
    ],
    selector: 'admin-appointment-item',
    templateUrl: 'appointment-item.component.html',
    styles: [
        ` h2{
            margin-top:2rem;
        }
        
        `
    ]
})

export class AppointmentItemComponent {

    appointment = input<AppointmentElement>();

}