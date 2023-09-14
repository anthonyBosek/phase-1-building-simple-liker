// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";
const hearts = document.querySelectorAll("footer > ul > li > span");
const modal = document.querySelector("div#modal");
const modalMessage = document.querySelector("div#modal > p#modal-message");

// add eventListener to each heart node
[...hearts].forEach((heart) =>
  heart.addEventListener("click", (e) => {
    e.preventDefault();
    mimicServerCall()
      .then(() => {
        let isliked = heart.textContent === FULL_HEART; // checks if heart is liked
        heart.classList.toggle("activated-heart");
        heart.textContent = isliked ? EMPTY_HEART : FULL_HEART;
      })
      .catch((err) => {
        modal.classList.toggle("hidden");
        modalMessage.textContent = err;
        setTimeout(() => {
          modal.classList.toggle("hidden");
          modalMessage.textContent = "";
        }, 3000);
      });
  })
);

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
