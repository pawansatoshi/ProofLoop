import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Activity, ArrowUpRight, Check, CheckCircle2, CircleDashed, Clock3, Code2, FileCheck2, LockKeyhole, Play, RotateCcw, ShieldCheck, Sparkles, Terminal, X, Zap } from "lucide-react"
import './styles.css'

type Status = 'proven' | 'failed' | 'pending'
type Requirement = { id: string; title: string; description: string; status: Status; evidence?: string; duration?: string }

type Run = { id: string; label: string; status: 'passed' | 'failed'; time: string; detail: string }

const initialRequirements: Requirement[] = [
  { id: 'R1', title: 'Create project', description: 'A user can create a project from the dashboard.', status: 'proven', evidence: 'Browser state + screenshot', duration: '1.8s' },
  { id: 'R2', title: 'Add task', description: 'A task can be added to an existing project.', status: 'proven', evidence: 'Browser state + screenshot', duration: '2.1s' },
  { id: 'R3', title: 'Complete task', description: 'A task can be marked complete and reflected in the UI.', status: 'proven', evidence: 'DOM assertion + screenshot', duration: '2.4s' },
  { id: 'R4', title: 'Delete task', description: 'Deleting a task removes it from the visible task list.', status: 'pending' },
  { id: 'R5', title: 'Dashboard state', description: 'Project and task state remains internally consistent.', status: 'pending' },
]

const initialRuns: Run[] = [
  { id: 'run-004', label: 'Release verification', status: 'failed', time: 'Today · 09:42', detail: 'R4 failed: delete action did not remove the task.' },
  { id: 'run-003', label: 'Regression suite', status: 'passed', time: 'Today · 09:39', detail: '3 of 3 completed checks passed.' },
]

