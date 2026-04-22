// Landings — hybrid formal style. Real logos. Hero + proof + Odoo-grouped apps grid.

const TopNav = ({ onOpenProto, dark }) => (
  <div style={{
    padding: '18px 48px',
    display: 'flex', alignItems: 'center', gap: 32,
    borderBottom: dark ? '1px solid rgba(255,255,255,.08)' : '1px solid var(--border)',
    background: dark ? 'transparent' : 'var(--bg)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <SanabilStudioLogo height={22} invert={dark}/>
      <span style={{ fontSize: 13, color: dark ? 'rgba(255,255,255,.5)' : 'var(--text-4)',
                     borderLeft: dark ? '1px solid rgba(255,255,255,.18)' : '1px solid var(--border-strong)',
                     paddingLeft: 12, marginLeft: 2, letterSpacing: 0.2 }}>All in One</span>
    </div>
    <div style={{ flex: 1, display: 'flex', gap: 24 }}>
      {['Product', 'Solutions', 'Pricing', 'Customers', 'Resources'].map(x => (
        <span key={x} style={{ fontSize: 14, color: dark ? 'rgba(255,255,255,.75)' : 'var(--text-2)', cursor: 'pointer' }}>{x}</span>
      ))}
    </div>
    <span style={{ fontSize: 14, color: dark ? 'rgba(255,255,255,.75)' : 'var(--text-2)', cursor: 'pointer' }}>Login</span>
    <button className="btn sm" onClick={onOpenProto} style={dark ? { background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.3)' } : {}}>Book a demo</button>
    <button className="btn sm primary" onClick={onOpenProto} style={dark ? { background: '#fff', color: '#1a1629', borderColor: '#fff' } : {}}>Get started →</button>
  </div>
);

const TrustBar = ({ dark }) => (
  <div style={{
    padding: '22px 48px',
    display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap',
    borderTop: dark ? '1px solid rgba(255,255,255,.06)' : '1px solid var(--border)',
    background: dark ? 'rgba(255,255,255,.03)' : 'var(--bg-alt)',
  }}>
    <span style={{ fontSize: 11, letterSpacing: 1.8, color: dark ? 'rgba(255,255,255,.5)' : 'var(--text-4)', fontWeight: 500 }}>INCUBATED & BACKED BY</span>
    <SanabilStudioLogo height={30} invert={dark}/>
    <div style={{ width: 1, height: 60, background: dark ? 'rgba(255,255,255,.15)' : 'var(--border-strong)' }}/>
    <SanabilInvestmentsLogo height={80} invert={dark}/>
    <div style={{ flex: 1 }}/>
    <span style={{ fontSize: 12, color: dark ? 'rgba(255,255,255,.6)' : 'var(--text-3)' }}>PIF-backed · $3B AUM · Trusted by teams across KSA & MENA</span>
  </div>
);

// LANDING A — HYBRID: dark hero + Odoo-grouped apps grid + proof sections. Best of both.
const LandingA = ({ onOpenProto }) => (
  <div style={{ width: '100%', height: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>

    {/* 1. Dark hero */}
    <div style={{ background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-deep-2) 100%)', color: '#fff' }}>
      <TopNav onOpenProto={onOpenProto} dark/>
      <div style={{ padding: '80px 48px 64px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center', maxWidth: 1280, margin: '0 auto' }}>
        <div>
          <span className="chip dark" style={{ marginBottom: 20 }}>⌘  Built for SMBs & mid-market · KSA & MENA</span>
          <h1 className="f-display" style={{ fontSize: 60, lineHeight: 1.04, margin: '0 0 20px', color: '#fff', letterSpacing: -1.5 }}>
            Run the whole company<br/>from <span style={{ color: '#c8a6e8' }}>one window</span>.
          </h1>
          <p className="f-body" style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(255,255,255,.72)', maxWidth: 520, margin: '0 0 28px' }}>
            HR, payroll, finance, IT, compliance — connected on a single system of record, built for how teams in KSA and MENA actually operate. Turn on what you need. Pay for nothing you don't.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn lg" onClick={onOpenProto} style={{ background: '#fff', color: '#1a1629', borderColor: '#fff' }}>Book a demo</button>
            <button className="btn lg" onClick={onOpenProto} style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.28)' }}>Build your bundle →</button>
          </div>
          <div style={{ display: 'flex', gap: 22, marginTop: 32, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,.08)' }}>
            {[['11', 'modules'], ['40+', 'features'], ['< 1 min', 'onboard'], ['100%', 'KSA-compliant']].map(([k, v]) => (
              <div key={v}>
                <div className="f-display" style={{ fontSize: 22, color: '#fff' }}>{k}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', letterSpacing: 1 }}>{v.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Product mock */}
        <div style={{ position: 'relative' }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: 18, boxShadow: '0 40px 100px rgba(0,0,0,.5)', color: 'var(--text)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: '#f36' }}/>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: '#fc0' }}/>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: '#3c6' }}/>
              <div style={{ flex: 1, marginLeft: 12, padding: '4px 10px', fontSize: 11, background: 'var(--bg-alt)', borderRadius: 6, color: 'var(--text-3)' }}>sanabil-studio.app/people</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <AppIcon tone="pink" glyph="users" size={28}/>
              <div style={{ fontWeight: 600, fontSize: 14 }}>HR & People</div>
              <div style={{ flex: 1 }}/>
              <div style={{ display: 'flex', gap: 6 }}>
                {['Country', 'Team', 'Role'].map(x => (
                  <div key={x} style={{ padding: '3px 10px', fontSize: 11, background: 'var(--bg-alt)', borderRadius: 999, color: 'var(--text-3)' }}>{x} ▾</div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              {[
                ['#5b2a78', 'A'], ['#e4588a', 'L'], ['#3fb5b0', 'M'], ['#f28b4d', 'O'], ['#3b82f6', 'Y'],
              ].map(([c, ch], i) => (
                <div key={i} style={{ width: 52, height: 52, borderRadius: 26, background: c, border: '3px solid #fff', marginLeft: i===0?0:-12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 16 }}>{ch}</div>
              ))}
              <div style={{ width: 52, height: 52, borderRadius: 26, background: 'var(--bg-alt)', border: '3px solid #fff', marginLeft: -12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)', fontSize: 11, fontWeight: 500 }}>+282</div>
            </div>
            <div style={{ marginTop: 16, padding: '10px 12px', background: '#ebf9f0', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#0f5132' }}>
              <span style={{ color: '#16a34a' }}>●</span> <b>Abdulaziz</b> onboarded in 11 minutes — payroll, IT, docs ready.
            </div>
          </div>
          {/* floating notification cards */}
          <div style={{ position: 'absolute', top: -20, right: -30, background: '#fff', borderRadius: 10, padding: '10px 14px', boxShadow: '0 12px 28px rgba(0,0,0,.25)', fontSize: 12, color: 'var(--text)', display: 'flex', gap: 8, alignItems: 'center' }}>
            <AppIcon tone="green" glyph="payroll" size={24}/>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-3)' }}>Payroll run</div>
              <div style={{ fontWeight: 600, fontSize: 12 }}>287 payslips sent ✓</div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: -18, left: -24, background: '#fff', borderRadius: 10, padding: '10px 14px', boxShadow: '0 12px 28px rgba(0,0,0,.25)', fontSize: 12, color: 'var(--text)', display: 'flex', gap: 8, alignItems: 'center' }}>
            <AppIcon tone="red" glyph="comply" size={24}/>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-3)' }}>Saudization</div>
              <div style={{ fontWeight: 600, fontSize: 12 }}>73% · Platinum</div>
            </div>
          </div>
        </div>
      </div>
      <TrustBar dark/>
    </div>

    {/* 2. Problem / solution */}
    <div style={{ padding: '80px 48px 56px', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: 12, letterSpacing: 2, color: 'var(--text-4)', fontWeight: 500, marginBottom: 10 }}>ONE PLATFORM</div>
      <h2 className="f-display" style={{ fontSize: 42, margin: '0 0 14px', letterSpacing: -1 }}>One platform. Zero headaches.</h2>
      <p className="f-body" style={{ fontSize: 16, color: 'var(--text-3)', maxWidth: 600, margin: '0 auto 44px' }}>
        Stop juggling 15 tools that don't talk to each other. Run every operation on one system of record.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Without */}
        <div className="card" style={{ padding: 28, textAlign: 'left', background: 'var(--bg-alt)' }}>
          <div className="f-head" style={{ fontSize: 18, marginBottom: 14 }}>Without Sanabil Studio</div>
          <div style={{ position: 'relative', height: 180, marginBottom: 16 }}>
            <svg viewBox="0 0 400 180" style={{ width: '100%', height: '100%' }}>
              {[[60,40],[140,30],[240,50],[340,35],[80,110],[180,130],[280,100],[60,150],[320,150],[200,80]].map(([x,y],i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="14" fill="#fff" stroke="var(--border-strong)" strokeWidth="1.5"/>
                  <circle cx={x} cy={y} r="3" fill="var(--brand)"/>
                </g>
              ))}
              {[[60,40,140,30],[140,30,240,50],[240,50,340,35],[80,110,180,130],[180,130,280,100],[60,150,320,150],[200,80,280,100],[60,40,80,110]].map(([x1,y1,x2,y2],i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3"/>
              ))}
            </svg>
          </div>
          {['Data silos — tools that don\'t sync', 'Manual payroll + compliance filings', 'Fines from missed Saudization filings'].map(x => (
            <div key={x} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '6px 0', fontSize: 13, color: 'var(--text-2)' }}>
              <span style={{ color: 'var(--danger)', fontSize: 14, lineHeight: 1.2 }}>✕</span> {x}
            </div>
          ))}
        </div>

        {/* With */}
        <div className="card" style={{ padding: 28, textAlign: 'left', background: '#f7f3fb' }}>
          <div className="f-head" style={{ fontSize: 18, marginBottom: 14 }}>With Sanabil Studio</div>
          <div style={{ position: 'relative', height: 180, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 300 180" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              {[0,1,2,3,4,5,6,7].map(i => {
                const a = (i/8)*Math.PI*2;
                return <line key={i} x1="150" y1="90" x2={150+Math.cos(a)*70} y2={90+Math.sin(a)*50} stroke="var(--brand)" strokeWidth="1.2" opacity=".4"/>;
              })}
            </svg>
            <div style={{ position: 'relative', background: '#fff', padding: 12, borderRadius: 12, boxShadow: 'var(--sh-md)', minWidth: 190 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 32, height: 32, borderRadius: 16, background: 'var(--brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>A</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>Abdulaziz</div>
                  <div style={{ fontSize: 10, color: 'var(--text-4)' }}>Product Owner</div>
                </div>
              </div>
              <div style={{ fontSize: 10, background: '#ddf5e9', color: '#0f5132', padding: '4px 8px', borderRadius: 4 }}>✓ Onboarded in 12 min</div>
            </div>
          </div>
          {['Unified record · one source of truth', 'Payroll + benefits + IT in one flow', '100% compliance with KSA + GCC laws'].map(x => (
            <div key={x} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '6px 0', fontSize: 13, color: 'var(--text-2)' }}>
              <span style={{ color: 'var(--ok)', fontSize: 14, lineHeight: 1.2 }}>✓</span> {x}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* 3. Odoo-style grouped apps grid (from LandingB) */}
    <div style={{ padding: '40px 48px 72px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 44 }}>
        <div style={{ fontSize: 12, letterSpacing: 2, color: 'var(--text-4)', fontWeight: 500, marginBottom: 10 }}>THE FULL STACK</div>
        <h2 className="f-display" style={{ fontSize: 38, margin: 0, maxWidth: 640, marginInline: 'auto', letterSpacing: -0.5 }}>
          Every function your company runs — under one roof.
        </h2>
      </div>
      {['Human Resources', 'Finance', 'Operations'].map(group => {
        const items = MODULES.filter(m => m.group === group);
        return (
          <div key={group} style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
              <h3 className="f-script" style={{ fontSize: 28, margin: 0, color: 'var(--text)' }}>{group}</h3>
              <span style={{ fontSize: 12, color: 'var(--text-4)' }}>· {items.length} apps</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {items.map(m => (
                <div key={m.id} className="card hover clickable" style={{ padding: '14px 16px', display: 'flex', gap: 14, alignItems: 'center' }} onClick={onOpenProto}>
                  <AppIcon tone={m.tone} glyph={m.glyph}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="f-head" style={{ fontSize: 15 }}>{m.name}</span>
                      {m.tag && <span className="chip brand" style={{ fontSize: 9 }}>{m.tag}</span>}
                    </div>
                    <div className="f-body" style={{ fontSize: 12, color: 'var(--text-3)' }}>
                      {m.id === 'hr' && 'Centralize employee information'}
                      {m.id === 'payroll' && 'WPS + GOSI + bank files'}
                      {m.id === 'ats' && 'Recruitment pipeline'}
                      {m.id === 'perf' && 'Reviews, OKRs, 1:1s'}
                      {m.id === 'it' && 'Devices + SSO + access'}
                      {m.id === 'finance' && 'Accounting + invoicing + GL'}
                      {m.id === 'expenses' && 'Cards & receipt capture'}
                      {m.id === 'procure' && 'POs, vendors, budgets'}
                      {m.id === 'travel' && 'Book, track, reconcile'}
                      {m.id === 'projects' && 'Tasks, time, billing'}
                      {m.id === 'comply' && 'Saudization, Qiwa, Mudad'}
                    </div>
                  </div>
                  <UIIcon name="chevronRight" size={14} color="var(--text-4)"/>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>

    {/* 4. How it works */}
    <div style={{ padding: '40px 48px 100px', maxWidth: 1200, margin: '0 auto', background: 'var(--bg-alt)' }}>
      <div style={{ textAlign: 'center', marginBottom: 44, paddingTop: 30 }}>
        <div style={{ fontSize: 12, letterSpacing: 2, color: 'var(--text-4)', fontWeight: 500, marginBottom: 10 }}>HOW IT WORKS</div>
        <h2 className="f-display" style={{ fontSize: 36, margin: 0, maxWidth: 640, marginInline: 'auto', letterSpacing: -0.5 }}>Do more in less time with fewer tools.</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {[
          { tone: 'green', glyph: 'payroll', t: 'Eliminate payroll delays', s: 'Run accurate payroll in minutes. We handle WPS, GOSI, taxes, and filings — automatically.' },
          { tone: 'red', glyph: 'comply', t: 'Avoid costly fines', s: 'From contracts to compliance alerts, we keep you aligned with KSA regulations at all times.' },
          { tone: 'pink', glyph: 'users', t: 'One record for every employee', s: 'A unified HRIS — worker info, time off, expenses, performance, reporting. All in one place.' },
        ].map(f => (
          <div key={f.t} className="card hover" style={{ padding: 26, background: '#fff', border: 'none' }}>
            <AppIcon tone={f.tone} glyph={f.glyph} size={44}/>
            <h3 className="f-head" style={{ fontSize: 17, margin: '16px 0 6px' }}>{f.t}</h3>
            <p className="f-body" style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55, margin: 0 }}>{f.s}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// LANDING B — Odoo-style light hero + all apps grid
const LandingB = ({ onOpenProto }) => (
  <div style={{ width: '100%', height: '100%', background: 'var(--bg)', overflow: 'auto' }}>
    <TopNav onOpenProto={onOpenProto}/>
    <div style={{ padding: '64px 48px 40px', textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
      <h1 className="f-display" style={{ fontSize: 56, lineHeight: 1.05, margin: '0 0 18px', letterSpacing: -1.5 }}>
        One need, <span style={{ color: 'var(--brand)' }}>one app</span>.
      </h1>
      <p className="f-body" style={{ fontSize: 17, color: 'var(--text-3)', maxWidth: 600, margin: '0 auto 28px' }}>
        Every function your company needs, under one roof — with the flexibility to turn on only what you actually use.
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <button className="btn lg brand" onClick={onOpenProto}>Build your bundle →</button>
        <button className="btn lg" onClick={onOpenProto}>▷ 2-min tour</button>
      </div>
    </div>

    <div style={{ padding: '24px 48px 64px', maxWidth: 1100, margin: '0 auto' }}>
      {['Human Resources', 'Finance', 'Operations'].map(group => {
        const items = MODULES.filter(m => m.group === group);
        return (
          <div key={group} style={{ marginBottom: 36 }}>
            <h3 className="f-script" style={{ fontSize: 30, margin: '0 0 18px', color: 'var(--text)' }}>{group}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {items.map(m => (
                <div key={m.id} className="card hover clickable" style={{ padding: '14px 16px', display: 'flex', gap: 14, alignItems: 'center', background: 'var(--bg-alt)', border: 'none' }} onClick={onOpenProto}>
                  <AppIcon tone={m.tone} glyph={m.glyph}/>
                  <div style={{ flex: 1 }}>
                    <div className="f-head" style={{ fontSize: 15, marginBottom: 2 }}>{m.name}</div>
                    <div className="f-body" style={{ fontSize: 12, color: 'var(--text-3)' }}>
                      {m.id === 'hr' && 'Centralize employee information'}
                      {m.id === 'payroll' && 'WPS + GOSI + bank files'}
                      {m.id === 'ats' && 'Track your recruitment pipeline'}
                      {m.id === 'perf' && 'Reviews, OKRs, 1:1s'}
                      {m.id === 'it' && 'Devices + SSO + access'}
                      {m.id === 'finance' && 'Accounting, invoicing, GL'}
                      {m.id === 'expenses' && 'Corporate cards & receipts'}
                      {m.id === 'procure' && 'POs, vendors, budgets'}
                      {m.id === 'travel' && 'Book, track, reconcile'}
                      {m.id === 'projects' && 'Tasks, time, billing'}
                      {m.id === 'comply' && 'Saudization, Qiwa, Mudad'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>

    <TrustBar/>
  </div>
);

Object.assign(window, { LandingA, LandingB, TopNav, TrustBar });
