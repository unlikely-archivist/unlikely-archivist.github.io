"""Print resume.html to the one-page PDF behind its Download PDF link.

Rerun after editing the résumé:  python3 scripts/make-resume-pdf.py
Writes assets/eryn-montgomery-resume.pdf
"""
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=4000",
                f"--print-to-pdf={ROOT / 'assets' / 'eryn-montgomery-resume.pdf'}", (ROOT / "resume.html").as_uri()],
               check=True, capture_output=True)
print("wrote assets/eryn-montgomery-resume.pdf")
