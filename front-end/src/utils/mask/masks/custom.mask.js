import BaseMask from "./_base.mask";
const TinyMask = require("tinymask");

const DEFAULT_TRANSLATION = {
  "9": function(val) {
    return val.replace(/[^0-9]+/g, "");
  },
  A: function(val) {
    return val.replace(/[^a-zA-Z]+/g, "");
  },
  S: function(val) {
    return val.replace(/[^a-zA-Z0-9]+/g, "");
  },
  "*": function(val) {
    return val;
  }
};

export class CustomMask extends BaseMask {
  static getType() {
    return "custom";
  }

  getValue(value, settings) {
    if (value === "") {
      return value;
    }
    let { mask } = settings;
    let translation = this.mergeSettings(
      DEFAULT_TRANSLATION,
      settings.translation
    );

    var masked = new TinyMask(mask, { translation }).mask(value);
    return masked;
  }

  getRawValue(maskedValue, settings) {
    if (!!settings && settings.getRawValue) {
      return settings.getRawValue(maskedValue, settings);
    }

    return maskedValue;
  }

  validate(value, settings) {
    if (!!settings && settings.validator) {
      return settings.validator(value, settings);
    }

    return true;
  }
}
