FROM node:10-alpine

ENV NODE_ENV=production
ENV PORT=4000

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64 /usr/local/bin/dumb-init

RUN apk update && \
    apk add postgresql-client && \
    addgroup -S app && \
    adduser -S -g app app && \
    rm -rf /var/cache/apk/* && \
    \
    # dumb-init \
    chmod +x /usr/local/bin/dumb-init && \
    \
    # Permissions \
    mkdir -p /usr/app/packages/core && \
    chown -R app:root /usr/app && \
    chmod -R 0700 /usr/app

USER app

WORKDIR /usr/app

COPY --chown=app:root . /usr/app

RUN yarn config set registry https://registry.npmjs.org && \
    yarn --frozen-lockfile --production && \
    yarn cache clean

EXPOSE $PORT

ENTRYPOINT ["dumb-init", "--"]

CMD ["sh", "-c", "yarn start"]
