import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface TeamMember {
  id: number;
  position: string;
  specialization: string;
  experience: string;
  education: string;
  image: string;
  bio: string;
  seoKeywords: string;
}

@Component({
  selector: 'app-team-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team-gallery.component.html',
  styleUrls: ['./team-gallery.component.css']
})
export class TeamGalleryComponent {
  selectedMember: TeamMember | null = null;
  showModal = false;

  // SEO-OPTIMIZED TEAM GALLERY - FOR SEARCH ENGINE OPTIMIZATION ONLY
  teamMembers: TeamMember[] = [
    {
      id: 1,
      position: "Lead Dentist",
      specialization: "General & Cosmetic Dentistry",
      experience: "15+ years",
      education: "DDS, University of California",
      image: "assets/images/gallery/team-gallery/doctor1.jpg",
      bio: "Expert lead dentist in Wakad with over 15 years of experience in general and cosmetic dentistry. Specializes in smile makeovers at the best dental clinic in Wakad and has helped hundreds of patients achieve their dream smiles.",
      seoKeywords: "lead dentist in Wakad, cosmetic dentistry in Wakad, best dental clinic in Wakad"
    },
    {
      id: 2,
      position: "Orthodontist",
      specialization: "Orthodontics & Invisalign",
      experience: "12+ years",
      education: "DDS, Orthodontics Certificate",
      image: "assets/images/gallery/team-gallery/doctor2.jpg",
      bio: "Specialist orthodontist in Wakad with expertise in traditional braces and Invisalign treatment in Pune. Expert orthodontist in Wakad who has successfully treated patients of all ages with various orthodontic needs.",
      seoKeywords: "orthodontist in Wakad, Invisalign treatment in Pune, expert orthodontist in Wakad"
    },
    {
      id: 3,
      position: "Oral Surgeon",
      specialization: "Oral Surgery & Implants",
      experience: "10+ years",
      education: "DDS, Oral Surgery Residency",
      image: "assets/images/gallery/team-gallery/doctor3.jpg",
      bio: "Oral surgeon in Pune specializing in oral surgery and dental implants in Pune. Extensive experience in complex surgical procedures and implant placement at DentRiz Dental Clinic.",
      seoKeywords: "oral surgeon in Pune, dental implants in Pune, DentRiz Dental Clinic"
    },
    {
      id: 4,
      position: "Dental Hygienist",
      specialization: "Preventive Care",
      experience: "8+ years",
      education: "Dental Hygiene Degree",
      image: "assets/images/gallery/team-gallery/hygienist1.jpg",
      bio: "Senior dental hygienist in Wakad who focuses on preventive care in Wakad and patient education. Passionate about helping patients maintain optimal oral health at the best dental clinic in Hinjewadi.",
      seoKeywords: "dental hygienist in Wakad, preventive care in Wakad, best dental clinic in Hinjewadi"
    },
    {
      id: 5,
      position: "Dental Hygienist",
      specialization: "Periodontal Therapy",
      experience: "6+ years",
      education: "Dental Hygiene Degree",
      image: "assets/images/gallery/team-gallery/hygienist2.jpg",
      bio: "Dental hygienist specializing in periodontal therapy in Wakad and works closely with patients who have gum disease. Known for gentle approach and thorough care at the best dentist in Wakad.",
      seoKeywords: "dental hygienist in Wakad, periodontal therapy in Wakad, best dentist in Wakad"
    },
    {
      id: 6,
      position: "Dental Assistant",
      specialization: "Surgical Procedures",
      experience: "5+ years",
      education: "Dental Assistant Certification",
      image: "assets/images/gallery/team-gallery/assistant1.jpg",
      bio: "Experienced dental assistant in Wakad who specializes in surgical procedures. Works closely with oral surgeon in Pune to ensure smooth and efficient treatments at DentRiz Dental Clinic.",
      seoKeywords: "dental assistant in Wakad, oral surgeon in Pune, DentRiz Dental Clinic"
    },
    {
      id: 7,
      position: "Dental Assistant",
      specialization: "Cosmetic Procedures",
      experience: "4+ years",
      education: "Dental Assistant Certification",
      image: "assets/images/gallery/team-gallery/assistant2.jpg",
      bio: "Dental assistant in Wakad who assists with cosmetic procedures and has a keen eye for detail. Helps ensure cosmetic dentistry in Wakad achieves the best possible results at the top dentist in Pune.",
      seoKeywords: "dental assistant in Wakad, cosmetic dentistry in Wakad, top dentist in Pune"
    }
  ];

  openModal(member: TeamMember) {
    this.selectedMember = member;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedMember = null;
  }
}
