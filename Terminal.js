// Boot sequence
const bootLines = [
  "[ OK ] Initializing portfolio kernel...",
  "[ OK ] Mounting creativity modules...",
  "[ OK ] Loading hacking tools...",
  "[WARN] VPN tunnel unstable — resolving...",
  "[ OK ] Connection stabilized.",
  "[ OK ] Authenticating user...",
  "[ OK ] Welcome, GUEST USER.",
  "Type 'help' to begin."
];

const bootDiv = document.getElementById("boot-lines");
const terminalWrapper = document.querySelector(".terminal-wrapper");

let bootIndex = 0;

function showNextBootLine() {
  if (bootIndex < bootLines.length) {
    const line = document.createElement("div");
    line.textContent = bootLines[bootIndex++];
    bootDiv.appendChild(line);
    setTimeout(showNextBootLine, 500);
  } else {
    setTimeout(() => {
      document.getElementById("boot-sequence").style.display = "none";
      terminalWrapper.classList.remove("hidden");
      document.getElementById("cmd-input").focus();
    }, 1000);
  }
}

showNextBootLine();

// Uptime tracker
let startTime = Date.now();
setInterval(() => {
  const now = Date.now();
  const secs = Math.floor((now - startTime) / 1000);
  const h = String(Math.floor(secs / 3600)).padStart(2, '0');
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  document.getElementById("uptime").textContent = `${h}:${m}:${s}`;
}, 1000);

// Terminal logic
const cmdInput = document.getElementById("cmd-input");
const output = document.getElementById("terminal-output");

const commands = {
  help: `Available commands:
PROFILE COMMANDS:
- credentials
- projects
- experience
- about
SYSTEM COMMANDS:
- help
- sysinfo
- fortune
- sudo
- clear
- exit
- whoami
- banner
- date
- roll
- matrix
- nmap
- backdoor
- access
- disconnect
- connect
- exploit
- 42
- chatgpt
- singularity`,

 credentials: () => {
    output.innerHTML += `Loading credentials...\n`;
    setTimeout(() => {
      window.location.href = "credentials.html";
    }, 800);
  },
  projects: () => "Redirecting to projects...",
  experience: () => "Redirecting to experience...",
  about: () => "Redirecting to about...",

  sudo: "Permission denied. This incident will be reported 😎",
  sysinfo: JSON.stringify({
    cpu: `${Math.floor(Math.random() * 40) + 30}%`,
    memory: `${Math.floor(Math.random() * 50) + 30}%`,
    node: "aj-secure-node-17",
    location: "Redacted",
    access: "granted"
  }, null, 2),

  fortune: [
    "We are the tools of our tools.",
    "Access is a privilege, not a right.",
    "Hack the planet!",
    "Code like no one’s watching."
  ][Math.floor(Math.random() * 4)],

  clear: () => { output.innerHTML = "" },
  exit: () => { window.location.href = "index.html" },

  whoami: "Abdullah Jawad — Developer and Cybersecurity Enthusiast",
  banner: `
╔═══════════════════════════════════════╗
║     WELCOME TO AJ-HACKTERM SYSTEM    ║
║       ALL ACTIVITY IS MONITORED      ║
╚═══════════════════════════════════════╝`,
  date: () => new Date().toString(),
  roll: () => `You rolled a ${Math.floor(Math.random() * 6) + 1}`,
  matrix: "Follow the white rabbit...",
  nmap: `Scanning... 1337 ports open
- 22 (SSH)
- 443 (HTTPS)
- 31337 (Backdoor)`,
  backdoor: "Backdoor access granted. Initiating sandbox mode...",
  access: "🔐 Access granted. Welcome, Commander.",
  disconnect: "🔌 Disconnecting from mainframe... [complete]",
  connect: "🔗 Secure link established. Status: Green.",
  exploit: "Buffer overflow triggered... flag{just_kidding_but_fun}",
  42: "The answer to life, the universe, and everything.",
  chatgpt: "Sorry, I cannot help you here. Try typing 'help' 😁",
  singularity: "Event horizon approaching... all bets are off."
};

// Terminal input handler
cmdInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = cmdInput.value.trim();
    output.innerHTML += `\naj@portfolio:~$ ${cmd}\n`;

    if (commands[cmd]) {
      const result = typeof commands[cmd] === "function" ? commands[cmd]() : commands[cmd];
      if (result !== undefined) output.innerHTML += `${result}\n`;
    } else if (["credentials", "projects", "about", "experience"].includes(cmd)) {
      output.innerHTML += `Loading ${cmd}...\n`;
      setTimeout(() => {
        window.location.href = `${cmd}.html`;
      }, 1000);
    } else if (cmd.startsWith("echo ")) {
      output.innerHTML += cmd.slice(5) + "\n";
    } else {
      output.innerHTML += "Unknown command. Type 'help' to see available commands.\n";
    }

    cmdInput.value = "";
    output.scrollTop = output.scrollHeight;
  }
});