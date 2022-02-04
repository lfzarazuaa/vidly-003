import lodash from "lodash";

export function paginateCollection(collection, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return lodash(collection).slice(startIndex).take(pageSize).value();
}

export function calculteNumberOfItem(x, pageSize, pageNumber) {
  return x + 1 + pageSize * (pageNumber - 1);
}

export function updatePageNumber(itemsCount, pageSize, pageNumber) {
  if (pageNumber - 1 >= itemsCount / pageSize)
    return Math.floor(itemsCount / pageSize);
  return pageNumber;
}
