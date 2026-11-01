import React, { useState } from 'react';
import { GitBranch, Play, CheckCircle2, ArrowRight, Bot, Database, MessageSquare, Webhook, Clock, Terminal } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function WorkflowOrchestratorSandbox() {
  const [activeStep, setActiveStep] = useState(0); // 0: idle, 1, 2, 3, 4: running steps, 5: complete
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([
    "[SYSTEM_IDLE] Ready for pipeline execution.",
    "[STATUS] Nodes connected: Webhook, LLM Agent, Vector DB, Slack Ops."
  ]);

  const runPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(1);
    sound.playPing(480, 0.08);
    setLogs(["[00:00.012] Inbound Webhook received: Enterprise Lead #9482"]);

    setTimeout(() => {
      setActiveStep(2);
      sound.playPing(560, 0.08);
      setLogs((prev) => [
        ...prev,
        "[00:00.048] Claude 3.5 AI Agent: Intent parsed as 'Enterprise Procurement' (Confidence: 99.4%)"
      ]);
    }, 600);

    setTimeout(() => {
      setActiveStep(3);
      sound.playPing(640, 0.08);
      setLogs((prev) => [
        ...prev,
        "[00:00.095] Database: Record committed to Supabase Enterprise CRM & Vector Memory"
      ]);
    }, 1200);

    setTimeout(() => {
      setActiveStep(4);
      sound.playPing(720, 0.08);
      setLogs((prev) => [
        ...prev,
        "[00:00.138] Slack Ops Bot: High-priority channel alerted + calendar invitation dispatched"
      ]);
    }, 1800);

    setTimeout(() => {
      setActiveStep(5);
      setIsRunning(false);
      sound.playSuccess();
      setLogs((prev) => [
        ...prev,
        "[00:00.142] COMPLETED in 142ms. Zero human intervention required."
      ]);
    }, 2400);
  };

  const steps = [
    {
      num: 1,
      name: "Inbound Webhook",
      desc: "Captures instant payloads",
      icon: Webhook,
      color: "border-indigo-500/40 text-indigo-400 bg-indigo-500/10"
    },
    {
      num: 2,
      name: "AI Autonomous Agent",
      desc: "Claude 3.5 Intent Extraction",
      icon: Bot,
      color: "border-purple-500/40 text-purple-400 bg-purple-500/10"
    },
    {
      num: 3,
      name: "Cloud Database Sync",
      desc: "Postgres / Vector Upsert",
      icon: Database,
      color: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10"
    },
    {
      num: 4,
      name: "Instant Dispatch",
      desc: "Slack / Email / CRM Alert",
      icon: MessageSquare,
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
    }
  ];

  return (
    <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl overflow-hidden p-5 md:p-6 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm md:text-base flex items-center gap-2">
              Autonomous Pipeline Sandbox
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                142ms CYCLE
              </span>
            </h4>
            <p className="text-xs text-slate-400">Live multi-agent orchestration simulator</p>
          </div>
        </div>

        <button
          onClick={runPipeline}
          disabled={isRunning}
          className="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs rounded-lg flex items-center gap-2 transition shadow-lg shadow-indigo-500/20 disabled:opacity-50"
        >
          <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
          {isRunning ? 'Orchestrating Agents...' : 'Trigger Autonomous Pipeline'}
        </button>
      </div>

      {/* Visual Node Flow Graph */}
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
                    ? 'border-indigo-400 bg-indigo-950/40 shadow-lg shadow-indigo-500/20 scale-[1.02]'
                    : isDone
                    ? 'border-emerald-500/40 bg-slate-900/60'
                    : 'border-slate-800/80 bg-slate-950/60 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${st.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Node {st.num}</span>
                </div>
                <div className="text-sm font-semibold text-white mb-1">{st.name}</div>
                <div className="text-xs text-slate-400">{st.desc}</div>

                <div className="mt-3 flex items-center gap-1.5 text-[11px]">
                  {isCurrent && (
                    <span className="text-indigo-400 font-mono flex items-center gap-1 animate-pulse">
                      <Clock className="w-3 h-3" /> Processing...
                    </span>
                  )}
                  {isDone && (
                    <span className="text-emerald-400 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Executed
                    </span>
                  )}
                  {!isCurrent && !isDone && (
                    <span className="text-slate-500 font-mono">Standby</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Execution Terminal Logs */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Nebulyx Workflow Orchestrator Kernel</span>
          </div>
          <span className="text-emerald-400">0 Human Bottlenecks</span>
        </div>
        <div className="space-y-1 text-slate-300 min-h-[90px] flex flex-col justify-end">
          {logs.slice(-4).map((log, index) => (
            <div
              key={index}
              className={`leading-relaxed ${
                log.includes("COMPLETED")
                  ? "text-emerald-300 font-bold"
                  : log.includes("Inbound")
                  ? "text-cyan-300"
                  : log.includes("Claude")
                  ? "text-purple-300"
                  : "text-slate-300"
              }`}
            >
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

