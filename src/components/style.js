import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  fonts: {
    heading: `-apple-system, blinkMacSystemFont,Helvetica Neue,Segoe UI,Roboto,Arial,Hiragino Kaku Gothic ProN,YuGothicM,YuGothic,Yu Gothic,Meiryo,sans-serif`,
    body: `-apple-system, blinkMacSystemFont,Helvetica Neue,Segoe UI,Roboto,Arial,Hiragino Kaku Gothic ProN,YuGothicM,YuGothic,Yu Gothic,Meiryo,sans-serif`,
  },
  styles: {
    global: {
      body: {
        lineHeight: "1.7em",
        userSelect: "none",
      },
      input : {
        userSelect: "text"
      }
    }
  }
})

export default theme