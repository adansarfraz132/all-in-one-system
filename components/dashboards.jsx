// 5 hero module dashboards — interactive, real-feeling insights
// HR (existing in modules.jsx as DetailHR), Payroll, CRM, Finance, Projects

// Shared: dashboard chrome
const DashShell = ({ moduleName, glyph, tone, kpis, children, onBack, nav, currentNav, onNav }) => (
  <div style={{ width: '100%', height: '100%', background: 'var(--bg)', display: 'flex', overflow: 'hidden' }}>
    {/* sidebar */}
    <div style={{ width: 200, background: '#fff', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '18px 18px 12px', borderBottom: '1px solid var(--border)' }}>
        <button onClick={onBack} className="btn sm ghost" style={{ marginBottom: 12, padding: '4px 8px' }}>← Modules</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AppIcon tone={tone} glyph={glyph} size={32}/>
          <div>
            <div className="f-head" style={{ fontSize: 14 }}>{moduleName}</div>
            <div style={{ fontSize: 10, color: 'var(--text-3)' }}>Live · Demo data</div>
          </div>
        </div>
      </div>
      <div style={{ padding: 10, flex: 1 }}>
        {nav.map(n => (
          <div key={n} className="clickable" onClick={() => onNav(n)}
               style={{ padding: '8px 12px', borderRadius: 6, fontSize: 13, marginBottom: 2,
                        background: currentNav === n ? 'var(--brand-soft)' : 'transparent',
                        color: currentNav === n ? 'var(--brand)' : 'var(--text-2)',
                        fontWeight: currentNav === n ? 600 : 400 }}>
            {n}
          </div>
        ))}
      </div>
      <div style={{ padding: 12, borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text-4)' }}>
        Connected: <span className="f-mono">12 modules</span>
      </div>
    </div>

    {/* main */}
    <div className="scroll" style={{ flex: 1, padding: '24px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{moduleName} · {currentNav}</div>
          <h2 className="f-display" style={{ fontSize: 24, margin: '2px 0 0' }}>Here's what matters today.</h2>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn sm ghost">Export</button>
          <button className="btn sm primary">+ New</button>
        </div>
      </div>

      {/* KPI strip */}
      {kpis && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${kpis.length}, 1fr)`, gap: 12, marginBottom: 16 }}>
          {kpis.map(k => (
            <div key={k.label} className="card hover clickable" style={{ padding: 14 }}>
              <div className="f-display" style={{ fontSize: 24, lineHeight: 1 }}>{k.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', margin: '6px 0 4px' }}>{k.label}</div>
              <div className="f-mono" style={{ fontSize: 10, color: k.color || 'var(--ok)' }}>{k.trend}</div>
            </div>
          ))}
        </div>
      )}

      {children}
    </div>
  </div>
);

// =================== CRM DASHBOARD ===================
const DetailCRM = ({ onBack }) => {
  const [nav, setNav] = useState('Pipeline');
  const [stage, setStage] = useState(null);
  const [selDeal, setSelDeal] = useState(null);

  const stages = [
    { name: 'Lead',      count: 24, value: 480, color: '#94a3b8' },
    { name: 'Qualified', count: 14, value: 720, color: '#60a5fa' },
    { name: 'Proposal',  count:  8, value: 1240, color: '#a78bfa' },
    { name: 'Negotiation', count: 4, value: 980, color: '#f59e0b' },
    { name: 'Won',       count:  6, value: 1450, color: '#10b981' },
  ];

  const deals = [
    { co: 'Aramco Digital',    val: 480, stage: 'Negotiation', owner: 'Sara A.', age: 12, hot: true,  next: 'Sign MSA · Tue' },
    { co: 'STC Pay',           val: 320, stage: 'Proposal',    owner: 'Khalid M.', age: 8, hot: true,  next: 'Demo · Wed 2pm' },
    { co: 'Tamara',            val: 180, stage: 'Qualified',   owner: 'Sara A.', age: 4,  hot: false, next: 'Send pricing' },
    { co: 'Jahez',             val: 220, stage: 'Won',         owner: 'Omar F.', age: 28, hot: false, next: 'Kickoff · Sun' },
    { co: 'NEOM Commercial',   val: 950, stage: 'Negotiation', owner: 'Khalid M.', age: 21, hot: true, next: 'Legal review' },
    { co: 'Lean Business',     val: 140, stage: 'Lead',        owner: 'Layla S.', age: 2,  hot: false, next: 'Discovery call' },
    { co: 'Salla',             val: 280, stage: 'Proposal',    owner: 'Sara A.', age: 14, hot: false, next: 'Follow-up · Thu' },
    { co: 'Foodics',           val: 210, stage: 'Qualified',   owner: 'Omar F.', age: 6,  hot: false, next: 'Tech call' },
  ];

  const filtered = stage ? deals.filter(d => d.stage === stage) : deals;

  return (
    <DashShell
      moduleName="CRM & Sales"
      glyph="crm" tone="pink"
      onBack={onBack}
      nav={['Pipeline', 'Deals', 'Customers', 'Quotes', 'Forecast']}
      currentNav={nav} onNav={setNav}
      kpis={[
        { value: 'SAR 4.87M', label: 'Pipeline value',  trend: '▲ 12% this month', color: 'var(--ok)' },
        { value: '32%',       label: 'Win rate · Q',    trend: '▲ 4 pts', color: 'var(--ok)' },
        { value: '18 days',   label: 'Avg sales cycle', trend: '▼ 3 days', color: 'var(--ok)' },
        { value: '6 won',     label: 'This month',      trend: 'SAR 1.45M closed', color: 'var(--text-3)' },
      ]}
    >
      {/* Funnel visualization */}
      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h4 className="f-head" style={{ margin: 0, fontSize: 14 }}>Pipeline funnel</h4>
          <span style={{ fontSize: 11, color: 'var(--text-4)' }}>Click a stage to filter deals below</span>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 110 }}>
          {stages.map(s => {
            const max = Math.max(...stages.map(x => x.value));
            const h = 30 + (s.value / max) * 70;
            const active = stage === s.name;
            return (
              <div key={s.name} className="clickable" onClick={() => setStage(active ? null : s.name)}
                   style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                <div className="f-mono" style={{ fontSize: 11, marginBottom: 4, color: 'var(--text-3)' }}>SAR {s.value}k</div>
                <div style={{ width: '100%', height: h, background: s.color, borderRadius: '6px 6px 0 0',
                              opacity: active ? 1 : (stage ? 0.3 : 0.85),
                              border: active ? '2px solid var(--text)' : 'none',
                              transition: 'all 150ms' }}/>
                <div style={{ marginTop: 6, textAlign: 'center' }}>
                  <div className="f-head" style={{ fontSize: 12 }}>{s.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{s.count} deals</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, marginBottom: 14 }}>
        {/* Deals list */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 className="f-head" style={{ margin: 0, fontSize: 14 }}>
              {stage ? `${stage} · ${filtered.length} deals` : `Active deals · ${deals.length}`}
            </h4>
            {stage && <button className="btn sm ghost" onClick={() => setStage(null)}>Clear filter</button>}
          </div>
          {filtered.map((d, i) => {
            const open = selDeal === i;
            return (
              <div key={d.co} className="clickable" onClick={() => setSelDeal(open ? null : i)}
                   style={{ padding: '12px 16px', borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {d.hot && <span style={{ fontSize: 12 }}>🔥</span>}
                  <div style={{ flex: 1 }}>
                    <div className="f-head" style={{ fontSize: 13 }}>{d.co}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{d.owner} · {d.age}d in stage · {d.next}</div>
                  </div>
                  <span className="chip" style={{ fontSize: 10 }}>{d.stage}</span>
                  <span className="f-mono" style={{ fontSize: 13, fontWeight: 600 }}>SAR {d.val}k</span>
                </div>
                {open && (
                  <div style={{ padding: '10px 0 4px 24px', display: 'flex', gap: 6 }}>
                    <button className="btn sm brand" onClick={(e)=>{e.stopPropagation();setSelDeal(null);}}>Move stage →</button>
                    <button className="btn sm ghost" onClick={(e)=>e.stopPropagation()}>Send quote</button>
                    <button className="btn sm ghost" onClick={(e)=>e.stopPropagation()}>Log call</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* AI sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card dark" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>✦</span>
              <span className="f-head" style={{ fontSize: 13 }}>Copilot</span>
              <span className="chip dark">AI</span>
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.5, color: 'rgba(255,255,255,.85)', marginBottom: 10 }}>
              <b style={{ color: '#ffd766' }}>NEOM Commercial</b> hasn't moved in 21 days. Last touch was a proposal sent on Apr 5. Suggest a check-in or escalate to Khalid.
            </div>
            <button className="btn sm" style={{ background: '#fff', color: '#000', borderColor: '#fff', width: '100%' }}>Draft follow-up →</button>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <h4 className="f-head" style={{ fontSize: 13, margin: '0 0 10px' }}>Top performers · Q</h4>
            {[
              { n: 'Sara A.',    deals: 8, val: 1240 },
              { n: 'Khalid M.',  deals: 5, val: 980 },
              { n: 'Omar F.',    deals: 4, val: 540 },
            ].map(p => (
              <div key={p.n} style={{ display: 'flex', alignItems: 'center', padding: '6px 0', borderTop: '1px solid var(--border)' }}>
                <div style={{ width: 28, height: 28, borderRadius: 14, background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: 'var(--brand)', marginRight: 10 }}>
                  {p.n[0]}
                </div>
                <div style={{ flex: 1, fontSize: 12 }}>{p.n}</div>
                <div style={{ textAlign: 'right' }}>
                  <div className="f-mono" style={{ fontSize: 12 }}>SAR {p.val}k</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{p.deals} deals</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Forecast chart */}
      <div className="card" style={{ padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <h4 className="f-head" style={{ margin: 0, fontSize: 14 }}>Quarterly forecast</h4>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Weighted by stage probability</span>
        </div>
        <svg viewBox="0 0 600 140" style={{ width: '100%', height: 120 }}>
          {[0, 1, 2, 3].map(i => <line key={i} x1="0" y1={i*35+10} x2="600" y2={i*35+10} stroke="var(--border)" strokeDasharray="2 4"/>)}
          <path d="M0 110 L60 95 L120 88 L180 70 L240 65 L300 50 L360 42 L420 35 L480 30 L540 22 L600 18"
                stroke="var(--brand)" strokeWidth="2.5" fill="none"/>
          <path d="M0 110 L60 95 L120 88 L180 70 L240 65 L300 50 L360 42 L420 35 L480 30 L540 22 L600 18 L600 140 L0 140 Z"
                fill="var(--brand-soft)"/>
          <line x1="300" y1="0" x2="300" y2="140" stroke="var(--text-3)" strokeDasharray="3 3"/>
          <text x="306" y="14" fontSize="10" fill="var(--text-3)">Today</text>
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
        </div>
      </div>
    </DashShell>
  );
};

// =================== PAYROLL DASHBOARD ===================
const DetailPayroll = ({ onBack }) => {
  const [nav, setNav] = useState('This run');
  const [step, setStep] = useState(2); // current step in run

  const runSteps = [
    { name: 'Import timesheets',  done: true },
    { name: 'Apply policies',     done: true },
    { name: 'Review & approve',   done: false, current: true },
    { name: 'Generate WPS file',  done: false },
    { name: 'Submit to GOSI',     done: false },
    { name: 'Send payslips',      done: false },
  ];

  const issues = [
    { sev: 'high', t: 'Ahmed K. — overtime exceeds policy cap', d: '52h vs 45h max. Override or trim?' },
    { sev: 'med',  t: '3 timesheets unapproved', d: 'Projects module — Ahmed, Layla, Omar' },
    { sev: 'low',  t: 'GOSI rate change effective May 1', d: 'Auto-applied. Review summary.' },
  ];

  return (
    <DashShell
      moduleName="Payroll"
      glyph="payroll" tone="green"
      onBack={onBack}
      nav={['This run', 'History', 'WPS files', 'GOSI', 'Tax docs']}
      currentNav={nav} onNav={setNav}
      kpis={[
        { value: 'SAR 1.84M', label: 'April run · gross',  trend: 'Locks in 3 days', color: 'var(--warn)' },
        { value: '287',       label: 'Employees',           trend: '+4 new this month', color: 'var(--ok)' },
        { value: '3 issues',  label: 'Need attention',      trend: '1 high · 2 med', color: 'var(--warn)' },
        { value: '100%',      label: 'GOSI compliance',     trend: 'Last filed Mar 28', color: 'var(--ok)' },
      ]}
    >
      {/* Run progress */}
      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h4 className="f-head" style={{ margin: 0, fontSize: 14 }}>April 2025 payroll run</h4>
          <span className="chip warn">In progress</span>
        </div>
        <div style={{ display: 'flex', gap: 0, alignItems: 'center', marginBottom: 18 }}>
          {runSteps.map((s, i) => (
            <React.Fragment key={s.name}>
              <div className="clickable" onClick={() => setStep(i)} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 14, margin: '0 auto 6px',
                  background: s.done ? 'var(--ok)' : (step === i ? 'var(--brand)' : 'var(--bg-alt)'),
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 600, border: step === i ? '2px solid var(--brand)' : 'none'
                }}>
                  {s.done ? '✓' : i + 1}
                </div>
                <div style={{ fontSize: 11, color: step === i ? 'var(--text)' : 'var(--text-3)', fontWeight: step === i ? 600 : 400 }}>{s.name}</div>
              </div>
              {i < runSteps.length - 1 && <div style={{ height: 2, flex: 0.3, background: s.done ? 'var(--ok)' : 'var(--border)', alignSelf: 'flex-start', marginTop: 14 }}/>}
            </React.Fragment>
          ))}
        </div>
        <div style={{ background: 'var(--brand-soft)', padding: 14, borderRadius: 8, fontSize: 13 }}>
          <b>Step {step + 1}: {runSteps[step].name}</b><br/>
          <span style={{ color: 'var(--text-2)' }}>
            {step === 0 && '287 timesheets imported from Projects + HR. 3 await approval — see issues below.'}
            {step === 1 && 'GOSI, tax, allowances, deductions applied. Click to review per-employee breakdown.'}
            {step === 2 && '287 payslips generated. Review totals and approve to continue. SAR 1.84M gross.'}
            {step === 3 && 'WPS bank file ready. Will be sent to Al Rajhi on lock.'}
            {step === 4 && 'GOSI submission auto-prepared. Will file on lock.'}
            {step === 5 && 'Bilingual payslips queued for self-service portal + email.'}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
        {/* Issues */}
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <h4 className="f-head" style={{ margin: 0, fontSize: 14 }}>Issues to resolve</h4>
          </div>
          {issues.map((iss, i) => (
            <div key={i} className="clickable" style={{ padding: '12px 16px', borderTop: i === 0 ? 'none' : '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, marginTop: 6, background: iss.sev === 'high' ? 'var(--danger)' : iss.sev === 'med' ? 'var(--warn)' : 'var(--text-4)' }}/>
              <div style={{ flex: 1 }}>
                <div className="f-head" style={{ fontSize: 13 }}>{iss.t}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{iss.d}</div>
              </div>
              <button className="btn sm ghost">Fix</button>
            </div>
          ))}
        </div>

        {/* Cost breakdown */}
        <div className="card" style={{ padding: 18 }}>
          <h4 className="f-head" style={{ fontSize: 14, margin: '0 0 12px' }}>Cost breakdown · April</h4>
          {[
            { l: 'Base salaries',   v: 1420, c: 'var(--brand)' },
            { l: 'Allowances',      v: 240,  c: 'var(--brand-2)' },
            { l: 'Overtime',        v: 95,   c: '#a78bfa' },
            { l: 'GOSI (employer)', v: 165,  c: '#60a5fa' },
            { l: 'Bonuses',         v: 80,   c: '#10b981' },
          ].map(c => {
            const pct = (c.v / 2000) * 100;
            return (
              <div key={c.l} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span>{c.l}</span><span className="f-mono">SAR {c.v}k</span>
                </div>
                <div style={{ height: 6, background: 'var(--bg-alt)', borderRadius: 3 }}>
                  <div style={{ width: pct + '%', height: '100%', background: c.c, borderRadius: 3 }}/>
                </div>
              </div>
            );
          })}
          <hr className="sep" style={{ margin: '14px 0 10px' }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 600 }}>
            <span>Total cost</span><span className="f-mono">SAR 2,000k</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>vs March: ▲ 3.2% (4 new hires)</div>
        </div>
      </div>
    </DashShell>
  );
};

// =================== FINANCE DASHBOARD ===================
const DetailFinance = ({ onBack }) => {
  const [nav, setNav] = useState('Overview');
  const [period, setPeriod] = useState('MTD');

  return (
    <DashShell
      moduleName="Finance"
      glyph="finance" tone="purple"
      onBack={onBack}
      nav={['Overview', 'Invoices', 'Bills · AP', 'Receivables · AR', 'Close', 'ZATCA']}
      currentNav={nav} onNav={setNav}
      kpis={[
        { value: 'SAR 8.42M', label: 'Revenue · MTD',  trend: '▲ 18% vs Mar', color: 'var(--ok)' },
        { value: 'SAR 1.21M', label: 'Outstanding AR', trend: '14 invoices · 3 overdue', color: 'var(--warn)' },
        { value: 'SAR 540k',  label: 'Bills due · 7d', trend: '8 bills · 2 need approval', color: 'var(--text-3)' },
        { value: '94%',       label: 'Close progress', trend: 'Apr close · 3 days left', color: 'var(--ok)' },
      ]}
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {['MTD', 'QTD', 'YTD', 'Custom'].map(p => (
          <button key={p} className={'btn sm ' + (period === p ? 'primary' : 'ghost')} onClick={() => setPeriod(p)}>{p}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14, marginBottom: 14 }}>
        {/* P&L summary */}
        <div className="card" style={{ padding: 18 }}>
          <h4 className="f-head" style={{ fontSize: 14, margin: '0 0 14px' }}>P&L summary · {period}</h4>
          {[
            { l: 'Revenue',           v: 8420, sub: 'CRM-driven · 47 invoices', pos: true },
            { l: 'Cost of revenue',   v: -2840, sub: 'Inventory + delivery', pos: false },
            { l: 'Gross profit',      v: 5580, sub: '66.3% margin', pos: true, bold: true },
            { l: 'Payroll',           v: -1840, sub: '287 employees', pos: false },
            { l: 'Operating expenses',v: -1240, sub: 'Cards + travel + tools', pos: false },
            { l: 'EBITDA',            v: 2500, sub: '29.7% margin · ▲ 4 pts', pos: true, bold: true },
          ].map(r => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0',
                                    borderTop: r.bold ? '1px solid var(--border)' : 'none',
                                    fontWeight: r.bold ? 600 : 400 }}>
              <div>
                <div style={{ fontSize: 13 }}>{r.l}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{r.sub}</div>
              </div>
              <div className="f-mono" style={{ fontSize: 13, color: r.pos ? 'var(--ok)' : 'var(--text)' }}>
                SAR {Math.abs(r.v).toLocaleString()}k
              </div>
            </div>
          ))}
        </div>

        {/* Cash flow chart */}
        <div className="card" style={{ padding: 18, display: 'flex', flexDirection: 'column' }}>
          <h4 className="f-head" style={{ fontSize: 14, margin: '0 0 4px' }}>Cash position</h4>
          <div className="f-display" style={{ fontSize: 26, color: 'var(--brand)' }}>SAR 12.4M</div>
          <div className="f-mono" style={{ fontSize: 11, color: 'var(--ok)', marginBottom: 14 }}>▲ SAR 2.1M this quarter</div>
          <svg viewBox="0 0 300 120" style={{ width: '100%', height: 120, flex: 1 }}>
            {[0, 1, 2, 3].map(i => <line key={i} x1="0" y1={i*30+5} x2="300" y2={i*30+5} stroke="var(--border)" strokeDasharray="2 4"/>)}
            <path d="M0 90 L30 85 L60 70 L90 75 L120 60 L150 50 L180 45 L210 40 L240 30 L270 25 L300 20"
                  stroke="var(--brand)" strokeWidth="2" fill="none"/>
            <path d="M0 90 L30 85 L60 70 L90 75 L120 60 L150 50 L180 45 L210 40 L240 30 L270 25 L300 20 L300 120 L0 120 Z"
                  fill="var(--brand-soft)"/>
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-3)', marginTop: 4 }}>
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May (proj)</span>
          </div>
        </div>
      </div>

      {/* AR aging */}
      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h4 className="f-head" style={{ margin: 0, fontSize: 14 }}>Receivables aging</h4>
          <button className="btn sm ghost">Send reminders →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
          {[
            { l: 'Current',  v: 680, c: 6,  color: '#10b981' },
            { l: '1-30 d',   v: 290, c: 4,  color: '#84cc16' },
            { l: '31-60 d',  v: 140, c: 2,  color: '#f59e0b' },
            { l: '61-90 d',  v: 70,  c: 1,  color: '#f97316' },
            { l: '90+ d',    v: 30,  c: 1,  color: '#ef4444' },
          ].map(b => (
            <div key={b.l} className="clickable" style={{ padding: 12, background: 'var(--bg-alt)', borderRadius: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: b.color, marginBottom: 6 }}/>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{b.l}</div>
              <div className="f-display" style={{ fontSize: 18 }}>SAR {b.v}k</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{b.c} invoice{b.c === 1 ? '' : 's'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ZATCA + close */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <h4 className="f-head" style={{ fontSize: 14, margin: 0 }}>ZATCA e-invoicing</h4>
            <span className="chip" style={{ background: 'var(--ok)', color: '#fff', borderColor: 'var(--ok)' }}>Phase 2 · Live</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 10 }}>All invoices auto-signed and reported. 100% compliance this month.</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[['47', 'Sent'], ['47', 'Cleared'], ['0', 'Rejected']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center', padding: 10, background: 'var(--bg-alt)', borderRadius: 8 }}>
                <div className="f-display" style={{ fontSize: 22 }}>{n}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card dark" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 14 }}>✦</span>
            <span className="f-head" style={{ fontSize: 13 }}>Copilot</span>
            <span className="chip dark">AI</span>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,.85)', marginBottom: 12 }}>
            Month-end close is <b style={{ color: '#ffd766' }}>94% done</b>. 2 reconciliation breaks remain — cards from Expenses (SAR 4,250) and one bank line. Auto-recon ready to run.
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn sm" style={{ background: '#fff', color: '#000', borderColor: '#fff' }}>Run auto-recon</button>
            <button className="btn sm" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.3)' }}>Open close</button>
          </div>
        </div>
      </div>
    </DashShell>
  );
};

// =================== PROJECTS DASHBOARD ===================
const DetailProjects = ({ onBack }) => {
  const [nav, setNav] = useState('Active');
  const [selProj, setSelProj] = useState(null);

  const projects = [
    { name: 'NEOM dashboard rebuild',   client: 'NEOM Commercial', team: 6, prog: 72, budget: 480, spent: 340, status: 'on track', due: 'May 18' },
    { name: 'Aramco internal tools',    client: 'Aramco Digital',  team: 4, prog: 45, budget: 320, spent: 210, status: 'on track', due: 'Jun 4'  },
    { name: 'Salla checkout v2',        client: 'Salla',           team: 3, prog: 88, budget: 180, spent: 195, status: 'over',     due: 'Apr 30' },
    { name: 'Foodics POS integration',  client: 'Foodics',         team: 2, prog: 30, budget: 140, spent: 38,  status: 'at risk',  due: 'May 22' },
    { name: 'STC Pay onboarding flow',  client: 'STC Pay',         team: 3, prog: 60, budget: 220, spent: 130, status: 'on track', due: 'May 11' },
  ];

  const statusColor = (s) => ({ 'on track': 'var(--ok)', 'over': 'var(--danger)', 'at risk': 'var(--warn)' }[s]);

  return (
    <DashShell
      moduleName="Projects"
      glyph="projects" tone="lime"
      onBack={onBack}
      nav={['Active', 'Plans', 'Time tracking', 'Billing', 'Reports']}
      currentNav={nav} onNav={setNav}
      kpis={[
        { value: '12 active', label: 'Projects',         trend: '5 client · 7 internal', color: 'var(--text-3)' },
        { value: 'SAR 1.34M', label: 'Billable · MTD',   trend: '▲ 8% vs Mar', color: 'var(--ok)' },
        { value: '78%',       label: 'Utilization',      trend: 'Target 80%', color: 'var(--warn)' },
        { value: '2 at risk', label: 'Need attention',   trend: '1 over budget · 1 late', color: 'var(--danger)' },
      ]}
    >
      <div className="card" style={{ padding: 0, marginBottom: 14 }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
          <h4 className="f-head" style={{ margin: 0, fontSize: 14 }}>Active projects</h4>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Click to expand</span>
        </div>
        {projects.map((p, i) => {
          const open = selProj === i;
          const burn = (p.spent / p.budget) * 100;
          return (
            <div key={p.name} className="clickable" onClick={() => setSelProj(open ? null : i)}
                 style={{ padding: '14px 18px', borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ flex: 1.2 }}>
                  <div className="f-head" style={{ fontSize: 13 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{p.client} · {p.team} people · due {p.due}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                    <span style={{ color: 'var(--text-3)' }}>Progress</span>
                    <span className="f-mono">{p.prog}%</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--bg-alt)', borderRadius: 3 }}>
                    <div style={{ width: p.prog + '%', height: '100%', background: 'var(--brand)', borderRadius: 3 }}/>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                    <span style={{ color: 'var(--text-3)' }}>Budget</span>
                    <span className="f-mono">SAR {p.spent}k / {p.budget}k</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--bg-alt)', borderRadius: 3 }}>
                    <div style={{ width: Math.min(burn, 100) + '%', height: '100%', background: burn > 100 ? 'var(--danger)' : burn > 90 ? 'var(--warn)' : 'var(--ok)', borderRadius: 3 }}/>
                  </div>
                </div>
                <span className="chip" style={{ background: statusColor(p.status), color: '#fff', borderColor: statusColor(p.status), fontSize: 10 }}>
                  {p.status}
                </span>
              </div>
              {open && (
                <div style={{ padding: '14px 0 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                  {[
                    { l: 'This week', v: '142h logged' },
                    { l: 'Open tasks', v: '23 of 87' },
                    { l: 'Billable rate', v: 'SAR 320 /h' },
                    { l: 'Next milestone', v: p.due },
                  ].map(x => (
                    <div key={x.l} style={{ padding: 10, background: 'var(--bg-alt)', borderRadius: 6 }}>
                      <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{x.l}</div>
                      <div className="f-head" style={{ fontSize: 13 }}>{x.v}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div className="card" style={{ padding: 18 }}>
          <h4 className="f-head" style={{ fontSize: 14, margin: '0 0 12px' }}>Team utilization · this week</h4>
          {[
            { n: 'Sara A.',    util: 92, role: 'PM' },
            { n: 'Khalid M.',  util: 88, role: 'Eng' },
            { n: 'Layla S.',   util: 76, role: 'Design' },
            { n: 'Omar F.',    util: 64, role: 'Eng' },
            { n: 'Yara H.',    util: 48, role: 'QA' },
          ].map(p => (
            <div key={p.n} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                <span>{p.n} <span style={{ color: 'var(--text-3)' }}>· {p.role}</span></span>
                <span className="f-mono" style={{ color: p.util > 90 ? 'var(--warn)' : p.util < 60 ? 'var(--text-3)' : 'var(--ok)' }}>{p.util}%</span>
              </div>
              <div style={{ height: 5, background: 'var(--bg-alt)', borderRadius: 2 }}>
                <div style={{ width: p.util + '%', height: '100%',
                              background: p.util > 90 ? 'var(--warn)' : p.util < 60 ? 'var(--text-4)' : 'var(--ok)',
                              borderRadius: 2 }}/>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 18 }}>
          <h4 className="f-head" style={{ fontSize: 14, margin: '0 0 12px' }}>Billing — ready to invoice</h4>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 12 }}>Hours approved this period, ready to push to Finance.</div>
          {[
            { c: 'NEOM Commercial', h: 142, v: 45.4 },
            { c: 'Aramco Digital',  h: 98,  v: 31.4 },
            { c: 'STC Pay',         h: 76,  v: 24.3 },
          ].map(b => (
            <div key={b.c} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid var(--border)', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13 }}>{b.c}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{b.h} hours approved</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="f-mono" style={{ fontSize: 13, fontWeight: 600 }}>SAR {b.v}k</div>
              </div>
            </div>
          ))}
          <button className="btn brand" style={{ width: '100%', marginTop: 12 }}>Send to Finance →</button>
        </div>
      </div>
    </DashShell>
  );
};

Object.assign(window, { DetailCRM, DetailPayroll, DetailFinance, DetailProjects });
