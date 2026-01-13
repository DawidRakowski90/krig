FROM node:22-slim
WORKDIR /app/test3
COPY GCRun/test3/package*.json ./
RUN npm ci --omit=dev
COPY GCRun/test3 ./
COPY GCRun/libs ./libs
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server.js"]
