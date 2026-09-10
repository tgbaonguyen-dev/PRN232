const { chromium } = require("d:/Github/Repositories/PRN232/Bonus/node_modules/playwright");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const WORKSPACE_DIR = "d:/Github/Repositories/PRN232/Bonus";
const OUTPUT_DIR = path.resolve(WORKSPACE_DIR, "videos");
const TEMP_DIR = path.resolve(WORKSPACE_DIR, "temp_video_full");

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

const stepTitles = [
  "01 - Mở đầu: Bốn kiến trúc API",
  "02 - Kiến trúc SOAP: The Contract",
  "03 - Kiến trúc REST: The Resource",
  "04 - Kiến trúc GraphQL: The Query",
  "05 - Kiến trúc gRPC: The Performance",
  "06 - Bảng so sánh 4 kiến trúc",
  "07 - Các đánh đổi trong thiết kế API",
  "08 - Bài toán thực tế: Quản lý sinh viên REST",
  "09 - Live Demo: 200 OK Thành công",
  "10 - Live Demo: 304 Not Modified Cache ETag",
  "11 - Live Demo: 403 Forbidden Phân quyền",
  "12 - Live Demo: 404 Not Found Không tìm thấy",
  "13 - Hệ thống phân tầng: 01 Client Tier",
  "14 - Hệ thống phân tầng: 02 Gateway Tier",
  "15 - Hệ thống phân tầng: 03 Application Tier",
  "16 - Hệ thống phân tầng: 04 Persistence Tier",
  "17 - Tài liệu tham khảo & Nguồn chuẩn",
  "18 - Khung lựa chọn: Priority 01 CRUD & REST",
  "19 - Khung lựa chọn: Priority 02 UI & GraphQL",
  "20 - Khung lựa chọn: Priority 03 Streaming & gRPC",
  "21 - Khung lựa chọn: Priority 04 Legacy & SOAP"
];

async function record() {
  console.log("=== BẮT ĐẦU QUAY VIDEO TOÀN BỘ BÀI THUYẾT TRÌNH (15s MỖI BƯỚC) ===");
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
    args: ["--hide-scrollbars", "--disable-features=TranslateUI"]
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: TEMP_DIR,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();
  console.log("Đang tải trang trình chiếu http://127.0.0.1:5173 ...");
  await page.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Đảm bảo bắt đầu từ bước 0
  await page.evaluate(() => {
    if (window.deck && window.deck.applyStep) {
      window.deck.applyStep(0);
    }
  });
  await page.waitForTimeout(1000);

  const STEP_DURATION_MS = 15000;
  const TOTAL_STEPS = 21;

  for (let i = 0; i < TOTAL_STEPS; i++) {
    const title = stepTitles[i] || `Bước ${i + 1}`;
    console.log(`[${i + 1}/${TOTAL_STEPS}] Đang quay: ${title} (15 giây)...`);

    if (i > 0) {
      await page.keyboard.press("ArrowRight");
    }

    // Chờ đúng 15 giây cho từng lần bấm mũi tên
    await page.waitForTimeout(STEP_DURATION_MS);
  }

  console.log("Đã duyệt xong 21 bước. Đang đóng trình duyệt để xuất video thô...");
  await page.close();
  await context.close();
  await browser.close();

  // Tìm file webm sinh ra
  const videoFiles = fs.readdirSync(TEMP_DIR).filter((f) => f.endsWith(".webm"));
  if (videoFiles.length === 0) {
    throw new Error("Không tìm thấy file video raw .webm");
  }

  const rawWebm = path.join(TEMP_DIR, videoFiles[0]);
  const outMp4 = path.join(OUTPUT_DIR, "api_atlas_presentation_15s.mp4");

  console.log(`Đang dùng FFmpeg chuyển đổi sang MP4 chuẩn 1080p 30fps: ${outMp4} ...`);
  execSync(
    `ffmpeg -y -i "${rawWebm}" -c:v libx264 -pix_fmt yuv420p -r 30 -an -movflags +faststart "${outMp4}"`,
    { stdio: "inherit" }
  );

  // Dọn dẹp thư mục tạm
  try {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  } catch (err) {}

  const stats = fs.statSync(outMp4);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n🎉 THÀNH CÔNG! Video đã được tạo tại:`);
  console.log(`👉 Đường dẫn: ${outMp4}`);
  console.log(`👉 Dung lượng: ${sizeMB} MB`);
}

record().catch((err) => {
  console.error("Lỗi khi quay video:", err);
  process.exit(1);
});
