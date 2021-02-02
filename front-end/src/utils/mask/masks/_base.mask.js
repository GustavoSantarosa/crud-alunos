// import * as VanillaMasker from '../internal-dependencies/vanilla-masker';

const VMasker = require("./internal-dependencies/vanilla-masker.js");

export default class BaseMask {
  getVMasker() {
    return VMasker;
  }

  mergeSettings(obj1, obj2) {
    const obj3 = {};
    for (const attrname in obj1) {
      obj3[attrname] = obj1[attrname];
    }
    for (const attrname in obj2) {
      obj3[attrname] = obj2[attrname];
    }
    return obj3;
  }

  getRawValue(maskedValue, settings) {
    return maskedValue;
  }

  getDefaultValue(value) {
    if (value === undefined || value === null) {
      return "";
    }

    return value;
  }

  removeNotNumbers(text) {
    return text.replace(/[^0-9]+/g, "");
  }

  removeWhiteSpaces(text) {
    return (text || "").replace(/\s/g, "");
  }
}
