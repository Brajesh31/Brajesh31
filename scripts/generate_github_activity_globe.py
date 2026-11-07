#!/usr/bin/env python3
"""Generate an animated, contribution-driven globe GIF for the profile README."""
import json
import math
import os
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter

USERNAME = os.environ.get("GITHUB_USERNAME", "Brajesh31")
TOKEN = os.environ["GITHUB_TOKEN"]
OUT = Path("assets/github-activity-globe.gif")
QUERY = """
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}
"""

def fetch_days():
    payload = json.dumps({"query": QUERY, "variables": {"login": USERNAME}}).encode()
    request = urllib.request.Request(
        "https://api.github.com/graphql", data=payload,
        headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json",
                 "User-Agent": "github-activity-globe-generator"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        data = json.load(response)
    if data.get("errors"):
        raise RuntimeError("GitHub GraphQL error: " + json.dumps(data["errors"]))
    user = data.get("data", {}).get("user")
    if not user:
        raise RuntimeError(f"GitHub user {USERNAME!r} was not returned")
    weeks = user["contributionsCollection"]["contributionCalendar"]["weeks"]
    return [day for week in weeks for day in week["contributionDays"]]

def font(size, bold=False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()

def main():
    days = fetch_days()
    total = sum(int(day["contributionCount"]) for day in days)
    maximum = max((int(day["contributionCount"]) for day in days), default=1) or 1
    points = []
    for index, day in enumerate(days):
        count = int(day["contributionCount"])
        if count <= 0:
            continue
        date = datetime.strptime(day["date"], "%Y-%m-%d")
        weekday = date.weekday()
        # Spread the full calendar around the sphere, with weekdays as latitude bands.
        lon = (index / max(1, len(days) - 1)) * 2 * math.pi - math.pi
        lat = math.radians(58 - weekday * (116 / 6))
        points.append((lon, lat, count))

    W, H = 900, 560
    cx, cy, radius = 450, 278, 205
    frames = []
    frame_count = 36
    title_font, sub_font = font(27, True), font(15)
    total_font, small_font = font(23, True), font(12)

    for frame_index in range(frame_count):
        angle = 2 * math.pi * frame_index / frame_count
        image = Image.new("RGB", (W, H), (7, 13, 27))
        draw = ImageDraw.Draw(image)
        # Subtle star field.
        for i in range(95):
            x = (i * 137 + 41) % W
            y = (i * 71 + 19) % H
            draw.ellipse((x, y, x + 1, y + 1), fill=(28, 52, 78))
        draw.text((W // 2, 35), "GITHUB ACTIVITY GLOBE", font=title_font, fill=(226, 242, 255), anchor="mm")
        draw.text((W // 2, 67), "A year of contributions, mapped around a rotating planet", font=sub_font, fill=(133, 164, 194), anchor="mm")

        # Atmospheric halo and sphere.
        halo = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        hd = ImageDraw.Draw(halo)
        hd.ellipse((cx-radius-13, cy-radius-13, cx+radius+13, cy+radius+13), fill=(19, 155, 235, 35))
        halo = halo.filter(ImageFilter.GaussianBlur(20))
        image = Image.alpha_composite(image.convert("RGBA"), halo)
        draw = ImageDraw.Draw(image)
        draw.ellipse((cx-radius-5, cy-radius-5, cx+radius+5, cy+radius+5), outline=(65, 190, 255, 210), width=2)
        draw.ellipse((cx-radius, cy-radius, cx+radius, cy+radius), fill=(8, 32, 57, 255), outline=(42, 115, 164, 220), width=2)

        # Rotating longitude and latitude grid, clipped by the circular silhouette.
        for lat_deg in (-60, -30, 0, 30, 60):
            lat = math.radians(lat_deg)
            coords = []
            for step in range(121):
                lon = -math.pi + 2 * math.pi * step / 120
                x3 = math.cos(lat) * math.sin(lon + angle)
                z3 = math.cos(lat) * math.cos(lon + angle)
                y3 = math.sin(lat)
                if z3 >= 0:
                    coords.append((cx + radius*x3, cy - radius*y3))
                else:
                    if len(coords) > 1:
                        draw.line(coords, fill=(49, 116, 154, 100), width=1)
                    coords = []
            if len(coords) > 1:
                draw.line(coords, fill=(49, 116, 154, 100), width=1)
        for lon_deg in range(0, 180, 30):
            lon0 = math.radians(lon_deg)
            coords = []
            for step in range(121):
                lat = -math.pi/2 + math.pi*step/120
                x3 = math.cos(lat) * math.sin(lon0 + angle)
                z3 = math.cos(lat) * math.cos(lon0 + angle)
                y3 = math.sin(lat)
                if z3 >= 0:
                    coords.append((cx + radius*x3, cy - radius*y3))
                else:
                    if len(coords) > 1:
                        draw.line(coords, fill=(49, 116, 154, 100), width=1)
                    coords = []
            if len(coords) > 1:
                draw.line(coords, fill=(49, 116, 154, 100), width=1)

        # Contribution points rotate with the sphere.
        glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        gd = ImageDraw.Draw(glow)
        for lon, lat, count in points:
            rotated = lon + angle
            x3 = math.cos(lat) * math.sin(rotated)
            z3 = math.cos(lat) * math.cos(rotated)
            y3 = math.sin(lat)
            if z3 <= 0:
                continue
            x, y = cx + radius*x3, cy - radius*y3
            intensity = count / maximum
            r = 2.3 + 4.2 * math.sqrt(intensity)
            color = (57, 217, 138) if intensity < .34 else ((37, 201, 242) if intensity < .68 else (167, 139, 250))
            gd.ellipse((x-r*2, y-r*2, x+r*2, y+r*2), fill=(*color, 65))
            draw.ellipse((x-r, y-r, x+r, y+r), fill=(*color, 245))
        glow = glow.filter(ImageFilter.GaussianBlur(5))
        image = Image.alpha_composite(image, glow)
        draw = ImageDraw.Draw(image)
        # Repaint sharp point cores above their glow.
        for lon, lat, count in points:
            rotated = lon + angle
            x3 = math.cos(lat) * math.sin(rotated)
            z3 = math.cos(lat) * math.cos(rotated)
            if z3 <= 0:
                continue
            y3 = math.sin(lat)
            x, y = cx + radius*x3, cy - radius*y3
            intensity = count / maximum
            r = 2.1 + 3.6 * math.sqrt(intensity)
            color = (57, 217, 138, 255) if intensity < .34 else ((37, 201, 242, 255) if intensity < .68 else (167, 139, 250, 255))
            draw.ellipse((x-r, y-r, x+r, y+r), fill=color)

        draw.text((W//2, 510), f"{total:,} contributions", font=total_font, fill=(240, 247, 255), anchor="mm")
        draw.text((W//2, 540), f"@{USERNAME}  •  Updated {datetime.now(timezone.utc).strftime('%d %b %Y')}  •  Auto-rotating", font=small_font, fill=(132, 158, 184), anchor="mm")
        frames.append(image.convert("P", palette=Image.Palette.ADAPTIVE, colors=128))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(OUT, save_all=True, append_images=frames[1:], duration=90, loop=0, optimize=True, disposal=2)
    print(f"Generated animated {OUT}: {len(frames)} frames, {total} contributions, {len(days)} days.")

if __name__ == "__main__":
    main()
