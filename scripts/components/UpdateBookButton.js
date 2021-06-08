const { Vue, Vuex } = globalThis;
const { mapActions, mapState } = Vuex;

export const UpdateBookButton = Vue.component("update-book-button", {
    template: `
        <div>
            <b-button
                :disabled="enableEdit"
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
                        <span>Von:&nbsp;&nbsp;</span>
                        <b-form-input
                            type="number"
                            v-model="from"
                            class="mr-3"
                        />
                        <span>Bis:&nbsp;&nbsp;</span>
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
        </div>
    `,
    props: [ "title" ],
    computed: {
        enableEdit () {
            return this.title === "-";
        },
        modalTitle () {
            return `${this.title} bearbeiten...`;
        },
    },
    data () {
        return {
            fields: [
                { label: "Überschreiben?", key: "write" },
                { label: "Eigenschaft", key: "propertyLabel" },
                { label: "Wert", key: "value" },
            ],
            defaultProperties: [
//                { write: false, property: "title", propertyLabel: "Name", value: "", propertyType: "text" },
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
                from: parseInt(this.from.toString(), 10),
                to: parseInt(this.to.toString(), 10),
                bookTitle: this.title,
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