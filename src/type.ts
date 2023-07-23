export type translateRequestJson = {
  text: string
}

export function isTranslateRequestJson (value: any): value is translateRequestJson {
  console.log('isTranslateRequestJson')
  return typeof value?.text === "string"
}

export type responseJson = {
  trasnlated: string,
  error?: string
}