# test-lm-1

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Docker

You can also use [docker](https://www.docker.com/) with [docker-sync](http://docker-sync.io/) to run this project 

```bash
$ docker-compose build
$ docker-sync-stack start
```
# Goal

In this project you have everything you need to build a chat interface.

Start by launching the project and go to localhost:3000 in your navigator. You should log in to create your user and your first conversation (the conversation and some messages are auto generated). 

Now your job is to retrieve list of conversation where you are a participant and show this list. 

When you click on a conversation item you should load in the right part of your window the messages of the selected conversation.

