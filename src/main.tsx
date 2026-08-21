import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Activity, ArrowUpRight, Check, CheckCircle2, CircleDashed, Clock3, Code2, FileCheck2, LockKeyhole, Play, Plus, RotateCcw, ShieldCheck, Sparkles, SquareCheckBig, Terminal, Trash2, X, Zap } from 'lucide-react'
import './styles.css'

type Status = 'proven' | 'failed' | 'pending'
type Requirement = { id: string; title: string; description: string; status: Status; evidence?: string; duration?: string }
type Run = { id: string; label: string; status: 'passed' | 'failed'; time: string; detail: string }
type Task = { id: string; title: string; completed: boolean }
type Project = { id: string; name: string; tasks: Task[] }

const initialRequirements: Requirement[] = [
  { id: 'R1', title: 'Create project', description: 'A user can create a project from the ProofBoard.', status: 'pending' },
  { id: 'R2', title: 'Add task', description: 'A task can be added to an existing project.', status: 'pending' },
  { id: 'R3', title: 'Complete task', description: 'A task can be marked complete and reflected in the UI.', status: 'pending' },
  { id: 'R4', title: 'Delete task', description: 'Deleting a task removes it from the visible task list.', status: 'pending' },
  { id: 'R5', title: 'Dashboard state', description: 'Project and task state remains internally consistent.', status: 'pending' },
]

const initialRuns: Run[] = [
  { id: 'run-004', label: 'Release verification', status: 'failed', time: 'Demo fixture', detail: 'R4 failed: delete action did not remove the task.' },
  { id: 'run-003', label: 'Regression suite', status: 'passed', time: 'Demo fixture', detail: '3 of 3 completed checks passed.' },
]

