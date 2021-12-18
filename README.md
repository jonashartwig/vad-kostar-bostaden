# vad kostar bostaden

Information about pantbrev and lagart can be obtained here: https://www.ekonomifokus.se/bostad/juridik/lagfart-och-pantbrev
Apply for lånelöfte and compare banks: consector.se

## Translations
Adding translations is done in two steps. First add a json file with country name into app/src/translations. Naming of those files must be the 2 letter abbreviation (e.g. gb for Great Britain). Those abbreviations are matched agains symbols from [flag-icons](https://github.com/lipis/flag-icons). The second step is to change the [languages](app/src/modules/language.ts) module. In that module update the object `languageToCountryMap`. Use the two letter country abbreviation as key and add a new object of `LanguageConfiguration`.

## how to run?

### for development

#### docker

Install docker.

From the root of the project you should run this:

`docker build -f Dockerfile-dev . -t vad-kostar-bostaden-dev`

To see the live results run:
`docker run -v $(pwd)/app:/app -p 8080:8080 vad-kostar-bostaden-dev`
and navigate to localhost:8080.

#### node/npm

Install node and npm.
from the root of the directory run: npm install && npm run dev

### building it

from the root dir run: `docker build . -t vad-kostar-bostaden`

Then run `docker run -p 8080:80 vad-kostar-bostaden` and navigate to localhost:8080.
