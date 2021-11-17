const request = require('request');

/*
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
*/



const JustWatch = require('justwatch-api');
const jw = new JustWatch();

//let results = []

function print_result(name, result) {
    console.log(name+":");
    console.log(result['items'][0]);
    console.log("\n\n\n\n");
}

function parse(data, prov) {
    prov = prov.filter(obj => Object.keys(obj).includes("clear_name"))
    prov = prov.filter(obj => obj.monetization_types.includes('flatrate'))
    //console.log(prov)
    //console.log(data)
    let tempMov = {}
    let results = []
    data.items.forEach(function(obj) {
        //console.log(obj)
        tempMov.title = obj.title
        tempMov.release = obj.original_release_year
        tempMov.type = obj.object_type
        tempMov.id = obj.id

        if (obj.offers) {
            tempMov.services = obj.offers.map(obj => obj.provider_id)
        } else {
            tempMov.services = ['Buy/Rent']
            results.push(tempMov)
            tempMov = {}
            return
        }

        tempMov.services = [...new Set(tempMov.services)];

        for (var i = 0; i < tempMov.services.length; i++) {
            prov.forEach(function (service) {
                if (service.id === tempMov.services[i]) {
                    tempMov.services[i] = service.clear_name
                }
            })
        }
        ;
        if (!tempMov.services.some(isNaN)) {
            tempMov.services = ['Buy/Rent']
        }
        tempMov.services = tempMov.services.filter(x => isNaN(x))
        results.push(tempMov)
        tempMov = {}
    })
    return results
}
const search = async function(){
    const providers = await jw.getProviders();
    let searchResult = await jw.search({query: 'always sunny'});
    results = parse(searchResult, providers)
    console.log(results)
};

const getDesc = async function(type, showInfo) {
    return await jw.getTitle('show', 21546).then(res => res.short_description);
}

search()