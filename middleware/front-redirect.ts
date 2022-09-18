// front-redirect middleware, used by ~/pages/[...app].vue
// Ensures the path maintains the format /{sort?}/{time?}/{type?}
// Where {sort} and {time} are words defined in ~/assets/api*.js
// The {time} param is only allowed when {type} is "top" or "controversial"
// It will redirect to what we think the correct path should be

import sortTypes from "~/assets/data/sortTypes";
import timePeriods from "~/assets/data/timePeriods";
import articleTypes from "~/assets/data/articleTypes";

export default defineNuxtRouteMiddleware((to, from) => {
    // Validate and get 3 params. sort, timeperiod and type.
    const sort = sortTypes.includes(to.params.slug[0]) ? to.params.slug[0] : undefined;

    const time =
        ["top", "controversial"].includes(sort) && timePeriods.includes(to.params.slug[1]) ? to.params.slug[1] : undefined;

    const articleType = articleTypes.includes(to.params.slug[1])
        ? to.params.slug[1]
        : articleTypes.includes(to.params.slug[2])
        ? to.params.slug[2]
        : undefined;

    let path = "/";
    path += sort === undefined ? "" : sort;
    path += time === undefined ? "" : "/" + time;
    path += articleType === undefined ? "" : "/" + articleType;

    // Redirect to the correct path if the current path is not what we expect.
    if (to.fullPath !== path) {
        return navigateTo(path);
    }

    // Make these params globally accessible using composables.
    useFeedQueryParam().value = "/";
    useFeedSortParam().value = sort;
    useFeedTimeperiodParam().value = time;
    useFeedTypeParam().value = articleType;
});
