// sub-redirect middleware, used by ~/pages/r/[...app].vue
// This will run when loading any path starting with /r/ and gives us a chance 
//  to ensure the path maintains this format /r/{subreddits}/{sort}/{time}/{type} 
//  as well as mix and match optional parameters.
// {sort} and {time} are words defined in ~/assets/data/*.js
// The {time} param is only allowed when {type} is "top" or "controversial"
// It will redirect to what we think the correct path should be


import sortTypes from "~/assets/data/sortTypes";
import timePeriods from "~/assets/data/timePeriods";
import articleTypes from "~/assets/data/articleTypes";

export default defineNuxtRouteMiddleware((to, from) => {

    // redirect to the homepage if the path is too short
    if (typeof to.params.slug[0] !== 'string' || to.params.slug[0].length < 3) {
        return navigateTo('/');
    }

    // Get the 4 params. query, sort, time and type.
    const query = to.params.slug[0].replace(/[^\w\_\+]/g, '').toLowerCase();

    const sort = sortTypes.includes(to.params.slug[1]) ? 
        to.params.slug[1] : undefined;
    
    const time = (['top', 'controversial'].includes(sort) &&
        timePeriods.includes(to.params.slug[2])) ? to.params.slug[2] : undefined;

    const articleType = articleTypes.includes(to.params.slug[2]) ?
        to.params.slug[2] :  articleTypes.includes(to.params.slug[3]) ?
        to.params.slug[3] : undefined;

    // build a string which is the path we expect given the params.
    let path = '/r/';
    path += query;
    path += sort === undefined ? '' : '/' + sort;
    path += time === undefined ? '' : '/' + time;
    path += articleType === undefined ? '' : '/' + articleType;

    // If the path doesn't match what we expect, then redirect to the 
    //  correct path and hopefully next time the middleware will pass this check.
    if (to.fullPath !== path) {
        return navigateTo(path);
    }

    // If the path is ok, then we can make these params globally accessible 
    //  using composables before loading the rest of the application
    useFeedQueryParam().value = query;
    useFeedSortParam().value = sort;
    useFeedTimeperiodParam().value = time;
    useFeedTypeParam().value = articleType;


});
