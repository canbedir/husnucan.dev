// Fetches the GitHub contribution calendar via the official GraphQL API.
// Requires a Personal Access Token in GITHUB_TOKEN (server-only). Falls back
// to null so the graph can render its decorative pattern instead.

export const GITHUB_LOGIN = "canbedir";

/** One grid cell. `null` marks padding at the start/end of the calendar. */
export type ContributionCell = {
  date: string;
  count: number;
  level: number;
} | null;

const LEVEL: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

type Day = {
  date: string;
  contributionCount: number;
  contributionLevel: string;
};

/**
 * Returns a flat, column-major array padded to a multiple of 7 (one column per
 * week), or null when the token is missing or the request fails.
 */
export async function getContributions(
  login: string = GITHUB_LOGIN
): Promise<ContributionCell[] | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const weeks: { contributionDays: Day[] }[] | undefined =
      json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
    if (!weeks?.length) return null;

    const cells: ContributionCell[] = [];
    weeks.forEach((week, wi) => {
      const days = week.contributionDays;
      // First week may start mid-week: pad the top of the column.
      if (wi === 0 && days.length < 7) {
        for (let k = 0; k < 7 - days.length; k++) cells.push(null);
      }
      for (const d of days) {
        cells.push({
          date: d.date,
          count: d.contributionCount,
          level: LEVEL[d.contributionLevel] ?? 0,
        });
      }
      // Last week may end mid-week: pad the bottom of the column.
      if (wi === weeks.length - 1 && days.length < 7) {
        for (let k = 0; k < 7 - days.length; k++) cells.push(null);
      }
    });

    return cells;
  } catch {
    return null;
  }
}
