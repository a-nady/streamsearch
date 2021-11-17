const JustWatch = require('justwatch-api');
const jw = new JustWatch();

function parse(data, prov) {
    prov = prov.filter(obj => Object.keys(obj).includes("clear_name"))
    prov = prov.filter(obj => obj.monetization_types.includes('flatrate'))

    let tempMov = {}
    let results = []
    let j = 0;
    data.items.forEach(function(obj) {
        tempMov.title = obj.title
        tempMov.release = obj.original_release_year
        tempMov.type = obj.object_type
        tempMov.id = obj.id
        tempMov.index = j;
        if (obj.offers) {
            tempMov.services = obj.offers.map(obj => obj.provider_id)
        } else {
            tempMov.services = ['Buy/Rent']
            results.push(tempMov)
            tempMov = {}
            j++;
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

        if (!tempMov.services.some(isNaN)) {
            tempMov.services = ['Buy/Rent']
        }
        tempMov.services = tempMov.services.filter(x => isNaN(x))
        results.push(tempMov)
        tempMov = {}
        j++;
    })
    return results
}
const search = async function(query){
    const providers = await jw.getProviders();
    let searchResult = await jw.search({query: query});
    return parse(searchResult, providers)
    //console.log(results)
};

// get description
const getDesc = async function(type, showInfo) {
    return await jw.getTitle('show', 21546).then(res => res.short_description);
}

//search()
module.exports = {
    search: search,
    getDesc: getDesc
}
