import React from 'react';
import {getHeaders} from './utils';

class Stories extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        this.state = { stories: [] };
        this.fetchStories = this.fetchStories.bind(this);
        console.log('Stories component created');
    }

    componentDidMount() {
        // fetch posts
        this.fetchStories();
        console.log('Stories component mounted');
    }
    fetchStories(){
        fetch(`/api/stories/`, {
                // method: 'GET',
                headers: getHeaders()
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                this.setState({ stories: data});
            });
    }
    render () {
        const story = this.state.stories;
        if (!story) {
            return (
                <header className="stories">Stories</header>  
            );
        }
        return (
            <header className="stories">
                {
                    story.map(st => {
                        return (
                            <section key= {'story-' + st.id}>
                                <img className ='pic'
                                    src={ st.user.thumb_url }
                                    alt="profile pic"> 
                                </img> 
                                <p>{ st.user.username }</p>
                            </section>
                        )
                    })
                }
            </header>  
        );
    }
}

export default Stories;