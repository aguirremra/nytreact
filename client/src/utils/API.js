import axios from 'axios';
const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=0e2651e303cc49a49215ac3b02586e3a&q="

export default {
	getArticles: function(searchString, startYear, endYear){
		let params = searchString;
		if(parseInt(startYear))
			params+="&begin_date="+startYear+"0101";
		if(parseInt(endYear))
			params+="&end_year="+endYear+"1231";
		console.log("searchStringstring " + baseURL + params);
		return axios.get(baseURL + params);		
	},
	//get all articles
	getSaved: function(){
		return axios.get('/api/saved');
	},
	//save article
	saveArticle: function(articleData){
		return axios.post('/api/saved', articleData);
	},
	//delete article
	deleteArticle: function(id){
		return axios.delete('/api/saved/' + id);
	}
};