const request = require('request');

function search(type, service, query) {
    const options = {
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/search/basic',
        qs: {
            country: 'us',
            service: service,
            type: type,
            keyword: query,
            output_language: 'en',
            language: 'en'
        },
        headers: {
            'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
            'x-rapidapi-key': '8ad2ae9581msh7f6172ee53bf74bp12d80djsn2864d57c510f',
            useQueryString: true
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(JSON.parse(body));
        return JSON.parse(body)
    });
}
