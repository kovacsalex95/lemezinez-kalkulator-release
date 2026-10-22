# lemezinez-kalkulator-release

Built releases of the LemezInez fence calculator, published by hand as GitHub releases.
The source, tests and build script live in [lemezinez-kalkulator](https://github.com/kovacsalex95/lemezinez-kalkulator).

To make a release, run `node scripts/build_unas.js --hide-page-title` in the source repo.
Then attach the output from its `dist/` folder to a new release, tagged with the source commit it was built from.
