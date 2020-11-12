# This is for reference site.
FROM amazeeio/node:10-builder as builder
COPY . /app/

# Remove storybook from reference site
RUN rm /app/src/package.json \
    && yarn install

FROM amazeeio/node:10
COPY --from=builder /app/. /app/

# Add build time env vars
ARG LAGOON_GIT_BRANCH
ENV LAGOON_GIT_BRANCH ${LAGOON_GIT_BRANCH}

ARG CONTENT_API_SERVER
ENV CONTENT_API_SERVER ${CONTENT_API_SERVER}
ARG CONTENT_API_AUTH_PASS
ENV CONTENT_API_AUTH_PASS ${CONTENT_API_AUTH_PASS}
ARG CONTENT_API_AUTH_USER
ENV CONTENT_API_AUTH_USER ${CONTENT_API_AUTH_USER}

ARG SEARCH_HASH
ENV SEARCH_HASH ${SEARCH_HASH}
ARG SEARCH_SERVICE
ENV SEARCH_SERVICE ${SEARCH_SERVICE}
ARG SEARCH_INDEX
ENV SEARCH_INDEX ${SEARCH_INDEX}
ARG SEARCH_URL
ENV SEARCH_URL ${SEARCH_URL}
ARG SEARCH_LOG
ENV SEARCH_LOG ${SEARCH_LOG}
ARG SEARCH_AUTH_USERNAME
ENV SEARCH_AUTH_USERNAME ${SEARCH_AUTH_USERNAME}
ARG SEARCH_AUTH_PASSWORD
ENV SEARCH_AUTH_PASSWORD ${SEARCH_AUTH_PASSWORD}

WORKDIR /app/examples/vic-gov-au/

# force it to load the environment variable during build time. Otherwise it cannot read $LAGOON_GIT_BRANCH.
RUN  . /home/.bashrc \
    && yarn run build --modern=client \
    && chmod -R 755 ~/.config \
    # For JIRA commit script work.
    && if [ $LAGOON_GIT_BRANCH != "production" ] ; then apk --update add curl;  fi

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["./node_modules/.bin/nuxt", "start", "--modern=client"]
