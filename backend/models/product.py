from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, timezone
import uuid


class Product(BaseModel):
    product_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str
    image: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ProductCreate(BaseModel):
    name: str
    category: str
    image: str


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None
