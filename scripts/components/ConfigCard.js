import { appState } from "../AppState.js";

const { Vue, Vuex, darkModeToggle } = globalThis;
const { mapActions, mapState } = Vuex;
const { Button, ThemeHandler } = darkModeToggle;

export const ConfigCard = Vue.component("config-card", {
    template: `
        <b-card
            style="min-width:13.75em;"
            title="Configuration"
            class="mb-5"
        >
            <div class="m-1" ref="toggleButton">
            </div>
        </b-card>
    `,
    props: [ ],
    computed: {},
    data () {
        return {
        };
    },
    mounted () {
        appState.commit("setTheme", { theme: ThemeHandler.getTheme() });

        const button = new Button(this.$refs.toggleButton, { height: 38 });

        ThemeHandler.on("themeLoaded", (evt) => {
            appState.commit("setTheme", { theme: evt.theme });
        });
    },
    methods: {}
});