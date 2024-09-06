
import unittest
import requests

BASE_URL = 'http://localhost:5000'  # Adjust according to your server's base URL
AUTH_URL = f'{BASE_URL}/auth/login'  # Endpoint to obtain JWT token

class APITestCase(unittest.TestCase):
    token = None

    @classmethod
    def setUpClass(cls):
        # Authenticate and retrieve the JWT token
        credentials = {
            "email": "pranavleo22@gmail.com",  # Change to valid email
            "password": "abcd1234"      # Change to valid password
        }
        response = requests.post(AUTH_URL, json=credentials)
        print(response)
        cls.token = response.json().get('token')
        print(cls.token)
        assert cls.token, "Failed to authenticate and retrieve JWT token"

    def auth_headers(self):
        return {'Authorization': f'Bearer {self.token}'}

    # Valuation tests
    def test_create_valuation(self):
        payload = {
            # "companyId": 1,
            "valuationDate": "2023-09-01T00:00:00",
            "valuationAmount": 1000000.00,
            "sharesOutstanding": 10000,
            "sharePrice": 100.00,
            "valuationSource": "Test Source",
            "notes": "Test valuation"
        }
        print(self.auth_headers())
        response = requests.post(f'{BASE_URL}/valuations', json=payload, headers=self.auth_headers())
        print(response.json())
        self.assertEqual(response.status_code, 201)
        self.assertIn('Valuation', response.json())

    # def test_get_all_valuations(self):
    #     response = requests.get(f'{BASE_URL}/valuations', headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # def test_get_valuation_by_id(self):
    #     valuation_id = 1
    #     response = requests.get(f'{BASE_URL}/valuations/{valuation_id}', headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # def test_update_valuation(self):
    #     valuation_id = 1
    #     payload = {
    #         "valuationAmount": 2000000.00
    #     }
    #     response = requests.put(f'{BASE_URL}/valuations/{valuation_id}', json=payload, headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # def test_delete_valuation(self):
    #     valuation_id = 1
    #     response = requests.delete(f'{BASE_URL}/valuations/{valuation_id}', headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # # Investor tests
    # def test_create_investor(self):
    #     payload = {
    #         "investorName": "John Doe",
    #         "email": "john.doe@example.com",
    #         "contactInfo": "1234567890",
    #         "notes": "Test Investor"
    #     }
    #     response = requests.post(f'{BASE_URL}/investors', json=payload, headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 201)
    #     self.assertIn('Investor', response.json())

    # def test_get_all_investors(self):
    #     response = requests.get(f'{BASE_URL}/investors', headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # def test_get_investor_by_id(self):
    #     investor_id = 1
    #     response = requests.get(f'{BASE_URL}/investors/{investor_id}', headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # def test_update_investor(self):
    #     investor_id = 1
    #     payload = {
    #         "investorName": "Jane Doe"
    #     }
    #     response = requests.put(f'{BASE_URL}/investors/{investor_id}', json=payload, headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # def test_delete_investor(self):
    #     investor_id = 1
    #     response = requests.delete(f'{BASE_URL}/investors/{investor_id}', headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # # Portfolio Company tests
    # def test_create_portfolio_company(self):
    #     payload = {
    #         "companyName": "TechCorp",
    #         "domain": "techcorp.com",
    #         "foundingDate": "2023-01-01",
    #         "industry": "Technology",
    #         "thesis": "Disruptive Innovation"
    #     }
    #     response = requests.post(f'{BASE_URL}/companies', json=payload, headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 201)
    #     self.assertIn('PortfolioCompany', response.json())

    # def test_get_all_companies(self):
    #     response = requests.get(f'{BASE_URL}/companies', headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # def test_get_company_by_id(self):
    #     company_id = 1
    #     response = requests.get(f'{BASE_URL}/companies/{company_id}', headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # def test_update_company(self):
    #     company_id = 1
    #     payload = {
    #         "companyName": "NewTechCorp"
    #     }
    #     response = requests.put(f'{BASE_URL}/companies/{company_id}', json=payload, headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # def test_delete_company(self):
    #     company_id = 1
    #     response = requests.delete(f'{BASE_URL}/companies/{company_id}', headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # # Application tests
    # def test_create_application(self):
    #     payload = {
    #         "companyId": 1,
    #         "roundId": 1,
    #         "applicationDate": "2023-08-01",
    #         "status": "Pending",
    #         "notes": "Initial application"
    #     }
    #     response = requests.post(f'{BASE_URL}/applications', json=payload, headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 201)

    # def test_get_all_applications(self):
    #     response = requests.get(f'{BASE_URL}/applications', headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # def test_get_application_by_id(self):
    #     application_id = 1
    #     response = requests.get(f'{BASE_URL}/applications/{application_id}', headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # def test_update_application(self):
    #     application_id = 1
    #     payload = {
    #         "status": "Approved"
    #     }
    #     response = requests.put(f'{BASE_URL}/applications/{application_id}', json=payload, headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # def test_delete_application(self):
    #     application_id = 1
    #     response = requests.delete(f'{BASE_URL}/applications/{application_id}', headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # # Round tests
    # def test_create_round(self):
    #     payload = {
    #         "roundName": "Seed Round",
    #         "description": "Initial funding round"
    #     }
    #     response = requests.post(f'{BASE_URL}/rounds', json=payload, headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 201)

    # def test_get_all_rounds(self):
    #     response = requests.get(f'{BASE_URL}/rounds', headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # def test_get_round_by_id(self):
    #     round_id = 1
    #     response = requests.get(f'{BASE_URL}/rounds/{round_id}', headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # def test_update_round(self):
    #     round_id = 1
    #     payload = {
    #         "roundName": "Series A"
    #     }
    #     response = requests.put(f'{BASE_URL}/rounds/{round_id}', json=payload, headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)

    # def test_delete_round(self):
    #     round_id = 1
    #     response = requests.delete(f'{BASE_URL}/rounds/{round_id}', headers=self.auth_headers())
    #     self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
