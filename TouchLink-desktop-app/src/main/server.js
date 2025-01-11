const io = require('socket.io')(4000);
const qrcode = require('qrcode');
const os = require('os');
const CryptoJs = require('crypto-js');
const { mouse, Button, Point } = require('@nut-tree-fork/nut-js');
const { ipcMain } = require('electron'); // Add this line

mouse.config.mouseSpeed = 500; // Adjust speed as needed
const key = 'process.env.key=secret@12$abcd'

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const iFace of interfaces[interfaceName]) {
      if (iFace.family == 'IPv4' && !iFace.internal && !iFace.mac.startsWith('00:50:56')) {
        return iFace.address;
      }
    }
  }
  return '127.0.0.1';
}

async function generateQR() {
  const IPv4 = getLocalIpAddress();
  const serverAddress = `ws://${IPv4}:4000`;
  const cipherAddress = CryptoJs.AES.encrypt(serverAddress, key).toString();

  try {
    const qrUrl = await qrcode.toDataURL(cipherAddress);
    return qrUrl;
  } catch (error) {
    console.error("Something went wrong:", error);
    throw error;
  }
}

function startServer() {
  io.on('connection', (socket) => {
    console.log("Device connected");

    // Send a message to the main process when a user connects
    ipcMain.emit('user-connected', true);

    socket.on('mouseMove', async (data) => {
      const { dx, dy } = data;
      const currentPos = await mouse.getPosition();
      const newPos = new Point(currentPos.x + dx, currentPos.y + dy);
      await mouse.setPosition(newPos);
    });

    socket.on('mouseClick', async (type) => {
      const button = type === 'right' ? Button.RIGHT : Button.LEFT;
      await mouse.click(button);
    });

    socket.on('mouseScroll', async (data) => {
      const { scrollY } = data;
      if (scrollY > 0) {
        await mouse.scrollDown(-scrollY);
      } else if (scrollY < 0) {
        await mouse.scrollUp(scrollY);
      }
    });

    socket.on('disconnect', () => {
      console.log('Device disconnected');
      socket.disconnect();
      ipcMain.emit('user-connected', false);
    });
  });

  console.log("websocket server started");
}

module.exports = { generateQR, startServer };
