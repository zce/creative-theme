# Creative

[![Build Status][travis-image]][travis-url]
[![Release Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> A personal blogging theme for Ghost, inspired by [Casper](https://github.com/TryGhost/Casper)

## Usage

- download the [latest release zip file](https://github.com/zce/creative/releases/latest)
- upload the zip file to ghost-admin

### Development

```sh
# clone this repo
$ git clone https://github.com/zce/creative.git

# install the deps
$ cd creative && yarn

# run build & livereload task
$ yarn dev

# link to ghost themes dir
$ ln -s $PWD path/to/ghost/content/themes/creative

# restart ghost server
$ cd path/to/ghost && ghost restart --development
```

## Features

- [x] Search contents
- [x] Tags navigation
- [x] Gallery preview
- [x] Image lazyload
- [x] Infinite scroll
- [x] I18n support
- [x] Comments
- [ ] Custom template
- [ ] PJAX support
- [ ] jquery & js

## Templates

- [x] default.hbs
- [x] home.hbs
- [x] index.hbs
- [x] tag.hbs
- [x] author.hbs
- [x] page.hbs
- [x] page-archive.hbs
  + http://maxima.aspirethemes.com/tags/
  + http://storymag.gbjsolution.com/tag-archive/
- [ ] page-team.hbs
  + http://storymag.gbjsolution.com/author-archive/
- [x] post.hbs
- [x] custom-full-width.hbs
- [x] custom-wide.hbs
- [ ] amp.hbs
- [ ] subscribe.hbs
- [ ] private.hbs
- [x] error.hbs
- [ ] robots.txt

## References

- Custom Ghost Storage [zce/qiniu-store](https://github.com/zce/qiniu-store)

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; [汪磊](https://zce.me)



[travis-image]: https://img.shields.io/travis/zce/creative.svg
[travis-url]: https://travis-ci.org/zce/creative
[version-image]: https://img.shields.io/github/package-json/v/zce/creative.svg
[version-url]: https://github.com/zce/creative/releases
[license-image]: https://img.shields.io/github/license/zce/creative.svg
[license-url]: https://github.com/zce/creative/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/zce/creative.svg
[dependency-url]: https://david-dm.org/zce/creative
[devdependency-image]: https://img.shields.io/david/dev/zce/creative.svg
[devdependency-url]: https://david-dm.org/zce/creative?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: http://standardjs.com

<!--

- current: 8e865b797b24ee8115a6238d637815a4a68edeae
https://github.com/TryGhost/Casper/compare/8e865b797b24ee8115a6238d637815a4a68edeae...master
- current: 8a9efb5ef1b2caeaf4d09621490359dfc0646024
https://github.com/TryGhost/Casper/compare/8a9efb5ef1b2caeaf4d09621490359dfc0646024...master
- current: f695d69aeb6443c3d063d71557529d992ee7ca52
https://github.com/TryGhost/Casper/compare/f695d69aeb6443c3d063d71557529d992ee7ca52...master

{{!-- &laquo; Bad value cleartype for attribute http-equiv on element meta. &raquo; --}}
{{!-- <meta http-equiv="cleartype" content="on" /> --}}

-->
