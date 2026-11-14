import { spawn } from 'child_process';

const cyan = '\x1b[36m';
const magenta = '\x1b[35m';
const reset = '\x1b[0m';
const gray = '\x1b[90m';

console.log(`${gray}Starting MERN Stack (Backend Server + Vite Client)...${reset}\n`);

// Start Backend Server
const server = spawn('node', ['server/server.js'], {
  stdio: 'pipe',
  shell: true,
  env: process.env,
});

server.stdout.on('data', (data) => {
  process.stdout.write(`${cyan}[SERVER]${reset} ${data}`);
});

server.stderr.on('data', (data) => {
  process.stderr.write(`${cyan}[SERVER]${reset} ${data}`);
});

// Start Frontend Client (Vite)
const client = spawn('./node_modules/.bin/vite', [], {
  stdio: 'pipe',
  shell: true,
  env: process.env,
});

client.stdout.on('data', (data) => {
  process.stdout.write(`${magenta}[CLIENT]${reset} ${data}`);
});

client.stderr.on('data', (data) => {
  process.stderr.write(`${magenta}[CLIENT]${reset} ${data}`);
});

// Clean exit handling
function cleanup() {
  console.log(`\n${gray}Shutting down MERN processes...${reset}`);
  server.kill('SIGTERM');
  client.kill('SIGTERM');
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
