const fs = require("fs").promises;
const path = require("path");
const puppeteer = require("puppeteer");

async function analyzeCoverage() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // CSS 커버리지도 포함
  await page.coverage.startJSCoverage();
  await page.coverage.startCSSCoverage();

  // 웹사이트 방문 및 상호작용
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  // 필요한 상호작용 추가 (예: 로그인, 버튼 클릭 등)
  // await page.click('#login-button');
  // await page.waitForNavigation({ waitUntil: "networkidle0" });

  // 커버리지 수집 종료
  const jsCoverage = await page.coverage.stopJSCoverage();
  const cssCoverage = await page.coverage.stopCSSCoverage();

  // 결과 분석 및 저장
  const results = [];
  for (const entry of [...jsCoverage, ...cssCoverage]) {
    const totalBytes = entry.text.length;
    const usedBytes = entry.ranges.reduce(
      (sum, range) => sum + range.end - range.start,
      0,
    );
    const unusedBytes = totalBytes - usedBytes;
    const usedPercentage = ((usedBytes / totalBytes) * 100).toFixed(2);

    results.push({
      file: entry.url,
      totalBytes,
      usedBytes,
      unusedBytes,
      usedPercentage,
    });

    // 사용된 코드만 추출
    let usedCode = "";
    for (const range of entry.ranges) {
      usedCode += entry.text.slice(range.start, range.end);
    }

    // 파일 이름 추출 및 저장
    const fileName = path.basename(entry.url);
    await fs.writeFile(`used_${fileName}`, usedCode);
  }

  // 결과를 사용률 기준으로 정렬
  results.sort(
    (a, b) => parseFloat(a.usedPercentage) - parseFloat(b.usedPercentage),
  );

  // 결과 출력 및 파일로 저장
  let output = "Coverage Analysis Results:\n\n";
  for (const result of results) {
    output += `File: ${result.file}\n`;
    output += `Total bytes: ${result.totalBytes}\n`;
    output += `Used bytes: ${result.usedBytes} (${result.usedPercentage}%)\n`;
    output += `Unused bytes: ${result.unusedBytes} (${(100 - parseFloat(result.usedPercentage)).toFixed(2)}%)\n`;
    output += "---\n";
  }

  console.log(output);
  await fs.writeFile("coverage_analysis_results.txt", output);

  await browser.close();
}

analyzeCoverage().catch(console.error);
