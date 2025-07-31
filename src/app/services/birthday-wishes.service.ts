import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BirthdayWishesService {
  private web3FormsEndpoint = 'https://api.web3forms.com/submit';
  private accessKey = '9d8e78e3-50d1-49d3-bd60-3a7f167564ae';

  constructor(private http: HttpClient) {}

  sendBirthdayWishes(recipientEmail: string, recipientName: string, age: number): Observable<any> {
    const formData = new FormData();

    formData.append('access_key', this.accessKey);
    formData.append('subject', `🎉 Happy ${age}th Birthday ${recipientName}! 🎂`);
    formData.append('from_name', 'Birthday Surprise Bot');
    formData.append('to', recipientEmail);
    formData.append('message', this.generateBirthdayMessage(recipientName, age));

    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json');

    return this.http.post(this.web3FormsEndpoint, formData, { headers });
  }

  private generateBirthdayMessage(name: string, age: number): string {
    const messages = [
      `🎊 Happy ${age}th Birthday, dear ${name}! 🎊`,
      '',
      '🌟 Another year of amazing adventures awaits you! 🌟',
      '',
      `At ${age}, you're not getting older, you're getting more awesome! ✨`,
      '',
      '🎁 May this year bring you:',
      '• Endless laughter and joy 😄',
      '• Dreams that come true 🌈',
      '• Amazing memories with loved ones 💕',
      '• Success in all your endeavors 🏆',
      '• Health, happiness, and prosperity 🌸',
      '',
      '🎂 Hope your special day is filled with cake, surprises, and everything wonderful! 🎂',
      '',
      'Sending you tons of birthday love! 💖',
      '',
      '🎈 Have the most fantastic birthday celebration! 🎈',
      '',
      'With love and best wishes,',
      'Your Favorite Birthday Bot 🤖💝',
    ];

    return messages.join('\n');
  }

  // Check if today is birthday and send automatic wishes
  checkAndSendAutomaticWishes(): void {
    const today = new Date();
    const birthdayDate = new Date('1998-08-01');

    const isBirthday =
      today.getMonth() === birthdayDate.getMonth() && today.getDate() === birthdayDate.getDate();

    if (isBirthday) {
      const currentAge = today.getFullYear() - birthdayDate.getFullYear();

      this.sendBirthdayWishes('moulyamoulya20@gmail.com', 'Moulya', currentAge).subscribe({
        next: response => {
          console.log('🎉 Automatic birthday wishes sent successfully!', response);
          this.showBirthdayNotification();
        },
        error: error => {
          console.error('Failed to send automatic birthday wishes:', error);
        },
      });
    }
  }

  private showBirthdayNotification(): void {
    // Create a beautiful notification
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FF6F61, #6A0572);
        color: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(106, 5, 114, 0.3);
        z-index: 9999;
        max-width: 300px;
        animation: slideInRight 0.5s ease-out;
      ">
        <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">
          🎉 Birthday Wishes Sent! 🎂
        </div>
        <div style="font-size: 0.9rem;">
          Automatic birthday wishes have been delivered to Moulya! 💝
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }
}
