import socket

class UdpClient:
    def __init__(self, port, audio_config, audio_recorder):
        self.port = port
        self.config = audio_config
        self.recorder = audio_recorder
        self.socket_connection = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    def start_transmission(self):
        while True:
            server_ip = input("Enter server IP address (or 'exit' to stop): ")
            if server_ip == "exit":
                break
            
            buffer, frames = self.recorder.record_audio()
            bytes_to_send = frames * self.config.frame_size
            
            self.socket_connection.sendto(buffer[:bytes_to_send], (server_ip, self.port))

class UdpServer:
    def __init__(self, port, audio_config, audio_player):
        self.port = port
        self.config = audio_config
        self.player = audio_player
        self.socket_connection = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.socket_connection.bind(("0.0.0.0", self.port))

    def start_listening(self):
        while True:
            data, client_address = self.socket_connection.recvfrom(65535)
            received_buffer_size = len(data)
            frames_to_play = int(received_buffer_size / self.config.frame_size)
            
            self.player.play_audio(data)  