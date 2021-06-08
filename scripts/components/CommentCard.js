import { appState } from "../AppState.js";

const { Vue, Vuex, _ } = globalThis;
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
            <b-button
                :disabled="enableEdit"
                class="mt-3"
                v-b-modal.series-edit
            >
                Reihe bearbeiten
            </b-button>

            <b-modal
                id="series-edit"
                :title="modalTitle"
                centered
                @show="resetModal"
                @hidden="resetModal"
                @ok="pressOk"
            >

                <div
                    class="d-flex flex-column"
                >
                    <div
                        class="d-flex flex-row align-items-center"
                    >
                        <span>Von:&nbsp;</span>
                        <b-form-input
                            type="number"
                            v-model="from"
                            class="mr-3"
                        />
                        <span>Bis:&nbsp;</span>
                        <b-form-input
                            type="number"
                            v-model="to"
                            class="mr-3"
                        />
                    </div>

                    <b-table
                        small
                        responsive
                        :items="properties"
                        :fields="fields"
                        class="mt-5"
                    >
                    <template #cell(write)="row">
                        <b-form-checkbox
                            v-model="row.item.write"
                        />
                    </template>
                    <template #cell(value)="row">
                        <template v-if="row.item.propertyType === 'text'">
                            <b-form-input
                                type="text"
                                v-model="row.item.value"
                                v-on:change="selectRow(row)"
                            />
                        </template>
                        <template v-else>
                            <b-form-checkbox
                                v-model="row.item.value"
                                v-on:change="selectRow(row)"
                            />
                        </template>
                    </template>
                    </b-table>
                </div>
            </b-modal>
        </b-card>
    `,
    props: [ ],
    computed: {
        ...mapState([
            "currentBook",
        ]),
        enableEdit () {
            return this.currentBook.title === "-";
        },
        modalTitle () {
            return `${this.currentBook.title} bearbeiten...`;
        }
    },
    data () {
        return {
            fields: [
                { label: "Überschreiben?", key: "write" },
                { label: "Eigenschaft", key: "propertyLabel" },
                { label: "Wert", key: "value" },
            ],
            defaultProperties: [
                { write: false, property: "title", propertyLabel: "Name", value: "", propertyType: "text" },
                { write: false, property: "read", propertyLabel: "Gelesen", value: false, propertyType: "boolean" },
                { write: false, property: "isBook", propertyLabel: "Buch", value: false, propertyType: "boolean" },
                { write: false, property: "isEbook", propertyLabel: "EBook", value: false, propertyType: "boolean" },
                { write: false, property: "isVideo", propertyLabel: "Video", value: false, propertyType: "boolean" },
                { write: false, property: "lend", propertyLabel: "Verliehen", value: false, propertyType: "boolean" },
            ],
            properties: [],
            from: 0,
            to: 100,
        };
    },
    methods: {
        ...mapActions([
            "updateBook",
            "updateMultipleRows"
        ]),
        resetModal () {
            this.from = 0;
            this.to = 100;
            this.properties = _.cloneDeep(this.defaultProperties);
        },
        selectRow (row) {
            row.item.write = true;
        },
        pressOk () {
            const data = {
                from: this.from,
                to: this.to,
                bookTitle: this.currentBook.title,
            };

            // only positive ranges are supported
            if (data.from > data.to) {
                return;
            }

            this.properties.forEach((row) => {
                if (!row.write) {
                    return;
                }
                data[row.property] = row.value;
            });

            this.updateMultipleRows(data);
        },
    }
});