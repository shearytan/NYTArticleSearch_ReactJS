import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import key from '../../config/keys';
import '../style/component/main.scss';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: [],
            search: undefined
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Get API with axios
    getData() {
        const  url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";
        const apiKey = key.apiKey;
        const search = "&q=" + (this.state.search);

        axios
            .get(url + apiKey + search)
            .then((res) => {
                this.setState({contents: this.state.contents.concat(res.data.response.docs)});
                console.log(this.state);
                console.log(url+apiKey+search);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    // Input search
    handleSearch(e){
        const search = e.target.value;
        this.setState({search});
    }
    
    // Submit new input and return new content
    handleSubmit(e) {
        e.preventDefault();
        if(this.state.search === ""){
            this.setState({search: undefined});
            this.getData();
        } else {
            this.setState({contents: []});
            this.getData(e);
        }    
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        return (
            <div className="container">
                <div className="title">
                    <h1>New York Times</h1>
                    <p>Most Recent Articles Search</p>
                </div>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                       <label>Search: </label>
                       <input type="text" placeholder="keywords" onChange={this.handleSearch} value={this.state.search} />
                    </form>
                </div>
                <div className="content">
                    {
                        this.state.contents.map((content, i) => {
                            return (
                                <div key={i} className="subcontent">
                                    <h3>{content.headline.main}</h3>
                                    <div className="subcontent-second">
                                        {
                                            (content.section_name) ? <h4>Section: {content.section_name}</h4> : ''
                                        }
                                        <pre>{content.pub_date}</pre>
                                        <p>{content.snippet}</p>
                                        <a href={content.web_url} target="blank">Read the article</a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="footer">
                    <p>♕ Made with ❤ by ShearyTan '18 ♕</p>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('app'));