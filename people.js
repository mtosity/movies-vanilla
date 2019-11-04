console.log("hi");
CURRENT_PEOPLE_NAME = localStorage.getItem("CURRENT_PEOPLE_NAME");
console.log(CURRENT_PEOPLE_NAME);
FETCH_LINK = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${CURRENT_PEOPLE_NAME}`;

async function GetPeople() {
  FETCH_LINK = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${CURRENT_PEOPLE_NAME}`;
  res = await fetch(FETCH_LINK);
  res_json = await res.json();
  if (res_json.results.length > 0) {
    return res_json.results[0];
  } else {
    return [];
  }
}
async function DisplayPeopleDetail() {
  $("#people_detail").empty();
  $("#people_detail").append(`
        <button class="btn btn-primary m-5" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
      `);

  person = await GetPeople();
  console.log(person);

  $("#people_detail").empty();
  $(`#people_detail`).append(`
        <div class="card mb-3 m-5">
          <!-- poster_path -->
          <div class="row">
            <img
              src="https://image.tmdb.org/t/p/original/${person.profile_path}"
              class=""
              alt="poster"
              style="max-height: 450px; object-fit: contain;"
            />
            <div class="card-body mx-5">
              <h1 class="card-title  my-3">${person.name}</h1>
              <p class="card-text">Known for: ${person.known_for_department}</p>
              <p class="card-text">Popularity: ${person.popularity} &#128149</p>
              <p class="card-text">
                <small class="text-muted">Gender: ${
                  person.gender == 1 ? "Female" : "Male"
                }</small>
              </p>
              <p class="card-text mt-5">Two last movies:</p>
              <div class="row">
              <div class="card" style="width: 18rem; max-height: 20rem">
                <img src="https://image.tmdb.org/t/p/original/${person.known_for[0].poster_path}" class="card-img-top" alt="poster">
                <div class="card-body">
                  <h5 class="card-title">${person.known_for[0].title}</h5>
                </div>
              </div>
              <div class="card" style="width: 18rem;">
                <img src="https://image.tmdb.org/t/p/original/${person.known_for[1].poster_path}" class="card-img-top" alt="poster">
                <div class="card-body">
                  <h5 class="card-title">${person.known_for[0].title}</h5>
                </div>
              </div>    
              </div>
            </div>
          </div>
        </div>
    `);
}

DisplayPeopleDetail();
