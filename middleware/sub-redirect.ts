// sub-redirect middleware, used by ~/pages/r/[...app].vue
// This will run when loading any url starting with /r/ and gives us a chance 
//  to ensure the url maintains this format /r/{subreddits}/{sort}/{time}/{type} 
//  as well as mix and match optional parameters.
// {sort} and {time} are words defined in ~/assets/data/*.js
// The {time} param is only allowed when {type} is "top" or "controversial"
// It will redirect to what we think the correct url should be


import sortTypes from "~/assets/data/sortTypes";
import timePeriods from "~/assets/data/timePeriods";
import articleTypes from "~/assets/data/articleTypes";

export default defineNuxtRouteMiddleware((to, from) => {

    // redirect to the homepage if the url is too short
    if (typeof to.params.slug[0] !== 'string' || to.params.slug[0].length < 3) {
        return navigateTo('/');
    }

    // Get the params we care about
    const query = to.params.slug[0].replace(/[^\w\_\+]/g, '').toLowerCase();
    const sort = sortTypes.includes(to.params.slug[1]) ? to.params.slug[1] : undefined;
    const time = (['top', 'controversial'].indexOf(sort) > -1 && timePeriods.includes(to.params.slug[2])) ? to.params.slug[2] : undefined;
    const articleType = articleTypes.includes(to.params.slug[2]) ? to.params.slug[2] :  articleTypes.includes(to.params.slug[3]) ? to.params.slug[3] : undefined;

    // build a string which is the url we expect given the params.
    let url = '/r/';
    url += query;
    url += sort === undefined ? '' : '/' + sort;
    url += time === undefined ? '' : '/' + time;
    url += articleType === undefined ? '' : '/' + articleType;

    // If the url doesn't match what we expect, then redirect to the 
    //  correct url and hopefully next time the middleware will pass this check.
    if (to.fullPath !== url) {
        return navigateTo(url);
    }

    // If the url is ok, then we can make these params globally accessible 
    //  using composables before loading the rest of the application
    useFeedQueryParam().value = query;
    useFeedSortParam().value = sort;
    useFeedTimeperiodParam().value = time;
    useFeedTypeParam().value = articleType;


});
