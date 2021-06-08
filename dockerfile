FROM node:lts 
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
RUN cd server && npm install --production
COPY . .
CMD [ "npm", "run", "serve", ]