;(function () {
    // 内容更新时调用的函数
    function cb(val) {
        alert("内容已经更新成：" + val);
    }

    // 对传入对象的每一个属性进行响应式收集
    function Responsive(obj, key, value) {
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function responseGetter() {
                return value;
            },
            set: function responseSetter(newVal) {
                if (newVal === value) return;
                value = newVal;
                cb(value);
            }
        })
    }

    // 对传入的对象进行观察
    function observer(value) {
        if (!value || (typeof value !== 'object')) {
            return;
        }
        Object.keys(value).forEach(key => {
            Responsive(value, key, key[0].value);
        })
    }

    class Vue {
        constructor(options) {
            this._data = options.data;
            observer(this._data);
        }
    }
    
    let obj = new Vue({
        data: {
            test: 'I am Iron man'
        }
    });
    
    obj._data.test = 'I am changed';
})();