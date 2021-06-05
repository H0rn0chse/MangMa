import { setDirtyState } from "./DirtyState.js";

var items = [];
var groups = {};

export function loadFromLocalStorage () {
    items = JSON.parse(localStorage.getItem("items")) || [];
    groups = JSON.parse(localStorage.getItem("groups")) || {};
}

export function getItems () {
    return items;
}

export function setItems (newItems){
    items = newItems;
}

export function saveItems () {
    setDirtyState(true);
	localStorage.setItem("items", JSON.stringify(items));
}

export function getGroups () {
    return groups;
}

export function setGroups (newGroups){
    groups = newGroups;
}

export function saveGroups () {
    setDirtyState(true);
	localStorage.setItem("groups", JSON.stringify(groups));
}
