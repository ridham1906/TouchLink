# 📱🖥️ TouchLink

**TouchLink** is a cross-platform utility that allows you to use your Android device as a wireless touchpad for your Windows desktop. Designed for speed, simplicity, and real-time control, TouchLink provides a seamless remote input experience using WebSockets and QR-based device pairing.

---

## 🚀 Features

- 📡 **Real-Time Mouse Control**  
  Use your phone screen to control the cursor on your PC instantly via WebSockets.

- 🔒 **Secure Device Pairing**  
  Pair devices using QR code scanning to avoid manual IP entry.

- 🔄 **Cross-Platform Communication**  
  Android app (React Native) ↔ Windows desktop app (Electron + Vite)

- 📶 **Wi-Fi Based Communication**  
  Works over local Wi-Fi — no internet required!

---

## 🛠️ Tech Stack

| Platform     | Technology Used           |
|--------------|----------------------------|
| **Mobile**   | React Native (Bare Workflow) |
| **Desktop**  | Electron + Vite + Node.js   |
| **Server**   | Express.js + WebSocket      |
| **Other**    | QR Code (expo-camera, qrcode-generator) |

---

## 📷 How It Works

1. **Start the Windows App**  
   Launch the Electron desktop app — it will generate a session QR code.

2. **Open the Mobile App**  
   Use the TouchLink mobile app to scan the QR code.

3. **Pairing Successful**  
   The WebSocket connection is established — your phone is now a touchpad!

4. **Use TouchPad**  
   Swipe, tap, and scroll — everything is reflected on your desktop in real-time.
