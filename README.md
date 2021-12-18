# vad kostar bostaden

Information about pantbrev and lagart can be obtained here: https://www.ekonomifokus.se/bostad/juridik/lagfart-och-pantbrev
Apply for lånelöfte and compare banks: consector.se

## Translations
Adding translations is done in two steps. First add a json file with country name into app/src/translations. Naming of those files must be the 2 letter abbreviation (e.g. gb for Great Britain). Those abbreviations are matched agains symbols from [flag-icons](https://github.com/lipis/flag-icons). The second step is to change the [languages](app/src/modules/language.ts) module. In that module update the object `languageToCountryMap`. Use the two letter country abbreviation as key and add a new object of `LanguageConfiguration`.

## How to develop this locally?
Starting up a web page locally is just one command away: `npm run dev` (assuming you have nom and nodejs installed). That launches a web server with HMR and is available at port 8080.
Use any browser to surf to `localhost:8080`.

You may also use docker. This requires docker to be installed. Build the container and mount the app directory.
It will result having a website on the same port as above and is reachable by your favorite browser.
From the root of the project you should run this: `docker build -f Dockerfile-dev . -t vad-kostar-bostaden-dev` (this only needs to be done once and/or when adding new dependencies).
Afterwards run `docker run -v $(pwd)/app:/app -p 8080:8080 vad-kostar-bostaden-dev`.

## How to deploy this?
This uses docker to build the page in production mode. The image contains the static page and a nginx webserver.
From the root dir run: `docker build . -t vad-kostar-bostaden`. Afterwards you can start a container by running:
`docker run -p 8080:80 vad-kostar-bostaden` and navigate to `localhost:8080`.
