function ItemDTO(id,name,qty,unitPrice) {
    var __id = id;
    var __name = name;
    var __qty = qty;
    var __unitPrice = unitPrice;

    this.getId = function () {
        return __id;
    }
    this.getName = function () {
        return __name;
    }
    this.getQty = function () {
        return __qty;
    }
    this.getUnitPrice = function () {
        return __unitPrice;
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