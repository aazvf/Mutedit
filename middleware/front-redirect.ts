// front-redirect middleware, used by ~/pages/[...app].vue
// Ensures the url maintains the format /{sort?}/{time?}
// Where {sort} and {time} are words defined in ~/assets/api*.js
// The {time} param is only allowed when {type} is "top" or "controversial"
// It will redirect to what we think the correct url should be

import sortTypes from "~~/assets/data/sortTypes";
import timePeriods from "~~/assets/data/timePeriods";

export default defineNuxtRouteMiddleware((to, from) => {

    const sort = (sortTypes.indexOf(to.params.slug[0]) > -1) ? to.params.slug[0] : undefined;
    const time = (['top', 'controversial'].indexOf(sort) > -1 && timePeriods.indexOf(to.params.slug[1]) > -1) ? to.params.slug[1] : undefined;

    let url = '/';
    url += sort === undefined ? '' : sort;
    url += time === undefined ? '' : '/' + time;


    if (to.fullPath !== url) {
        return navigateTo(url);
    }

});
