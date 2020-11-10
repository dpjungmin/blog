const React = require("react")
const {
  GlobalContextProvider,
} = require("./src/context/global-context-provider")

exports.wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}
