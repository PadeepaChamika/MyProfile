function Order(orderId,date,custId,itemId,itemName,nOfQty,total) {
    var __orderId = orderId;
    var __date = date;
    var __custId = custId;
    var __itemId = itemId;
    var __itemName = itemName;
    var __nOfQty = nOfQty;
    var __total = total;

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
    this.getTotal = function () {
        return __total;
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
    this.setTotal = function (total) {
        __total = total;
    }
}