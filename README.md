# nuxt-firebase-prac
This is [Nuxt.js](https://nuxtjs.org/) with [Firebase](https://firebase.google.com/) practice.

## Nuxt.js Development Setup
``` bash
$ npm install -g vue-cli
$ vue init nuxt-community/starter-template nuxt-firebase-prac
$ cd nuxt-firebase-prac
```

## Firebase Development Setup
``` bash
$ npm install -g firebase-tools
$ firebase login
$ firebase init
# choose authentication, database, storage, hosting, functions
$ ? What do you want to use as your public directory? -> dist
```

## Git Development Setup
``` bash
$ git init
# add firebase config files in .gitignore for secure.
$ vi .gitignore
> .firebase
> .firebaserc
> database.rules.json
> firebase.json
> firestore.indexes.json
> firestore.rules
> storage.rules
```
and add ignore files for the project.

FYI
[Nuxt.js](https://github.com/vuetifyjs/nuxt/blob/master/template/.gitignore),
[firebase-tools](https://github.com/firebase/firebase-tools/blob/master/.gitignore)

## Nuxt.js project Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# cf. generate static project
$ npm run generate
```
For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Firebase Deploy

``` bash
$ firebase deploy
```
