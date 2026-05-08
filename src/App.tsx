import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';

type AgencyLink = {
  label: string;
  href: string;
  type: 'site' | 'deck' | 'repo' | 'legal';
};

type Agency = {
  id: string;
  number: string;
  short: string;
  name: string;
  focus: string;
  status: string;
  claim: string;
  longClaim: string;
  description: string;
  metric: string;
  metricLabel: string;
  secondMetric: string;
  secondMetricLabel: string;
  gradient: string;
  accent: string;
  mutedAccent: string;
  backgroundWords: string[];
  agents: { code: string; name: string; role: string; tags: string[] }[];
  workflow: { phase: string; title: string; text: string; gate?: boolean }[];
  principles: { title: string; text: string }[];
  modules: string[];
  links: AgencyLink[];
};

const agencies: Agency[] = [
  {
    id: 'vsa',
    number: '01',
    short: 'VSA',
    name: 'Virtual Service Agency',
    focus: 'Investor Deck Production',
    status: 'LIVE',
    claim: 'Investor decks built by an autonomous AI agent mesh. Approved by the founder.',
    longClaim: 'Fuenf Agenten. Ein Deck. Kein Consultant-Taxameter.',
    description:
      'VSA produziert investor-grade Pitch Decks fuer reale Startups. Das Agenten-Mesh uebernimmt Marktanalyse, Narrativ, Financials, Design und Fact-Check. Der Mensch bleibt an jedem Freigabepunkt im Loop. Keine Equity. Kein Retainer. Ein klarer Projektpreis und ein sichtbarer Produktionsprozess.',
    metric: '48-96h',
    metricLabel: 'delivery window',
    secondMetric: '5',
    secondMetricLabel: 'specialized agents',
    gradient: 'linear-gradient(135deg, rgba(0,240,255,.28), rgba(26,35,126,.58))',
    accent: '#00f0ff',
    mutedAccent: 'rgba(0,240,255,.16)',
    backgroundWords: ['INVESTOR DECKS', 'NARRATIVE', 'FINANCIALS', 'CEO GATE'],
    agents: [
      { code: '01', name: 'Scout', role: 'Market research and competitive intelligence', tags: ['research', 'sources', 'market'] },
      { code: '02', name: 'Narrator', role: 'Problem-solution arc, wedge, why-now logic', tags: ['story', 'positioning'] },
      { code: '03', name: 'Modeler', role: 'Financial assumptions, pricing, traction logic', tags: ['financials', 'metrics'] },
      { code: '04', name: 'Atelier', role: 'Slide structure, layout, hierarchy and visual system', tags: ['design', 'deck'] },
      { code: '05', name: 'Auditor', role: 'Fact-check, claim review and legal risk flagging', tags: ['audit', 'legal'] }
    ],
    workflow: [
      { phase: '01 / agent', title: 'Intake and research', text: 'Scout reads company context, market, competitors and available proof.' },
      { phase: 'human gate', title: 'Narrative sign-off', text: 'Founder approves positioning, wedge and investor-facing story.', gate: true },
      { phase: '02 / agent', title: 'Deck production', text: 'Narrator, Modeler and Atelier build the first full deck version.' },
      { phase: 'human gate', title: 'CEO approval', text: 'No investor-facing claim ships without explicit founder approval.', gate: true },
      { phase: '03 / agent', title: 'Final audit', text: 'Auditor checks sources, sensitive claims and deck consistency.' }
    ],
    principles: [
      { title: 'Every number has a source', text: 'Financial and market statements must be traceable.' },
      { title: 'Human signature first', text: 'Agent output is only a draft until the founder approves it.' },
      { title: 'No retainer theatre', text: 'The output is the deck, not a billing ritual.' }
    ],
    modules: ['Seed Deck', 'Series A Narrative', 'Financial Storyline', 'Investor FAQ', 'One-Pager', 'Pitch Refinement'],
    links: [
      { label: 'Open VSA site', href: './VSA/index.html', type: 'site' },
      { label: 'Investor deck PDF', href: './VSA/INVESTORENDECK-VSA.pdf', type: 'deck' },
      { label: 'Privacy', href: './VSA/datenschutz.html', type: 'legal' },
      { label: 'Imprint', href: './VSA/impressum.html', type: 'legal' }
    ]
  },
  {
    id: 'rsa',
    number: '02',
    short: 'RSA',
    name: 'Recruitment Service Agency',
    focus: 'AI Recruiting Operations',
    status: 'BUILD',
    claim: 'Recruiting workflows turned into an auditable agent mesh with human approval gates.',
    longClaim: 'Screening, matching and interview preparation without losing human accountability.',
    description:
      'RSA is the recruiting arm of Augmented_Ops. It frames hiring as an operations pipeline: intake, role definition, candidate screening, matching, interview preparation and decision support. The system is designed for structured, transparent recruiting assistance, not autonomous hiring decisions. Human review stays mandatory wherever people are evaluated.',
    metric: '100%',
    metricLabel: 'human approval at decision gates',
    secondMetric: '4',
    secondMetricLabel: 'planned recruiting agents',
    gradient: 'linear-gradient(135deg, rgba(148,93,255,.28), rgba(0,240,255,.28))',
    accent: '#a78bfa',
    mutedAccent: 'rgba(167,139,250,.16)',
    backgroundWords: ['RECRUITING', 'MATCHING', 'SCREENING', 'HUMAN REVIEW'],
    agents: [
      { code: '01', name: 'Role Mapper', role: 'Translates hiring needs into structured role criteria', tags: ['role', 'criteria'] },
      { code: '02', name: 'Screen', role: 'Prepares resume and profile summaries against explicit criteria', tags: ['cv', 'screening'] },
      { code: '03', name: 'Matcher', role: 'Highlights fit signals, gaps and follow-up questions', tags: ['matching', 'signals'] },
      { code: '04', name: 'Interview', role: 'Builds interview guides and evaluation rubrics', tags: ['interview', 'rubric'] },
      { code: '05', name: 'Auditor', role: 'Flags bias, missing evidence and compliance risks', tags: ['bias', 'audit'] }
    ],
    workflow: [
      { phase: '01 / agent', title: 'Role intake', text: 'Role Mapper creates criteria, must-haves, nice-to-haves and exclusion risks.' },
      { phase: 'human gate', title: 'Criteria approval', text: 'Hiring owner approves the role logic before any profile is evaluated.', gate: true },
      { phase: '02 / agent', title: 'Profile analysis', text: 'Screen and Matcher prepare structured, evidence-based candidate notes.' },
      { phase: 'human gate', title: 'Interview decision', text: 'Humans decide who advances. The mesh only supports the decision.', gate: true },
      { phase: '03 / agent', title: 'Interview pack', text: 'Interview builds questions, scorecards and follow-up prompts.' }
    ],
    principles: [
      { title: 'No autonomous hiring decision', text: 'The agent mesh can prepare evidence, but humans make people decisions.' },
      { title: 'Bias must be visible', text: 'The system should surface possible bias and missing information.' },
      { title: 'Criteria before candidates', text: 'A role must be defined before profiles are judged.' }
    ],
    modules: ['Role Mapping', 'Resume Screening', 'Candidate Matching', 'Interview Guides', 'Evaluation Rubrics', 'Bias Audit'],
    links: [
      { label: 'Open RSA site', href: './RSA/index.html', type: 'site' },
      { label: 'Investor deck PDF', href: './RSA/INVESTORENDECK-RSA.pdf', type: 'deck' },
      { label: 'Design system', href: './RSA/README.md', type: 'repo' }
    ]
  },
  {
    id: 'msa',
    number: '03',
    short: 'MSA',
    name: 'Marketing Service Agency',
    focus: 'Campaign Mesh',
    status: 'LIVE',
    claim: 'Marketing campaigns built by agents, approved by the manager before any budget moves.',
    longClaim: 'Sechs Agenten. Eine Kampagne. Kein Agentur-Overhead.',
    description:
      'MSA builds AI-assisted marketing campaigns with specialized agents for market analysis, positioning, copywriting, media planning, performance analytics and brand safety. It is made for B2B and growth teams that need campaign velocity without giving up approval, budget control or accountability.',
    metric: '48h',
    metricLabel: 'time-to-launch target',
    secondMetric: '6',
    secondMetricLabel: 'campaign agents',
    gradient: 'linear-gradient(135deg, rgba(57,255,20,.22), rgba(0,240,255,.24))',
    accent: '#39ff14',
    mutedAccent: 'rgba(57,255,20,.14)',
    backgroundWords: ['CAMPAIGN', 'COPY', 'MEDIA', 'BRAND SAFETY'],
    agents: [
      { code: '01', name: 'Scout', role: 'Market and target group analysis', tags: ['market', 'audience'] },
      { code: '02', name: 'Strategist', role: 'Offer, funnel and messaging architecture', tags: ['strategy', 'funnel'] },
      { code: '03', name: 'Copywriter', role: 'Ads, landing pages and email sequences', tags: ['copy', 'ads'] },
      { code: '04', name: 'Media', role: 'Channel planning, budget allocation and setup', tags: ['media', 'budget'] },
      { code: '05', name: 'Analyst', role: 'Performance tracking, A/B tests and reporting', tags: ['analytics', 'tests'] },
      { code: '06', name: 'Auditor', role: 'Claims, compliance and brand safety', tags: ['audit', 'brand'] }
    ],
    workflow: [
      { phase: '01 / agent', title: 'Research and strategy', text: 'Scout and Strategist build campaign logic from goals and market context.' },
      { phase: 'human gate', title: 'Strategy approval', text: 'Marketing owner signs messaging, channels and budget limits.', gate: true },
      { phase: '02 / agent', title: 'Asset creation', text: 'Copywriter and Media prepare ads, pages, emails and setup.' },
      { phase: 'human gate', title: 'Launch approval', text: 'No campaign goes live before copy, targeting and budget are approved.', gate: true },
      { phase: '03 / agent', title: 'Live ops', text: 'Analyst monitors performance and proposes controlled iterations.' }
    ],
    principles: [
      { title: 'No budget without signature', text: 'Media spend only starts after human approval.' },
      { title: 'Brand safety first', text: 'Every claim and asset is checked before launch.' },
      { title: 'Measure what matters', text: 'Focus on CPA, ROAS and qualified leads, not vanity metrics.' }
    ],
    modules: ['LinkedIn Lead Gen', 'TikTok / IG Concepts', 'Email Nurture', 'Landingpage Optimization', 'Retargeting Loops', 'Search Intent Capture'],
    links: [
      { label: 'Open MSA site', href: './MSA/index.html', type: 'site' },
      { label: 'Investor deck PDF', href: './MSA/INVESTORENDECK-MSA.pdf', type: 'deck' },
      { label: 'Style extraction', href: './MSA/extrahierte_design_und_stil_elemente_1_markenarc.md', type: 'repo' }
    ]
  },
  {
    id: 'csa',
    number: '04',
    short: 'CSA',
    name: 'Customer Support Agency',
    focus: '24/7 Support Automation',
    status: 'LIVE',
    claim: 'Support cases handled by an AI mesh, with human escalation where quality demands it.',
    longClaim: 'Sechs Agenten. Ein Support-Team. Kein Burnout.',
    description:
      'CSA is an autonomous AI support agency for ticket triage, answer drafting, voice support, knowledge base maintenance, escalation and compliance checks. It is designed as a support mesh that can operate continuously while keeping sensitive or uncertain cases in a human escalation path.',
    metric: '24/7',
    metricLabel: 'always-on support',
    secondMetric: '6',
    secondMetricLabel: 'support agents',
    gradient: 'linear-gradient(135deg, rgba(0,240,255,.18), rgba(5,150,105,.42))',
    accent: '#14f195',
    mutedAccent: 'rgba(20,241,149,.14)',
    backgroundWords: ['SUPPORT', 'TRIAGE', 'VOICE', 'ESCALATION'],
    agents: [
      { code: '01', name: 'Triage', role: 'Classifies tickets by priority, topic and sentiment', tags: ['routing', 'priority'] },
      { code: '02', name: 'Resolver', role: 'Drafts precise, brand-safe answers from knowledge sources', tags: ['answers', 'kb'] },
      { code: '03', name: 'Voice', role: 'Handles phone entry points and call documentation', tags: ['voice', 'calls'] },
      { code: '04', name: 'Knowledge', role: 'Maintains helpcenter gaps and suggested articles', tags: ['helpcenter', 'docs'] },
      { code: '05', name: 'Escalation', role: 'Routes emotional, VIP or uncertain cases to humans', tags: ['handoff', 'vip'] },
      { code: '06', name: 'Auditor', role: 'Checks quality, sensitive data and compliance', tags: ['quality', 'gdpr'] }
    ],
    workflow: [
      { phase: '01 / agent', title: 'Knowledge ingestion', text: 'Knowledge reads helpcenter, previous tickets and product documentation.' },
      { phase: 'human gate', title: 'Knowledge approval', text: 'The team signs the ground truth and escalation rules.', gate: true },
      { phase: '02 / agent', title: 'Shadow mode', text: 'Agents draft support replies internally before direct customer contact.' },
      { phase: 'human gate', title: 'Go-live approval', text: 'Humans release the mesh after quality checks.', gate: true },
      { phase: '03 / agent', title: 'Live ops and maintenance', text: 'The mesh resolves routine cases and escalates sensitive ones.' }
    ],
    principles: [
      { title: 'No blackbox answers', text: 'Answers must be traceable to a knowledge source.' },
      { title: 'Escalation is a feature', text: 'Uncertainty is routed to humans instead of hidden.' },
      { title: 'Compliance by design', text: 'Sensitive data and risky cases must be treated explicitly.' }
    ],
    modules: ['AI Ticket Resolution', 'Automated Email', 'AI Chatbot', 'AI Voice Agent', 'Knowledge Base Updates', 'Sentiment Alerts'],
    links: [
      { label: 'Open CSA site', href: './CSA/index.html', type: 'site' },
      { label: 'Investor deck PDF', href: './CSA/INVESTORENDECK-CSA.pdf', type: 'deck' },
      { label: 'CSA README', href: './CSA/README.md', type: 'repo' }
    ]
  }
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selected, setSelected] = useState<Agency | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduceMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener('change', updateMotion);

    const updateScroll = () => {
      const doc = document.documentElement;
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      setScrollProgress(clamp(window.scrollY / scrollable, 0, 1));
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);

    return () => {
      motionQuery.removeEventListener('change', updateMotion);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelected(null);
      }
    };
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onKeyDown);
      lastFocus.current?.focus();
    };
  }, [selected]);

  const activeFloat = scrollProgress * (agencies.length - 1);
  const activeIndex = clamp(Math.round(activeFloat), 0, agencies.length - 1);
  const activeAgency = agencies[activeIndex];

  const scrollToAgency = (index: number) => {
    const doc = document.documentElement;
    const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
    const target = (index / (agencies.length - 1)) * scrollable;
    window.scrollTo({ top: target, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const openAgency = (agency: Agency) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setSelected(agency);
  };

  const onCardKeyDown = (event: KeyboardEvent<HTMLButtonElement>, agency: Agency) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openAgency(agency);
    }
  };

  const progressStyle = { transform: `scaleX(${scrollProgress})` } as CSSProperties;

  return (
    <main className="augmented-spiral" style={{ '--active-accent': activeAgency.accent } as CSSProperties}>
      <div className="scroll-progress" style={progressStyle} aria-hidden="true" />

      <header className="site-header" aria-label="Augmented Ops navigation">
        <a className="brand-lockup" href="#top" aria-label="Augmented Ops home">
          <span className="brand-mark">AO</span>
          <span>
            <strong>Augmented_Ops</strong>
            <small>Built by the mesh. Approved by the human.</small>
          </span>
        </a>

        <nav className="top-nav" aria-label="Agency jump navigation">
          {agencies.map((agency, index) => (
            <button
              key={agency.id}
              className={index === activeIndex ? 'nav-dot active' : 'nav-dot'}
              onClick={() => scrollToAgency(index)}
              aria-label={`Jump to ${agency.short}`}
              aria-current={index === activeIndex ? 'step' : undefined}
            >
              {agency.short}
            </button>
          ))}
        </nav>
      </header>

      <section id="top" className="spiral-hero" aria-label="Augmented Ops spiral hero">
        <p className="eyebrow">Autonomous service agency mesh / Berlin</p>
        <h1>
          Agent agencies
          <span>on a spatial spiral.</span>
        </h1>
        <p className="hero-copy">
          VSA, RSA, MSA and CSA are placed as four company cards on a scroll-driven helix.
          Click a card to open the full agency page as a modern popup layer.
        </p>
        <div className="hero-actions">
          <button onClick={() => scrollToAgency(0)}>Enter the spiral</button>
          <a href="#fallback">View fallback list</a>
        </div>
      </section>

      <section className="spiral-section" aria-label="Augmented Ops agency spiral">
        <div className="spiral-viewport">
          <div className="depth-copy" aria-hidden="true">
            {agencies.map((agency, index) => {
              const dist = Math.abs(index - activeFloat);
              const closeness = clamp(1 - dist / 1.35, 0, 1);
              const layerStyle = {
                opacity: 0.035 + closeness * 0.32,
                filter: `blur(${18 - closeness * 15}px)`,
                transform: `translate3d(${(index - activeFloat) * 14}vw, ${Math.sin((index + activeFloat) * 0.9) * 6}vh, 0) scale(${1.18 - closeness * 0.1})`
              } as CSSProperties;
              return (
                <div className="depth-layer" style={layerStyle} key={agency.id}>
                  {agency.backgroundWords.map((word) => (
                    <span key={word}>{word}</span>
                  ))}
                </div>
              );
            })}
          </div>

          <div className="spiral-rings" aria-hidden="true">
            <div className="ring ring-one" />
            <div className="ring ring-two" />
            <div className="ring ring-three" />
          </div>

          <div className="spiral-stage" aria-live="polite">
            {agencies.map((agency, index) => {
              const relative = index - activeFloat;
              const angle = relative * 74;
              const radians = (angle * Math.PI) / 180;
              const x = Math.sin(radians) * 360;
              const z = Math.cos(radians) * 220;
              const y = relative * 116;
              const closeness = clamp(1 - Math.abs(relative) / 1.5, 0, 1);
              const scale = 0.78 + closeness * 0.28;
              const opacity = 0.28 + closeness * 0.72;
              const blur = reduceMotion ? 0 : (1 - closeness) * 5;
              const cardStyle = {
                '--card-accent': agency.accent,
                '--card-muted': agency.mutedAccent,
                '--card-gradient': agency.gradient,
                transform: reduceMotion
                  ? `translate(-50%, -50%) translateY(${relative * 380}px) scale(${scale})`
                  : `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${-angle * 0.42}deg) scale(${scale})`,
                opacity,
                filter: `blur(${blur}px)`,
                zIndex: Math.round(1000 + closeness * 100 - Math.abs(relative) * 10)
              } as CSSProperties;

              return (
                <button
                  key={agency.id}
                  className={index === activeIndex ? 'agency-card active' : 'agency-card'}
                  style={cardStyle}
                  onClick={() => openAgency(agency)}
                  onKeyDown={(event) => onCardKeyDown(event, agency)}
                  aria-label={`Open ${agency.name}`}
                  aria-expanded={selected?.id === agency.id}
                >
                  <span className="card-number">{agency.number}</span>
                  <span className="card-status">{agency.status}</span>
                  <span className="card-orb" />
                  <strong>{agency.short}</strong>
                  <em>{agency.name}</em>
                  <p>{agency.claim}</p>
                  <span className="card-focus">{agency.focus}</span>
                  <span className="card-open">Open full agency page</span>
                </button>
              );
            })}
          </div>

          <aside className="active-panel" aria-label="Active agency summary">
            <span className="panel-kicker">Active company</span>
            <strong>{activeAgency.short}</strong>
            <p>{activeAgency.longClaim}</p>
            <button onClick={() => openAgency(activeAgency)}>Open page popup</button>
          </aside>

          <div className="scroll-callout" aria-hidden="true">
            <span>Scroll</span>
            <span>to pull the next company forward</span>
          </div>
        </div>
      </section>

      <section id="fallback" className="fallback-list" aria-label="Accessible agency list">
        <p className="eyebrow">Accessible fallback</p>
        <h2>All companies in the mesh.</h2>
        <div className="fallback-grid">
          {agencies.map((agency) => (
            <article key={agency.id}>
              <span>{agency.number} / {agency.short}</span>
              <h3>{agency.name}</h3>
              <p>{agency.description}</p>
              <button onClick={() => openAgency(agency)}>Open detailed popup</button>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p>Augmented_Ops / VSA / RSA / MSA / CSA</p>
        <p>Autonomous systems with mandatory human approval gates.</p>
      </footer>

      {selected && (
        <AgencyPopup agency={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}

function AgencyPopup({ agency, onClose }: { agency: Agency; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const firstFocusable = modalRef.current?.querySelector<HTMLElement>('button, a, [tabindex]:not([tabindex="-1"])');
    firstFocusable?.focus();
  }, []);

  return (
    <div className="agency-popup-shell" role="dialog" aria-modal="true" aria-labelledby={`${agency.id}-title`}>
      <div className="popup-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="agency-popup" ref={modalRef} style={{ '--card-accent': agency.accent, '--card-muted': agency.mutedAccent, '--card-gradient': agency.gradient } as CSSProperties}>
        <button className="popup-close" onClick={onClose} aria-label="Close agency popup">Close</button>

        <section className="popup-hero">
          <div>
            <span className="popup-number">{agency.number} / {agency.short}</span>
            <h2 id={`${agency.id}-title`}>{agency.name}</h2>
            <p>{agency.longClaim}</p>
          </div>
          <div className="popup-visual">
            <span>{agency.short}</span>
          </div>
        </section>

        <section className="popup-metrics">
          <div>
            <strong>{agency.metric}</strong>
            <span>{agency.metricLabel}</span>
          </div>
          <div>
            <strong>{agency.secondMetric}</strong>
            <span>{agency.secondMetricLabel}</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>human gate at critical checkpoints</span>
          </div>
        </section>

        <section className="popup-section two-col">
          <div>
            <p className="eyebrow">Agency logic</p>
            <h3>{agency.claim}</h3>
          </div>
          <p>{agency.description}</p>
        </section>

        <section className="popup-section">
          <p className="eyebrow">Agent mesh</p>
          <div className="agent-grid">
            {agency.agents.map((agent) => (
              <article key={agent.code}>
                <span>AGENT {agent.code}</span>
                <h4>{agent.name}</h4>
                <p>{agent.role}</p>
                <div className="tag-row">
                  {agent.tags.map((tag) => <small key={tag}>{tag}</small>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="popup-section">
          <p className="eyebrow">Operating flow</p>
          <div className="workflow">
            {agency.workflow.map((step) => (
              <article className={step.gate ? 'gate-step' : ''} key={`${step.phase}-${step.title}`}>
                <span>{step.phase}</span>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="popup-section two-col">
          <div>
            <p className="eyebrow">Principles</p>
            <div className="principles">
              {agency.principles.map((principle) => (
                <article key={principle.title}>
                  <h4>{principle.title}</h4>
                  <p>{principle.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">Modules</p>
            <div className="module-cloud">
              {agency.modules.map((module) => <span key={module}>{module}</span>)}
            </div>
          </div>
        </section>

        <section className="popup-section">
          <p className="eyebrow">Open surfaces</p>
          <div className="link-grid">
            {agency.links.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                <span>{link.type}</span>
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
