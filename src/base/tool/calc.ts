export const add = function (num1: number, num2: number): number {
  return num1 + num2
}

export const addWithCondition = function (bool: boolean) {
  return function (num1: number, num2: number): number | { num1: number, num2: number } {
    if (bool) {
      return num1 + num2
    } else {
      return { num1, num2 }
    }
  }
}

export default {
  add
}
