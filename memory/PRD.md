# Sai Enterprises Hardware Shop Website - PRD

## Original Problem Statement
Build a website for Sai Enterprises hardware shop using information from Google Maps.

## Shop Information
- **Name:** Sai Enterprises
- **Specialty:** Lathe Machine Tools | Purchase of Carbide Scrap
- **Location:** Plot 11/A/2, Indrayani Nagar, S Block, Chowk, Bhosari, Pune, Maharashtra 411026
- **Phone:** 7720953955 (Aditya), 9822764821 (Balaji)
- **Email:** adityamamidwar00@gmail.com
- **Rating:** 4.9/5 (13 Google reviews)
- **Directors:** Aditya Mamidwar, Balaji Mamidwar

## Architecture
- **Frontend:** React with Shadcn UI components
- **Backend:** FastAPI
- **Database:** MongoDB

## Implemented Features (Frontend - Mock Data)
✅ Hero section with CTAs
✅ 8 Services (4 with subtypes, 4 without)
✅ Products section with 6 products
✅ Reviews section (6 reviews)
✅ Contact form with map integration
✅ WhatsApp floating button
✅ SEO optimization
✅ Fully responsive design

## Backend API Contract

### Contact Form Endpoint

**POST /api/inquiries**

Request Body:
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "phone": "string (optional)",
  "message": "string (required)"
}
```

Response (Success - 201):
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "message": "string",
  "status": "pending",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

Response (Error - 400):
```json
{
  "detail": "Error message"
}
```

### Get All Inquiries (Optional - Admin)

**GET /api/inquiries**

Response (200):
```json
[
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "message": "string",
    "status": "pending | contacted | resolved",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
]
```

## MongoDB Schema

### Inquiry Collection
```
{
  _id: ObjectId,
  inquiry_id: String (UUID),
  name: String,
  email: String,
  phone: String (optional),
  message: String,
  status: String (pending, contacted, resolved),
  created_at: DateTime,
  updated_at: DateTime
}
```

## Frontend Integration
- Remove mock toast success
- Call POST /api/inquiries on form submit
- Show success/error messages based on API response
- Clear form on successful submission

## Testing Requirements
- Test contact form submission
- Verify data is stored in MongoDB
- Test form validation
- Test error handling

## Future Enhancements (P1)
- Email notification on new inquiry
- Admin panel to view/manage inquiries
- Product catalog management
- Photo gallery
