FROM node:16
WORKDIR /srv/backend

COPY package.json /srv/backend
RUN yarn install

COPY . /srv/backend

EXPOSE 4000
CMD ["yarn", "start"]