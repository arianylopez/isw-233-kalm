import random
from enums import CellState, ShotResult
from utils import Point

class SeabattleField:
    SIZE = 8

    def __init__(self):
        self.grid = [[CellState.EMPTY for _ in range(self.SIZE)] for _ in range(self.SIZE)]
        self.ships = []

    def random_field(self, seed):
        random.seed(seed)
        
        for _ in range(100): 
            self.grid = [[CellState.EMPTY for _ in range(self.SIZE)] for _ in range(self.SIZE)]
            self.ships = []
            fleet = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
            success = True
            
            for ship_size in fleet:
                placed = False
                for _ in range(100): 
                    if self.try_place_ship(ship_size):
                        placed = True
                        break
                if not placed:
                    success = False
                    break 
            
            if success:
                return

    def shoot(self, point: Point) -> ShotResult:
        row = point.row
        col = point.col

        if not (0 <= row < self.SIZE and 0 <= col < self.SIZE):
            return ShotResult.MISS
        
        current_state = self.grid[row][col]

        if current_state == CellState.EMPTY or current_state == CellState.UNKNOWN:
            self.grid[row][col] = CellState.EMPTY
            return ShotResult.MISS
        
        if current_state == CellState.SHIP or current_state == CellState.HIT:
            self.grid[row][col] = CellState.HIT
            if self.ship_sunk(point):
                self.ship_killed(point)
                return ShotResult.KILL
            return ShotResult.HIT
        
        return ShotResult.MISS
    
    def try_place_ship(self, size) -> bool:
        horizontal = random.choice([True, False])
        if horizontal:
            row = random.randint(0, self.SIZE - 1)
            col = random.randint(0, self.SIZE - size)
        else:
            row = random.randint(0, self.SIZE - size)
            col = random.randint(0, self.SIZE - 1)

        if self.valid_position(row, col, size, horizontal):
            self.place_ship(row, col, size, horizontal)
            return True
        return False
    
    def valid_position(self, row, col, size, horizontal) -> bool:
        r_start = max(0, row - 1)
        r_end = min(self.SIZE, row + (1 if horizontal else size) + 1)
        c_start = max(0, col - 1)
        c_end = min(self.SIZE, col + (size if horizontal else 1) + 1)

        for r in range(r_start, r_end):
            for c in range(c_start, c_end):
                if self.grid[r][c] == CellState.SHIP:
                    return False
        return True
    
    def place_ship(self, row, col, size, horizontal):
        ship_points = []
        for i in range(size):
            if horizontal:
                r = row
            else: 
                r = row + i
            if horizontal:
                c = col + i
            else:
                c = col
            self.grid[r][c] = CellState.SHIP
            ship_points.append(Point(r, c))
        self.ships.append(ship_points)

    def find_ship(self, point: Point):
        for ship in self.ships:
            for ship_point in ship:
                if ship_point == point:
                    return ship
        return None
    
    def ship_sunk(self, point: Point) -> bool:
        ship = self.find_ship(point)
        if not ship:
            return False
        for p in ship:
            if self.grid[p.row][p.col] != CellState.HIT:
                return False
        return True
    
    def ship_killed(self, point: Point):
        ship = self._find_ship_at(point)
        if ship:
            for p in ship:
                self.grid[p.row][p.col] = CellState.KILL
    
    def is_loser(self) -> bool:
        for ship in self.ships:
            ship_destroyed = True
            for p in ship:
                if self.grid[p.row][p.col] != CellState.KILL:
                    ship_destroyed = False
                    break
            if not ship_destroyed:
                return False
        return True
    
    def print_field(self):
        print("  A B C D E F G H")
        for r in range(self.SIZE):
            line = f"{r + 1} "
            for c in range(self.SIZE):
                state = self.grid[r][c]
                symbol = "."
                if state == CellState.SHIP:
                    symbol = "■"
                elif state == CellState.HIT:
                    symbol = "X"
                elif state == CellState.KILL:
                    symbol = "#"
                elif state == CellState.EMPTY:
                    symbol = "~"
                line += f"{symbol} "
            print(line)
        