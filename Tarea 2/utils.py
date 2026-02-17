from typing import Optional

class Point:
    def __init__(self, row, col):
        self.row = row
        self.col = col

    def __eq__(self, other):
        if isinstance(other, Point):
            return self.row == other.row and self.col == other.col
        return False
    
    def __repr__(self):
        return f"Point({self.row}, {self.col})"
    
class Converter:
    def __init__(self):
        self.columns = "ABCDEFGH"

    def parse_move(self, text) -> Optional[Point]:
        text = text.strip().upper()
        if len(text) != 2:
            return None
        
        col_char = text[0]
        row_char = text[1]

        if col_char not in self.columns:
            return None
        
        if not row_char.isdigit():
            return None
        
        col_idx = self.columns.index(col_char)
        row_idx = int(row_char) - 1

        if not(0 <= row_idx <= 7):
            return None
        return Point(row_idx, col_idx)
    
    def to_string(self, point: Point) -> str:
        if not(0 <= point.row <= 7 and 0 <= point.col <= 7):
            return "??"
        return f"{self.columns[point.col]}{point.row + 1}"