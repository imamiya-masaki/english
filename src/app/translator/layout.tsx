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
  console.log('dotenv', process.env.DEEPL_API_KEY)
  return (
    <div className={css(translatorCss)}>

      <div id="header">
        hogehoge
      </div>

      <div id="main">
      {children}
      </div>

    </div>
  )
}