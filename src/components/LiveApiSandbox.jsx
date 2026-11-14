import { useState } from 'react';
import { X, Play, RefreshCw, Copy, Check, Database, Zap, Cpu, ArrowRight } from 'lucide-react';

const presetEndpoints = [
  {
    name: 'Health Check & DB Status',
    method: 'GET',
    path: '/api/health',
    description: 'Verify Node.js uptime, server environment, and MongoDB connection status.',
  },
  {
    name: 'Get All Projects',
    method: 'GET',
    path: '/api/projects',
    description: 'Fetch all indexed portfolio projects with likes and views.',
  },
  {
    name: 'Filter Full-Stack MERN Projects',
    method: 'GET',
    path: '/api/projects?category=Full-Stack MERN',
    description: 'Execute query filter for MERN stack applications.',
  },
  {
    name: 'Like CollabSphere (Live Mutation)',
    method: 'POST',
    path: '/api/projects/1/like',
    description: 'Execute atomic like increment in MongoDB database.',
  },
  {
    name: 'Get Live Portfolio Analytics',
    method: 'GET',
    path: '/api/analytics',
    description: 'Query aggregate metrics: page views, likes, inquiry counts.',
  },
  {
    name: 'Get Community Recommendations',
    method: 'GET',
    path: '/api/testimonials',
    description: 'Retrieve endorsements and peer reviews from database.',
  },
  {
    name: 'Send Sample Contact Inquiry',
    method: 'POST',
    path: '/api/contact',
    body: JSON.stringify(
      {
        name: 'Tech Recruiter',
        email: 'recruiter@techjobs.io',
        subject: 'MERN Developer Interview Invitation',
        message: 'Hello Chaitanya, we loved your interactive portfolio and would like to invite you for an interview.',
      },
      null,
      2
    ),
    description: 'Submit an inquiry record directly into the contact collection.',
  },
];

export function LiveApiSandbox({ isOpen, onClose }) {
  const [selectedPreset, setSelectedPreset] = useState(presetEndpoints[0]);
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('/api/health');
  const [requestBody, setRequestBody] = useState('');
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseLatency, setResponseLatency] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setMethod(preset.method);
    setEndpoint(preset.path);
    setRequestBody(preset.body || '');
  };

  const handleSend = async () => {
    setLoading(true);
    setResponseStatus(null);
    setResponseLatency(null);

    const startTime = performance.now();
    try {
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (method === 'POST' && requestBody) {
        options.body = requestBody;
      }

      const res = await fetch(endpoint, options);
      const latency = (performance.now() - startTime).toFixed(1);
      const data = await res.json();

      setResponseStatus(res.status);
      setResponseLatency(latency);
      setResponseData(data);
    } catch (err) {
      const latency = (performance.now() - startTime).toFixed(1);
      setResponseStatus('ERR');
      setResponseLatency(latency);
      setResponseData({ error: err.message, note: 'Ensure backend server is running on port 5050' });
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    if (!responseData) return;
    navigator.clipboard.writeText(JSON.stringify(responseData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border-primary bg-bg-secondary shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-primary bg-bg-elevated/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary text-white shadow-md">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-fg-primary sm:text-lg">
                Interactive MERN API Playground
              </h2>
              <p className="text-xs text-fg-tertiary">
                Dispatch live REST requests directly against the Express &amp; MongoDB backend
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-primary text-fg-secondary hover:text-accent-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Playground Grid */}
        <div className="grid flex-1 grid-cols-1 overflow-hidden md:grid-cols-[280px_1fr]">
          {/* Preset Endpoints Drawer */}
          <div className="border-r border-border-primary/80 bg-bg-tertiary/30 p-3 overflow-y-auto">
            <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-fg-tertiary">
              API Presets
            </p>
            <div className="space-y-1.5">
              {presetEndpoints.map((p) => {
                const isSelected = selectedPreset?.name === p.name;
                return (
                  <button
                    key={p.name}
                    onClick={() => handleSelectPreset(p)}
                    className={`w-full rounded-xl p-2.5 text-left transition-all ${
                      isSelected
                        ? 'border border-accent-primary/60 bg-accent-soft text-accent-primary shadow-sm'
                        : 'border border-transparent bg-bg-secondary/70 text-fg-secondary hover:border-border-primary hover:text-fg-primary'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                          p.method === 'GET'
                            ? 'bg-blue-500/20 text-blue-500'
                            : 'bg-emerald-500/20 text-emerald-500'
                        }`}
                      >
                        {p.method}
                      </span>
                      <span className="font-mono text-[10px] text-fg-tertiary truncate">
                        {p.path.split('?')[0]}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-fg-primary truncate">
                      {p.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Request & Response Workspace */}
          <div className="flex flex-col overflow-y-auto p-4 sm:p-6">
            {/* Request Bar */}
            <div className="flex items-center gap-2">
              <span
                className={`rounded-xl px-3 py-2 text-xs font-mono font-bold ${
                  method === 'GET' ? 'bg-blue-500/20 text-blue-500' : 'bg-emerald-500/20 text-emerald-500'
                }`}
              >
                {method}
              </span>
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="flex-1 rounded-xl border border-border-primary bg-bg-tertiary px-3.5 py-2 font-mono text-xs text-fg-primary outline-none focus:border-accent-primary"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary px-5 py-2 text-xs font-bold text-white shadow-md hover:opacity-90 disabled:opacity-50"
              >
                {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
                {loading ? 'Executing...' : 'Send'}
              </button>
            </div>

            {/* Description */}
            <p className="mt-2 text-xs text-fg-tertiary">
              {selectedPreset?.description}
            </p>

            {/* Request Body Editor (if POST) */}
            {method === 'POST' && (
              <div className="mt-4">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-fg-secondary">
                  JSON Request Payload
                </label>
                <textarea
                  rows={4}
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="w-full rounded-xl border border-border-primary bg-slate-950 p-3 font-mono text-xs text-emerald-400 outline-none focus:border-accent-primary resize-none"
                />
              </div>
            )}

            {/* Response Section */}
            <div className="mt-6 flex-1">
              <div className="flex items-center justify-between pb-2 border-b border-border-primary/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-fg-secondary">
                    Response
                  </span>
                  {responseStatus && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-mono font-bold ${
                        responseStatus >= 200 && responseStatus < 300
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-red-500/20 text-red-500'
                      }`}
                    >
                      HTTP {responseStatus}
                    </span>
                  )}
                  {responseLatency && (
                    <span className="text-[11px] font-mono text-fg-tertiary">
                      ⏱ {responseLatency}ms
                    </span>
                  )}
                </div>

                {responseData && (
                  <button
                    onClick={copyResponse}
                    className="flex items-center gap-1 text-xs text-fg-secondary hover:text-accent-primary"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy JSON'}
                  </button>
                )}
              </div>

              {/* Response Code Block */}
              <div className="mt-3 min-h-[160px] max-h-[340px] overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200">
                {loading ? (
                  <div className="flex h-32 items-center justify-center gap-2 text-fg-tertiary">
                    <RefreshCw className="h-5 w-5 animate-spin text-accent-primary" />
                    <span>Communicating with Express &amp; MongoDB...</span>
                  </div>
                ) : responseData ? (
                  <pre className="text-emerald-400">
                    {JSON.stringify(responseData, null, 2)}
                  </pre>
                ) : (
                  <div className="flex h-32 flex-col items-center justify-center text-center text-slate-500">
                    <Database className="mb-2 h-7 w-7 opacity-40" />
                    <p>Click "Send" to fire this request to the live backend</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
