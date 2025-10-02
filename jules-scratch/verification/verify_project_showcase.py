import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the local HTML file
        file_path = os.path.abspath('index.html')
        await page.goto(f'file://{file_path}')

        # Scroll to the projects section
        await page.locator('#personal-projects').scroll_into_view_if_needed()

        # Wait for the animations to settle
        await page.wait_for_timeout(1000)

        # Take a screenshot of the projects section
        await page.locator('.interactive-projects-container').screenshot(path='jules-scratch/verification/project_showcase.png')

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())