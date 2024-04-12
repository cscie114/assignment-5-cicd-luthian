require('dotenv').config();
const axios = require('axios').default;

module.exports = async function() {

    try {
        const movie =
            await axios.get("https://omdbapi.com/?i=" + process.env.MOVIE_ID + "&apiKey=" + process.env.MOVIE_API_KEY);
        return movie.data;

    } catch (error) {
        console.error(error);

    }

};
