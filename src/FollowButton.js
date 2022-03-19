import React from 'react';
import {getHeaders} from './utils';

class FollowButton extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            followingId: null
        }
        this.toggleFollow = this.toggleFollow.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.requeryPost = this.props.requeryPost.bind(this);
    }

    toggleFollow(ev) {
        if (this.state.followingId) {
            console.log('unfollow');
            this.unfollow();
        } else {
            console.log('follow');
            this.follow();
        }
    }

    follow() {
        console.log('code to follow the user', this.props.userId);
        const userId = this.props.userId;
        // issue fetch request and then afterwards requery for the post:
        fetch(`/api/following`, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({user_id: userId})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({followingId: data.id});
            console.log(this.state.followingId);
            // this.requeryPost();
        })
        // this.props.requeryPost();
    }

    unfollow() {
        console.log('code to unfollow the user');
        // issue fetch request and then afterwards requery for the post:
        // pretty sure we need followId not userId but havent defined that anywhere yet
        fetch(`/api/following/${this.state.followingId}`, {
            headers: getHeaders(),
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({followingId: null})
            // this.requeryPost();
        })
        // this.props.requeryPost();
    }

    render () {
        // const followId = this.props.followId;
        return (
            <button role="switch"
                className="link following" 
                aria-label="Follow Button" 
                aria-checked={this.state.followingId ? true : false}
                onClick={this.toggleFollow}>
                {this.state.followingId ? 'unfollow' : 'follow'}                      
            </button>
        ) 
    }
}

export default FollowButton;