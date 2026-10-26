import os
import time

import pandas as pd
from dotenv import load_dotenv


_TTL_SECONDS = 30 * 60
_cache = {"data": None, "ts": 0.0}


class WorkJobList:

    def __init__(self, name, location, description):
        self.name = name
        self.location = location
        self.description = description

    def to_dict(self):
        return {
            "name": self.name,
            "location": self.location,
            "description": self.description,
        }

    @classmethod
    def getTable(cls):
        load_dotenv(override=True)
        docs = os.getenv('WORKJOB_URL')
        table = pd.read_csv(docs)
        return table

    LOCATION_ALIASES = {
        "health center": "O'Connor Health Center",
        "o'connor health center": "O'Connor Health Center",
        "oconnor health center": "O'Connor Health Center",
    }

    @classmethod
    def normalizeLocation(cls, loc):
        if loc is None:
            return None
        key = str(loc).strip().lower()
        return cls.LOCATION_ALIASES.get(key, str(loc).strip())

    @classmethod
    def getWorkjobs(cls):
        table = cls.getTable()
        workjobs = []
        for i, r in table.iterrows():
            def get(col):
                return r[col] if col in table.columns and pd.notna(r[col]) else None
            occurring = get("Occuring") or get("Occurring")
            if str(occurring).strip().lower() != "yes":
                continue
            job = cls(
                name=get("Workjob Name"),
                location=cls.normalizeLocation(get("Location")),
                description=get("Description"),
            )
            workjobs.append(job)

        return workjobs

    @staticmethod
    def sortByLocation(workjobs):
        sorted_workjobs = {}
        for wj in workjobs:
            loc = wj.location
            if loc not in sorted_workjobs:
                sorted_workjobs[loc] = []
            sorted_workjobs[loc].append(wj)
        return sorted_workjobs

    @staticmethod
    def printWorkjobs():
        wj = WorkJobList.getWorkjobs()
        workjobs = WorkJobList.sortByLocation(wj)
        print("Workjobs by Location:")
        for location, jobs in workjobs.items():
            print(f"----------------{location}----------------")
            for job in jobs:
                print(job.to_dict())


def get_workjobs():
    now = time.time()
    if _cache["data"] is None or now - _cache["ts"] > _TTL_SECONDS:
        try:
            fresh = WorkJobList.getWorkjobs()
            _cache["data"] = WorkJobList.sortByLocation(fresh)
            _cache["ts"] = now
        except Exception:
            if _cache["data"] is None:
                raise
    return _cache["data"]
