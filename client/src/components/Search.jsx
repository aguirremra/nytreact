import React from "react";
import Jumbotron from '../components/Jumbotron';
// import Saved from '../components/Saved';
import API from '../utils/API';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            resultsArray: [],
            searchString: "",
            resultLimit: "5",
            startYear: "",
            endYear: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.renderSearch = this.renderSearch.bind(this);
        this.saveArticle = this.saveArticle.bind(this);
        this.loadArticles = this.loadArticles.bind(this);
        this.renderSaved = this.renderSaved.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.handleFormClear = this.handleFormClear.bind(this);

        this.baseState = this.state
    }

    handleFormClear(event){
        console.log("I am here!");
        event.preventDefault();
        this.setState(this.baseState)
    };

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleFormSubmit(event) {
        event.preventDefault();
        API
            .getArticles(this.state.searchString, this.state.startYear, this.state.endYear)
            .then((res) => {
                let returns = [];
                for (let i = 0; i < this.state.resultLimit && res.data.response.docs.length; ++i)
                    returns.push(res.data.response.docs[i]);
                this.setState({ resultsArray: returns })
            });
        event.target.reset();
    };

    renderSearch() {
        if (this.state.resultsArray.length) {
        }
        return this.state.resultsArray.map((article, i) => {
            return (
                <div key={i} id={"result_" + (i + 1)} className="well">
                    <h4>{article.headline.main}</h4>
                    <p>{article.byline ? article.byline.original : "No Author"}</p>
                    <p><strong>Date Published: </strong> {article.pub_date}</p>
                    <a href={article.web_url} target="_blank" >{article.web_url}</a>
                    <br />
                    <button name={i} className="btn btn-primary" onClick={this.saveArticle}><i className="fa fa-floppy-o" aria-hidden="true" /> Save Article</button>
                </div>
            )
        })
    }

    renderSaved(){
        return this.state.articles.map((article, i) => {
            return(
                <div className="well">
                    <h4>{article.title}</h4>
                    <a href={article.url} target="_blank" >{article.url}</a>
                    <br/>
                    <button name={i} className="btn btn-primary" onClick={() => this.deleteArticle(article._id)}><i className="fa fa-trash-o" aria-hidden="true" /> Delete Article</button>
                    <hr/>
                </div>
            );
        })
    }

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles() {
        API.getSaved()
            .then(res => this.setState({ articles: res.data }))
            .catch(err => console.log(err));
    };

    saveArticle(event) {
        event.preventDefault();
        let data = this.state.resultsArray[event.target.name];
        API.saveArticle({
            title: data.headline.main,
            date: data.pub_date,
            url: data.web_url
        })
            .then(res => this.loadArticles())
            .catch(err => console.log(err));
    };

    deleteArticle(id){
        console.log("ID" + id);
        API.deleteArticle(id)
            .then(res => this.loadArticles())
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <Jumbotron />
                <div className="row">
                    <div className="col-sm-12">
                        <br />
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>  Search Parameters</strong></h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={this.handleFormSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="searchString">Search Term:</label>
                                        <input type="text" className="form-control" id="searchString" onChange={this.handleChange} value={this.state.searchString} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="resultLimit">Number of Records to Retrieve:</label>
                                        <select className="form-control" id="resultLimit" value={this.state.resultLimit} onChange={this.handleChange} >
                                            <option value="1">1</option>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="startYear">Start Year (Optional):</label>
                                        <input type="text" className="form-control" id="startYear" onChange={this.handleChange} value={this.state.startYear} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="endYear">End Year (Optional):</label>
                                        <input type="text" className="form-control" id="endYear" onChange={this.handleChange} value={this.state.endYear} />
                                    </div>
                                    <button type="submit" className="btn btn-default" id="run-search"><i className="fa fa-search"></i> Search </button>
                                    <button type="button" className="btn btn-default" id="clear-all" onClick={this.handleFormClear}><i className="fa fa-trash"></i> Clear Results </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <br />
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Top Articles</strong></h3>
                            </div>
                            <div className="panel-body" id="well-section">
                                <div className="panel-body">
                                    {this.renderSearch()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <br />
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Saved Articles</strong></h3>
                            </div>
                            <div className="panel-body" id="well-section">
                                <div className="panel-body">
                                    {this.renderSaved()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;