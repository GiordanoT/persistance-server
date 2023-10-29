FROM node:16-alpine

WORKDIR /app
COPY . .

# RUN npm install -g nodemon
# RUN npm install -g ts-node
RUN npm install

EXPOSE 5002

CMD ["npm", "run", "prod"]
