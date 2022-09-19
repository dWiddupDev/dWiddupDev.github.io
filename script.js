function togglePanel(el) {

    var thisId = el.parentNode.parentNode;
    var panelSection = document.querySelector(`.${thisId.classList[0]} .fish_variation_cont`);

    if (panelSection.style.display != "none") {
        panelSection.style.display = "none"
        el.innerText = "+";

    } else {
        panelSection.style.display = "flex";
        el.innerText = "-";
    }
}

function selectFish(el) {
    // add selected class to anchor
    var fishId = el.innerText.toLowerCase().replaceAll("- ", "").replaceAll(" ", "_");
    console.log("inner = ", fishId);
    var p = el.childNodes[1];
    if (!el.classList.contains("sidebar_selected")) {
        el.classList.add("sidebar_selected");
        p.classList.replace("fa-caret-down", "fa-caret-right");
        //el.className.replace("fa-caret-down", "fa-caret-right");
    } else {
        el.classList.remove("sidebar_selected");
        p.classList.replace("fa-caret-right", "fa-caret-down");
    }

    // show selection options
}

function addSelectionToLocal(fish, value) {
    if (localStorage.getItem(fish) == null) {
        var local = value;
        localStorage.setItem(fish, local);
    } else {
        var local = localStorage.getItem(fish);
        local = local.split(" ");
        local += value;

        window.localStorage.setItem(fish, local);
    }

    //CHANGING THE FISH PASSED IN WILL SAVE THE NEW FISH TO LOCAL STORAGE
    // split the local storage into the array
    //localStorage.salmon.trim().split(",");
}

function addSidesToLocal(count, fish) {
    var value = count + " "; // add space to split

    addSelectionToLocal(fish, value);
}

function customAddSides(inputId, fish) {
    var value = document.getElementById(`${inputId}`).value + " "; // add space so there it can be split
    addSelectionToLocal(fish, value);
    document.getElementById(`${inputId}`).value = "";
}