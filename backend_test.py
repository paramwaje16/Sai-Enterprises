import requests
import sys
from datetime import datetime
import json

class SaiEnterprisesAPITester:
    def __init__(self, base_url="https://local-hardware-guide.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                return True, response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.headers.get('content-type', '').startswith('application/json'):
                    print(f"   Response: {response.json()}")
                else:
                    print(f"   Response: {response.text}")
                self.failed_tests.append({
                    "test": name,
                    "endpoint": endpoint,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "response": response.text[:200]
                })
                return False, {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Connection Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "endpoint": endpoint,
                "error": str(e)
            })
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "endpoint": endpoint,
                "error": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        success, response = self.run_test(
            "API Root Endpoint",
            "GET",
            "api/",
            200
        )
        return success

    def test_create_inquiry_valid(self):
        """Test creating inquiry with valid data"""
        test_data = {
            "name": "Test Customer",
            "email": "test@example.com",
            "phone": "9876543210", 
            "message": "I need information about lathe machine tools for my workshop."
        }
        
        success, response = self.run_test(
            "Create Valid Inquiry",
            "POST",
            "api/inquiries",
            201,
            data=test_data
        )
        
        if success:
            # Verify response has required fields
            required_fields = ["inquiry_id", "name", "email", "message", "status", "created_at"]
            for field in required_fields:
                if field not in response:
                    print(f"⚠️  Warning: Missing field '{field}' in response")
                    return False
            
            # Store inquiry_id for later tests
            self.test_inquiry_id = response.get("inquiry_id")
            print(f"   Created inquiry with ID: {self.test_inquiry_id}")
        
        return success

    def test_create_inquiry_invalid_email(self):
        """Test creating inquiry with invalid email"""
        test_data = {
            "name": "Test Customer",
            "email": "invalid-email", # Invalid email
            "phone": "9876543210",
            "message": "Test message"
        }
        
        success, response = self.run_test(
            "Create Inquiry - Invalid Email",
            "POST", 
            "api/inquiries",
            422,  # Validation error expected
            data=test_data
        )
        return not success  # We expect this to fail

    def test_create_inquiry_missing_required(self):
        """Test creating inquiry with missing required fields"""
        test_data = {
            "name": "",  # Empty name
            "email": "test@example.com",
            # message is missing
        }
        
        success, response = self.run_test(
            "Create Inquiry - Missing Required Fields",
            "POST",
            "api/inquiries", 
            422,  # Validation error expected
            data=test_data
        )
        return not success  # We expect this to fail

    def test_get_inquiries(self):
        """Test getting all inquiries"""
        success, response = self.run_test(
            "Get All Inquiries",
            "GET",
            "api/inquiries",
            200
        )
        
        if success:
            if isinstance(response, list):
                print(f"   Found {len(response)} inquiries")
                if len(response) > 0:
                    # Check if our test inquiry is there
                    if hasattr(self, 'test_inquiry_id'):
                        found_test_inquiry = any(
                            inquiry.get('inquiry_id') == self.test_inquiry_id 
                            for inquiry in response
                        )
                        if found_test_inquiry:
                            print(f"   ✓ Found our test inquiry in the list")
                        else:
                            print(f"   ⚠️  Our test inquiry not found in the list")
            else:
                print(f"   ⚠️  Expected list, got {type(response)}")
                
        return success

    def test_get_single_inquiry(self):
        """Test getting a single inquiry by ID"""
        if not hasattr(self, 'test_inquiry_id'):
            print("   ⚠️  Skipping - no test inquiry ID available")
            return True
            
        success, response = self.run_test(
            "Get Single Inquiry",
            "GET",
            f"api/inquiries/{self.test_inquiry_id}",
            200
        )
        
        if success:
            if response.get('inquiry_id') == self.test_inquiry_id:
                print(f"   ✓ Retrieved correct inquiry")
            else:
                print(f"   ⚠️  Retrieved inquiry ID doesn't match")
                
        return success

    def test_get_nonexistent_inquiry(self):
        """Test getting a non-existent inquiry"""
        success, response = self.run_test(
            "Get Non-existent Inquiry",
            "GET",
            "api/inquiries/nonexistent-id",
            404
        )
        return not success  # We expect this to fail with 404

def main():
    """Run all API tests"""
    print("🧪 Starting Sai Enterprises API Tests")
    print("=" * 50)
    
    tester = SaiEnterprisesAPITester()
    
    # Track all test results
    test_results = []
    
    # Run all tests
    tests = [
        ("Root Endpoint", tester.test_root_endpoint),
        ("Create Valid Inquiry", tester.test_create_inquiry_valid),
        ("Invalid Email Validation", tester.test_create_inquiry_invalid_email),
        ("Missing Fields Validation", tester.test_create_inquiry_missing_required),
        ("Get All Inquiries", tester.test_get_inquiries),
        ("Get Single Inquiry", tester.test_get_single_inquiry),
        ("Get Non-existent Inquiry", tester.test_get_nonexistent_inquiry),
    ]
    
    for test_name, test_func in tests:
        try:
            result = test_func()
            test_results.append({"name": test_name, "passed": result})
        except Exception as e:
            print(f"❌ Test '{test_name}' crashed: {str(e)}")
            test_results.append({"name": test_name, "passed": False, "error": str(e)})
    
    # Print final results
    print("\n" + "=" * 50)
    print("📊 TEST SUMMARY")
    print("=" * 50)
    print(f"Total tests run: {tester.tests_run}")
    print(f"Tests passed: {tester.tests_passed}")
    print(f"Tests failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%" if tester.tests_run > 0 else "No tests run")
    
    if tester.failed_tests:
        print("\n❌ FAILED TESTS:")
        for failed in tester.failed_tests:
            error_msg = failed.get('error', f'Status {failed.get("actual", "unknown")}')
            print(f"   - {failed.get('test', 'Unknown')}: {error_msg}")
    
    print(f"\n✅ API Status: {'HEALTHY' if tester.tests_passed >= tester.tests_run * 0.8 else 'ISSUES DETECTED'}")
    
    return 0 if tester.tests_passed >= tester.tests_run * 0.8 else 1

if __name__ == "__main__":
    sys.exit(main())