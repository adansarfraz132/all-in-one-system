// Website flow — hash routes + shared navbar

const ROUTES = ['home', 'solutions', 'product', 'pricing', 'contact', 'thanks'];
const NAV_ITEMS = [
  { route: 'home', label: 'Home' },
  { route: 'solutions', label: 'Build bundle' },
  { route: 'product', label: 'Product' },
  { route: 'pricing', label: 'Pricing' },
  { route: 'contact', label: 'Contact' },
];

const getHashRoute = () => {
  const key = (window.location.hash || '#home').replace('#', '').trim().toLowerCase();
  return ROUTES.includes(key) ? key : 'home';
};

const setHashRoute = (route) => {
  window.location.hash = `#${route}`;
};

const SiteNavbar = ({ route, onRoute }) => (
  <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--bg-deep)', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <SanabilStudioLogo height={22} invert/>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', borderLeft: '1px solid rgba(255,255,255,.18)', paddingLeft: 10 }}>All in One</span>
      </div>
      <nav style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.route}
            className="btn sm"
            onClick={() => onRoute(item.route)}
            style={route === item.route
              ? { background: '#fff', color: '#1a1629', borderColor: '#fff' }
              : { background: 'transparent', color: 'rgba(255,255,255,.8)', borderColor: 'rgba(255,255,255,.22)' }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  </header>
);

const ProductPage = ({ onSeePricing }) => {
  const [view, setView] = useState('dashboard');
  return (
    <section style={{ minHeight: 'calc(100vh - 65px)' }}>
      {view === 'dashboard' && <DetailHR onOpenProto={onSeePricing} onNavigateView={setView}/>}
      {view === 'org' && <DetailOrg onNavigateView={setView}/>}
      {view === 'timeoff' && <DetailTimeOff onNavigateView={setView}/>}
    </section>
  );
};

const ThankYou = ({ onRestart, onBack }) => {
  const b = useBundle();
  return (
    <div style={{ width: '100%', minHeight: 'calc(100vh - 65px)', background: 'var(--bg)', padding: '56px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, textAlign: 'center' }}>
      <div style={{ width: 64, height: 64, borderRadius: 32, background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand)', fontSize: 28 }}>✓</div>
      <h2 className="f-display" style={{ fontSize: 36, margin: 0 }}>Shukran. You shaped our roadmap.</h2>
      <p className="f-body" style={{ fontSize: 15, color: 'var(--text-3)', maxWidth: 620, margin: 0 }}>
        {b.picked.size} feature{b.picked.size === 1 ? '' : 's'} selected · SAR {b.total} /emp/mo.
      </p>
      {b.picked.size > 0 && (
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 760 }}>
          {[...b.picked].map((id) => {
            const s = findSub(id);
            return s ? <span key={id} className="chip brand">{s.name}</span> : null;
          })}
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="btn" onClick={onBack}>← Back</button>
        <button className="btn primary" onClick={onRestart}>↺ Restart flow</button>
      </div>
    </div>
  );
};

const WebsiteApp = () => {
  const [route, setRoute] = useState(getHashRoute);

  useEffect(() => {
    const onHash = () => setRoute(getHashRoute());
    window.addEventListener('hashchange', onHash);
    if (!window.location.hash) setHashRoute('home');
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = (next) => setHashRoute(next);

  return (
    <BundleProvider>
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        <SiteNavbar route={route} onRoute={go}/>
        {route === 'home' && (
          <main>
            <LandingA onOpenProto={() => go('solutions')} showInternalNav={false}/>
          </main>
        )}
        {route === 'solutions' && <ModulesHero onOpenProto={() => go('pricing')}/>}
        {route === 'product' && <ProductPage onSeePricing={() => go('pricing')}/>}
        {route === 'pricing' && <PricingCustom onOpenProto={() => go('contact')}/>}
        {route === 'contact' && <CaptureChecklistV2 onSubmit={() => go('thanks')}/>}
        {route === 'thanks' && <ThankYou onBack={() => go('contact')} onRestart={() => go('home')}/>}
      </div>
    </BundleProvider>
  );
};

Object.assign(window, { WebsiteApp });
