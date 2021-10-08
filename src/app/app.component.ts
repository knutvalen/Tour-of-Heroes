import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NotificationsService } from './notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.getPermission();
  }

  getPermission(): void {
    this.notificationsService.requestPermission();
  }

  notifyMe(): void {
    this.notificationsService.createNotification('Hello world').pipe(
      tap(payload => console.log(`Notification payload: ${JSON.stringify(payload)}`))
    ).subscribe(payload => {
      if (payload.event.type === 'click') {
        console.log('closing notification');
        payload.notification.close();
      }
    });
  }
}
