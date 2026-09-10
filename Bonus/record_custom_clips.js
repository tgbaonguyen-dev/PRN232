const { chromium } = require("d:/Github/Repositories/PRN232/Bonus/node_modules/playwright");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.resolve("d:/Github/Repositories/PRN232/Bonus/videos/custom_clips");
const TEMP_DIR = path.resolve("d:/Github/Repositories/PRN232/Bonus/temp_video_custom");

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

// User clip plan:
// 1: 29s (Hero)
// 2: 27s (SOAP)
// 3: 29s (REST)
// 4: 24s (GraphQL)
// 5: 36s (gRPC)
// 6: 48s (Compare)
// 7: 47s (Tradeoffs)
// 8: 52s (Case Study)
// 9: 25s (Demo 200)
// 10: 20s (Demo 304)
// 11: 17s (Demo 403)
// 12: 18s (Demo 404)
// 13: 57s (System Tier 1-4 merged: 14s, 14s, 14s, 15s)
// 14: 14s (References)
// 15: 66s (Decision Priorities 1-4 merged: 16s, 16s, 17s, 17s)

const jobs = [
  {
    num: 1,
    filename: "01_home_hero.mp4",
    title: "1: Mở đầu (Hero)",
    duration: 29,
    action: async (page) => {
      await page.evaluate(() => window.deck?.applyStep(0));
      await page.waitForTimeout(29000);
    }
  },
  {
    num: 2,
    filename: "02_overview_soap.mp4",
    title: "2: SOAP: The Contract",
    duration: 27,
    action: async (page) => {
      await page.evaluate(() => window.deck?.applyStep(1));
      await page.waitForTimeout(27000);
    }
  },
  {
    num: 3,
    filename: "03_overview_rest.mp4",
    title: "3: REST: The Resource",
    duration: 29,
    action: async (page) => {
      await page.evaluate(() => window.deck?.applyStep(2));
      await page.waitForTimeout(29000);
    }
  },
  {
    num: 4,
    filename: "04_overview_graphql.mp4",
    title: "4: GraphQL: The Query",
    duration: 24,
    action: async (page) => {
      await page.evaluate(() => window.deck?.applyStep(3));
      await page.waitForTimeout(24000);
    }
  },
  {
    num: 5,
    filename: "05_overview_grpc.mp4",
    title: "5: gRPC: The Performance",
    duration: 36,
    action: async (page) => {
      await page.evaluate(() => window.deck?.applyStep(4));
      await page.waitForTimeout(36000);
    }
  },
  {
    num: 6,
    filename: "06_compare_table.mp4",
    title: "6: Bảng so sánh",
    duration: 48,
    action: async (page) => {
      await page.evaluate(() => window.deck?.applyStep(5));
      await page.waitForTimeout(48000);
    }
  },
  {
    num: 7,
    filename: "07_tradeoffs.mp4",
    title: "7: Sự đánh đổi trong thiết kế",
    duration: 47,
    action: async (page) => {
      await page.evaluate(() => window.deck?.applyStep(6));
      await page.waitForTimeout(47000);
    }
  },
  {
    num: 8,
    filename: "08_case_study.mp4",
    title: "8: Bài toán thực tế sinh viên REST",
    duration: 52,
    action: async (page) => {
      await page.evaluate(() => window.deck?.applyStep(7));
      await page.waitForTimeout(52000);
    }
  },
  {
    num: 9,
    filename: "09_demo_200.mp4",
    title: "9: Live Demo 200 OK",
    duration: 25,
    action: async (page) => {
      await page.evaluate(() => window.deck?.applyStep(8));
      await page.waitForTimeout(25000);
    }
  },
  {
    num: 10,
    filename: "10_demo_304.mp4",
    title: "10: Live Demo 304 Not Modified",
    duration: 20,
    action: async (page) => {
      await page.evaluate(() => window.deck?.applyStep(9));
      await page.waitForTimeout(20000);
    }
  },
  {
    num: 11,
    filename: "11_demo_403.mp4",
    title: "11: Live Demo 403 Forbidden",
    duration: 17,
    action: async (page) => {
      await page.evaluate(() => window.deck?.applyStep(10));
      await page.waitForTimeout(17000);
    }
  },
  {
    num: 12,
    filename: "12_demo_404.mp4",
    title: "12: Live Demo 404 Not Found",
    duration: 18,
    action: async (page) => {
      await page.evaluate(() => window.deck?.applyStep(11));
      await page.waitForTimeout(18000);
    }
  },
  {
    num: 13,
    filename: "13_system_tiers_merged.mp4",
    title: "13: Hệ thống phân tầng gộp (Tier 1-4: 14s + 14s + 14s + 15s = 57s)",
    duration: 57,
    action: async (page) => {
      // Tier 1 (Step 12): 14s
      await page.evaluate(() => window.deck?.applyStep(12));
      await page.waitForTimeout(14000);
      // Tier 2 (Step 13): 14s
      await page.evaluate(() => window.deck?.applyStep(13));
      await page.waitForTimeout(14000);
      // Tier 3 (Step 14): 14s
      await page.evaluate(() => window.deck?.applyStep(14));
      await page.waitForTimeout(14000);
      // Tier 4 (Step 15): 15s
      await page.evaluate(() => window.deck?.applyStep(15));
      await page.waitForTimeout(15000);
    }
  },
  {
    num: 14,
    filename: "14_references.mp4",
    title: "14: Tài liệu tham khảo & Nguồn chuẩn",
    duration: 14,
    action: async (page) => {
      await page.evaluate(() => window.deck?.applyStep(16));
      await page.waitForTimeout(14000);
    }
  },
  {
    num: 15,
    filename: "15_decision_priorities_merged.mp4",
    title: "15: Khung lựa chọn gộp (Priority 01-04: 16s + 16s + 17s + 17s = 66s)",
    duration: 66,
    action: async (page) => {
      // Priority 01 (Step 17): 16s
      await page.evaluate(() => window.deck?.applyStep(17));
      await page.waitForTimeout(16000);
      // Priority 02 (Step 18): 16s
      await page.evaluate(() => window.deck?.applyStep(18));
      await page.waitForTimeout(16000);
      // Priority 03 (Step 19): 17s
      await page.evaluate(() => window.deck?.applyStep(19));
      await page.waitForTimeout(17000);
      // Priority 04 (Step 20): 17s
      await page.evaluate(() => window.deck?.applyStep(20));
      await page.waitForTimeout(17000);
    }
  }
];

