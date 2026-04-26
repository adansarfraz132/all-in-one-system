// Modules picker + HR dashboard — formal product-marketing style

const BundleContext = React.createContext(null);

const BundleProvider = ({ children }) => {
  const [picked, setPicked] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('bundle.v3') || '[]')); }
    catch { return new Set(); }
  });
  useEffect(() => { localStorage.setItem('bundle.v3', JSON.stringify([...picked])); }, [picked]);
  const toggle = (id) => { const n = new Set(picked); n.has(id) ? n.delete(id) : n.add(id); setPicked(n); };
  const clear = () => setPicked(new Set());
  const pickAll = (ids) => setPicked(new Set([...picked, ...ids]));
  const total = [...picked].reduce((s, id) => s + (findSub(id)?.price || 0), 0);
  return <BundleContext.Provider value={{ picked, toggle, clear, pickAll, total }}>{children}</BundleContext.Provider>;
};

const useBundle = () => React.useContext(BundleContext);

// Dependency warning banner
const DependencyBanner = () => {
  const b = useBundle();
  const warnings = getDependencyWarnings(b.picked);
  if (warnings.length === 0) return null;
  const allMissing = [...new Set(warnings.flatMap(w => w.missing.map(m => m.id)))];
  return (
    <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: 10, padding: '10px 14px', marginBottom: 14, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <UIIcon name="warn" size={18} color="#92400e"/>
      <div style={{ flex: 1, fontSize: 12, color: '#7c2d12', lineHeight: 1.5 }}>
        <b style={{ color: '#92400e' }}>Heads up — {warnings.length} feature{warnings.length === 1 ? '' : 's'} need{warnings.length === 1 ? 's' : ''} a dependency.</b><br/>
        {warnings.slice(0, 3).map((w, i) => (
          <span key={i}><b>{w.sub.name}</b> needs {w.missing.map(m => m.name).join(' + ')}{i < Math.min(warnings.length, 3) - 1 ? '; ' : ''}</span>
        ))}
        {warnings.length > 3 && <span> · +{warnings.length - 3} more</span>}
      </div>
      <button className="btn sm brand" onClick={() => b.pickAll(allMissing)}>Auto-add deps</button>
    </div>
  );
};

