FROM node:18

RUN npm i -g serve

WORKDIR /usr/src/frontend

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

RUN npm run build
CMD ["serve",  "-s", "build", "-l", "3000"]