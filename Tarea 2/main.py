import sys
import socket 
from field import SeabattleField
from network import GameSocket
from agent import SeabattleAgent

def start_server(seed, port):
    print(f"[SERVIDOR] Seed: {seed}, Port: {port}")
    server_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    try:
        server_sock.bind(('0.0.0.0', port))
        server_sock.listen(1)
        print("Esperando cliente...")
        client_sock, addr = server_sock.accept()
        print(f"Conectado: {addr}")
        play_game(client_sock, seed, my_turn=False)
    finally:
        server_sock.close()

def start_client(seed: int, ip: str, port: int):
    print(f"[CLIENTE] Seed: {seed}, IP: {ip}, Port: {port}")
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        sock.connect((ip, port))
        print("Conectado.")
        play_game(sock, seed, my_turn=True)
    finally:
        sock.close()

def play_game(sock, seed, my_turn):
    game_sock = GameSocket(sock)
    field = SeabattleField()
    field.random_field(seed)
    agent = SeabattleAgent(field, game_sock, my_turn)
    agent.start_game()

if __name__ == "__main__":
    args = sys.argv
    if len(args) == 3:
        start_server(int(args[1]), int(args[2]))
    elif len(args) == 4:
        start_client(int(args[1]), args[2], int(args[3]))
    else:
        print("Uso: main.py <seed> <port> (Server) O main.py <seed> <ip> <port> (Client)")
