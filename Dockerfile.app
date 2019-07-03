# This is for reference site.
FROM amazeeio/node:10-builder as builder
COPY . /app/

# Remove storybook from reference site
RUN rm /app/packages/ripple-ui-components/package.json \
    && yarn install

FROM amazeeio/node:10
COPY --from=builder /app/. /app/

ARG LAGOON_GIT_BRANCH
ARG NUXT_HOT_RELOADING
ENV LAGOON_GIT_BRANCH ${LAGOON_GIT_BRANCH}

WORKDIR /app/examples/vic-gov-au/



RUN yarn run build

ENV HOST 0.0.0.0
EXPOSE 3000

#RUN chmod -R 775 ~/.npm
RUN chmod -R 775 ~/.config

CMD ["yarn", "run", "start"]
