type BusClass = {
  emit: (name: string) => void;
  on: (name: string, cb: Function) => void;
};
type ParamsKey = string | number | symbol;
type List = {
  [key: ParamsKey]: Array<Function>;
};

class Bus implements BusClass {
  list: List;
  constructor() {
    this.list = {};
  }
  on(name: string, cb: Function) {
    let fnArr: Array<Function> = this.list[name] || [];
    fnArr.push(cb);
    this.list[name] = fnArr;
  }
  emit(name: string, ...args: Array<any>) {
    let fnArr: Array<Function> = this.list[name];
    if (fnArr) {
      fnArr.forEach((fn) => {
        fn.apply(this, args);
      });
    }
  }
}

export default new Bus();
