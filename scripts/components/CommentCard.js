import { appState } from "../AppState.js";

const { Vue, Vuex, darkModeToggle } = globalThis;
const { mapActions, mapState } = Vuex;

export const CommentCard = Vue.component("comment-card", {
    template: `
        <b-card
            v-bind:title="currentBook.title"
            style="min-width:13.75em;"
            class="mb-5"
        >
            <b-textarea
                placeholder="some Comment..."
                rows="6"
                max-rows="6"
                v-model="currentBook.comment"
                v-on:change="updateBook({id: currentBook.title, comment: currentBook.comment})"
            />
        </b-card>
    `,
    props: [ ],
    computed: {
        ...mapState([
            "currentBook",
        ]),
    },
    data () {
        return {};
    },
    methods: {
        ...mapActions([
            "updateBook"
        ]),
    }
});