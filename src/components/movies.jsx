import { Component, Fragment } from "react";
import Formatter from "../utils/formatters";
import LikeIcon from "./common/likeIcon";
import { getMovies, deleteMovie, resetMovies, saveMovie } from "../services/fakeMovieService";
import Pagination from "./common/pagination";

class Movies extends Component {
    constructor(props) {
        super(props);
        const movies = getMovies()
        this.state = { movies,
            paginationInfo: {
                numberOfPages : 12,
                selectedPage : 3
            }
        }
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

    handleOnLike = (movieId) => {
        let movieToChangeLike = this.state.movies.find(movie=>movie._id===movieId);
        movieToChangeLike.isLikePressed = !movieToChangeLike.isLikePressed;
        const movieInDb = saveMovie(movieToChangeLike) // Save on Db
        console.log(movieInDb);
        this.setState({movies: getMovies()})
    }

    handleOnDelete = (movieId) =>{
        try {
            deleteMovie(movieId);
            this.setState({movies: getMovies()})
        } catch (error) {
            console.log(error)
        }
    }

    handleOnClickPage = (pageNumber) => {
        // TODO: Logic for update table
        
        // Select the correct number
        const {paginationInfo} = this.state;
        if (paginationInfo.selectedPage === pageNumber) return
        paginationInfo.selectedPage = pageNumber;
        this.setState({paginationInfo});
    }

    generateMovieDto(){
        return this.state.movies.map(movie=>{
            return{
                title: movie.title,
                genre: movie.genre.name,
                numberInStock: movie.numberInStock,
                dailyRentalRate: movie.dailyRentalRate,
                isLikePressed: <LikeIcon isLikeSelected={movie.isLikePressed} onClickLike={()=>this.handleOnLike(movie._id)}></LikeIcon>,
                deleteButton: <button className="btn btn-danger" onClick={()=>this.handleOnDelete(movie._id)}>Delete</button>
            }
        });
    }

    generateTable() {
        if (!this.state.movies || this.state.movies<1) {
            return null;
        }
        const {numberOfPages, selectedPage} = this.state.paginationInfo;
        return (
            <Fragment>

                <table className="table">
                    <thead>
                    <tr>
                        <th key={1} scope="col">#</th>
                        <th key={2} scope="col">Title</th>
                        <th key={3} scope="col">Genre</th>
                        <th key={4} scope="col">Stock</th>
                        <th key={5} scope="col">Rate</th>
                        <th key={6} scope="col">Like</th>
                        <th key={7} scope="col"> </th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.generateMovieDto().map((movie,counter)=>Formatter.formatAsTableRow(movie,counter))}
                    </tbody>
                </table>
                <Pagination numberOfPages={numberOfPages} selectedPage={selectedPage} onClickPage={(pageNumber)=>{this.handleOnClickPage(pageNumber)}}></Pagination>
            </Fragment>
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