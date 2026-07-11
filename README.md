# husnucan.dev

My personal site

## Tech

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS v4** & **shadcn/ui** (Base UI)
- **Framer Motion** for animation
- **react-icons** / **lucide-react** for icons
- **Spotify Web API** for now-playing, **GitHub contributions** for the activity graph

## Getting started

```bash
git clone https://github.com/canbedir/husnucan.dev.git
cd husnucan.dev
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Environment

The now-playing bubble needs a Spotify app. Create `.env.local`:

```bash
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/api/spotify/callback
SPOTIFY_REFRESH_TOKEN=
```

Get a refresh token (with the `user-read-currently-playing` scope) by visiting
`/api/spotify/login` once and copying the value returned by the callback.

> Without these, the site runs fine — the bubble just stays hidden.

The GitHub activity graph needs no token (it uses a public contributions API).
