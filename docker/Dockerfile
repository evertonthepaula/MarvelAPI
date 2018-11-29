FROM ubuntu:16.04

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v10.14

# ------------------------------------------------------
# --- usual apt-get steps & install linux packages
RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade \
    && DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y \
    ssh \
    curl \
    openssl \
    openssh-client \
    ca-certificates 

# # ------------------------------------------------------
# # --- install NVM, Node and NPM
# # First replace shell with bash so we can source files
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.7/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && npm install -g npm \
    && npm install -g testcafe

# ------------------------------------------------------
# --- Cleanup and rev num
RUN apt-get autoremove && apt-get autoclean && apt-get clean && rm -rf /var/lib/apt/lists/*
