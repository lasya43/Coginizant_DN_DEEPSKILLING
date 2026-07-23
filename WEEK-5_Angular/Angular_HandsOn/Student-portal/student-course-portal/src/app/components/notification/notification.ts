import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  imports: [],
  providers: [NotificationService],
  // Component-level provider: creates a new, scoped instance of NotificationService
  // for this component and its children, separate from the root-level singleton.
  template: `<div class="notification-box" style="padding: 1rem; background: #e2e3e5; margin: 1rem 0;">{{ message }}</div>`,
})
export class AppNotification {
  message = 'Welcome to the portal!';

  constructor(private notificationService: NotificationService) {
    this.notificationService.notify(this.message);
  }
}
