const fs = require("fs").promises;
const path = require("path");
const sourceMap = require("source-map");

async function analyzeSourceMap(mapPath) {
  let output = `Analyzing: ${path.basename(mapPath)}\n`;
  try {
    const mapContent = await fs.readFile(mapPath, "utf8");
    const consumer = await new sourceMap.SourceMapConsumer(
      JSON.parse(mapContent),
    );

    output += "Source files in this map:\n";
    consumer.sources.forEach((source) => {
      output += `${source}\n`;
    });

    consumer.destroy();
  } catch (error) {
    output += `Error analyzing source map ${mapPath}: ${error}\n`;
  }
  return output;
}

async function analyzeAllSourceMaps() {
  const chunksDir = path.resolve(process.cwd(), ".next/static/chunks");
  let fullOutput = `Looking for source maps in: ${chunksDir}\n`;
  try {
    const files = await fs.readdir(chunksDir);
    fullOutput += `Found ${files.length} files in the chunks directory\n\n`;

    for (const file of files) {
      if (file.endsWith(".map")) {
        fullOutput += await analyzeSourceMap(path.join(chunksDir, file));
        fullOutput += "\n";
      }
    }

    // 결과를 파일로 저장
    await fs.writeFile("sourcemap-analysis.log", fullOutput);
    console.log(
      "Source map analysis complete. Results saved to sourcemap-analysis.log",
    );
  } catch (error) {
    console.error("Error during source map analysis:", error);
  }
}

module.exports = analyzeAllSourceMaps;
