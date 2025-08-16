import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-notification-component',
  imports: [CommonModule],
  templateUrl: './notification.component.html'
})
export class NotificationComponent {
  message = input.required<string>();
  isError = input.required<boolean>();
}
