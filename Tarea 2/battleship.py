import sys
import random
import socket

UNKNOWN = 0
EMPTY = 1
SHIP = 2
HIT = 3
KILL = 4

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

    def print_debug(self):
        print(" A B C D E F G H")
        for y in range(GRID_SIZE):
            row = f"{y+1} "
            for x in range(GRID_SIZE):
                val = self.grid[y][x]
                char = "."
                if val == SHIP:
                    char = 'S'
                row += char + " "
            print(row)

if __name__ == "__main__":
    campo = SeabattleField()
    semilla = 12345
    campo.get_random_field(semilla)
    campo.print_debug()