function App() {
  const [requirements, setRequirements] = useState(initialRequirements)
  const [runs, setRuns] = useState(initialRuns)
  const [activeTab, setActiveTab] = useState<'overview' | 'proofboard' | 'requirements' | 'evidence'>('overview')
  const [toast, setToast] = useState('')
  const [demo, setDemo] = useState<'idle' | 'failing' | 'repairing' | 'verified'>('idle')
  const [projects, setProjects] = useState<Project[]>([])
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [projectName, setProjectName] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [deletedTaskCount, setDeletedTaskCount] = useState(0)

  const activeProject = projects.find(project => project.id === activeProjectId) ?? projects[0] ?? null
  const totalTasks = projects.reduce((sum, project) => sum + project.tasks.length, 0)
  const completedTasks = projects.reduce((sum, project) => sum + project.tasks.filter(task => task.completed).length, 0)
  const appFlowCoverage = Math.round(([projects.length > 0, totalTasks > 0, completedTasks > 0, deletedTaskCount > 0, projects.every(project => project.name.trim() && project.tasks.every(task => task.title.trim()))].filter(Boolean).length / 5) * 100)

  const proven = requirements.filter(r => r.status === 'proven').length
  const failed = requirements.filter(r => r.status === 'failed').length
  const releaseApproved = proven === requirements.length
  const progress = Math.round((proven / requirements.length) * 100)
  const gateLabel = releaseApproved ? 'RELEASE APPROVED' : failed ? 'RELEASE BLOCKED' : 'VERIFICATION IN PROGRESS'

  const statusText = useMemo(() => {
    if (demo === 'failing') return 'Controlled demo failure — not live Kane evidence.'
    if (demo === 'repairing') return 'Demo repair is applying the smallest safe fix.'
    if (demo === 'verified') return 'Demo cycle complete — run Kane for genuine proof.'
    return 'Ready for live Kane verification.'
  }, [demo])

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(t)
  }, [toast])

  function createProject() {
    const name = projectName.trim()
    if (!name) {
      setToast('Enter a project name first.')
      return
    }
    const project: Project = { id: `project-${Date.now()}`, name, tasks: [] }
    setProjects(current => [...current, project])
    setActiveProjectId(project.id)
    setProjectName('')
    setToast(`Project "${name}" created.`)
  }

  function addTask() {
    const title = taskTitle.trim()
    if (!activeProject || !title) {
      setToast(activeProject ? 'Enter a task title first.' : 'Create a project first.')
      return
    }
    const task: Task = { id: `task-${Date.now()}`, title, completed: false }
    setProjects(current => current.map(project => project.id === activeProject.id ? { ...project, tasks: [...project.tasks, task] } : project))
    setTaskTitle('')
    setToast('Task added to the active project.')
  }

  function toggleTask(taskId: string) {
    if (!activeProject) return
    setProjects(current => current.map(project => project.id === activeProject.id ? { ...project, tasks: project.tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task) } : project))
  }

  function deleteTask(taskId: string) {
    if (!activeProject) return
    setProjects(current => current.map(project => project.id === activeProject.id ? { ...project, tasks: project.tasks.filter(task => task.id !== taskId) } : project))
    setDeletedTaskCount(count => count + 1)
    setToast('Task deleted from the active project.')
  }

  function startDemo() {
    setDemo('failing')
    setRequirements(rs => rs.map(r => r.id === 'R4' ? { ...r, status: 'failed', evidence: 'Demo fixture: task remained visible', duration: '2.7s' } : r))
    setRuns(rs => [{ id: `run-${Date.now()}`, label: 'Controlled verification demo', status: 'failed', time: 'Just now', detail: 'R4 failed: simulated task remained visible after delete.' }, ...rs])
    setToast('Controlled failure reproduced — this is demo state, not Kane evidence.')
  }

  function repair() {
    setDemo('repairing')
    setToast('Demo repair loop started. Live Kane evidence is still required.')
    window.setTimeout(() => {
      setRequirements(rs => rs.map(r => ({ ...r, status: 'proven', evidence: `Demo fixture: ${r.title} recovered`, duration: '2.3s' })))
      setRuns(rs => [{ id: `run-${Date.now()}`, label: 'Controlled re-verification demo', status: 'passed', time: 'Just now', detail: '5 of 5 requirements simulated as proven.' }, ...rs])
      setDemo('verified')
      setToast('Demo cycle passed. Run Kane to establish genuine proof.')
    }, 1200)
  }

  function reset() {
    setRequirements(initialRequirements)
    setRuns(initialRuns)
    setDemo('idle')
    setProjects([])
    setActiveProjectId(null)
    setProjectName('')
    setTaskTitle('')
    setDeletedTaskCount(0)
    setToast('Workspace reset. Ready for live Kane verification.')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><ShieldCheck size={19} /></div><div><strong>ProofLoop</strong><span>AI verification gate</span></div></div>
        <nav>
          <button className={activeTab === 'overview' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('overview')}><Activity size={17}/> Overview</button>
          <button className={activeTab === 'proofboard' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('proofboard')}><SquareCheckBig size={17}/> ProofBoard</button>
          <button className={activeTab === 'requirements' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('requirements')}><FileCheck2 size={17}/> Requirements <b>{requirements.length}</b></button>
          <button className={activeTab === 'evidence' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('evidence')}><LockKeyhole size={17}/> Evidence</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="mini-card"><span className="eyebrow">CURRENT BUILD</span><strong>proofboard #001</strong><span className="muted">main · local</span></div>
          <a className="github-link" href="https://github.com/pawansatoshi/ProofLoop" target="_blank" rel="noreferrer"><Code2 size={16}/> Repository <ArrowUpRight size={14}/></a>
        </div>
      </aside>

      <main className="main">
        <header className="topbar"><div><span className="eyebrow">RELEASE CONTROL</span><h1>ProofLoop <span>/</span> proofboard</h1></div><div className="top-actions"><span className="live-dot"><i/> Live workspace</span><button className="icon-btn" onClick={reset} title="Reset workspace"><RotateCcw size={16}/></button></div></header>

        <section className="hero-grid">
          <div className="hero-card">
            <div className="hero-copy"><div className="kicker"><Sparkles size={14}/> EVIDENCE-BASED DELIVERY</div><h2>AI builds. <em>Kane verifies.</em><br/>Evidence decides.</h2><p>ProofLoop turns browser verification into a deterministic release gate for AI-built software. ProofBoard is the real CRUD surface that Kane exercises.</p></div>
            <div className="hero-actions"><button className="primary" onClick={startDemo}><Play size={15} fill="currentColor"/> Run controlled demo</button><button className="secondary" onClick={() => setActiveTab('proofboard')}>Open ProofBoard</button></div>
          </div>
          <div className={`gate-card ${releaseApproved ? 'approved' : ''}`}><div className="gate-top"><span className="eyebrow">RELEASE GATE</span><span className="status-pill"><i/>{releaseApproved ? 'Demo approved' : failed ? 'Blocked' : 'Pending'}</span></div><div className="gate-score"><strong>{proven}</strong><span>/ {requirements.length} proven</span></div><div className="progress"><i style={{ width: `${progress}%` }}/></div><p>{gateLabel}</p><div className="gate-foot"><Clock3 size={14}/> {statusText}</div></div>
        </section>

        {activeTab === 'overview' && <>
          <section className="metrics">
            <Metric icon={<CheckCircle2/>} label="Kane proof" value={`${proven}/${requirements.length}`} sub="requirements" />
            <Metric icon={<CircleDashed/>} label="App flow" value={`${appFlowCoverage}%`} sub="local CRUD exercised" />
            <Metric icon={<Zap/>} label="Tasks" value={String(totalTasks)} sub={`${completedTasks} completed`} />
            <Metric icon={<Terminal/>} label="Evidence" value={String(requirements.filter(r => r.evidence).length)} sub="demo or live artifacts" />
          </section>
          <section className="content-grid">
            <div className="panel"><div className="panel-head"><div><span className="eyebrow">REQUIREMENTS</span><h3>Proof matrix</h3></div><button className="text-btn" onClick={() => setActiveTab('requirements')}>Open matrix <ArrowUpRight size={14}/></button></div><div className="req-list">{requirements.map(r => <RequirementRow key={r.id} requirement={r}/>)}</div></div>
            <div className="panel"><div className="panel-head"><div><span className="eyebrow">VERIFICATION HISTORY</span><h3>Recent runs</h3></div></div><div className="run-list">{runs.slice(0,4).map(run => <RunRow key={run.id} run={run}/>)}</div></div>
          </section>
        </>}

        {activeTab === 'proofboard' && <ProofBoard projects={projects} activeProject={activeProject} projectName={projectName} taskTitle={taskTitle} setProjectName={setProjectName} setTaskTitle={setTaskTitle} createProject={createProject} addTask={addTask} setActiveProjectId={setActiveProjectId} toggleTask={toggleTask} deleteTask={deleteTask} />}

        {activeTab === 'requirements' && <section className="panel full-panel"><div className="panel-head"><div><span className="eyebrow">REQUIREMENT MATRIX</span><h3>Every release claim must be proven</h3></div><div className="matrix-summary">{proven} passed · {failed} failed · {requirements.length - proven - failed} pending</div></div><div className="req-table">{requirements.map(r => <RequirementRow key={r.id} requirement={r} expanded/>)}</div></section>}

        {activeTab === 'evidence' && <section className="evidence-layout"><div className="panel evidence-main"><div className="panel-head"><div><span className="eyebrow">EVIDENCE LEDGER</span><h3>What verification recorded</h3></div><span className="sealed"><LockKeyhole size={13}/> Evidence-backed</span></div>{requirements.filter(r => r.evidence).map(r => <div className="evidence-row" key={r.id}><div className="evidence-icon"><Check size={15}/></div><div><strong>{r.id} · {r.title}</strong><span>{r.evidence}</span></div><time>{r.duration}</time></div>)}{requirements.filter(r => !r.evidence).length > 0 && <div className="empty-evidence"><CircleDashed size={20}/><span>Pending live Kane evidence for {requirements.filter(r => !r.evidence).length} requirement(s).</span></div>}</div><div className="panel repair-panel"><span className="eyebrow">REPAIR LOOP</span><h3>Failure → evidence → fix</h3><p>The controlled demo makes the narrative reproducible. The final release must replace simulated results with an actual Kane execution and evidence pack.</p><div className="flow"><FlowStep n="01" label="Kane fails" /><FlowStep n="02" label="Capture evidence" /><FlowStep n="03" label="Agent repairs" /><FlowStep n="04" label="Kane re-runs" /></div>{demo === 'failing' && <button className="primary wide" onClick={repair}><Code2 size={15}/> Repair demo and re-verify</button>}{demo === 'repairing' && <div className="repairing"><span className="spinner"/> Applying demo repair…</div>}{demo === 'verified' && <div className="success-banner"><CheckCircle2 size={18}/><div><strong>Controlled cycle complete</strong><span>5/5 simulated in the UI. Genuine Kane evidence still required.</span></div></div>}</div></section>}

        <footer><span>ProofLoop · evidence-first release control</span><span>AI builds · Kane verifies · evidence decides</span></footer>
      </main>
      {toast && <div className="toast"><CheckCircle2 size={16}/>{toast}</div>}
    </div>
  )
}

