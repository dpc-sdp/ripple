FROM amazeeio/node:10-builder as builder

COPY . /app
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
RUN npm cache clean --force \
    && npm ci \ 
    && npm run build-storybook

FROM amazeeio/node:10
COPY --from=builder /app/public /app
COPY scripts/jira-post-comment.sh /app/scripts/jira-post-comment.sh

ARG LAGOON_GIT_BRANCH
ENV LAGOON_GIT_BRANCH ${LAGOON_GIT_BRANCH}

RUN npm config set unsafe-perm true \ 
    && npm install http-server -g \
    && . /home/.bashrc \
    && if [ $LAGOON_GIT_BRANCH != "production" ] ; then apk --update add curl;  fi

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["http-server", "-p", "3000"]
