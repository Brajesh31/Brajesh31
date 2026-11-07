import asyncio, base64, json
from pathlib import Path
from PIL import Image
from io import BytesIO
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser=await p.chromium.launch(args=["--no-sandbox","--use-gl=angle","--use-angle=swiftshader","--enable-webgl","--ignore-gpu-blocklist"])
        page=await browser.new_page(viewport={"width":960,"height":600},device_scale_factor=1)
        await page.goto("http://127.0.0.1:4173",wait_until="networkidle",timeout=120000)
        await page.wait_for_function("window.__GLOBE_READY__===true",timeout=120000)
        frames=[]
        for i in range(48):
            uri=await page.evaluate("(i)=>window.renderFrame(i,48)",i)
            frames.append(Image.open(BytesIO(base64.b64decode(uri.split(",",1)[1]))).convert("RGB"))
        Path("assets").mkdir(exist_ok=True)
        frames[0].save("assets/github-activity-globe.gif",save_all=True,append_images=frames[1:],duration=450,loop=0,optimize=True,disposal=2)
        print(f"Captured {len(frames)} true WebGL frames into animated GIF")
        await browser.close()
asyncio.run(main())
