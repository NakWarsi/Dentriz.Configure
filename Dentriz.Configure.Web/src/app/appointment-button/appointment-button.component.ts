import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-button',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-button.component.html',
  styleUrls: ['./appointment-button.component.css']
})
export class AppointmentButtonComponent {
  isModalOpen = false;
  appointmentForm = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    issue: '',
    preferredDoctor: ''
  };

  timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  doctors = [
    'Dr. Ahmed Ameen',
    'Dr. Sarah Johnson', 
    'Dr. Michael Chen',
    'Any Available Doctor'
  ];

  openModal() {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  onSubmit() {
    // Here you would typically send the appointment request to your backend
    console.log('Appointment Request:', this.appointmentForm);
    
    // Show success message
    alert('Thank you! Your appointment request has been submitted. We will contact you shortly to confirm.');
    
    // Reset form and close modal
    this.resetForm();
    this.closeModal();
  }

  resetForm() {
    this.appointmentForm = {
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      issue: '',
      preferredDoctor: ''
    };
  }

  // Prevent modal from closing when clicking inside the modal content
  onModalClick(event: Event) {
    event.stopPropagation();
  }

  callToBook() {
    // Phone number for the dental office - replace with actual number
    const phoneNumber = '+91-932-144-9313';
    
    // Create tel: link for phone call
    const telLink = `tel:${phoneNumber}`;
    
    // Open phone dialer
    window.location.href = telLink;
  }
}
