function orderId() {
    if (orderDB.length == 0) {
        $("#lblOrderId").val("O-0001");
    } else if (orderDB.length > 0) {
        var orderId = orderDB[orderDB.length - 1].getOrderId().split("-")[1];
        var tempId = parseInt(orderId);
        tempId = tempId + 1;
        if (tempId <= 9) {
            $("#lblOrderId").val("O-000" + tempId);
        } else if (tempId <= 99) {
            $("#lblOrderId").val("O-00" + tempId);
        } else if (tempId <= 999) {
            $("#lblOrderId").val("O-0" + tempId);
        } else if (tempId <= 9999) {
            $("#lblOrderId").val("O-" + tempId);
        }
    }
}

$('#lblOrderDate').val(new Date().toISOString().slice(0, 10));

var ifExistsCus = false;
var ifExistsitem = false;
let selectOrderItem;
let total = 0.00;
let netTotal = 0.00;

function setCustomerIdComboBox() {
    $("#cmbSelectCustomerId").empty();
    $("#cmbSelectCustomerId").append(new Option("-Select Customer-", ""));
    for (let i = 0; i < customerDB.length; i++) {
        $("#cmbSelectCustomerId").append(new Option(customerDB[i].getID(), i));
    }
}

$("#cmbSelectCustomerId").change(function () {
    var id = $("#cmbSelectCustomerId").find('option:selected').text();
    let srcCustomer = searchCustomerOrder(id);
    if (srcCustomer) {
        ifExistsCus = true;
        selectOrderCustomer= srcCustomer;
        $("#txtOCustomerName").val(srcCustomer.getName());
        $("#txtOCustomerAge").val(srcCustomer.getAge());
        $("#txtOCustomerAddress").val(srcCustomer.getAddress());
        $("#txtOCustomerSalary").val(srcCustomer.getSalary());
    }
    if (ifExistsCus == false) {
        $("#txtOCustomerName").val("");
        $("#txtOCustomerAge").val("");
        $("#txtOCustomerAddress").val("");
        $("#txtOCustomerSalary").val("");
    }

});

function searchCustomerOrder(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getID() == id) {
            ifExistsCus = true;
            return customerDB[i];
        }
    }
    ifExistsCus = false;
}

function setItemIdComboBox() {
    $("#cmbSelectItemId").empty();
    $("#cmbSelectItemId").append(new Option("-Select Item-", ""));
    for (let i = 0; i < itemDB.length; i++) {
        $("#cmbSelectItemId").append(new Option(itemDB[i].getId(), i));
    }
}

$("#cmbSelectItemId").change(function () {
    var id = $("#cmbSelectItemId").find('option:selected').text();
    let srcItem = searchItemOrder(id);
    if (srcItem) {
        ifExistsitem = true;
        selectOrderItem = srcItem;
        $("#txtOItemName").val(srcItem.getName());
        $("#txtOItemQty").val(srcItem.getQty());
        $("#txtOItemUnitPrice").val(srcItem.getUnitPrice());
    }
    if (ifExistsitem == false) {
        $("#txtOItemName").val("");
        $("#txtOItemQty").val("");
        $("#txtOItemUnitPrice").val("");
    }

});

function searchItemOrder(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getId() == id) {
            ifExistsitem = true;
            return itemDB[i];
        }
    }
    ifExistsitem = false;
}

$("#txtNumOfQty").on('keyup', function (eventOb) {
    if (eventOb.key == "Enter") {
        $("#btnAddToCart").attr("disabled", false);
        if ($("#txtNumOfQty").val() <= $("#txtOItemQty").val()) {
            if ($("#txtNumOfQty").val() != 0) {
                let oId = $("#lblOrderId").val();
                let oQty = $("#txtNumOfQty").val();
                total = total + oQty * selectOrderItem.getUnitPrice();
                let val = $("#txtOItemQty").val();
                $("#txtOItemQty").val(val - oQty);


                let selectItem = $("#cmbSelectItemId").find('option:selected').text();
                var oCartTm = new OrderDetailsDTO(oId,selectItem,$("#txtOItemName").val(),oQty,$("#txtOItemUnitPrice").val(),total);
                console.log(oCartTm.getOrderId(),oCartTm.getItemId(),oCartTm.getItemName(),oCartTm.getNOfQty(),oCartTm.getUnitPrice(),oCartTm.getTotal());
                tempArray.push(oCartTm);
                addToCartT();
                $("#txtTotal").val(total);
                $("#txtNetValue").val(total);

                $("#totalPrice").text("Total Price : Rs." + total);
                $("#subTotal").text("Sub Price- : Rs." + total);
            } else {
                alert("Please enter order Qty....");
            }
        } else {
            alert("Order Qty is higher than Qty On Hand...");
        }
    }
});

