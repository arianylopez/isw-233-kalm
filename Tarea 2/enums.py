from enum import IntEnum

class CellState(IntEnum):
    UNKNOWN = 0
    EMPTY = 1
    SHIP = 2
    HIT = 3
    KILL = 4

class ShotResult(IntEnum):
    MISS = 0
    HIT = 1
    KILL = 2