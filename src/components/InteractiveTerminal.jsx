import { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, Maximize2, Minimize2, Trash2 } from 'lucide-react';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { api } from '@/services/api';

export function InteractiveTerminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `Chaitanya Gomaskar Portfolio OS [Version 1.0.0-MERN]\n(c) 2026 Chaitanya Gomaskar. All rights reserved.\nType 'help' for available commands or 'sudo hire' for special actions.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = async (e) => {
    if (e.key !== 'Enter') return;
    const raw = input.trim();
    setInput('');
    if (!raw) return;

    const newHistory = [...history, { type: 'user', text: `chaitanya@portfolio:~$ ${raw}` }];
    const cmd = raw.toLowerCase().trim();

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: `Available Commands:
  • help          - Show this list of available commands
  • about         - Display Chaitanya's engineering overview
  • skills        - Print full technical skills tree
  • projects      - List featured MERN stack projects
  • education     - View education history & credentials
  • contact       - Show contact details & links
  • ping          - Ping the MERN backend API and measure latency
  • stats         - Retrieve real-time telemetry from MongoDB
  • clear         - Clear the terminal console
  • sudo hire     - Instant recruit action!
  • exit          - Close the developer terminal`,
        });
        break;

      case 'about':
        newHistory.push({
          type: 'response',
          text: `Name: ${profile.name}
Role: ${profile.role}
Headline: ${profile.headline}
Location: ${profile.location}
Status: ${profile.availability}

Bio:
${profile.introduction}`,
        });
        break;

      case 'skills':
        const formattedSkills = skillCategories
          .map((cat) => `[${cat.title}]\n  ${cat.skills.map((s) => s.name).join(', ')}`)
          .join('\n\n');
        newHistory.push({
          type: 'response',
          text: `Chaitanya's Technical Stack:\n\n${formattedSkills}`,
        });
        break;

      case 'projects':
        const projList = projects
          .map(
            (p, idx) =>
              `${idx + 1}. ${p.title}\n   Stack: ${p.technologies.join(', ')}\n   Code: ${p.githubUrl || 'N/A'}\n   Demo: ${p.liveDemoUrl || 'N/A'}`
          )
          .join('\n\n');
        newHistory.push({
          type: 'response',
          text: `Showcasing ${projects.length} Engineering Projects:\n\n${projList}`,
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'response',
          text: `Contact Coordinates:
Email:    ${profile.email}
GitHub:   ${profile.github}
LinkedIn: ${profile.linkedin}
Location: ${profile.location}`,
        });
        break;

      case 'ping':
        newHistory.push({ type: 'system', text: 'Pinging MERN API on http://127.0.0.1:5050/api/health...' });
        const start = performance.now();
        const health = await api.getHealth();
        const latency = (performance.now() - start).toFixed(1);
        newHistory.push({
          type: 'response',
          text: `PONG! 200 OK
Latency: ${latency}ms
Status: ${health.status}
Database: ${health.database?.mode || 'Active MERN Data Store'}
Uptime: ${Math.round(health.uptime || 0)}s`,
        });
        break;

      case 'stats':
        const analytics = await api.getAnalytics();
        newHistory.push({
          type: 'response',
          text: `Live MERN Portfolio Telemetry:
  Page Views:            ${analytics.pageViews}
  Project Likes:         ${analytics.projectLikes}
  Inquiries Stored:      ${analytics.contactSubmissions || analytics.totalContacts}
  Projects Showcased:    ${analytics.totalProjects}
  Certificates Verified: ${analytics.totalCertificates}`,
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'sudo hire':
        newHistory.push({
          type: 'celebration',
          text: `🎉 EXCELLENT DECISION!
You are about to hire a relentless, passionate Full-Stack MERN Developer.
Direct line: ${profile.email}
Dispatching invitation to recruiter queue... [SUCCESS]`,
        });
        break;

      case 'exit':
        onClose();
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `command not found: "${raw}". Type 'help' to view valid commands.`,
        });
        break;
    }

    setHistory(newHistory);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div
        className={`relative z-10 flex flex-col overflow-hidden rounded-2xl border border-border-primary bg-slate-950 font-mono text-xs text-slate-200 shadow-2xl transition-all duration-300 ${
          isMaximized ? 'h-[95vh] w-[95vw]' : 'h-[75vh] w-full max-w-3xl'
        }`}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80 cursor-pointer" onClick={() => setHistory([])} />
            <span className="h-3 w-3 rounded-full bg-green-500/80 cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} />
            <span className="ml-2 flex items-center gap-1.5 text-slate-400">
              <TerminalIcon className="h-3.5 w-3.5" />
              chaitanya@portfolio-cli: ~
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setHistory([])}
              title="Clear terminal"
              className="p-1 hover:text-white"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:text-white"
            >
              {isMaximized ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </button>
            <button onClick={onClose} className="p-1 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Console Log Area */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-2 leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div key={idx} className="whitespace-pre-wrap">
              {item.type === 'user' && (
                <span className="font-bold text-sky-400">{item.text}</span>
              )}
              {item.type === 'response' && (
                <span className="text-emerald-300">{item.text}</span>
              )}
              {item.type === 'system' && (
                <span className="text-slate-400">{item.text}</span>
              )}
              {item.type === 'celebration' && (
                <span className="font-bold text-amber-300">{item.text}</span>
              )}
              {item.type === 'error' && (
                <span className="text-rose-400">{item.text}</span>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-sky-400 font-bold shrink-0">chaitanya@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent text-emerald-300 outline-none border-none p-0 focus:ring-0"
              placeholder="type 'help' or command..."
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Terminal Bottom Help Bar */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/60 px-4 py-1.5 text-[10px] text-slate-400">
          <span>Tip: Try typing <code className="text-sky-400">ping</code> or <code className="text-sky-400">stats</code></span>
          <span>Press ESC or type <code className="text-sky-400">exit</code> to close</span>
        </div>
      </div>
    </div>
  );
}
