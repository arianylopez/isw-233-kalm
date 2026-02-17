import socket
from enums import ShotResult

class GameSocket:
    def __init__(self, sock: socket.socket):
        self.sock = sock

    def send_move(self, move_str):
        data = move_str.encode('utf-8')
        if len(data) != 2:
            raise ValueError("Movimiento debe ser 2 caracteres")
        self.sock.sendall(data)

    def receive_move(self) -> str:
        data = self.recv_exact(2)
        if not data:
            raise ConnectionError("Conexion cerrada")
        return data.decode('utf-8')
    
    def send_result(self, result: ShotResult):
        data = int(result).to_bytes(1, byteorder='big')
        self.sock.sendall(data)

    def receive_result(self) -> ShotResult:
        data = self.recv_exact(1)
        if not data:
            raise ConnectionError("Conexion cerrada")
        val = int.from_bytes(data, byteorder='big')
        return ShotResult(val)
    
    def recv_exact(self, num_bytes) -> bytes:
        data = b''
        while len(data) < num_bytes:
            chunk = self.sock.recv(num_bytes - len(data))
            if not chunk:
                return b''
            data += chunk
        return data
    
    def close(self):
        self.sock.close()
        