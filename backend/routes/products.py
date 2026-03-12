from fastapi import APIRouter, HTTPException, Depends
from models.product import Product, ProductCreate, ProductUpdate
from datetime import datetime, timezone
from typing import List

router = APIRouter(prefix="/products")


async def get_database():
    from server import db
    return db


@router.post("", response_model=Product, status_code=201)
async def create_product(product_in: ProductCreate, db=Depends(get_database)):
    product = Product(**product_in.model_dump())
    doc = product.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    await db.products.insert_one(doc)
    return product


@router.get("", response_model=List[Product])
async def get_products(db=Depends(get_database)):
    products = await db.products.find({}, {"_id": 0}).to_list(1000)
    for p in products:
        if isinstance(p.get('created_at'), str):
            p['created_at'] = datetime.fromisoformat(p['created_at'])
        if isinstance(p.get('updated_at'), str):
            p['updated_at'] = datetime.fromisoformat(p['updated_at'])
    return products


@router.get("/categories/list")
async def get_categories(db=Depends(get_database)):
    pipeline = [
        {"$group": {"_id": "$category", "count": {"$sum": 1}}},
        {"$sort": {"_id": 1}}
    ]
    results = await db.products.aggregate(pipeline).to_list(100)
    return [{"name": r["_id"], "count": r["count"]} for r in results]


