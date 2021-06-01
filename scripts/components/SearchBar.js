const { Vue, Vuex } = globalThis;
const { mapActions, mapState } = Vuex;

export const SearchBar = Vue.component("search-bar", {
    template: `
        <p>
            SearchBar
        </p>
    `,
    props: [ ],
    computed: {},
    data () {
        return {};
    },
    methods: {}
});