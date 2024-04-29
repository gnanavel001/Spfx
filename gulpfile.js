"use strict";

const build = require("@microsoft/sp-build-web");

build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);

// Step 1 + './src/tailwind.css' + './tailwind.config.js'
let tailwindBuild = build.subTask(
  "build-tailwind",
  async (gulp, buildOptions, done) => {
    const postcss = require("gulp-postcss");
    const autoprefixer = require("autoprefixer");
    const tailwindcss = require("tailwindcss");

    gulp
      .src(`${buildOptions.srcFolder}/tailwind.css`)
      .pipe(postcss([tailwindcss("./tailwind.config.js"), autoprefixer()]))
      .pipe(gulp.dest(buildOptions.libFolder));

    done();
  }
);

build.rig.addPostBuildTask(tailwindBuild);
// End Step 1

build.initialize(require("gulp"));
