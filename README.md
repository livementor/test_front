# test Front Livementor

LiveMentor a connu une croissance très rapide lors de l’année 2020 (x2, en étant rentables toute l’année).
Cette croissance, nous ne voulons pas l’avoir si elle se traduit par une baisse de la qualité. 
Notre conviction est que la qualité du produit dépend de la qualité des personnes, qui dépend elle-même du temps qu’on peut leur consacrer dans la formation, sur leur job, en faisant avec eux. 
C’est jouable si l’équilibre entre les personnes capables de former et celles à former est maintenu. D’où notre investissement sur des tests techniques de ce type. La croissance rapide consiste à former les personnes à l’échelle. 
C’est pour cela que le système lean est clef pour nous, car il s’agit d’un système de formation.

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

# Project structure 

This project is build with [vue.js](https://vuejs.org/) and [nuxt.js](https://nuxtjs.org/)

We voluntarily mix typescript and javascript in this project to allow you to use whichever language you prefer. 

The store is already structured but you can modify it however you want.

The stylesheet from [mikado](https://livementor.github.io/mikado/) is already imported you can use it or use something else. 

# Goal

In this project you have everything you need to build a chat interface. _Don't spend more than three hours on this._ 

Start by launching the project and go to localhost:3000 in your navigator. You should log in to create your user and your first conversation (the conversation and some messages are auto generated). 

Now your job is to retrieve list of conversations where you are a participant and show this list. 

When you click on a conversation item you should load in the right part of your window the messages of the selected conversation.

We only expect to be able to visualise the conversations and the messages.
You can add everything you want to show your skills.

For exemple you can add an input to send messages.

Here is an example of what you can create : 
![Sample](https://github.com/livementor/test_front/blob/main/Sample%20screen/Screenshot%202020-12-06%20at%2014.57.43.png)

# Delivery

Create a new branch named "your_name"\_test on this repository

When you are done, just create a pull request and ask for a review. 




