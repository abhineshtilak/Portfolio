// Countdown timer
const launchDate = new Date("Dec 31, 2025 23:59:59").getTime();

const timer = setInterval(function () {
  const now = new Date().getTime();
  const distance = launchDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  if (distance < 0) {
    clearInterval(timer);
    document.querySelector(".countdown").innerHTML = "<h2>We are Live! 🚀</h2>";
  }
}, 1000);

// Fake form submission
document.querySelector(".subscribe").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thanks! You'll be notified when we launch.");
});
