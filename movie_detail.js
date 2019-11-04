CURRENT_MOVIE_ID = localStorage.getItem("CURRENT_MOVIE_ID");
FETCH_LINK = `https://api.themoviedb.org/3/movie/${CURRENT_MOVIE_ID}?api_key=${API_KEY}`;

async function GetMovieDetail() {
  res = await fetch(FETCH_LINK);
  res_json = await res.json();
  return res_json;
}

async function GetMovieReview(){
  res = await fetch(FETCH_LINK);
  res_json = await res.json();
  return res_json.results;
}

async function DisplayMovieDetail() {

  $("#movie_detail").empty();
  $("#movie_detail").append(`
      <button class="btn btn-primary m-5" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
      </button>
    `);

  movie = await GetMovieDetail();
  FETCH_LINK = `https://api.themoviedb.org/3/movie/${CURRENT_MOVIE_ID}/reviews?api_key=${API_KEY}`;
  reviews = await GetMovieReview();

  $("#movie_detail").empty();
  $(`#movie_detail`).append(`
      <div class="card mb-3 m-5">
        <!-- poster_path -->
        <div class="row no-gutters">
          <div class="col-md-4">
          <img
            src="https://image.tmdb.org/t/p/original/${movie.poster_path}"
            class="card-img"
            alt="poster"
            style="max-height: 450px; object-fit: contain;"
          />
          </div>
          <div class="col-md-8">
            <div class="card-body mx-5">
              <h1 class="card-title  my-3">${movie.title}</h1>
              <p class="card-text">Vote: ${movie.vote_average} &#11088</p>
              <p class="card-text">
                <small class="text-muted">Release date: ${movie.release_date}</small>
              </p>
              <div>
                <p class="card-text">
                  ${movie.overview}
                </p>
              </div>
              <div class="row mx-5">
                <button type="button" class="btn btn-primary mx-2">Download</button>
                <button type="button" class="btn btn-success mx-2">Trailer</button>
                <button type="button" class="btn btn-danger mx-2">Xem phim</button>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body" id="review">
          <h5 class="card-title"></h5>
          <p class="card-text" id="genres_${movie.id}">
          </p>
        </div>
      </div>
  `);
  if(reviews.length <= 0){
    $(`#review`).append(`
      <p class="card-text">
        No reviews yet!
      </p>
    `);
  } else{
    reviews.forEach(r => {
      $(`#review`).append(`
        <h5 class="card-title">Reviewed by ${r.author}</h5>
        <p class="card-text">
          ${r.content}
        </p>
      `);
    });
  }
}

async function GetCredits(){
  FETCH_LINK = `https://api.themoviedb.org/3/movie/${CURRENT_MOVIE_ID}/credits?api_key=${API_KEY}`;
  res = await fetch(FETCH_LINK);
  res_json = await res.json();
  return res_json;  
}

async function DisplayCredits(){
  credits = await GetCredits();
  // console.log(credits);
  cast = [...credits.cast]; 
  n_cast = cast.length;
  crew = [...credits.crew];
  n_crew = crew.length;
  // console.log(crew);
  for (let i = 0; i < n_cast; i = i + 5) {
    $('#cast').append(`
      <div class="card-group" id="cast_row_${i}">
      </div>
    `);
    for(let j = i; j < i + 5 && j < n_cast; j++){
      $(`#cast_row_${i}`).append(`
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><a href="./people.html" onclick="SavePeopleName('${cast[j].name}')">${cast[j].name}</a></h5>
            <p class="card-text"><small class="text-muted">as ${cast[j].character}</small></p>
          </div>
        </div>
      `);
    } 
  }
  for (let i = 0; i < n_crew; i = i + 5) {
    $('#crew').append(`
      <div class="card-group" id="crew_row_${i}">
      </div>
    `);
    for(let j = i; j < i + 5 && j < n_crew; j++){
      $(`#crew_row_${i}`).append(`
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><a href="./people.html" onclick="SavePeopleName('${crew[j].name}')">${crew[j].name}</a></h5>
            <p class="card-text"><small class="text-muted">as ${crew[j].department}</small></p>
          </div>
        </div>
      `);
    } 
  }
}

async function SavePeopleName(name){
  await localStorage.setItem("CURRENT_PEOPLE_NAME", name);
}

DisplayMovieDetail();
DisplayCredits();