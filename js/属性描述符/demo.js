var aGoods = {
    pic: '...',
    title: '...',
    desc: '...',
    sellNumber: 1,
    favorRate: 2,
    price: 3,
};

class UIGoods {
    get totalPrice() { // 与下面效果一致
        return this.choose * this.data.price;
    }
    get isChoose() {
        return this.choose > 0
    }
    constructor(g) {
        // this.data = g;
        g = { ...g }
        Object.freeze(g)
        Object.defineProperty(this, 'data', {
            get: function() {
                return g;
            },
            set: function() {
                throw new Error('data属性是只读的 不能直接赋值');
            },
            configurable: false,
        });
        var internalChooseValue = 0;
        Object.defineProperty(this, 'choose', {
            configurable: false,
            get: function () {
                return internalChooseValue;
            },
            set: function (val) {
                if (typeof val !== 'number') {
                    throw new Error('choose属性必须是数字');
                }
                var temp = parseInt(val);
                if (temp !== val) {
                    throw new Error('choose属性必须是整数');
                }
                if (val < 0) {
                    throw new Error('choose属性必须大于等于0');
                }
                internalChooseValue = val;
            }
        });
        // Object.defineProperty(this, 'totalPrice', {
        //     get: function () {
        //         return this.choose * this.data.price;
        //     },
        //   });
        this.a = 'a'
        Object.seal(this)
    }
  }

var g = new UIGoods(aGoods);
console.log(g.data);
// g.data = 'abc'; // 报错
console.log(g.data);
g.choose = 2;
console.log(g.choose);
console.log(g.totalPrice);
console.log(g.isChoose);
g.data.price = 5
console.log(g.data.price)
g.abc = 2
g.a = 'aa'
console.log(g)

Object.freeze(UIGoods.prototype)
UIGoods.prototype.haha = 'haha'
console.log(g.haha)
