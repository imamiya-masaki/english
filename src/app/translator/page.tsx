"use client"

import { css } from '../../../styled-system/css';
 

type SystemStyleObject = Parameters<typeof css>[0];

export default function Translator() {

  const topCss: SystemStyleObject = {
    display: "flex",
    margin: "0 autho;",
    paddingLeft: "100px",
    paddingRight: "100px",
    columnGap: "1%"
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



  return (
    <div>

      <div className={css(topCss)}>
        <div className={css(boxCss)} id="left">
          <textarea className={css(textareaCss)}>
            
          </textarea>
        </div>
        <div className={css(boxCss)} id="right">
          <textarea className={css(textareaCss)}>
            
          </textarea>
        </div>
      </div>

      <div >
        <button ></button>
      </div>
     
    </div>
  )
}