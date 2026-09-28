"""Print resume.html to a one-page PDF for sending to employers, with a phone number added.

The phone number is passed in, never stored, so it stays off the public site and out of git:
  python3 scripts/make-resume-pdf.py 504-555-0100
Writes eryn-montgomery-resume.pdf in the project root (gitignored).
"""
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

phone = sys.argv[1]
page = (ROOT / "resume.html").read_text()
anchor = "New Orleans, LA · "
assert anchor in page, "contact line changed; update the anchor in this script"
# temp copy sits beside resume.html so style.css resolves
temp = ROOT / "resume-print-temp.html"
temp.write_text(page.replace(anchor, f"{anchor}{phone} · ", 1))
try:
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=4000",
                    f"--print-to-pdf={ROOT / 'eryn-montgomery-resume.pdf'}", temp.as_uri()],
                   check=True, capture_output=True)
finally:
    temp.unlink()
print("wrote eryn-montgomery-resume.pdf")
