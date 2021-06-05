import { appState } from "./AppState.js";
import { CommentCard } from "./components/CommentCard.js";
import { ConfigCard } from "./components/ConfigCard.js";
import { ImportExportCard } from "./components/ImportExportCard.js";
import { SearchBar } from "./components/SearchBar.js";
import { TableContent } from "./components/TableContent.js";
import { getDirtyState } from "./DirtyState.js";

const { Vue, Vuex } = globalThis;

const { mapState } = Vuex;

const componentList = [
    TableContent,
    SearchBar,
    ImportExportCard,
    ConfigCard,
    CommentCard,
];

window.addEventListener("beforeunload", (event) => {
    if (getDirtyState()) {
        var message = 'You may export the latest changes';
        event.returnValue = message;
        return message;
    }
});

const app = new Vue({
    el: "#app",
    template: `
        <b-container
            id="app"
            fluid
            class="vw-100 vh-100"
        >
            <b-row
                align-v="stretch"
                class="h-100 p-3"
            >
                <b-col class="d-flex flex-column">
                   <b-row align-v="stretch">
                        <b-col>
                            <search-bar/>
                        </b-col>
                    </b-row>
                    <b-row align-v="stretch" class="flex-grow-1">
                        <b-col class="d-flex flex-column justify-content-end">
                            <table-content/>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col
                    cols="4"
                    class="d-flex flex-column justify-content-end"
                >
                    <comment-card/>
                    <config-card/>
                    <import-export-card/>
                </b-col>
            </b-row>
        </b-container>
    `,
    store: appState,
    computed: {}
});


