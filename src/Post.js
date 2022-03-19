import React from 'react';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import AddComment from './AddComment';
import {getHeaders} from './utils';

class Post extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            post: this.props.model
        }

        this.requeryPost = this.requeryPost.bind(this);
    }

    requeryPost() {
        fetch(`https://photo-app-secured.herokuapp.com/api/posts/${this.state.post.id}`, {
                headers: getHeaders()
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    post: data
                });
            });
    }
    
    // componentDidUpdate() {
    //     console.log('fires after the render() method is invoked')
    // }

    render () {
        const post = this.state.post;
        if (!post) {
            return (
                <div></div>  
            );
        }
        return (
            <section className="card">
                <div className="header">
                    <h3>{ post.user.username }</h3>
                    <i className="fa fa-dots"></i>
                </div>
                
                <img 
                    src={ post.image_url } 
                    alt={'Image posted by ' +  post.user.username } 
                    width="300" 
                    height="300" />
                
                <div className="info">
                    <div>
                        <LikeButton 
                            postId={post.id} 
                            likeId={post.current_user_like_id}
                            requeryPost={this.requeryPost} />
                        
                        
                        
                        <BookmarkButton
                            postId={post.id} 
                            bookmarkId={post.current_user_bookmark_id}
                            requeryPost={this.requeryPost} />
                    </div>
                    <strong>{post.likes.length} Likes</strong>
                    <p><strong>{post.user.username}</strong>{ post.caption }</p>
                    <p>{post.display_time}</p>
                </div>
                <div className="comments">
                    <AddComment
                            post={post} 
                            requeryPost={this.requeryPost} />
                </div>
            </section> 
        );     
    }
}

export default Post;