@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str, db=Depends(get_database)):
    product = await db.products.find_one({"product_id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if isinstance(product.get('created_at'), str):
        product['created_at'] = datetime.fromisoformat(product['created_at'])
    if isinstance(product.get('updated_at'), str):
        product['updated_at'] = datetime.fromisoformat(product['updated_at'])
    return product


@router.put("/{product_id}", response_model=Product)
async def update_product(product_id: str, product_in: ProductUpdate, db=Depends(get_database)):
    existing = await db.products.find_one({"product_id": product_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Product not found")

    update_data = {k: v for k, v in product_in.model_dump().items() if v is not None}
    update_data['updated_at'] = datetime.now(timezone.utc).isoformat()

    await db.products.update_one(
        {"product_id": product_id},
        {"$set": update_data}
    )

    updated = await db.products.find_one({"product_id": product_id}, {"_id": 0})
    if isinstance(updated.get('created_at'), str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    if isinstance(updated.get('updated_at'), str):
        updated['updated_at'] = datetime.fromisoformat(updated['updated_at'])
    return updated


@router.delete("/{product_id}")
async def delete_product(product_id: str, db=Depends(get_database)):
    result = await db.products.delete_one({"product_id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}


@router.post("/seed", status_code=201)
async def seed_products(db=Depends(get_database)):
    count = await db.products.count_documents({})
    if count > 0:
        return {"message": f"Database already has {count} products. Skipping seed."}

    initial_products = [
        {"name": "Carbide Turning Tool - Type 1", "category": "Lathe Tools - Turning", "image": "https://lh3.googleusercontent.com/d/1--MJJQZ5SRclwWBv7wLHIWR0VWzyCyS-"},
        {"name": "Carbide Turning Tool - Type 2", "category": "Lathe Tools - Turning", "image": "https://lh3.googleusercontent.com/d/1L6Jov4MgV211N0rZF6Wof11ownCD8fma"},
        {"name": "Carbide Turning Tool - Type 3", "category": "Lathe Tools - Turning", "image": "https://lh3.googleusercontent.com/d/199m47GYBVyg5igZKnaua0kQ440lCTq0C"},
        {"name": "Precision Boring Tool - Type 1", "category": "Lathe Tools - Boring", "image": "https://lh3.googleusercontent.com/d/1pY4NPwCumn0wRZVgqn8gdReg5Nhiw-jq"},
        {"name": "Precision Boring Tool - Type 2", "category": "Lathe Tools - Boring", "image": "https://lh3.googleusercontent.com/d/1O_eJDKfqwJFNCSnVLh5ZIg0A9qyi50K_"},
        {"name": "Threading Tool - Type 1", "category": "Lathe Tools - Threading", "image": "https://lh3.googleusercontent.com/d/1mqRAXstcxgdJ4H8V6T2qYy3tJFQKhG2u"},
        {"name": "Threading Tool - Type 2", "category": "Lathe Tools - Threading", "image": "https://lh3.googleusercontent.com/d/1_SzcJDyQmfOVG4AhImFUHB_4rZWtlF6j"},
        {"name": "Threading Tool - Type 3", "category": "Lathe Tools - Threading", "image": "https://lh3.googleusercontent.com/d/1-WqHyp26wnbCZqdH8AsSPGTZYRG19fuI"},
        {"name": "Threading Tool - Type 4", "category": "Lathe Tools - Threading", "image": "https://lh3.googleusercontent.com/d/1bTow9SnxVkasSBYEhGFy-0EcudvmSknI"},
        {"name": "Facing Tool - Type 1", "category": "Lathe Tools - Facing", "image": "https://lh3.googleusercontent.com/d/1FOxou30teSQ91M7devazhld4_BZCdBcA"},
        {"name": "Facing Tool - Type 2", "category": "Lathe Tools - Facing", "image": "https://lh3.googleusercontent.com/d/1k0vvpEragEJ8GIa2Fk_lCquzZYc7flOS"},
        {"name": "Facing Tool - Type 3", "category": "Lathe Tools - Facing", "image": "https://lh3.googleusercontent.com/d/1zddA8xbAfAmRSdzdeQBkkGi7OasGaGPF"},
        {"name": "Parting Tool - Type 1", "category": "Lathe Tools - Parting", "image": "https://lh3.googleusercontent.com/d/1gEJ78iCk4pG0MiZzngrZr5_Jq_8JCwRN"},
        {"name": "Parting Tool - Type 2", "category": "Lathe Tools - Parting", "image": "https://lh3.googleusercontent.com/d/1VNj_ube67jwdEf9yPgzzE0n4OyfoIHVM"},
        {"name": "Parting Tool - Type 3", "category": "Lathe Tools - Parting", "image": "https://lh3.googleusercontent.com/d/19dkNfUTU7LxWychI0ykK7HzKxqU90XNc"},
        {"name": "Milling Insert - Type 1", "category": "Milling Tools", "image": "https://lh3.googleusercontent.com/d/1wY7jUV5V-dKjBiSjpqZAXr4No0g-4-A0"},
        {"name": "Milling Insert - Type 2", "category": "Milling Tools", "image": "https://lh3.googleusercontent.com/d/1mowmmn3hLhFZkty6rEt7M5KGQ_H4NaBN"},
        {"name": "Milling Insert - Type 3", "category": "Milling Tools", "image": "https://lh3.googleusercontent.com/d/1P0N5FHBpEf1XBNjS_emn2Nnk8OM8tmP2"},
        {"name": "Milling Insert - Type 4", "category": "Milling Tools", "image": "https://lh3.googleusercontent.com/d/1e_J6i58zXN4Xj1Ti-V4DfqHfQkH6DI3E"},
        {"name": "Traub Machine Tool - Type 1", "category": "Traub Tools", "image": "https://lh3.googleusercontent.com/d/1gIyD95dHdLU7KPZlYJA3NolMD-us494U"},
        {"name": "Traub Machine Tool - Type 2", "category": "Traub Tools", "image": "https://lh3.googleusercontent.com/d/1aLVdLpYS-PV6rMRb-p3xfXQ6pM4VJcWj"},
        {"name": "Traub Machine Tool - Type 3", "category": "Traub Tools", "image": "https://lh3.googleusercontent.com/d/1khUuZFDp24Lf9yhQAl5OodhxivQRAh5i"},
        {"name": "Traub Machine Tool - Type 4", "category": "Traub Tools", "image": "https://lh3.googleusercontent.com/d/1Ib8PYKpTrfeecqPWVxQVbDHFbvpjUHeq"},
        {"name": "Traub Machine Tool - Type 5", "category": "Traub Tools", "image": "https://lh3.googleusercontent.com/d/1laaH75FnhQdDggeS75yZ7yaPbXc43TNq"},
        {"name": "Carbide Scrap - Grade 1", "category": "Carbide Scrap", "image": "https://lh3.googleusercontent.com/d/16DR18Rf6YDIXoWNSu2sOXgIKeIjDx-Sa"},
        {"name": "Carbide Scrap - Grade 2", "category": "Carbide Scrap", "image": "https://lh3.googleusercontent.com/d/1Qx9cHr5sozq3p-hDInAwB_jF_qhllej4"},
        {"name": "Carbide Scrap - Grade 3", "category": "Carbide Scrap", "image": "https://lh3.googleusercontent.com/d/170sklk04ZphL5Ew__Uv8hd8ZkVkSHPRE"},
        {"name": "Carbide Scrap - Grade 4", "category": "Carbide Scrap", "image": "https://lh3.googleusercontent.com/d/1msxpzGYI-_5PVSpSX5Px-asDqoCad_6P"},
        {"name": "Carbide Scrap - Grade 5", "category": "Carbide Scrap", "image": "https://lh3.googleusercontent.com/d/1TQ9VahQclSOVRn7NvFt660n-uHtCQJYo"},
        {"name": "Carbide Scrap - Grade 6", "category": "Carbide Scrap", "image": "https://lh3.googleusercontent.com/d/1SAeY0J87UodRxkKilqWiZleb71KSXhjC"},
        {"name": "Carbide Scrap - Grade 7", "category": "Carbide Scrap", "image": "https://lh3.googleusercontent.com/d/12ZNKRyh79WPFe_t03fhTTa49hBsuavU3"},
    ]

    docs = []
    for p in initial_products:
        product = Product(**p)
        doc = product.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        doc['updated_at'] = doc['updated_at'].isoformat()
        docs.append(doc)

    await db.products.insert_many(docs)
    return {"message": f"Seeded {len(docs)} products successfully"}
