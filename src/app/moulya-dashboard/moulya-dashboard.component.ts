import { Component, OnInit } from '@angular/core';
import { BirthdayWishesService } from '../services/birthday-wishes.service';

interface JourneyMilestone {
  icon: string;
  title: string;
  description: string;
  year: string;
}

interface Memory {
  image: string;
  title: string;
  description: string;
  quote: string;
}

interface Petal {
  x: number;
  delay: string;
}

@Component({
  selector: 'app-moulya-dashboard',
  templateUrl: './moulya-dashboard.component.html',
  styleUrl: './moulya-dashboard.component.scss',
})
export class MoulyaDashboardComponent implements OnInit {
  title = 'moulya-birthday-elegant';

  // Birthday details
  birthdayDate = new Date('1998-08-01');
  currentAge = 0;
  currentYear = new Date().getFullYear();
  daysUntilBirthday = 0;

  // Timeline control
  currentMilestone = 0;

  // Gift animation states
  showGiftAnimation = false;
  giftOpened = false;

  // Journey milestones data
  journeyMilestones: JourneyMilestone[] = [
    {
      icon: '🌱',
      title: 'Beautiful Beginning',
      description: 'Born in Hassan, Karnataka - where her journey of grace and strength began.',
      year: '1998',
    },
    {
      icon: '🎓',
      title: 'Academic Excellence',
      description: 'Pursued her education with dedication and achieved remarkable milestones.',
      year: '2016-2020',
    },
    {
      icon: '💼',
      title: 'Professional Growth',
      description: 'Joined TCS and began her successful career in technology.',
      year: '2020',
    },
    {
      icon: '🌟',
      title: 'Continuous Journey',
      description: 'Growing stronger, wiser, and more beautiful with each passing day.',
      year: 'Present',
    },
  ];

  // Memories data
  memories: Memory[] = [
    {
      image: 'assets/images/photo1.jpeg',
      title: 'Radiant Smile',
      description: 'Capturing moments of pure joy and happiness that light up every room.',
      quote: 'Her smile is the sunshine that brightens the darkest days',
    },
    {
      image: 'assets/images/photo2.jpeg',
      title: 'Elegant Grace',
      description: 'Every moment showcasing the natural elegance and poise that defines her.',
      quote: 'Grace in every gesture, beauty in every moment',
    },
    {
      image: 'assets/images/photo3.jpeg',
      title: 'Joyful Moments',
      description: 'Celebrating life with infectious laughter and unbounded happiness.',
      quote: 'In her joy, we find our own reasons to celebrate',
    },
    {
      image: 'assets/images/photo4.jpeg',
      title: 'Timeless Beauty',
      description: 'A soul so beautiful that it reflects in every photograph, every memory.',
      quote: 'True beauty radiates from within, just like hers',
    },
  ];

  // Floating petals data
  petals: Petal[] = [];

  constructor(private birthdayWishesService: BirthdayWishesService) {}

