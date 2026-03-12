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

---

## Backend Implementation Complete (March 5, 2026)

### Implemented Features:
✅ Contact Form API (POST /api/inquiries)
✅ Get All Inquiries API (GET /api/inquiries)
✅ Get Single Inquiry API (GET /api/inquiries/{id})
✅ Update Inquiry Status API (PATCH /api/inquiries/{id}/status)
✅ MongoDB Integration
✅ Form Validation (email format, required fields)
✅ Error Handling
✅ Frontend-Backend Integration
✅ Success/Error Notifications

### Testing Results:
- **Backend Tests:** 100% passed (7/7)
- **Frontend Tests:** 100% passed
- **Integration Tests:** 100% passed
- **Total Inquiries Stored:** 4 test entries verified

---

## UI Fixes Complete (March 12, 2026)

### Completed:
- Fixed contact section layout: Reorganized 4 info cards (Address, Phone, Email, Business Hours) from vertical stack into a 2x2 grid for proper alignment
- Confirmed footer logo was already removed (no `<img>` tag present in footer)
- Verified contact form API still working end-to-end

### Pending:
- P2: Replace Google Drive image URLs with reliable hosting

---

## WhatsApp Quick Inquiry + Product Management (March 12, 2026)

### Completed:
- WhatsApp Quick Inquiry: Product buttons now open WhatsApp with pre-filled details
- Product Management System: Full CRUD API + Admin page at /admin/products
- Home page fetches products dynamically from API (with mockData fallback)
- Fixed React key warnings for API-sourced products

### New API Endpoints:
1. GET /api/products - List all products
2. POST /api/products - Create new product
3. PUT /api/products/{product_id} - Update product
4. DELETE /api/products/{product_id} - Delete product
5. GET /api/products/categories/list - Category counts
6. POST /api/products/seed - Seed initial data

### Database:
- Collection: products
- Fields: product_id, name, category, image, created_at, updated_at

### Testing: 14/14 backend + all frontend passed (/app/test_reports/iteration_2.json)

### API Endpoints:
1. POST /api/inquiries - Create new inquiry
2. GET /api/inquiries - List all inquiries
3. GET /api/inquiries/{id} - Get specific inquiry
4. PATCH /api/inquiries/{id}/status - Update inquiry status

### Database:
- Collection: inquiries
- Fields: inquiry_id, name, email, phone, message, status, created_at, updated_at
