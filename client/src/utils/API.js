import axios from 'axios';
import filterParams from './filterParams.js';

export default {
    // get articles from NYT
    getArticles: function(params) {
        return axios.get('/api/nyt', { params: filterParams(params) })
    },

    //save articles to database
    saveArticle: function(articleData) {
        return axios.post('./api/articles', articleData)
    },

    //get saved articles
    getSavedArticles: function() {
        return axios.get('/api/articles')
    },

    deleteArticle: function(id) {
        return axios.delete("/api/articles/" + id);
    }
};