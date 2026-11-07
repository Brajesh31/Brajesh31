import { useEffect, useMemo, useState } from "react";
import { achievements, journey, locations, projects, technologies, type Project } from "./data";

type View = "home" | "world" | "journey" | "projects" | "analytics" | "control" | "rpg" | "museum" | "contributions" | "knowledge";
const views: [View, string][] = [
  ["home", "Command deck"], ["world", "Developer world"], ["journey", "Journey"], ["projects", "Projects"],
  ["analytics", "Analytics"], ["control", "Control center"], ["rpg", "RPG zone"], ["museum", "Museum"],
  ["contributions", "Contributions"], ["knowledge", "Knowledge"],
];

const contributionLinks = [
  ["3D contribution map", "https://github.com/Brajesh31/Brajesh31/tree/main/profile-3d-contrib", "Generated visual"],
  ["Contribution City", "https://github.com/Brajesh31/Brajesh31/blob/main/contribution-city.svg", "Generated visual"],
  ["Koi pond", "https://github.com/Brajesh31/Brajesh31/blob/main/koi/koi.gif", "Animated contribution art"],
  ["Contribution Snake", "https://github.com/Brajesh31/Brajesh31/tree/main/output", "Animated contribution art"],
  ["Skyline", "https://github.com/Brajesh31/Brajesh31/tree/skyline", "Generated visual"],
  ["Pacman", "https://github.com/Brajesh31/Brajesh31/tree/pacman", "Contribution game"],
  ["Space Shooter", "https://github.com/Brajesh31/Brajesh31/blob/main/game.gif", "Animated contribution game"],
  ["GitHub Breakout", "https://github.com/Brajesh31/Brajesh31/tree/github-breakout", "Contribution game"],
  ["Minesweeper", "https://github.com/Brajesh31/Brajesh31/tree/output", "Contribution game"],
];

function useHashNavigation(): [View, (view: View) => void] {
  const read = (): View => {
    const value = window.location.hash.slice(1) as View;
    return views.some(([id]) => id === value) ? value : "home";
  };
  const [view, setView] = useState<View>(read);
  useEffect(() => {
    const onHash = () => setView(read());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return [view, (next) => { window.location.hash = next; window.scrollTo({ top: 0, behavior: "smooth" }); }];
}

function App() {
  const [view, go] = useHashNavigation();
  const [theme, setTheme] = useState<"nebula" | "aurora">("nebula");
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "?" && event.shiftKey) go("control");
      if (event.key.toLowerCase() === "h" && !["INPUT", "TEXTAREA"].includes((event.target as HTMLElement).tagName)) go("home");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);
  return <div className={`app ${theme}`}>
    <header className="topbar">
      <a className="brand" href="#home" onClick={() => setMobileOpen(false)}><span className="brand-mark">◈</span> BRAJESH<span className="muted">.31</span></a>
      <button className="menu-button" aria-label="Toggle navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>☰</button>
      <nav className={mobileOpen ? "nav open" : "nav"} aria-label="Primary navigation">
        {views.slice(0, 7).map(([id, label]) => <a className={view === id ? "active" : ""} href={`#${id}`} key={id} onClick={() => setMobileOpen(false)}>{label}</a>)}
      </nav>
      <div className="top-actions"><button className="icon-button" onClick={() => setTheme(theme === "nebula" ? "aurora" : "nebula")} aria-label="Switch theme">◐</button><a className="outline-button" href="https://github.com/Brajesh31" target="_blank" rel="noreferrer">GitHub ↗</a></div>
    </header>
    <main>
      {view === "home" && <Home go={go} />}
      {view === "world" && <World go={go} />}
      {view === "journey" && <Journey />}
      {view === "projects" && <Projects />}
      {view === "analytics" && <Analytics />}
      {view === "control" && <Control go={go} />}
      {view === "rpg" && <Rpg go={go} />}
      {view === "museum" && <Museum />}
      {view === "contributions" && <Contributions />}
      {view === "knowledge" && <Knowledge />}
    </main>
    <footer><span>© Brajesh Kumar · built for curious builders</span><a href="#home">Back to top ↑</a></footer>
  </div>;
}

