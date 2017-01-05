# React Redux Sandbox

## Install

1. Install dependencies

  ```
  $ ./me install
  ```

1. Install React-devtools and Redux-devtools to a web browser.
  * [React-devtools](https://github.com/facebook/react-devtools)
  * [redux-devtools](https://github.com/zalmoxisus/redux-devtools-extension)


## Development

### Config

* `config.js`: Define environment variables.


### Build

`$ ./me build [--production]`

Details:
* `build/`: Emit transpiled js, css, and html here.
* `--production` option optimize and compress js and css.
* Image files are expaned into a css.

### Local Server

`$ ./me server [--production]`

Details:
* Run on [http://localhost:3000](http://localhost:3000)
* Build `src/script/` Incrementally

### Pre-rendering

```
./me build
./me webpack --config webpack.config.prerendering.js
```
