PAGE = 1;
SORTBY = "popular";
IS_SEARCH = false;
QUERY = "";
FETCH_LINK = `https://api.themoviedb.org/3/movie/${SORTBY}?api_key=${API_KEY}&page=${PAGE}`;
MOVIES_SEARCH = true; //if false then actors search

$("form").submit(function(e) {
  e.preventDefault();
});

async function GetPage() {
  res = await fetch(FETCH_LINK);
  res_json = await res.json();
  if (res_json.page === PAGE) {
    movies = [];
    if (MOVIES_SEARCH) {
      movies = [...movies, ...res_json.results];
    } else {
      actors = [...res_json.results];
      actors.forEach(a => {
        movies = [...movies, ...a.known_for];
      });
    }
    return movies;
  } else {
    return [];
  }
}

async function DisplayPage() {
  $("#body-list").empty();
  $("#body-list").append(`
    <button class="btn btn-primary m-5" type="button" disabled>
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Loading...
    </button>
  `);

  movies = await GetPage();

  $("#body-list").empty();
  movies_count = movies.length;
  if (movies_count <= 0) {
    $("#body-list").append(`
      <div m-5 text-light>
        <p text-light>No result</p>
      </div>
    `);
  } else {
    for (i = 0; i < movies_count; i += 2) {
      rowID = i / 2;
      $("#body-list").append(`
          <div class="row p-5" id="row-${rowID}">
          </div>
      `);
      for (j = i; j < i + 2; j++) {
        $(`#row-${rowID}`).append(`
              <div class="card mb-3 col mx-2">
                  <div class="row no-gutters">
                  <div class="col-md-4 text-center">
                      <img src="https://image.tmdb.org/t/p/original/${movies[j].poster_path}" class="card-img" alt="Poster">
                      <a href="./movie_detail.html" class="btn btn-primary m-2" onclick="SaveMovieID(${movies[j].id})">See detail</a>
                  </div>
                  <div class="col-md-8">
                      <div class="card-body">
                      <h5 class="card-title">${movies[j].title}</h5>
                      <p class="card-text text-info">Rated: ${movies[j].vote_average}</p>
                      <p class="card-text">${movies[j].overview}</p>
                      <p class="card-text"><small class="text-muted">${movies[j].release_date} ${movies[j].original_language}</small></p>
                      </div>
                  </div>
                  </div>
              </div>
          `);
      }
    }
  }
}

async function ChangePage(page) {
  PAGE = page;
  $("li").removeClass("active");
  $(`#li${page}`).addClass("active");
  if (IS_SEARCH) {
    FETCH_LINK = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${PAGE}&query=${QUERY}`;
  } else {
    FETCH_LINK = `https://api.themoviedb.org/3/movie/${SORTBY}?api_key=${API_KEY}&page=${PAGE}`;
  }
  await DisplayPage();
}

async function SearchMovies() {
  QUERY = $("#search-input").val();
  if (QUERY != "") {
    PAGE = 1;
    IS_SEARCH = true;
    $("li").removeClass("active");
    $(`#li1`).addClass("active");
    if ($("#moviesRadio").is(":checked")) {
      FETCH_LINK = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${PAGE}&query=${QUERY}`;
      MOVIES_SEARCH = true;
    } else if ($("#actorsRadio").is(":checked")) {
      FETCH_LINK = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&page=${PAGE}&query=${QUERY}`;
      MOVIES_SEARCH = false;
    } else {
      console.log("Nothing checked");
    }
  } else {
    PAGE = 1;
    IS_SEARCH = false;
    FETCH_LINK = `https://api.themoviedb.org/3/movie/${SORTBY}?api_key=${API_KEY}&page=${PAGE}`;
  }
  await DisplayPage();
}

async function reset() {
  PAGE = 1;
  IS_SEARCH = false;
  MOVIES_SEARCH = true;
  $("#search-input").val("");

  $("li").removeClass("active");
  $(`#li1`).addClass("active");

  FETCH_LINK = `https://api.themoviedb.org/3/movie/${SORTBY}?api_key=${API_KEY}&page=${PAGE}`;
  await DisplayPage();
}

ChangePage(1);

//Moive detail
async function SaveMovieID(movie_id){
  console.log('get');
  CURRENT_MOVIE_ID = movie_id
  await localStorage.setItem("CURRENT_MOVIE_ID", movie_id.toString());
}

async function ChangeSortby(newSortby){
  SORTBY = newSortby;
  FETCH_LINK = `https://api.themoviedb.org/3/movie/${SORTBY}?api_key=${API_KEY}&page=${PAGE}`;

  $('a.sorta').removeClass("active")
  $('a.sorta').removeClass("text-white")
  $(`#${newSortby}`).addClass("active");
  $(`#${newSortby}`).addClass("text-white");
  
  await DisplayPage();
  
}