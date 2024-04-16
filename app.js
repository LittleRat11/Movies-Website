// *Menu Toggle
document.querySelector("#menu-toggle").addEventListener('click', () => {
        document.querySelector("#nav-menu").classList.toggle("nav-active");
    })
    // console.log(window.scrollY);
window.addEventListener("scroll", () => {
    if (window.scrollY >= 300 && window.scrollY < 500) {
        document.querySelector("header").style.backgroundColor = "#f4f4f4";
        // document.querySelector(".scroll-top").style.bottom = "20px"
    } else if (window.scrollY >= 500) {
        document.querySelector("header").style.backgroundColor = "#008DDA";
        document.querySelector(".scroll-top").style.bottom = "20px"
    } else {
        document.querySelector("header").style.backgroundColor = "#ffd900"
        document.querySelector(".scroll-top").style.bottom = "-100px"
    }
})
document.querySelector(".scroll-top").addEventListener("click", () => {
        window.scroll({
            top: 100,
            left: 100,
            behavior: 'smooth'
        });
    })
    // *setting toggle
document.querySelector("#setting-toggle").addEventListener("click", () => {
    document.querySelector(".setting-box").classList.toggle("setting-box-active");
})
let images = document.querySelectorAll(".setting-box img");
images.forEach((img) => {
        img.addEventListener('click', () => {
            images.forEach((image) => {
                image.style.opacity = "1";
            })
            document.querySelector(".landing-img").src = img.src;
            img.style.opacity = '0.5';

        })
    })
    // *dark mode toggle
const toggleBtn = document.querySelector('#toggle-btn');
const toggleIcon = document.querySelector("#toggle-icon");
let darkmode = localStorage.getItem("darkmode");;
toggleBtn.addEventListener("click", darkModeToggle);

if (darkmode === "enabled") {
    darkmodeOn();
}

function darkModeToggle() {
    darkmode = localStorage.getItem("darkmode");
    if (darkmode === "enabled") {
        darkmodeOff();
    } else {
        darkmodeOn();
    }
}

function darkmodeOn() {
    document.body.classList.add("dark");
    darkmode = true;
    localStorage.setItem("darkmode", "enabled");
    toggleIcon.className = "bx bx-moon";
}

function darkmodeOff() {
    document.body.classList.remove("dark");
    darkmode = false;
    localStorage.setItem("darkmode", "null");
    toggleIcon.className = "bx bx-sun";
}

// *Fetch Movie
const url = {
    apiKey: "api_key=12f6d299c541f8a377272b194dd76aaa",
    baseUrl: "https://api.themoviedb.org/3/discover/movie?"
}
const imgUrl = "https://image.tmdb.org/t/p/w500";
const popularUrl = url.baseUrl + "sort_by=popularity.desc&" + url.apiKey;
// console.log(popularUrl);
const searchUrl = "https://api.themoviedb.org/3/search/movie?" + url.apiKey;
fetchMovie(popularUrl)

function fetchMovie(path) {
    fetch(path)
        .then((result) => result.json())
        .then((data) => showMovie(data))
}

function showMovie(data) {
    // console.log(data.results[0])
    let result = data.results;
    document.querySelector(".movie-container").innerHTML = "";
    result.forEach((movie) => {
        // console.log(movie.original_title);
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
         
                    <div class="img-box">
                        <img src="${imgUrl+movie.poster_path}" alt="">
                    </div>
                    <div class="details">
                        <h3>${movie.original_title}</h3>
                        <span>${movie.vote_average.toFixed(1)}</span>
                    </div>
                    <div class="overview">
                        <h5>Overview</h5>
                        <p>
                            ${movie.overview}
                        </p>
                        <p>
                            Publish at <strong>${movie.release_date}</strong>
                        </p>
                    </div>
        `;
        document.querySelector(".movie-container").appendChild(div);
    })
}

// *search movie
document.querySelector("#search").addEventListener("keypress", (event) => {
    // console.log(event.keyCode);
    if (event.keyCode === 13) {
        let value = event.target.value;
        if (value) {
            fetchMovie(searchUrl + "&query=" + value);
        } else {
            fetchMovie(popularUrl);
        }
    }
})

// *load
window.addEventListener("load", () => {
    document.querySelector(".loader").style.display = "none";

})