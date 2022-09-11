function togglePanel(el) {

    var thisId = el.parentNode.parentNode;
    var panelSection = document.querySelector(`.${thisId.classList[0]} .fish_variation_cont`);

    if (panelSection.style.display != "none") {
        panelSection.style.display = "none"
        el.innerText = "+";

    } else {
        panelSection.style.display = "block";
        el.innerText = "-";
    }
}

function addSidesToLocal(el, fish) {
    var value = el.innerText == "1/2" ? "0.5 " : "1 ";
    if (localStorage.getItem("fish") == null) {
        var local = value;
        localStorage.setItem(`${fish}`, local);
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