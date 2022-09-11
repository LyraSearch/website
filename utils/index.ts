export function unslugify (slug: string): string {
  const result = slug.replace(/\-/g, ' ')
  return result.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  })
}
