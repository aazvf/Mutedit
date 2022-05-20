// Builds a url (path) that will pass the checks in /middleware/*
// The parameter is an object of optional parameters, like named params
// Means we can generate urls while retaining the current path.
// So if the current url is /r/news/top/day/image
// we can call $buildUrl({sort: 'rising'}) and get the url /r/news/rising/image
const buildUrl = ({ query, sort, timeperiod, type } = {}) => {
    query = query || useFeedQueryParam().value;
    sort = sort || useFeedSortParam().value;
    timeperiod = timeperiod || useFeedTimeperiodParam().value;
    type = type || useFeedTypeParam().value;

    let u = "";

    if (query !== "/" && query.length > 2) {
        u += `/r/${query.toLowerCase()}`;
    }

    u += "/" + sort;

    // the timeperiod url param is optional, only if we're soring by top/controversial
    if (["top", "controversial"].includes(sort)) {
        u += "/" + timeperiod;
    }

    // The type param is also optional and doesnt matter if the timeperiod param
    //  was set or not, see /middleware/front-redirect for how this works.
    if (type !== "all") {
        u += "/" + type;
    }

    return u;
};

export default defineNuxtPlugin(() => {
    return {
        provide: {
            buildUrl,
        },
    };
});
