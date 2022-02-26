const { Vue, Vuex } = globalThis;
const { mapActions, mapState } = Vuex;

export const ConfigCard = Vue.component("config-card", {
    template: `
        <b-card
            style="min-width:13.75em;"
            title="Configuration"
            class="mb-5"
        >
            <dark-mode-toggle
                height="38"
            />
        </b-card>
    `,
    props: [ ],
    computed: {},
    data () {
        return {
        };
    },
    methods: {}
});