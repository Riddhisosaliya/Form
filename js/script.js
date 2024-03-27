// Function to add a row
function addRow(tableId) {
    var table = document.getElementById(tableId);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount - 1); // Insert before the last "Add more rows" row

    // Get the column types from the first row
    var colTypes = [];
    var firstRow = table.rows[1]; // Assuming the first row has the column types
    for (var i = 0; i < firstRow.cells.length; i++) {
        var inputType = getInputType(firstRow.cells[i]);
        colTypes.push(inputType);
    }

    // Add cells with input fields based on column types
    for (var j = 0; j < colTypes.length; j++) {
        var cell = row.insertCell(j);
        var input = createInput(colTypes[j]);
        cell.appendChild(input);
    }

    // Replace existing button with remove button
    var removeCell = row.cells[colTypes.length - 1]; // Last cell
    var removeButton = document.createElement("button");
    removeButton.innerHTML = "-";
    removeButton.className = "form_btns";
    removeButton.onclick = function () {
        removeRow(this);
    };
    removeCell.innerHTML = ''; // Clear existing content
    removeCell.appendChild(removeButton);

    // Save the table HTML to local storage
    saveTableToLocalStorage(tableId);
}

// Helper function to get the input type based on cell content
function getInputType(cell) {
    var content = cell.innerHTML.toLowerCase();
    if (content.includes("month")) {
        return "month";
    } else if (content.includes("select")) {
        return "select";
    } else {
        return "text";
    }
}

// Helper function to create input elements based on type
function createInput(type) {
    var input;
    switch (type) {
        case "month":
            input = document.createElement("input");
            input.type = "month";
            break;
        case "select":
            input = document.createElement("select");
            var option = document.createElement("option");
            option.text = "India";
            input.add(option);
            break;
        case "button":
            input = document.createElement("button");
            input.innerText = "-";
            input.className = "form_btns";
            input.onclick = function () {
                removeRow(this);
            };
            break;
        default:
            input = document.createElement("input");
            input.type = "text";
            break;
    }
    input.className = "form_lable"; // Apply your class here
    return input;
}


// Helper function to save table HTML to local storage
function saveTableToLocalStorage(tableId) {
    var table = document.getElementById(tableId);
    localStorage.setItem(tableId, table.innerHTML);
}

// Function to remove a row
function removeRow(button, tableId) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    saveTableToLocalStorage(tableId); // Save table after removing row
}

// On page load, check if there is saved table data and restore it
function restoreTableFromLocalStorage(tableId) {
    var table = document.getElementById(tableId);
    var savedTable = localStorage.getItem(tableId);
    if (savedTable) {
        table.innerHTML = savedTable;
        // Reattach event handlers for remove buttons
        var removeButtons = table.getElementsByClassName("form_btns");
        for (var i = 0; i < removeButtons.length; i++) {
            removeButtons[i].onclick = function () {
                removeRow(this, tableId);
            };
        }
    }
}

// Call the restore function when the page finishes loading
window.addEventListener('load', function () {
    restoreTableFromLocalStorage("travelTable1");
    restoreTableFromLocalStorage("travelTable2");
    restoreTableFromLocalStorage("travelTable3");
    restoreTableFromLocalStorage("travelTable4");
    restoreTableFromLocalStorage("travelTable5");
});