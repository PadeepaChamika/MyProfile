/*Item Validation----------------------------------------------*/
const itemId = /^(I00-)[0-9]{3}$/;
const itemName = /^[A-z ]{5,20}$/;
const itemQty = /^[0-9]{1,}$/;
const unitPrice = /[0-9]{1,}[.][0-9]{2}$/;

/*Save Item------------------------------------------*/

$('#txtItemId,#txtItemName,#txtQty,#txtUnitPrice').on('keydown', function (etOb) {
    if (etOb.key == "Tab") {
        etOb.preventDefault();
    }
});

$('#txtItemId,#txtItemName,#txtQty,#txtUnitPrice').on('blur', function () {
    formValids();
});

$("#txtItemId").on('keyup', function (etOb) {
    setBtn();
    if (etOb.key == "Enter") {
        checkIfValids();
    }
});

$("#txtItemName").on('keyup', function (etOb) {
    setBtn();
    if (etOb.key == "Enter") {
        checkIfValids();
    }
});

$("#txtQty").on('keyup', function (etOb) {
    setBtn();
    if (etOb.key == "Enter") {
        checkIfValids();
    }
});

$("#txtUnitPrice").on('keyup', function (etOb) {
    setBtn();
    if (etOb.key == "Enter") {
        checkIfValids();
    }
});

function formValids() {
    var iId = $("#txtItemId").val();
    $("#txtItemId").css('border', '2px solid green');
    $("#lblItemId").text("");
    if (itemId.test(iId)) {
        var iName = $("#txtItemName").val();
        if (itemName.test(iName)) {
            $("#txtItemName").css('border', '2px solid green');
            $("#lblItemName").text("");
            var iQty = $("#txtQty").val();
            if (itemQty.test(iQty)) {
                $("#txtQty").css('border', '2px solid green');
                $("#lblItemQty").text("");
                var iUnitPrice = $("#txtUnitPrice").val();
                if (unitPrice.test(iUnitPrice)) {
                    $("#txtUnitPrice").css('border', '2px solid green');
                    $("#lblItemUnitPrice").text("");
                    return true;
                } else {
                    $("#txtUnitPrice").css('border', '2px solid red');
                    $("#lblItemUnitPrice").text("Unit Price is a required field : Pattern 100.00");
                    return false;
                }
            } else {
                $("#txtQty").css('border', '2px solid red');
                $("#lblItemQty").text("Qty is a required field : Pattern 23");
                return false;
            }
        } else {
            $("#txtItemName").css('border', '2px solid red');
            $("#lblItemName").text("Item Name is a required field : Pattern samba");
            return false;
        }
    } else {
        $("#txtItemId").css('border', '2px solid red');
        $("#lblItemId").text("Item ID is a required field : Pattern I00-001");
    }

}

function checkIfValids() {
    var iId = $("#txtItemId").val();
    if (itemId.test(iId)) {
        $("#txtItemName").focus();
        var iName = $("#txtItemName").val();
        if (itemName.test(iName)) {
            $("#txtQty").focus();
            var iQty = $("#txtQty").val();
            if (itemQty.test(iQty)) {
                $("#txtUnitPrice").focus();
                var iUnitPrice = $("#txtUnitPrice").val();
                if (unitPrice.test(iUnitPrice)) {
                    let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                        saveItem();
                        clearAllSaveItemFields();
                    }
                } else {
                    $("#txtUnitPrice").focus();
                }
            } else {
                $("#txtQty").focus();
            }
        } else {
            $("#txtItemName").focus();
        }
    } else {
        $("#txtItemId").focus();
    }
}

function setBtn() {
    let bt = formValids();
    console.log(bt);
    if (bt) {
        $("#btnSaveItem").prop('disable', false);
    } else {
        $("#btnSaveItem").prop('disable', true);
    }
}

$('#btnSaveItem').click(function () {
    checkIfValids();
});

function saveItem() {
    let itemId = $("#txtItemId").val();
    let itemName = $("#txtItemName").val();
    let itemQty = $("#txtQty").val();
    let unitPrice = $("#txtUnitPrice").val();

    let itemDTO = new ItemDTO(itemId, itemName, itemQty, unitPrice);

    itemDB.push(itemDTO);
    loadAllItems();
    clearAllSaveItemFields();

    $("#itemTable>tr").on('dblclick', function () {
        var itId = $(this).children(":eq(0)").text();
        for (var i = 0; i < itemDB.length; i++) {
            if (itemDB[i].getId() == itId) {
                let res = confirm("Do you want to delete this Item?");
                if(res){
                    itemDB.splice(i, 1);
                }
            }
        }
        loadAllItems();
    });
}

function loadAllItems() {
    $("#itemTable").empty();
    for (var i of itemDB) {
        let row = `<tr><td>${i.getId()}</td><td>${i.getName()}</td><td>${i.getQty()}</td><td>${i.getUnitPrice()}</td></tr>`;
        $("#itemTable").append(row);
    }
}

function clearAllSaveItemFields(){
    $("#txtItemId").val("");
    $("#txtItemName").val("");
    $("#txtQty").val("");
    $("#txtUnitPrice").val("");

    $("#btnSaveItem").prop('disabled', true);
}

/*Update Item---------------------------------*/
$("#txtUItemId,#txtUItemName,#txtUItemQty,#txtUItemUnitPrice").on('keydown' , function (e) {
    if(e.key == "Tab"){
        e.preventDefault();
    }
});

