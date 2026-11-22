"""Screenshot each project demo listed in scripts/project-screenshots.json.

Rerun to refresh:  python3 scripts/capture-project-screenshots.py [name ...]
Writes assets/screens/<name>.webp. Uses the installed Google Chrome.

Each entry: {"name", "url", optional "mobile": true, "full_page": true, "element": selector to crop to,
             "steps": [["fill", selector, text] | ["click", selector] | ["press", key] | ["wait", ms]
                       | ["upload", file-input selector, path relative to the site root] | ["eval", js]]}
"""
import io
import json
import sys
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "screens"
# Normal browser user agents: some hosts (e.g. val.run behind Cloudflare) block "HeadlessChrome".
DESKTOP = {"viewport": {"width": 1280, "height": 800}, "device_scale_factor": 1,
           "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36"}
MOBILE = {"viewport": {"width": 390, "height": 844}, "device_scale_factor": 2, "is_mobile": True, "has_touch": True,
          "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"}

entries = json.loads((ROOT / "scripts" / "project-screenshots.json").read_text())
only = set(sys.argv[1:])
OUT.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome")
    for e in entries:
        if only and e["name"] not in only:
            continue
        page = browser.new_context(**(MOBILE if e.get("mobile") else DESKTOP)).new_page()
        try:
            page.goto(e["url"], wait_until="load", timeout=45000)
            for step in e.get("steps", []):
                action, *args = step
                if action == "fill":
                    page.fill(args[0], args[1])
                elif action == "click":
                    page.click(args[0])
                elif action == "press":
                    page.keyboard.press(args[0])
                elif action == "eval":
                    page.evaluate(args[0])
                elif action == "upload":
                    page.set_input_files(args[0], str(ROOT / args[1]))
                elif action == "wait":
                    page.wait_for_timeout(args[0])
            page.wait_for_timeout(2500)
            if e.get("element"):
                png = page.locator(e["element"]).first.screenshot()
            else:
                png = page.screenshot(full_page=e.get("full_page", False))
            Image.open(io.BytesIO(png)).convert("RGB").save(OUT / f"{e['name']}.webp", "WEBP", quality=82)
            print(f"ok   {e['name']}")
        except Exception as err:
            print(f"FAIL {e['name']}: {err}".splitlines()[0])
        finally:
            page.context.close()
    browser.close()
