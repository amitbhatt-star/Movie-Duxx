import logo from "./logo.svg";//importing the logo image
import "./App.css";//importing base styles
import "./styles.css";//importing additional styles
import Header from "./components/Header";// Importing the Header component
import Footer from "./components/Footer";// Importing the Footer component
import MoviesGrid from "./components/MoviesGrid";// Importing MoviesGrid to display the movies
import Watchlist from "./components/Watchlist";// Importing Watchlist to display saved movies

// Importing Router dependencies from react-router-dom to handle navigation between pages
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";


function App() {
  // Defining state variables for storing movie data and the user's watchlist with the react hooks
  const [movies, setMovies] = useState([]); // Holds the list of movies fetched from a JSON file
  const [watchlist, setWatchlist]=useState([]); // Holds IDs of movies added to the watchlist

  // useEffect to fetch movie data from a local JSON file only once when the component mounts
  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data)); // Updating 'movies' state with the fetched data
  }, []);

  // Function to add or remove a movie from the watchlist based on its ID
  const toggleWatchlist =(movieId)=>{
    setWatchlist(prev =>
      prev.includes(movieId)? prev.filter(id => id !==movieId): [...prev,movieId]

    )
  }
  //linking router for 2 pages
  return (
    <div className="App">
      <div className="container">
        <Header></Header>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/" >Home</Link>
              </li>
              <li>
                <Link to="/watchlist" >Watchlist</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path = "/" element= {<MoviesGrid  watchlist={watchlist} movies={movies} toggleWatchlist={toggleWatchlist}/>}></Route>
            <Route path = "/watchlist" element= {<Watchlist watchlist={watchlist} movies={movies}toggleWatchlist={toggleWatchlist}/>}></Route>

          </Routes>
        </Router>
        
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;


//npm start to run in local host 3000
