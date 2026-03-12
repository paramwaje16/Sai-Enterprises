"""
Products API Test Suite for Sai Enterprises
Tests CRUD operations for /api/products endpoints and categories endpoint
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://sai-hardware-shop.preview.emergentagent.com')

@pytest.fixture
def api_client():
    """Shared requests session"""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


class TestProductsAPIHealth:
    """Test API availability and health"""
    
    def test_api_root_endpoint(self, api_client):
        """Test API root endpoint is accessible"""
        response = api_client.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"API Root response: {data}")


class TestProductsRead:
    """Test GET operations for products"""
    
    def test_get_all_products_returns_list(self, api_client):
        """GET /api/products returns list of products"""
        response = api_client.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Found {len(data)} products")
        
    def test_get_all_products_returns_31_products(self, api_client):
        """GET /api/products should return 31 seeded products"""
        response = api_client.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        data = response.json()
        # Per requirements, there should be 31 products seeded
        assert len(data) >= 31, f"Expected at least 31 products, got {len(data)}"
        print(f"Product count: {len(data)}")
        
    def test_product_has_required_fields(self, api_client):
        """Each product should have required fields"""
        response = api_client.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        data = response.json()
        
        if len(data) > 0:
            product = data[0]
            required_fields = ["product_id", "name", "category", "image", "created_at", "updated_at"]
            for field in required_fields:
                assert field in product, f"Missing field: {field}"
            print(f"Product has all required fields: {list(product.keys())}")
            
    def test_get_single_product_by_id(self, api_client):
        """GET /api/products/{product_id} returns single product"""
        # First get all products to get a valid product_id
        response = api_client.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        products = response.json()
        assert len(products) > 0, "No products available for testing"
        
        product_id = products[0]["product_id"]
        
        # Get single product
        response = api_client.get(f"{BASE_URL}/api/products/{product_id}")
        assert response.status_code == 200
        product = response.json()
        assert product["product_id"] == product_id
        print(f"Successfully fetched product: {product['name']}")
        
    def test_get_nonexistent_product_returns_404(self, api_client):
        """GET /api/products/{nonexistent_id} returns 404"""
        fake_id = str(uuid.uuid4())
        response = api_client.get(f"{BASE_URL}/api/products/{fake_id}")
        assert response.status_code == 404
        print("Correctly returned 404 for non-existent product")


class TestCategoriesEndpoint:
    """Test GET /api/products/categories/list endpoint"""
    
    def test_get_categories_returns_list(self, api_client):
        """GET /api/products/categories/list returns category counts"""
        response = api_client.get(f"{BASE_URL}/api/products/categories/list")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Found {len(data)} categories")
        
    def test_categories_have_name_and_count(self, api_client):
        """Each category should have name and count fields"""
        response = api_client.get(f"{BASE_URL}/api/products/categories/list")
        assert response.status_code == 200
        data = response.json()
        
        if len(data) > 0:
            for category in data:
                assert "name" in category, "Category missing 'name' field"
                assert "count" in category, "Category missing 'count' field"
                assert isinstance(category["count"], int)
                print(f"Category: {category['name']} - {category['count']} products")


class TestProductsCRUD:
    """Test Create, Update, Delete operations for products"""
    
    def test_create_product_and_verify(self, api_client):
        """POST /api/products creates a new product"""
        test_product = {
            "name": "TEST_Turning Tool - Automated Test",
            "category": "Lathe Tools - Turning",
            "image": "https://example.com/test-image.jpg"
        }
        
        # Create product
        response = api_client.post(f"{BASE_URL}/api/products", json=test_product)
        assert response.status_code == 201, f"Expected 201, got {response.status_code}: {response.text}"
        
        created_product = response.json()
        assert created_product["name"] == test_product["name"]
        assert created_product["category"] == test_product["category"]
        assert created_product["image"] == test_product["image"]
        assert "product_id" in created_product
        
        product_id = created_product["product_id"]
        print(f"Created product with ID: {product_id}")
        
        # GET to verify persistence
        response = api_client.get(f"{BASE_URL}/api/products/{product_id}")
        assert response.status_code == 200
        fetched_product = response.json()
        assert fetched_product["name"] == test_product["name"]
        assert fetched_product["product_id"] == product_id
        print(f"Verified product persistence via GET")
        
        # Cleanup - delete the test product
        api_client.delete(f"{BASE_URL}/api/products/{product_id}")
        
    def test_update_product_and_verify(self, api_client):
        """PUT /api/products/{product_id} updates an existing product"""
        # First create a test product
        test_product = {
            "name": "TEST_Original Product Name",
            "category": "Lathe Tools - Boring",
            "image": "https://example.com/original.jpg"
        }
        
        create_response = api_client.post(f"{BASE_URL}/api/products", json=test_product)
        assert create_response.status_code == 201
        created_product = create_response.json()
        product_id = created_product["product_id"]
        
        # Update the product
        update_data = {
            "name": "TEST_Updated Product Name",
            "category": "Lathe Tools - Facing"
        }
        
        update_response = api_client.put(f"{BASE_URL}/api/products/{product_id}", json=update_data)
        assert update_response.status_code == 200
        updated_product = update_response.json()
        assert updated_product["name"] == "TEST_Updated Product Name"
        assert updated_product["category"] == "Lathe Tools - Facing"
        # Image should remain unchanged
        assert updated_product["image"] == test_product["image"]
        print(f"Successfully updated product: {updated_product['name']}")
        
        # GET to verify update persistence
        get_response = api_client.get(f"{BASE_URL}/api/products/{product_id}")
        assert get_response.status_code == 200
        fetched_product = get_response.json()
        assert fetched_product["name"] == "TEST_Updated Product Name"
        print(f"Verified update persistence via GET")
        
        # Cleanup
        api_client.delete(f"{BASE_URL}/api/products/{product_id}")
        
    def test_delete_product_and_verify_removal(self, api_client):
        """DELETE /api/products/{product_id} removes a product"""
        # First create a test product
        test_product = {
            "name": "TEST_Product To Delete",
            "category": "Carbide Scrap",
            "image": "https://example.com/delete-me.jpg"
        }
        
        create_response = api_client.post(f"{BASE_URL}/api/products", json=test_product)
        assert create_response.status_code == 201
        product_id = create_response.json()["product_id"]
        print(f"Created product for deletion test: {product_id}")
        
        # Delete the product
        delete_response = api_client.delete(f"{BASE_URL}/api/products/{product_id}")
        assert delete_response.status_code == 200
        assert "message" in delete_response.json()
        print(f"Delete response: {delete_response.json()}")
        
        # Verify deletion - GET should return 404
        get_response = api_client.get(f"{BASE_URL}/api/products/{product_id}")
        assert get_response.status_code == 404, f"Expected 404, got {get_response.status_code}"
        print(f"Verified product no longer exists (404)")
        
    def test_delete_nonexistent_product_returns_404(self, api_client):
        """DELETE /api/products/{nonexistent_id} returns 404"""
        fake_id = str(uuid.uuid4())
        response = api_client.delete(f"{BASE_URL}/api/products/{fake_id}")
        assert response.status_code == 404
        print("Correctly returned 404 for deleting non-existent product")
        
    def test_update_nonexistent_product_returns_404(self, api_client):
        """PUT /api/products/{nonexistent_id} returns 404"""
        fake_id = str(uuid.uuid4())
        update_data = {"name": "Non-existent"}
        response = api_client.put(f"{BASE_URL}/api/products/{fake_id}", json=update_data)
        assert response.status_code == 404
        print("Correctly returned 404 for updating non-existent product")


class TestProductValidation:
    """Test product validation rules"""
    
    def test_create_product_missing_required_fields(self, api_client):
        """POST /api/products with missing fields returns 422"""
        # Missing category and image
        incomplete_product = {
            "name": "Incomplete Product"
        }
        
        response = api_client.post(f"{BASE_URL}/api/products", json=incomplete_product)
        assert response.status_code == 422
        print(f"Correctly returned 422 for missing required fields")
