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

---

## 🧑‍💻 Installation & Setup

### 🔌 1. Clone the Repository

```bash
git clone https://github.com/your-username/touchlink.git
cd touchlink
📱 2. Mobile App (Android)
Prerequisite: Node.js, Android Studio, Android Emulator or physical device

bash
Copy
Edit
cd client-mobile
npm install
npx react-native run-android
🖥️ 3. Desktop App (Windows)
Prerequisite: Node.js

bash
Copy
Edit
cd client-desktop
npm install
npm run dev
To build production app:

bash
Copy
Edit
npm run build
🌐 4. Server
bash
Copy
Edit
cd server
npm install
node index.js
🔐 Security & Privacy
All communication occurs over local network only.

Device pairing uses QR codes to avoid manual IP exposure.

No data is stored or shared externally.

📈 Future Features
✍️ Keyboard input from mobile

🎮 Game controller mode

🔊 Media control buttons

📡 Bluetooth/Wi-Fi Direct support

🌍 Cross-network support via secure tunneling

🙌 Credits
Developed by Ridham

Inspired by the idea of making mobile–desktop interaction seamless and wireless.

📝 License
This project is licensed under the MIT License. See LICENSE for details.
