export async function movieDetail(movieId) {
  try {
    // JSON 데이터 가져오기
    const res = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=8e5fae38`);

    // 가져오지 못한 경우 에러
    if (!res.ok) {
      throw new Error(res.status);
    }

    // 데이터 받아옴
    const data = await res.json();

    // movie-title 데이터 출력
    const movieTitle = document.querySelector(".movie-title");
    movieTitle.textContent = data.Title;

    // share 버튼 클릭시 공유창 띄우기
    const shareButton = document.getElementById("shareButton")
    shareButton.addEventListener("click", async () => {
      const shareData = {
        title: data.Title,
        text: `Check out this movie: ${data.Title}`,
        url: window.location.href,
          }
    
      try {
        if (navigator.share) {
          await navigator.share(shareData)
        } 
          } catch (err) {
            console.error("Error sharing:", err)
          }
        })

    // movie-sub-title 데이터 출력
    const movieSubTitle = document.querySelector(".movie-sub-title");
    movieSubTitle.innerHTML = `
      <span>${data.Released}</span>
      <span>•</span>
      <span>${data.Runtime}</span>
      <div class="flex ml-2 stars">${data.Ratings[0].Value}</div>
    `;

      // movie-plot 데이터 출력
const moviePlot = document.querySelector(".movie-plot");
moviePlot.textContent = data.Plot;


// movie-poster 데이터 출력
const moviePoster = document.querySelector(".movie-poster");
const placeholderImage = "/placeholder.svg"; // 대체 이미지 경로

// movie-poster 데이터 불러오기
if (data.Poster && data.Poster !== "N/A") {
  moviePoster.src = data.Poster;
  moviePoster.alt = `${data.Title} Poster`;

  // 이미지 로드 완료 후 크기 조정 (안됨-작동안하는 이유찾기)
      moviePoster.onload = () => {
        if (moviePoster.naturalWidth / moviePoster.naturalHeight > 600 / 400) {
          moviePoster.style.width = "100%"
          moviePoster.style.height = "auto"
        } else {
          moviePoster.style.width = "auto"
          moviePoster.style.height = "100%"
        }
      }
    } else {
      moviePoster.src = placeholderImage
    }

// 이미지 로드 실패 시 대체 이미지로 변경
moviePoster.onerror = () => {
  moviePoster.src = placeholderImage;
};

  } catch (err) {
    console.error(err);
  }

    // movie-info 데이터 출력
    const movieInfo = document.querySelector(".movie-info");
    movieInfo.innerHTML = `
      <div class="grid grid-cols-[auto_1fr] gap-4 my-8">
        <div class="text-gray-400">Genre</div>
        <div>${data.Genre}</div>
        <div class="text-gray-400">Director</div>
        <div>${data.Director}</div>
        <div class="text-gray-400">Actors</div>
        <div>${data.Actors}</div>
    `;
}