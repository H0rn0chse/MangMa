const { Vue, Vuex } = globalThis;
const { mapActions, mapState } = Vuex;

export const SearchBar = Vue.component("search-bar", {
    template: `
        <div class="d-flex">
            <b-form-input
                v-model="_searchString"
                debounce=200
            />
            <b-button
                v-on:click="clearInput"
                class="ml-3"
            >
                <b-icon icon="x-circle" />
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