$("#btnSaveCustomer").prop('disabled', true);
const custId = /^(C00-)[0-9]{3}$/;
const custName = /^[A-z ]{5,20}$/;
const custAge = /^[0-9]{1,2}$/;
const custAddress = /^[0-9/A-z. ,]{3,}$/;
const custSalary = /^[0-9]{1,}[.][0-9]{2}$/;

$('#txtCustomerId,#txtCustomerName,#txtCustomerAge,#txtAddress,#txtSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#txtCustomerId,#txtCustomerName,#txtCustomerAge,#txtAddress,#txtSalary').on('blur', function () {
    formValid();
});

$("#txtCustomerId").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtCustomerName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtCustomerAge").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtSalary").on('keyup', function (e) {
    setButton();
    if (e.key == "Enter") {
        checkIfValid();
    }
});

function formValid() {
    var cusId = $("#txtCustomerId").val();
    $("#txtCustomerId").css('border', '2px solid green');
    $("#lblcustId").text("");
    if (custId.test(cusId)) {
        var cusName = $("#txtCustomerName").val();
        if (custName.test(cusName)) {
            $("#txtCustomerName").css('border', '2px solid green');
            $("#lblcustName").text("");
            var cusAge = $("#txtCustomerAge").val();
            if (custAge.test(cusAge)) {
                $("#txtCustomerAge").css('border', '2px solid green');
                $("#lblcustAge").text("");
                var cusAddress = $("#txtAddress").val();
                if (custAddress.test(cusAddress)) {
                    $("#txtAddress").css('border', '2px solid green');
                    $("#lblcustAddress").text("");
                    var cusSalary = $("#txtSalary").val();
                    if (custSalary.test(cusSalary)) {
                        $("#txtSalary").css('border', '2px solid green');
                        $("#lblcustSalary").text("");
                        return true;
                    } else {
                        $("#txtSalary").css('border', '2px solid red');
                        $("#lblcustSalary").text("Customer Salary is a required field : Pattern 100.00");
                        return false;
                    }
                } else {
                    $("#txtAddress").css('border', '2px solid red');
                    $("#lblcustAddress").text("Customer Address is a required field : Pattern Galle or 04/galle");
                    return false;
                }
            } else {
                $("#txtCustomerAge").css('border', '2px solid red');
                $("#lblcustAge").text("Customer Age is a required field : Pattern 23");
                return false;
            }
        } else {
            $("#txtCustomerName").css('border', '2px solid red');
            $("#lblcustName").text("Customer Name is a required field : Pattern padeepa");
            return false;
        }
    } else {
        $("#txtCustomerId").css('border', '2px solid red');
        $("#lblcustId").text("Customer ID is a required field : Pattern C00-001");
    }

}

function checkIfValid() {
    var cusId = $("#txtCustomerId").val();
    if (custId.test(cusId)) {
        $("#txtCustomerName").focus();
        var cusName = $("#txtCustomerName").val();
        if (custName.test(cusName)) {
            $("#txtCustomerAge").focus();
            var cusAge = $("#txtCustomerAge").val();
            if (custAge.test(cusAge)) {
                $("#txtAddress").focus();
                var cusAddress = $("#txtAddress").val();
                if (custAddress.test(cusAddress)) {
                    $("#txtSalary").focus();
                    var cusSalary = $("#txtSalary").val();
                    if (custSalary.test(cusSalary)) {
                        let res = confirm("Do you really need to add this Customer..?");
                        if (res) {
                            saveCustomer();
                            clearAllSaveCustomerFields();
                        }
                    } else {
                        $("#txtSalary").focus();
                    }
                } else {
                    $("#txtAddress").focus();
                }
            } else {
                $("#txtCustomerAge").focus();
            }
        } else {
            $("#txtCustomerName").focus();
        }
    } else {
        $("#txtCustomerId").focus();
    }
}

function setButton() {
    let bt = formValid();
    console.log(bt);
    if (bt) {
        $("#btnSaveCustomer").prop('disabled', false);
    } else {
        $("#btnSaveCustomer").prop('disabled', true);
    }
}

$('#btnSaveCustomer').click(function () {
    checkIfValid();
});

