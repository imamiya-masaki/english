import { css } from '../../../styled-system/css';
require('dotenv').config();

type SystemStyleObject = Parameters<typeof css>[0];

const translatorCss: SystemStyleObject = {
    "display": "block"
  }

export default function TranslatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={css(translatorCss)}>

      <div id="header" className={css
      ({
        "textAlign": "center"
      })}>
        translator
      </div>

      <div id="main">
      {children}
      </div>

    </div>
  )
}