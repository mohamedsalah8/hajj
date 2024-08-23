import moment from "moment";

export const pramasCleanEmpty = (obj) => {
  if (Array.isArray(obj)) {
    return obj
      .map((v) =>
        v && typeof v === "object" && !(v instanceof Date) ? pramasCleanEmpty(v) : v
      )
      .filter((v) => !(v == null));
  } else {
    return Object.entries(obj)
      .map(([k, v]) => [
        k,
        v && typeof v === "object" && !(v instanceof Date) ? pramasCleanEmpty(v) : v,
      ])
      .reduce(
        (a, [k, v]) =>
          v == null ||
            v.length === 0 ||
            (Object.keys(v).length === 0 && v.constructor === Object)
            ? a
            : ((a[k] = v), a),
        {}
      );
  }
};
export const addDays = (theDate, days) => {
  return moment(theDate?.getTime() + days * 24 * 60 * 60 * 1000);
};
