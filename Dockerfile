FROM node:16-alpine

WORKDIR /app
COPY ./dist .

EXPOSE 5002

CMD ["node", "main.bundle.js"]
