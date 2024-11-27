fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    // Use a default background image/author
    document.body.classList.add("backup");
    document.getElementById("author").textContent = `By: Dodi Achmad`;
  });

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;
    document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `;
  })
  .catch((err) => console.error(err));

function getCurrentTime() {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = new Date();
  const time = (document.getElementById("time").innerHTML = `
    <span>${date.toLocaleTimeString("en-us", { timeStyle: "short" })} - ${date.getDate()} ${months[date.getMonth()].slice(0, 3)}</span>
  `)

}

setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `;
    })
    .catch((err) => console.error(err));
});
let randomAyahNum = Math.floor(Math.random() * 6236);
// QURAN
fetch(`https://api.alquran.cloud/v1/ayah/${randomAyahNum}/ar.alafasy`)
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("quran").innerHTML = `
  <h3 class="quran">"${data.data.text}"</h3>
  `;
    // console.log(document.getElementById("quran").children[0]);
    // document.getElementById("quran").children[0].classList.add("quran");
  })
  // Default AYAH in case of any error occured during fetching
  .catch((err) => {
    document.getElementById("quran").innerHTML = `
  <h4 class='quran'>اعْلَمُوا أَنَّمَا الْحَيَاةُ الدُّنْيَا لَعِبٌ وَلَهْوٌ وَزِينَةٌ وَتَفَاخُرٌ بَيْنَكُمْ وَتَكَاثُرٌ فِي الْأَمْوَالِ وَالْأَوْلَادِ ۖ كَمَثَلِ غَيْثٍ أَعْجَبَ الْكُفَّارَ نَبَاتُهُ ثُمَّ يَهِيجُ فَتَرَاهُ مُصْفَرًّا ثُمَّ يَكُونُ حُطَامًا ۖ وَفِي الْآخِرَةِ عَذَابٌ شَدِيدٌ وَمَغْفِرَةٌ مِّنَ اللَّهِ وَرِضْوَانٌ ۚ وَمَا الْحَيَاةُ الدُّنْيَا إِلَّا مَتَاعُ الْغُرُورِ</h4>`;
  });
// HADITH

const renderHadeeth = async () => {
  const hadeethElement = document.getElementById("hadeeth");
  const hadeethExpElement = document.getElementById("hadeeth-exp");

  try {
    const endPoint = `https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=`;
    const randomHadeeth = Math.floor(Math.random() * (3091 - 2932) + 2932);
    const res = await fetch(`${endPoint}${randomHadeeth}`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    hadeethElement.innerHTML = `${data.hadeeth}<span style="text-decoration:underline; color:yellow">${data.attribution}</span> <span>${data.grade}</span>`;
    hadeethExpElement.innerHTML = `${data.explanation}`;
    console.log(data);
    const listContainer = document.getElementById("words-meanings-list");
    const wordsMeanings = data.words_meanings;

    // Create an unordered list element
    const list = document.createElement("ul");
    list.className = "word-meaning-list";

    // Loop over the words_meanings array and create list items for each word and its meaning
    wordsMeanings.forEach(({ word, meaning }) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${word}: ${meaning}`;
      listItem.className = "word-meaning-item";

      // Append list item to the list
      list.appendChild(listItem);
    });

    // Append the list to the list container in your HTML
    listContainer.appendChild(list);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
renderHadeeth();
// .then((data) => {
//   console.log(data.json());
//   return data.json();
// })
// .catch((err) => {
//   console.log(err);
// });

// FOOTBALL
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "5f067e65c2mshd23753e5fb549d9p1e71bajsn754d4f803e56",
//     "X-RapidAPI-Host": "football98.p.rapidapi.com",
//   },
// };

// fetch("https://football98.p.rapidapi.com/premierleague/results", options)
//   .then((response) => response.json())
//   // .then((response) => console.log(response))
//   // .catch((err) => console.error(err));

// JOKES API ***EXPIRED***
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "5f067e65c2mshd23753e5fb549d9p1e71bajsn754d4f803e56",
//     "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com",
//   },
// };

// fetch("https://dad-jokes.p.rapidapi.com/random/joke", options)
//   .then((response) => response.json())
//   .then((response) => {
//     // console.log(response.body[0]);
//     document.getElementById("jokes").innerHTML = `
//       <div class="jokesCont">
//         <h2>Joke of the day!!</h2>
//         <h5>${response.body[0].setup}</h5>
//         <h4>${response.body[0].punchline}</h4>
//       </div>
//     `;
//   })
//   .catch((err) => console.error(err));
