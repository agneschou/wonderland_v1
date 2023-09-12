FROM node:lts-alpine as build

COPY ./source_dir /source_dir
WORKDIR /source_dir/

ARG ENV
ENV NEXT_PUBLIC_ENV=${ENV}

RUN npm config set cache /path/to/cache --global
RUN npm install --prefer-offline
RUN npm run build

EXPOSE 3000