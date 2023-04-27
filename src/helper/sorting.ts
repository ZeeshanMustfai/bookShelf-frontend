type TSort = {
  title: string
}
export const ascSort = (a: TSort, b: TSort) => {
  if (a.title > b.title) return 1
  if (a.title < b.title) return -1

  return 0
}

export const descSort = (a: TSort, b: TSort) => {
  if (a.title > b.title) return -1
  if (a.title < b.title) return 1

  return 0
}