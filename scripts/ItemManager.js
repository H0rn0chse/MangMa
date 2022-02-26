import { setDirtyState } from "./DirtyState.js";

var items = [];
var groups = {};

export function loadFromLocalStorage () {
    items = JSON.parse(localStorage.getItem("items_mangma")) || [];
    groups = JSON.parse(localStorage.getItem("groups_mangma")) || {};
}

export function getItems () {
    return items;
}

export function setItems (newItems){
    items = newItems;
}

export function saveItems () {
    setDirtyState(true);
	localStorage.setItem("items_mangma", JSON.stringify(items));
}

export function getGroups () {
    return groups;
}

export function setGroups (newGroups){
    groups = newGroups;
}

export function saveGroups () {
    setDirtyState(true);
	localStorage.setItem("groups_mangma", JSON.stringify(groups));
}
