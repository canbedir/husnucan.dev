import Link from "next/link";
import type { IconType } from "react-icons";
import { SiGithub, SiHackerone, SiDiscord, SiX } from "react-icons/si";

type Social = { name: string; href: string; icon: IconType };

const socials: Social[] = [
  { name: "GitHub", href: "https://github.com/canbedir", icon: SiGithub },
  {
    name: "X",
    href: "https://x.com/canhix",
    icon: SiX,
  },
  {
    name: "HackerOne",
    href: "https://hackerone.com/husnucan",
    icon: SiHackerone,
  },
  {
    name: "Discord",
    href: "https://discord.com/users/601858914257993730",
    icon: SiDiscord,
  },
];

export function Socials() {
  return (
    <ul className="flex items-center gap-4">
      {socials.map(({ name, href, icon: Icon }) => (
        <li key={name}>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            title={name}
            className="inline-flex text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon className="size-5" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
