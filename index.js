const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const rlInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rlInput.question("Enter filename: ", async (filename) => {
    const fileStream = fs.createReadStream(filename);

    fileStream.on("error", function (err) {
      console.error("Could not open file");
    });

    fileStream.on("ready", () => {
      rlInput.question("Enter pattern: ", async (pattern) => {
        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity,
        });

        for await (const line of rl) {
          if (line.match(pattern)) console.log(line);
        }

        rlInput.close();
      });
    });
  });
}

processLineByLine();
