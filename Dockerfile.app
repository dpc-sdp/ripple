# This is for reference site.
FROM amazeeio/node:10-builder as builder
COPY . /app/

# Remove storybook from reference site
RUN rm /app/src/package.json \
    && mv /app/scripts/jira-post-comment-app.sh /app/scripts/jira-post-comment.sh \
    && yarn install

FROM amazeeio/node:10
COPY --from=builder /app/. /app/

ARG LAGOON_GIT_BRANCH
ENV LAGOON_GIT_BRANCH ${LAGOON_GIT_BRANCH}

WORKDIR /app/examples/vic-gov-au/
RUN yarn run build \
    && chmod -R 755 ~/.config \
    # force it to load the environment variable during build time. Otherwise it cannot read $LAGOON_GIT_BRANCH.
    && . /home/.bashrc \
    # For JIRA commit script work.
    && if [ $LAGOON_GIT_BRANCH != "production" ] ; then apk --update add curl;  fi

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "run", "start"]
