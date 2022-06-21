Array.prototype.reduce = undefined;
if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, "reduce", {
    value: function (cb) {
      if (this === null) {
        // 被 null 或 undefined 值调用时，抛出 TypeError 异常
        throw new TypeError(
          "Array.prototype.reduce called on null or undefined"
        );
      }

      if (typeof cb !== "function") {
        // 传参不是函数
        throw new TypeError(cb + " is not a function");
      }

      var o = Object(this);

      var len = o.length >>> 0; // 保证数值有意义

      var k = 0; // 初始化下标
      var value; // 初始化值
      console.log({ len, k, o });
      //  调用 reduce 的时候会传递参数 arg【1】 是初始值
      if (arguments.length >= 2) {
        value = arguments[1];
      } else {
        // 如果 k 小于数组长度 并且数组长度没有 0这个下标 将k 赋值为一个非法值
        // k < len 猜测是为了防止给一个空数组强行赋值 length 为 1或者其他的值
        while (k < len && !(k in o)) {
          k++;
        }

        if (k >= len) {
          //  数组非法
          throw new TypeError("Reduce of empty array with no initial value");
        }

        value = o[k++]; // 取第 0 个索引作为初始值
      }

      while (k < len) {
        // 索引在数组下标中
        if (k in o) {
          value = cb(value, o[k], k, o);
        }
        k++;
      }
      return value;
    },
  });
}
