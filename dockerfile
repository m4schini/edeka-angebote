FROM node:current 
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
RUN cd server && npm install --production
CMD [ "npm", "run", "serve" ]