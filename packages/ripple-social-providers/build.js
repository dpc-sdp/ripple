const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

console.log(
  JSON.stringify(
    process.argv.slice(2).reduce((acc, file) => {
      const entries = yaml.load(
        fs.readFileSync(path.resolve(process.cwd(), file), "utf8"), {}
      );

      for (const entry of entries) {
        delete entry.example_urls;
        delete entry.notes;

        acc.push(entry);
      }

      return acc;
    }, []),
    null,
    4
  )
);
