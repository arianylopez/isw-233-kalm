import sys
import random
import socket

UNKNOWN = 0
EMPTY = 1
SHIP = 2
HIT = 3
KILL = 4

RESULT_MISS = 0
RESULT_HIT = 1
RESULT_KILL = 2

GRID_SIZE = 8
SHIPS_CONFIG = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]

class SeabattleField:
    def __init__ (self):
        self.grid = [[EMPTY for _ in range(GRID_SIZE)] for _ in range(GRID_SIZE)]
        self.ships = []

    def get_random_field(self, seed):
        random.seed(seed)
        self.grid = [[EMPTY for _ in range(GRID_SIZE)] for _ in range(GRID_SIZE)]
        self.ships = []

        for ship_len in SHIPS_CONFIG:
            placed = False
            while not placed:
                horizontal = random.choice([True, False])
                if horizontal:
                    x = random.randint(0, GRID_SIZE - ship_len)
                    y = random.randint(0, GRID_SIZE - 1)
                else:
                    x = random.randint(0, GRID_SIZE - 1)
                    y = random.randint(0, GRID_SIZE - ship_len)

                if self._can_place_ship(x, y, ship_len, horizontal):
                    self._place_ship(x, y, ship_len, horizontal)
                    placed = True

    def _can_place_ship(self, x, y, length, horizontal):
        x_start = max(0, x - 1)
        y_start = max(0, y - 1)

        if horizontal:
            x_end = min(GRID_SIZE, x + length + 1)
            y_end = min(GRID_SIZE, y + 2)
        else:
            x_end = min(GRID_SIZE, x + 2)
            y_end = min(GRID_SIZE, y + length + 1)

        for i in range(x_start, x_end):
            for j in range(y_start, y_end):
                if 0 <= i < GRID_SIZE and 0 <= j < GRID_SIZE:
                    if self.grid[j][i] != EMPTY:
                        return False
        return True
    
    def _place_ship(self, x, y, length, horizontal):
        ship_coords = []
        for i in range(length):
            if horizontal:
                cx, cy = (x + i, y)
            else:
                cx, cy = (x, y + i)
            self.grid[cy][cx] = SHIP
            ship_coords.append((cx, cy))
        self.ships.append(ship_coords)

    def shoot(self, x, y):
        if not (0 <= x < GRID_SIZE and 0 <= y < GRID_SIZE):
            return RESULT_MISS
        state = self.grid[y][x]
        if state == EMPTY or state == UNKNOWN:
            self.grid[y][x] = EMPTY 
            return RESULT_MISS 
        
        if state == SHIP:
            self.grid[y][x] = HIT
            if self._is_ship_sunk(x, y):
                self._mark_entire_ship_kill(x, y)
                return RESULT_KILL
            return RESULT_HIT
        
        if state == HIT:
            return RESULT_HIT
        if state == KILL:
            return RESULT_KILL
        
        return RESULT_MISS
    
    def is_loser(self):
        for row in self.grid:
            if SHIP in row:
                return False
        return True
    
    def mark_miss(self, x, y):
        self.grid[y][x] = EMPTY

    def mark_kill(self, x, y):
        self.grid[y][x] = KILL

    def _get_ship_containing(self, x, y):
        for ship in self.ships:
            if(x, y) in ship:
                return ship
        return None
    
    def _is_ship_sunk(self, x, y):
        ship = self._get_ship_containing(x, y)
        if not ship:
            return False
        for(sx, sy) in ship:
            if self.grid[sy][sx] != HIT:
                return False
        return True
    
    def _mark_entire_ship_kill(self, x, y):
        ship = self._get_ship_containing(x, y)
        if ship:
            for(sx, sy) in ship:
                self.grid[sy][sx] = KILL 

    def print_debug(self):
        print("  A B C D E F G H")
        symbols = {UNKNOWN: '?', EMPTY: '.', SHIP: 'S', HIT: 'X', KILL: '#'}
        for y in range(GRID_SIZE):
            row = f"{y+1} "
            for x in range(GRID_SIZE):
                row += symbols.get(self.grid[y][x], '?') + " "
            print(row)

if __name__ == "__main__":
    campo = SeabattleField()
    campo.get_random_field(12345)
    campo.print_debug()

    for x in range(8):
        res = campo.shoot(x, 0)
        res_str = ["MISS,", "HIT", "KILL"][res]

    campo.print_debug()