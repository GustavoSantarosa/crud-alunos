import MaskResolver from "./maskResolver";

export default class MaskService {
  static toMask(type, value, settings) {
    return MaskResolver.resolve(type).getValue(value, settings);
  }

  static isValid(type, value, settings) {
    return MaskResolver.resolve(type).validate(value, settings);
  }
}
