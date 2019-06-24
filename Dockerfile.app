FROM amazeeio/node:10-builder as builder

COPY .npmrc .npmrc
COPY package.json package-lock.json /app/
COPY package.json /app/
COPY modules /app/modules
RUN npm install

FROM amazeeio/node:10
COPY --from=builder /app/node_modules /app/node_modules
COPY . /app/

ARG LAGOON_GIT_BRANCH
ARG NUXT_HOT_RELOADING
ENV LAGOON_GIT_BRANCH ${LAGOON_GIT_BRANCH} 

RUN . /home/.bashrc \
    && npm run install-curl \
    && npm run build \
    && npm prune 
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
ENV SELF_START true

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]