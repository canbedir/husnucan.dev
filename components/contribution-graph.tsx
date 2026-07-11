"use client";

import * as React from "react";

const WEEKS = 53;
const DAYS = 7;

// Tailwind classes per intensity level, tuned for both themes.
const LEVEL_CLASS = [
  "bg-[#ebedf0] dark:bg-[#1c1c1c]",
  "bg-[#9be9a8] dark:bg-[#0e4429]",
  "bg-[#40c463] dark:bg-[#006d32]",
  "bg-[#30a14e] dark:bg-[#26a641]",
  "bg-[#216e39] dark:bg-[#39d353]",
];

/** Deterministic pseudo-random in [0,1) so server and client render alike. */
function hash(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function levelFor(i: number) {
  const f = hash(i);
  if (f < 0.55) return 0;
  if (f < 0.74) return 1;
  if (f < 0.88) return 2;
  if (f < 0.96) return 3;
  return 4;
}

function countFor(i: number, level: number) {
  if (level === 0) return 0;
  return level * 3 + (Math.floor(hash(i + 1) * 6) - 2);
}

type Tip = { text: string; x: number; y: number };

export function ContributionGraph() {
  const [tip, setTip] = React.useState<Tip | null>(null);

  // Grid fills column by column (grid-flow-col): index = week * 7 + day.
  const cells = React.useMemo(
    () =>
      Array.from({ length: WEEKS * DAYS }, (_, i) => {
        const level = levelFor(i);
        return { i, level, count: countFor(i, level) };
      }),
    []
  );

  const showTip = (
    e: React.MouseEvent<HTMLDivElement>,
    cell: { i: number; count: number }
  ) => {
    const week = Math.floor(cell.i / DAYS);
    const day = cell.i % DAYS;
    const daysAgo = (WEEKS - 1 - week) * DAYS + (DAYS - 1 - day);
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - daysAgo);
    const iso = date.toISOString().slice(0, 10);
    const noun = cell.count === 1 ? "contribution" : "contributions";
    const rect = e.currentTarget.getBoundingClientRect();
    setTip({
      text: `${cell.count} ${noun} on ${iso}`,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  return (
    <div className="relative">
      <div className="overflow-x-auto pb-1">
        <div
          className="mx-auto grid w-fit grid-flow-col grid-rows-7 gap-[3px]"
          onMouseLeave={() => setTip(null)}
        >
          {cells.map((cell) => (
            <div
              key={cell.i}
              onMouseEnter={(e) => showTip(e, cell)}
              className={`size-2.5 rounded-[2px] ${LEVEL_CLASS[cell.level]}`}
            />
          ))}
        </div>
      </div>

      {tip && (
        <div
          role="tooltip"
          style={{ left: tip.x, top: tip.y }}
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-[calc(100%+8px)] whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-xs font-medium text-background shadow-sm"
        >
          {tip.text}
        </div>
      )}
    </div>
  );
}
