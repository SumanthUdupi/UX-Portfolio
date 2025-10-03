from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")
        page.wait_for_selector("canvas")

        # Scroll down to trigger the animation
        page.mouse.wheel(0, 2000)
        page.wait_for_timeout(2000)  # Wait for animation to be visible

        page.screenshot(path="jules-scratch/verification/verification.png")
        browser.close()

if __name__ == "__main__":
    run()