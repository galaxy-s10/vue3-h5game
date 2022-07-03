/** 使用json进行深克隆 */
export const deepCloneByJson = (T) => JSON.parse(JSON.stringify(T));

/** 手写的深拷贝，解决循环引用 */
export const deepClone = (obj) => {
  function clone(obj, hash) {
    const newobj = Array.isArray(obj) ? [] : {};
    hash = hash || new WeakMap();
    if (hash.has(obj)) {
      return hash.get(obj);
    }
    hash.set(obj, newobj);

    Object.keys(obj).forEach((i) => {
      if (obj[i] instanceof Object) {
        newobj[i] = clone(obj[i], hash);
      } else {
        newobj[i] = obj[i];
      }
    });
    return newobj;
  }
  return clone(obj, undefined);
};

/** 模拟ajax请求 */
export const mockAjax = async (flag?: boolean) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      if (flag) {
        resolve({
          code: 200,
          data: {
            id: 1,
            name: '张三',
            age: 18,
            token: Math.random(),
          },
        });
      } else {
        rejected({
          code: 400,
          msg: '请求失败',
        });
      }
    }, 500);
  });
};

/** 是否禁用滚动true:是，false:否 */
export const disableBodyScroll = (flag = false) => {
  const body = document.body;
  if (flag) {
    body.style.overflow = 'hidden';
  } else {
    body.style.removeProperty('overflow');
  }
};

/**
 * 按屏幕750为基准，生成rem，带单位
 */
export const GetREMwithUnit = (px) => {
  return +(px / 100).toFixed(5) + 'rem';
};

/**
 * 根据屏幕宽度，转化成正确的px值,不带单位
 */
export const GetPxWidth = (px) => {
  const screenWidth = window.screen.availWidth;
  return (px / 750) * screenWidth;
};

/**
 * 获取地址栏参数
 */
export const GetQuery: any = () => {
  const url = decodeURI(decodeURI(window.location.href));
  const str = url.split('?')[1];
  const obj = {};
  if (str) {
    const keys = str.split('&');
    keys.forEach((item) => {
      const arr = item.split('=');
      obj[arr[0]] = arr[1];
    });
  }
  return obj;
};

/**
 * node:dom节点
 * sty:'x' | 'y' | 'z'| 'rotate'
 * 返回值: 对应的transform的translateX/Y/Z或者rotate值
 */
export const getTranslate = (node, sty) => {
  function getTranslate(node, sty) {
    // 获取transform值
    const translates = document
      .defaultView!.getComputedStyle(node, null)
      .transform.substring(7);
    const result = translates.match(/\(([^)]*)\)/); // 正则()内容
    const matrix = result ? result[1].split(',') : translates.split(',');
    if (sty == 'x' || sty == undefined) {
      return matrix.length > 6 ? parseFloat(matrix[12]) : parseFloat(matrix[4]);
    } else if (sty == 'y') {
      return matrix.length > 6 ? parseFloat(matrix[13]) : parseFloat(matrix[5]);
    } else if (sty == 'z') {
      return matrix.length > 6 ? parseFloat(matrix[14]) : 0;
    } else if (sty == 'rotate') {
      return matrix.length > 6
        ? getRotate([
            parseFloat(matrix[0]),
            parseFloat(matrix[1]),
            parseFloat(matrix[4]),
            parseFloat(matrix[5]),
          ])
        : getRotate(matrix);
    }
  }
  function getRotate(matrix) {
    const aa = Math.round((180 * Math.asin(matrix[0])) / Math.PI);
    const bb = Math.round((180 * Math.acos(matrix[1])) / Math.PI);
    const cc = Math.round((180 * Math.asin(matrix[2])) / Math.PI);
    const dd = Math.round((180 * Math.acos(matrix[3])) / Math.PI);
    let deg = 0;
    if (aa == bb || -aa == bb) {
      deg = dd;
    } else if (-aa + bb == 180) {
      deg = 180 + cc;
    } else if (aa + bb == 180) {
      deg = 360 - cc || 360 - dd;
    }
    return deg >= 360 ? 0 : deg;
  }
  return getTranslate(node, sty);
};
