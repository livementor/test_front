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

## Data structure
The data layer is based on Firebase (firestore) you don't need to access the admin panel of firebase. 
You can modify the data structure as long as you prefix your collections by your last name.
For exemple : If I want to modify the users structure I will name the new collection barbier_users


Users collection (users)
```json
{
  "uid": "bmAaBLtmpHYqHDOH875oVsVNbhV2",
  "email": "alex@lm.com",
  "displayName": "Alex Barbier",
  "photoURL": null
}
```
Conversations collection (conversations)
```json
{
  "id": "6Twrq3cISEseYKKB0Qgg",
  "participants": ["7HC4ypqlMgb5o9N5vNmo8kvwGZ02", "bmAaBLtmpHYqHDOH875oVsVNbhV2"],
  "title": "Conversation"
}
```
Message collection ({conversationId}/messages)
```json
{
  "id": "tjtIMr0qi8eEEpSPg6my",
  "author": "bmAaBLtmpHYqHDOH875oVsVNbhV2",
  "text": "Bonjour!!",
  "createdAt: 1607260362155
}
```
# Goal

In this project you have everything you need to build a chat interface.

Start by launching the project and go to localhost:3000 in your navigator. You should log in to create your user and your first conversation (the conversation and some messages are auto generated). 

Now your job is to retrieve list of conversation where you are a participant and show this list. 

When you click on a conversation item you should load in the right part of your window the messages of the selected conversation.

We only expect to be able to visualise the conversations and the messages.
You can add everything you want to show your skills.

For exemple you can add an input to send messages.



