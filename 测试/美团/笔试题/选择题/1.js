class cls { }
console.log(typeof cls); // function
console.log(cls === cls.prototype.constructor); // true

// A.function, false
// B.class, true
// C.function, true
// D.object, false

console.log(cls);
console.log(cls.prototype.constructor);