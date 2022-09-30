function done() {

    // create pdf by creating the html first and then convert using the function below
    // gitlink: https://github.com/eKoopmans/html2pdf.js

    // do salmon
    var local = window.localStorage;
    var salmon = [];
    for (var i = 0; local.length; i ++) {
        if (window.localStorage.key(i) != null){
            
            salmon.push({
                type: window.localStorage.key(i),
                qty: window.localStorage.getItem(window.localStorage.key(i))
            });
            console.log(window.localStorage.key(i));
            console.log("Salmon = ", salmon);
        }
        else 
            return;
    }
    


    var element = document.getElementById('element-to-print');
    //can even build it in js FUCK YES!!!!
    // must do the styling inline
    
    // var element = '<table style="color: red">' +
    // '<thead>    <th>fish</th>    <th>to</th>    <th>save</th>    <th>for</th>    <th>AO</th></thead>' +
    // '<tbody>    <tr>        <td>salmon</td>        <td>bass</td><td>Trout</td><td>Halibut</td><td>shit</td> ' +
    // '    </tr>    <tr>        <td>salmon</td>        <td>bass</td>        <td>Trout</td>        <td>Halibut</td>' +
    // '        <td>shit</td>    </tr>    <tr>        <td>salmon</td>        <td>bass</td>        <td>Trout</td>        <td>Halibut</td> '+
    // '        <td>shit</td>    </tr>    <tr>        <td>salmon</td>        <td>bass</td>        <td>Trout</td>        <td>Halibut</td> ' +
    // '        <td>shit</td>    </tr>                  </tbody></table>';

    // remember to name and date pdfs

    //html2pdf(element);
}

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

function closeThisPanel(fishId) {
    document.getElementById(`${fishId}_cont`).style.display = "none";
    console.log("inner = ", fishId);

    var sideListElSelected = document.querySelectorAll(".sidebar_selected");
    var el;
    for (var i = 0; i < sideListElSelected.length; i++) {
        var selected = sideListElSelected[i].innerText.toLowerCase();
        var cleanFish = fishId.replaceAll("_", " ");
        if (selected == cleanFish) {
            el = sideListElSelected[i];
        }
    }

    var p = el.childNodes[1];
    if (!el.classList.contains("sidebar_selected")) {
        el.classList.add("sidebar_selected");
        p.classList.replace("fa-caret-down", "fa-caret-right");
        //el.className.replace("fa-caret-down", "fa-caret-right");
    } else {
        el.classList.remove("sidebar_selected");
        p.classList.replace("fa-caret-right", "fa-caret-down");
    }
}

// plan out how this will save properly
function selectFish(el) {
    // add selected class to anchor
    var fishId = el.innerText.toLowerCase().replaceAll(" ", "");
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
    var fishCont = document.getElementById(`${fishId}_cont`);

    if (fishCont.style.display == "flex")
        fishCont.style.display = "none";
    else
        fishCont.style.display = "flex";

    //scroll to position  
          
}

