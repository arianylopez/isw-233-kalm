# Proyectos de Comunicación por Sockets: UDP y TCP

Este repositorio contiene dos aplicaciones de red desarrolladas en Python que demuestran la implementación práctica de los protocolos de transporte UDP y TCP mediante el uso de sockets. El proyecto está dividido en dos tareas principales: una aplicación de transmisión de audio (Walkie-Talkie) y un juego de Batalla Naval multijugador en terminal.

## 📂 Estructura de Carpetas

La estructura del proyecto se organiza en dos directorios principales, cada uno con su respectivo módulo de ejecución e interfaces de red:

```
isw-233-kalm-hw1-udp-tcp/
├── Tarea 1/
│   ├── audio_config.py      # Configuración y manejo de la interfaz de audio usando PyAudio
│   ├── network_handler.py   # Implementación de la comunicación UDP (UdpClient y UdpServer)
│   └── walkie_talkie.py     # Archivo principal de ejecución para la Tarea 1
└── Tarea 2/
    ├── agent.py             # Lógica central del juego, control de turnos y renderizado
    ├── enums.py             # Enumeradores para los estados del tablero y resultados de tiro
    ├── field.py             # Lógica del tablero de 8x8 y generación aleatoria de barcos
    ├── main.py              # Archivo principal de inicialización de servidor o cliente TCP
    ├── network.py           # Envoltorio personalizado (GameSocket) para la transmisión de datos
    ├── utils.py             # Herramientas de conversión de coordenadas (Ej. A1 -> Point(0, 0))
    └── Dockerfile           # Configuración para el despliegue de la aplicación en contenedores
```
### Tarea 1: Aplicación Walkie-Talkie (Protocolo UDP)

**Introducción**

La primera tarea consiste en una aplicación de transmisión de voz unidireccional por turnos, simulando el comportamiento de un Walkie-Talkie tradicional. Utiliza la librería pyaudio para capturar y reproducir el sonido del micrófono en tiempo real.

**Cómo se realiza la conexión**

Para esta aplicación, se eligió el protocolo UDP (socket.SOCK_DGRAM), el cual es ideal para la transmisión de medios en tiempo real.

**- Servidor (UdpServer):** Se vincula al host 0.0.0.0 y al puerto especificado, manteniéndose a la escucha de datagramas entrantes. Cuando recibe un paquete de audio, calcula los frames basándose en el tamaño del búfer y reproduce el sonido inmediatamente.

**- Cliente (UdpClient):** Captura fragmentos de audio de 65000 frames (utilizando un formato de 8-bits y un canal a 44100 Hz) y los envía como datagramas a la dirección IP y puerto del servidor destino.

**Uso**

El script requiere especificar el modo de ejecución y el puerto.

**Para iniciar el servidor (receptor)**

```
python "Tarea 1/walkie_talkie.py" server <puerto>
```

**Para iniciar el cliente (emisor)**

```
python "Tarea 1/walkie_talkie.py" client <puerto>
```

### Tarea 2: Battleship (Protocolo TCP)

**Introducción**

La segunda tarea es una implementación del clásico juego de Batalla Naval (Seabattle) jugable a través de la red directamente en la terminal. Cada jugador cuenta con un tablero de 8x8 donde se despliegan automáticamente flotas de barcos generadas a partir de una semilla (seed). El juego alterna turnos entre los jugadores hasta que uno hunde toda la flota del oponente.

**Cómo se realiza la conexión**

Dado que la precisión y el orden de los datos son críticos para mantener la sincronización del estado del juego en ambos lados, se emplea el protocolo TCP (socket.SOCK_STREAM).

La comunicación se maneja a través de una clase especializada GameSocket que define un protocolo de tamaño fijo para evitar desincronizaciones:

**1. Envío de movimientos:** Las coordenadas se envían codificadas en UTF-8 utilizando exactamente 2 bytes (por ejemplo, "B5").

**2. Envío de resultados:** El oponente procesa el disparo en su tablero y responde con el resultado del impacto (Fallo, Acertó, Hundido). Este resultado se envía serializado como un número entero de 1 byte.

**3. Persistencia:** El servidor acepta una única conexión entrante (listen(1)) y mantiene el socket abierto durante toda la partida para la transmisión continua y bidireccional de datos.

**Uso**

El proyecto está preparado para ejecutarse localmente usando Python o a través de un contenedor gracias al Dockerfile basado en python:3.9-slim que se encuentra en la carpeta del proyecto.

**Para iniciar el servidor (Jugador 2)**

```
python "Tarea 2/main.py" <semilla> <puerto>
```

**Para iniciar el cliente (Jugador 1)**

```
python "Tarea 2/main.py" <semilla> <ip_servidor> <puerto>
```

Durante el juego, se debe introducir los movimientos usando el formato de letra y número indicado por el conversor (por ejemplo, A1, D4, H8).
