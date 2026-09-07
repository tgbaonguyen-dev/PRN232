# API Atlas

Website thuyết trình tiếng Việt từ `SCRIPT.md`, dùng HTML/CSS/JavaScript thuần, không cần cài thư viện.

## Chạy

```sh
npm run dev
```

Mở http://localhost:5173. Hoặc mở trực tiếp `index.html` bằng trình duyệt.

## Sử dụng

- Chọn tab SOAP, REST, GraphQL, gRPC để xem cơ chế và code; tab hỗ trợ phím mũi tên, Home, End.
- Bảng so sánh có thể làm nổi bật từng kiến trúc.
- Live demo mô phỏng 200, 304, 403, 404; không gửi request tới hệ thống sinh viên thật.
- Chọn từng tầng hệ thống, đổi cache hit/miss và ưu tiên kiến trúc ở phần kết luận.
- Tải nguyên bản `SCRIPT.md` trong phần nguồn tham khảo.

## Nội dung và thiết kế

Đủ 8 phần của tài liệu, cộng trang mở đầu. Đồ họa kết nối được tạo bằng CSS/SVG; animation vào trang, scroll reveal, trạng thái tương tác, pipeline từng bước. Responsive cho điện thoại và hỗ trợ `prefers-reduced-motion`.

Nội dung được biên tập để trình bày, giữ nguyên tài liệu nguồn. Không dùng các tỷ lệ hiệu năng chưa có benchmark như cam kết. Quy mô 30.000+ là kịch bản đề xuất. Hồ sơ cá nhân dùng `Cache-Control: private`; phản hồi 304 không có body; 404 được mô phỏng bằng vai trò Admin để không mâu thuẫn phân quyền. Ví dụ Controller minh họa, cần triển khai service, JWT và cấu hình ứng dụng khi dùng trong backend thật.

Font Plus Jakarta Sans / Space Grotesk tải từ Google Fonts khi có Internet. Website và các tương tác vẫn chạy khi font từ xa không khả dụng.

Kiểm tra cú pháp: `npm run check`.

## Chuyển động và dẫn chuyện

Cuộn xuống để các tiêu đề, dòng so sánh và thẻ nội dung xuất hiện theo nhịp. Kiến trúc tự chuyển sau 9 giây; tầng hệ thống sau 6,5 giây; cache hit/miss sau 8 giây, chỉ khi phần đó đang trong khung nhìn. Rê chuột vào hoặc focus để tạm dừng; thao tác chọn thủ công giữ nguyên nội dung. Nút ở chân trang bật/tắt tự động toàn trang.

Demo chạy một lần khi cuộn đến; đổi kịch bản tự gửi request. Các phần đánh đổi tự mở khi đến gần. Chuyển động tôn trọng thiết lập giảm chuyển động của hệ điều hành; tự chuyển dừng khi tab bị ẩn.

## Quay video

Website cuộn tự nhiên, không có chế độ trình chiếu hay điều khiển nổi. Scrollbar được ẩn ở toàn trang, bảng và khối code; vẫn cuộn bằng chuột, touchpad, cảm ứng hoặc bàn phím. Điều khiển tự động đặt ở chân trang để khung hình nội dung sạch.

## Minh họa và bảng so sánh

`visuals.js` và `visuals.css` bổ sung bốn sơ đồ SVG cho từng kiến trúc, thẻ sinh viên và sơ đồ hybrid. Các hình giữ phong cách nền tối, bề mặt kính và tín hiệu chuyển động. Bảng so sánh có 8 tiêu chí, kết luận in đậm, giải thích phụ và màu riêng từng kiến trúc. Header cố định khi cuộn trên desktop; điện thoại hiển thị nhóm 2 × 2 cho từng tiêu chí.
