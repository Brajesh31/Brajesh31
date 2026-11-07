export type Project = {
  title: string;
  description: string;
  url: string;
  demo?: string;
  category: string;
  technologies: string[];
  highlights: string[];
};

export const projects: Project[] = [
  { title: "Bharat XR Platform", description: "XR web and platform ecosystem with community initiatives.", url: "https://bharatxr.co/", demo: "https://bharatxr.co/", category: "XR & AR", technologies: ["XR", "AR/VR", "Web"], highlights: ["Spatial computing", "Community programs"] },
  { title: "AgroTech AI", description: "Agriculture platform combining disease and crop APIs with an AI assistant, quiz app, and frontend.", url: "https://github.com/Brajesh31/Agro_tech_AI", category: "AI / ML", technologies: ["React", "Vite", "Node.js", "Express", "MongoDB", "Gemini API", "Docker"], highlights: ["Disease prediction", "Crop rotation", "OAuth"] },
  { title: "Glaucoma Detection using Deep Learning & NSGA-II", description: "Retinal-image pipeline with CNNs, transfer learning, NSGA-II search, and Grad-CAM++.", url: "https://github.com/Brajesh31/Glaucoma-Detection-NSGA", category: "Research", technologies: ["Python", "PyTorch", "scikit-learn", "DEAP", "Flask"], highlights: ["Fundus classification", "5-fold validation"] },
  { title: "Multi-Agent Observability with OpenTelemetry", description: "LangGraph multi-agent reference system tracing routing, tool calls, latency, tokens, and failures.", url: "https://github.com/Brajesh31/multi-agent-observability-opentelemetry", category: "Developer Tools", technologies: ["Python", "LangGraph", "OpenTelemetry", "OTLP"], highlights: ["Agent traces", "Loop guardrails"] },
  { title: "Influencer Sponsor Coordination Platform", description: "Campaign app connecting sponsor and influencer accounts through dashboards, APIs, and scheduled checks.", url: "https://github.com/Brajesh31/Influencer-Sponsor-Coordination-Platform", category: "Full-Stack", technologies: ["Python", "Flask", "SQLite", "APScheduler"], highlights: ["Campaign workflows", "Scheduled checks"] },
  { title: "Arexa Website", description: "Multi-page React website for XR services, work, industries, case studies, and contact flows.", url: "https://arexa.co/", demo: "https://arexa.co/", category: "XR & AR", technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"], highlights: ["Animated routes", "AR video carousel"] },
  { title: "BharatXR Ambassador Portal", description: "Full-stack ambassador platform with student and admin dashboards for community operations.", url: "https://ambassador.bharatxr.co/", demo: "https://ambassador.bharatxr.co/", category: "Community", technologies: ["React", "TypeScript", "PHP", "MySQL", "REST APIs"], highlights: ["Task submissions", "Admin analytics"] },
  { title: "AR Core Studio", description: "Browser AR viewer and admin portal for grouping Snap lenses and serving shareable experiences.", url: "https://github.com/Brajesh31/ar-core-studio", category: "XR & AR", technologies: ["React", "TypeScript", "Snap Camera Kit", "PHP", "MySQL"], highlights: ["Lens carousel", "Chunked uploads"] },
  { title: "Self-Healing Intrusion Detection System", description: "Streamlit IDS prototype with XGBoost detection and decision-tree response playbooks.", url: "https://github.com/Brajesh31/self-healing-ids-main", category: "Security", technologies: ["Python", "Streamlit", "XGBoost", "scikit-learn", "pandas"], highlights: ["Threat classification", "Session audit log"] },
  { title: "Speech Emotion Detection", description: "Flask inference app using MFCC features to classify uploaded or recorded speech.", url: "https://github.com/Brajesh31/emotion-detector", category: "AI / ML", technologies: ["Python", "Flask", "TensorFlow", "Librosa", "NumPy"], highlights: ["Audio uploads", "Saved-model inference"] },
];

export const technologies = [
  ["Python", "Languages", ["AI / ML", "Backend", "Automation"]],
  ["TypeScript", "Languages", ["Frontend", "Full-Stack"]],
  ["React", "Frontend", ["TypeScript", "Vite"]],
  ["Flask", "Backend", ["Python", "APIs"]],
  ["PyTorch", "AI / ML", ["Python", "Deep Learning"]],
  ["OpenTelemetry", "DevOps", ["Observability", "Agents"]],
  ["Docker", "Cloud & DevOps", ["Automation", "Deployment"]],
  ["GitHub Actions", "Developer Tools", ["CI/CD", "Automation"]],
  ["MongoDB", "Databases", ["Node.js", "Full-Stack"]],
  ["MySQL", "Databases", ["PHP", "REST APIs"]],
  ["LangGraph", "Generative AI", ["Agents", "Python"]],
  ["XR / AR", "Emerging", ["Web", "Spatial computing"]],
] as const;

export const locations: [string, string, string, ViewTarget][] = [
  ["AI Research Lab", "Models, agents, vision and intelligent automation", "AI / ML", "projects"],
  ["Full-Stack HQ", "Products, APIs, databases and dependable delivery", "Full-Stack", "projects"],
  ["Cloud & DevOps City", "Containers, CI/CD, observability and deployment", "Cloud", "control"],
  ["Open Source Forest", "Community, collaboration and contribution trails", "Community", "contributions"],
  ["Project Harbor", "Ten flagship systems anchored in real repositories", "Projects", "projects"],
  ["Community Village", "Writing, social links and collaboration", "Community", "knowledge"],
  ["Data Observatory", "Languages, repositories and transparent analytics", "Analytics", "analytics"],
  ["Tools Workshop", "Developer experience, automation and terminal workflows", "Tools", "control"],
  ["Security Fortress", "Defensive engineering and self-healing systems", "Security", "projects"],
  ["Innovation Island", "Experiments and future ideas, clearly marked as plans", "Future lab", "journey"],
] ;

type ViewTarget = "world" | "projects" | "control" | "contributions" | "knowledge" | "analytics" | "journey";

export const journey: [string, string, string[]][] = [
  ["Learning foundations", "Build fundamentals and keep learning in public.", ["Python", "JavaScript", "Git"]],
  ["Programming & problem solving", "Turn problems into structured, testable solutions.", ["APIs", "Algorithms", "SQL"]],
  ["Full-stack engineering", "Ship interfaces, services, authentication and data flows.", ["React", "Flask", "PHP", "MySQL"]],
  ["AI & machine learning", "Explore vision, audio, models and practical inference.", ["PyTorch", "TensorFlow", "scikit-learn"]],
  ["Project development", "Move from concept through architecture, build and deployment.", ["Docker", "Vite", "REST APIs"]],
  ["Open source", "Contribute to shared tools, communities and public projects.", ["GitHub", "Actions", "GSSoC"]],
  ["Developer community", "Connect people, platforms and learning experiences.", ["XR", "Ambassador Portal", "Writing"]],
  ["Product engineering", "Balance useful design, reliable systems and iteration.", ["Observability", "Automation", "UX"]],
  ["Research & innovation", "Prototype emerging ideas without overstating outcomes.", ["Agents", "XR", "Security"]],
  ["Future exploration", "A planning lane, not a claim about completed work.", ["New experiments", "Open questions"]],
];

export const achievements = [
  ["Certifications", "AWS certifications and GitHub Copilot badge", "https://github.com/Brajesh31"],
  ["Open source", "GSSoC badges and Holopin achievement wall", "https://holopin.io/@brajesh31"],
  ["Technical", "Custom badges, Postman, Snowflake and Git Explorer", "https://github.com/Brajesh31"],
  ["Community", "Collaboration and ambassador initiatives", "https://bharatxr.co/"],
  ["Events", "Hack-Web3Conf 2024 participation badge", "https://github.com/Brajesh31"],
];
