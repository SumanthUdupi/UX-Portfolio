import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1920, "height": 1080})

        import os
        file_path = os.path.abspath('index.html')
        await page.goto(f'file://{file_path}')

        # 1. Hero Section
        await page.wait_for_timeout(2000)
        await page.screenshot(path="jules-scratch/verification/01-hero-section-final.png")

        # 2. Horizontal Projects Section
        projects_container = page.locator("#projects-container")
        await projects_container.scroll_into_view_if_needed()
        await page.wait_for_timeout(500) # Let scroll settle

        # Scroll halfway through the horizontal track
        await page.mouse.wheel(0, 2000)
        await page.wait_for_timeout(1500) # Wait for animations (color change, etc.)
        await page.screenshot(path="jules-scratch/verification/02-projects-section-horizontal.png")

        # 3. About Me Section with Highlights
        about_section = page.locator("#about")
        await about_section.scroll_into_view_if_needed()
        await page.wait_for_timeout(1500) # Wait for highlight animations
        await page.screenshot(path="jules-scratch/verification/03-about-section-highlight.png")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())