function App() {
  const [requirements, setRequirements] = useState(initialRequirements)
  const [runs, setRuns] = useState(initialRuns)
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'evidence'>('overview')
  const [toast, setToast] = useState('')
  const [demo, setDemo] = useState<'idle' | 'failing' | 'repairing' | 'verified'>('idle')

  const proven = requirements.filter(r => r.status === 'proven').length
  const failed = requirements.filter(r => r.status === 'failed').length
  const releaseApproved = proven === requirements.length
  const progress = Math.round((proven / requirements.length) * 100)

  const gateLabel = releaseApproved ? 'RELEASE APPROVED' : failed ? 'RELEASE BLOCKED' : 'VERIFICATION IN PROGRESS'

  const statusText = useMemo(() => {
    if (demo === 'failing') return 'Kane found a requirement failure.'
    if (demo === 'repairing') return 'AI repair is applying the smallest safe fix.'
    if (demo === 'verified') return 'All requirements have been proven.'
    return 'Ready for live Kane verification.'
  }, [demo])

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(t)
  }, [toast])

  function startDemo() {
    setDemo('failing')
    setRequirements(rs => rs.map(r => r.id === 'R4' ? { ...r, status: 'failed', evidence: 'Kane evidence: task remained visible', duration: '2.7s' } : r))
    setRuns(rs => [{ id: `run-${Date.now()}`, label: 'Kane browser verification', status: 'failed', time: 'Just now', detail: 'R4 failed: task remained visible after delete.' }, ...rs])
    setToast('Controlled failure reproduced — evidence is ready for repair.')
  }

  function repair() {
    setDemo('repairing')
    setToast('Repair loop started. Re-running the affected requirement…')
    window.setTimeout(() => {
      setRequirements(rs => rs.map(r => r.id === 'R4' ? { ...r, status: 'proven', evidence: 'Kane evidence: task removed', duration: '2.3s' } : r))
      setRequirements(rs => rs.map(r => r.id === 'R5' ? { ...r, status: 'proven', evidence: 'Kane evidence: dashboard state consistent', duration: '2.0s' } : r))
      setRuns(rs => [{ id: `run-${Date.now()}`, label: 'Kane re-verification', status: 'passed', time: 'Just now', detail: '5 of 5 requirements proven.' }, ...rs])
      setDemo('verified')
      setToast('Verification passed — release gate is approved.')
    }, 1200)
  }

  function reset() {
    setRequirements(initialRequirements)
    setRuns(initialRuns)
    setDemo('idle')
    setToast('Demo reset. Ready for live Kane verification.')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><ShieldCheck size={19} /></div><div><strong>ProofLoop</strong><span>AI verification gate</span></div></div>
        <nav>
          <button className={activeTab === 'overview' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('overview')}><Activity size={17}/> Overview</button>
          <button className={activeTab === 'requirements' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('requirements')}><FileCheck2 size={17}/> Requirements <b>{requirements.length}</b></button>
          <button className={activeTab === 'evidence' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('evidence')}><LockKeyhole size={17}/> Evidence</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="mini-card"><span className="eyebrow">CURRENT BUILD</span><strong>proofboard #001</strong><span className="muted">main · local</span></div>
          <a className="github-link" href="https://github.com/pawansatoshi/ProofLoop" target="_blank" rel="noreferrer"><Code2 size={16}/> Repository <ArrowUpRight size={14}/></a>
        </div>
      </aside>

      <main className="main">
        <header className="topbar"><div><span className="eyebrow">RELEASE CONTROL</span><h1>ProofLoop <span>/</span> proofboard</h1></div><div className="top-actions"><span className="live-dot"><i/> Live workspace</span><button className="icon-btn" onClick={reset} title="Reset demo"><RotateCcw size={16}/></button></div></header>

        <section className="hero-grid">
          <div className="hero-card">
            <div className="hero-copy"><div className="kicker"><Sparkles size={14}/> EVIDENCE-BASED DELIVERY</div><h2>AI builds. <em>Kane verifies.</em><br/>Evidence decides.</h2><p>ProofLoop turns browser verification into a deterministic release gate for AI-built software.</p></div>
            <div className="hero-actions"><button className="primary" onClick={startDemo}><Play size={15} fill="currentColor"/> Run verification demo</button><button className="secondary" onClick={() => setActiveTab('requirements')}>View requirements</button></div>
          </div>
          <div className={`gate-card ${releaseApproved ? 'approved' : ''}`}><div className="gate-top"><span className="eyebrow">RELEASE GATE</span><span className="status-pill"><i/>{releaseApproved ? 'Approved' : failed ? 'Blocked' : 'Pending'}</span></div><div className="gate-score"><strong>{proven}</strong><span>/ {requirements.length} proven</span></div><div className="progress"><i style={{ width: `${progress}%` }}/></div><p>{gateLabel}</p><div className="gate-foot"><Clock3 size={14}/> {statusText}</div></div>
        </section>

        {activeTab === 'overview' && <>
          <section className="metrics"><Metric icon={<CheckCircle2/>} label="Proven" value={`${proven}/${requirements.length}`} sub="requirements"/><Metric icon={<CircleDashed/>} label="Coverage" value={`${progress}%`} sub="verified surface"/><Metric icon={<Zap/>} label="Last run" value="2.3s" sub="browser execution"/><Metric icon={<Terminal/>} label="Evidence" value={String(requirements.filter(r => r.evidence).length)} sub="artifacts linked"/></section>
          <section className="content-grid">
            <div className="panel"><div className="panel-head"><div><span className="eyebrow">REQUIREMENTS</span><h3>Proof matrix</h3></div><button className="text-btn" onClick={() => setActiveTab('requirements')}>Open matrix <ArrowUpRight size={14}/></button></div><div className="req-list">{requirements.map(r => <RequirementRow key={r.id} requirement={r}/>)}</div></div>
            <div className="panel"><div className="panel-head"><div><span className="eyebrow">VERIFICATION HISTORY</span><h3>Recent runs</h3></div></div><div className="run-list">{runs.slice(0,4).map(run => <RunRow key={run.id} run={run}/>)}</div></div>
          </section>
        </>}

        {activeTab === 'requirements' && <section className="panel full-panel"><div className="panel-head"><div><span className="eyebrow">REQUIREMENT MATRIX</span><h3>Every release claim must be proven</h3></div><div className="matrix-summary">{proven} passed · {failed} failed · {requirements.length - proven - failed} pending</div></div><div className="req-table">{requirements.map(r => <RequirementRow key={r.id} requirement={r} expanded/>)}</div></section>}

        {activeTab === 'evidence' && <section className="evidence-layout"><div className="panel evidence-main"><div className="panel-head"><div><span className="eyebrow">EVIDENCE LEDGER</span><h3>What the browser actually proved</h3></div><span className="sealed"><LockKeyhole size={13}/> Evidence-backed</span></div>{requirements.filter(r => r.evidence).map(r => <div className="evidence-row" key={r.id}><div className="evidence-icon"><Check size={15}/></div><div><strong>{r.id} · {r.title}</strong><span>{r.evidence}</span></div><time>{r.duration}</time></div>)}{requirements.filter(r => !r.evidence).length > 0 && <div className="empty-evidence"><CircleDashed size={20}/><span>Pending live Kane evidence for {requirements.filter(r => !r.evidence).length} requirement(s).</span></div>}</div><div className="panel repair-panel"><span className="eyebrow">REPAIR LOOP</span><h3>Failure → evidence → fix</h3><p>When Kane detects a regression, the agent receives the failure context and repairs the smallest affected surface before re-verification.</p><div className="flow"><FlowStep n="01" label="Kane fails"/><FlowStep n="02" label="Capture evidence"/><FlowStep n="03" label="Agent repairs"/><FlowStep n="04" label="Kane re-runs"/></div>{demo === 'failing' && <button className="primary wide" onClick={repair}><Code2 size={15}/> Repair and re-verify</button>}{demo === 'repairing' && <div className="repairing"><span className="spinner"/> Applying repair and re-running verification…</div>}{demo === 'verified' && <div className="success-banner"><CheckCircle2 size={18}/><div><strong>Self-healing cycle complete</strong><span>5/5 requirements are proven.</span></div></div>}</div></section>}

        <footer><span>ProofLoop · evidence-first release control</span><span>AI builds · Kane verifies · evidence decides</span></footer>
      </main>
      {toast && <div className="toast"><CheckCircle2 size={16}/>{toast}</div>}
    </div>
  )
}

