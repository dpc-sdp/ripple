FROM amazeeio/node:8-builder as builder
COPY package.json package-lock.json /app/
COPY packages /app/packages
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
RUN npm install

FROM amazeeio/node:8
COPY --from=builder /app/node_modules /app/node_modules
COPY . /app/

ARG LAGOON_GIT_BRANCH
ENV LAGOON_GIT_BRANCH ${LAGOON_GIT_BRANCH}

RUN mkdir -p /app/node_modules/.cache && fix-permissions /app/node_modules/.cache \
    && . /home/.bashrc \
    && npm run install-curl


ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]
