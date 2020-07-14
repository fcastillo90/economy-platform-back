#######################
## STAGE base ##
#######################

FROM node:12.13.1-alpine3.10 as base

RUN apk update \
  && apk add curl \
  && apk add make \
  && apk add gcc \
  && apk add g++ \
  && apk add git \
  && apk add openssh \
  && apk add python \
  && rm -rf /var/cache/apk/*

WORKDIR /app

COPY ./ /app

RUN npm install

#######################
## STAGE final ##
#######################
FROM base as final

COPY --from=base /app /app
WORKDIR /app

EXPOSE 3000

HEALTHCHECK --interval=12s --timeout=12s --start-period=15s \
  CMD node healthcheck.js

CMD ["npm", "run", "start"]