async function recordJob(job, browser) {
  const jobTempDir = path.join(TEMP_DIR, `job_${job.num}`);
  if (!fs.existsSync(jobTempDir)) fs.mkdirSync(jobTempDir, { recursive: true });

  console.log(`[START] Clip ${job.num}/15: ${job.title} (${job.duration}s)...`);

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: jobTempDir,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // Run the job action
  await job.action(page);

  // Extra padding before closing to guarantee last frame captured
  await page.waitForTimeout(500);

  await page.close();
  await context.close();

  // Find the generated webm
  const files = fs.readdirSync(jobTempDir).filter((f) => f.endsWith(".webm"));
  if (!files.length) {
    throw new Error(`No webm file produced for job ${job.num}`);
  }

  const rawWebm = path.join(jobTempDir, files[0]);
  const outMp4 = path.join(OUTPUT_DIR, job.filename);

  console.log(`  -> Converting to MP4: ${job.filename} (exactly ${job.duration}.000s)...`);
  execSync(
    `ffmpeg -y -i "${rawWebm}" -ss 00:00:01.000 -t ${job.duration}.000 -c:v libx264 -pix_fmt yuv420p -r 30 -an -movflags +faststart "${outMp4}"`,
    { stdio: "ignore" }
  );

  try {
    fs.rmSync(jobTempDir, { recursive: true, force: true });
  } catch (e) {}

  const stats = fs.statSync(outMp4);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`  ✓ Xong: ${job.filename} (${sizeMB} MB)`);
}

async function run() {
  console.log("=== BẮT ĐẦU QUAY 15 CLIPS THEO THỜI LƯỢNG YÊU CẦU ===");
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
    args: ["--hide-scrollbars", "--disable-features=TranslateUI"]
  });

  try {
    // Run concurrently with 3 browser contexts
    const CONCURRENCY = 3;
    const queue = [...jobs];

    async function worker(workerId) {
      while (queue.length > 0) {
        const job = queue.shift();
        if (job) {
          await recordJob(job, browser);
        }
      }
    }

    const workers = Array.from({ length: CONCURRENCY }, (_, i) => worker(i + 1));
    await Promise.all(workers);

    console.log("\n🎉 HOÀN TẤT TẤT CẢ 15 CLIPS TẠI:", OUTPUT_DIR);
  } finally {
    await browser.close();
    try {
      if (fs.existsSync(TEMP_DIR)) fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    } catch (e) {}
  }
}

run().catch((err) => {
  console.error("Recording error:", err);
  process.exit(1);
});
