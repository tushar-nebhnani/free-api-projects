import { useState, useEffect } from "react";
import "./JokesCard.css";

function JokesCard() {
  const [jokes, setJokes] = useState("");
  const [status, setStatus] = useState(true);

  async function fetchJokeData() {
    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomjokes/joke/random",
      );

      const data = await response.json();

      return data.data.content;
    } catch (error) {
      console.error(`Error while fetching jokes: ${error}`);
    }
  }

  useEffect(() => {
    fetchJokeData()
      .then((jokeText) => {
        setJokes(jokeText);
        setStatus("Success");
      })
      .catch((error) => {
        console.log("Error while fetching the jokes from the server: ", error);
        setStatus("error");
      });
  }, []);

  async function handleGetNewJoke() {
    setStatus("loading");
    const joke = await fetchJokeData();
    setJokes(joke);
    setStatus("Success");
  }

  return (
    <>
      <div className="jokes-card-container">
        <h4 className="jokes-card-title">Random Jokes Viewer</h4>

        <div className="jokes-card-content">
          {status === "loading" ? <p>Loading a joke...</p> : <p>{jokes}</p>}
          {status === "error" && (
            <p className="jokes-card-error">Failed to load joke. Try again!</p>
          )}
        </div>

        <button
          className="jokes-card-button"
          onClick={handleGetNewJoke}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Loading..." : "Get Another Joke"}
        </button>
      </div>
    </>
  );
}

export default JokesCard;
