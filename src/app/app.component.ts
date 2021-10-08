import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import NotificationPayload from './NotificationPayload';
import { NotificationsService } from './notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  constructor(private notificationsService: NotificationsService) { }

  getPermission(): void {
    this.notificationsService.requestPermission();
  }

  notifyMe(): void {
    this.notificationsService.createNotification('Hello world').pipe(
      tap((payload: NotificationPayload) => console.log(`Notification payload: ${JSON.stringify(payload)}`))
    ).subscribe((payload: NotificationPayload) => {
      if (payload.event.type === 'click') {
        console.log('closing notification');
        payload.notification.close();
      }
    });
  }
}
