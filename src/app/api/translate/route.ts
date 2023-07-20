import { NextResponse } from "next/server";

require('dotenv').config();

type translateRequestJson = {
  text: string
}

type responseJson = {
  trasnlated: string,
  error?: string
}

type DeepLTargetLang = "EN" | "JA"

type DeepLRequestData = {
  text: string[],
  target_lang: DeepLTargetLang
}

type DeepLResponseData = {
  translations: {
    detected_source_language: DeepLTargetLang,
    text: string
  }[]
}

function isTranslateRequestJson (value: any): value is translateRequestJson {
  console.log('isTranslateRequestJson')
  return typeof value?.text === "string"
}

export async function POST(request: Request) {
  const json = await request.json()
  let response: responseJson = { trasnlated: ""};
  if (isTranslateRequestJson(json)) {
 
    const headers:HeadersInit = {
      "Authorization": `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      "Content-Type": "application/json"
    } 

    const deeplData: DeepLRequestData = {
      "text": [ json.text ],
      "target_lang": "JA"
    }


    const fetched = await fetch(`https://api-free.deepl.com/v2/translate`, {
      "method": "POST",
      "headers": headers,
      "body": JSON.stringify(deeplData)
    })



    const fetchedJson: DeepLResponseData = await fetched.json()

    response.trasnlated = fetchedJson.translations[0].text

  } else {
    response.error = "type of request-json isn't `translateRequestJson`"
  }
  return NextResponse.json(response)
}