function saveCustomer() {

    let customerID = $("#txtCustomerId").val();
    let customerName = $("#txtCustomerName").val();
    let customerAge = $("#txtCustomerAge").val();
    let customerAddress = $("#txtAddress").val();
    let customerSalary = $("#txtSalary").val();

    var customerDTO = new CustomerDTO(customerID, customerName, customerAge, customerAddress, customerSalary);
    console.log(customerDTO.getID(), customerDTO.getName(), customerDTO.getAge(), customerDTO.getAddress(), customerDTO.getSalary());
    customerDB.push(customerDTO);
    loadAllCustomers();
    clearAllSaveCustomerFields();

    $("#customerTable>tr").on('dblclick', function () {
        var custId = $(this).children(":eq(0)").text();
        for (var i = 0; i < customerDB.length; i++) {
            if (customerDB[i].getID() == custId) {
                let res = confirm("Do you want to delete this customer?");
                if(res){
                    customerDB.splice(i, 1);
                }
            }
        }
        loadAllCustomers();
    });
}

function loadAllCustomers() {
    $("#customerTable").empty();
    for (var i=0; i<customerDB.length; i++) {
        let row = `<tr><td>${customerDB[i].getID()}</td><td>${customerDB[i].getName()}</td><td>${customerDB[i].getAge()}</td><td>${customerDB[i].getAddress()}</td><td>${customerDB[i].getSalary()}</td></tr>`;
        $("#customerTable").append(row);
    }
}

function clearAllSaveCustomerFields() {
    $("#txtCustomerId").val("");
    $("#txtCustomerName").val("");
    $("#txtCustomerAge").val("");
    $("#txtAddress").val("");
    $("#txtSalary").val("");

    $("#btnSaveCustomer").prop('disabled', true);
}

/*Update Customer validation-----------------------------*/
$("#txtUCustId,#txtUCustName,#txtUCustAge,#txtUCustAddress,#txtUCustSalary").on('keydown', function (e) {
    if (e.key == "Tab") {
        e.preventDefault();
    }
});

$("#txtUCustId").on('keyup', function (e) {
    let searchId = $("#txtUCustId").val();
    if (custId.test(searchId)) {
        $("#txtUCustId").css('border', '2px solid green');
        $("#lblUCustId").text("");
        if (e.key == "Enter") {
            let customer = searchCustomer(searchId);
            if (customer) {
                $("#txtUCustName").val(customer.getName());
                $("#txtUCustAge").val(customer.getAge());
                $("#txtUCustAddress").val(customer.getAddress());
                $("#txtUCustSalary").val(customer.getSalary());
                $("#btnUpdateCustomer").prop('disabled', false);

                $("#txtUCustName").css('border', '2px solid green');
                $("#txtUCustAge").css('border', '2px solid green');
                $("#txtUCustAddress").css('border', '2px solid green');
                $("#txtUCustSalary").css('border', '2px solid green');
                $("#txtUCustName").focus();
            } else {
                $("#txtUCustName").val("");
                $("#txtUCustAge").val("");
                $("#txtUCustAddress").val("");
                $("#txtUCustSalary").val("");
                $("#btnUpdateCustomer").prop('disabled', true);
                $("#txtUCustName").css('border', '1px solid #ced4da');
                $("#txtUCustAge").css('border', '1px solid #ced4da');
                $("#txtUCustAddress").css('border', '1px solid #ced4da');
                $("#txtUCustSalary").css('border', '1px solid #ced4da');
                alert("Customer Not found");
            }
        }
    } else {
        $("#txtUCustId").css('border', '2px solid red');
        $("#lblUCustId").text("Customer ID is a required field.Pattern : C00-0001");
        $("#btnUpdateCustomer").prop('disabled', true);
    }
});

function searchCustomer(customerId) {
    for (var i = 0; i < customerDB.length; i++) {
        if(customerDB[i].getID()==customerId){
            return customerDB[i];
        }
    }
}

$("#txtUCustName").keyup(function (event) {
    var uCustName = $("#txtUCustName").val();
    if (custName.test(uCustName)) {
        $("#txtUCustName").css('border', '2px solid green');
        $("#lblUCustName").text("");
        if (event.key == "Enter") {
            $("#txtUCustAge").focus();
        }
        var uCustId = $("#txtUCustId").val();
        var uCustAge = $("#txtUCustAge").val();
        var uCustAddress = $("#txtUCustAddress").val();
        var uCustSalary = $("#txtUCustSalary").val();

        if (custId.test(uCustId) && custName.test(uCustName) && custAge.test(uCustAge) && custAddress.test(uCustAddress) && custSalary.test(uCustSalary)) {
            $("#btnUpdateCustomer").prop('disabled', false);
        }

    } else {
        $("#btnUpdateCustomer").prop('disabled', true);
        $("#txtUCustName").css('border', '2px solid red');
        $("#lblUCustName").text("Customer name is a required field.");
    }
});

