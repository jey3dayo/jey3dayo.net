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

// キーの漏れ・重複は引数が never になる型エラー（"not assignable to never"）として検出する
type HasDuplicate<T extends readonly string[]> = T extends readonly [
  infer Head extends string,
  ...infer Rest extends string[],
]
  ? Head extends Rest[number]
    ? true
    : HasDuplicate<Rest>
  : false;

type ExhaustiveKeys<K extends readonly (keyof Whoami)[]> = [
  Exclude<keyof Whoami, K[number]>,
] extends [never]
  ? HasDuplicate<K> extends true
    ? never
    : K
  : never;

const defineKeyOrder = <const K extends readonly (keyof Whoami)[]>(keys: ExhaustiveKeys<K>): K =>
  keys;

export const whoamiKeys = defineKeyOrder([
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
]);

export const whoami: Whoami = whoamiSchema.parse(raw);

export const whoamiEntries = whoamiKeys.map((key) => [key, whoami[key]] as const);
