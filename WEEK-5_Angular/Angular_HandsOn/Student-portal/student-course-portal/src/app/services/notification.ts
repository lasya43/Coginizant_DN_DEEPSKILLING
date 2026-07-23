import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messages: string[] = [];

  notify(message: string): void {
    this.messages.push(message);
    console.log('[NotificationService]', message);
  }

  getMessages(): string[] {
    return this.messages;
  }
}
