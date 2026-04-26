// Website flow — hash-routed, responsive pages

const PROTO_ROUTES = [
  { id: 'home', name: 'Home' },
  { id: 'solutions', name: 'Build bundle' },
  { id: 'product', name: 'Product' },
  { id: 'pricing', name: 'Pricing' },
  { id: 'contact', name: 'Contact' },
  { id: 'thanks', name: 'Thanks' },
];

const NAV_ROUTES = PROTO_ROUTES.filter(r => r.id !== 'thanks');
const isValidRoute = (hash) => PROTO_ROUTES.some(r => r.id === hash);
const getRouteFromHash = () => {
  const raw = (window.location.hash || '').replace(/^#/, '');
  return isValidRoute(raw) ? raw : 'home';
};

const ProtoNav = ({ route, navigate }) => (
  <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, background: '#fff', position: 'sticky', top: 0, zIndex: 12, flexWrap: 'wrap' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <SanabilStudioLogo height={20}/>
      <span style={{ fontSize: 12, color: 'var(--text-4)', borderLeft: '1px solid var(--border-strong)', paddingLeft: 10 }}>All in One</span>
    </div>
    <div style={{ display: 'flex', gap: 4, flex: 1, flexWrap: 'wrap' }}>
      {NAV_ROUTES.map(item => (
        <button
          key={item.id}
          className={`btn sm ${route === item.id ? 'primary' : 'ghost'}`}
          onClick={() => navigate(item.id)}
        >
          {item.name}
        </button>
      ))}
    </div>
    <span className="chip brand" style={{ fontSize: 10 }}>Website</span>
  </div>
);

const Proto = () => {
  const [screen, setScreen] = useState(getRouteFromHash);
  const [which, setWhich] = useState('A');
  const [productTab, setProductTab] = useState('dashboard');

  useEffect(() => {
    const onHash = () => setScreen(getRouteFromHash());
    window.addEventListener('hashchange', onHash);
    if (!isValidRoute((window.location.hash || '').replace(/^#/, ''))) {
      window.location.hash = '#home';
    }
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = (id) => {
    window.location.hash = `#${id}`;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <ProtoNav route={screen} navigate={go}/>
      {screen === 'home' && (
        <div>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', background: 'var(--bg-alt)', display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: 4, padding: 2, background: '#fff', borderRadius: 999 }}>
              <button className={`btn sm ${which==='A' ? 'primary' : 'ghost'}`} onClick={() => setWhich('A')}>Hero A</button>
              <button className={`btn sm ${which==='B' ? 'primary' : 'ghost'}`} onClick={() => setWhich('B')}>Hero B</button>
            </div>
          </div>
          {which === 'A' ? <LandingA showTopNav={false} onOpenProto={() => go('solutions')}/> : <LandingB showTopNav={false} onOpenProto={() => go('solutions')}/>}
        </div>
      )}
      {screen === 'solutions' && <ModulesCustomizable onOpenProto={() => go('pricing')}/>}
      {screen === 'product' && (
        <div>
          {productTab === 'dashboard' && <DetailHR onOpenProto={() => go('pricing')} onNavigateView={setProductTab}/>}
          {productTab === 'org' && <DetailOrg onNavigateView={setProductTab}/>}
          {productTab === 'timeoff' && <DetailTimeOff onNavigateView={setProductTab}/>}
        </div>
      )}
      {screen === 'pricing' && <PricingCustom onOpenProto={() => go('contact')}/>}
      {screen === 'contact' && <CaptureChecklistV2 onSubmit={() => go('thanks')}/>}
      {screen === 'thanks' && <ThankYou onRestart={() => go('home')}/>}
    </div>
  );
};

const ThankYou = ({ onRestart }) => {
  const b = useBundle();
  return (
    <div style={{ width: '100%', minHeight: 'calc(100vh - 72px)', background: 'var(--bg)', padding: '56px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, textAlign: 'center' }}>
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
      <button className="btn" onClick={onRestart}>↺ Restart flow</button>
    </div>
  );
};

Object.assign(window, { Proto });
