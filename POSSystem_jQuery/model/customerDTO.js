function CustomerDTO(id,name,age,address,salary){
    var __id=id;
    var __name=name;
    var __age=age;
    var __address=address;
    var __salary=salary;

    this.getID = function () {
        return id;
    }
    this.getName = function () {
        return name;
    }
    this.getAge = function () {
        return age;
    }
    this.getAddress = function () {
        return address;
    }
    this.getSalary = function () {
        return salary;
    }

    this.setID = function (id) {
        __id=id;
    }
    this.setName = function (name) {
        __name=name;
    }
    this.setAge = function (age) {
       __age=age;
    }
    this.setAddress = function (address) {
        __address=address;
    }
    this.setSalary = function (salary) {
        __salary=salary;
    }
}