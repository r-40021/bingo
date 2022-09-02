import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
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