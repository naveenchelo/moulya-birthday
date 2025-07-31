import { Component, OnInit } from '@angular/core';
import { BirthdayWishesService } from '../services/birthday-wishes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

interface Particle {
  x: number;
  y: number;
  delay: number;
}

@Component({
  selector: 'app-moulya-dashboard',
  templateUrl: './moulya-dashboard.component.html',
  styleUrls: ['./moulya-dashboard.component.scss'],
  animations: [
    trigger('slideInDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100px)', opacity: 0 }),
        animate('0.6s ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate('0.6s ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
    trigger('fadeInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-50px)', opacity: 0 }),
        animate('0.6s ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]),
    trigger('bounceIn', [
      transition(':enter', [
        animate(
          '0.8s ease-out',
          keyframes([
            style({ opacity: 0, transform: 'scale(0.3)', offset: 0 }),
            style({ opacity: 1, transform: 'scale(1.05)', offset: 0.5 }),
            style({ transform: 'scale(0.9)', offset: 0.7 }),
            style({ opacity: 1, transform: 'scale(1)', offset: 1.0 }),
          ])
        ),
      ]),
    ]),
    trigger('slideInStagger', [
      transition(':enter', [
        style({ transform: 'translateX(100px)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]),
    trigger('pulse', [
      transition(':enter', [
        animate(
          '2s ease-in-out',
          keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.02)', offset: 0.5 }),
            style({ transform: 'scale(1)', offset: 1.0 }),
          ])
        ),
      ]),
    ]),
    trigger('celebration', [
      transition(':enter', [
        animate(
          '1s ease-out',
          keyframes([
            style({ transform: 'scale(0.8) rotate(-5deg)', opacity: 0, offset: 0 }),
            style({ transform: 'scale(1.1) rotate(2deg)', opacity: 1, offset: 0.6 }),
            style({ transform: 'scale(1) rotate(0deg)', opacity: 1, offset: 1.0 }),
          ])
        ),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.6s ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class MoulyaDashboardComponent implements OnInit {
  title = 'moulya-birthday';

  // Moulya's birthday details
  birthdayDate = new Date('1998-08-01');
  currentAge = 0;
  daysUntilBirthday = 0;
  ageMessages: string[] = [];
  particles: Particle[] = [];

  // Fun age-related messages
  funnyAgeMessages = [
    "Just be yourself, always — because that's who we all admire and love the most. 💖",
    "I'll always be there for you — in every chapter, every storm, and every celebration.",
    "Congratulations! You've unlocked the 'back pain for no reason' achievement! 🏆",
    'Be strong and stay strong, like Hanuman — fearless, resilient, and full of grace.',
    "May your life be filled with blessings, joy, and endless success. I'll keep praying for your bright future and a heart full of peace.",
    "You've reached the age where staying in is the new going out! 🏠",
  ];

  constructor(
    private birthdayWishesService: BirthdayWishesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.calculateAge();
    this.calculateDaysUntilBirthday();
    this.generateAgeMessages();
    this.generateParticles();

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

  generateParticles() {
    this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 20,
      });
    }
  }

  sendBirthdayWishes() {
    this.birthdayWishesService
      .sendBirthdayWishes('moulyamoulya20@gmail.com', 'Moulya', this.currentAge)
      .subscribe({
        next: response => {
          console.log('Birthday wishes sent successfully!', response);
          this.snackBar.open('🎉 Birthday wishes sent successfully! 🎂', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
        },
        error: error => {
          console.error('Failed to send birthday wishes:', error);
          this.snackBar.open(
            'Sorry, failed to send birthday wishes. Please try again later.',
            'Close',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            }
          );
        },
      });
  }

  triggerCelebration() {
    // Create celebration effect
    this.createCelebrationBurst();

    // Show celebration message
    this.snackBar.open('🎊 CELEBRATION TIME! 🎊', 'YAY!', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['celebration-snackbar'],
    });

    // Play celebration sound (if you want to add audio)
    // this.playCelebrationSound();
  }

  private createCelebrationBurst() {
    const colors = ['#ff6b9d', '#c44569', '#3742fa', '#2ed573', '#ffa502'];
    const celebrationContainer = document.createElement('div');
    celebrationContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;

    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        top: 50%;
        left: 50%;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        animation: celebrationBurst 2s ease-out forwards;
        transform: translate(-50%, -50%);
      `;

      confetti.style.setProperty('--random-x', (Math.random() - 0.5) * 1000 + 'px');
      confetti.style.setProperty('--random-y', (Math.random() - 0.5) * 1000 + 'px');
      confetti.style.setProperty('--random-rotation', Math.random() * 720 + 'deg');

      celebrationContainer.appendChild(confetti);
    }

    document.body.appendChild(celebrationContainer);

    // Clean up after animation
    setTimeout(() => {
      document.body.removeChild(celebrationContainer);
    }, 2000);
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

  getAgeProgress(): number {
    // Calculate progress through current year of life (0-100)
    const today = new Date();
    const lastBirthday = new Date(
      today.getFullYear(),
      this.birthdayDate.getMonth(),
      this.birthdayDate.getDate()
    );

    if (lastBirthday > today) {
      lastBirthday.setFullYear(today.getFullYear() - 1);
    }

    const nextBirthday = new Date(
      lastBirthday.getFullYear() + 1,
      this.birthdayDate.getMonth(),
      this.birthdayDate.getDate()
    );
    const totalYearMs = nextBirthday.getTime() - lastBirthday.getTime();
    const elapsedMs = today.getTime() - lastBirthday.getTime();

    return Math.min(100, Math.max(0, (elapsedMs / totalYearMs) * 100));
  }

  getBirthdayProgress(): number {
    // Calculate progress towards next birthday (0-100)
    const totalDaysInYear = 365;
    const daysCompleted = totalDaysInYear - this.daysUntilBirthday;
    return Math.min(100, Math.max(0, (daysCompleted / totalDaysInYear) * 100));
  }
}
