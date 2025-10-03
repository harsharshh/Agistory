export type ProductInfo = {
  id: string;
  name: string;
  description: string;
  gradient: string;
  status: "live" | "coming-soon";
  highlights: string[];
  url?: string;
};

export const products: ProductInfo[] = [
  {
    id: "storypointz",
    name: "StoryPointz",
    description: "AI-guided estimation and collaborative planning poker for distributed teams.",
    gradient: "from-[#8b5cf6] via-[#60a5fa] to-[#34d399]",
    status: "live",
    url: "https://story-pointz.vercel.app/",
    highlights: [ "Async-friendly poker", "Team velocity insights"],
  },
  {
    id: "retroscope",
    name: "RetroScope",
    description: "Automated retrospectives with AI summaries, themes, and action tracking.",
    gradient: "from-[#14b8a6] via-[#f97316] to-[#8b5cf6]",
    status: "live",
    url: "https://retro-scope.vercel.app/",
    highlights: ["AI retro notes", "Action follow-ups", "Team sentiment"],
  },
  {
    id: "sprintpulse",
    name: "SprintPulse",
    description: "Predictive sprint health dashboards that surface risk before stand-up.",
    gradient: "from-[#f97316] via-[#fb7185] to-[#c084fc]",
    status: "coming-soon",
    highlights: ["Forecast burn-down", "Automated blockers", "Mood pulse"],
  },
];
