function itemDTO(id,name,qty,unitPrice) {
    var __id = id;
    var __name = name;
    var __qty = qty;
    var __unitPrice = unitPrice;

    this.getId = function () {
        return id;
    }
    this.getName = function () {
        return name;
    }
    this.getQty = function () {
        return qty;
    }
    this.getUnitPrice = function () {
        return unitPrice;
    }

    this.setId = function (id) {
        __id=id;
    }
    this.setName = function (name) {
        __name=name;
    }
    this.setQty = function (qty) {
        __qty=qty;
    }
    this.setUnitPrice = function (unitPrice) {
        __unitPrice=unitPrice;
    }
}