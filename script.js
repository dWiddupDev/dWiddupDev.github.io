function done() {
    document.getElementById("fishSelectionCont").style.display = "none";
    document.getElementById("elementsToPrint").style.display = "block";

    // create pdf by creating the html first and then convert using the function below
    // gitlink: https://github.com/eKoopmans/html2pdf.js

    // do salmon
    var local = window.localStorage;
    var salmon = [];
    var miscFish = [];
    var seabass = [];
    var counts = [];
    for (var i = 0; local.length; i ++) {
        var fishType = window.localStorage.key(i);

        if (fishType != null){
            var orders = window.localStorage.getItem(fishType)
            var typeObj = {
                type: fishType,
                qty: orders
            }           
            
            if (fishType.includes("salmon"))       
                salmon.push(typeObj);
            
            else if (fishType.includes("seaBass"))   
                seabass.push(typeObj);
                
            else if (fishType.split("_")[1].includes("counts"))
                counts.push(typeObj);
                
            else   
                miscFish.push(typeObj);
                    
            console.log("Salmon = ", salmon);
            console.log("seabass = ", seabass);
            console.log("counts = ", counts);
            console.log("miscFish = ", miscFish);
            
        }
        else 
            break;
    }

    printSalmon(salmon);
    printSeabass(seabass);
    printCounts(counts);
    // printMisc(miscFish);
}

