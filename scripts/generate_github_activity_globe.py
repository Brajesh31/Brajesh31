#!/usr/bin/env python3
"""Generate a contribution-driven SVG globe from GitHub's public contribution calendar."""
import json
import math
import os
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

USERNAME = os.environ.get("GITHUB_USERNAME", "Brajesh31")
TOKEN = os.environ["GITHUB_TOKEN"]
OUT = Path("assets/github-activity-globe.svg")
QUERY = """
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays { date contributionCount }
        }
      }
    }
  }
}
"""

def fetch_calendar():
    payload = json.dumps({"query": QUERY, "variables": {"login": USERNAME}}).encode()
    request = urllib.request.Request(
        "https://api.github.com/graphql",
        data=payload,
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": "application/json",
            "User-Agent": "github-activity-globe-generator",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        data = json.load(response)
    if data.get("errors"):
        raise RuntimeError("GitHub GraphQL error: " + json.dumps(data["errors"]))
    user = data.get("data", {}).get("user")
    if not user:
        raise RuntimeError(f"GitHub user {USERNAME!r} was not returned")
    return user["contributionsCollection"]["contributionCalendar"]

def main():
    calendar = fetch_calendar()
    weeks = calendar["weeks"]
    days = [day for week in weeks for day in week["contributionDays"]]
    max_count = max((d["contributionCount"] for d in days), default=1) or 1
    total = calendar["totalContributions"]

    width, height = 1000, 620
    cx, cy, radius = 500, 292, 218
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">',
        '<title id="title">GitHub Activity Globe</title>',
        f'<desc id="desc">{total} GitHub contributions in the last year, visualized on a rotating-style globe.</desc>',
        '<defs>',
        '<radialGradient id="ocean" cx="35%" cy="28%" r="75%"><stop offset="0" stop-color="#164e78"/><stop offset=".58" stop-color="#0b2540"/><stop offset="1" stop-color="#07111f"/></radialGradient>',
        '<linearGradient id="rim" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#38bdf8"/><stop offset=".5" stop-color="#8b5cf6"/><stop offset="1" stop-color="#22c55e"/></linearGradient>',
        '<filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>',
        '<clipPath id="globeClip"><circle cx="500" cy="292" r="218"/></clipPath>',
        '</defs>',
        '<rect width="1000" height="620" rx="24" fill="#080f1b"/>',
        '<text x="500" y="52" fill="#e6f4ff" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="27" font-weight="700">GITHUB ACTIVITY GLOBE</text>',
        '<text x="500" y="80" fill="#8ba7c2" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="13">A year of contributions, mapped as a living signal</text>',
        f'<circle cx="{cx}" cy="{cy}" r="{radius+7}" fill="none" stroke="url(#rim)" stroke-width="2" opacity=".8"/>',
        f'<circle cx="{cx}" cy="{cy}" r="{radius}" fill="url(#ocean)" stroke="#4ca8d8" stroke-opacity=".35"/>',
        '<g clip-path="url(#globeClip)" fill="none" stroke="#5ca9d6" stroke-opacity=".22" stroke-width="1.2">',
    ]
    for lat in (-60, -30, 0, 30, 60):
        yoff = radius * math.sin(math.radians(lat))
        rx = radius * math.cos(math.radians(lat))
        parts.append(f'<ellipse cx="{cx}" cy="{cy-yoff:.1f}" rx="{rx:.1f}" ry="{max(9, radius*.12):.1f}"/>')
    for angle in range(0, 180, 30):
        parts.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{radius*abs(math.cos(math.radians(angle))):.1f}" ry="{radius}" transform="rotate({angle} {cx} {cy})"/>')
    parts.append('</g><g clip-path="url(#globeClip)">')

    # Contribution weeks wrap around the globe. Weekday rows form latitude bands.
    week_count = max(1, len(weeks))
    for wi, week in enumerate(weeks):
        for day in week["contributionDays"]:
            count = day["contributionCount"]
            if count <= 0:
                continue
            weekday = datetime.fromisoformat(day["date"]).weekday()
            lon = (wi / week_count * 2 * math.pi) - math.pi
            lat = math.radians(58 - weekday * (116 / 6))
            x3 = math.cos(lat) * math.sin(lon)
            y3 = math.sin(lat)
            z3 = math.cos(lat) * math.cos(lon)
            # Orthographic view: only the front hemisphere is visible.
            if z3 <= 0:
                continue
            x = cx + radius * x3
            y = cy - radius * y3
            intensity = count / max_count
            dot_r = 2.1 + 5.2 * math.sqrt(intensity)
            color = "#39d98a" if intensity < .34 else ("#25c9f2" if intensity < .68 else "#a78bfa")
            opacity = .55 + .45 * intensity
            parts.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{dot_r:.2f}" fill="{color}" opacity="{opacity:.2f}"/>')
    parts += [
        '</g>',
        f'<text x="500" y="548" text-anchor="middle" fill="#f1f7ff" font-family="Inter,Arial,sans-serif" font-size="25" font-weight="700">{total:,} contributions</text>',
        f'<text x="500" y="574" text-anchor="middle" fill="#8ba7c2" font-family="Inter,Arial,sans-serif" font-size="13">Last 12 months · @{USERNAME} · Updated {datetime.now(timezone.utc).strftime("%d %b %Y")}</text>',
        '<g transform="translate(350 596)" font-family="Inter,Arial,sans-serif" font-size="11" fill="#9fb5c9"><circle cx="0" cy="0" r="4" fill="#39d98a"/><text x="10" y="4">Steady</text><circle cx="90" cy="0" r="4" fill="#25c9f2"/><text x="100" y="4">Active</text><circle cx="180" cy="0" r="4" fill="#a78bfa"/><text x="190" y="4">Peak</text></g>',
        '</svg>',
    ]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(parts), encoding="utf-8")
    print(f"Generated {OUT} with {total} contributions across {len(days)} days.")

if __name__ == "__main__":
    main()
