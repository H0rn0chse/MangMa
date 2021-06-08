const { Vue, Vuex } = globalThis;
const { mapActions, mapState } = Vuex;

export const AddBookButton = Vue.component("add-book-button", {
    template: `
        <div>
            <b-button
                v-b-modal.series-add
            >
                Neue Reihe
            </b-button>

            <b-modal
                id="series-add"
                title="Reihe hinzufügen"
                centered
                @show="resetModal"
                @hidden="resetModal"
                @ok="pressOk"
            >

                <div
                    class="d-flex flex-column"
                >
                    <div
                        class="d-flex flex-row align-items-center mb-3"
                    >
                        <span>Name:&nbsp;&nbsp;</span>
                        <b-form-input
                            type="text"
                            v-model="title"
                        />
                    </div>
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
                    <template #cell(value)="row">
                        <template v-if="row.item.propertyType === 'text'">
                            <b-form-input
                                type="text"
                                v-model="row.item.value"
                            />
                        </template>
                        <template v-else>
                            <b-form-checkbox
                                v-model="row.item.value"
                            />
                        </template>
                    </template>
                    </b-table>
                </div>
            </b-modal>
        </div>
    `,
    props: [ ],
    computed: {
        ...mapState([]),
    },
    data () {
        return {
            fields: [
                { label: "Eigenschaft", key: "propertyLabel" },
                { label: "Wert", key: "value" },
            ],
            defaultProperties: [
//                { property: "title", propertyLabel: "Name", value: "", propertyType: "text" },
                { property: "read", propertyLabel: "Gelesen", value: true, propertyType: "boolean" },
                { property: "isBook", propertyLabel: "Buch", value: true, propertyType: "boolean" },
                { property: "isEbook", propertyLabel: "EBook", value: false, propertyType: "boolean" },
                { property: "isVideo", propertyLabel: "Video", value: false, propertyType: "boolean" },
                { property: "lend", propertyLabel: "Verliehen", value: false, propertyType: "boolean" },
            ],
            properties: [],
            title: "",
            from: 0,
            to: 0,
        };
    },
    watch: {},
    methods: {
        ...mapActions([
            "addMultipleRows",
        ]),
        resetModal () {
            this.from = 1;
            this.to = 5;
            this.title = "";
            this.properties = _.cloneDeep(this.defaultProperties);
        },
        pressOk () {
            const data = {
                from: this.from,
                to: this.to,
                title: this.title,
            };

            // only positive ranges are supported
            if (data.from > data.to) {
                return;
            }

            this.properties.forEach((row) => {
                data[row.property] = row.value;
            });

            this.addMultipleRows(data);
        },
    },
});