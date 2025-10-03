import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Listen for console messages and print them to the terminal
        page.on("console", lambda msg: print(f"Browser Console ({msg.type}): {msg.text}"))

        # Go to the local server URL
        await page.goto('http://localhost:8000/index.html')

        try:
            # Wait for the first project card to be rendered by the script.
            await page.wait_for_selector('.project-card-horizontal', state='attached', timeout=10000) # Increased timeout

            # Scroll down to the projects section to ensure it's in view.
            await page.evaluate('() => { document.getElementById("projects").scrollIntoView(); }')

            # Give animations time to settle.
            await page.wait_for_timeout(2000)

            # Take a screenshot of the final state.
            await page.screenshot(path="jules-scratch/verification/verification.png")
            print("Screenshot taken successfully.")

        except Exception as e:
            print(f"An error occurred during verification: {e}")
            # Take a screenshot on error to help debug the page state.
            await page.screenshot(path="jules-scratch/verification/error.png")
            print("Error screenshot taken.")

        finally:
            await browser.close()

if __name__ == '__main__':
    asyncio.run(main())