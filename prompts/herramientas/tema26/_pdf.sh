cd "C:/Users/ruben/Desktop/HTML OFICIAL"
SIN_EXTRA=${SIN_EXTRA:-} "/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$TEMP/t26.pdf" "file:///C:/Users/ruben/Desktop/HTML OFICIAL/repaso-t26-borrador.html" >/dev/null 2>&1
grep -a -c "/Type /Page$\|/Type /Page[^s]" "$TEMP/t26.pdf"