$("#txtUCustAge").keyup(function (event) {
    var uCustAge = $("#txtUCustAge").val();
    if (custAge.test(uCustAge)) {
        $("#txtUCustAge").css('border', '2px solid green');
        $("#lblUCustAge").text("");
        if (event.key == "Enter") {
            $("#txtUCustAddress").focus();
        }
        var uCustId = $("#txtUCustId").val();
        var uCustName = $("#txtUCustName").val();
        var uCustAddress = $("#txtUCustAddress").val();
        var uCustSalary = $("#txtUCustSalary").val();

        if (custId.test(uCustId) && custName.test(uCustName) && custAge.test(uCustAge) && custAddress.test(uCustAddress) && custSalary.test(uCustSalary)) {
            $("#btnUpdateCustomer").prop('disabled', false);
        }

    } else {
        $("#btnUpdateCustomer").prop('disabled', true);
        $("#txtUCustAge").css('border', '2px solid red');
        $("#lblUCustAge").text("Customer age is a required field.");
    }
});

$("#txtUCustAddress").keyup(function (event) {
    var uCustAddress = $("#txtUCustAddress").val();
    if (custAddress.test(uCustAddress)) {
        $("#txtUCustAddress").css('border', '2px solid green');
        $("#lblUCustAddress").text("");
        if (event.key == "Enter") {
            $("#txtUCustSalary").focus();
        }
        var uCustId = $("#txtUCustId").val();
        var uCustName = $("#txtUCustName").val();
        var uCustAge = $("#txtUCustAge").val();
        var uCustSalary = $("#txtUCustSalary").val();

        if (custId.test(uCustId) && custName.test(uCustName) && custAge.test(uCustAge) && custAddress.test(uCustAddress) && custSalary.test(uCustSalary)) {
            $("#btnUpdateCustomer").prop('disabled', false);
        }

    } else {
        $("#btnUpdateCustomer").prop('disabled', true);
        $("#txtUCustAddress").css('border', '2px solid red');
        $("#lblUCustAddress").text("Customer address is a required field.");
    }
});

$("#txtUCustSalary").keyup(function (event) {
    var uCustSalary = $("#txtUCustSalary").val();
    if (custSalary.test(uCustSalary)) {
        $("#txtUCustSalary").css('border', '2px solid green');
        $("#lblUCustSalary").text("");
        if (event.key == "Enter") {
            let res = confirm("Do you want to update this customer?");
            if (res) {
                updateCustomer();
                loadAllCustomers();
            }
        }
        var uCustId = $("#txtUCustId").val();
        var uCustName = $("#txtUCustName").val();
        var uCustAge = $("#txtUCustAge").val();
        var uCustAddress = $("#txtUCustAddress").val();

        if (custId.test(uCustId) && custName.test(uCustName) && custAge.test(uCustAge) && custAddress.test(uCustAddress) && custSalary.test(uCustSalary)) {
            $("#btnUpdateCustomer").prop('disabled', false);
        }

    } else {
        $("#btnUpdateCustomer").prop('disabled', true);
        $("#txtUCustSalary").css('border', '2px solid red');
        $("#lblUCustSalary").text("Customer salary is a required field.");
    }
});

function updateCustomer() {
    let uCustId = $("#txtUCustId").val();
    let uCustName = $("#txtUCustName").val();
    let uCustAge = $("#txtUCustAge").val();
    let uCustAddress = $("#txtUCustAddress").val();
    let uCustSalary = $("#txtUCustSalary").val();

    for (var i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getID() == uCustId) {
            customerDB[i].setID(uCustId);
            customerDB[i].setName(uCustName);
            customerDB[i].setAge(uCustAge);
            customerDB[i].setAddress(uCustAddress);
            customerDB[i].setSalary(uCustSalary);

            clearUpdateCustomerFields();
            $("#btnUpdateCustomer").prop('disabled', true);
        }
    }
}

function clearUpdateCustomerFields() {
    $("#txtUCustId").val("");
    $("#txtUCustName").val("");
    $("#txtUCustAge").val("");
    $("#txtUCustAddress").val("");
    $("#txtUCustSalary").val("");

    $("#txtUCustId").css('border', '1px solid #ced4da');
    $("#txtUCustName").css('border', '1px solid #ced4da');
    $("#txtUCustAge").css('border', '1px solid #ced4da');
    $("#txtUCustAddress").css('border', '1px solid #ced4da');
    $("#txtUCustSalary").css('border', '1px solid #ced4da');


    $("#btnUpdateCustomer").prop('disabled', true);
}

$("#btnUpdateCustomer").click(function () {
    let res = confirm("Do you want to update this customer?");
    if (res) {
        updateCustomer();
        loadAllCustomers();
    }
});