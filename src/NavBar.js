import React from 'react';
import {getHeaders} from './utils';


class NavBar extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        // this is used in post so maybe here too?
        this.state = { prof: [] };
        this.fetchProf = this.fetchProf.bind(this);
        console.log('NavBar component created');
    }

    componentDidMount() {
        // fetch posts
        this.fetchProf();
        console.log('NavBar component mounted');
    }

    // This task requires that you fetch data from the /api/profile endpoint.
    fetchProf(){
        fetch(`https://photo-app-secured.herokuapp.com/api/profile/`, {
                // method: 'GET',
                headers: getHeaders()
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                this.setState({ prof: data});
            });
    }

    render () {
        const prof = this.state.prof;
        if (!prof) {
            return (
                <div>PROF NOT FOUND?</div>  
            );
        }
        return (
            <nav className="main-nav">
                <h1>{this.props.title}</h1>
                <ul>   
                    <li><a href="/api">API Docs</a></li>
                    {/* MIGHT NEED A FETCH SOMEWHERE TO GET THIS USERNAME */}
                    <li><span>{prof.username}</span></li>
                    <li><a href="/logout">Sign out</a></li>
                </ul> 
            </nav>       
        );
    }
}

export default NavBar;