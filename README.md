# PharmaCast

Simple web page for pharmacy counseling scripts with:
- Text-to-speech playback (Vietnamese voice when available)
- QR code to open the current page on mobile

## Files
- `cast.html`
- `styles.css`
- `script.js`

## Run with VS Code Go Live

1. Open folder `pharmacycast` in VS Code.
2. Install extension **Live Server** (by Ritwick Dey) if you do not have it.
3. Open `cast.html`.
4. Click **Go Live** in the bottom-right corner of VS Code.
5. Browser opens automatically (usually on `http://127.0.0.1:5500/cast.html`).

## Open on phone (same Wi-Fi)

1. Make sure your phone and computer are connected to the same Wi-Fi network.
2. Use your computer LAN IP in the URL, for example:
   `http://192.168.x.x:5500/cast.html`
3. Open that LAN URL on your computer browser first.
4. Scan the QR code shown on the page.

Note:
- If you open with `file://` (double-click html), phone cannot access it.
- Use Go Live (web server) instead.

## If you see "This site can't be reached"

1. Ensure URL is LAN IP, not `localhost` or `127.0.0.1`.
2. Set Windows network profile to **Private**.
3. Allow port `5500` through Windows Firewall (Private profile).
4. Keep VS Code Live Server running while testing.

## Browser support

For speech playback, use newer versions of:
- Chrome
- Edge
- Safari

If Vietnamese voice is missing on your device, browser may fallback to another available voice.
