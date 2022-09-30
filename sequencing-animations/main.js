const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

// implementation with callbacks
/*
function animateAlice(alice, callback) {
  alice.animate(aliceTumbling, aliceTiming).onfinish = () => callback();
}

animateAlice(alice1, () => {
  animateAlice(alice2, () => {
    animateAlice(alice3, () => {
    })
  })
})
*/


// implementation with promise chain acting like callbacks
/*
alice1.animate(aliceTumbling, aliceTiming).finished
  .then(() => {
    alice2.animate(aliceTumbling, aliceTiming).finished
      .then(() => {
        alice3.animate(aliceTumbling, aliceTiming);
      })
})
*/


// implementation with a promise chain

alice1.animate(aliceTumbling, aliceTiming).finished
  .then(() => alice2.animate(aliceTumbling, aliceTiming).finished)
  .then(() => alice3.animate(aliceTumbling, aliceTiming))
  .catch((error) => console.error(`Error animating: ${error}`));



// implementation with async and await
/*
async function animateAlice() {
  try {
    await alice1.animate(aliceTumbling, aliceTiming).finished;
    await alice2.animate(aliceTumbling, aliceTiming).finished;
    await alice3.animate(aliceTumbling, aliceTiming).finished;
  }
  catch (error) {
    console.error(`Error animating: ${error}`);
  }
}

animateAlice();
*/