import { SORT_DIR } from "./Constants.js";
import { getGroups, getItems, loadFromLocalStorage, saveGroups, saveItems, setGroups, setItems } from "./ItemManager.js";
import { indexByProperty, superSort } from "./utils.js";
import { getIgnoreDirtyState, setIgnoreDirtyState } from "./DirtyState.js";

const { Vuex, _ } = globalThis;
const { ThemeHandler } = globalThis.darkModeToggle;

loadFromLocalStorage();

export const appState = new Vuex.Store({
    state: {
        entries: getItems(),
        books: getGroups(),
        ignoreDirtyState: getIgnoreDirtyState(),
        currentBook: {
            title: "-",
            comment: null
        },
        searchString : "",
        sortBy: "",
        sortDir: SORT_DIR.asc,
    },
    mutations: {
        updateAll (state) {
            state.entries = getItems();
            state.books = getGroups();

            superSort(state.entries, state.sortBy || "id", state.sortDir);
        },
        addRow (state, param = {}) {
            const lastEntry = _.last(state.entries) || {};

            const newEntry = {
                id: lastEntry.id + 1 || 1,
                title: "",
                number: 0,
                read: false,
                isBook: true,
                isEBook: true,
                isVideo: false,
                lend: false,
                comment: "",
            }
            Object.keys(newEntry).forEach((prop) => {
                if (param.hasOwnProperty(prop) && prop !== "id") {
                    newEntry[prop] = param[prop];
                }
            })
            state.entries.push(newEntry);
        },
        deleteRow (state, param) {
            const index = indexByProperty(state.entries, "id", param.id);
            if (index > -1) {
                state.entries.splice(index, 1);
            }
        },
        updateRow (state, param) {
            const index = indexByProperty(state.entries, "id", param.id);
            if (index > -1) {
                state.entries[index][param.property] = param.value;
            }
        },
        saveItems (state) {
            setItems(_.cloneDeep(state.entries));
            saveItems();
        },
        setIgnoreDirtyState (state, param) {
            state.ignoreDirtyState = param.value;
            setIgnoreDirtyState(param.value);
        },
        selectBook (state, param) {
            // empty book
            if (!param.id && !state.books[param.id]) {
                const book = {
                    title: "-",
                    comment: null
                };
                state.currentBook = book
            // new book
            } else if (!state.books[param.id]) {
                state.books[param.id] = {
                    title: param.id,
                    comment: null
                };
                state.currentBook = state.books[param.id];
            // existing book
            } else {
                state.currentBook = state.books[param.id];
            }
        },
        updateBook (state, param) {
            if (!param.id || !state.books[param.id]) {
                return;
            }
            state.books[param.id].comment = param.comment;
        },
        saveBooks (state) {
            setGroups(_.cloneDeep(state.books));
            saveGroups();
        },
        updateSearchString (state, param) {
            state.searchString = param.string;
        },
        updateSort (state, param) {
            state.sortBy = param.by;
            state.sortDir = param.dir;
        },
        updateRowByBook (state, param) {
            const properties = ["title", "read", "isBook", "isEbook", "isVideo", "lend"];

            const index = state.entries.findIndex((item) => {
                return item.title === param.bookTitle && item.number == param.number;
            });

            if (index < 0) {
                return;
            }

            properties.forEach((prop) => {
                if (param.hasOwnProperty(prop)) {
                    console.log(prop)
                    state.entries[index][prop] = param[prop];
                }
            })
        }
    },
    actions: {
        updateAll (context) {
            context.commit("updateAll");
        },
        addRow (context, param) {
            context.commit("addRow", param);
            context.commit("saveItems");
            context.commit("updateAll");
        },
        deleteRow (context, id) {
            context.commit("deleteRow", { id });
            context.commit("saveItems");
            context.commit("updateAll");
        },
        updateRow (context, param) {
            context.commit("updateRow", param);
            context.commit("saveItems");
            context.commit("updateAll");
        },
        selectBook (context, id) {
            context.commit("selectBook", { id });
        },
        updateBook (context, param) {
            context.commit("updateBook", param);
            context.commit("saveBooks");
        },
        updateSearchString (context, string) {
            context.commit("updateSearchString", { string });
        },
        updateSort (context, param) {
            context.commit("updateSort", param);
            context.commit("updateAll");
        },
        setIgnoreDirtyState (context, value) {
            context.commit("setIgnoreDirtyState", { value });
        },
        updateMultipleRows (context, param) {
            for (let i = param.from; i <= param.to; i++) {
                param.number = i;
                context.commit("updateRowByBook", param);
            }
            context.commit("saveItems");
            context.commit("updateAll");
        },
        addMultipleRows (context, param) {
            for (let i = param.from; i <= param.to; i++) {
                param.number = i;
                context.commit("addRow", param);
            }
            context.commit("saveItems");
            context.commit("updateAll");
        }
    },
});
globalThis.AppState = appState;

// update appState
appState.commit("updateAll");
appState.commit("setTheme", { theme: ThemeHandler.getTheme() });

ThemeHandler.on("themeLoaded", (evt) => {
    appState.commit("setTheme", { theme: evt.theme });
});
