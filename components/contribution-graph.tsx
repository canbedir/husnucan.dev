"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type ContributionsResponse = {
  total?: Record<string, number>;
  contributions?: ContributionDay[];
};

const USERNAME = "canbedir";

// Emerald intensity scale, tuned for both themes.
const LEVEL_CLASS = [
  "bg-zinc-200 dark:bg-[#1a1d20]",
  "bg-emerald-100 dark:bg-[#064e3b]",
  "bg-emerald-300 dark:bg-[#047857]",
  "bg-emerald-500 dark:bg-[#10b981]",
  "bg-emerald-600 dark:bg-[#34d399]",
] as const;

export function ContributionGraph() {
  const [activity, setActivity] = useState<ContributionsResponse | null>(null);
  // Number of week columns is derived from the container width, so cells keep
  // a consistent size and always fill the row without needing to scroll.
  const [visibleWeeks, setVisibleWeeks] = useState(20);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let active = true;

    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`)
      .then((res) => res.json())
      .then((data: ContributionsResponse) => {
        if (active) setActivity(data);
      })
      .catch((error) => {
        console.error("Error fetching GitHub contributions:", error);
        if (active) setActivity({ contributions: [] });
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const width = containerRef.current?.offsetWidth;
      if (!width) return;
      setVisibleWeeks(Math.max(10, Math.min(Math.floor((width + 4) / 16), 52)));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activity]);

  const days = (activity?.contributions ?? []).slice(-(7 * visibleWeeks));
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const loading = activity === null;
  const total = activity?.total
    ? Object.values(activity.total).reduce((sum, count) => sum + count, 0)
    : 0;

  return (
    <div ref={containerRef} className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaGithub className="size-4" />
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            GitHub Activity
          </span>
        </div>
        {total > 0 && (
          <span className="text-xs text-muted-foreground">
            {total.toLocaleString()} contributions this year
          </span>
        )}
      </div>

      <div className="flex justify-between gap-1">
        {loading
          ? Array.from({ length: visibleWeeks }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-1 flex-col gap-1">
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="aspect-square w-full animate-pulse rounded-sm bg-zinc-200 dark:bg-[#1a1d20]"
                  />
                ))}
              </div>
            ))
          : weeks.map((week, weekIndex) => (
              <motion.div
                key={weekIndex}
                className="flex flex-1 flex-col gap-1"
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: reduceMotion ? 0 : weekIndex * 0.025,
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.count} contributions on ${day.date}`}
                    className={`aspect-square w-full rounded-sm transition-transform hover:scale-110 ${LEVEL_CLASS[day.level]}`}
                  />
                ))}
              </motion.div>
            ))}
      </div>
    </div>
  );
}
