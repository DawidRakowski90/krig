FROM node:22-slim
WORKDIR /app/nameOfTheSerivce
COPY GCRun/nameOfTheSerivce/package*.json ./
RUN npm ci --omit=dev
COPY GCRun/nameOfTheSerivce ./
COPY GCRun/libs ./libs
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server.js"]
