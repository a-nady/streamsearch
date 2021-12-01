const JustWatch = require("justwatch-api");
const jw = new JustWatch();

function parse(data, prov) {
    prov = prov.filter((obj) => Object.keys(obj).includes("clear_name"));
    // only look for streaming services rather than ppv or purchase
    prov = prov.filter((obj) => obj.monetization_types.includes("flatrate"));

    let tempMov = {};
    let results = [];
    let j = 0;
    data.items.forEach(function (obj) {
        tempMov.title = obj.title;
        tempMov.release = obj.original_release_year;
        tempMov.type = obj.object_type;
        tempMov.id = obj.id;
        tempMov.index = j;
        if (obj.offers) {
            tempMov.services = obj.offers.map((obj) => obj.provider_id);
        } else {
            tempMov.services = ["Buy/Rent"];
            results.push(tempMov);
            tempMov = {};
            j++;
            return;
        }
        // remove duplicates
        tempMov.services = [...new Set(tempMov.services)];

        for (let i = 0; i < tempMov.services.length; i++) {
            prov.forEach(function (service) {
                if (service.id === tempMov.services[i]) {
                    tempMov.services[i] = service.clear_name;
                }
            });
        }
        // if no service was found default to buy/rent
        if (!tempMov.services.some(isNaN)) {
            tempMov.services = ["Buy/Rent"];
        }
        tempMov.services = tempMov.services.filter((x) => isNaN(x));
        results.push(tempMov);
        tempMov = {};
        j++;
    });

    return results;
}
const search = async function (query) {
    const providers = await jw.getProviders();
    let searchResult = await jw.search({ query: query });
    return parse(searchResult, providers);
};

// get description
const getDesc = async function (type, id) {
    let actor = []
    let info = await jw.getTitle(type, id)
    let i = 0
    while (actor.length < 3) {
        if (info.credits[i].role === 'ACTOR' & actor.length < 3) {
            actor.push(info.credits[i].name)
        }
        i++;
    }
    return [actor, info.short_description]
    return await jw.getTitle(type, id).then((res) => res.short_description);
};

//search()
module.exports = {
    search: search,
    getDesc: getDesc,
};

