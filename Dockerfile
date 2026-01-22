############################################
### APP BUILD STAGE
############################################
FROM node:24-alpine AS appbuild

RUN apk --no-cache add \
    python3 \
    make \
    g++ \
    gcc \
    libc-dev \
    bsd-compat-headers \
    bash \
    lz4-dev \
    zlib-dev \
    cyrus-sasl-dev \
    openssl-dev

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Build app
COPY eslint.config.mjs tsconfig.json ./
COPY src ./src
RUN npm run build

RUN npm prune --production

############################################
### IMAGE BUILD STAGE
############################################
FROM node:24-alpine

RUN apk --no-cache add \
    curl \
    vim \
    libstdc++ \
    libgcc \
    lz4-libs \
    zlib \
    cyrus-sasl \
    openssl

# Create app directory
WORKDIR /usr/src/app

# Copia as dependências (incluindo os binários compilados no stage anterior)
COPY --from=appbuild /usr/src/app/node_modules ./node_modules
COPY --from=appbuild /usr/src/app/dist ./dist
COPY package.json ./
COPY config ./config

EXPOSE 3000

CMD [ "node", "dist" ]
