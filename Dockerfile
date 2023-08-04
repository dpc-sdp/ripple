# See https://github.com/dpc-sdp/bay
ARG BAY_IMAGE_VERSION

FROM ghcr.io/dpc-sdp/bay/ripple-node:${BAY_IMAGE_VERSION}

# Custom build time env vars
ARG GIGET_AUTH
# End of custom build time env vars

# Build app
COPY . /app/

RUN . /home/.bashrc \
  && npm ci \
  && npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]