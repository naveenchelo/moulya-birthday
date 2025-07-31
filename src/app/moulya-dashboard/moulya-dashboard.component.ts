import { Component } from '@angular/core';
import { BirthdayWishesService } from '../services/birthday-wishes.service';

@Component({
  selector: 'app-moulya-dashboard',
  templateUrl: './moulya-dashboard.component.html',
  styleUrl: './moulya-dashboard.component.scss',
})
export class MoulyaDashboardComponent {
  title = 'moulya-birthday';

  // Moulya's birthday details
  birthdayDate = new Date('1998-08-01');
  currentAge = 0;
  daysUntilBirthday = 0;
  ageMessages: string[] = [];

  // Fun age-related messages
  funnyAgeMessages = [
    'Just be yourself, always — because that’s who we all admire and love the most. 💖',
    'I’ll always be there for you — in every chapter, every storm, and every celebration.',
    "Congratulations! You've unlocked the 'back pain for no reason' achievement! 🏆",
    'Be strong and stay strong, like Hanuman — fearless, resilient, and full of grace.',
    'May your life be filled with blessings, joy, and endless success. I’ll keep praying for your bright future and a heart full of peace.',
    "You've reached the age where staying in is the new going out! 🏠",
  ];

  constructor(private birthdayWishesService: BirthdayWishesService) {}

  ngOnInit() {
    this.calculateAge();
    this.calculateDaysUntilBirthday();
    this.generateAgeMessages();
    this.createStars();

    // Check if it's birthday today and send wishes
    this.birthdayWishesService.checkAndSendAutomaticWishes();
  }

  calculateAge() {
    const today = new Date();
    const birthYear = this.birthdayDate.getFullYear();
    const birthMonth = this.birthdayDate.getMonth();
    const birthDay = this.birthdayDate.getDate();

    this.currentAge = today.getFullYear() - birthYear;

    // Adjust if birthday hasn't occurred this year
    if (
      today.getMonth() < birthMonth ||
      (today.getMonth() === birthMonth && today.getDate() < birthDay)
    ) {
      this.currentAge--;
    }
  }

  calculateDaysUntilBirthday() {
    const today = new Date();
    const currentYear = today.getFullYear();
    let nextBirthday = new Date(
      currentYear,
      this.birthdayDate.getMonth(),
      this.birthdayDate.getDate()
    );

    // If birthday has passed this year, calculate for next year
    if (nextBirthday < today) {
      nextBirthday = new Date(
        currentYear + 1,
        this.birthdayDate.getMonth(),
        this.birthdayDate.getDate()
      );
    }

    const timeDiff = nextBirthday.getTime() - today.getTime();
    this.daysUntilBirthday = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  generateAgeMessages() {
    // Select random funny messages based on age
    const numMessages = Math.min(3, this.funnyAgeMessages.length);
    const shuffled = [...this.funnyAgeMessages].sort(() => 0.5 - Math.random());
    this.ageMessages = shuffled.slice(0, numMessages);
  }

  createStars() {
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
      }
    }
  }

  sendBirthdayWishes() {
    this.birthdayWishesService
      .sendBirthdayWishes('moulyamoulya20@gmail.com', 'Moulya', this.currentAge)
      .subscribe({
        next: response => {
          console.log('Birthday wishes sent successfully!', response);
          alert('🎉 Birthday wishes sent successfully! 🎂');
        },
        error: error => {
          console.error('Failed to send birthday wishes:', error);
          alert('Sorry, failed to send birthday wishes. Please try again later.');
        },
      });
  }

  getAgeInDays(): number {
    const today = new Date();
    const timeDiff = today.getTime() - this.birthdayDate.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  }

  getAgeInHours(): number {
    return this.getAgeInDays() * 24;
  }

  getAgeInMinutes(): number {
    return this.getAgeInHours() * 60;
  }
}
