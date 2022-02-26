let dirty = false;
let ignore = null;
let ignoreCheckbox = null;

export function initIgnoreDirtyState (elem) {
    ignoreCheckbox = elem;
    ignore = JSON.parse(localStorage.getItem("ignoreDirtyState")) ?? true;
    ignoreCheckbox.checked = ignore;

    ignoreCheckbox.addEventListener("change", onIgnoreDirtyStateChange)
}

function onIgnoreDirtyStateChange () {
    ignore = ignoreCheckbox.checked;
    localStorage.setItem("ignoreDirtyState", ignore.toString());
}

export function getDirtyState () {
    return !ignore && dirty;
}

export function setDirtyState (value) {
    dirty = value;
}

export function getIgnoreDirtyState() {
    if (ignore === null) {
        ignore = JSON.parse(localStorage.getItem("ignoreDirtyState")) ?? true;
    }
    return ignore;
}
export function setIgnoreDirtyState(value) {
    ignore = !!value;
    localStorage.setItem("ignoreDirtyState", ignore.toString());
}