function ProofBoard({ projects, activeProject, projectName, taskTitle, setProjectName, setTaskTitle, createProject, addTask, setActiveProjectId, toggleTask, deleteTask }: {
  projects: Project[]
  activeProject: Project | null
  projectName: string
  taskTitle: string
  setProjectName: (value: string) => void
  setTaskTitle: (value: string) => void
  createProject: () => void
  addTask: () => void
  setActiveProjectId: (value: string) => void
  toggleTask: (taskId: string) => void
  deleteTask: (taskId: string) => void
}) {
  return <section className="proofboard-layout">
    <div className="panel">
      <div className="panel-head"><div><span className="eyebrow">PROOFBOARD</span><h3>Real application surface</h3></div><span className="sealed">Kane target</span></div>
      <div className="form-row"><input value={projectName} onChange={event => setProjectName(event.target.value)} onKeyDown={event => event.key === 'Enter' && createProject()} placeholder="Project name" aria-label="Project name" /><button className="primary" onClick={createProject}><Plus size={14}/> Create project</button></div>
      <div className="project-list">{projects.length === 0 ? <div className="empty-state"><CircleDashed size={20}/><span>No projects yet. Create one to start the release flow.</span></div> : projects.map(project => <button key={project.id} className={activeProject?.id === project.id ? 'project-card active' : 'project-card'} onClick={() => setActiveProjectId(project.id)}><strong>{project.name}</strong><span>{project.tasks.length} task{project.tasks.length === 1 ? '' : 's'}</span></button>)}</div>
    </div>
    <div className="panel">
      <div className="panel-head"><div><span className="eyebrow">ACTIVE PROJECT</span><h3>{activeProject?.name ?? 'Select a project'}</h3></div><span className="matrix-summary">{activeProject?.tasks.length ?? 0} tasks</span></div>
      {activeProject ? <><div className="form-row"><input value={taskTitle} onChange={event => setTaskTitle(event.target.value)} onKeyDown={event => event.key === 'Enter' && addTask()} placeholder="Task title" aria-label="Task title" /><button className="primary" onClick={addTask}><Plus size={14}/> Add task</button></div><div className="task-list">{activeProject.tasks.length === 0 ? <div className="empty-state"><CircleDashed size={20}/><span>No tasks yet. Add the first task.</span></div> : activeProject.tasks.map(task => <div className={`task-row ${task.completed ? 'completed' : ''}`} key={task.id}><button className="task-check" onClick={() => toggleTask(task.id)} aria-label={task.completed ? `Mark ${task.title} incomplete` : `Complete ${task.title}`}><Check size={14}/></button><span>{task.title}</span><button className="delete-btn" onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.title}`}><Trash2 size={14}/></button></div>)}</div></> : <div className="empty-state"><CircleDashed size={20}/><span>Create or select a project to manage tasks.</span></div>}
    </div>
  </section>
}

function Metric({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) { return <div className="metric"><div className="metric-icon">{icon}</div><div><span>{label}</span><strong>{value}</strong><small>{sub}</small></div></div> }
function RequirementRow({ requirement: r, expanded = false }: { requirement: Requirement; expanded?: boolean }) { return <div className={`req-row ${expanded ? 'expanded' : ''}`}><div className={`req-status ${r.status}`}>{r.status === 'proven' ? <Check size={14}/> : r.status === 'failed' ? <X size={14}/> : <CircleDashed size={14}/>}</div><div className="req-main"><strong>{r.id} · {r.title}</strong><span>{r.description}</span>{expanded && r.evidence && <small><FileCheck2 size={12}/> {r.evidence}</small>}</div><div className="req-state">{r.status === 'proven' ? 'PROVEN' : r.status === 'failed' ? 'FAILED' : 'PENDING'}</div></div> }
function RunRow({ run }: { run: Run }) { return <div className="run-row"><div className={`run-icon ${run.status}`}>{run.status === 'passed' ? <Check size={14}/> : <X size={14}/>}</div><div><strong>{run.label}</strong><span>{run.detail}</span><small>{run.time}</small></div></div> }
function FlowStep({ n, label }: { n: string; label: string }) { return <div className="flow-step"><span>{n}</span><strong>{label}</strong></div> }

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>)