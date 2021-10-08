import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Permission from './Permission';
import NotificationOptions from './NotificationOptions';
import NotificationPayload from './NotificationPayload';

declare const Notification: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  permission: Permission;
  private isBrowserSupported = 'Notification' in window;

  constructor() {
    this.permission = this.isBrowserSupported
      ? Notification.permission as Permission
      : Permission.Default;
  }

  requestPermission() {
    if (this.isBrowserSupported) {
      Notification.requestPermission((permission: Permission) => {
        console.log('Permission status: ', permission);
        this.permission = permission;
      });
    }
  }

  createNotification(
    title: string,
    options?: NotificationOptions
  ): Observable<NotificationPayload> {
    return new Observable(observer => {
      if (!this.isBrowserSupported) {
        observer.error('This browser does not support notifications');
        observer.complete();
      } else if (this.permission !== Permission.Granted) {
        observer.error(`Notifications permission: ${this.permission}`);
        observer.complete();
      }

      const notification = new Notification(title, options);

      notification.onshow = (event: any) => observer
        .next({ notification: notification, event: event });

      notification.onclick = (event: any) => observer
        .next({ notification: notification, event: event });

      notification.onerror = (event: any) => observer
        .error({ notification: notification, event: event });

      notification.onclose = () => observer.complete();
    });
  }
}
