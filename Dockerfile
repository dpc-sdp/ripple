FROM amazeeio/node:8-builder as builder

COPY .npmrc .npmrc
COPY . /app
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
RUN npm install
RUN npm run build-storybook

FROM amazeeio/node:8
COPY --from=builder /app/public /app
COPY scripts/jira-post-comment.sh /app/scripts/jira-post-comment.sh

RUN npm install http-server -g

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["http-server", "-p", "3000"]
