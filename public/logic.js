window.addEventListener("load", async () => {
  updateJoke(await makeRequest(`/api/joke`, "GET"));
});

// Get random dry joke from external api
async function getJoke() {
  let response = await fetch(
    "https://official-joke-api.appspot.com/random_joke?"
  );
  let result = await response.json();
  console.log(result.id + result.setup + result.punchline);
  const printJoke = document.getElementById("printedJoke");
  printJoke.innerText = result.setup + result.punchline;
}

// Saves your joke into our local API
async function addYourJoke() {
  let yourJoke = document.getElementById("funny").value;
  const status = await makeRequest("/api/joke", "POST", { yourJoke });
  updateJoke(await makeRequest(`/api/joke`, "GET"));
}

// Prints your jokes
function updateJoke(yourJokes) {
  let findJoke = document.getElementById("yourJoke");
  findJoke.innerHTML = yourJokes.map((c) => c.yourJoke).join("<br>");
}

async function makeRequest(url, method, body) {
  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      method,
      body: JSON.stringify(body),
    });

    const result = await response.json();

    return result;
  } catch (err) {
    console.error(err);
  }
}
