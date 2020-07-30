import _ from "lodash";

export function paginate(items, pageSize, pageNumber) {
  let startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex, startIndex + pageSize)
    .value();
}

export function filterList(items, genre) {
  return items.filter((item) => item.genre == genre);
}
