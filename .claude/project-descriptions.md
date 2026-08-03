# Society of Electrical Engineers Nepal (SEEN)
## Project Overview

## Objective

Develop a modern, responsive, and scalable website for the **Society of Electrical Engineers Nepal (SEEN)**.

The website should be inspired by the overall layout, navigation, functionality, and information architecture of the Society of Nepalese Architects (SONA) website, while replacing all architecture-related content with electrical engineering content and modernizing the UI/UX.

This is **not** intended to be a pixel-perfect clone. Instead, it should preserve the overall structure while providing a cleaner, faster, and more maintainable implementation.

---

# Technology Stack

Frontend
- Next.js 15 (App Router)
- TypeScript
- React
- SCSS Modules
- Shadcn UI
- Lucide React Icons

Backend
- Next.js Route Handlers

CMS
- Sanity CMS

Deployment
- Vercel

Image Storage
- Sanity Assets

Authentication
- Sanity Studio Authentication
- Public website does not require login except member-specific areas in future

SEO
- Dynamic metadata
- Open Graph
- Sitemap
- Robots.txt

---

# Design Goals

The website should feel:

- Professional
- Clean
- Modern
- Responsive
- Fast
- Accessible
- Minimalistic

Avoid outdated Bootstrap-style UI.

Use modern spacing, typography, cards, and subtle animations.

---

# Color Palette

Primary
- Electric Blue

Secondary
- White

Accent
- Dark Navy

Neutral
- Light Gray

---

# Main Website Sections

## Home

Hero Section

- Organization title
- Tagline
- Background image/video
- Join Now button

Latest News

Latest announcements

Upcoming Events

Featured Projects

Recent Publications

Recent Notices

Partner Organizations

Sponsors

Gallery Preview

Newsletter Signup

---

## About

- Introduction
- History
- Vision
- Mission
- Objectives
- Organizational Structure
- Executive Committee
- Past Presidents
- Chapters
- International Relations
- Contact

---

## Membership

Membership Types

Examples

- Student
- Associate
- Professional
- Fellow
- Institutional

Membership Benefits

Membership Requirements

Membership Fees

Apply Online

Renew Membership

Membership Directory (Future)

---

## Committees

Examples

Technical Committees

- Power Systems
- Renewable Energy
- Electronics
- Automation
- AI & Smart Grid
- Energy Efficiency
- Women in Engineering
- Young Engineers
- Research & Innovation
- Professional Practice
- Education

Each committee should have

- Description
- Members
- Activities
- Publications

---

## Activities

- Technical Seminars
- Workshops
- Conferences
- Webinars
- Industrial Visits
- Competitions
- Outreach Programs
- CSR Activities

---

## Publications

- Newsletter
- Technical Journal
- Research Papers
- Annual Report
- Conference Proceedings

---

## Projects

Featured Engineering Projects

Each project contains

- Title
- Description
- Images
- Location
- Contributors
- Technologies
- Gallery

---

## Awards

Examples

- Lifetime Achievement
- Outstanding Engineer
- Young Engineer Award
- Innovation Award
- Best Research Paper

---

## Documents

- Code of Ethics
- Membership Forms
- Standards
- Guidelines
- Technical Documents
- Policies
- Annual Reports

---

## Gallery

Categories

- Events
- Conferences
- Site Visits
- Workshops
- Competitions

Support

- Images
- Videos

---

## Notices & Events

Notice Board

Upcoming Events

Past Events

Registration Links

Downloads

---

## Internship & Careers

Internships

Job Opportunities

Scholarships

Training Programs

---

## Contact

Contact Information

Google Map

Email Form

Social Media Links

Office Hours

---

# Homepage Layout

1. Header

- Logo
- Search
- Join
- Login

2. Navigation

Dropdown menus

3. Hero Banner

Large background image

CTA button

4. Latest News

Card Grid

5. Featured Projects

Horizontal Cards

6. Upcoming Events

Timeline or Cards

7. Publications

8. Partner Organizations

9. Gallery

10. Newsletter

11. Footer

---

# CMS Collections

## Pages

- title
- slug
- content
- seo

---

## Posts

- title
- slug
- category
- featured image
- content
- author
- publish date
- tags

---

## Events

- title
- date
- location
- registration url
- description
- banner

---

## Projects

- title
- location
- images
- description
- engineers
- category

---

## Publications

- title
- pdf
- cover image
- category
- publish date

---

## Committees

- name
- description
- members
- image

---

## Members (Future)

- name
- membership id
- designation
- profile image
- bio

---

## Partners

- name
- logo
- website

---

## Gallery

- title
- images
- category

---

## Documents

- title
- category
- pdf

---

# UI Components

Reusable components

- Navbar
- Footer
- Hero
- Section Header
- Card
- News Card
- Event Card
- Project Card
- Committee Card
- Gallery Grid
- Search
- Pagination
- Breadcrumb
- Modal
- Image Carousel
- Rich Text Renderer

---

# Functional Requirements

Search

Filtering

Pagination

SEO Friendly URLs

Image Optimization

Responsive Navigation

Dark Mode (optional)

Social Sharing

Newsletter Signup

Contact Form

Dynamic Metadata

---

# Performance Goals

Google Lighthouse

Performance > 95

Accessibility > 95

SEO > 95

Best Practices > 95

---

# Folder Structure

app/

components/

features/

lib/

hooks/

types/

sanity/

styles/

public/

---

# Coding Standards

- TypeScript everywhere
- Server Components by default
- Client Components only when necessary
- Reusable components
- No duplicated code
- Clean architecture
- Feature-based organization
- Strict typing
- SCSS Modules only (avoid Tailwind CSS)
- Follow Next.js App Router best practices

---

# Future Enhancements

- Online Membership Portal
- Online Membership Payments
- Member Dashboard
- Digital Membership Card
- CPD Point Tracking
- Engineer Directory
- Event Ticketing
- Discussion Forum
- Job Portal
- Research Repository
- Awards Nomination Portal
- Mobile App
- API for external integrations

---

# Overall Goal

The final product should be a modern, scalable, enterprise-quality website representing the Society of Electrical Engineers Nepal. It should retain the information architecture of the reference website while significantly improving the visual design, maintainability, responsiveness, performance, accessibility, and content management experience using Next.js and Sanity CMS.