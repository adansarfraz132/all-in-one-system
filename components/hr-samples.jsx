// Org Chart + Time Off sample dashboards — share HR shell styling

const HRShell = ({ current, title, tone, glyph, children, showSidebar = true, onNavigateView }) => {
  const [nav, setNav] = useState(current);
  const items = ['Dashboard', 'People', 'Hiring', 'Time off', 'Documents', 'Org chart', 'Reports'];
  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14, background: '#fff' }}>
        <AppIcon tone={tone} glyph={glyph} size={32}/>
        <span className="f-head" style={{ fontSize: 16 }}>{title}</span>
        <div style={{ flex: 1 }}/>
        <div className="clickable" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, background: 'var(--bg-alt)', borderRadius: 999, color: 'var(--text-3)' }}>
          <UIIcon name="search" size={13}/> Search…
        </div>
        <button className="btn sm"><UIIcon name="bell" size={14}/></button>
        <button className="btn sm primary">+ Invite</button>
        <div style={{ width: 30, height: 30, borderRadius: 15, background: 'var(--brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>A</div>
      </div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: showSidebar ? '200px 1fr' : '1fr', minHeight: 0 }}>
        {showSidebar && (
          <div style={{ borderRight: '1px solid var(--border)', background: 'var(--bg-alt)', padding: 12 }}>
            {items.map(x => (
              <div key={x} className="clickable" onClick={() => {
                setNav(x);
                if (!onNavigateView) return;
                if (x === 'Dashboard') onNavigateView('dashboard');
                if (x === 'Org chart') onNavigateView('org');
                if (x === 'Time off') onNavigateView('timeoff');
              }}
                   style={{ padding: '8px 12px', fontSize: 13, marginBottom: 2,
                            background: nav === x ? '#fff' : 'transparent',
                            color: nav === x ? 'var(--text)' : 'var(--text-2)',
                            fontWeight: nav === x ? 600 : 400,
                            borderRadius: 6, boxShadow: nav === x ? 'var(--sh-sm)' : 'none' }}>
                {x}
              </div>
            ))}
          </div>
        )}
        <div className="scroll" style={{ padding: '24px 28px' }}>{children}</div>
      </div>
    </div>
  );
};

// --- ORG CHART ---
const ORG = {
  name: 'Abdulaziz Al-Fahad', role: 'CEO', team: 12, init: 'A', color: '#5b2a78',
  kids: [
    { name: 'Layla Saeed', role: 'COO', team: 32, init: 'L', color: '#e4588a',
      kids: [
        { name: 'Mohammed Nasr', role: 'Head of Ops', team: 14, init: 'M', color: '#3fb5b0' },
        { name: 'Omar Faris', role: 'Head of People', team: 8, init: 'O', color: '#f28b4d' },
      ] },
    { name: 'Khalid Rashid', role: 'CTO', team: 28, init: 'K', color: '#3b82f6',
      kids: [
        { name: 'Yara Tamim', role: 'VP Engineering', team: 18, init: 'Y', color: '#6b37a8' },
        { name: 'Sami Dahir', role: 'VP Design', team: 6, init: 'S', color: '#16794a' },
      ] },
    { name: 'Maha Jaber', role: 'CFO', team: 9, init: 'M', color: '#b85a10',
      kids: [
        { name: 'Nouf Harb', role: 'Controller', team: 5, init: 'N', color: '#c93370' },
      ] },
  ],
};

