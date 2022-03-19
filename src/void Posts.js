import React from 'react';
import {getHeaders} from './utils.js'
import Post from './Post';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        // constructor logic
        console.log('Posts component created');
        this.getPosts()
    }
    getPosts() {
        fetch('/api/posts', {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {

        }
            )
    }
    // componentDidMount() {
    //     // fetch posts
    //     console.log('Posts component mounted');
    // }

    render () {
        console.log('Posts rendering...', this.state)
        return (
            <div id="posts">
                {this.state.posts.map(post =>{
                    return <div>{post.user.username}</div>
                })
                }
                {/* Posts */}
            </div>
                
        )
    }
}

