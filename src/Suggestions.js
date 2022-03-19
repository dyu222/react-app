import React from 'react';
import Suggestion from './Suggestion';
import {getHeaders} from './utils';

class Suggestions extends React.Component {  
    constructor(props) {
        super(props);
        // constructor logic
        this.state = { suggestions: [] };
        this.fetchSuggestions = this.fetchSuggestions.bind(this);
        console.log('Suggestions component created');
    }

    componentDidMount() {
        // fetch posts
        this.fetchSuggestions();
        console.log('Suggestions component mounted');
    }

    fetchSuggestions(){
        fetch(`https://photo-app-secured.herokuapp.com/api/suggestions/`, {
                // method: 'GET',
                headers: getHeaders()
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                this.setState({ suggestions: data});
            });
    }
    render () {

        return (
            <div className="suggestions">
                <p className="suggestion-text">Suggestions for you</p>
                <div>
                    Suggestions...
                    {
                        this.state.suggestions.map(suggestion => {
                            return (
                                <Suggestion model={suggestion} key={'suggestion-' + suggestion.id} />
                            )
                        })
                    }
                </div>
            </div>
        )     
    }
}

export default Suggestions;