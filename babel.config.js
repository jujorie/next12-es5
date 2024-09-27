// @ts-check

/** @type {import("@babel/core").ConfigFunction} */
module.exports = (api) => {
  api.cache.never()
  
  return {
    targets: "> 0.25%, not dead, ie 11",
    presets: [
      ["next/babel"]
    ]
  }
}