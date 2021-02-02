import BaseMask from "./_base.mask";

export class Integer extends BaseMask {
  static getType() {
    return "integer";
  }

  getValue(value, settings) {
    let removeMask = value;

    if (!removeMask) removeMask = "0";
    removeMask = removeMask.substr(0, 20).replace(/[^0-9]+/g, "");

    if (isNaN(removeMask) || removeMask === "NaN") removeMask = "0";

    return parseFloat(removeMask).toLocaleString("pt-br", {
      style: "decimal"
    });
  }
}
