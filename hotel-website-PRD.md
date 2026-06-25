# Product Requirements Document (PRD)
## Hotel Website — Sylhet, Bangladesh
**Document Version:** 1.0  
**Prepared By:** Senior Project Manager, Full Stack Web Development Agency  
**Date:** June 2026  
**Status:** Draft — Pending Client Approval  

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Business Objectives](#2-business-objectives)
3. [Target Audience & User Personas](#3-target-audience--user-personas)
4. [Scope of Work](#4-scope-of-work)
5. [Functional Requirements](#5-functional-requirements)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Technical Architecture](#7-technical-architecture)
8. [Content Management System (CMS)](#8-content-management-system-cms)
9. [Third-Party Integrations](#9-third-party-integrations)
10. [SEO & Digital Marketing Requirements](#10-seo--digital-marketing-requirements)
11. [UI/UX Design Guidelines](#11-uiux-design-guidelines)
12. [Project Timeline & Milestones](#12-project-timeline--milestones)
13. [Budget Breakdown](#13-budget-breakdown)
14. [Risks & Mitigation](#14-risks--mitigation)
15. [Assumptions & Dependencies](#15-assumptions--dependencies)
16. [Acceptance Criteria](#16-acceptance-criteria)
17. [Glossary](#17-glossary)

---

## 1. Project Overview

### 1.1 Project Summary

This document outlines the complete product requirements for the design, development, and deployment of a professional hotel website for a **3-Star Hotel** located in **Sylhet, Bangladesh**. The website will serve as the primary digital presence of the hotel, targeting both domestic and international tourists, business travellers, and corporate clients.

### 1.2 Hotel Profile

| Attribute | Details |
|---|---|
| Hotel Category | 3-Star |
| Location | Sylhet, Bangladesh |
| Primary Language | English |
| Target Markets | Domestic tourists, International tourists, Business travellers, Corporate clients |
| Key Amenities | Restaurant/Dining, Conference/Event Hall, Swimming Pool/Gym/Spa, Tour Packages/Travel Services |
| CMS Required | Yes (self-managed) |
| Booking Mode | Inquiry/Request form (offline payment) |

### 1.3 Project Goals

- Establish a strong, credible online presence for the hotel
- Drive direct booking inquiries to reduce OTA commission dependency
- Showcase hotel facilities, rooms, and services to potential guests
- Attract international tourists visiting Sylhet's tea gardens, wetlands, and natural attractions
- Support corporate and MICE (Meetings, Incentives, Conferences, Events) business

---

## 2. Business Objectives

### 2.1 Primary Objectives

1. **Increase Direct Inquiries:** Generate at least 30% of total booking inquiries through the website within 6 months of launch.
2. **Brand Establishment:** Create a premium digital identity that reflects 3-star hospitality standards.
3. **Market Reach Expansion:** Attract international guests (especially from UK, USA, Middle East) who visit Sylhet's tourism destinations.
4. **Corporate Acquisition:** Provide dedicated corporate inquiry pathways for bulk room bookings and conference hall rentals.
5. **SEO Authority:** Rank on the first page of Google for key terms like "hotel in Sylhet", "3 star hotel Sylhet", "best hotel near Hazrat Shah Jalal".

### 2.2 Success Metrics (KPIs)

| KPI | Target (6 months post-launch) |
|---|---|
| Monthly website visitors | 3,000+ unique visitors |
| Booking inquiry form submissions | 150+ per month |
| Average session duration | 2+ minutes |
| Bounce rate | Below 55% |
| Google search ranking | Top 5 for primary keywords |
| WhatsApp inquiry conversion | 20% of website visitors |

---

## 3. Target Audience & User Personas

### 3.1 Persona 1 — The Domestic Tourist

| Attribute | Details |
|---|---|
| Name | Rakib & Family |
| Age | 28–45 |
| Location | Dhaka, Chittagong |
| Device | Mobile-first |
| Goal | Find a comfortable hotel near Sylhet's attractions (Jaflong, Ratargul, Tea Gardens) |
| Pain Point | Uncertainty about room quality, unclear pricing, complicated booking process |
| Behaviour | Compares hotels on Facebook, looks for reviews, prefers WhatsApp contact |

### 3.2 Persona 2 — The International Traveller

| Attribute | Details |
|---|---|
| Name | Sarah (UK-Bangladeshi diaspora) |
| Age | 30–55 |
| Location | UK, USA, UAE |
| Device | Desktop & Mobile |
| Goal | Plan a heritage visit to Sylhet, needs English content, reliable hotel |
| Pain Point | No trust signals, no clear information about airport transfers, unclear check-in process |
| Behaviour | Uses Google, TripAdvisor, reads reviews, expects professional website |

### 3.3 Persona 3 — The Business Traveller

| Attribute | Details |
|---|---|
| Name | Farhana (Corporate Executive) |
| Age | 30–50 |
| Location | Dhaka, Chittagong |
| Device | Desktop |
| Goal | Book a room for a 2–3 night business trip, needs stable WiFi, quiet environment |
| Pain Point | No corporate rate information, no easy contact for quick bookings |
| Behaviour | Googles hotel directly, checks website, calls or emails for confirmation |

### 3.4 Persona 4 — The Corporate/Event Planner

| Attribute | Details |
|---|---|
| Name | Aminul (Event Coordinator) |
| Age | 28–45 |
| Location | Dhaka, Sylhet |
| Device | Desktop |
| Goal | Book conference hall for corporate training or social events |
| Pain Point | No clear capacity info, no pricing, no inquiry form for events |
| Behaviour | Looks for detailed hall specs, sends formal inquiry via form or email |

---

## 4. Scope of Work

### 4.1 In Scope

- Full custom website design and development
- Responsive design (mobile, tablet, desktop)
- English language website
- CMS integration for self-management
- Room inquiry/booking request system (no online payment)
- Restaurant, amenities, and services showcase
- Conference & event hall section with inquiry form
- Tour packages / travel services section
- Google Maps integration
- Google Reviews integration
- Facebook, Instagram, WhatsApp Business, and YouTube integration
- SEO foundation (on-page, technical SEO, sitemap, schema markup)
- Image gallery and virtual tour (via YouTube embed)
- Blog/News section (for SEO and updates)
- Admin dashboard for managing inquiries
- SSL certificate and basic security setup
- Performance optimization (Core Web Vitals compliance)
- 3 months post-launch support and maintenance

### 4.2 Out of Scope

- Online payment gateway integration (future phase)
- Channel manager / OTA integration (Booking.com, Agoda — future phase)
- Mobile app development
- In-house Property Management System (PMS)
- Email marketing platform setup (recommended as Phase 2)

---

## 5. Functional Requirements

### 5.1 Public-Facing Website

#### 5.1.1 Homepage

- **Hero Section:** Full-width video or image slider showcasing hotel exterior, lobby, pool, and key Sylhet attractions
- **Unique Selling Proposition (USP) Banner:** Quick highlights (3-star certified, central location, conference facilities, tour packages)
- **Quick Booking/Inquiry Widget:** Check-in date, Check-out date, Number of guests, Room type — submits to inquiry form
- **Featured Rooms Section:** 3–4 highlighted room types with thumbnail, name, key amenity icons, and "View Details" CTA
- **Facilities Overview:** Icon-based grid showcasing restaurant, pool, gym, spa, conference hall, travel desk
- **Tour Packages Teaser:** 2–3 featured Sylhet tour packages with image, short description, and "Enquire Now" CTA
- **Google Reviews Widget:** Display average star rating and latest 3–5 reviews pulled from Google
- **Photo Gallery Strip:** 6–8 curated hotel photos linking to full gallery
- **YouTube Virtual Tour Embed:** Embedded video of hotel virtual tour
- **WhatsApp Quick Contact Button:** Floating sticky button (mobile & desktop) linked to WhatsApp Business
- **Footer:** Contact details, social media links, quick navigation, Google Map embed, copyright

#### 5.1.2 Rooms & Suites Page

- Room listing page with filter (Room Type, Capacity, Bed Type)
- Individual room detail page containing:
  - High-resolution image gallery (minimum 5 photos per room)
  - Room description (size in sq. ft., floor, view)
  - Amenities list (AC, WiFi, TV, minibar, safe, etc.)
  - Occupancy details (max adults, max children)
  - Starting room rate (BDT per night)
  - "Book Now / Enquire" button linking to inquiry form

#### 5.1.3 Booking Inquiry System

- Inquiry form fields:
  - Full Name *
  - Email Address *
  - Phone Number (with country code) *
  - Check-in Date *
  - Check-out Date *
  - Number of Adults *
  - Number of Children
  - Room Type Preference (dropdown)
  - Special Requests (textarea)
  - How did you hear about us? (dropdown)
- On submission:
  - Auto-acknowledgement email sent to guest
  - Notification email sent to hotel admin
  - Inquiry logged in CMS admin dashboard
- Form validation: All mandatory fields, date validation (check-out must be after check-in)

#### 5.1.4 Dining / Restaurant Page

- Restaurant name, description, cuisine type
- Opening hours
- Menu PDF download or menu items display
- Photo gallery (ambiance, dishes)
- Reservation inquiry form (Name, Date, Time, Number of Guests, Special Requests)
- Table booking inquiry submission (same notification flow as room inquiry)

#### 5.1.5 Facilities & Amenities Page

Separate sections for:
- **Swimming Pool:** Description, hours, rules, photos
- **Gym:** Equipment list, hours, trainer availability, photos
- **Spa:** Services list, pricing overview, booking CTA, photos
- **Conference / Event Hall:**
  - Hall name(s) and capacity (in theatre, classroom, U-shape, banquet layout)
  - Technical specifications (projector, screen, PA system, WiFi, whiteboard)
  - Catering options
  - Photo gallery
  - Corporate inquiry form (Company Name, Contact Person, Event Date, Expected Attendees, Event Type, Requirements)
- **Travel Desk / Tour Packages:**
  - Sylhet tour packages (Jaflong, Ratargul, Tamabil, Tea Garden, Srimangal day trip, etc.)
  - Package itinerary, inclusions/exclusions, price range
  - Tour inquiry form

#### 5.1.6 About Page

- Hotel story and history
- Mission and vision statement
- Hotel ownership / management introduction
- Awards and certifications
- Hotel highlights (star rating, year established, total rooms, facilities count)
- Team section (optional)

#### 5.1.7 Gallery Page

- Full photo gallery categorised by:
  - Rooms & Suites
  - Dining & Restaurant
  - Swimming Pool, Gym & Spa
  - Conference Hall
  - Exterior & Lobby
  - Sylhet Attractions
- Lightbox image viewer
- Optional: YouTube virtual tour video embed

#### 5.1.8 Blog / News Section

- Blog listing page with categories (Travel Tips, Sylhet Attractions, Hotel News, Special Offers)
- Individual blog post page with social sharing buttons
- CMS-managed: staff can add, edit, delete posts

#### 5.1.9 Special Offers / Promotions Page

- Active offers with validity dates, discount %, inclusions
- CTA linking to inquiry form with offer pre-selected
- CMS-managed: easily add/remove offers

#### 5.1.10 Contact Page

- Full contact details: address, phone, email, WhatsApp
- Interactive Google Maps embed (hotel pin)
- Directions from key landmarks (Airport, Railway Station, City Centre)
- General contact inquiry form
- Social media links

### 5.2 Admin Panel (CMS Dashboard)

- Secure login (username/password + 2FA recommended)
- **Inquiry Management Module:**
  - View all booking, dining, conference, and tour inquiries
  - Status management (New, In Progress, Confirmed, Cancelled)
  - Export inquiries to CSV/Excel
  - Mark inquiries as read/unread
  - Reply to inquiry via email from dashboard
- **Room Management Module:**
  - Add/edit/delete room types
  - Update room photos, descriptions, amenities, pricing
- **Content Management:**
  - Edit all page content (hero text, about content, facility descriptions)
  - Add/edit/delete blog posts
  - Manage gallery photos (upload, delete, reorder)
  - Manage tour packages
  - Manage special offers / promotions
- **Settings:**
  - Update hotel contact details
  - Update social media links
  - Update WhatsApp number
  - Update Google Maps embed code

---

## 6. Non-Functional Requirements

### 6.1 Performance

| Metric | Requirement |
|---|---|
| Page Load Time (Homepage) | Under 3 seconds on 4G |
| Google PageSpeed Score | 80+ (Mobile), 90+ (Desktop) |
| Core Web Vitals | All metrics in "Good" range |
| Image Optimization | WebP format, lazy loading enabled |
| CDN | Required for media assets |

### 6.2 Responsiveness

- Fully responsive across all screen sizes: 320px (small mobile) to 2560px (4K desktop)
- Mobile-first design approach
- Tested on: Chrome, Firefox, Safari, Edge (latest 2 versions)
- iOS (Safari) and Android (Chrome) mobile browser compatibility

### 6.3 Accessibility

- WCAG 2.1 Level AA compliance
- Alt text on all images
- Keyboard navigable
- Sufficient colour contrast ratios
- ARIA labels on interactive elements

### 6.4 Security

- SSL/HTTPS enforced on all pages
- CAPTCHA or honeypot on all forms (to prevent spam)
- Regular automated backups (daily, stored for 30 days)
- Admin panel protected with strong authentication
- Input sanitisation to prevent SQL injection and XSS

### 6.5 SEO

- Clean URL structure (e.g., `/rooms/deluxe-room`)
- Meta title and meta description editable per page from CMS
- Open Graph tags for social media sharing
- Structured data / Schema markup (Hotel schema, Room schema, LocalBusiness schema)
- XML sitemap auto-generated
- Robots.txt properly configured
- Canonical URLs
- Google Search Console and Google Analytics 4 integration

### 6.6 Uptime & Reliability

- 99.9% uptime SLA (hosting requirement)
- Hosting on reliable cloud platform (recommended: AWS, DigitalOcean, or equivalent)
- Automated server monitoring with alert notifications

---

## 7. Technical Architecture

### 7.1 Recommended Tech Stack

| Layer | Recommended Technology | Rationale |
|---|---|---|
| Frontend | Next.js (React) | SEO-friendly SSR, fast performance, modern |
| Backend/CMS | Strapi (Headless CMS) or WordPress | Easy for non-technical staff to manage content |
| Database | PostgreSQL (with Strapi) or MySQL (with WP) | Reliable, scalable |
| Image Storage | AWS S3 + CloudFront CDN | Fast media delivery globally |
| Hosting | AWS EC2 / DigitalOcean Managed App | Scalable, reliable |
| SSL | Let's Encrypt (free) or Cloudflare | Security |
| Email Service | SendGrid or Amazon SES | Transactional emails for inquiry confirmations |
| Analytics | Google Analytics 4 | Traffic and behaviour tracking |
| Forms | Native with backend API | Controlled spam protection |

> **Note:** If client prefers a simpler, low-maintenance solution, WordPress with Elementor Pro + Gravity Forms is an equally valid alternative, with slightly reduced performance headroom.

### 7.2 Hosting Requirements

- Minimum: 2 vCPU, 4GB RAM, 50GB SSD
- Bandwidth: Unmetered or minimum 2TB/month
- Server Location Preference: Singapore or India region (lowest latency for Bangladesh)
- Daily automated backups
- Staging environment required for testing before live deployments

### 7.3 Domain & Email

- Domain: Client to register preferred `.com` domain (e.g., `hotelname.com`)
- Professional email setup: `info@hotelname.com`, `reservations@hotelname.com`, `sales@hotelname.com`
- DNS management via Cloudflare (recommended for performance and security)

---

## 8. Content Management System (CMS)

### 8.1 CMS Requirements

The hotel staff must be able to independently manage the following without technical knowledge:

| Content Type | CMS Capability Required |
|---|---|
| Room types & pricing | Add, Edit, Delete |
| Photo gallery | Upload, Reorder, Delete |
| Blog posts | Create, Edit, Publish, Unpublish |
| Special offers & promotions | Add with validity dates, Activate/Deactivate |
| Tour packages | Add, Edit, Delete |
| Inquiry management | View, Update status, Export |
| Homepage content | Edit hero text, tagline, featured sections |
| Facility descriptions | Edit content and photos |

### 8.2 CMS Training

- 2-day on-site CMS training to be provided to designated hotel staff
- Training documentation (PDF manual + video recordings) to be delivered
- 3 months post-launch helpdesk support included

---

## 9. Third-Party Integrations

### 9.1 Google Maps Integration

- Embedded interactive Google Map on Contact page and Homepage footer
- Custom map pin with hotel name and logo
- "Get Directions" deep link (opens Google Maps app on mobile)

### 9.2 Google Reviews Integration

- Google Business Profile setup (if not already created)
- Reviews widget on Homepage and Rooms page
- Average star rating display

### 9.3 Facebook & Instagram

- Facebook page link in header/footer
- Instagram feed widget on Homepage (latest 6–9 posts)
- Open Graph meta tags for rich Facebook/Instagram link previews
- Facebook Pixel installation for future ad retargeting

### 9.4 WhatsApp Business

- Floating WhatsApp button (bottom-right, visible on all pages)
- Pre-filled message template: "Hello, I'd like to inquire about room availability..."
- WhatsApp number linked to verified WhatsApp Business account
- Quick reply shortcut on mobile devices

### 9.5 YouTube

- Hotel virtual tour video embedded on Homepage and About page
- Gallery page to feature YouTube playlist (room tours, amenity walkthroughs)
- YouTube channel link in social media section

### 9.6 Google Analytics 4 & Search Console

- GA4 property setup with event tracking (inquiry form submissions, WhatsApp button clicks, phone number clicks, PDF menu downloads)
- Google Search Console verification
- Monthly analytics report template to be provided

---

## 10. SEO & Digital Marketing Requirements

### 10.1 On-Page SEO

| Element | Requirement |
|---|---|
| Title Tags | Unique, under 60 characters, keyword-rich |
| Meta Descriptions | Unique per page, 150–160 characters |
| H1 Tags | One per page, contains primary keyword |
| Image Alt Text | Descriptive, includes hotel name and location |
| URL Structure | Clean, lowercase, hyphen-separated |
| Internal Linking | Logical cross-page linking strategy |

### 10.2 Local SEO

- Google Business Profile optimisation (hotel address, phone, hours, photos, category)
- NAP (Name, Address, Phone) consistency across website and all online listings
- LocalBusiness + Hotel JSON-LD schema markup
- Location-specific content: "Hotel near Osmani Airport", "Hotel in Sylhet city centre"

### 10.3 Target Keywords (Initial Set)

| Keyword | Intent |
|---|---|
| Hotel in Sylhet | Navigational / Transactional |
| 3 star hotel Sylhet | Transactional |
| Best hotel in Sylhet Bangladesh | Transactional |
| Hotel near Sylhet Airport | Transactional |
| Conference hall Sylhet | Transactional |
| Sylhet tour package | Informational |
| Restaurant in Sylhet hotel | Local |
| Business hotel Sylhet | Transactional |
| Sylhet hotel with swimming pool | Transactional |

### 10.4 Content Strategy (Blog)

Recommended initial blog posts for SEO:
1. "Top 10 Places to Visit in Sylhet in 2026"
2. "Complete Travel Guide to Jaflong, Sylhet"
3. "Ratargul Swamp Forest — Everything You Need to Know"
4. "Why Sylhet is Bangladesh's Most Popular Tourist Destination"
5. "Conference Venues in Sylhet — What to Look For"

---

## 11. UI/UX Design Guidelines

### 11.1 Design Principles

- **Elegant & Professional:** Reflects 3-star standard without being over-designed
- **Image-Led:** High-quality photography is central to the design
- **Trust-Inducing:** Clear CTAs, visible contact info, review widgets, accreditation badges
- **Mobile-First:** Primary design consideration is mobile users
- **Fast & Clean:** Minimal animations, no heavy JavaScript unless necessary

### 11.2 Visual Identity

| Element | Guideline |
|---|---|
| Colour Palette | To be defined with client — suggested: deep green + gold (Sylhet's nature + prestige) |
| Typography | Clean serif for headings (e.g., Playfair Display), sans-serif for body (e.g., Inter) |
| Imagery Style | Professional hotel photography (client to provide; professional shoot recommended) |
| Icons | Line-style icons (consistent set, e.g., Phosphor or Heroicons) |
| Logo | Client to provide final logo; web-optimised SVG format required |

### 11.3 Key UX Rules

- Maximum 2 clicks to reach any inquiry form from any page
- WhatsApp button always visible without scrolling (sticky)
- Phone number and email clickable on all devices
- All forms must show clear success/error messages after submission
- No auto-playing audio; videos muted by default
- Cookie consent banner (GDPR-aware, for international visitors)

### 11.4 Pages & Sitemap

```
Home
├── Rooms & Suites
│   ├── [Room Type 1]
│   ├── [Room Type 2]
│   └── [Room Type N]
├── Dining
├── Facilities
│   ├── Swimming Pool, Gym & Spa
│   └── Conference & Events
├── Tour Packages
├── Gallery
├── Special Offers
├── Blog
│   └── [Individual Post]
├── About Us
└── Contact
```

---

## 12. Project Timeline & Milestones

**Total Estimated Duration:** 20–24 weeks (approximately 6 months)

| Phase | Milestone | Duration | Deliverable |
|---|---|---|---|
| **Phase 1** | Discovery & Planning | Week 1–2 | Final PRD sign-off, sitemap, wireframes approval |
| **Phase 2** | Design | Week 3–6 | UI design (Figma), client review & approval (2 revision rounds) |
| **Phase 3** | Frontend Development | Week 7–12 | All pages developed, responsive, CMS integrated |
| **Phase 4** | Backend & Integrations | Week 13–16 | CMS live, forms working, all integrations connected |
| **Phase 5** | Content Population | Week 17–18 | All content, photos, and copy loaded into CMS |
| **Phase 6** | QA & Testing | Week 19–20 | Cross-browser, mobile, performance, and form testing |
| **Phase 7** | SEO & Analytics Setup | Week 21 | GA4, Search Console, schema, sitemap submitted |
| **Phase 8** | Launch & Handover | Week 22 | Go-live, DNS switch, CMS training delivered |
| **Phase 9** | Post-Launch Support | Week 23–34 | 3-month support & monitoring period |

### Key Milestones

| Milestone | Deadline |
|---|---|
| PRD Signed Off | End of Week 1 |
| Design Approved | End of Week 6 |
| Staging Site Ready | End of Week 16 |
| Content Complete | End of Week 18 |
| Website Live | End of Week 22 |
| Support Period Ends | End of Week 34 |

---

## 13. Budget Breakdown

**Total Approved Budget:** ৳5,00,000+

| Category | Estimated Cost (BDT) | Notes |
|---|---|---|
| UI/UX Design | ৳60,000 – ৳80,000 | Figma designs, 2 revision rounds |
| Frontend Development | ৳90,000 – ৳1,10,000 | All pages, responsive, animations |
| Backend / CMS Development | ৳70,000 – ৳90,000 | CMS setup, forms, admin dashboard |
| Integrations | ৳20,000 – ৳30,000 | Google Maps, GA4, WhatsApp, Social Media |
| SEO Foundation | ৳30,000 – ৳40,000 | Technical SEO, schema, Search Console |
| Content Population | ৳20,000 – ৳30,000 | Loading provided content into CMS |
| QA & Testing | ৳20,000 – ৳25,000 | Cross-browser, performance, form testing |
| Hosting Setup (1 Year) | ৳25,000 – ৳35,000 | Cloud hosting, CDN, SSL, backups |
| Domain & Email (1 Year) | ৳5,000 – ৳8,000 | .com domain + 3 professional emails |
| CMS Training & Documentation | ৳15,000 – ৳20,000 | 2-day training + manuals + video |
| Post-Launch Support (3 Months) | ৳30,000 – ৳40,000 | Bug fixes, minor updates |
| **Contingency (10%)** | **৳40,000 – ৳50,000** | **Scope changes, unforeseen issues** |
| **Total Estimate** | **৳4,25,000 – ৳5,58,000** | **Within budget range** |

> **Note:** Professional photography shoot (strongly recommended) is not included above. Estimated separately at ৳25,000–৳50,000.

---

## 14. Risks & Mitigation

| Risk | Probability | Impact | Mitigation Strategy |
|---|---|---|---|
| Client delays in providing photos/content | High | High | Define content submission deadline (by Week 16); agency can provide stock photos as placeholder |
| Logo/branding not finalised | Medium | Medium | Begin development with placeholder; brand must be finalised before design approval (Week 6) |
| Hosting performance issues in Bangladesh | Medium | High | Use Singapore/India data centre + Cloudflare CDN; run load tests before go-live |
| Scope creep (additional features mid-project) | Medium | High | All change requests go through formal CR process; additional cost and timeline impact communicated upfront |
| WhatsApp API changes | Low | Low | Use standard wa.me link; not dependent on Business API |
| Staff unable to manage CMS after training | Medium | Medium | Provide video tutorials; offer paid extended support plan |
| SEO results slower than expected | Medium | Medium | Set realistic expectations; SEO is 6–12 month process; begin content strategy on Day 1 |

---

## 15. Assumptions & Dependencies

### 15.1 Client Responsibilities

- [ ] Provide finalised hotel logo (SVG + PNG formats)
- [ ] Provide professional hotel photography (exterior, rooms, dining, pool, spa, conference hall)
- [ ] Provide final room types, descriptions, and indicative pricing
- [ ] Provide tour package details and itineraries
- [ ] Provide restaurant menu (PDF or item list)
- [ ] Register/transfer domain name to project DNS
- [ ] Create/provide access to Google Business Profile
- [ ] Create/provide access to Facebook Business Page and Instagram account
- [ ] Create/provide WhatsApp Business number
- [ ] Designate 1–2 staff members as CMS administrators
- [ ] Provide all textual content (About Us, History, Facility descriptions) in English
- [ ] Timely feedback at each review stage (within 5 business days)

### 15.2 Agency Responsibilities

- Maintain weekly progress updates via status report
- Host all development on staging environment before production
- Deliver final website source code and database to client upon project completion
- Provide 3 months of post-launch support
- Provide CMS training and documentation

---

## 16. Acceptance Criteria

The website will be considered complete and ready for launch when ALL of the following are verified:

### Design
- [ ] All pages match approved Figma designs
- [ ] Fully responsive on mobile (375px), tablet (768px), and desktop (1440px)
- [ ] Consistent branding (colours, fonts, logo) across all pages

### Functionality
- [ ] All inquiry forms submit successfully and trigger admin notification email
- [ ] Guest auto-confirmation email is sent upon form submission
- [ ] All inquiries are logged and visible in CMS admin dashboard
- [ ] WhatsApp button opens correct WhatsApp chat on all devices
- [ ] Google Maps embed loads correctly on Contact page
- [ ] Google Reviews widget displays correctly
- [ ] YouTube video embeds load and play correctly
- [ ] Instagram feed widget loads correctly
- [ ] All internal links and navigation menus work correctly
- [ ] No broken links or 404 errors on any page
- [ ] CMS admin can add/edit/delete rooms, blog posts, offers, gallery photos

### Performance
- [ ] Google PageSpeed Insights: 80+ on mobile, 90+ on desktop
- [ ] All Core Web Vitals in "Good" range
- [ ] Website loads in under 3 seconds on 4G (tested via WebPageTest)

### SEO
- [ ] All pages have unique meta titles and descriptions
- [ ] XML sitemap submitted to Google Search Console
- [ ] Schema markup validates in Google Rich Results Test
- [ ] GA4 tracking confirmed (events firing for form submissions, CTA clicks)

### Security
- [ ] HTTPS enforced on all URLs
- [ ] All forms protected against spam (CAPTCHA/honeypot)
- [ ] Admin panel accessible only with credentials
- [ ] Automated backup system confirmed active

### Training
- [ ] CMS training completed for designated staff
- [ ] Training manual and video recordings delivered

---

## 17. Glossary

| Term | Definition |
|---|---|
| PRD | Product Requirements Document — a formal document defining what a product must do |
| CMS | Content Management System — software allowing non-technical users to manage website content |
| OTA | Online Travel Agency — third-party booking platforms like Booking.com, Agoda, Expedia |
| MICE | Meetings, Incentives, Conferences, and Events — a segment of corporate travel |
| SEO | Search Engine Optimisation — improving website visibility on search engines like Google |
| GA4 | Google Analytics 4 — Google's latest web analytics platform |
| SSR | Server-Side Rendering — a technique for rendering web pages on the server for better SEO and performance |
| CDN | Content Delivery Network — a distributed network of servers for faster content delivery globally |
| Core Web Vitals | Google's metrics for measuring real-world user experience (LCP, FID, CLS) |
| WCAG | Web Content Accessibility Guidelines — international standards for web accessibility |
| JSON-LD | JavaScript Object Notation for Linked Data — format for structured data markup |
| CR | Change Request — a formal request to modify the agreed scope of work |
| NAP | Name, Address, Phone — consistent business information used in local SEO |
| WhatsApp Business | A WhatsApp product for businesses with dedicated features for customer communication |

---

## Document Sign-Off

| Role | Name | Signature | Date |
|---|---|---|---|
| Client (Hotel Owner/Representative) | | | |
| Project Manager (Agency) | | | |
| Lead Developer (Agency) | | | |
| Design Lead (Agency) | | | |

---

*This PRD is a living document. Any changes to scope, timeline, or budget after sign-off must be submitted as a formal Change Request and approved by both parties before implementation.*

---

**Prepared by:** Senior Project Manager  
**Agency:** [Agency Name]  
**Contact:** [Agency Email] | [Agency Phone]  
**Document Last Updated:** June 2026
