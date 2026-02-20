import pyaudio

class AudioConfig:
    def __init__(self):
        self.format = pyaudio.paInt8
        self.channels = 1
        self.rate = 44100
        self.frames_to_record = 65000
        self.frame_size = 1

    def total_bytes(self):
        return self.frames_to_record * self.frame_size
    
class AudioRecorder:
    def __init__(self, config):
        self.config = config
        self.audio_interface = pyaudio.PyAudio()

    def record_audio(self):
        stream = self.audio_interface.open(
            format=self.config.format,
            channels=self.config.channels,
            rate=self.config.rate,
            input=True,
            frames_per_buffer=self.config.frames_to_record
        )

        buffer = stream.read(self.config.frames_to_record)

        stream.stop_stream()
        stream.close()

        return buffer, self.config.frames_to_record
    
    def close(self):
        self.audio_interface.terminate()

class AudioPlayer:
    def __init__(self, config):
        self.config = config
        self.audio_interface = pyaudio.PyAudio()

    def play_audio(self, buffer):
        stream = self.audio_interface.open(
            format=self.config.format,
            channels=self.config.channels,
            rate=self.config.rate,
            output=True
        )

        stream.write(buffer)

        stream.stop_stream()
        stream.close()

    def close(self):
        self.audio_interface.terminate()