import { Fragment } from "react/cjs/react.development";

class Movies extends Component {
    constructor(props) {
        super(props);

        this.state = { movies = [] }
    }
    
    render() { 
        return ( <Fragment>
            <p1> Message :) 🎄</p1>
            <table> Here is the table.</table>
        </Fragment> );
    }
}
 
export default Movies;