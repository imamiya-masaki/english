import { isTranslateRequestJson, responseJson } from './../../../type';
import { NextResponse } from "next/server";
import { client } from '../../../database/db';

require('dotenv').config();

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

export async function POST(request: Request) {
  const json = await request.json()
  let response: responseJson = { trasnlated: ""};

  const pageNumber = 1 // 仮のページ番号

  const book_id = 1 // 仮のbook_id
  
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

    const translatedText = fetchedJson.translations[0].text

    response.trasnlated = translatedText

    // DB追加処理はユーザーを待たせないようにする
    // TODO: 表示上追加されたような挙動をしたい場合は、返り値をもとにフロント側で構成する
    client.connect()
    .then(async() => {

      await client.query("BEGIN")
      await client.query(`insert into page (book_id, page_number) values ($1, $2)  ON CONFLICT DO NOTHING`, [book_id, pageNumber])
      await client.query("insert into sentense (book_id, page_number, text_en, text_ja) values ($1, $2, $3, $4)", [book_id, pageNumber, json.text, translatedText])
      await client.query("COMMIT")

    })
    .catch(err => {
      console.error({err})
    })
    .finally(() => {
      client.end()
    })
  
  } else {
    response.error = "type of request-json isn't `translateRequestJson`"
  }
  return NextResponse.json(response)
}