function addSelectionToLocal(fish, value) {
    var selectionType;

    // find fish by removing the name from any extra information
    var fishName = fish.split("_")[0];
    switch (fishName) {
        // find type and other information
        case "salmon":
            selectionType = document.getElementById("salmon_type_select").value;
            fish = fish + "_" + selectionType;
            break;
        case "cod":
            selectionType = document.getElementById("cod_type_select").value;
            fish = fish + "_" + selectionType;
            break;
        case "counts":
            var typeOFish = document.getElementById("counts_fish").value;
            var restaurant = document.getElementById("counts_custom_rest").value != "" ? document.getElementById("counts_custom_rest").value : document.getElementById("counts_cust").value
            selectionType = document.getElementById("counts_type_select").value;
            fish = typeOFish + fish + "_" + selectionType;
            value = value + "-" + restaurant.replaceAll(" ", "_");

            document.getElementById("counts_custom_rest").value = ""
            break;
        case "hake":
            selectionType = document.getElementById("hake_type_select").value;
            fish = fish + "_" + selectionType;
            break;
        case "coley":
            selectionType = document.getElementById("coley_type_select").value;
            fish = fish + "_" + selectionType;
            break;
        case "seatrout":
            selectionType = document.getElementById("seatrout_type_select").value;
            fish = fish + "_" + selectionType;
            break;
        case "pollock":
            selectionType = document.getElementById("pollock_type_select").value;
            fish = fish + "_" + selectionType;
            break;
        case "wildbass":
            selectionType = document.getElementById("wildbass_type_select").value;
            fish = fish + "_" + selectionType;
            break;
        case "seaBass":
            selectionType = "";
            break;
        case "seaBassWhole":
            selectionType = document.getElementById("seabass-extra-options").value;
            value = value + "-" + selectionType;
            break;
        case "dorade":
            selectionType = "";
            break;
        case "doradeWhole":
            selectionType = document.getElementById("dorade-extra-options").value;
            value = value + "-" + selectionType;
            break;
        case "brill":
            selectionType = document.getElementById("brill_type_select").value;
            fish = fish + "_" + selectionType;
            break;
        case "fishpie":
            selectionType = document.getElementById("piemix_type").value;
            fish = fish  + "-"+ selectionType;
            break;
        case "squid":
            selectionType = document.getElementById("squid_type").value;
            fish = fish  + "-"+ selectionType;
            break;
        case "octopus":
            selectionType = document.getElementById("octopus_type").value;
            fish = fish  + "-"+ selectionType;
            break;
        case "smoked-haddock":
            selectionType = document.getElementById("smoked-haddock_type_select").value;
            fish = fish  + "_"+ selectionType;
            break;
        case "halibut":
            selectionType = document.getElementById("halibut_type_select").value;
            fish = fish  + "_"+ selectionType;
            break;
        case "monkfish":
            selectionType = document.getElementById("monkfish_type_select").value;
            fish = fish  + "_"+ selectionType;
            break;
        case "lemonsole":
            selectionType = document.getElementById("lemonsole_type_select").value;
            fish = fish  + "_"+ selectionType;
            break;
        case "plaice":
            selectionType = document.getElementById("plaice_type_select").value;
            fish = fish  + "_"+ selectionType;
            break;
        case "mackerel":
            selectionType = document.getElementById("mackerel_type_select").value;
            fish = fish  + "_"+ selectionType;  
            break;
        case "trout":
            selectionType = document.getElementById("trout_type_select").value;
            fish = fish  + "_"+ selectionType;  
            break;
        case "sardines":
            selectionType = document.getElementById("sardines_type_select").value;
            fish = fish  + "_"+ selectionType;  
            break;
        case "shark":
            selectionType = document.getElementById("shark_type_select").value;
            fish = fish  + "_"+ selectionType;
            break;
        case "dovers":
            selectionType = document.getElementById("dovers_type_select").value;
            fish = fish  + "_"+ selectionType;
            break;

    }

    if (localStorage.getItem(fish) == null) {
        var local = value + " ";
        localStorage.setItem(fish, local);
    } else {
        var local = localStorage.getItem(fish);
        local = local.split(" ");
        local += value + " ";

        window.localStorage.setItem(fish, local);
    }

    console.log("Local = ", localStorage);
    //CHANGING THE FISH PASSED IN WILL SAVE THE NEW FISH TO LOCAL STORAGE
    // split the local storage into the array
    //localStorage.salmon.trim().split(",");
}

function addPortionsToLocal(fish, value) {
    
    var spec = document.getElementById(`${fish}_portion_spec`).value;
    if (fish != "mackerel") {
        var porSize = document.getElementById(`${fish}_portion_weight`).value
        fish = fish + "_" + porSize;
    }
    
    if (spec != "normal")
        value = value + "-" + spec;

    addSelectionToLocal(fish, value);
}

function addFishToLocal(fish, value) {
    var spec = document.getElementById(`${fish}_portion_spec`).value;    
    
    if (spec != "normal")
        value = value + "-" + spec;

    addSelectionToLocal(fish, value);
}

function addCustomToLocal(inputId) {
    var fish = inputId.split("_")[0];
    var value = document.getElementById(`${inputId}`).value; // add space so there it can be split

    if (inputId == "smoked-haddock_custom" || inputId == "halibut_custom" 
    || inputId == "monkfish_custom" || inputId == "lemonsole_custom_por"
    || inputId == "plaice_custom_por" || inputId == "mackerel_custom"
    || inputId == "trout_custom" || inputId == "sardines_custom"
    || inputId == "shark_custom" || inputId == "tuna_custom" 
    || inputId == "sword_custom" || inputId == "squid_custom"
    || inputId == "octopus_custom") {
        value = value + "k";
    }
    
    addSelectionToLocal(fish, value);
    document.getElementById(`${inputId}`).value = "";
}

function addCustomPortions(inputId) {
    var fish = inputId.split("_")[0];

    var value = document.getElementById(`${fish}_custom_por`).value;
    var spec = document.getElementById(`${fish}_portion_spec`).value;
    var porSize = document.getElementById(`${fish}_portion_weight`).value

    fish = fish + "_" + porSize;
    if (spec != "normal")
        value = value + "-" + spec;

    document.getElementById(`${inputId}`).value = "";
    addSelectionToLocal(fish, value);
}

function addCustomFish(inputId) {
    var fish = inputId.split("_")[0];

    var spec = document.getElementById(`${fish}_portion_spec`).value;
    var value = document.getElementById(`${inputId}`).value;

    if (inputId == "sardines_custom" || inputId == "dovers_custom")
        value = value + "k";
    
    if (spec != "normal")
        value = value + "-" + spec;   

    document.getElementById(`${inputId}`).value = "";
    addSelectionToLocal(fish, value);

}