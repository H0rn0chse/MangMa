import { setDirtyState } from "./DirtyState.js";
import { getGroups, getItems } from "./ItemManager.js";

export function exportEntries () {
    const data = {
        items: getItems(),
        groups: getGroups()
    };
	const text = JSON.stringify(data);
    download(text, 'MangMa.json', 'text/plain');
    setDirtyState(false)
}

function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
