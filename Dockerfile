FROM node:latest
RUN git clone https://github.com/CookingQuest/app.git /repo
WORKDIR /repo
RUN yarn && yarn run build
RUN mv /repo/dist /dist && rm -rf /repo
CMD ["cp", "-a", "/dist/.", "/app/"]  