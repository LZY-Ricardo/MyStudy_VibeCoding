function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        newProperty = 'newProperty'
        hello: string = 'Tom'
    }
}

@classDecorator
class Greeter { // Greeter == Greeter || classDecorator(Greeter)
    property = 'property'
    hello: string
    constructor(m: string) {
        this.hello = m
    }
}

console.log(new Greeter('world'));
// {property: 'property', hello: 'Tom', newProperty: 'newProperty'}
