const { Vue, Vuex } = globalThis;
const { mapActions, mapState } = Vuex;

export const SearchBar = Vue.component("search-bar", {
    template: `
        <div class="d-flex">
            <b-form-input
                v-model="_searchString"
                debounce=500
            />
            <b-button
                v-on:click="clearInput"
            >
                Clear&nbsp;Input
            </b-button>
        <div>
    `,
    props: [ ],
    computed: {
        ...mapState([
            "searchString",
        ]),
        _searchString: {
            get () {
                return this.searchString;
            },
            set (newSearch) {
                this.updateSearchString(newSearch);
            }
        },
    },
    data () {
        return {};
    },
    methods: {
        ...mapActions([
            "updateSearchString",
        ]),
        clearInput () {
            this.updateSearchString("");
        }
    }
});