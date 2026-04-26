// Pricing + Capture — formal style using shared BundleContext

const PricingCustom = ({ onOpenProto }) => {
  const b = useBundle();
  const groups = {};
  [...b.picked].forEach(id => { const s = findSub(id); if (!s) return; (groups[s.parent] ||= []).push(s); });
  const savings = b.total * 2.3 | 0;

  return (
    <div style={{ width: '100%', background: 'var(--bg)', padding: '28px 40px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <span className="chip brand" style={{ marginBottom: 8 }}>PRICING</span>
        <h2 className="f-display" style={{ fontSize: 30, margin: '4px 0 4px' }}>One line per feature. One bill.</h2>
        <p className="f-body" style={{ fontSize: 13, color: 'var(--text-3)', margin: 0 }}>Per employee, per month. Annual contracts save 15%. No minimum feature count.</p>
      </div>

      <div className="site-grid-2-wide">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingRight: 6 }}>
          {MODULES.map(m => {
            const subs = subsByParent(m.id);
            return (
              <div key={m.id} className="card" style={{ padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <AppIcon tone={m.tone} glyph={m.glyph} size={28}/>
                  <span className="f-head" style={{ fontSize: 14 }}>{m.name}</span>
                  <div style={{ flex: 1 }}/>
                  <button className="btn sm ghost" onClick={() => b.pickAll(subs.map(s => s.id))}>+ all</button>
                </div>
                <div className="site-grid-2-tight">
                  {subs.map(s => {
                    const on = b.picked.has(s.id);
                    return (
                      <div key={s.id} className="clickable" onClick={() => b.toggle(s.id)}
                           style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8, background: on ? 'var(--brand-soft)' : 'var(--bg-alt)', border: `1px solid ${on ? 'var(--brand)' : 'transparent'}`, borderRadius: 6 }}>
                        <div style={{ width: 14, height: 14, borderRadius: 3, border: `1.5px solid ${on ? 'var(--brand)' : 'var(--border-strong)'}`, background: on ? 'var(--brand)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {on && <UIIcon name="check" size={10} color="#fff" sw={3}/>}
                        </div>
                        <span style={{ fontSize: 12, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
                        <span className="f-mono" style={{ fontSize: 11, color: on ? 'var(--brand)' : 'var(--text-3)' }}>+{s.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="card dark" style={{ padding: 22, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', letterSpacing: 1.5 }}>YOUR CUSTOM BUNDLE</div>
          <div className="f-display" style={{ fontSize: 42, margin: '4px 0 0', color: '#fff' }}>SAR {b.total}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', marginBottom: 12 }}>per employee, per month · {b.picked.size} features</div>

          <hr className="sep" style={{ borderColor: 'rgba(255,255,255,.1)' }}/>

          <div style={{ flex: 1, margin: '10px 0' }}>
            {Object.keys(groups).length === 0 ? (
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', padding: '30px 0', textAlign: 'center' }}>↳ Tick features to build your bundle</div>
            ) : (
              Object.keys(groups).map(k => {
                const mod = MODULES.find(m => m.id === k);
                const items = groups[k];
                const sum = items.reduce((s, i) => s + i.price, 0);
                return (
                  <div key={k} style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                      <span className="f-head" style={{ fontSize: 12, color: '#fff' }}>{mod?.name}</span>
                      <span className="f-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,.75)' }}>SAR {sum}</span>
                    </div>
                    {items.map(i => (
                      <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0 2px 8px' }}>
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,.65)' }}>{i.name}</span>
                        <span className="f-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,.5)' }}>+{i.price}</span>
                      </div>
                    ))}
                  </div>
                );
              })
            )}
          </div>

          <hr className="sep" style={{ borderColor: 'rgba(255,255,255,.1)' }}/>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', marginTop: 8 }}>Estimated stack savings</div>
          <div className="f-display" style={{ fontSize: 22, color: '#ffd766' }}>~SAR {savings} /emp/mo</div>

          <button className="btn lg" style={{ marginTop: 14, background: '#fff', color: '#000', borderColor: '#fff' }} onClick={onOpenProto}>Start 60-day trial</button>
        </div>
      </div>
    </div>
  );
};

const CaptureChecklistV2 = ({ onSubmit }) => {
  const b = useBundle();
  return (
    <div style={{ width: '100%', background: 'var(--bg)', padding: '28px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <span className="chip brand" style={{ marginBottom: 8 }}>TELL US WHAT YOU NEED</span>
        <h2 className="f-display" style={{ fontSize: 30, margin: '4px 0 4px' }}>Which of these would you actually use?</h2>
        <p className="f-body" style={{ fontSize: 13, color: 'var(--text-3)', margin: 0 }}>Tick every feature that matters. Picks carry over from the bundle screen.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {MODULES.map(m => {
          const subs = subsByParent(m.id);
          const cnt = subs.filter(s => b.picked.has(s.id)).length;
          return (
            <div key={m.id} className="card" style={{ padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <AppIcon tone={m.tone} glyph={m.glyph} size={28}/>
                <span className="f-head" style={{ fontSize: 14 }}>{m.name}</span>
                {cnt > 0 && <span className="chip brand">{cnt}/{subs.length}</span>}
              </div>
              <div className="site-grid-3-tight">
                {subs.map(s => {
                  const on = b.picked.has(s.id);
                  return (
                    <div key={s.id} className="clickable" onClick={() => b.toggle(s.id)}
                         style={{ padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 8, background: on ? 'var(--brand)' : 'var(--bg-alt)', color: on ? '#fff' : 'var(--text)', borderRadius: 6 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, border: `1.5px solid ${on ? '#fff' : 'var(--border-strong)'}`, background: on ? '#fff' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {on && <UIIcon name="check" size={9} color="var(--brand)" sw={3}/>}
                      </div>
                      <span style={{ fontSize: 11 }}>{s.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="card" style={{ padding: 14, display: 'flex', gap: 10, alignItems: 'center', background: 'var(--bg-alt)', border: 'none' }}>
        <span className="f-head" style={{ fontSize: 14 }}>{b.picked.size} features · SAR {b.total} /emp/mo</span>
        <div style={{ flex: 1 }}/>
        <input placeholder="Company name" style={{ padding: '8px 12px', fontFamily: 'inherit', fontSize: 13, width: 180, border: '1px solid var(--border-strong)', borderRadius: 8, outline: 'none' }}/>
        <button className="btn brand" onClick={onSubmit}>Send my picks</button>
      </div>
    </div>
  );
};

Object.assign(window, { PricingCustom, CaptureChecklistV2 });
