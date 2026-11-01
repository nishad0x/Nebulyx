import React, { useState } from 'react';
import { Webhook, Bot, Database, MessageSquare, Play, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function WorkflowOrchestratorSandbox() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([
    "[SYSTEM_IDLE] Nodes initialized: Webhook, LLM Agent, Vector DB, Ops Dispatch."
  ]);

  const runPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(1);
    sound.playPing(480, 0.08);
    setLogs(["[00:00.012] Inbound Webhook: Lead received #9482"]);

    setTimeout(() => {
      setActiveStep(2);
      sound.playPing(560, 0.08);
      setLogs((prev) => [
        ...prev,
        "[00:00.048] Claude 3.5 Agent: Intent parsed as 'Enterprise Procurement' (99.4%)"
      ]);
    }, 550);

    setTimeout(() => {
      setActiveStep(3);
      sound.playPing(640, 0.08);
      setLogs((prev) => [
        ...prev,
        "[00:00.095] Database: Record committed to Postgres CRM & Vector Store"
      ]);
    }, 1100);

    setTimeout(() => {
      setActiveStep(4);
      sound.playPing(720, 0.08);
      setLogs((prev) => [
        ...prev,
        "[00:00.138] Dispatch: Slack alerted & executive calendar slot held"
      ]);
    }, 1650);

    setTimeout(() => {
      setActiveStep(5);
      setIsRunning(false);
      sound.playSuccess();
      setLogs((prev) => [
        ...prev,
        "[00:00.142] COMPLETED in 142ms. Zero manual friction."
      ]);
    }, 2200);
  };

  const steps = [
    { num: 1, name: "Inbound Webhook", desc: "Captures instant payloads", icon: Webhook },
    { num: 2, name: "Autonomous Agent", desc: "Intent classification", icon: Bot },
    { num: 3, name: "Database Upsert", desc: "Realtime atomic commit", icon: Database },
    { num: 4, name: "Ops Dispatch", desc: "Slack & Calendar sync", icon: MessageSquare }
  ];

  return (
    <div className="bg-[#090e1f] border border-white/5 rounded-2xl p-5 md:p-6 shadow-2xl relative overflow-hidden group">
      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00C8FF]/40 to-transparent" />

      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div>
          <h4 className="text-white font-semibold text-sm flex items-center gap-2">
            Autonomous Pipeline Simulator
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] animate-pulse"></span>
          </h4>
          <p className="text-xs text-slate-400">142ms multi-agent execution cycle</p>
        </div>

        <button
          onClick={runPipeline}
          disabled={isRunning}
          className="px-3.5 py-1.5 bg-white text-slate-950 font-semibold text-xs rounded-lg transition hover:bg-slate-100 disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
        >
          <Play className={`w-3 h-3 fill-current ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Orchestrating...' : 'Trigger Pipeline'}</span>
        </button>
      </div>

      {/* Nodes Graph */}
      <div className="py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
          {steps.map((st, i) => {
            const isCurrent = activeStep === st.num;
            const isDone = activeStep > st.num || activeStep === 5;
            const Icon = st.icon;

            return (
              <div
                key={i}
                className={`p-4 rounded-xl border transition-all duration-300 relative ${
                  isCurrent
                    ? 'border-[#00C8FF]/60 bg-[#0f1730] shadow-lg shadow-[#00C8FF]/10 scale-[1.02]'
                    : isDone
                    ? 'border-white/10 bg-[#090e1f]'
                    : 'border-white/5 bg-[#030712] opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                    isCurrent ? 'bg-[#00C8FF]/20 text-[#00C8FF]' : 'bg-white/5 text-slate-300'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">Step {st.num}</span>
                </div>
                <div className="text-sm font-medium text-white mb-0.5">{st.name}</div>
                <div className="text-xs text-slate-400">{st.desc}</div>

                <div className="mt-3 text-[11px] font-mono">
                  {isCurrent && <span className="text-[#00C8FF] animate-pulse">● Processing...</span>}
                  {isDone && <span className="text-emerald-400">✓ Executed</span>}
                  {!isCurrent && !isDone && <span className="text-slate-600">Standby</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Execution Terminal */}
      <div className="bg-[#030712] border border-white/5 rounded-xl p-4 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[11px] text-slate-500">
          <span>Execution Telemetry Kernel</span>
          <span className="text-[#00C8FF]">Zero Human Friction</span>
        </div>
        <div className="space-y-1.5 min-h-[85px] flex flex-col justify-end text-slate-300">
          {logs.slice(-4).map((log, index) => (
            <div key={index} className={log.includes("COMPLETED") ? "text-emerald-400 font-semibold" : "text-slate-300"}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
