# lemezinez-kalkulator-release

Built releases of the LemezInez fence calculator. jsDelivr serves them to lemezinez.hu by tag:
`https://cdn.jsdelivr.net/gh/kovacsalex95/lemezinez-kalkulator-release@<tag>/build/kalkulator.js`.
The source, tests and release script live in [lemezinez-kalkulator](https://github.com/kovacsalex95/lemezinez-kalkulator).

Releases are made from the source repo with `node scripts/release.js`, never by hand here. The script replaces `build/kalkulator.js`, adds a `CHANGELOG.md` entry, tags the next version and prints the script tag for the page.