const OrgNode = ({ n, level = 0 }) => {
  const [open, setOpen] = useState(level < 1);
  const hasKids = n.kids && n.kids.length > 0;
  return (
    <div>
      <div className="clickable" onClick={() => hasKids && setOpen(!open)}
           style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', marginBottom: 6,
                    background: level === 0 ? 'var(--brand-soft)' : '#fff',
                    border: `1px solid ${level === 0 ? 'var(--brand)' : 'var(--border)'}`,
                    borderRadius: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 16, background: n.color, color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>{n.init}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="f-head" style={{ fontSize: 13 }}>{n.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{n.role}</div>
        </div>
        <span className="chip">{n.team} reports</span>
        {hasKids && <UIIcon name="chevronRight" size={14} color="var(--text-4)"
                     style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 150ms' }}/>}
      </div>
      {hasKids && open && (
        <div style={{ paddingLeft: 28, borderLeft: '2px dashed var(--border-strong)', marginLeft: 16 }}>
          {n.kids.map((k, i) => <OrgNode key={i} n={k} level={level + 1}/>)}
        </div>
      )}
    </div>
  );
};

const DetailOrg = ({ showSidebar = true, onNavigateView }) => {
  return (
    <HRShell current="Org chart" title="HR & People · Org chart" tone="pink" glyph="users" showSidebar={showSidebar} onNavigateView={onNavigateView}>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 13, color: 'var(--text-3)' }}>Live org chart</div>
        <h3 className="f-display" style={{ fontSize: 24, margin: '2px 0 0' }}>287 people · 3 divisions · live reporting lines</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
        {[
          { k: '287', l: 'Total headcount', trend: '+4 this week', c: 'var(--ok)' },
          { k: '18', l: 'Teams', trend: '3 new in Q2', c: 'var(--brand)' },
          { k: '7.2', l: 'Avg span of control', trend: 'Healthy', c: 'var(--ok)' },
          { k: '4', l: 'Org depth', trend: 'Flat hierarchy', c: 'var(--text-3)' },
        ].map(s => (
          <div key={s.l} className="card hover clickable" style={{ padding: 14 }}>
            <div className="f-display" style={{ fontSize: 22, lineHeight: 1 }}>{s.k}</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', margin: '4px 0 2px' }}>{s.l}</div>
            <div className="f-mono" style={{ fontSize: 10, color: s.c }}>{s.trend}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14 }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h4 className="f-head" style={{ margin: 0, fontSize: 14 }}>Reporting tree</h4>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn sm ghost">↕ Expand all</button>
              <button className="btn sm ghost">Export</button>
            </div>
          </div>
          <OrgNode n={ORG}/>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ padding: 14 }}>
            <div className="f-head" style={{ fontSize: 13, marginBottom: 10 }}>Headcount by division</div>
            {[
              { n: 'Engineering', c: 98, color: '#3b82f6' },
              { n: 'Operations', c: 64, color: '#e4588a' },
              { n: 'Product & Design', c: 48, color: '#6b37a8' },
              { n: 'Finance', c: 38, color: '#b85a10' },
              { n: 'Go-to-market', c: 39, color: '#16794a' },
            ].map(d => (
              <div key={d.n} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                  <span>{d.n}</span><span className="f-mono" style={{ color: 'var(--text-3)' }}>{d.c}</span>
                </div>
                <div style={{ height: 6, background: 'var(--bg-alt)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${(d.c/98)*100}%`, height: '100%', background: d.color }}/>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 14 }}>
            <div className="f-head" style={{ fontSize: 13, marginBottom: 8 }}>Open roles</div>
            {[
              { r: 'Senior Engineer · Platform', team: 'Engineering', s: 3 },
              { r: 'Product Designer', team: 'Design', s: 1 },
              { r: 'Payroll Specialist', team: 'People', s: 2 },
            ].map(x => (
              <div key={x.r} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '1px solid var(--border)', fontSize: 12 }}>
                <div>
                  <div style={{ fontWeight: 500 }}>{x.r}</div>
                  <div style={{ color: 'var(--text-4)', fontSize: 11 }}>{x.team}</div>
                </div>
                <span className="chip warn">{x.s} wk open</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HRShell>
  );
};

// --- TIME OFF ---
const LEAVE_REQUESTS = [
  { name: 'Ahmed Khalil',  team: 'Engineering', type: 'Annual',    from: 'Apr 28', to: 'May 2',  days: 5, status: 'pending',  init: 'A', color: '#e4588a' },
  { name: 'Layla Saeed',   team: 'Design',      type: 'Sick',      from: 'Apr 22', to: 'Apr 23', days: 2, status: 'approved', init: 'L', color: '#3fb5b0' },
  { name: 'Omar Faris',    team: 'People',      type: 'Annual',    from: 'May 5',  to: 'May 12', days: 6, status: 'pending',  init: 'O', color: '#f28b4d' },
  { name: 'Yara Tamim',    team: 'Engineering', type: 'Personal',  from: 'Apr 25', to: 'Apr 25', days: 1, status: 'approved', init: 'Y', color: '#6b37a8' },
  { name: 'Sami Dahir',    team: 'Design',      type: 'Annual',    from: 'Jun 1',  to: 'Jun 10', days: 8, status: 'pending',  init: 'S', color: '#16794a' },
  { name: 'Maha Jaber',    team: 'Finance',     type: 'Maternity', from: 'May 15', to: 'Aug 15', days: 66,status: 'approved', init: 'M', color: '#b85a10' },
  { name: 'Nouf Harb',     team: 'Finance',     type: 'Hajj',      from: 'Jun 14', to: 'Jun 20', days: 5, status: 'approved', init: 'N', color: '#c93370' },
];

const statusStyle = (s) => ({
  pending:  { bg: '#fef3c7', fg: '#92400e' },
  approved: { bg: '#d1fae5', fg: '#065f46' },
  rejected: { bg: '#fee2e2', fg: '#991b1b' },
}[s]);

const DetailTimeOff = ({ showSidebar = true, onNavigateView }) => {
  const [filter, setFilter] = useState('all');
  const pending = LEAVE_REQUESTS.filter(r => r.status === 'pending').length;
  const filtered = filter === 'all' ? LEAVE_REQUESTS : LEAVE_REQUESTS.filter(r => r.status === filter);

  return (
    <HRShell current="Time off" title="HR & People · Time off" tone="pink" glyph="users" showSidebar={showSidebar} onNavigateView={onNavigateView}>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 13, color: 'var(--text-3)' }}>Leave management</div>
        <h3 className="f-display" style={{ fontSize: 24, margin: '2px 0 0' }}>Who's out, who's asking, who's back.</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
        {[
          { k: '12', l: 'Out today', trend: '9 leave · 3 WFH', c: 'var(--text-3)' },
          { k: pending.toString(), l: 'Pending approval', trend: 'Needs review', c: 'var(--warn)' },
          { k: '88', l: 'Avg balance', trend: 'Days unused', c: 'var(--ok)' },
          { k: '4', l: 'On Hajj leave', trend: 'Scheduled Jun', c: 'var(--brand)' },
        ].map(s => (
          <div key={s.l} className="card hover clickable" style={{ padding: 14 }}>
            <div className="f-display" style={{ fontSize: 22, lineHeight: 1 }}>{s.k}</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', margin: '4px 0 2px' }}>{s.l}</div>
            <div className="f-mono" style={{ fontSize: 10, color: s.c }}>{s.trend}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14 }}>
        {/* Requests table */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h4 className="f-head" style={{ margin: 0, fontSize: 14 }}>Leave requests</h4>
            <div style={{ display: 'flex', gap: 2, padding: 3, background: 'var(--bg-alt)', borderRadius: 8 }}>
              {['all', 'pending', 'approved'].map(f => (
                <button key={f} className={`btn sm ${filter === f ? 'primary' : 'ghost'}`} onClick={() => setFilter(f)}
                        style={{ fontSize: 11, padding: '4px 10px', textTransform: 'capitalize' }}>{f}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 0.8fr 1.1fr auto', gap: 8, padding: '6px 8px', fontSize: 10, color: 'var(--text-4)', letterSpacing: 1, fontWeight: 600 }}>
            <span>EMPLOYEE</span><span>TYPE</span><span>DAYS</span><span>DATES</span><span>STATUS</span>
          </div>
          {filtered.map(r => {
            const st = statusStyle(r.status);
            return (
              <div key={r.name + r.from} className="clickable" style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 0.8fr 1.1fr auto', gap: 8, padding: '10px 8px', borderTop: '1px solid var(--border)', fontSize: 12, alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 14, background: r.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>{r.init}</div>
                  <div>
                    <div style={{ fontWeight: 500 }}>{r.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-4)' }}>{r.team}</div>
                  </div>
                </div>
                <span className="chip">{r.type}</span>
                <span className="f-mono">{r.days}d</span>
                <span style={{ color: 'var(--text-3)', fontSize: 11 }}>{r.from} → {r.to}</span>
                <span style={{ padding: '3px 10px', borderRadius: 999, background: st.bg, color: st.fg, fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{r.status}</span>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* This week calendar */}
          <div className="card" style={{ padding: 14 }}>
            <div className="f-head" style={{ fontSize: 13, marginBottom: 10 }}>This week</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, marginBottom: 8 }}>
              {['S','M','T','W','T','F','S'].map((d, i) => (
                <div key={i} style={{ fontSize: 10, textAlign: 'center', color: 'var(--text-4)', fontWeight: 600 }}>{d}</div>
              ))}
              {[22,23,24,25,26,27,28].map((d, i) => {
                const count = [2, 3, 1, 0, 2, 2, 5][i];
                const intensity = count / 5;
                return (
                  <div key={d} style={{ aspectRatio: '1', borderRadius: 5,
                                        background: count === 0 ? 'var(--bg-alt)' : `rgba(91, 42, 120, ${0.15 + intensity * 0.55})`,
                                        color: count > 2 ? '#fff' : 'var(--text-2)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 11, fontWeight: 500, position: 'relative' }}>
                    {d}
                    {count > 0 && <span style={{ position: 'absolute', bottom: 2, right: 3, fontSize: 8, fontWeight: 700 }}>{count}</span>}
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Darker = more people out. Today: <b>2 out</b>.</div>
          </div>

          {/* Balances */}
          <div className="card" style={{ padding: 14 }}>
            <div className="f-head" style={{ fontSize: 13, marginBottom: 10 }}>Your balance</div>
            {[
              { t: 'Annual leave', used: 6, total: 30, color: 'var(--brand)' },
              { t: 'Sick leave', used: 1, total: 14, color: 'var(--ok)' },
              { t: 'Hajj leave', used: 0, total: 10, color: 'var(--warn)' },
            ].map(x => (
              <div key={x.t} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                  <span>{x.t}</span>
                  <span className="f-mono" style={{ color: 'var(--text-3)' }}>{x.used} / {x.total} used</span>
                </div>
                <div style={{ height: 6, background: 'var(--bg-alt)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${(x.used/x.total)*100}%`, height: '100%', background: x.color }}/>
                </div>
              </div>
            ))}
            <button className="btn sm brand" style={{ width: '100%', marginTop: 8 }}>+ Request time off</button>
          </div>
        </div>
      </div>
    </HRShell>
  );
};

Object.assign(window, { HRShell, DetailOrg, DetailTimeOff });
