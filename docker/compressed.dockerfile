FROM ubuntu:16.04

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v10.14

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade \
    && DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y \
    ssh \
    curl \
    openssl \
    openssh-client \
    ca-certificates \
    && curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.7/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && npm install -g npm \
    && npm install -g testcafe \
    && apt-get autoremove && apt-get autoclean && apt-get clean && rm -rf /var/lib/apt/lists/*