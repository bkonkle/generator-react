FROM node:10-alpine

ENV NODE_ENV=production

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64 /usr/local/bin/dumb-init

RUN apk update && \
    addgroup -S app && \
    adduser -S -g app app && \
    rm -rf /var/cache/apk/* && \
    \
    # dumb-init \
    chmod +x /usr/local/bin/dumb-init && \
    \
    # Permissions \
    mkdir -p /usr/app/build && \
    chown -R app:root /usr/app && \
    chmod -R 0700 /usr/app

USER app

WORKDIR /usr/app

COPY --chown=app:root . /usr/app

RUN yarn config set registry https://registry.npmjs.org && \
    yarn --frozen-lockfile --production=false && \
    \
    # Build both apps \
    NODE_OPTIONS=--max_old_space_size=1024 yarn build && \
    \
    # Clean out dev dependencies \
    yarn --frozen-lockfile --production --prefer-offline && yarn cache clean

EXPOSE $PORT

ENTRYPOINT ["dumb-init", "--"]

CMD ["sh", "-c", "yarn run"]
