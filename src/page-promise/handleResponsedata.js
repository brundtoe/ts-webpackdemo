/**
 * formater authors i en array fra db.json
 */
export default function (data) {
  let res = ''
  for (const [key, value] of Object.entries(data)) {
    res += `<tr><td >${key}</td><td>${value}</td></tr>`
  }
  return res
}
