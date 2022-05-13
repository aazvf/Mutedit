
<script>
import store from "../../store";
export default {
    data() {
        return ({ articles } = store);
        return {
            ...store.articles,
        };
    },
    mounted() {
        console.log("GetArticles mounted.");
    },

    methods: {},
};
</script>
