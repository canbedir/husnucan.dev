"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ContributionCell } from "@/lib/github";

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

function seededLevel(i: number) {
  const f = hash(i);
  if (f < 0.55) return 0;
  if (f < 0.74) return 1;
  if (f < 0.88) return 2;
  if (f < 0.96) return 3;
  return 4;
}

function seededCount(i: number, level: number) {
  if (level === 0) return 0;
  return level * 3 + (Math.floor(hash(i + 1) * 6) - 2);
}

type Cell = {
  i: number;
  week: number;
  level: number;
  count: number;
  date: string | null;
  empty: boolean;
};

type Tip = { text: string; x: number; y: number };

const SEEDED_WEEKS = 53;

export function ContributionGraph({ data }: { data?: ContributionCell[] | null }) {
  const [tip, setTip] = React.useState<Tip | null>(null);
  const reduceMotion = useReducedMotion();

  // Grid fills column by column (grid-flow-col): index = week * 7 + day.
  const cells = React.useMemo<Cell[]>(() => {
    if (data && data.length) {
      return data.map((cell, i) => ({
        i,
        week: Math.floor(i / DAYS),
        level: cell?.level ?? 0,
        count: cell?.count ?? 0,
        date: cell?.date ?? null,
        empty: cell === null,
      }));
    }
    return Array.from({ length: SEEDED_WEEKS * DAYS }, (_, i) => {
      const level = seededLevel(i);
      return {
        i,
        week: Math.floor(i / DAYS),
        level,
        count: seededCount(i, level),
        date: null,
        empty: false,
      };
    });
  }, [data]);

  const weekCount = cells.length / DAYS;

  // Each cell lights up with a delay tied to its column, producing a
  // left-to-right sweep across the grid.
  const cellVariants: Variants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.4 },
    visible: (week: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: reduceMotion ? 0 : week * 0.02,
        duration: 0.35,
        ease: "easeOut",
      },
    }),
  };

  const showTip = (e: React.MouseEvent<HTMLDivElement>, cell: Cell) => {
    if (cell.empty) return;

    let iso = cell.date;
    if (!iso) {
      // Seeded fallback: derive a date from the cell's position.
      const day = cell.i % DAYS;
      const daysAgo = (weekCount - 1 - cell.week) * DAYS + (DAYS - 1 - day);
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - daysAgo);
      iso = d.toISOString().slice(0, 10);
    }

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
        <motion.div
          className="mx-auto grid w-fit grid-flow-col grid-rows-7 gap-0.75"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          onMouseLeave={() => setTip(null)}
        >
          {cells.map((cell) => (
            <motion.div
              key={cell.i}
              custom={cell.week}
              variants={cellVariants}
              onMouseEnter={(e) => showTip(e, cell)}
              className={
                cell.empty
                  ? "size-3 rounded-[3px] bg-transparent"
                  : `size-3 rounded-[3px] ${LEVEL_CLASS[cell.level]}`
              }
            />
          ))}
        </motion.div>
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
