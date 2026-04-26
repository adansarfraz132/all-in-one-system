// ModulesHero — 5 hero modules on the left, click to open real dashboards
// Replaces the previous wide ModulesCustomizable as the primary "Build your bundle" screen

const HERO_MODULES = [
  { id: 'hr',       dashboard: 'HR',       headline: 'HR & People',      sub: '5 features · employee records, leave, onboarding, org chart, docs',
    metric: '287 active people',  metricSub: '+4 this week · Saudization 73%' },
  { id: 'crm',      dashboard: 'CRM',      headline: 'CRM & Sales',      sub: '5 features · pipeline, qualification, quotes, invoicing, analytics',
    metric: 'SAR 4.87M pipeline', metricSub: '32% win rate · 18d avg cycle', tag: 'NEW' },
  { id: 'finance',  dashboard: 'Finance',  headline: 'Finance',          sub: '5 features · GL, AP, AR, close, ZATCA',
    metric: 'SAR 8.42M revenue',  metricSub: 'MTD · ▲ 18% vs Mar' },
  { id: 'payroll',  dashboard: 'Payroll',  headline: 'Payroll',          sub: '5 features · runs, WPS, GOSI, payslips, multi-entity',
    metric: 'SAR 1.84M April run', metricSub: 'Locks in 3 days · 287 employees', tag: 'KSA' },
  { id: 'projects', dashboard: 'Projects', headline: 'Projects',         sub: '3 features · tasks, time tracking, billing',
    metric: '12 active projects', metricSub: '78% utilization · 2 at risk' },
];

const ModulesHero = ({ onOpenProto }) => {
  const [openDash, setOpenDash] = useState(null); // null | 'HR' | 'CRM' | ...
  const b = useBundle();

  if (openDash === 'HR')       return <DetailHR       onBack={() => setOpenDash(null)}/>;
  if (openDash === 'CRM')      return <DetailCRM      onBack={() => setOpenDash(null)}/>;
  if (openDash === 'Finance')  return <DetailFinance  onBack={() => setOpenDash(null)}/>;
  if (openDash === 'Payroll')  return <DetailPayroll  onBack={() => setOpenDash(null)}/>;
  if (openDash === 'Projects') return <DetailProjects onBack={() => setOpenDash(null)}/>;

  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '24px 36px 18px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <span className="chip brand" style={{ marginBottom: 8 }}>BUILD YOUR BUNDLE</span>
            <h2 className="f-display" style={{ fontSize: 28, margin: '4px 0 4px' }}>Pick your modules. Tap one to see it live.</h2>
            <p className="f-body" style={{ fontSize: 13, color: 'var(--text-3)', margin: 0 }}>
              Five core modules below. Click any tile to open the full interactive dashboard with real insights.
            </p>
          </div>
          <div className="card" style={{ padding: '12px 16px', minWidth: 200, background: 'var(--text)', color: '#fff', border: 'none' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.6)', letterSpacing: 1.2 }}>YOUR BUNDLE</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
              <span className="f-display" style={{ fontSize: 22 }}>SAR {b.total}</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,.6)' }}>/ emp / mo</span>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.7)', marginTop: 2 }}>{b.picked.size} features selected</div>
          </div>
        </div>
      </div>

      {/* 5 hero tiles */}
      <div style={{ flex: 1, padding: '24px 36px', overflow: 'auto' }}>
        <div className="hero-modules-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 24 }}>
          {HERO_MODULES.map(m => {
            const mod = MODULES.find(x => x.id === m.id);
            const subs = subsByParent(m.id);
            const pickedCount = subs.filter(s => b.picked.has(s.id)).length;
            return (
              <div key={m.id} className="card hover clickable"
                   onClick={() => setOpenDash(m.dashboard)}
                   style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', minHeight: 220 }}>
                {m.tag && (
                  <span className="chip brand" style={{ position: 'absolute', top: 12, right: 12, fontSize: 9 }}>{m.tag}</span>
                )}
                <AppIcon tone={mod.tone} glyph={mod.glyph} size={44}/>
                <div>
                  <div className="f-head" style={{ fontSize: 16, marginBottom: 2 }}>{m.headline}</div>
                  <div className="f-body" style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.4 }}>{m.sub}</div>
                </div>
                <hr className="sep" style={{ margin: '4px 0' }}/>
                <div>
                  <div className="f-display" style={{ fontSize: 16, color: 'var(--brand)' }}>{m.metric}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{m.metricSub}</div>
                </div>
                <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 10, color: pickedCount > 0 ? 'var(--brand)' : 'var(--text-4)' }}>
                    {pickedCount > 0 ? `${pickedCount}/${subs.length} selected` : `${subs.length} features`}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--brand)', fontWeight: 600 }}>
                    Open dashboard →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dependency banner */}
        <DependencyBanner/>

        {/* Inline feature picker per hero module */}
        <div>
          <h3 className="f-script" style={{ fontSize: 22, margin: '0 0 12px' }}>Toggle features for each module</h3>
          <div className="hero-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {HERO_MODULES.map(m => {
              const mod = MODULES.find(x => x.id === m.id);
              const subs = subsByParent(m.id);
              return (
                <div key={m.id} className="card" style={{ padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <AppIcon tone={mod.tone} glyph={mod.glyph} size={28}/>
                    <span className="f-head" style={{ fontSize: 14, flex: 1 }}>{m.headline}</span>
                    <button className="btn sm ghost" onClick={() => b.pickAll(subs.map(s => s.id))}>+ all</button>
                  </div>
                  <div className="hero-subfeatures-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                    {subs.map(s => {
                      const on = b.picked.has(s.id);
                      const hasDeps = s.requires && s.requires.some(r => !b.picked.has(r));
                      return (
                        <div key={s.id} className="clickable" onClick={() => b.toggle(s.id)}
                             style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8,
                                      background: on ? 'var(--brand-soft)' : 'var(--bg-alt)',
                                      border: `1px solid ${on && hasDeps ? '#f59e0b' : on ? 'var(--brand)' : 'transparent'}`,
                                      borderRadius: 6 }}>
                          <div style={{ width: 13, height: 13, borderRadius: 3, border: `1.5px solid ${on ? 'var(--brand)' : 'var(--border-strong)'}`, background: on ? 'var(--brand)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {on && <UIIcon name="check" size={9} color="#fff" sw={3}/>}
                          </div>
                          <span style={{ fontSize: 12, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</span>
                          <span className="f-mono" style={{ fontSize: 10, color: on ? 'var(--brand)' : 'var(--text-3)' }}>+{s.price}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div style={{ padding: '14px 36px', borderTop: '1px solid var(--border)', background: 'var(--bg-alt)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: 13, color: 'var(--text-3)' }}>Annual save −15%: </span>
          <span className="f-mono" style={{ fontSize: 14, fontWeight: 600 }}>SAR {(b.total * 0.85 * 12) | 0} /yr</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn ghost" onClick={b.clear} disabled={b.picked.size === 0}>Clear</button>
          <button className="btn primary" onClick={onOpenProto}>See pricing →</button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ModulesHero });
