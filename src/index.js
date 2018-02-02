import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import API_KEY from '../keys';



// Create a new Component. This compoment will produce some html.

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('inspire');

    }

    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term }, (data) => {
            this.setState({
                videos: data,
                selectedVideo: data[0]
            });
        });
    };
    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList videos={this.state.videos}
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                />
            </div>
        );
    };
}

// Take this component's generated html and put it on the page
ReactDOM.render(<App />, document.querySelector('.container'));  
