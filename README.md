# vad kostar bostaden

Information about pantbrev and lagart can be obtained here: https://www.ekonomifokus.se/bostad/juridik/lagfart-och-pantbrev
Apply for lånelöfte and compare banks: consector.se

## how to run?

### for development

#### docker

Install docker.

From the root of the project you should run this:

`docker build -f Dockerfile-dev . -t vad-kostar-bostaden-dev:latest`

To see the live results run:
`docker run -v $(pwd):/app -p 8080:8080 vad-kostar-bostaden-dev:latest`
and navigate to localhost:8080.

#### node/npm

Install node and npm.
from the root of the directory run: npm install && npm run dev

### building it

from the root dir run: `docker build . -t vad-kostar-bostaden`

Then run `docker run -p 8080:80 vad-kostar-bostaden` and navigate to localhost:8080.
