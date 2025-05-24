import { curry } from "lodash";

// /**
//  * @param {Object} type
//  * @param {String} key
//  * @returns {string}
//  */
export const enumDecode = curry((type, key) => {
  return type[key] || key;
});

export const enumEncode = curry(
  (type, value) =>
    Object.entries(type).find(([, v]) => v === value)?.[0] || value
);

export const enumKeys = (type) => Object.keys(type).sort();

export const enumValues = (type) => Object.values(type).sort();

export const enumSelectItems = (type) =>
  Object.entries(type).map(([key, value]) => ({
    key,
    value,
  }));

export const shipComponentClass = {
  CIVILIAN: "Civilian",
  COMPETITION: "Competition",
  INDUSTRIAL: "Industrial",
  MILITARY: "Military",
  STEALTH: "Stealth",
};

// console.log(
//   "enumEncode",
//   Object.entries(shipComponentClass),
//   Object.entries(shipComponentClass).find(
//     ([, value]) => value === "Industrial1"
//   )?.[0] || "Industrial"
//   // ?.map((data) => data)[0]
// );

export const shipComponentGrade = {
  A: "A",
  B: "B",
  C: "C",
  D: "D",
};

export const shipComponentSize = {
  S0: "0",
  S1: "1",
  S2: "2",
  S3: "3",
  S4: "4",
};

export const shipComponentType = {
  COOLER: "Cooler",
  POWER_PLANT: "Power Plant",
  QUANTUM_DRIVE: "Quantum Drive",
  SHIELD: "Shield",
};
