// VARIABLES USED IN EXAMPLES
const name = 'Alex'
const greeting = 'Hi'

// REGULAR TEMPLATE LITERAL
console.log(`${greeting} ${name}, how are you?`)

// TAGGED TEMPLATE LITERAL
/* With a tagged template literal we have more power to do what we want with the template literal */
/* a tag takes in the array of strings, and the variales passed to the template literal */
const myTag = (strings, ...vals) => {
  console.log(strings, vals)
  let str = ''
  strings.forEach((string, i) => {
    str += string + (vals[i] || '')
  })
  return str
}

const result = myTag `${greeting} ${name}, how are you?`
console.log(result)


