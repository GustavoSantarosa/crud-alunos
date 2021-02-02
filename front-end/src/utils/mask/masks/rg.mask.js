import BaseMask from "./_base.mask";

const RG_MASK = "99.999.999-9";

const validateRg = rg => {
  const exp = /\.|-|\//g;
  rg = rg.toString().replace(exp, "");
  return rg.length === 9;
};

export class RgMask extends BaseMask {
  static getType() {
    return "rg";
  }

  getValue(value, settings) {
    return this.getVMasker().toPattern(value, RG_MASK);
  }

  getRawValue(maskedValue, settings) {
    return super.removeNotNumbers(maskedValue);
  }

  validate(value, settings) {
    return validateRg(value);
  }
}
