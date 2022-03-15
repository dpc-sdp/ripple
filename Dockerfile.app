# This is for reference site.
ARG BAY_IMAGE_VERSION

FROM singledigital/ripple-node:${BAY_IMAGE_VERSION}

# Custom build time env vars
# ARG MY_CUSTOM_VAR
# End of custom build time env vars

# Build app
COPY . /app/

# Remove storybook from reference site
RUN rm /app/src/package.json \
    && yarn install

WORKDIR /app/examples/reference/

RUN . /home/.bashrc \
    && yarn run build --modern=client

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["./node_modules/.bin/nuxt", "start", "--modern=client"]
