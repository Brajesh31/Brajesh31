#!/usr/bin/env python3
"""Fetch the last 365 days of GitHub contributions for the 3D globe."""
import json, os, urllib.request
from pathlib import Path
from datetime import datetime, timezone, timedelta

USERNAME=os.environ.get("GITHUB_USERNAME","Brajesh31")
TOKEN=os.environ["GITHUB_TOKEN"]
QUERY="""
query($login:String!, $from:DateTime!, $to:DateTime!) {
  user(login:$login) {
    contributionsCollection(from:$from,to:$to) {
      contributionCalendar {
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}
"""

def main():
    today=datetime.now(timezone.utc).date()
    start=today-timedelta(days=364)
    variables={"login":USERNAME,"from":start.isoformat()+"T00:00:00Z","to":today.isoformat()+"T23:59:59Z"}
    payload=json.dumps({"query":QUERY,"variables":variables}).encode()
    req=urllib.request.Request("https://api.github.com/graphql",data=payload,headers={
      "Authorization":f"Bearer {TOKEN}","Content-Type":"application/json","User-Agent":"Brajesh31-gitglobe"
    })
    with urllib.request.urlopen(req,timeout=30) as res: data=json.load(res)
    if data.get("errors"): raise RuntimeError(json.dumps(data["errors"]))
    user=data.get("data",{}).get("user")
    if not user: raise RuntimeError(f"GitHub user {USERNAME} not found")
    weeks=user["contributionsCollection"]["contributionCalendar"]["weeks"]
    days=[d for w in weeks for d in w["contributionDays"] if start.isoformat() <= d["date"] <= today.isoformat()]
    cleaned=[]
    for day in days:
        count=int(day["contributionCount"])
        if count<0 or count>2000:
            print(f"Warning: excluding suspicious contribution spike {count} on {day['date']}")
            count=0
        cleaned.append({**day,"contributionCount":count})
    days=cleaned
    total=sum(int(d["contributionCount"]) for d in days)
    if len(days)<350 or len(days)>366:
        raise RuntimeError(f"Unexpected contribution date coverage: {len(days)} days")
    out={"username":USERNAME,"updatedAt":datetime.now(timezone.utc).isoformat(),"totalContributions":total,"days":days}
    Path("assets").mkdir(exist_ok=True)
    Path("assets/github-contributions.json").write_text(json.dumps(out,separators=(",",":")),encoding="utf-8")
    print(f"Validated {len(days)} days and {total} contributions for {USERNAME}")
if __name__=="__main__": main()
