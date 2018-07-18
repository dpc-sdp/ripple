FROM amazeeio/node:8-builder as builder
COPY package.json package-lock.json /app/
COPY packages /app/packages
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
RUN npm install

FROM amazeeio/node:8
COPY --from=builder /app/node_modules /app/node_modules
COPY . /app/

RUN mkdir -p /app/node_modules/.cache && fix-permissions /app/node_modules/.cache

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]
