import sys

class Configuration:
    def __init__(self, arguments):
        self.arguments = arguments

    def valid_length(self):
        if len(self.arguments) >= 3:
            return True
        return False
    
    def get_mode(self):
        return self.arguments[1]
    
    def get_port(self):
        return self.arguments[2]
    
class Application:
    def __init__(self, mode, port):
        self.mode = mode
        self.port = port

    def run(self):
        if self.mode == "server":
            self.start_server()
        else:
            if self.mode == "client":
                self.start_client()

    def start_server(self):
        print("Server mode starting on port", self.port)

    def start_client(self):
        print("Client mode starting on port", self.port)

def main():
    validator = Configuration(sys.argv)

    if validator.valid_length():
        mode = validator.get_mode()
        port = validator.get_port()
        app = Application(mode, port)
        app.run()
    else:
        print("Usage: walkie_talkie.py <mode> <port>")

if __name__ == "__main__":
    main()