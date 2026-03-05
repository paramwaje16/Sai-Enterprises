from fastapi import APIRouter, HTTPException, status, Depends
from models.inquiry import InquiryCreate, Inquiry
from datetime import datetime

router = APIRouter()

# We'll get the db instance from the main server
async def get_database():
    from server import db
    return db

@router.post("/inquiries", response_model=Inquiry, status_code=status.HTTP_201_CREATED)
async def create_inquiry(inquiry_data: InquiryCreate, db = Depends(get_database)):
    """
    Create a new inquiry from contact form submission
    """
    try:
        # Create inquiry object
        inquiry = Inquiry(
            name=inquiry_data.name,
            email=inquiry_data.email,
            phone=inquiry_data.phone,
            message=inquiry_data.message
        )
        
        # Convert to dict and handle datetime serialization
        inquiry_dict = inquiry.model_dump()
        inquiry_dict['created_at'] = inquiry_dict['created_at'].isoformat()
        inquiry_dict['updated_at'] = inquiry_dict['updated_at'].isoformat()
        
        # Insert into MongoDB
        await db.inquiries.insert_one(inquiry_dict)
        
        return inquiry
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create inquiry: {str(e)}"
        )

@router.get("/inquiries", response_model=list[Inquiry])
async def get_inquiries(skip: int = 0, limit: int = 100, db = Depends(get_database)):
    """
    Get all inquiries (for admin purposes)
    """
    try:
        inquiries = await db.inquiries.find({}, {"_id": 0}).skip(skip).limit(limit).sort("created_at", -1).to_list(length=limit)
        
        # Convert ISO string timestamps back to datetime
        for inquiry in inquiries:
            if isinstance(inquiry['created_at'], str):
                inquiry['created_at'] = datetime.fromisoformat(inquiry['created_at'])
            if isinstance(inquiry['updated_at'], str):
                inquiry['updated_at'] = datetime.fromisoformat(inquiry['updated_at'])
        
        return inquiries
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch inquiries: {str(e)}"
        )

@router.get("/inquiries/{inquiry_id}", response_model=Inquiry)
async def get_inquiry(inquiry_id: str, db = Depends(get_database)):
    """
    Get a specific inquiry by ID
    """
    inquiry = await db.inquiries.find_one({"inquiry_id": inquiry_id}, {"_id": 0})
    
    if not inquiry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inquiry not found"
        )
    
    # Convert ISO string timestamps
    if isinstance(inquiry['created_at'], str):
        inquiry['created_at'] = datetime.fromisoformat(inquiry['created_at'])
    if isinstance(inquiry['updated_at'], str):
        inquiry['updated_at'] = datetime.fromisoformat(inquiry['updated_at'])
    
    return Inquiry(**inquiry)

@router.patch("/inquiries/{inquiry_id}/status")
async def update_inquiry_status(inquiry_id: str, status_update: str, db = Depends(get_database)):
    """
    Update inquiry status (pending, contacted, resolved)
    """
    valid_statuses = ["pending", "contacted", "resolved"]
    
    if status_update not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
        )
    
    result = await db.inquiries.update_one(
        {"inquiry_id": inquiry_id},
        {"$set": {"status": status_update, "updated_at": datetime.utcnow().isoformat()}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inquiry not found"
        )
    
    return {"message": "Inquiry status updated successfully", "status": status_update}
