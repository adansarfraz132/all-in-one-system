// Prototype flow — formal, clean nav

const PROTO_SCREENS = [
  { id: 'landing',  name: '1. Landing' },
  { id: 'modules',  name: '2. Build bundle' },
  { id: 'hrDetail', name: '3. HR sample' },
  { id: 'pricing',  name: '4. Pricing' },
  { id: 'capture',  name: '5. Tell us' },
  { id: 'thanks',   name: '6. Thanks' },
];

const Proto = ({ onClose }) => {
  const [screen, setScreen] = useState(() => localStorage.getItem('proto.screen') || 'landing');
  const [which, setWhich] = useState('A');
  useEffect(() => { localStorage.setItem('proto.screen', screen); }, [screen]);

  const go = (id) => setScreen(id);
  const idx = PROTO_SCREENS.findIndex(s => s.id === screen);
  const next = () => idx < PROTO_SCREENS.length - 1 && go(PROTO_SCREENS[idx+1].id);
  const prev = () => idx > 0 && go(PROTO_SCREENS[idx-1].id);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-alt)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14, background: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
        <button className="btn sm" onClick={onClose}>← Back to wireframes</button>
        <div style={{ flex: 1, display: 'flex', gap: 4, overflow: 'auto' }}>
          {PROTO_SCREENS.map(s => (
            <button key={s.id} className={`btn sm ${s.id === screen ? 'primary' : 'ghost'}`} onClick={() => go(s.id)}>{s.name}</button>
          ))}
        </div>
        {screen === 'landing' && (
          <div style={{ display: 'flex', gap: 4, padding: 2, background: 'var(--bg-alt)', borderRadius: 999 }}>
            <button className={`btn sm ${which==='A' ? 'primary' : 'ghost'}`} onClick={() => setWhich('A')}>Hero A</button>
            <button className={`btn sm ${which==='B' ? 'primary' : 'ghost'}`} onClick={() => setWhich('B')}>Hero B</button>
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: 24 }}>
        <div className="card" style={{ width: 1280, minHeight: 820, overflow: 'hidden', boxShadow: 'var(--sh-lg)' }}>
          {screen === 'landing'  && (which === 'A' ? <LandingA onOpenProto={() => go('modules')}/> : <LandingB onOpenProto={() => go('modules')}/>)}
          {screen === 'modules'  && <ModulesCustomizable onOpenProto={() => go('pricing')}/>}
          {screen === 'hrDetail' && <DetailHR onOpenProto={() => go('pricing')}/>}
          {screen === 'pricing'  && <PricingCustom onOpenProto={() => go('capture')}/>}
          {screen === 'capture'  && <CaptureChecklistV2 onSubmit={() => go('thanks')}/>}
          {screen === 'thanks'   && <ThankYou onRestart={() => go('landing')}/>}
        </div>
      </div>

      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10, background: '#fff', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn sm" onClick={prev} disabled={idx === 0}>← Previous</button>
        <span style={{ fontSize: 12, color: 'var(--text-4)' }}>Use top tabs or prev/next</span>
        <button className="btn sm primary" onClick={next} disabled={idx === PROTO_SCREENS.length - 1}>Next →</button>
      </div>
    </div>
  );
};

const ThankYou = ({ onRestart }) => {
  const b = useBundle();
  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--bg)', padding: '56px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, textAlign: 'center' }}>
      <div style={{ width: 64, height: 64, borderRadius: 32, background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand)', fontSize: 28 }}>✓</div>
      <h2 className="f-display" style={{ fontSize: 36, margin: 0 }}>Shukran. You shaped our roadmap.</h2>
      <p className="f-body" style={{ fontSize: 15, color: 'var(--text-3)', maxWidth: 520, margin: 0 }}>
        {b.picked.size} feature{b.picked.size === 1 ? '' : 's'} on your wishlist · SAR {b.total} /emp/mo. We'll follow up in 48 hours with a tailored rollout plan.
      </p>
      {b.picked.size > 0 && (
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 700 }}>
          {[...b.picked].map(id => { const s = findSub(id); return s ? <span key={id} className="chip brand">{s.name}</span> : null; })}
        </div>
      )}
      <button className="btn" onClick={onRestart}>↺ Restart prototype</button>
    </div>
  );
};

Object.assign(window, { Proto });
