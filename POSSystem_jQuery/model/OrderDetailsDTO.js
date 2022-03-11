function OrderDetails(orderId,date,custId,itemId,itemName,nOfQty,discount,netValue) {
    var __orderId = orderId;
    var __date = date;
    var __custId = custId;
    var __itemId = itemId;
    var __itemName = itemName;
    var __nOfQty = nOfQty;
    var __discount = discount;
    var __netValue = netValue;

    this.getOrderId = function () {
        return __orderId;
    }
    this.getDate = function () {
        return __date;
    }
    this.getCustId = function () {
        return __custId;
    }
    this.getItemId = function () {
        return __itemId;
    }
    this.getItemName = function () {
        return __itemName;
    }
    this.getNOfQty = function () {
        return __nOfQty;
    }
    this.getDiscount = function () {
        return __discount;
    }
    this.getNetValue = function () {
        return __netValue;
    }
    this.setOrderId = function (orderId) {
        __orderId = orderId;
    }
    this.setDate = function (date) {
        __date = date;
    }
    this.setCustId = function (custId) {
        __custId = custId;
    }
    this.setItemId = function (itemId) {
        __itemId = itemId;
    }
    this.setItemName = function (itemName) {
        __itemName = itemName;
    }
    this.setNOfQty = function (nOfQty) {
        __nOfQty = nOfQty;
    }
    this.setDiscount = function (discount) {
        __discount = discount;
    }
    this.setNetValue = function (netValue) {
        __netValue = netValue;
    }
}