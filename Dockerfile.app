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
ARG CONTENT_API_AUTH_PASS
ARG CONTENT_API_AUTH_USER
ENV CONTENT_API_AUTH_PASS ${CONTENT_API_AUTH_PASS}
ENV CONTENT_API_AUTH_USER ${CONTENT_API_AUTH_USER}

WORKDIR /app/examples/vic-gov-au/

# force it to load the environment variable during build time. Otherwise it cannot read $LAGOON_GIT_BRANCH.
RUN  . /home/.bashrc \
    && yarn run build \
    && chmod -R 755 ~/.config \
    # For JIRA commit script work.
    && if [ $LAGOON_GIT_BRANCH != "production" ] ; then apk --update add curl;  fi

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "run", "start"]
