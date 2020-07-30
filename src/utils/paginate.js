import _ from "lodash";

export function paginate(items, pageSize, pageNumber) {
  let startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex, startIndex + pageSize)
    .value();
}
