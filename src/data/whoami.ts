import { z } from "astro/zod";
import raw from "./whoami.json";

const list = z.array(z.string().min(1)).min(1);

const whoamiSchema = z.strictObject({
  name: z.string().min(1),
  job: z.string().min(1),
  live: z.string().min(1),
  agents: list,
  frontend: list,
  backend: list,
  desktop: list,
  infrastructure: list,
  ops: list,
  tools: list,
  love: list,
});

export type Whoami = z.infer<typeof whoamiSchema>;

export const whoamiKeys = [
  "name",
  "job",
  "live",
  "agents",
  "frontend",
  "backend",
  "desktop",
  "infrastructure",
  "ops",
  "tools",
  "love",
] as const satisfies readonly (keyof Whoami)[];

export const whoami: Whoami = whoamiSchema.parse(raw);

export const whoamiEntries = whoamiKeys.map((key) => [key, whoami[key]] as const);
