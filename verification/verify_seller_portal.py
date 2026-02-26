from playwright.sync_api import sync_playwright

def verify_seller_portal():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # 1. Verify Dashboard
        try:
            print("Navigating to Dashboard...")
            page.goto("http://localhost:3000/seller/dashboard")
            page.wait_for_selector('text=Dashboard', timeout=10000)
            print("Dashboard loaded.")
            page.screenshot(path="verification/dashboard.png")
            print("Dashboard screenshot saved.")
        except Exception as e:
            print(f"Error verifying Dashboard: {e}")

        # 2. Verify Products List
        try:
            print("Navigating to Products List...")
            page.goto("http://localhost:3000/seller/products")
            page.wait_for_selector('text=My Products', timeout=10000)
            print("Products List loaded.")
            page.screenshot(path="verification/products.png")
            print("Products screenshot saved.")
        except Exception as e:
            print(f"Error verifying Products List: {e}")

        # 3. Verify Add Product Page
        try:
            print("Navigating to Add Product Page...")
            page.goto("http://localhost:3000/seller/products/add")
            page.wait_for_selector('text=Add New Product', timeout=10000)
            print("Add Product Page loaded.")
            page.screenshot(path="verification/add_product.png")
            print("Add Product screenshot saved.")
        except Exception as e:
            print(f"Error verifying Add Product Page: {e}")

        browser.close()

if __name__ == "__main__":
    verify_seller_portal()
