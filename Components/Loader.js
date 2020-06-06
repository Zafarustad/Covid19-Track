import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={300}
    height={95}
    viewBox="0 0 300 100"
    backgroundColor="#ffa726"
    foregroundColor="#FCE474"
    {...props}
  >
    <Rect x="-8" y="15" rx="0" ry="0" width="300" height="30" />
  </ContentLoader>
)

export default MyLoader