  ngOnInit() {
    this.calculateAge();
    this.calculateDaysUntilBirthday();
    this.initializeAnimations();
    this.createFloatingPetals();

    // Check for automatic birthday wishes
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

  initializeAnimations() {
    // Animate timeline milestones progressively
    this.journeyMilestones.forEach((_, index) => {
      setTimeout(
        () => {
          this.currentMilestone = index;
        },
        (index + 1) * 1000
      );
    });

    // Animate memory cards with stagger
    setTimeout(() => {
      const memoryCards = document.querySelectorAll('.memory-card');
      memoryCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate');
        }, index * 200);
      });
    }, 2000);
  }

  createFloatingPetals() {
    // Create floating petals for background animation
    for (let i = 0; i < 20; i++) {
      this.petals.push({
        x: Math.random() * 100,
        delay: Math.random() * 15 + 's',
      });
    }
  }

  onSubmitWish(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const wishData = {
      senderName: formData.get('sender_name') as string,
      senderEmail: formData.get('sender_email') as string,
      message: formData.get('birthday_message') as string,
    };

    // Send wish via the service
    this.sendCustomBirthdayWish(wishData);

    // Show success message
    this.showSuccessNotification();

    // Reset form
    form.reset();
  }

  sendCustomBirthdayWish(wishData: any) {
    const customMessage = `
🎊 Birthday Wish from ${wishData.senderName} 🎊

From: ${wishData.senderEmail}

Personal Message:
"${wishData.message}"

---
This wish was sent through Moulya's special birthday webpage.

With love and warm wishes! 💝
    `;

    // Create form data for web3forms
    const formData = new FormData();
    formData.append('access_key', '9d8e78e3-50d1-49d3-bd60-3a7f167564ae');
    formData.append('subject', `🎉 Birthday Wish from ${wishData.senderName} for Moulya! 🎂`);
    formData.append('from_name', `${wishData.senderName} via Birthday Bot`);
    formData.append('email', 'moulyamoulya20@gmail.com');
    formData.append('message', customMessage);

    // Send via HTTP
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          console.log('Custom birthday wish sent successfully!');
        }
      })
      .catch(error => {
        console.error('Failed to send custom wish:', error);
      });
  }

  showSuccessNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 30px;
        right: 30px;
        background: linear-gradient(135deg, #A569BD, #B08D57);
        color: white;
        padding: 25px;
        border-radius: 20px;
        box-shadow: 0 15px 35px rgba(165, 105, 189, 0.4);
        z-index: 9999;
        max-width: 350px;
        animation: slideInRight 0.6s ease-out;
        backdrop-filter: blur(10px);
      ">
        <div style="font-size: 1.3rem; font-weight: bold; margin-bottom: 12px; font-family: 'Playfair Display', serif;">
          ✨ Wish Sent Successfully! ✨
        </div>
        <div style="font-size: 1rem; line-height: 1.4;">
          Your heartfelt birthday message has been delivered to Moulya! 💝
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    // Remove notification after 6 seconds
    setTimeout(() => {
      notification.remove();
      style.remove();
    }, 6000);
  }

  triggerGiftAnimation() {
    this.showGiftAnimation = true;

    // Auto-open gift after a short delay
    setTimeout(() => {
      this.giftOpened = true;
    }, 1000);
  }

  closeGiftAnimation() {
    this.showGiftAnimation = false;
    this.giftOpened = false;
  }

  // Utility methods for age calculations
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

  // Method to manually trigger milestone animations
  triggerMilestoneAnimation(index: number) {
    this.currentMilestone = Math.max(this.currentMilestone, index);
  }

  // Method to check if it's Moulya's birthday today
  isBirthdayToday(): boolean {
    const today = new Date();
    return (
      today.getMonth() === this.birthdayDate.getMonth() &&
      today.getDate() === this.birthdayDate.getDate()
    );
  }

  // Get special birthday message based on age
  getSpecialAgeMessage(): string {
    const messages = [
      `At ${this.currentAge}, you're not just growing older, you're growing more magnificent! ✨`,
      `${this.currentAge} years of spreading joy and inspiring everyone around you! 🌟`,
      `Celebrating ${this.currentAge} years of your beautiful soul and radiant spirit! 💝`,
      `${this.currentAge} candles for ${this.currentAge} reasons why you're absolutely wonderful! 🕯️`,
    ];

    return messages[this.currentAge % messages.length];
  }

  // Method to create sparkle effect on click
  createSparkleEffect(event: MouseEvent) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
      position: fixed;
      left: ${event.clientX}px;
      top: ${event.clientY}px;
      font-size: 1.5rem;
      pointer-events: none;
      z-index: 9999;
      animation: sparkle-fade 1s ease-out forwards;
    `;

    // Add sparkle animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes sparkle-fade {
        0% {
          transform: scale(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: scale(1.5) rotate(180deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(sparkle);

    // Clean up
    setTimeout(() => {
      sparkle.remove();
      style.remove();
    }, 1000);
  }
}
