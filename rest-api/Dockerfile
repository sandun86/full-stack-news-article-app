FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

COPY .env .env.development ./

RUN npm run build

EXPOSE 3004

CMD [ "npm", "run" , "start:prod" ]