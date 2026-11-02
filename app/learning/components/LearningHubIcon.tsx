import type { SVGProps } from "react";

export type LearningHubIconName = "levels" | "review" | "mission" | "story" | "next" | "progress" | "chevron" | "lock";

/** Small, monochrome navigation icons. They inherit existing Flunio theme colors. */
export default function LearningHubIcon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: LearningHubIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" {...common} {...props}>
      {name === "levels" && <>
        <path d="M12 6c-2.5-1.7-5-2-9-1v13c4-1 6.5-.7 9 1 2.5-1.7 5-2 9-1V5c-4-1-6.5-.7-9 1Z" />
        <path d="M12 6v13" />
      </>}
      {name === "review" && <>
        <path d="M20 7v5h-5" />
        <path d="M4 17v-5h5" />
        <path d="M5.7 9a7 7 0 0 1 12-2L20 12M4 12l2.3 5a7 7 0 0 0 12-2" />
      </>}
      {name === "mission" && <>
        <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5c-1.3 0-2.7-.3-3.8-1L4 20l1.7-4.5A7.5 7.5 0 1 1 20 11.5Z" />
        <path d="M8 10h8M8 13h5" />
      </>}
      {name === "story" && <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h5" />
      </>}
      {name === "next" && <>
        <path d="M4 12h16M13 5l7 7-7 7" />
      </>}
      {name === "progress" && <>
        <path d="M4 19h16M7 16v-5M12 16V7M17 16V4" />
      </>}
      {name === "chevron" && <path d="m9 5 7 7-7 7" />}
      {name === "lock" && <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>}
    </svg>
  );
}