$("#txtUItemId").on('keyup', function (e) {
    let searchId = $("#txtUItemId").val();
    if(itemId.test(searchId)){
        $("#txtUItemId").css('border', '2px solid green');
        $("#lblUItemId").text("");
        if(e.key == "Enter"){
            let item = searchItem(searchId);
            if(item){
                $("#txtUItemName").val(item.getName());
                $("#txtUItemQty").val(item.getQty());
                $("#txtUItemUnitPrice").val(item.getUnitPrice());
                $("#btnUpdateItem").prop('disabled', false);

                $("#txtUItemName").css('border', '2px solid green');
                $("#txtUItemQty").css('border', '2px solid green');
                $("#txtUItemUnitPrice").css('border', '2px solid green');
                $("#txtUItemName").focus();
            }else {
                $("#txtUItemName").val("");
                $("#txtUItemQty").val("");
                $("#txtUItemUnitPrice").val("");
                $("#btnUpdateItem").prop('disabled', true);
                $("#txtUItemName").css('border', '1px solid #ced4da');
                $("#txtUItemQty").css('border', '1px solid #ced4da');
                $("#txtUItemUnitPrice").css('border', '1px solid #ced4da');
                alert("Item Not found");
            }
        }
    }else {
        $("#txtUItemId").css('border', '2px solid red');
        $("#lblUItemId").text("Item ID is a required field.Pattern : I00-001");
        $("#btnUpdateItem").prop('disabled', true);
    }
});

function searchItem(itemId) {
    for (var i = 0; i < itemDB.length; i++) {
        if(itemDB[i].getId()==itemId){
            return itemDB[i];
        }
    }
}

$("#txtUItemName").keyup(function (event) {
    var uItName = $("#txtUItemName").val();
    if (itemName.test(uItName)) {
        $("#txtUItemName").css('border', '2px solid green');
        $("#lblUItemName").text("");
        if (event.key == "Enter") {
            $("#txtUItemQty").focus();
        }
        var uItId = $("#txtUItemId").val();
        var uItQty = $("#txtUItemQty").val();
        var uItUnitPrice = $("#txtUItemUnitPrice").val();

        if (itemId.test(uItId) && itemName.test(uItName) && itemQty.test(uItQty) && unitPrice.test(uItUnitPrice)) {
            $("#btnUpdateItem").prop('disabled', false);
        }

    } else {
        $("#btnUpdateItem").prop('disabled', true);
        $("#txtUItemName").css('border', '2px solid red');
        $("#lblUItemName").text("Item name is a required field.");
    }
});

$("#txtUItemQty").keyup(function (event) {
    var uItQty = $("#txtUItemQty").val();
    if (itemQty.test(uItQty)) {
        $("#txtUItemQty").css('border', '2px solid green');
        $("#lblUItemQty").text("");
        if (event.key == "Enter") {
            $("#txtUItemUnitPrice").focus();
        }
        var uItId = $("#txtUItemId").val();
        var uItName = $("#txtUItemName").val();
        var uItUnitPrice = $("#txtUItemUnitPrice").val();

        if (itemId.test(uItId) && itemName.test(uItName) && itemQty.test(uItQty) && unitPrice.test(uItUnitPrice)) {
            $("#btnUpdateItem").prop('disabled', false);
        }

    } else {
        $("#btnUpdateItem").prop('disabled', true);
        $("#txtUItemQty").css('border', '2px solid red');
        $("#lblUItemQty").text("Item Qty is a required field.");
    }
});

$("#txtUItemUnitPrice").keyup(function (event) {
    var uItUnitPrice = $("#txtUItemUnitPrice").val();
    if (unitPrice.test(uItUnitPrice)) {
        $("#txtUItemUnitPrice").css('border', '2px solid green');
        $("#lblUItemUnitPrice").text("");
        if (event.key == "Enter") {
            let res = confirm("Do you want to update this Item?");
            if (res) {
                updateItem();
                loadAllItems();
            }
        }
        var uItId = $("#txtUItemId").val();
        var uItName = $("#txtUItemName").val();
        var uItQty = $("#txtUItemQty").val();

        if (itemId.test(uItId) && itemName.test(uItName) && itemQty.test(uItQty) && unitPrice.test(uItUnitPrice)) {
            $("#btnUpdateItem").prop('disabled', false);
        }

    } else {
        $("#btnUpdateItem").prop('disabled', true);
        $("#txtUItemUnitPrice").css('border', '2px solid red');
        $("#lblUItemUnitPrice").text("Item Unit Price is a required field.");
    }
});

function updateItem() {
    let uItId = $("#txtUItemId").val();
    let uItName = $("#txtUItemName").val();
    let uItQty = $("#txtUItemQty").val();
    let uItUnitPrice = $("#txtUItemUnitPrice").val();

    for (i = 0; i<itemDB.length ; i++){
        if(itemDB[i].getId() == uItId){
            itemDB[i].setId(uItId);
            itemDB[i].setName(uItName);
            itemDB[i].setQty(uItQty);
            itemDB[i].setUnitPrice(uItUnitPrice);

            clearUpdateItemFields();
            $("#btnUpdateItem").prop('disabled', true);
        }
    }
}

function clearUpdateItemFields() {
    $("#txtUItemId").val("");
    $("#txtUItemName").val("");
    $("#txtUItemQty").val("");
    $("#txtUItemUnitPrice").val("");

    $("#txtUItemId").css('border', '1px solid #ced4da');
    $("#txtUItemName").css('border', '1px solid #ced4da');
    $("#txtUItemQty").css('border', '1px solid #ced4da');
    $("#txtUItemUnitPrice").css('border', '1px solid #ced4da');

    $("#btnUpdateItem").prop('disabled', true);
}

$("#btnUpdateItem").click(function () {
    let res = confirm("Do you want to update this Item?");
    if (res) {
        updateItem();
        loadAllItems();
    }
});