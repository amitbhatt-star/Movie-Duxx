// Importing necessary libraries and components
import React, { useState} from "react"; // Import React and useState hook for state management
import "../styles.css"; // Importing styles for MoviesGrid
import MovieCard from "./MovieCard"; // Import MovieCard component to display individual movie details

// MoviesGrid component, receiving movies, watchlist, and toggleWatchlist as props
export default function MoviesGrid({movies,watchlist,toggleWatchlist}) {
  // State for search term, genre, and rating filters
  const [searchTerm, setSearchTerm] = useState("");// Holds user input for search
  const [genre, setGenre] = useState("All Genres");// Holds selected genre filter
  const [rating, setRating] = useState("All");// Holds selected rating filter

  
  // Functions to handle updates to search, genre, and rating filters
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);// Updates search term when user types
  };
  const handleGenreChange = (e) => {
    setGenre(e.target.value);// Updates genre filter when user selects a genre
  };
  const handleRatingChange = (e) => {
    setRating(e.target.value);// Updates rating filter when user selects a rating
  };

  // Filter functions to check if a movie matches the selected genre, search term, and rating

  const matchesGenre = (movie, genre)=>{
    // Returns true if the genre matches the selected filter or is set to "All Genres"
    return genre === "All Genres" || movie.genre.toLowerCase() === genre.toLowerCase();
  }

  const matchesSearchTerms = (movie, searchTerm)=>{
    // Returns true if the movie title includes the search term (case-insensitive)
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase())

  }

  const matchesRating =(movie,rating)=>{
    // Filters movies based on rating: Good (>=8), Ok (5-7.9), Bad (<5)
    switch(rating){
        case 'All':
            return true;// No rating filter applied

            case 'Good':
                return movie.rating>=8;

            case 'Ok':
                return movie.rating>=5 && movie.rating < 8;

            case 'Bad':
                return movie.rating<5;

            default:
                return false;
    }
  };


  // Applying filters to the movies array to generate a filtered list
  const filteredMovies = movies.filter((movie) =>
    matchesGenre(movie,genre)&& 
    matchesRating(movie, rating)&&
    matchesSearchTerms(movie, searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="filter-bar">
        <div className="filter-slot">
            <label>Genre</label>
            <select className ="filter-dropdown" value={genre} onChange={handleGenreChange}>
                <option>All Genres</option>
                <option>Action</option>
                <option>Drama</option>
                <option>Fantasy</option>
                <option>Horror</option>
            </select>
        </div>

        <div className="filter-slot">
            <label>Rating</label>
            <select className ="filter-dropdown" value={rating} onChange={handleRatingChange}>
                <option>All</option>
                <option>Good</option>
                <option>Ok</option>
                <option>Bad</option>
        
            </select>

        </div>

      </div>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} toggleWatchlist={toggleWatchlist} isWatchlisted={watchlist.includes(movie.id)}></MovieCard>
        ))}
      </div>
    </div>
  );
}
