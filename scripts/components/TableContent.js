const { Vue, Vuex } = globalThis;
const { mapActions, mapState } = Vuex;

export const TableContent = Vue.component("table-content", {
    template: `
        <p>
            TableContent
        </p>
    `,
    props: [ ],
    computed: {},
    data () {
        return {};
    },
    methods: {}
});