## [2.0.1](https://github.com/rollup-umd/documentation/compare/v2.0.0...v2.0.1) (2019-03-11)


### Bug Fixes

* **createConfig:** do not use moduleAliases directly but webpackConfig.resolve.alias ([777c55d](https://github.com/rollup-umd/documentation/commit/777c55d))

# [2.0.0](https://github.com/rollup-umd/documentation/compare/v1.3.19...v2.0.0) (2019-03-11)


### Features

* **react-styleguidist:** Upgrade react-styleguidist v8 to v9 ([7491c0d](https://github.com/rollup-umd/documentation/commit/7491c0d))


### BREAKING CHANGES

* **react-styleguidist:** CodeMirror context is unique per example, see
https://github.com/styleguidist/react-styleguidist/releases/tag/v9.0.0 for more info
* **react-styleguidist:** We do not need to list react-styleguidist in our
dependency

## [1.3.19](https://github.com/rollup-umd/documentation/compare/v1.3.18...v1.3.19) (2019-03-07)


### Bug Fixes

* **import:** Since v9.0.6 it was impossible to import $PACKAGE_NAME through webpackConfig.resolve.al ([37ca04a](https://github.com/rollup-umd/documentation/commit/37ca04a))

## [1.3.18](https://github.com/rollup-umd/documentation/compare/v1.3.17...v1.3.18) (2019-03-07)


### Bug Fixes

* **config:** components now accept index.js when parrent directory is uppercase ([44e8955](https://github.com/rollup-umd/documentation/commit/44e8955))
* **exampleMode:** expand ([9d00f08](https://github.com/rollup-umd/documentation/commit/9d00f08))

## [1.3.17](https://github.com/rollup-umd/documentation/compare/v1.3.16...v1.3.17) (2019-03-07)


### Bug Fixes

* **dependencies:** updated to rsg-components 2.0.0 and react-styleguidist:9.0.1 ([556af5e](https://github.com/rollup-umd/documentation/commit/556af5e))
* **dependencies:** updated to rsg-components 2.0.0 and react-styleguidist:9.0.1 ([f78969f](https://github.com/rollup-umd/documentation/commit/f78969f))
* **package.json:** updated dependencies + rsg-component for the nice code Higlighting. ([6286b87](https://github.com/rollup-umd/documentation/commit/6286b87))

## [1.3.16](https://github.com/rollup-umd/documentation/compare/v1.3.15...v1.3.16) (2019-02-25)


### Bug Fixes

* **dependencies:** fix highlight.js to version 9.12.0 due to issue https://github.com/styleguidist/react-styleguidist/issues/1287 ([3153880](https://github.com/rollup-umd/documentation/commit/3153880))

## [1.3.15](https://github.com/rollup-umd/documentation/compare/v1.3.14...v1.3.15) (2019-02-25)


### Bug Fixes

* **dependencies:** upgrade all dependencies ([cd4eed0](https://github.com/rollup-umd/documentation/commit/cd4eed0))

## [1.3.14](https://github.com/rollup-umd/documentation/compare/v1.3.13...v1.3.14) (2019-02-19)


### Bug Fixes

* **dependencies:** upgrade all dependencies ([5f4c08f](https://github.com/rollup-umd/documentation/commit/5f4c08f))
* **meta:** fixed in html template meta for robots ([90a77cc](https://github.com/rollup-umd/documentation/commit/90a77cc))

## [1.3.13](https://github.com/rollup-umd/documentation/compare/v1.3.12...v1.3.13) (2019-02-03)


### Bug Fixes

* **dependencies:** Upgrade [@bootstrap-styled](https://github.com/bootstrap-styled)/rsg-components to v1.1.12 ([02b3a1b](https://github.com/rollup-umd/documentation/commit/02b3a1b))

## [1.3.12](https://github.com/rollup-umd/documentation/compare/v1.3.11...v1.3.12) (2019-02-03)


### Bug Fixes

* **dependencies:** Upgrade rsg-components to v1.1.11 ([ed0202a](https://github.com/rollup-umd/documentation/commit/ed0202a))

## [1.3.11](https://github.com/rollup-umd/documentation/compare/v1.3.10...v1.3.11) (2019-02-03)


### Bug Fixes

* **dependencies:** install missing loaders ([e8b7c4e](https://github.com/rollup-umd/documentation/commit/e8b7c4e))

## [1.3.10](https://github.com/rollup-umd/documentation/compare/v1.3.9...v1.3.10) (2019-02-03)


### Bug Fixes

* **dependencies:** Upgrade rsg-components to v1.1.10 ([39dd124](https://github.com/rollup-umd/documentation/commit/39dd124))

## [1.3.9](https://github.com/rollup-umd/documentation/compare/v1.3.8...v1.3.9) (2019-02-03)


### Bug Fixes

* **dependencies:** Upgrade rsg-components and fixed terser 3.14.1  and remove file-loader and style-loader dependencies ([6813d5b](https://github.com/rollup-umd/documentation/commit/6813d5b))

## [1.3.8](https://github.com/rollup-umd/documentation/compare/v1.3.7...v1.3.8) (2019-02-03)


### Bug Fixes

* **createConfig:** fixed a case when dependencies or devDependencies does not exist in package.json, the createConfig was crashing ([6230ec2](https://github.com/rollup-umd/documentation/commit/6230ec2))

## [1.3.7](https://github.com/rollup-umd/documentation/compare/v1.3.6...v1.3.7) (2019-02-02)


### Bug Fixes

* **dependencies:** Upgrade all dependencies ([b1e2b81](https://github.com/rollup-umd/documentation/commit/b1e2b81))

## [1.3.6](https://github.com/rollup-umd/documentation/compare/v1.3.5...v1.3.6) (2019-01-31)


### Bug Fixes

* **dependencies:** Upgrade all dependencies to latest ([c012ae7](https://github.com/rollup-umd/documentation/commit/c012ae7))
* **dependencies:** Upgrade all to latest ([ffd2101](https://github.com/rollup-umd/documentation/commit/ffd2101))

## [1.3.5](https://github.com/rollup-umd/documentation/compare/v1.3.4...v1.3.5) (2018-12-22)


### Bug Fixes

* **createConfig:** getComponentPathLine fix ([1218ba1](https://github.com/rollup-umd/documentation/commit/1218ba1))

## [1.3.4](https://github.com/rollup-umd/documentation/compare/v1.3.3...v1.3.4) (2018-12-22)


### Bug Fixes

* **createConfig:** getComponentPathLine can handle [@svgr](https://github.com/svgr)/webpack path for SVGs ([428cb81](https://github.com/rollup-umd/documentation/commit/428cb81))

## [1.3.3](https://github.com/rollup-umd/documentation/compare/v1.3.2...v1.3.3) (2018-12-22)


### Bug Fixes

* **dependencies:** upgrade dependencies ([d7f94b4](https://github.com/rollup-umd/documentation/commit/d7f94b4))

## [1.3.2](https://github.com/rollup-umd/documentation/compare/v1.3.1...v1.3.2) (2018-12-21)


### Bug Fixes

* **dependencies:** uggrade all dependencies ([c4091f2](https://github.com/rollup-umd/documentation/commit/c4091f2))
* **ga:** set GA_TRACKING_ID to get analytics ([11b570b](https://github.com/rollup-umd/documentation/commit/11b570b))

## [1.3.1](https://github.com/rollup-umd/documentation/compare/v1.3.0...v1.3.1) (2018-12-16)


### Bug Fixes

* **greenkeeper:** do not execute sonar by default ([1bf7464](https://github.com/rollup-umd/documentation/commit/1bf7464))

# [1.3.0](https://github.com/rollup-umd/documentation/compare/v1.2.0...v1.3.0) (2018-12-16)


### Features

* **greenkeeper:** Added greenkeeper and updated all dependencies ([d84f159](https://github.com/rollup-umd/documentation/commit/d84f159))

# [1.2.0](https://github.com/rollup-umd/documentation/compare/v1.1.0...v1.2.0) (2018-12-10)


### Features

* **options:** adding options.js for hooking options ([30ce774](https://github.com/rollup-umd/documentation/commit/30ce774))

# [1.1.0](https://github.com/rollup-umd/documentation/compare/v1.0.22...v1.1.0) (2018-12-10)


### Features

* **themeColor:** added option themeColor for adding meta theme color ([5d00f35](https://github.com/rollup-umd/documentation/commit/5d00f35))

## [1.0.22](https://github.com/rollup-umd/documentation/compare/v1.0.21...v1.0.22) (2018-12-09)


### Bug Fixes

* **dependencies:** Update [@bootstrap-styled](https://github.com/bootstrap-styled)/rsg-components to 1.0.15 ([ebeaab0](https://github.com/rollup-umd/documentation/commit/ebeaab0))

## [1.0.21](https://github.com/rollup-umd/documentation/compare/v1.0.20...v1.0.21) (2018-12-09)


### Bug Fixes

* **dependencies:** Upgrade rsg-components to v1.0.14 ([343529c](https://github.com/rollup-umd/documentation/commit/343529c))

## [1.0.20](https://github.com/rollup-umd/documentation/compare/v1.0.19...v1.0.20) (2018-12-09)


### Bug Fixes

* **dependencies:** Update rsg-components and styled-components ([7aa4f02](https://github.com/rollup-umd/documentation/commit/7aa4f02))

## [1.0.19](https://github.com/rollup-umd/documentation/compare/v1.0.18...v1.0.19) (2018-12-09)


### Bug Fixes

* **createConfig:** create config ([d56b614](https://github.com/rollup-umd/documentation/commit/d56b614))

## [1.0.18](https://github.com/rollup-umd/documentation/compare/v1.0.17...v1.0.18) (2018-12-05)


### Bug Fixes

* **documentation:** fixing default example having wrong import ([94fe0b5](https://github.com/rollup-umd/documentation/commit/94fe0b5))
* **documentation:** update documentation ([96dc6d4](https://github.com/rollup-umd/documentation/commit/96dc6d4))
* **ribbon:** added ribbon url ([92a1485](https://github.com/rollup-umd/documentation/commit/92a1485))

## [1.0.17](https://github.com/rollup-umd/documentation/compare/v1.0.16...v1.0.17) (2018-12-04)


### Bug Fixes

* **dependencies:** update [@bootstrap-styled](https://github.com/bootstrap-styled)/rsg-components to v1.0.11 ([cdf421b](https://github.com/rollup-umd/documentation/commit/cdf421b))

## [1.0.16](https://github.com/rollup-umd/documentation/compare/v1.0.15...v1.0.16) (2018-12-03)


### Bug Fixes

* **createConfig:** fixing wrong import for default Wrapper and StyleGuide ([feb0a32](https://github.com/rollup-umd/documentation/commit/feb0a32))

## [1.0.15](https://github.com/rollup-umd/documentation/compare/v1.0.14...v1.0.15) (2018-12-03)


### Bug Fixes

* **createConfig:** fixed default Wrapper and Layout path using __dirname instead of base for their import ([6906e6c](https://github.com/rollup-umd/documentation/commit/6906e6c))

## [1.0.14](https://github.com/rollup-umd/documentation/compare/v1.0.13...v1.0.14) (2018-12-03)


### Bug Fixes

* **createConfig:** thisPkg was wrong ([abd6c8d](https://github.com/rollup-umd/documentation/commit/abd6c8d))

## [1.0.13](https://github.com/rollup-umd/documentation/compare/v1.0.12...v1.0.13) (2018-12-03)


### Bug Fixes

* **jsdom:** remove sed fix and using updateExample in react-styleguidist configuration ([aa265eb](https://github.com/rollup-umd/documentation/commit/aa265eb))

## [1.0.12](https://github.com/rollup-umd/documentation/compare/v1.0.11...v1.0.12) (2018-12-03)


### Bug Fixes

* **release:** GitHub release https://github.com/rollup-umd/documentation ([59c4863](https://github.com/rollup-umd/documentation/commit/59c4863))

## [1.0.11](https://module.kopaxgroup.com/rollup-umd/documentation/compare/v1.0.10...v1.0.11) (2018-12-03)


### Bug Fixes

* **dependencies:** upgrade rsg-components to 1.0.10 ([eb844a4](https://module.kopaxgroup.com/rollup-umd/documentation/commit/eb844a4))
* **dependencies:** upgrade rsg-components to 1.0.10 ([3b6d92f](https://module.kopaxgroup.com/rollup-umd/documentation/commit/3b6d92f))
* **dependencies:** upgrade rsg-components to 1.0.10 ([89a4b5b](https://module.kopaxgroup.com/rollup-umd/documentation/commit/89a4b5b))

## [1.0.10](https://module.kopaxgroup.com/rollup-umd/documentation/compare/v1.0.9...v1.0.10) (2018-12-03)


### Bug Fixes

* **loaders:** not using internals loaders in this project ([95273e3](https://module.kopaxgroup.com/rollup-umd/documentation/commit/95273e3))

## [1.0.9](https://module.kopaxgroup.com/rollup-umd/documentation/compare/v1.0.8...v1.0.9) (2018-12-03)


### Bug Fixes

* **createConfig:** added favicons options ([bf288a4](https://module.kopaxgroup.com/rollup-umd/documentation/commit/bf288a4))
* **documentation:** commit ([219c9dd](https://module.kopaxgroup.com/rollup-umd/documentation/commit/219c9dd))

## [1.0.8](https://module.kopaxgroup.com/rollup-umd/documentation/compare/v1.0.7...v1.0.8) (2018-12-03)


### Bug Fixes

* **dependencies:** [@bootstrap-styled](https://module.kopaxgroup.com/bootstrap-styled)/rsg ([64eec21](https://module.kopaxgroup.com/rollup-umd/documentation/commit/64eec21))

## [1.0.7](https://module.kopaxgroup.com/rollup-umd/documentation/compare/v1.0.6...v1.0.7) (2018-12-03)


### Bug Fixes

* **dependencies:** installed dependencies url-loader and file-loader ([b159ff6](https://module.kopaxgroup.com/rollup-umd/documentation/commit/b159ff6))

## [1.0.6](https://module.kopaxgroup.com/rollup-umd/documentation/compare/v1.0.5...v1.0.6) (2018-11-30)


### Bug Fixes

* **ci:** createConfig ([232b216](https://module.kopaxgroup.com/rollup-umd/documentation/commit/232b216))
* **createConfig:** adding logs and fix layout configuration ([a176337](https://module.kopaxgroup.com/rollup-umd/documentation/commit/a176337))

## [1.0.5](https://module.kopaxgroup.com/rollup-umd/documentation/compare/v1.0.4...v1.0.5) (2018-11-30)


### Bug Fixes

* **createConfig:** fixing loader ([8ef1257](https://module.kopaxgroup.com/rollup-umd/documentation/commit/8ef1257))

## [1.0.4](https://module.kopaxgroup.com/rollup-umd/documentation/compare/v1.0.3...v1.0.4) (2018-11-30)


### Bug Fixes

* **loaders:** fix loaders being wrongly configured ([16bd68f](https://module.kopaxgroup.com/rollup-umd/documentation/commit/16bd68f))

## [1.0.3](https://module.kopaxgroup.com/rollup-umd/documentation/compare/v1.0.2...v1.0.3) (2018-11-30)


### Bug Fixes

* **createConfig:** fix createConfig ([f542de8](https://module.kopaxgroup.com/rollup-umd/documentation/commit/f542de8))
* **dependencies:** install react react-dom and styled-components as dependencies dependencies ([944b00f](https://module.kopaxgroup.com/rollup-umd/documentation/commit/944b00f))
* **dependencies:** install react react-dom and styled-components as dependencies dependencies, ([ca63c59](https://module.kopaxgroup.com/rollup-umd/documentation/commit/ca63c59))

## [1.0.2](https://module.kopaxgroup.com/rollup-umd/documentation/compare/v1.0.1...v1.0.2) (2018-11-30)


### Bug Fixes

* **createConfig:** fix bugs on documentation layout and wrapper when auto confiuration happen ([b91f8b9](https://module.kopaxgroup.com/rollup-umd/documentation/commit/b91f8b9))

## [1.0.1](https://module.kopaxgroup.com/rollup-umd/documentation/compare/v1.0.0...v1.0.1) (2018-11-30)


### Bug Fixes

* **doc:** improve getting started ([bde54b0](https://module.kopaxgroup.com/rollup-umd/documentation/commit/bde54b0))

# 1.0.0 (2018-11-30)


### Features

* **documentation:** new documentation. this package replace [@yeutech-lab](https://module.kopaxgroup.com/yeutech-lab)/rollup-umd-documentation ([34e0171](https://module.kopaxgroup.com/rollup-umd/documentation/commit/34e0171))
