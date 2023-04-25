# Personalized Home Automation Preferences Console

This is a webpage built on React and Next.js and is to be used by a user to see and update their individual preferences, any shared preferences and any requests for shared preferences

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Tools Required

This console works along with the Personalized Home Automation API and both requires Node installed on the machine to run in development

* [Node.js Installation](https://nodejs.org/en/download)

Install Node and run to set up the environment. 

You will also need a running instance of Personalized Home Automation API.

* [Personalized Home Automation API](https://github.com/renjiniravath/personalized-home-automation-api)

## Environmental Variables

The environmental variables used by the app is listed in the [.env](.env) file. Currently, the API url is the only environmental variable used. Replace this env to the url route where the API is hosted.

## Running Development

First, run the development server:

```bash
cd personalized-home-automation-preferences-console
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Signing in

Enter the username and click on Login to enter the app. The user should be authorized to proceed. Contact the administrators to get access.

## Features

* View or update individual preferences
* View the preferences the user shares with other users
* Create requests to add or update a set of preferences shared between the user and other users
* View the requests that the user is directly involved in
* Accept or update incoming requests

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
