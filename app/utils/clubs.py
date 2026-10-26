import os
import time

import pandas as pd
from dotenv import load_dotenv


_TTL_SECONDS = 30 * 60
_cache = {"data": None, "ts": 0.0}


class ClubList:

    def __init__(self, type, name, desc, meeting, publish):
        self.type = type
        self.name = name
        self.desc = desc
        self.meeting = meeting
        self.publish = publish

    def to_dict(self):
        return {
            "Type of Club": self.type,
            "Name of Club": self.name,
            "Club Meeting Time and Location": self.meeting,
            "Publish": self.publish,
            "Description of Club": self.desc,
        }

    @classmethod
    def getTable(cls):
        load_dotenv(override=True)
        docs = os.getenv('CLUBS_URL')
        table = pd.read_csv(docs)
        table.columns = table.columns.str.strip()
        return table

    @classmethod
    def getClubs(cls):
        table = cls.getTable()
        clubs = []
        for i, r in table.iterrows():
            def col(name):
                return r[name] if name in table.columns and pd.notna(r[name]) else None
            name_val = col("Name of Club")
            desc_val = col("Description of Club")
            if name_val == "Name of Club" or desc_val == "Description of Club":
                continue
            if not name_val:
                continue
            class_obj = cls(
                name=name_val,
                desc=desc_val,
                meeting=col("Club Meeting Time and Location"),
                type=col("Type of Club"),
                publish=col("Publish"),
            )

            clubs.append(class_obj)

        return clubs

    @classmethod
    def printClubs(cls):
        co = ClubList.getClubs()
        for c in co:
            print(c.to_dict())


def get_clubs():
    now = time.time()
    if _cache["data"] is None or now - _cache["ts"] > _TTL_SECONDS:
        try:
            _cache["data"] = ClubList.getClubs()
            _cache["ts"] = now
        except Exception:
            if _cache["data"] is None:
                raise
    return _cache["data"]
