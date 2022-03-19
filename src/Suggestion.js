import React from 'react';
import FollowButton from './FollowButton';
import {getHeaders} from './utils';

class Suggestion extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            suggestion: this.props.model
        }

        this.requeryPost = this.requeryPost.bind(this);
    }

    requeryPost() {
        fetch(`/api/following/${this.state.suggestion.id}`, {
                headers: getHeaders()
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ 
                    suggestion: data
                });
            });
    }
    
    // componentDidUpdate() {
    //     console.log('fires after the render() method is invoked')
    // }

    render () {
        const suggestion = this.state.suggestion;
        if (!suggestion) {
            return (
                <div></div>  
            );
        }
        return (
            <section className="suggestions" key= {'story-' + suggestion.id}>
                <img className="pic"
                    src={ suggestion.thumb_url }
                    alt="profile pic"> 
                </img>
                <p>{ suggestion.username }</p>
                <FollowButton 
                        userId={suggestion.id} 
                        // followId made after a follow?
                        requeryPost={this.requeryPost} />
            </section>
        );     
    }
}

export default Suggestion;