// MODULES PICKER — clean, Odoo-grouped + side summary
const ModulesCustomizable = ({ onOpenProto }) => {
  const b = useBundle();
  const groups = ['Human Resources', 'Finance', 'Revenue & Customers', 'Operations'];
  const totalSubs = SUBFUNCTIONS.length;

  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '28px 40px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <span className="chip brand" style={{ marginBottom: 10 }}>BUILD YOUR BUNDLE</span>
            <h2 className="f-display" style={{ fontSize: 30, margin: '4px 0 4px' }}>Pick exactly what you need.</h2>
            <p className="f-body" style={{ fontSize: 14, color: 'var(--text-3)', margin: 0 }}>
              Turn on individual features across {MODULES.length} modules ({totalSubs} sub-features). Price updates as you go — no module, no bill.
            </p>
          </div>
          <div className="card" style={{ padding: '14px 18px', minWidth: 220, background: 'var(--text)', color: '#fff', border: 'none' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', letterSpacing: 1.2 }}>YOUR BUNDLE</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
              <span className="f-display" style={{ fontSize: 26 }}>SAR {b.total}</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,.6)' }}>/ emp / mo</span>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.7)', marginTop: 2 }}>{b.picked.size} features selected</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 300px', minHeight: 0 }}>
        <div className="scroll" style={{ padding: '20px 40px' }}>
          <DependencyBanner/>
          {groups.map(g => {
            const mods = MODULES.filter(m => m.group === g);
            if (mods.length === 0) return null;
            return (
              <div key={g} style={{ marginBottom: 32 }}>
                <h3 className="f-script" style={{ fontSize: 26, margin: '0 0 14px' }}>{g}</h3>
                {mods.map(m => {
                  const subs = subsByParent(m.id);
                  const pickedCount = subs.filter(s => b.picked.has(s.id)).length;
                  return (
                    <div key={m.id} className="card" style={{ padding: 16, marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                        <AppIcon tone={m.tone} glyph={m.glyph}/>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span className="f-head" style={{ fontSize: 15 }}>{m.name}</span>
                            {m.tag && <span className="chip brand">{m.tag}</span>}
                          </div>
                          <div className="f-body" style={{ fontSize: 12, color: 'var(--text-3)' }}>
                            {pickedCount > 0 ? `${pickedCount} of ${subs.length} selected` : `${subs.length} features available`}
                          </div>
                        </div>
                        <button className="btn sm ghost" onClick={() => b.pickAll(subs.map(s => s.id))}>+ Select all</button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
                        {subs.map(s => {
                          const on = b.picked.has(s.id);
                          const hasDeps = s.requires && s.requires.some(r => !b.picked.has(r));
                          return (
                            <div key={s.id} className="clickable" onClick={() => b.toggle(s.id)}
                                 style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 10,
                                          background: on ? 'var(--brand-soft)' : 'var(--bg-alt)',
                                          border: `1px solid ${on && hasDeps ? '#f59e0b' : on ? 'var(--brand)' : 'transparent'}`,
                                          borderRadius: 8, transition: 'all 120ms' }}>
                              <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${on ? 'var(--brand)' : 'var(--border-strong)'}`, background: on ? 'var(--brand)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                {on && <UIIcon name="check" size={11} color="#fff" sw={3}/>}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <span className="f-head" style={{ fontSize: 13 }}>{s.name}</span>
                                  {s.requires && <span title={'Requires: ' + s.requires.join(', ')} style={{ fontSize: 9, color: on && hasDeps ? '#92400e' : 'var(--text-4)', background: on && hasDeps ? '#fef3c7' : 'var(--bg-alt)', padding: '1px 5px', borderRadius: 4, fontWeight: 600 }}>↳ deps</span>}
                                </div>
                                <div className="f-body" style={{ fontSize: 11, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.desc}</div>
                              </div>
                              <span className="f-mono" style={{ fontSize: 11, color: on ? 'var(--brand)' : 'var(--text-3)' }}>+{s.price}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Right summary — sticky */}
        <div style={{ borderLeft: '1px solid var(--border)', background: 'var(--bg-alt)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <div className="f-head" style={{ fontSize: 14 }}>Your bundle</div>
            <div className="f-body" style={{ fontSize: 11, color: 'var(--text-3)' }}>Live preview · tell us what you need</div>
          </div>
          <div className="scroll" style={{ flex: 1, padding: '12px 20px' }}>
            {b.picked.size === 0 ? (
              <div style={{ padding: '30px 0', textAlign: 'center', fontSize: 13, color: 'var(--text-4)' }}>← Tick features to build your bundle</div>
            ) : (
              MODULES.map(m => {
                const picks = subsByParent(m.id).filter(s => b.picked.has(s.id));
                if (picks.length === 0) return null;
                return (
                  <div key={m.id} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <AppIcon tone={m.tone} glyph={m.glyph} size={20}/>
                      <span className="f-head" style={{ fontSize: 12 }}>{m.name}</span>
                    </div>
                    {picks.map(p => (
                      <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0 3px 28px', fontSize: 12 }}>
                        <span style={{ color: 'var(--text-2)' }}>{p.name}</span>
                        <span className="f-mono" style={{ color: 'var(--text-3)' }}>+{p.price}</span>
                      </div>
                    ))}
                  </div>
                );
              })
            )}
          </div>
          <div style={{ padding: 16, borderTop: '1px solid var(--border)', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
              <span>Monthly</span><span className="f-mono">SAR {b.total} /emp</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ok)', marginBottom: 12 }}>
              <span>Annual save −15%</span><span className="f-mono">SAR {(b.total * 0.85 * 12) | 0}</span>
            </div>
            <button className="btn primary" style={{ width: '100%' }} onClick={onOpenProto}>Send my picks →</button>
            <button className="btn ghost sm" style={{ width: '100%', marginTop: 4 }} onClick={b.clear} disabled={b.picked.size === 0}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// HR DASHBOARD — formal, clean, all clickable
const DetailHR = ({ onOpenProto, onBack, onNavigateView, showSidebar = true }) => {
  const [nav, setNav] = useState('Dashboard');
  const [selTask, setSelTask] = useState(null);
  const tasks = [
    { t: 'Approve leave · Ahmed Khalil · 5 days', s: 'Payroll auto-adjusts. Balance after: 9 days.', urgent: true },
    { t: 'Onboard Layla Saeed — starts Sunday', s: 'IT device + Payroll + Benefits queued', urgent: false },
    { t: 'Sign offer · Omar Faris · Senior Engineer', s: 'Offer expires in 2 days', urgent: true },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14, background: '#fff' }}>
        {onBack && <button className="btn sm ghost" onClick={onBack} style={{ padding: '4px 10px' }}>← Modules</button>}
        <AppIcon tone="pink" glyph="users" size={32}/>
        <span className="f-head" style={{ fontSize: 16 }}>HR & People</span>
        <div style={{ flex: 1 }}/>
        <div className="clickable" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, background: 'var(--bg-alt)', borderRadius: 999, color: 'var(--text-3)' }}>
          <UIIcon name="search" size={13}/> Search people, docs…
        </div>
        <button className="btn sm"><UIIcon name="bell" size={14}/></button>
        <button className="btn sm primary">+ Invite</button>
        <div style={{ width: 30, height: 30, borderRadius: 15, background: 'var(--brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>A</div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: showSidebar ? '200px 1fr' : '1fr', minHeight: 0 }}>
        {showSidebar && (
          <div style={{ borderRight: '1px solid var(--border)', background: 'var(--bg-alt)', padding: 12 }}>
            {['Dashboard', 'People', 'Hiring', 'Time off', 'Documents', 'Org chart', 'Reports'].map(x => (
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
            <hr className="sep" style={{ margin: '12px 0' }}/>
            <div style={{ fontSize: 11, color: 'var(--text-4)', letterSpacing: 1, marginBottom: 6 }}>CONNECTED</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {['Payroll', 'IT', 'Perf.'].map(x => <span key={x} className="chip clickable" onClick={onOpenProto}>{x}</span>)}
            </div>
          </div>
        )}

        <div className="scroll" style={{ padding: '24px 28px' }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, color: 'var(--text-3)' }}>Good morning, Abdulaziz</div>
            <h3 className="f-display" style={{ fontSize: 24, margin: '2px 0 0' }}>Here's what matters today.</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
            {[
              { k: '287', l: 'Active people', trend: '+4 this week', c: 'var(--ok)' },
              { k: '12', l: 'Out today', trend: '3 WFH · 9 leave', c: 'var(--text-3)' },
              { k: '5', l: 'Starting soon', trend: 'Next: Sunday', c: 'var(--brand)' },
              { k: '73%', l: 'Saudization · Platinum', trend: '▲ 2% vs Q1', c: 'var(--ok)' },
            ].map(s => (
              <div key={s.l} className="card hover clickable" style={{ padding: 16 }}>
                <div className="f-display" style={{ fontSize: 26, lineHeight: 1 }}>{s.k}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', margin: '6px 0 4px' }}>{s.l}</div>
                <div className="f-mono" style={{ fontSize: 10, color: s.c }}>{s.trend}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14, marginBottom: 14 }}>
            <div className="card" style={{ padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <h4 className="f-head" style={{ margin: 0, fontSize: 14 }}>Needs you</h4>
                <span className="chip warn">{tasks.length} pending</span>
              </div>
              {tasks.map((t, i) => {
                const open = selTask === i;
                return (
                  <div key={i} className="clickable" onClick={() => setSelTask(open ? null : i)}
                       style={{ padding: '10px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 6, height: 6, borderRadius: 3, background: t.urgent ? 'var(--warn)' : 'var(--text-4)' }}/>
                      <div style={{ fontSize: 13, flex: 1 }}>{t.t}</div>
                      <UIIcon name="chevronRight" size={14} color="var(--text-4)"/>
                    </div>
                    {open && (
                      <div style={{ padding: '8px 0 4px 16px' }}>
                        <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 8 }}>↳ {t.s}</div>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn sm brand" onClick={(e)=>{e.stopPropagation();setSelTask(null);}}>Approve</button>
                          <button className="btn sm ghost" onClick={(e)=>{e.stopPropagation();setSelTask(null);}}>Later</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="card dark" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14 }}>✦</span>
                <span className="f-head" style={{ fontSize: 13 }}>Copilot</span>
                <span className="chip dark">AI</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,.85)' }}>
                Payroll run locks <b style={{ color: '#ffd766' }}>in 3 days</b>. Two timesheets from Projects are unapproved and one card charge from Expenses isn't matched.
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
                <button className="btn sm" style={{ background: '#fff', color: '#000', borderColor: '#fff' }}>Fix now →</button>
                <button className="btn sm" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.3)' }}>Ask</button>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div className="card hover clickable" style={{ padding: 14 }}>
              <div className="f-head" style={{ fontSize: 13, marginBottom: 2 }}>Headcount · 12 mo</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 8 }}>+38 hires · −9 exits</div>
              <svg viewBox="0 0 200 50" style={{ width: '100%', height: 44 }}>
                <path d="M0 42 L20 38 L40 35 L60 36 L80 30 L100 26 L120 22 L140 18 L160 14 L180 10 L200 6"
                      stroke="var(--brand)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M0 42 L20 38 L40 35 L60 36 L80 30 L100 26 L120 22 L140 18 L160 14 L180 10 L200 6 L200 50 L0 50 Z"
                      fill="var(--brand-soft)"/>
              </svg>
            </div>
            <div className="card hover clickable" style={{ padding: 14 }}>
              <div className="f-head" style={{ fontSize: 13, marginBottom: 8 }}>This week</div>
              {[
                { d: 'TUE', l: 'Layla — Day 1', c: 'var(--ok)' },
                { d: 'WED', l: 'All-hands 11am', c: 'var(--text-3)' },
                { d: 'THU', l: 'Payroll lock', c: 'var(--warn)' },
              ].map(x => (
                <div key={x.l} style={{ display: 'flex', gap: 8, padding: '4px 0', fontSize: 12 }}>
                  <span className="f-mono" style={{ color: x.c, width: 36 }}>{x.d}</span>
                  <span>{x.l}</span>
                </div>
              ))}
            </div>
            <div className="card hover clickable" style={{ padding: 14, background: 'var(--brand-soft)', border: 'none' }}>
              <div className="f-head" style={{ fontSize: 13, marginBottom: 2 }}>Team pulse</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 8 }}>eNPS · 30 days</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span className="f-display" style={{ fontSize: 28, color: 'var(--brand)' }}>+42</span>
                <span className="f-mono" style={{ fontSize: 11, color: 'var(--ok)' }}>▲ 8</span>
              </div>
              <div style={{ display: 'flex', gap: 2, marginTop: 8, height: 6 }}>
                {[75, 18, 7].map((p, i) => (
                  <div key={i} style={{ flex: p, background: ['var(--ok)', 'var(--text-4)', 'var(--warn)'][i], borderRadius: 2 }}/>
                ))}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 4 }}>75% promoters · 18% passive · 7% detractors</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { BundleProvider, useBundle, ModulesCustomizable, DetailHR });