function printSalmon(salmonObj) {
    var element = document.getElementById("element-to-print-salmon");    

    element.innerHTML = "<h1>Salmon</h1>";
    var fishAndOrders = "";

    var whole = [];
    var fsp = [];
    var fp = [];

    for (var i = 0; i < salmonObj.length; i ++) {
        if (salmonObj[i].type.includes("whole"))
            whole.push(salmonObj[i]);
        if (salmonObj[i].type.includes("FSP"))
            fsp.push(salmonObj[i]);
        if (salmonObj[i].type.includes("F+P"))
            fp.push(salmonObj[i]);
    }

    // seperate the types into sections
    for (var w = 0; w < whole.length; w++) {
        var type = whole[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }

        fishAndOrders += "<pdfItem>" +
         "<h4>" + type + "</h4>";
        
        var indOrders = whole[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }

    for (var w = 0; w < fsp.length; w++) {
        var type = fsp[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }

        fishAndOrders += "<pdfItem>" +
         "<h4>" + type.replaceAll(",", " ") + "</h4>";
        
        var indOrders = fsp[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }
    // F+P
    for (var w = 0; w < fp.length; w++) {
        var type = fp[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }
        
        fishAndOrders += "<pdfItem>" +
         "<h4>" + type.replaceAll(",", " ") + "</h4>";
        
        var indOrders = fp[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }

    element.innerHTML += fishAndOrders;
    fishAndOrders = "";
    var date = new Date().toLocaleDateString();
    html2pdf(element, {
        filename: "salmon_" + date + ".pdf", 
        html2canvas: { scale: 5},
        pagebreak: { mode: 'css', avoid: ['.count_label', 'span', 'h3' ] }
    });
}

function printSeabass(seabassObj) {
    // change to specific element to show in UI
    var element = document.getElementById("element-to-print-seabass");   
    element.innerHTML = "<h1>SeaBass</h1>";

    var fishAndOrders = "";

    var whole = [];
    var xsmall = [];
    var small = [];
    var medium = [];
    var large = [];
    var xlarge = [];

    for (var i = 0; i < seabassObj.length; i ++) {
        if (seabassObj[i].type.includes("Whole"))
            whole.push(seabassObj[i]);
        if (seabassObj[i].type.includes("<400"))
            xsmall.push(seabassObj[i]);
        if (seabassObj[i].type.includes("4-6"))
            small.push(seabassObj[i]);
        if (seabassObj[i].type.includes("550"))
            medium.push(seabassObj[i]);
        if (seabassObj[i].type.includes("6-8"))
            large.push(seabassObj[i]);
        if (seabassObj[i].type.includes("800+"))
            xlarge.push(seabassObj[i]);
    }

    // seperate the types into sections
    for (var w = 0; w < whole.length; w++) {
        var type = whole[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }

        fishAndOrders += "<pdfItem>" +
         "<h4>" + type + "</h4>";
        
        var indOrders = whole[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }

    for (var w = 0; w < xsmall.length; w++) {
        var type = xsmall[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }

        fishAndOrders += "<pdfItem>" +
         "<h4>" + type.replaceAll(",", " ") + "</h4>";
        
        var indOrders = xsmall[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }
    // F+P
    for (var w = 0; w < small.length; w++) {
        var type = small[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }
        
        fishAndOrders += "<pdfItem>" +
         "<h4>" + type.replaceAll(",", " ") + "</h4>";
        
        var indOrders = small[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }

    for (var w = 0; w < medium.length; w++) {
        var type = medium[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }
        
        fishAndOrders += "<pdfItem>" +
         "<h4>" + type.replaceAll(",", " ") + "</h4>";
        
        var indOrders = medium[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }

    for (var w = 0; w < large.length; w++) {
        var type = large[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }
        
        fishAndOrders += "<pdfItem>" +
         "<h4>" + type.replaceAll(",", " ") + "</h4>";
        
        var indOrders = large[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }

    for (var w = 0; w < xlarge.length; w++) {
        var type = xlarge[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }
        
        fishAndOrders += "<pdfItem>" +
         "<h4>" + type.replaceAll(",", " ") + "</h4>";
        
        var indOrders = xlarge[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }

    element.innerHTML += fishAndOrders;
    fishAndOrders = "";

    var date = new Date().toLocaleDateString();
    html2pdf(element, {
        filename: "seabass_" + date + ".pdf", 
        html2canvas: { scale: 5},
        pagebreak: { mode: 'css', avoid: ['.count_label', 'span', 'h3' ] }
    });
}

function printCounts(countsObj) {

    var element = document.getElementById("element-to-print-counts");   
    element.innerHTML = "<h1>Counts</h1>";

    var fishAndOrders = "";  
    var cod = [];
    var haddock = [];  
    var whiting = [];

    for (var i = 0; i < countsObj.length; i ++) {
        if (countsObj[i].type.includes("cod"))
            cod.push(countsObj[i]);
        if (countsObj[i].type.includes("haddock"))
            haddock.push(countsObj[i]);  
        if (countsObj[i].type.includes("whiting"))
            whiting.push(countsObj[i]);        
    }

    var eightTens = [];
    var tenTwelves = [];
    var twelvesSixteens = [];
    var twenties = [];
    var twentyFives = [];
    var thirties = [];
    var thirtyFives = [];
    var forties = [];
    var fortyfives = [];
    var fifties = [];
    
    for (var i = 0; i < cod.length; i ++) {
        if (cod[i].type.includes("8-10"))
            eightTens.push(cod[i]);
        if (cod[i].type.includes("10-12"))
            tenTwelves.push(cod[i]);
        if (cod[i].type.includes("12-16"))
            twelvesSixteens.push(cod[i]);
        if (cod[i].type.includes("20"))
            twenties.push(cod[i]);
        if (cod[i].type.includes("25"))
            twentyFives.push(cod[i]);
        if (cod[i].type.includes("30"))
            thirties.push(cod[i]);
        if (cod[i].type.includes("35"))
            thirtyFives.push(cod[i]);
        if (cod[i].type.includes("40"))
            forties.push(cod[i]);
        if (cod[i].type.includes("45"))
            fortyfives.push(cod[i]);
        if (cod[i].type.includes("50"))
            fifties.push(cod[i]);
    }

    for (var i = 0; i < haddock.length; i ++) {
        if (haddock[i].type.includes("8-10"))
            eightTens.push(haddock[i]);
        if (haddock[i].type.includes("10-12"))
            tenTwelves.push(haddock[i]);
        if (haddock[i].type.includes("12-16"))
            twelvesSixteens.push(haddock[i]);
        if (haddock[i].type.includes("20"))
            twenties.push(haddock[i]);
        if (haddock[i].type.includes("25"))
            twentyFives.push(haddock[i]);
        if (haddock[i].type.includes("30"))
            thirties.push(haddock[i]);
        if (haddock[i].type.includes("35"))
            thirtyFives.push(haddock[i]);
        if (haddock[i].type.includes("40"))
            forties.push(haddock[i]);
        if (haddock[i].type.includes("45"))
            fortyfives.push(haddock[i]);
        if (haddock[i].type.includes("50"))
            fifties.push(haddock[i]);
    }

    for (var i = 0; i < whiting.length; i ++) {
        if (whiting[i].type.includes("8-10"))
            eightTens.push(whiting[i]);
        if (whiting[i].type.includes("10-12"))
            tenTwelves.push(whiting[i]);
        if (whiting[i].type.includes("12-16"))
            twelvesSixteens.push(whiting[i]);
        if (whiting[i].type.includes("20"))
            twenties.push(whiting[i]);
        if (whiting[i].type.includes("25"))
            twentyFives.push(whiting[i]);
        if (whiting[i].type.includes("30"))
            thirties.push(whiting[i]);
        if (whiting[i].type.includes("35"))
            thirtyFives.push(whiting[i]);
        if (whiting[i].type.includes("40"))
            forties.push(whiting[i]);
        if (whiting[i].type.includes("45"))
            fortyfives.push(whiting[i]);
        if (whiting[i].type.includes("50"))
            fifties.push(whiting[i]);
    }

    console.log("cod = ", cod);
    console.log("haddock = ", haddock);
    console.log("8/10 = ", eightTens);

    var countSizes = [eightTens, tenTwelves, twelvesSixteens, twenties, twentyFives, thirties, thirtyFives, forties, fortyfives, fifties];
    // seperate the types into sections
    for (var c = 0; c < countSizes.length; c++) {

        for (var w = 0; w < countSizes[c].length; w++) {
            var type = countSizes[c][w].type.split("_");
            var fish = type[0];
            var size = type[2];
            type = `${fish} ${size}`;                
    
            fishAndOrders += "<pdfItem>";
            fishAndOrders += `<h3>${fish} ${size}s</h3>`;
            
            var indOrders = countSizes[c][w].qty.trim().split(",");
    
            fishAndOrders += "<values>";
            for (var o = 0; o < indOrders.length; o++) {
                var value = indOrders[o].split("-")[0];
                var rest = indOrders[o].split("-")[1].replaceAll("_", " ");
    
                fishAndOrders += '<div class="count_label">' +
                `<span>${rest}</span>` +
                `<span>${value} x ${size}s</span>` +
                '</div>';
            }
            fishAndOrders += "</values>";
            fishAndOrders += "</pdfItem>";
        }
    }    

    element.innerHTML += fishAndOrders;
    fishAndOrders = "";

    var date = new Date().toLocaleDateString();
    html2pdf(element, {
        filename: "counts_" + date + ".pdf", 
        html2canvas: { scale: 5}, 
        pagebreak: { mode: 'css', avoid: ['.count_label', 'span', 'h3' ] }
    });
}

function printMisc(miscObj) {
    var date = new Date().toLocaleDateString();
    html2pdf(element, {filename: "miscFish-" + date + ".pdf", html2canvas: { scale: 5}});
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
            fish = typeOFish + "_" + fish + "_" + selectionType;
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
            var size = document.getElementById("seaBass_portion_weight").value;
            fish = fish + "_" + size;
            if (selectionType != "normal")
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

    document.getElementById("itemAddedText").innerHTML = value.replaceAll("_", " ").replaceAll("-", " ")  + "<br /> " + fish.replaceAll("_", " ");
    document.getElementById("selectSuccess").style.display = "flex";

    setTimeout(function() {
        document.getElementById("selectSuccess").style.display = "none";
    }, 2500);
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