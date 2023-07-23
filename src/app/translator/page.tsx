"use client"

import { EventHandler, useState } from 'react';
import { css } from '../../../styled-system/css';
import { translateRequestJson, responseJson } from '@/type';
 

type SystemStyleObject = Parameters<typeof css>[0];

const NeumorphismCss: SystemStyleObject = {
  boxShadow: "-4px -4px 8px #fff, 4px 4px 8px rgb(0 0 0 / 24%)"
}

const TopMargin = 20;

const topCss: SystemStyleObject = {
  display: "flex",
  justifyContent: "center",
  // width: "99%",
  columnGap: "1%",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: `${TopMargin}px`,
  marginBottom: `${TopMargin}px`
}

const boxCss: SystemStyleObject = {
  "minHeight": "clamp(150px, 250px, 500px)",
  "width": "calc(50% - 16px)",
}

const textareaCss: SystemStyleObject = {
  "width": "100%",
  "height": "100%",
  "backgroundColor": "#eeeeee",
}

const buttonCss: SystemStyleObject = {
  position: "relative",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  margin: "0 auto",
  maxWidth: "240px",
  padding: "10px 25px",
  color: "#543618",
  transition: "0.3s ease-in-out",
  fontWeight: "600",
  background: "#eeee",
  borderRadius: "50px",
  border: "0.2rem solid #543618",
  boxShadow: "0.2rem 0.2rem 0px 0.1rem #cccccc",
  _hover: {
    transform: "translate3d(0.2rem, 0.2rem, 0)",
    boxShadow: "none",
    opacity: 1,
    transition: "all 0.2s"
  }
}

export default function Translator() {

  const [translateENText, setTranslateENText] = useState("");

  const [translatedJAText, setTranslateJAText] = useState("");

  const translateHandler = async() => {

    const json: translateRequestJson = {
      text: translateENText
    }
    const result = await fetch("/api/translate", {
      method: "post",
      body: JSON.stringify(json)
    })
    const resulted: responseJson = await result.json()
    console.log({resulted})
    if (resulted.error) {
      console.error(resulted.error)
    } else {
      setTranslateJAText(resulted.trasnlated)
    }
  }

  return (
    <div>

      <div className={css(topCss)}>

        <label className={css(boxCss)} id="left">
          en:
          <textarea className={css(textareaCss)} value={translateENText} onChange={(e) => {
            setTranslateENText(e.target.value)
          }}/>
        </label>
        <label className={css(boxCss)} id="right">
          ja:
          <textarea className={css(textareaCss)} value={translatedJAText} readOnly />  
        </label>
      </div>

      <div id="button" >
        <button onClick={translateHandler} className={css(buttonCss)}>Translate</button>
      </div>
      
    </div>
  )
}