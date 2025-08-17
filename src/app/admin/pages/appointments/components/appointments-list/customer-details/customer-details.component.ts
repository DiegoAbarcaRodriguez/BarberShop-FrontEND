import { Component, input } from '@angular/core';
import { AppointmentAppointment } from '../../../../../../shared/interfaces';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'admin-customer-details',
  imports: [SlicePipe],
  templateUrl: './customer-details.component.html',
  styleUrl: `customer-details.component.scss`
})
export class CustomerDetailsComponent {

  customerDetails = input<AppointmentAppointment>();

}
