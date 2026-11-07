#!/usr/bin/env python3
"""Fetch real GitHub contribution days and write the input for the 3D globe renderer."""
import json, os, urllib.request
from pathlib import Path
from datetime import datetime, timezone, timedelta

USERNAME=os.environ.get("GITHUB_USERNAME","Brajesh31")
TOKEN=os.environ["GITHUB_TOKEN"]
QUERY="""
query($login:String!) {
  user(login:$login) {
    contributionsCollection {
      contributionCalendar {
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}
"""

def main():
    payload=json.dumps({"query":QUERY,"variables":{"login":USERNAME}}).encode()
    req=urllib.request.Request("https://api.github.com/graphql",data=payload,headers={
      "Authorization":f"Bearer {TOKEN}","Content-Type":"application/json","User-Agent":"Brajesh31-gitglobe"
    })
    with urllib.request.urlopen(req,timeout=30) as res: data=json.load(res)
    if data.get("errors"): raise RuntimeError(json.dumps(data["errors"]))
    user=data.get("data",{}).get("user")
    if not user: raise RuntimeError(f"GitHub user {USERNAME} not found")
    weeks=user["contributionsCollection"]["contributionCalendar"]["weeks"]
    days=[d for w in weeks for d in w["contributionDays"]]
    # The calendar includes adjacent days to complete week rows. Retain only the
    # trailing 365 actual dates and independently compute the displayed total.
    today=datetime.now(timezone.utc).date()
    start=today-timedelta(days=364)
    days=[d for d in days if start.isoformat() <= d["date"] <= today.isoformat()]
    # GitHub's contribution calendar occasionally returns an anomalous aggregate
    # value for a day. Reject impossible spikes instead of displaying fabricated
    # totals, and preserve the trustworthy daily values.
    cleaned=[]
    for day in days:
        count=int(day["contributionCount"])
        if count<0 or count>2000:
            print(f"Warning: ignoring anomalous contribution value {count} on {day['date']}")
            count=0
        cleaned.append({**day,"contributionCount":count})
    days=cleaned
    counts=[int(d["contributionCount"]) for d in days]
    total=sum(counts)
    if len(days)<350:
        raise RuntimeError(f"Contribution data incomplete: only {len(days)} days returned")
    out={"username":USERNAME,"updatedAt":datetime.now(timezone.utc).isoformat(),"totalContributions":total,"days":days}
    Path("assets").mkdir(exist_ok=True)
    Path("assets/github-contributions.json").write_text(json.dumps(out,separators=(",",":")),encoding="utf-8")
    print(f"Validated {len(days)} days and {total} contributions for {USERNAME}")
if __name__=="__main__": main()
