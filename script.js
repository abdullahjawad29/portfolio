function decryptText(elementId, targetText, speed = 50, iterations = 10, charset = "!@#$%^&*()-_=+[]{}|;:,.<>?/\\~") {
  const element = document.getElementById(elementId);
  element.classList.remove("placeholder");

  let displayText = targetText.split('').map(c => (c === ' ' ? ' ' : ''));
  let revealedIndices = new Set();
  let iteration = 0;

  const update = () => {
    let result = '';

    for (let i = 0; i < targetText.length; i++) {
      if (revealedIndices.has(i) || targetText[i] === ' ') {
        result += targetText[i];
      } else {
        result += charset[Math.floor(Math.random() * charset.length)];
      }
    }

    element.textContent = result;

    if (iteration < iterations) {
      for (let i = 0; i < targetText.length; i++) {
        if (!revealedIndices.has(i) && Math.random() < 0.2) {
          revealedIndices.add(i);
        }
      }
      iteration++;
    } else {
      element.textContent = targetText;
      clearInterval(interval);
    }
  };

  const interval = setInterval(update, speed);
}

function updateStats() {
  const cpu = Math.floor(Math.random() * 40) + 10; // 10–50%
  const mem = Math.floor(Math.random() * 50) + 30; // 30–80%
  const uptime = formatUptime();

  document.getElementById("cpuUsage").textContent = `${cpu}%`;
  document.getElementById("memUsage").textContent = `${mem}%`;
  document.getElementById("uptime").textContent = uptime;
}

const ipPool = [
  "192.168.0.143",
  "10.21.54.90",
  "172.16.22.19",
  "10.0.0.251",
  "203.0.113.75",
  "198.51.100.14",
  "255.88.123.4"
];

const locations = [
  "New York, USA",
  "Frankfurt, Germany",
  "Seoul, South Korea",
  "Singapore Node",
  "London, UK",
  "Amsterdam Relay",
  "Toronto, Canada"
];

const statuses = [
  "Routing encrypted shell...",
  "Establishing reverse proxy...",
  "Validating TLS handshake...",
  "Fetching OS fingerprint...",
  "Verifying session fingerprint...",
  "Node locked — access granted",
  "Connection secured"
];

const nodeNames = [
  "RelayNode-A1",
  "PulseNode-B7",
  "Gate-9xR",
  "Core-Tunnel-03",
  "GlassNode-ΩX",
  "StealthProxy-22",
  "BeaconHub-V9"
];

const fingerprints = [
  "Arch x86_64",
  "Kali Linux",
  "Debian 12.1",
  "Parrot OS 6.0",
  "Fedora Workstation",
  "Ubuntu LTS",
  "BlackArch"
];

function generateSessionId() {
  const part = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${part()}-${part()}-${part()}`;
}

function updateHackerFeed() {
  document.getElementById("ipAddress").textContent =
    ipPool[Math.floor(Math.random() * ipPool.length)];
  document.getElementById("location").textContent =
    locations[Math.floor(Math.random() * locations.length)];
  document.getElementById("status").textContent =
    statuses[Math.floor(Math.random() * statuses.length)];
  document.getElementById("nodeName").textContent =
    nodeNames[Math.floor(Math.random() * nodeNames.length)];
  document.getElementById("fingerprint").textContent =
    fingerprints[Math.floor(Math.random() * fingerprints.length)];
  document.getElementById("sessionId").textContent = generateSessionId();
}

function formatUptime() {
  const seconds = Math.floor((Date.now() - startTime) / 1000);
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

const startTime = Date.now();

const bootMessages = [
  "Initializing Portfolio Kernel...",
  "Verifying system modules...",
  "Connecting to secure content layer...",
  "Decrypting credentials vault...",
  "Starting UI sequence...",
  "Final handshake complete."
];

const bar = document.getElementById("loading-bar");
const percent = document.getElementById("loading-percent");
const messageBox = document.getElementById("boot-messages");
const welcomeScreen = document.querySelector(".welcome-screen");
const loader = document.getElementById("loader");

let progress = 0;
let msgIndex = 0;

function addBootMessage() {
  if (msgIndex < bootMessages.length) {
    const line = document.createElement("div");
    line.textContent = `> ${bootMessages[msgIndex++]}`;
    messageBox.appendChild(line);
  }
}

function updateLoadingBar() {
  progress += Math.floor(Math.random() * 5) + 5;
  if (progress > 100) progress = 100;

  bar.style.width = `${progress}%`;
  percent.textContent = `${progress}%`;

  if (progress % 20 === 0 && msgIndex < bootMessages.length) {
    addBootMessage();
  }

  if (progress < 100) {
    setTimeout(updateLoadingBar, 250);
  } else {
    setTimeout(() => {
  loader.style.display = "none";
  welcomeScreen.style.display = "flex";
  welcomeScreen.classList.add("fade-in-fast");

  // Decryption starts AFTER welcome screen is visible
  decryptText("decryptedText", "WELCOME TO THE PORTFOLIO PROFILE OF ABDULLAH JAWAD", 30, 20);
  setTimeout(() => {
    decryptText("introText", "I’m a computer science and cybersecurity graduate student passionate about building secure systems, solving problems, software engineering,and pushing the boundaries of what’s possible with code.", 20, 25);
  }, 800);

  setInterval(updateStats, 1500);
  setInterval(updateHackerFeed, 1000);
}, 1000);
  }
}

function goToTerminal() {
  window.location.href = "Terminal.html";
}

document.addEventListener("DOMContentLoaded", () => {
  updateLoadingBar(); // Start loading screen animation
});
