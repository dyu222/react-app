import React from 'react';
import {getHeaders} from './utils';

class AddComment extends React.Component {  

    constructor(props) {
        super(props);
        // this.props.post
        // console.log(this.props.post)
        this.state = {
            commentText: ''
        };
        // console.log('profile component created')
        this.handleChange = this.handleChange.bind(this);
        this.addComment = this.addComment.bind(this);

        // focus stuff
        this.textInput = null;
        this.setTextInputRef = element => {
        this.textInput = element;
        };
        // end

    }
    componentDidMount() {
        // console.log('prof componentmounted')
    }

    handleChange(event) {
        console.log('this event triggered any time user types in textbox')
        this.setState({commentText: event.target.value});
    }
    
    addComment() {
        console.log("handle submit")
        const data = {
            post_id: this.props.post.id,
            text: this.state.commentText
        }
        fetch('https://photo-app-secured.herokuapp.com/api/comments',{
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data =>{
            this.props.requeryPost()
            // clear the box
            this.setState({commentText: ""});
            if (this.textInput) this.textInput.focus();
        })
    }

    showMostRecentComment(){
        // console.log(this.props.post);
        const numComments = this.props.post.comments.length;
        if (numComments>0){
            const recentComment = this.props.post.comments[numComments-1]
            return <section>
                <p>View all {this.props.post.comments.length} comments</p>
                <p><strong>{recentComment.user.username} </strong>{recentComment.text}</p>
                <p>{recentComment.display_time}</p>
            </section>
        } 
    }

    render () {
        // i think we just need the last comment as well as add comment
        return (
            <div>
                {this.showMostRecentComment()}
                <input text="text" 
                    onChange={this.handleChange}
                    value={this.state.commentText} 
                    ref={this.setTextInputRef}/>
                <button onClick={this.addComment}> Add Comment</button>
            </div>
        ) 
    }
}

export default AddComment;