$("#btnAddToCart").click(function () {
    if($("#txtNumOfQty").val() <= $("#txtOItemQty").val()) {
        if ($("#txtNumOfQty").val() != "0") {
            console.log("a");
            let oId = $("#lblOrderId").val();
            let oQty = $("#txtNumOfQty").val();
            total = total + oQty * selectOrderItem.getUnitPrice();
            let val = $("#txtOItemQty").val();
            $("#txtOItemQty").val(val - oQty);


            let selectItem = $("#cmbSelectItemId").find('option:selected').text();
            var oCartTm = new OrderDetailsDTO(oId,selectItem,$("#txtOItemName").val(),oQty,$("#txtOItemUnitPrice").val(),total);
            console.log(oCartTm.getOrderId(),oCartTm.getItemId(),oCartTm.getItemName(),oCartTm.getNOfQty(),oCartTm.getUnitPrice(),oCartTm.getTotal());
            tempArray.push(oCartTm);
            addToCartT();
            $("#txtTotal").val(total);
            $("#txtNetValue").val(total);
            $("#txtNumbOfQty").val(tempArray.length);

            $("#totalPrice").text("Total Price : Rs." + total);
            $("#subTotal").text("Sub Price- : Rs." + total);
        } else {
            alert("Please enter order Qty....");
        }
    }else{
        alert("Order Qty is higher than Qty On Hand...");
    }
});

function addToCartT() {
    $("#cartDetailsTable").empty();
    for (var i=0; i<tempArray.length; i++) {
        let row = `<tr><td>${tempArray[i].getItemId()}</td><td>${tempArray[i].getItemName()}</td><td>${tempArray[i].getNOfQty()}</td><td>${tempArray[i].getUnitPrice()}</td><td>${tempArray[i].getTotal()}</tr>`;
        $("#cartDetailsTable").append(row);
    }
}

$("#btnPlaceOrder").click(function () {
    let res = confirm("Do you want to place the Order..?");
    if (res) {
        let selectCustomer = $("#cmbSelectCustomerId").find('option:selected').text();
        let selectItem = $("#cmbSelectItemId").find('option:selected').text();
        let oId = $("#lblOrderId").val();
        let date = $("#lblOrderDate").val();
        let orderObject = new OrderDTO(oId,date,selectCustomer,selectItem,$("#txtOItemName").val(),netTotal);
        orderDB.push(orderObject);
        for (var i = 0; i < tempArray.length; i++) {
            var orderDetail = new OrderDetailsDTO(oId,tempArray[i].getItemId(),tempArray[i].getItemName(),tempArray[i].getNOfQty(),tempArray[i].getUnitPrice(),total);
            orderDetailsDB.push(orderDetail);
            manageQuantity(tempArray[i].getItemId(), tempArray[i].getNOfQty());
        }
    }
    $("#txtNetValue").attr("disabled", true);
    loadOrderTable();
    loadOrderDetailTable();
    orderId();
});

$("#txtDiscount").on('keyup', function (eventOb) {
    if (eventOb.key == "Enter") {
        let discount = $("#txtDiscount").val();
        netTotal = total - discount;
        $("#txtNetValue").val(netTotal);
    }
});

function manageQuantity(itemCode, numOfQty) {
    for (var i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getId() == itemCode) {
            let tempQty = parseInt(itemDB[i].getQty());
            let qtyOnHand = tempQty - numOfQty;
            itemDB[i].setQty(qtyOnHand);
        }
    }
}

function loadOrderTable() {
    $("#orderTable").empty();
    for (var i = 0; i < orderDB.length; i++) {
        let oTB = `<tr><td>${orderDB[i].getOrderId()}</td><td>${orderDB[i].getDate()}</td><td>${orderDB[i].getCustId()}</td><td>${orderDB[i].getItemId()}</td><td>${orderDB[i].getItemName()}</td><td>${orderDB[i].getNetTotal()}</td></tr>`
        $("#orderTable").append(oTB);
    }
}

function loadOrderDetailTable() {
    $("#orderDetailsTable").empty();
    for (var i = 0; i < orderDetailsDB.length; i++) {
        let oDTB = `<tr><td>${orderDetailsDB[i].getOrderId()}</td><td>${orderDetailsDB[i].getItemId()}</td><td>${orderDetailsDB[i].getItemName()}</td><td>${orderDetailsDB[i].getNOfQty()}</td><td>${orderDetailsDB[i].getUnitPrice()}</td><td>${orderDetailsDB[i].getTotal()}</td></tr>`
        $("#orderDetailsTable").append(oDTB);
    }
}