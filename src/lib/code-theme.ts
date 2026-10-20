import { bundledThemes, type ThemeRegistrationRaw } from "shiki";

/**
 * github-light token colours that measure under 4.5:1 against the light code
 * panel (--code-bg, #f6f5f3), each swapped for a darker shade of the same hue.
 * Ratios are against #f6f5f3; the dark theme already passes.
 */
const LIGHT_REPLACEMENTS: Record<string, string> = {
  "#d73a49": "#c4303e", // keywords, storage: 4.20 -> 5.02
  "#e36209": "#b35200", // parameters, constants: 3.20 -> 4.67
  "#6a737d": "#5e6670", // comments: 4.42 -> 5.34
};

/** github-light with its low-contrast token colours replaced. */
export async function accessibleGithubLight(): Promise<ThemeRegistrationRaw> {
  const theme = (await bundledThemes["github-light"]()).default;
  let json = JSON.stringify(theme);
  for (const [from, to] of Object.entries(LIGHT_REPLACEMENTS)) {
    json = json.replace(new RegExp(from, "gi"), to);
  }
  return { ...JSON.parse(json), name: "github-light-accessible" };
}