function Shell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return <section className="page-shell"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="lead">{intro}</p>{children}</section>;
}

function Home({ go }: { go: (view: View) => void }) {
  return <div className="home">
    <section className="hero">
      <div className="hero-copy"><div className="eyebrow">PERSONAL OPERATING SYSTEM · ONLINE</div><h1>Build useful software.<br /><span>Explore the universe.</span></h1><p className="lead">I’m Brajesh Kumar — a software engineer building practical AI systems, full-stack products, developer tools, and community platforms.</p><div className="hero-actions"><button className="primary-button" onClick={() => go("world")}>Enter my developer world ↗</button><button className="ghost-button" onClick={() => go("projects")}>Explore projects</button></div><div className="status-row"><span><i className="pulse" /> system ready</span><span>India · UTC+05:30</span><span>github.com/Brajesh31</span></div></div>
      <div className="orbital-hero" aria-label="Animated developer universe illustration"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="planet">B<span>31</span></div><div className="star-field">✦　·　✧<br />　·　✦　·<br />✧　　·　✦</div></div>
    </section>
    <section className="section"><div className="section-heading"><div><div className="eyebrow">NAVIGATION GRID</div><h2>Choose an environment</h2></div><span className="muted">10 connected destinations</span></div><div className="destination-grid">{views.slice(1).map(([id, label], index) => <button className="destination" key={id} onClick={() => go(id)}><span className="destination-icon">{["✦", "⌁", "◌", "⌘", "◎", "▣", "♜", "✹", "◈"][index]}</span><span><strong>{label}</strong><small>{["Map the systems behind my work", "Milestones without invented dates", "Filter ten real flagship projects", "Languages, nodes and focus areas", "Terminal, signals and control panels", "Inventory, quests and game links", "Credential and community galleries", "Contribution art and generated worlds", "Articles and collaboration"][index]}</small></span><b>↗</b></button>)}</div></section>
    <section className="stats-strip"><div><strong>10</strong><span>flagship projects</span></div><div><strong>6</strong><span>focus domains</span></div><div><strong>13</strong><span>automation workflows</span></div><div><strong>∞</strong><span>ideas to explore</span></div></section>
  </div>;
}

function World({ go }: { go: (view: View) => void }) {
  const [selected, setSelected] = useState(0);
  return <Shell eyebrow="01 · THE WORLD" title="My developer world" intro="A connected map of the places where I learn, build, observe, share, and explore. Every marker opens a real environment or a clearly labelled thematic view.">
    <div className="world-map"><div className="map-grid" /><div className="world-sun" /><div className="world-path path-a" /><div className="world-path path-b" />{locations.map(([name, desc, tag, target], index) => <button className={`map-node node-${index} ${selected === index ? "selected" : ""}`} onClick={() => setSelected(index)} key={name}><span>{["⌬", "▣", "◌", "♣", "⚓", "⌂", "◉", "⚒", "♜", "✦"][index]}</span><strong>{name}</strong><small>{tag}</small></button>)}</div>
    <div className="detail-panel"><div><div className="eyebrow">LOCATION SIGNAL</div><h2>{locations[selected][0]}</h2><p>{locations[selected][1]}</p></div><span className="signal">● {locations[selected][2]}</span></div>
    <div className="card-grid three">{[["AI Research Lab", "Vision, deep learning, LLM applications, RAG, agents and model observability.", "projects"], ["Full-Stack HQ", "Interfaces, services, databases, authentication, deployment and automation.", "projects"], ["Open Source Forest", "Contribution paths, community platforms, writing, badges and shared learning.", "contributions"]].map(([title, text, target]) => <button className="feature-card" key={title} onClick={() => go(target as View)}><div className="card-icon">✦</div><h3>{title}</h3><p>{text}</p><span>Open environment ↗</span></button>)}</div>
  </Shell>;
}

