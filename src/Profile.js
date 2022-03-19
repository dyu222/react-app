import React from 'react';
import {getHeaders} from './utils';

class Profile extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        this.state = { prof: [] };
        this.fetchProf = this.fetchProf.bind(this);
        console.log('Profile component created');
    }

    componentDidMount() {
        // fetch posts
        this.fetchProf();
        console.log('Profile component mounted');
    }

    fetchProf(){
        fetch(`https://photo-app-secured.herokuapp.com/api/profile/`, {
                // method: 'GET',
                headers: getHeaders()
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ prof: data});
            });
    }
    render () {
        const prof = this.state.prof;
        if (!prof) {
            return (
                <div>PROF NOT FOUND</div>  
            );
        }
        return (
            <section className = "row">
                <img className="prof-pic"
                    src={ prof.thumb_url }
                    alt="profile pic"> 
                </img>
                <h1>{ prof.username }</h1>
                 
            </section>
        );
    }
}

export default Profile;