;(function () {
    /*
    * 观察者模式
    * */
    // ==================观察者模式开始====================
    class User {
        update(msg) {
            console.log("消息更新啦：" + msg);
        }
    }

    class Department {
        constructor() {
            this.subs = [];
        }
        addSub(user) {
            this.subs.push(user);
        }
        newMessage(msg) {
            this.subs.forEach(user => {
                user.update(msg);
            })
        }

    }

    let lbb = new User();
    let D = new Department();
    D.addSub(lbb);
    D.newMessage("来啦老弟");
    // ==================观察者模式结束====================

    /*
    * 依赖收集代码
    * */
    class Watcher {
        constructor() {
            Dep.target = this;
        }
        update(val) {
            console.log("内容更新了" + val);
        }
    }

    class Dep {
        constructor() {
            this.subs = [];
        }
        addSub(sub) {
            this.subs.push(sub);
        }
        notify(val) {
            this.subs.forEach(sub => {
                sub.update(val);
            })
        }

    }

    function responsive(object, key, value) {
        const dep = new Dep();
        Object.defineProperty(object, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                dep.addSub(Dep.target);
                return value;
            },
            set: function (newVal) {
                if (newVal === value) return;
                dep.notify(newVal);
            }
        })
    }

    function observer(object) {
        if (!object || (typeof object !== 'object')) {
            return;
        }
        Object.keys(object).forEach(key => {
            responsive(object, key, key[0].value);
        })
    }

    class Vue {
        constructor(options) {
            this._data = options.data;
            observer(this._data);
            new Watcher();
            console.log(this._data.test, this._data.test2);
        }
    }

    let obj = new Vue({
        data: {
            test: 'I am Iron Man',
            test2: 'text2'
        }
    });

    obj._data.test = 'changed';
    obj._data.test2 = "Me too";

    Dep.target = null;
})();