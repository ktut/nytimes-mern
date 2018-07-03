import React, { Component } from 'react';
import API from './../../utils/API';
import Article from './../../Components/Article';

class Home extends Component {

    state = {
        articles: [],
        savedArticles: [],
        q: "",
        start_year: "",
        end_year: ""
    }

    // react method
    componentDidMount() {
        this.getArticles();
        this.getSavedArticles();
    }

    // my methods that change the state object
    getArticles = () => {
        let userQ = document.getElementById("js-topic").value;
        let userStart = (document.getElementById("js-start-year").value).split('-').join('');
        let userEnd = (document.getElementById("js-end-year").value).split('-').join('');
        console.log("user start year: " + userStart);
        
        // if no user query entered, get all articles, otherwise use their input
        if (!userQ) {
            API.getArticles({
                q: this.state.q,
                start_year: this.state.start_year,
                end_year: this.state.end_year
            })
            .then(res => this.setState({ articles: res.data }) )
            .catch(err => console.log(err));
        } else {
            API.getArticles({
                q: userQ,
                start_year: userStart,
                end_year: userEnd
            })
            .then(res => this.setState({ articles: res.data }) )
            .catch(err => console.log(err));
        }
        
    }

    handleArticleSave = id => {
        const article = this.state.articles.find(article => article._id === id);
        API.saveArticle(article)
        .then(res => this.getArticles() )
        .then(this.getSavedArticles() );
    }

    getSavedArticles = () => {
        API.getSavedArticles()
        .then(res => this.setState({ savedArticles: res.data }) )
        .catch(err => console.log(err));
    }

    handleDelete = (id) => {
        API.deleteArticle(id).then(res => this.getSavedArticles());
    }

    render() {
        return (
          <div className="nyt-contain">

            <div className="nyt-top">
                <h1>New York Times Article Scrubber</h1>
                <p>Search for and annotate articles of interest!</p>
            </div>
            
            <div className="nyt-columns">
                <div className="nyt-search">
                    <label>Topic</label>
                    <input id="js-topic"></input>
                    <br />
                    <label>Start Year</label>
                    <input type="date" id="js-start-year"></input>
                    <br />
                    <label>End Year</label>
                    <input type="date" id="js-end-year"></input>
                    <br />
                    <button className="search" onClick={() => this.getArticles()}>Search</button>
                </div>
                
                <div className="nyt-results">
                    <h2>Results:</h2>
                    {this.state.articles.map(article => (
                        <Article
                            key={article._id}
                            _id={article._id}
                            title={article.headline.main}
                            url={article.web_url}
                            date={article.pub_date}
                            handleClick={this.handleArticleSave}
                            buttonText="Save Article"
                        />
                    ))}
                </div>
                
                <div className="nyt-saved">
                    <h2>Saved:</h2>
                    {this.state.savedArticles.map(article => (
                        <Article
                            key={article._id}
                            _id={article._id}
                            title={article.title}
                            url={article.url}
                            date={article.date}
                            handleClick={this.handleDelete}
                            buttonText="Delete Article"
                        />
                    ))}
                </div>
            </div>
          </div>
        )
    }
}
  
export default Home;