function Metric({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) { return <div className="metric"><div className="metric-icon">{icon}</div><div><span>{label}</span><strong>{value}</strong><small>{sub}</small></div></div> }
function RequirementRow({ requirement: r, expanded = false }: { requirement: Requirement; expanded?: boolean }) { return <div className={`req-row ${expanded ? 'expanded' : ''}`}><div className={`req-status ${r.status}`}>{r.status === 'proven' ? <Check size={14}/> : r.status === 'failed' ? <X size={14}/> : <CircleDashed size={14}/>}</div><div className="req-main"><strong>{r.id} · {r.title}</strong><span>{r.description}</span>{expanded && r.evidence && <small><FileCheck2 size={12}/> {r.evidence}</small>}</div><div className="req-state">{r.status === 'proven' ? 'PROVEN' : r.status === 'failed' ? 'FAILED' : 'PENDING'}</div></div> }
function RunRow({ run }: { run: Run }) { return <div className="run-row"><div className={`run-icon ${run.status}`}>{run.status === 'passed' ? <Check size={14}/> : <X size={14}/>}</div><div><strong>{run.label}</strong><span>{run.detail}</span><small>{run.time}</small></div></div> }
function FlowStep({ n, label }: { n: string; label: string }) { return <div className="flow-step"><span>{n}</span><strong>{label}</strong></div> }

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>)
