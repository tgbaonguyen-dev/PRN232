const { chromium } = require("playwright");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const steps = [
  {
    index: 0,
    filename: "01_home_PRN232_intro.mp4",
    title: "01 - Mở đầu: PRN232 Distributed Architectures",
  },
  {
    index: 1,
    filename: "02_overview_soap.mp4",
    title: "02 - Kiến trúc SOAP: The Contract",
  },
  {
    index: 2,
    filename: "03_overview_rest.mp4",
    title: "03 - Kiến trúc REST: The Resource",
  },
  {
    index: 3,
    filename: "04_overview_graphql.mp4",
    title: "04 - Kiến trúc GraphQL: The Query",
  },
  {
    index: 4,
    filename: "05_overview_grpc.mp4",
    title: "05 - Kiến trúc gRPC: The Performance",
  },
  {
    index: 5,
    filename: "06_compare_table_cycle.mp4",
    title: "06 - Bảng so sánh 4 kiến trúc",
  },
  {
    index: 6,
    filename: "07_tradeoffs_design.mp4",
    title: "07 - Các đánh đổi trong thiết kế API",
  },
  {
    index: 7,
    filename: "08_case_study_student_rest.mp4",
    title: "08 - Bài toán thực tế: Quản lý sinh viên REST",
  },
  {
    index: 8,
    filename: "09_demo_200_ok.mp4",
    title: "09 - Live Demo: 200 OK Thành công",
  },
  {
    index: 9,
    filename: "10_demo_304_not_modified.mp4",
    title: "10 - Live Demo: 304 Not Modified Cache ETag",
  },
  {
    index: 10,
    filename: "11_demo_403_forbidden.mp4",
    title: "11 - Live Demo: 403 Forbidden Phân quyền",
  },
  {
    index: 11,
    filename: "12_demo_404_not_found.mp4",
    title: "12 - Live Demo: 404 Not Found Không tìm thấy",
  },
  {
    index: 12,
    filename: "13_system_tier1_client.mp4",
    title: "13 - Hệ thống phân tầng: 01 Client Tier",
  },
  {
    index: 13,
    filename: "14_system_tier2_gateway.mp4",
    title: "14 - Hệ thống phân tầng: 02 Gateway Tier",
  },
  {
    index: 14,
    filename: "15_system_tier3_application.mp4",
    title: "15 - Hệ thống phân tầng: 03 Application Tier",
  },
  {
    index: 15,
    filename: "16_system_tier4_persistence.mp4",
    title: "16 - Hệ thống phân tầng: 04 Persistence Tier",
  },
  {
    index: 16,
    filename: "17_references_standards.mp4",
    title: "17 - Tài liệu tham khảo & Nguồn chuẩn",
  },
  {
    index: 17,
    filename: "18_decision_priority_01.mp4",
    title: "18 - Khung lựa chọn: Priority 01 CRUD & REST",
  },
  {
    index: 18,
    filename: "19_decision_priority_02.mp4",
    title: "19 - Khung lựa chọn: Priority 02 UI & GraphQL",
  },
  {
    index: 19,
    filename: "20_decision_priority_03.mp4",
    title: "20 - Khung lựa chọn: Priority 03 Streaming & gRPC",
  },
  {
    index: 20,
    filename: "21_decision_priority_04.mp4",
    title: "21 - Khung lựa chọn: Priority 04 Legacy & SOAP",
  },
];

const OUTPUT_DIR = path.resolve(__dirname, "videos");
const TEMP_DIR = path.resolve(__dirname, "temp_video_raw");

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

async function recordStep(step, browser) {
  const stepTempDir = path.join(TEMP_DIR, `step_${step.index}`);
  if (!fs.existsSync(stepTempDir))
    fs.mkdirSync(stepTempDir, { recursive: true });

  console.log(`[START] Step ${step.index + 1}/21: ${step.title}`);

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: stepTempDir,
      size: { width: 1920, height: 1080 },
    },
  });

  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });

  // Apply target step
  await page.evaluate((idx) => {
    if (window.deck && window.deck.applyStep) {
      window.deck.applyStep(idx);
    }
  }, step.index);

  // Wait 1s for initial transition, then record for 30s
  await page.waitForTimeout(31500);

  // Close page and context to finalize video recording
  await page.close();
  await context.close();

  // Find the generated webm file
  const videoFiles = fs
    .readdirSync(stepTempDir)
    .filter((f) => f.endsWith(".webm"));
  if (videoFiles.length === 0) {
    throw new Error(`No video recorded for step ${step.index}`);
  }

  const rawWebm = path.join(stepTempDir, videoFiles[0]);
  const outMp4 = path.join(OUTPUT_DIR, step.filename);

  console.log(
    `[CONVERT] Converting step ${step.index + 1} to MP4 (1080p 30fps, exactly 30.0s)...`,
  );
  execSync(
    `ffmpeg -y -i "${rawWebm}" -ss 00:00:01.000 -t 30.000 -c:v libx264 -pix_fmt yuv420p -r 30 -an -movflags +faststart "${outMp4}"`,
    {
      stdio: "inherit",
    },
  );

  // Clean up temp webm
  try {
    fs.rmSync(stepTempDir, { recursive: true, force: true });
  } catch (err) {}
  console.log(`[DONE] Finished ${step.filename}`);
}

async function run() {
  const targetIndex =
    process.argv[2] !== undefined ? parseInt(process.argv[2], 10) : null;
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--hide-scrollbars", "--disable-features=TranslateUI"],
  });

  try {
    if (targetIndex !== null && !isNaN(targetIndex)) {
      const step = steps.find((s) => s.index === targetIndex);
      if (step) {
        await recordStep(step, browser);
      } else {
        console.error(`Step index ${targetIndex} not found.`);
      }
    } else {
      // Run with concurrency of 3 workers
      const CONCURRENCY = 3;
      const queue = [...steps];

      async function worker(workerId) {
        while (queue.length > 0) {
          const step = queue.shift();
          if (step) {
            await recordStep(step, browser);
          }
        }
      }

      const workers = Array.from({ length: CONCURRENCY }, (_, i) =>
        worker(i + 1),
      );
      await Promise.all(workers);
      console.log(`\n🎉 All 21 videos recorded successfully in: ${OUTPUT_DIR}`);
    }
  } finally {
    await browser.close();
    try {
      if (fs.existsSync(TEMP_DIR)) {
        fs.rmSync(TEMP_DIR, { recursive: true, force: true });
      }
    } catch (e) {}
  }
}

run().catch((err) => {
  console.error("Recording error:", err);
  process.exit(1);
});