function Journey() {
  const [open, setOpen] = useState(0);
  return <Shell eyebrow="02 · THE JOURNEY" title="My developer journey" intro="A thematic route through verified areas of work. Dates and proficiency scores are intentionally omitted where the profile does not document them.">
    <div className="journey-line">{journey.map(([title, text, tools], index) => <button className={`journey-step ${open === index ? "open" : ""}`} onClick={() => setOpen(index)} key={title}><span className="step-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3>{open === index && <><p>{text}</p><div className="chips">{tools.map((tool) => <span key={tool}>{tool}</span>)}</div></>}</div><b>{open === index ? "−" : "+"}</b></button>)}</div>
    <div className="mountain"><div className="mountain-title">CODING MOUNTAIN <small>checkpoints, not completion percentages</small></div><div className="mountain-shape"><i>FOUNDATIONS</i><i>BUILD</i><i>AI / ML</i><i>SYSTEMS</i><i>SHARE</i></div></div>
  </Shell>;
}

function Projects() {
  const [query, setQuery] = useState(""); const [category, setCategory] = useState("All"); const [selected, setSelected] = useState<Project | null>(null);
  const categories = ["All", ...new Set(projects.map((project) => project.category))];
  const filtered = useMemo(() => projects.filter((project) => (category === "All" || project.category === category) && `${project.title} ${project.description} ${project.technologies.join(" ")}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  return <Shell eyebrow="03 · PROJECT HARBOR" title="Project universe" intro="Search, filter, and inspect the ten existing flagship projects. Every project card links to its verified repository or live destination.">
    <div className="toolbar"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or technologies…" aria-label="Search projects" /><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter projects by category">{categories.map((value) => <option key={value}>{value}</option>)}</select><span className="muted">{filtered.length} results</span></div>
    <div className="project-grid">{filtered.map((project) => <article className="project-card" key={project.title}><div className="project-top"><span className="tag">{project.category}</span><a href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>↗</a></div><h3>{project.title}</h3><p>{project.description}</p><div className="chips">{project.technologies.slice(0, 5).map((tech) => <button key={tech} onClick={() => setQuery(tech)}>{tech}</button>)}</div><button className="text-button" onClick={() => setSelected(project)}>Inspect project →</button></article>)}</div>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="close" onClick={() => setSelected(null)} aria-label="Close project details">×</button><span className="tag">{selected.category}</span><h2>{selected.title}</h2><p>{selected.description}</p><h4>Key signals</h4><div className="chips">{selected.highlights.map((item) => <span key={item}>{item}</span>)}</div><a className="primary-button inline" href={selected.url} target="_blank" rel="noreferrer">Open verified link ↗</a></div></div>}
  </Shell>;
}

function Analytics() {
  const [technology, setTechnology] = useState<string | null>(null);
  const visible = technology ? projects.filter((project) => project.technologies.includes(technology)) : projects;
  return <Shell eyebrow="04 · DATA OBSERVATORY" title="Programming language analytics" intro="A transparent explorer based on the technologies documented in this profile. It is not a proficiency assessment and does not claim private coding activity.">
    <div className="analytics-layout"><div className="constellation"><div className="constellation-core">BRAJESH<br /><small>focus map</small></div>{technologies.map(([name, category], index) => <button className={`tech-node tech-${index}`} onClick={() => setTechnology(technology === name ? null : name)} key={name} title={`${name} · ${category}`}>{name}</button>)}</div><div className="analytics-side"><div className="radar"><div className="radar-shape" /><span>FRONTEND</span><span>BACKEND</span><span>AI / ML</span><span>CLOUD</span><span>DEVOPS</span></div><h3>{technology ? `Repositories touching ${technology}` : "Technology lanes"}</h3><div className="chips">{technologies.map(([name, category]) => <button className={technology === name ? "selected-chip" : ""} onClick={() => setTechnology(technology === name ? null : name)} key={name}>{name} · {category}</button>)}</div></div></div>
    <div className="mini-list"><div className="section-heading"><h2>{technology ?? "Repository language explorer"}</h2><span className="muted">{visible.length} related projects</span></div>{visible.map((project) => <a className="mini-row" href={project.url} target="_blank" rel="noreferrer" key={project.title}><span>{project.title}</span><span className="muted">{project.technologies.join(" · ")}</span><b>↗</b></a>)}</div>
  </Shell>;
}

function Control({ go }: { go: (view: View) => void }) {
  const [input, setInput] = useState(""); const [history, setHistory] = useState(["Welcome, Brajesh31. Type help to see available commands."]);
  const [publicData, setPublicData] = useState<{ generatedAt: string; profile: { publicRepos: number; followers: number } } | null>(null);
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/github-profile.json`).then((response) => response.ok ? response.json() : null).then((data) => setPublicData(data)).catch(() => setPublicData(null));
  }, []);
  const run = (command: string) => { const clean = command.trim().toLowerCase(); const answers: Record<string, string> = { help: "commands: about · projects · skills · languages · journey · achievements · github · contact · clear", about: "Brajesh Kumar — software engineer, AI/ML builder and open-source contributor.", projects: "10 flagship systems live in the Project Harbor.", skills: "full-stack · AI/ML · automation · cloud · DevOps · open source", languages: "Python · TypeScript · JavaScript · PHP · SQL", journey: "Learning → building → AI/ML → open source → community → innovation.", achievements: "AWS · GitHub Copilot · GSSoC · Holopin · custom technical badges.", github: "https://github.com/Brajesh31", contact: "Portfolio: https://brajesh31.com · Medium: https://medium.com/@brajesh31", clear: "" }; setHistory(clean === "clear" ? [] : [...history, `> ${command}`, answers[clean] ?? "Unknown command. Type help for a safe command list."]); setInput(""); };
  return <Shell eyebrow="05 · OPERATIONS" title="Developer control center" intro="A local, safe command surface for navigating the public profile. It never executes shell commands and does not expose private tokens.">
    <div className="control-grid"><div className="terminal"><div className="terminal-bar"><i /><i /><i /><span>brajesh@universe:~</span></div><div className="terminal-output">{history.map((line, index) => <div key={`${line}-${index}`}>{line}</div>)}</div><form onSubmit={(event) => { event.preventDefault(); run(input); }} className="terminal-form"><span>›</span><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="type a command…" aria-label="Developer terminal command" /></form></div><div className="control-cards"><div className="live-signal"><div className="eyebrow">PUBLIC SIGNAL</div><h3>{publicData ? `${publicData.profile.publicRepos} repositories · ${publicData.profile.followers} followers` : "Public data unavailable"}</h3><p>{publicData ? `Generated ${new Date(publicData.generatedAt).toLocaleString()}. Private activity is not represented.` : "The app remains useful through its static profile data and README integrations."}</p></div><button className="feature-card" onClick={() => go("projects")}><div className="eyebrow">PROJECTS</div><h3>Project orbit</h3><p>Ten verified project destinations and technology relationships.</p></button><button className="feature-card" onClick={() => go("contributions")}><div className="eyebrow">ACTIVITY</div><h3>Contribution universe</h3><p>Generated maps, koi and contribution games in one coherent gallery.</p></button></div></div>
  </Shell>;
}

function Rpg({ go }: { go: (view: View) => void }) {
  const [selected, setSelected] = useState("Software Engineering");
  const nodes = ["Software Engineering", "Frontend", "Backend", "AI / ML", "Cloud", "DevOps", "Automation", "Open Source"];
  return <Shell eyebrow="06 · GAME SYSTEMS" title="RPG developer zone" intro="A playful interface for organizing real technologies and projects. It deliberately avoids fake levels, scores, rankings, or years of experience.">
    <div className="rpg-layout"><div className="character-stage"><div className="pixel-character">◉<br /><span>▣</span></div><div className="equipment">⌨ terminal　 ◇ APIs　 ◈ containers</div></div><div><div className="skill-tree">{nodes.map((node, index) => <button className={selected === node ? "skill selected" : "skill"} style={{ "--i": index } as React.CSSProperties} onClick={() => setSelected(node)} key={node}><span>{["⌘", "◫", "⇄", "✦", "☁", "⚙", "⚡", "♧"][index]}</span>{node}</button>)}</div><div className="detail-panel compact"><div><div className="eyebrow">SELECTED NODE</div><h3>{selected}</h3><p>{selected === "Open Source" ? "Public collaboration, community programs and shared learning." : `Tools and projects connected to ${selected.toLowerCase()} in the profile.`}</p></div></div></div></div><div className="quest-board"><div className="section-heading"><h2>Quest board</h2><span className="muted">verified activities and clearly marked future exploration</span></div><div className="quest-grid"><div><span className="tag done">COMPLETED / DOCUMENTED</span><p>Build full-stack products · explore AI/ML · contribute to communities · publish technical writing</p></div><div><span className="tag planned">FUTURE LAB</span><p>New experiments and emerging technologies remain plans until they are actually built.</p></div></div></div><button className="primary-button" onClick={() => go("contributions")}>Enter gaming collection ↗</button>
  </Shell>;
}

function Museum() {
  const [filter, setFilter] = useState("All"); const categories = ["All", ...achievements.map(([category]) => category)];
  return <Shell eyebrow="07 · CREDENTIALS" title="Achievement museum" intro="A categorized gallery that reuses the existing badges, certifications, GSSoC, Holopin and community visuals without inventing credential details.">
    <div className="toolbar"><select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter achievement categories">{categories.map((category) => <option key={category}>{category}</option>)}</select><span className="muted">Open source images remain in the README gallery.</span></div><div className="museum-grid">{achievements.filter(([category]) => filter === "All" || category === filter).map(([category, description, url]) => <a className="museum-card" href={url} target="_blank" rel="noreferrer" key={category}><div className="museum-seal">✦</div><span className="tag">{category}</span><h3>{description}</h3><span>Open source destination ↗</span></a>)}</div><div className="callout">The full-size original badge wall, AWS credential images, Copilot badge, GSSoC images and Holopin wall remain preserved in the GitHub README.</div>
  </Shell>;
}

function Contributions() {
  return <Shell eyebrow="08 · CONTRIBUTION UNIVERSE" title="Contribution universe" intro="A single launchpad for the existing generated maps, activity art, koi pond and contribution games. The source workflows remain unchanged.">
    <div className="contribution-hero"><div className="galaxy">✦　·　◈　·　✧<br />　◌　✦　◌　·<br />✧　·　◈　✦</div><div><div className="eyebrow">GENERATED SIGNALS</div><h2>Every contribution leaves a mark.</h2><p>These are real generated assets and animations. Metaphorical environments are labelled as such; they do not turn visual decoration into fabricated metrics.</p></div></div><div className="contribution-grid">{contributionLinks.map(([name, url, type]) => <a className="contribution-card" href={url} target="_blank" rel="noreferrer" key={name}><span className="contribution-icon">◈</span><div><h3>{name}</h3><p>{type}</p></div><b>↗</b></a>)}</div>
  </Shell>;
}

function Knowledge() {
  const posts = [["MCP Is Dead.", "https://brajesh31.medium.com/mcp-is-dead-e2fd0f3ee38e"], ["Why Your API Shouldn’t Send Emails", "https://brajesh31.medium.com/why-your-api-shouldnt-send-emails-1f9f99de16a9"], ["Why Uber Doesn’t Use Cron Jobs", "https://brajesh31.medium.com/why-uber-doesnt-use-cron-jobs-8df43b100de4"]];
  return <Shell eyebrow="09 · KNOWLEDGE & COMMUNITY" title="Knowledge library" intro="Recent writing, collaboration paths, and the places where ideas become shared systems. The README Medium automation remains the source of latest posts.">
    <div className="knowledge-grid"><div><div className="eyebrow">LATEST ARTICLES</div>{posts.map(([title, url]) => <a className="article-row" href={url} target="_blank" rel="noreferrer" key={title}><span>01</span><strong>{title}</strong><b>↗</b></a>)}</div><div className="collab-card"><div className="eyebrow">COLLABORATION HUB</div><h2>Let’s build useful software.</h2><p>Open to thoughtful collaboration across AI products, full-stack applications, developer tools, infrastructure, automation, and open source.</p><div className="chips"><a href="https://brajesh31.com" target="_blank" rel="noreferrer">Portfolio ↗</a><a href="https://www.linkedin.com/in/brajesh-kumar-9b58651a8" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.youtube.com/@lifebetweencommit" target="_blank" rel="noreferrer">YouTube ↗</a><a href="https://x.com/lord_Brajesh" target="_blank" rel="noreferrer">X ↗</a></div></div></div>
  </Shell>;
}

export { App };
