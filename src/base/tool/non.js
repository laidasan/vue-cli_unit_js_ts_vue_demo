export const nonInTestFunction = (val) => {
  let str = ''
  if (val == null) {
    str = 'null'
  } else {
    str = 'not null'
  }

  return str
}
