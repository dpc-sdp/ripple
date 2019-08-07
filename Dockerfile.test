FROM singledigital/bay-node-slim

WORKDIR /app
COPY package.json package-lock.json /app/
COPY packages /app/packages
RUN npm ci

COPY . /app/

# TODO: Below server is not required by test. But keep them so we can run test command in this service.
ENV HOST 0.0.0.0
ENV SELF_START=true
ENV BASE_URL=http://localhost:3000
EXPOSE 3000
CMD ["npm", "start"]
