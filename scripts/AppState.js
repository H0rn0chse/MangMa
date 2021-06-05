import {  } from "./Constants.js";
import { getGroups, getItems, loadFromLocalStorage, saveGroups, saveItems, setGroups, setItems } from "./ItemManager.js";
import { indexByProperty } from "./utils.js";
import { getIgnoreDirtyState, setIgnoreDirtyState } from "./DirtyState.js";

const { Vuex, _ } = globalThis;

loadFromLocalStorage();

export const appState = new Vuex.Store({
    state: {
        entries: getItems(),
        books: getGroups(),
        ignoreDirtyState: getIgnoreDirtyState(),
        currentBook: {
            title: "-",
            comment: null
        }
    },
    mutations: {
        updateAll (state) {
            state.entries = getItems();
            state.books = getGroups();
        },
        addRow (state) {
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
            if (!state.books[param.id]) {
                state.books[param.id] = {
                    title: param.id,
                    comment: null
                };
            }
            state.currentBook = state.books[param.id];
        },
        updateBook (state, param) {
            state.books[param.id].comment = param.comment;
        },
        saveBooks (state) {
            setGroups(_.cloneDeep(state.books));
            saveGroups();
        }
    },
    actions: {
        updateAll (context) {
            context.commit("updateAll");
        },
        addRow (context) {
            context.commit("addRow");
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
        setIgnoreDirtyState (context, value) {
            context.commit("setIgnoreDirtyState", { value });
        },
    },
});
globalThis.AppState = appState;

// calculate once
appState.commit("updateAll");
