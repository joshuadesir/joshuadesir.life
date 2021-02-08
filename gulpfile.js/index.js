const child = require("child_process");
const browserSync = require("browser-sync").create();
const gutil = require("gulp-util");
const siteRoot = "_site";

const { parallel } = require("gulp");

async function Jekyll(cb, port) {
  const jekyll = child.spawn("bundle", [
    "exec",
    "jekyll",
    "build",
    "--watch",
    "--incremental"
  ]);

  const jekyllLogger = (buffer) => {
    buffer
      .toString()
      .split(/\n/)
      .forEach((message) => gutil.log("Jekyll: " + message));
  };

  jekyll.stdout.on("data", jekyllLogger);
  jekyll.stderr.on("data", jekyllLogger);
}

async function Serve(cb) {
  browserSync.init({
    files: [siteRoot + "/**"],
    open: false,
    port: 4000,
    server: {
      baseDir: siteRoot,
    },
  });
}

exports.serve = Serve;
exports.jekyll = Jekyll 
exports.default = parallel(Jekyll, Serve);