// sub-redirect middleware, used by ~/pages/r/[...app].vue
// Ensures the url maintains this format /r/{subreddits}/{sort}/{time}
// Where {sort} and {time} are words defined in ~/assets/api*.js
// The {time} param is only allowed when {type} is "top" or "controversial"
// It will redirect to what we think the correct url should be

import sortTypes from "~~/assets/data/sortTypes";
import timePeriods from "~~/assets/data/timePeriods";

export default defineNuxtRouteMiddleware((to, from) => {

    if (typeof to.params.slug[0] !== 'string' || to.params.slug[0].length < 3) {
        return navigateTo('/');
    }

    const query = to.params.slug[0].replace(/[^\w\_\+]/g, '').toLowerCase();
    const sort = (sortTypes.indexOf(to.params.slug[1]) > -1) ? to.params.slug[1] : undefined;
    const time = (['top', 'controversial'].indexOf(sort) > -1 && timePeriods.indexOf(to.params.slug[2]) > -1) ? to.params.slug[2] : undefined;

    console.log({query, sort, time});

    let url = to.name === 'r-app' ? '/r/' : '/';
    url += query;
    url += sort === undefined ? '' : '/' + sort;
    url += time === undefined ? '' : '/' + time;

    if (to.fullPath !== url) {
        return navigateTo(url);
    }

});
