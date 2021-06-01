import {  } from "./Constants.js";
import { getItems, loadFromLocalStorage, saveItems, setItems } from "./ItemManager.js";
import { indexByProperty } from "./utils.js";
import { getIgnoreDirtyState, setDirtyState, setIgnoreDirtyState } from "./DirtyState.js";

const { Vuex, _ } = globalThis;

loadFromLocalStorage();

export const appState = new Vuex.Store({
    state: {
        entries: getItems(),
        ignoreDirtyState: getIgnoreDirtyState(),
    },
    mutations: {
        updateAll (state) {
            state.entries = getItems();
        },
        addRow (state) {
            const lastEntry = _.last(state.entries) || {};

            const newEntry = {
                id: lastEntry.id + 1 || 1,
            }
            state.entries.push(newEntry);
            setDirtyState(true);
        },
        deleteRow (state, param) {
            const index = indexByProperty(state.entries, "id", param.id);
            if (index > -1) {
                state.entries.splice(index, 1);
                setDirtyState(true);
            }
        },
        updateRow (state, param) {
            const index = indexByProperty(state.entries, "id", param.id);
            if (index > -1) {
                state.entries[index][param.property] = param.value;
                setDirtyState(true);
            }
        },
        saveItems (state) {
            setItems(_.cloneDeep(state.entries));
            saveItems();
        },
        setIgnoreDirtyState (state, param) {
            state.ignoreDirtyState = param.value;
            setIgnoreDirtyState(param.value);
        }
    },
    actions: {
        updateAll (context) {
            context.commit('updateAll');
        },
        addRow (context) {
            context.commit('addRow');
            context.commit('saveItems');
            context.commit('updateAll');
        },
        deleteRow (context, id) {
            context.commit('deleteRow', { id });
            context.commit('saveItems');
            context.commit('updateAll');
        },
        updateRow (context, param) {
            context.commit('updateRow', param);
            context.commit('saveItems');
            context.commit('updateAll');
        },
        setIgnoreDirtyState (context, value) {
            context.commit('setIgnoreDirtyState', { value });
        },
    },
});
globalThis.AppState = appState;

// calculate once
appState.commit('updateAll');
