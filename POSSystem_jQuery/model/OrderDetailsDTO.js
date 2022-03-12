function OrderDetailsDTO(orderId,itemId,itemName,nOfQty,unitPrice,total) {
    var __orderId = orderId;
    var __itemId = itemId;
    var __itemName = itemName;
    var __nOfQty = nOfQty;
    var __unitPrice = unitPrice;
    var __total = total;

    this.getOrderId = function () {
        return __orderId;
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
    this.getUnitPrice = function () {
        return __unitPrice;
    }
    this.getTotal = function () {
        return __total;
    }
    this.setOrderId = function (orderId) {
        __orderId = orderId;
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
    this.setUnitPrice = function (discount) {
        __unitPrice = unitPrice;
    }
    this.setTotal = function (netValue) {
        __total = total;
    }
}