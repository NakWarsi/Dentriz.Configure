import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface EventItem {
  id: number;
  title: string;
  type: string;
  date: string;
  description: string;
  image: string;
  location: string;
  attendees: number;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  selectedEvent: EventItem | null = null;
  showModal = false;

  events: EventItem[] = [
    {
      id: 1,
      title: "Community Dental Health Fair",
      type: "community",
      date: "March 15, 2024",
      description: "Free dental screenings and oral health education for the community",
      image: "assets/images/gallery/events/event1.jpg",
      location: "Community Center",
      attendees: 150
    },
    {
      id: 2,
      title: "Dental Technology Seminar",
      type: "seminar",
      date: "April 20, 2024",
      description: "Educational seminar on latest dental technologies and treatments",
      image: "assets/images/gallery/events/event2.jpg",
      location: "Conference Hall",
      attendees: 75
    },
    {
      id: 3,
      title: "Children's Dental Health Day",
      type: "awareness",
      date: "May 10, 2024",
      description: "Fun and educational event focused on children's dental health",
      image: "assets/images/gallery/events/event3.jpg",
      location: "Local Park",
      attendees: 200
    },
    {
      id: 4,
      title: "Senior Dental Care Workshop",
      type: "community",
      date: "June 5, 2024",
      description: "Specialized dental care information for senior citizens",
      image: "assets/images/gallery/events/event4.jpg",
      location: "Senior Center",
      attendees: 60
    },
    {
      id: 5,
      title: "Dental Implant Information Session",
      type: "seminar",
      date: "July 12, 2024",
      description: "Comprehensive information session about dental implant procedures",
      image: "assets/images/gallery/events/event5.jpg",
      location: "Clinic Conference Room",
      attendees: 45
    },
    {
      id: 6,
      title: "School Dental Health Program",
      type: "awareness",
      date: "September 8, 2024",
      description: "Educational program in local schools about dental hygiene",
      image: "assets/images/gallery/events/event6.jpg",
      location: "Local Schools",
      attendees: 300
    }
  ];

  openModal(event: EventItem) {
    this.selectedEvent = event;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedEvent = null;
  }
}
