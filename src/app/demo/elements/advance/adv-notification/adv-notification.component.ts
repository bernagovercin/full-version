// Angular Import
import { Component, inject } from '@angular/core';

// third party
import { NotifierService, NotifierModule } from 'angular-notifier';

// Project imports
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-adv-notification',
  imports: [CardComponent, NotifierModule],
  templateUrl: './adv-notification.component.html',
  styleUrls: ['./adv-notification.component.scss']
})
export class AdvNotificationComponent {
  // private props
  private notifier: NotifierService;

  // constructor
  constructor() {
    const notifier = inject(NotifierService);
    this.notifier = notifier;
  }

  // public method

  showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  hideOldestNotification(): void {
    this.notifier.hideOldest();
  }

  hideNewestNotification(): void {
    this.notifier.hideNewest();
  }

  hideAllNotifications(): void {
    this.notifier.hideAll();
  }

  showSpecificNotification(type: string, message: string, id: string): void {
    this.notifier.show({
      id,
      message,
      type
    });
  }

  hideSpecificNotification(id: string): void {
    this.notifier.hide(id);
  }
}
