import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  fonts: {
    heading: `-apple-system, blinkMacSystemFont,Helvetica Neue,Segoe UI,Roboto,Arial,Hiragino Kaku Gothic ProN, "游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic",Meiryo,sans-serif`,
    body: `-apple-system, blinkMacSystemFont,Helvetica Neue,Segoe UI,Roboto,Arial,Hiragino Kaku Gothic ProN, "游ゴシック体", YuGothic, "游ゴシック Medium", "Yu Gothic Medium", "游ゴシック", "Yu Gothic",Meiryo,sans-serif`,
  },
})

export default theme