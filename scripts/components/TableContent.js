const { Vue, Vuex } = globalThis;
const { mapActions, mapState } = Vuex;

export const TableContent = Vue.component("table-content", {
    template: `
        <div
            class="game-list h-100 d-flex flex-column justify-content-end"
        >
            <b-table
                striped
                hover
                small
                sticky-header="calc(100vh - 500px)"
                responsive
                :items="entries"
                :fields="fields"
                class="flex-grow-1"
                :per-page="perPage"
                :current-page="currentPage"
            >
                <template v-slot:cell(title)="row">
                    <b-form-input
                        type="text"
                        v-model="row.item.title"
                        v-on:change="updateRow({id: row.item.id, property: 'title', value: row.item.title})"
                        @focus="selectBook(row.item.title)"
                    />
                </template>
                <template v-slot:cell(number)="row">
                    <b-form-input
                        type="number"
                        v-model="row.item.number"
                        v-on:change="updateRow({id: row.item.id, property: 'number', value: row.item.number})"
                        @focus="selectBook(row.item.title)"
                    />
                </template>
                <template v-slot:cell(read)="row">
                    <b-form-checkbox
                        v-model="row.item.read"
                        v-on:change="updateRow({id: row.item.id, property: 'read', value: row.item.read})"
                        @focus="selectBook(row.item.title)"
                    />
                </template>
                <template v-slot:cell(isBook)="row">
                    <b-form-checkbox
                        v-model="row.item.isBook"
                        v-on:change="updateRow({id: row.item.id, property: 'isBook', value: row.item.isBook})"
                        @focus="selectBook(row.item.title)"
                    />
                </template>
                <template v-slot:cell(isEbook)="row">
                    <b-form-checkbox
                        v-model="row.item.isEbook"
                        v-on:change="updateRow({id: row.item.id, property: 'isEbook', value: row.item.isEbook})"
                        @focus="selectBook(row.item.title)"
                    />
                </template>
                <template v-slot:cell(isVideo)="row">
                    <b-form-checkbox
                        v-model="row.item.isVideo"
                        v-on:change="updateRow({id: row.item.id, property: 'isVideo', value: row.item.isVideo})"
                        @focus="selectBook(row.item.title)"
                    />
                </template>
                <template v-slot:cell(lend)="row">
                    <b-form-checkbox
                        v-model="row.item.lend"
                        v-on:change="updateRow({id: row.item.id, property: 'lend', value: row.item.lend})"
                        @focus="selectBook(row.item.title)"
                    />
                </template>
                <template v-slot:cell(comment)="row">
                    <b-form-input
                        type="text"
                        v-model="row.item.comment"
                        v-on:change="updateRow({id: row.item.id, property: 'comment', value: row.item.comment})""
                        @focus="selectBook(row.item.title)"
                    />
                </template>
                <template v-slot:cell(actions)="row">
                    <b-button
                        size="sm"
                        v-on:click="deleteRow(row.item.id)"
                        @focus="selectBook(row.item.title)"
                        variant="danger"
                    >
                        <b-icon icon="trash" />
                    </b-button>
                </template>
            </b-table>

            <div class="text-center pb-3 d-flex flex-row justify-content-center align-items-center">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    class="m-0 mr-3"
                />

                <b-button v-on:click="addRow">
                    Neuer Eintrag
                </b-button>
            </div>
        </div>
    `,
    props: [ ],
    computed: {
        ...mapState([
            "entries",
        ]),
        rows () {
            return this.entries.length
        }
    },
    data () {
        return {
            perPage: 50,
            currentPage: 1,
            fields: [
                { label: "Name", key: "title" },
                { label: "Band", key: "number" },
                { label: "Gelesen", key: "read" },
                { label: "Buch", key: "isBook" },
                { label: "EBook", key: "isEbook" },
                { label: "Video", key: "isVideo" },
                { label: "Verliehen", key: "lend" },
                { label: "Kommentar", key: "comment" },
                { label: "", key: "actions" },
            ],
        };
    },
    watch: {
        rows (newRows, oldRows) {
            const lastPage = Math.ceil(this.rows / this.perPage);
            if (this.currentPage !== lastPage) {
                this.focusLastRow(true);
            } else  if (newRows > oldRows) {
                this.focusLastRow(false, true);
            }
        }
    },
    methods: {
        ...mapActions([
            "updateRow",
            "deleteRow",
            "addRow",
            "selectBook"
        ]),
        async focusLastRow (shouldFocusLastPage, shouldFocusLastRow) {
            await this.$nextTick(function () {
                if (shouldFocusLastPage) {
                    const lastPage = Math.ceil(this.rows / this.perPage);
                    this.currentPage = lastPage;
                    shouldFocusLastRow = true;
                }
            });
            await this.$nextTick(() => {
                if (shouldFocusLastRow) {
                    const rows = this.$el.children[0].children[0].children[1].children;
                    const item = _.last(rows);
                    item.scrollIntoView();
                }
            });
        },
    },
    mounted () {
        this.focusLastRow(true);
    },
});