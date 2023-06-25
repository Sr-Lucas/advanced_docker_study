# Docker Multistage building

No Docker, o Multistage building permite realizar o processo de build em etapas, utilizando uma imagem que contém todos os recursos necessários para a instalação dos componentes necessários para a aplicação funcionar e, em seguida, trocar para uma imagem mais enxuta e otimizada para produção, aproveitando o que foi criado na imagem anterior.

Esse método é extremamente útil para reduzir o tamanho final da imagem e melhorar o desempenho da aplicação, eliminando a necessidade de incluir ferramentas e dependências de desenvolvimento na imagem final.

Um exemplo prático de Multistage building pode ser encontrado no arquivo "Dockerfile.prod" do projeto Laravel. Nesse arquivo, são definidas as etapas do processo de build, começando com uma imagem base que contém todas as dependências necessárias para compilar e executar a aplicação. Em seguida, são realizadas as etapas de compilação, instalação de dependências e configurações específicas.

Ao final da primeira etapa, onde são realizadas todas as operações necessárias para gerar os artefatos da aplicação, é possível copiar esses artefatos para uma nova imagem, que é mais otimizada para produção, possui menos recursos e não inclui ferramentas de desenvolvimento desnecessárias.

Essa abordagem de Multistage building proporciona um processo de build mais eficiente e resulta em imagens Docker menores e mais adequadas para serem implantadas em ambientes de produção.


Um exemplo:

```Dockerfile
# Primeira etapa: Construção da aplicação
FROM composer:2.1 as builder

WORKDIR /app

COPY . /app

# Instalação das dependências do projeto
RUN composer install --no-dev --no-scripts --optimize-autoloader

# Geração dos arquivos otimizados da aplicação
RUN php artisan optimize

# Segunda etapa: Imagem final para produção
FROM php:7.4-fpm-alpine

WORKDIR /var/www/html

# Copia apenas os arquivos necessários da primeira etapa
COPY --from=builder /app /var/www/html

# Instalação das dependências necessárias para a execução da aplicação
RUN docker-php-ext-install pdo pdo_mysql

# Configurações adicionais para a aplicação em produção
RUN php artisan config:cache

# Define o usuário para o processo do PHP-FPM
USER www-data

# Expõe a porta 9000 para o serviço do PHP-FPM
EXPOSE 9000

# Comando para iniciar o serviço do PHP-FPM
CMD ["php-fpm"]
```

Nesse exemplo, a primeira etapa utiliza uma imagem "composer:2.1" como base, onde são copiados os arquivos do projeto Laravel. Em seguida, são executadas as etapas de instalação das dependências do projeto e geração dos arquivos otimizados.

Na segunda etapa, é utilizada a imagem "php:7.4-fpm-alpine" como base, que é uma imagem mais enxuta e otimizada para produção. Apenas os arquivos necessários da primeira etapa são copiados para a nova imagem. Em seguida, são realizadas as instalações adicionais necessárias para a execução da aplicação, como as extensões do PHP e a configuração do cache de configuração.

Por fim, é definido o usuário "www-data" para o processo do PHP-FPM e é exposta a porta 9000, que é a porta padrão para o serviço do PHP-FPM. O comando "CMD" é utilizado para iniciar o serviço do PHP-FPM ao executar o contêiner.

Dessa forma, é possível realizar um processo de build em duas etapas, aproveitando as otimizações e reduzindo o tamanho final da imagem, tornando-a adequada para ambientes de produção.
