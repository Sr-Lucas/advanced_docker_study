# Network

## Comandos:

No Docker, existem vários comandos disponíveis para lidar com redes.

1. **docker network create [OPTIONS] NETWORK**: Cria uma nova rede no Docker. É possível especificar opções como o driver de rede, o tipo de rede e outras configurações.

2. **docker network ls**: Lista todas as redes disponíveis no Docker, exibindo informações como o nome da rede, o ID e o driver utilizado.

3. **docker network inspect NETWORK**: Fornece informações detalhadas sobre uma rede específica, incluindo seus contêineres associados, configurações de IP, opções de driver e muito mais.

4. **docker network connect NETWORK CONTAINER**: Conecta um contêiner existente a uma rede específica. Isso permite que o contêiner se comunique com outros contêineres nessa rede.

5. **docker network disconnect NETWORK CONTAINER**: Desconecta um contêiner de uma rede específica. O contêiner perde a capacidade de se comunicar com outros contêineres nessa rede.

6. **docker network rm NETWORK**: Remove uma rede específica do Docker. Certifique-se de que nenhum contêiner esteja conectado a essa rede antes de removê-la.

Esses são apenas alguns dos comandos básicos para operações com redes no Docker.

## Drivers:

### bridge
A rede "bridge" é a configuração padrão no Docker, que estabelece uma ponte através das portas, conectando um aplicativo na rede interna do contêiner à rede do host, por meio do mapeamento de uma porta do host para uma porta no contêiner.

### host
Na configuração de rede "host", o contêiner está diretamente na rede do host e utiliza as portas da rede do host, eliminando assim a necessidade de mapeamento de portas.

### overlay
A rede "overlay" é utilizada para permitir que contêineres se comuniquem entre si, mesmo estando em máquinas diferentes. Essa configuração é especialmente útil em ambientes distribuídos, onde os contêineres precisam se comunicar por meio de uma rede virtualizada que abrange várias máquinas físicas.


### null
A rede "null" é uma configuração especial no Docker que cria uma interface de rede vazia para um contêiner. Essa rede é útil em cenários em que o contêiner não precisa se comunicar com nenhuma rede externa ou quando o objetivo é isolar completamente o tráfego de rede do contêiner.

### MACVLAN
A rede "MACVLAN" é uma opção avançada no Docker que permite a criação de múltiplas interfaces de rede virtuais para um contêiner, cada uma com seu próprio endereço MAC. Isso possibilita que o contêiner se comporte como se estivesse conectado diretamente à rede física, com seu próprio endereço IP e capacidade de comunicação direta com outros dispositivos na rede. Essa configuração é útil em casos em que é necessário ter uma separação mais granular do tráfego de rede entre contêineres e dispositivos físicos.