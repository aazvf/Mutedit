// front-redirect middleware, used by ~/pages/[...app].vue
// Ensures the url maintains the format /{sort?}/{time?}/{type?}
// Where {sort} and {time} are words defined in ~/assets/api*.js
// The {time} param is only allowed when {type} is "top" or "controversial"
// It will redirect to what we think the correct url should be

import sortTypes from "~/assets/data/sortTypes";
import timePeriods from "~/assets/data/timePeriods";
import articleTypes from "~/assets/data/articleTypes";


export default defineNuxtRouteMiddleware((to, from) => {

    // Get the params we care about, sort, timeperiod and type
    const sort = (sortTypes.indexOf(to.params.slug[0]) > -1) ? to.params.slug[0] : undefined;
    const time = (['top', 'controversial'].indexOf(sort) > -1 && timePeriods.indexOf(to.params.slug[1]) > -1) ? to.params.slug[1] : undefined;
    const articleType = articleTypes.includes(to.params.slug[1]) ? to.params.slug[1] :  articleTypes.includes(to.params.slug[2]) ? to.params.slug[2] : undefined;

    let url = '/';
    url += sort === undefined ? '' : sort;
    url += time === undefined ? '' : '/' + time;
    url += articleType === undefined ? '' : '/' + articleType;


    // Redirect to the correct url if the current url is not what we expect.
    if (to.fullPath !== url) {
        return navigateTo(url);
    }

    // Make these params globally accessible using composables.
    useFeedQueryParam().value = '/';
    useFeedSortParam().value = sort;
    useFeedTimeperiodParam().value = time;
    useFeedTypeParam().value = articleType;
});
