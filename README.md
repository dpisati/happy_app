<h3 align="center">
    <img src="./.github/happy.png" alt="Happy" />
    <br><br>
    <b>Happy, find an orphanage nearby.</b>  
    <br>
</h3>

<p align="center">
  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%237519C1">
  </a>
</p>

# Index

- [About](#about)
- [Functionalities](#functionalities)
- [Technologies](#technologies)
- [Preview Web](#preview-web)
- [Preview Mobile](#preview-mobile)
- [How to use](#how-to-use)
- [How to contribute](#how-to-contribute)

<a id="about"></a>

## :bookmark: About

<strong>Happy</strong> is a web application and mobile to help people find orphanages nearby.

This application was made during the <strong>Next Level Week</strong> promoted by [Rocketseat](https://rocketseat.com.br/). The app was made to help people willing to make a good action, visiting an orphanage to support the community. This app will show orphanages nearby. You can also create your own account and add an orphanage that wasn't listed. This registration will be waiting for the administrator to approve. Once approved, the orphanage will be shown to everyone. While awaiting approval, you can edit the info as much you wish.


<a id="functionalities"></a>

## :fire: Functionalities

- User privileges: admin / user

-Users:
  - [x] View orphanages.
  - [x] Register orphanages.
  - [x] View registered orphanages by user waiting for approval.
  - [x] Update orphanage detail while waiting approval.
  - [x] Delete orphanage while waiting approval.
  - [x] View registered orphanages accepted by user.

-Admin:
  - [x] View orphanages.
  - [x] Register new orphanages.
  - [x] View all registered orphanages waiting for approval.
  - [x] View all registered orphanages accepted.
  - [x] Accept / Deny orphanages registrations.
  - [x] Delete orphanages.

<a id="technologies"></a>

## :rocket: Technologies

The project is made with:

- [ReactJS](https://reactjs.org/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/index.html)
- [Expo](https://expo.io/)
- [TypeORM](https://typeorm.io/#/)
- [Leaflet](https://leafletjs.com/)
- [Mapbox](https://www.mapbox.com/)
- [Multer](https://github.com/expressjs/multer)
- [Yup](https://github.com/jquense/yup)

<a id="preview-web"></a>

## :heavy_check_mark: :computer: Web

<h1 align="center">
    <img alt="Web" src=".github/happy_web.gif" width="900px">
</h1>

<a id="preview-mobile"></a>

## :heavy_check_mark: :iphone: Mobile

<h1 align="center">
    <img alt="Mobile Detail" src=".github/happy_mobile.gif" width="900px">
</h1>

<a id="how-to-use"></a>

## :fire: How to Use

- ### **Dependencies**

  - Is **required** to install **[Node.js](https://nodejs.org/en/)**
  - In order to run scripts and install dependencies you need to install a **package manager** (ie: **[NPM](https://www.npmjs.com/)**).
  - The **mobile** application requires **[Expo](https://expo.io/)**.

  <br>

1. First step, clone this github repository:

```sh
  $ git clone https://github.com/dpisati/happy_app.git
```

2. Run the application:

```sh
  # Install dependencies for each folder: mobile, server, web.
  $ cd mobile
  $ yarn install
  $ cd ../server
  $ yarn install
  $ cd ../web
  $ yarn install

  ## Create the database using TypeORM
  $ cd server
  $ yarn typeorm migration:run

  # Start the API
  $ yarn run dev

  # Start the web application
  $ cd web
  $ yarn start

  # Start the mobile app
  $ cd mobile
  $ yarn start
```

3. Get a token from [Mapbox](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/):

The **web** application requires a **token** from Mapbox. To be able to get one, you have to create an account and create a new token. This token has to be stored inside the `.env` file inside the `web` folder. The key name is: `REACT_APP_MAPBOX_TOKEN`

Example:

File: `happy_app/web/.env`

Content:

```text
REACT_APP_MAPBOX_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

<a id="how-to-contribute"></a>

## :recycle: How to Contribute

- Create a Fork from this repo,
- Create a branch with your feature: `git checkout -b my-feature`
- Commit changes: `git commit -m 'feat: My new feature'`
- Push to your branch: `git push origin my-feature`
