# vad kostar huset

Information about pantbrev and lagart can be obtained here: https://www.ekonomifokus.se/bostad/juridik/lagfart-och-pantbrev
Apply for lånelöfte and compare banks: consector.se

## how to run?

### docker

Install docker.
From the root of the project you should run this:

docker build . -t svelte-app
docker run -v $(pwd):/app -p 8080:8080 svelte-app:latest

### node/npm

Install node and npm.
from the root of the directory run: npm install && npm run dev


## fees:


<p class="card-text">
  Lagfart is a fee required to pay to register you as the new owner. Lagfart is 1,5% of the estate price. The money goes to lantmäteriet.
  You need to apply for lagfart within 3 months of the purchase. An administrative fee is required of 825 kr.
</p>


  <p>
    Pantbrev is an insurance for your bank on the value of the estate. It is paid to lantmäteriet. It is 2% of the loan minus existing pantbrev.
    In addition an administration fee of 375 kr is taken.
    The pantbrev for your estate will be: { pantbrev(state.getLoan(), state.pantbrev) }
  </p>
