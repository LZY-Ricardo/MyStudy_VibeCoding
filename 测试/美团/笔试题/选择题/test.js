function parent() {
    this.name = 'parent'
}

let p = new parent()
console.log(Object.getPrototypeOf(p).constructor);

