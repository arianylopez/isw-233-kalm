import sys
from field import SeabattleField
from network import GameSocket
from utils import Converter, Point
from enums import ShotResult, CellState

class SeabattleAgent:
    def __init__(self, field: SeabattleField, connection: GameSocket, my_turn: bool):
        self.my_field = field
        self.enemy_field = SeabattleField()
        self.conn = connection
        self.my_turn = my_turn
        self.converter = Converter()

    def start_game(self):
        print("¡Juego iniciado!")
        self.print_game_state()

        while not self.game_over():
            if self.my_turn:
                self.play_my_turn()
            else:
                self.play_enemy_turn()
            
            self.print_game_state()
        self.game_over()

    def play_my_turn(self):
        print("\n--> TU TURNO")
        point = None
        move_str = ""

        while point is None:
            move_str = input("Ingresar coordenadas (ej. B5): ").upper()
            point = self.converter.parse_move(move_str)
            if not point:
                print("Movimiento inválido. Intente de nuevo.")

        try:
            self.conn.send_move(move_str)
            print(f"Enviando movimiento: {move_str}")

            result = self.conn.receive_result()
            print(f"Resultado recibido: {result.name}")

            self.update_enemy_field(point, result)

            if result == ShotResult.MISS:
                self.my_turn = False
            else:
                print("¡Buen tiro! Puedes jugar de nuevo.")

        except Exception as e:
            print(f"Error durante el turno: {e}")
            sys.exit(1)

    def play_enemy_turn(self):
        print("\n<-- TURNO OPONENTE")
        try:
            move_str = self.conn.receive_move()
            point = self.converter.parse_move(move_str)

            if not point:
                print("Error: Coordenadas invalidas del oponente")
                return
            
            print(f"Oponente disparó a: {move_str}")

            result = self.my_field.shoot(point)
            self.conn.send_result(result)
            print(f"Resultado enviado al oponente: {result.name}")

            if result == ShotResult.MISS:
                print("El oponente falló. Es tu turno.")
                self.my_turn = True
            else:
                print("El oponente acertó. El oponente juega de nuevo.")

        except Exception as e:
            print(f"Error durante el turno del oponente: {e}")
            sys.exit(1)

    def update_enemy_field(self, point: Point, result: ShotResult):
        if result == ShotResult.MISS:
            self.enemy_field.grid[point.row][point.col] = CellState.EMPTY
        elif result == ShotResult.HIT:
            self.enemy_field.grid[point.row][point.col] = CellState.HIT
        elif result == ShotResult.KILL:
            self.enemy_field.grid[point.row][point.col] = CellState.KILL

    def game_over(self) -> bool:
        return self.my_field.is_loser()
    
    def handle_game_over(self):
        if self.my_field.is_loser():
            print("¡Has perdido! Todos tus barcos han sido hundidos.")
        else:
            print("¡Felicidades! Has ganado. Todos los barcos del oponente han sido hundidos.")

    def print_game_state(self):
        print("\n" + "="*30)
        print("TU FLOTA:")
        self.my_field.print_field()
        print("-" * 20)
        print("CAMPO ENEMIGO:")
        self.enemy_field.print_field()
        print("="*30 + "\n")
