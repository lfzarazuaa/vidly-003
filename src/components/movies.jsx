import { Component, Fragment } from "react";
import Formatter from "../utils/formatters";
import { getMovies, deleteMovie, resetMovies } from "../services/fakeMovieService";

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = { movies : getMovies() }
    }

    handleOnReset = () => {
        let movies = resetMovies();
        this.setState({movies: movies}) 
    }
    
    generateMessage(){
        const length = this.state.movies.length;
        switch (length) {
            case 0:
                return (<div className="alert alert-warning">
                    <p style={{display: "inline"}}>There are no movies</p>
                    <button className="ml-2 btn btn-success" onClick={this.handleOnReset}>Reset</button>
                    </div>);
            case 1:
                return (<div className="alert alert-warning">
                    <p>There is one movie</p>
                    </div>);
            default:
                return (<div className="alert alert-info">
                    <p>{`There are ${length} movies`}</p>
                    </div>);
        }
    }

    handleOnDelete = (movieId) =>{
        try {
            const deletedMovie = deleteMovie(movieId);
            this.setState({movies: getMovies()})
        } catch (error) {
            console.log(error)
        }
    }

    generateMovieDto(){
        return this.state.movies.map(movie=>{
            return{
                title: movie.title,
                genre: movie.genre.name,
                numberInStock: movie.numberInStock,
                dailyRentalRate: movie.dailyRentalRate,
                deleteButton: <button className="btn btn-danger" onClick={()=>this.handleOnDelete(movie._id)}>Delete</button>
            }
        });
    }

    generateTable() {
        if (!this.state.movies || this.state.movies<1) {
            return null;
        }
        return (
            <table className="table">
                <thead>
                <tr>
                    <th key={1} scope="col">#</th>
                    <th key={2} scope="col">Title</th>
                    <th key={3} scope="col">Genre</th>
                    <th key={4} scope="col">Stock</th>
                    <th key={5} scope="col">Rate</th>
                    <th key={6} scope="col"> </th>
                </tr>
                </thead>
                <tbody>
                    {this.generateMovieDto().map((movie,counter)=>Formatter.formatAsTableRow(movie,counter))}
                </tbody>
            </table>
        );
    }

    render() { 
        return (<Fragment>
                {this.generateMessage()}
                {this.generateTable()}
            </Fragment> );
    }
}
 
export default Movies;