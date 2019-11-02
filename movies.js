API_KEY = "3fe7b5a7adaa97e1054290890325f265";

async function GetPage(page, sort) {
  res = await fetch(
    `https://api.themoviedb.org/3/movie/${sort}?api_key=${API_KEY}&page=${page}`
  );
  res_json = await res.json();
  if (res_json.page === page) {
    movies = res_json.results;
    return movies;
  } else {
    return [];
  }
}

async function DisplayPage(page) {
  $("#body-list").empty();
  movies = await GetPage(page, "popular");
  movies_count = movies.length;
  console.log(movies);
  for (i = 0; i < 20; i += 2) {
    rowID = i/2;
    $("#body-list").append(`
        <div class="card-group p-5" id="row-${rowID}">
        </div>
    `);
    for(j=i;j<i+2;j++){
        $(`#row-${rowID}`).append(`
            <div class="card mb-3">
                <div class="row no-gutters">
                <div class="col-md-4 text-center">
                    <img src="https://image.tmdb.org/t/p/original/${movies[j].poster_path}" class="card-img" alt="...">
                    <a href="#" class="btn btn-primary m-2">See details</a>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${movies[j].title}</h5>
                    <p class="card-text">${movies[j].overview}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                </div>
            </div>
        `)
    }
  }
}


DisplayPage(1);