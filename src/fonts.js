import { Global } from "@emotion/react"

const Fonts = () => (
  <Global
    styles={`
    @font-face {
        font-family: YuGothicM;
        font-weight: normal;
        src: local("YuGothic-Medium"),
           /*Mediumを明示的に指定*/
          local("Yu Gothic Medium"),
           /*Chrome用*/
          local("YuGothic-Regular"); /* Windows8.1ではMediumがないのでRegularを指定 */
      }
      @font-face {
        font-family: YuGothicM;
        font-weight: bold;
        src: local("YoGothic-Bold"),
           /*Boldはそのまま*/
          local("Yu Gothic"); /* Chrome用*/
      }
      `}
  />
)

export default Fonts