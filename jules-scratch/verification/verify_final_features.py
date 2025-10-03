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
        await page.screenshot(path="jules-scratch/verification/01-hero-final.png")

        # 2. Horizontal Projects Section
        projects_container = page.locator("#projects-container")
        await projects_container.scroll_into_view_if_needed()
        await page.wait_for_timeout(500)

        # Scroll to the third project to see the animations in action
        await page.mouse.wheel(0, 3000)
        await page.wait_for_timeout(2000)
        await page.screenshot(path="jules-scratch/verification/02-projects-horizontal-final.png")

        # 3. About Me Section
        about_section = page.locator("#about")
        await about_section.scroll_into_view_if_needed()
        await page.wait_for_timeout(1500)
        await page.screenshot(path="jules-scratch/verification/03-about-final.png")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())