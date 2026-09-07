# VIDEO SCRIPT — API ATLAS

## 1. Thông tin sản xuất

- **Chủ đề:** So sánh SOAP, REST API, GraphQL và gRPC
- **Môn học:** PRN232 – Advanced Programming with .NET & Distributed Architectures
- **Đối tượng:** Giảng viên và sinh viên Kỹ thuật Phần mềm
- **Website nguồn:** `http://localhost:5173`
- **Thư mục voice:** `D:/Github/Repositories/PRN232/Bonus/voices`
- **Tỷ lệ khung hình:** 16:9
- **Độ phân giải:** 1920×1080
- **Định dạng đầu ra:** MP4, H.264, AAC, 30 fps
- **Phong cách:** Dark editorial technology, xanh đen, typography rõ, chuyển động tiết chế
- **Avatar:** Model người hoạt hình bán thân, đặt ở góc dưới bên phải; không che code, sơ đồ hoặc phụ đề
- **Phụ đề:** Tiếng Việt, hiển thị theo cụm ngắn 1–2 dòng; chữ được highlight theo từng từ khi phát voice

## 2. Trạng thái tài nguyên

Website đã có sẵn animation và các control cần thiết để quay tự động. Voice đã được chia thành 15 file MP3 theo các cảnh dưới đây.

Các file MP3 hiện chưa có transcript văn bản đi kèm. Vì vậy, timeline thao tác và bố cục video trong tài liệu này đã hoàn chỉnh, nhưng lớp phụ đề từng chữ phải được tạo bằng một trong hai cách:

1. Chạy nhận dạng giọng nói tiếng Việt trên từng MP3 rồi đối chiếu thủ công với nội dung website.
2. Cung cấp transcript đúng từng file MP3, sau đó chia timestamp theo waveform và voice.

Không được tự suy đoán câu chữ của voice để đưa vào phụ đề. Phụ đề cuối cùng phải lấy từ âm thanh thực tế để tránh sai nội dung hoặc sai timing.

## 3. Quy tắc dựng chung

### 3.1. Quay website

- Mở website ở viewport 1920×1080.
- Tắt thanh địa chỉ, bookmark bar, notification và cursor mặc định nếu không dùng.
- Dùng `http://127.0.0.1:5173` hoặc `http://localhost:5173`.
- Trước mỗi cảnh, tải lại trang để trạng thái animation và nội dung trở về mặc định.
- Chờ phần tử xuất hiện hoàn toàn trước khi quay tiếp.
- Khi cần tự kích hoạt animation, click đúng control trong bảng thao tác; không click ngẫu nhiên trên vùng nội dung.
- Dùng chuyển cảnh cross-dissolve 8–12 frame giữa các cảnh lớn.
- Không dùng transition quá nhanh làm mất khả năng đọc code.

### 3.2. Avatar người hoạt hình

- Avatar xuất hiện sau 0,5 giây đầu của mỗi đoạn voice.
- Vị trí mặc định: góc dưới bên phải, cách mép phải 36 px và mép dưới 132 px để chừa phụ đề.
- Kích thước mặc định: chiếm khoảng 16–20% chiều rộng khung hình.
- Khi màn hình hiển thị code hoặc response dài, giảm avatar còn 12–14% hoặc chuyển sang góc trên bên phải.
- Avatar có 3 trạng thái: idle, speaking, emphasis.
- Mouth movement lấy theo biên độ voice; không cần khớp phoneme nếu công cụ avatar không hỗ trợ tiếng Việt.
- Khi voice nói đến thuật ngữ chính, thêm một motion emphasis nhẹ ở avatar và highlight tương ứng trên website.
- Không để avatar che các nút SOAP, REST, GraphQL, gRPC, nút gửi request hoặc dòng code đang được giải thích.

### 3.3. Phụ đề từng chữ

- Font: Plus Jakarta Sans hoặc font sans-serif hỗ trợ đầy đủ tiếng Việt.
- Vùng phụ đề: chính giữa phía dưới, nằm trong safe area 80 px.
- Mỗi caption tối đa 42 ký tự mỗi dòng và tối đa 2 dòng.
- Màu chữ cơ bản: trắng ngà.
- Từ đang đọc: xanh mint hoặc màu accent của section hiện tại.
- Nền caption: nền đen trong suốt 78%, bo góc 10 px, padding ngang 18 px và dọc 10 px.
- Dùng word-level timestamps từ voice; không dùng một caption dài cho cả đoạn.
- Không tách một thuật ngữ kỹ thuật thành hai caption nếu có thể giữ nguyên cụm: `HTTP/2`, `Protocol Buffers`, `over-fetching`, `under-fetching`, `WSDL`, `ETag`, `gRPC-Web`.
- Khi caption đổi, giữ tối thiểu 2 frame để người xem đọc được.
- Nếu một câu dài hơn vùng an toàn, chia theo dấu phẩy hoặc theo ý nghĩa, không chia giữa tên công nghệ.

### 3.4. Âm thanh

- Voice là track chính.
- Nhạc nền điện tử tối giản, không lời, để âm lượng khoảng -28 đến -24 LUFS dưới voice.
- Khi click control, thêm click sound rất ngắn và nhỏ hơn voice ít nhất 18 dB.
- Khi animation request chạy qua pipeline, thêm whoosh nhẹ theo từng node.
- Khi hiển thị response 200/304/403/404, dùng một sonic accent khác nhau nhưng không gây cảm giác game hóa quá mức.
- Duck nhạc nền ngay khi voice bắt đầu và fade lên trong khoảng nghỉ giữa các file.

## 4. Timeline tổng thể

| Thứ tự | File voice | Nội dung | Website chính | Tương tác chính |
|---:|---|---|---|---|
| 1 | `Canh1.mp3` | Mở đầu và đặt vấn đề | `#home` | Click “Bắt đầu khám phá” |
| 2 | `Canh2_SOAP.mp3` | SOAP | `#overview` | Click tab SOAP |
| 3 | `Canh2_REST.mp3` | REST | `#overview` | Click tab REST |
| 4 | `Canh2_GRAPHQL.mp3` | GraphQL | `#overview` | Click tab GraphQL |
| 5 | `Canh2_gRPC.mp3` | gRPC | `#overview` | Click tab gRPC |
| 6 | `Canh3.mp3` | Bảng so sánh | `#compare` | Click từng bộ lọc kiến trúc |
| 7 | `Canh4.mp3` | Các đánh đổi | `#tradeoffs` | Mở từng `details` |
| 8 | `Canh5.mp3` | Bài toán quản lý sinh viên và lựa chọn REST | `#case` | Cuộn qua case study |
| 9 | `Canh6_200OK.mp3` | Demo request thành công | `#demo` | Chọn 200, click “Gửi request” |
| 10 | `Canh6_304NotModified.mp3` | Demo cache và ETag | `#demo` | Chọn 304, click “Gửi request” |
| 11 | `Canh6_403Forbidden.mp3` | Demo phân quyền | `#demo` | Chọn 403, click “Gửi request” |
| 12 | `Canh6_404NotFound.mp3` | Demo lỗi không tìm thấy | `#demo` | Chọn 404, click “Gửi request” |
| 13 | `Canh7.mp3` | Kiến trúc phân tầng và cache-aside | `#system` | Click từng tier, Cache hit/miss |
| 14 | `Canh8.mp3` | Tài liệu tham khảo | `#references` | Cuộn danh sách nguồn |
| 15 | `Canh9.mp3` | Khung lựa chọn và kết luận | `#decision` | Click các priority, về đầu trang |

Thời lượng chính thức của từng cảnh phải lấy theo độ dài thực tế của MP3. Mỗi cảnh bắt đầu bằng frame đầu tiên của voice tương ứng và kết thúc sau khi voice tắt tối thiểu 0,3 giây.

## 5. Kịch bản cảnh chi tiết

## Cảnh 1 — Mở đầu

**Audio:** `voices/Canh1.mp3`

**Website:** `#home`

### Hình ảnh và thao tác

1. Mở ở đầu trang với hero `API ATLAS` và đồ họa bốn node SOAP, REST, GraphQL, gRPC.
2. Cho hero network hiển thị trọn vẹn trong khoảng nghỉ đầu voice.
3. Khi voice giới thiệu chủ đề, để các node phát animation signal tự nhiên.
4. Di chuyển cursor đến `Bắt đầu khám phá`.
5. Click một lần vào `Bắt đầu khám phá`; giữ ripple effect của website.
6. Để scroll mượt đến `#overview` sau khi click.
7. Kết thúc cảnh khi heading “Cùng là API. Khác nhau ở đâu?” nằm trong khung hình.

### Motion

- Fade in từ nền đen trong 18 frame.
- Logo scale từ 96% lên 100%.
- Các đường kết nối trong hero chạy signal chậm.
- Khi click CTA, dùng camera push-in nhẹ 3% trước khi scroll.

### Avatar

- Idle trong 0,5 giây đầu.
- Speaking trong phần thuyết minh mở đầu.
- Emphasis khi bốn tên công nghệ xuất hiện hoặc được nhắc đến.

### Phụ đề

- Bắt đầu từ audio thực tế của `Canh1.mp3`.
- Caption mở đầu đặt thấp hơn hero metadata nhưng vẫn nằm trong safe area.
- Không hiển thị thêm đoạn văn bản mới ngoài lời voice.

## Cảnh 2A — SOAP

**Audio:** `voices/Canh2_SOAP.mp3`

**Website:** `#overview`, tab `SOAP`

### Hình ảnh và thao tác

1. Nếu tab SOAP chưa được chọn, click `SOAP` trong `#architecture-tabs`.
2. Giữ panel SOAP sau khi animation hoàn tất.
3. Hiển thị lần lượt phần minh họa `CLIENT → XML ENVELOPE → SERVICE`.
4. Zoom 105% vào code `<soap:Envelope>`, `Header`, `Body` trong lúc voice giải thích cấu trúc message.
5. Trở về toàn cảnh panel để hiển thị WSDL, XML Envelope và WS-*.

### Motion

- Tab SOAP đổi sang accent lavender.
- Các đường diagram-wire sáng tuần tự từ client đến service.
- Code panel reveal theo nhóm dòng, không cuộn quá nhanh.
- Khi nhắc đến contract, highlight `WSDL CONTRACT · HEADER + BODY`.

### Avatar

- Đặt ở góc trên bên phải khi code SOAP xuất hiện.
- Speaking trong suốt file voice.
- Emphasis khi xuất hiện các thuật ngữ `XML`, `WSDL`, `Header`, `Body`.

### Phụ đề

- Màu highlight caption: lavender nhạt.
- Giữ nguyên cách viết thuật ngữ tiếng Anh trong voice.
- Không viết “SOAP chỉ là RPC”; nội dung hình ảnh phải thống nhất với wording đã sửa trong website.

## Cảnh 2B — REST

**Audio:** `voices/Canh2_REST.mp3`

**Website:** `#overview`, tab `REST`

### Hình ảnh và thao tác

1. Click tab `REST`.
2. Để animation panel REST hoàn thành.
3. Hiển thị sơ đồ `CLIENT → REST API → STUDENTS / COURSES / GRADES`.
4. Zoom vào `GET`, URI `/api/v1/students/1001`, `PUT`, `PATCH`, `DELETE` trong code.
5. Highlight các tag `Resource-oriented`, `Stateless`, `HTTP caching`.
6. Kết thúc bằng toàn cảnh REST và phần đánh đổi DTO.

### Motion

- Accent mint chuyển động theo các nhánh resource.
- Khi nói về URI, camera đi từ client vào node REST API rồi tách ra ba resource.
- Khi nói về HTTP cache, animate nhẹ dòng `ETag` và `Cache-Control`.

### Avatar

- Đặt ở góc dưới bên trái nếu code nằm bên phải; chuyển sang góc trên nếu cần.
- Emphasis khi voice nói `resource`, `URI`, `stateless`, `cache`.

### Phụ đề

- Màu highlight caption: mint.
- Giữ caption ngắn theo nhịp voice, tránh che endpoint.

## Cảnh 2C — GraphQL

**Audio:** `voices/Canh2_GRAPHQL.mp3`

**Website:** `#overview`, tab `GraphQL`

### Hình ảnh và thao tác

1. Click tab `GraphQL`.
2. Để panel mới animate hoàn tất.
3. Hiển thị luồng `QUERY → SCHEMA → RESOLVERS`.
4. Zoom vào query `StudentProfile`, các field `fullName`, `enrolledCourses`, `credits`.
5. Highlight các tag `Typed schema`, `Client-driven`, `Resolvers`.
6. Chuyển sang phần đánh đổi, nhấn mạnh cần kiểm soát N+1, depth và query cost.

### Motion

- Accent pink/lilac chạy theo các field được chọn.
- Mỗi field trong query sáng lần lượt rồi ánh xạ sang node tương ứng.
- Không dùng wording “loại bỏ hoàn toàn”; hình ảnh phải thể hiện đây là khả năng giảm over-fetching/under-fetching khi thiết kế phù hợp.

### Avatar

- Đặt bên phải phía trên khu vực code.
- Emphasis khi field được highlight.

### Phụ đề

- Màu highlight caption: lilac.
- Giữ nguyên các cụm `query`, `schema`, `resolver`, `N+1`.

## Cảnh 2D — gRPC

**Audio:** `voices/Canh2_gRPC.mp3`

**Website:** `#overview`, tab `gRPC`

### Hình ảnh và thao tác

1. Click tab `gRPC`.
2. Để panel gRPC animate hoàn tất.
3. Hiển thị hai service và ba luồng packet qua HTTP/2.
4. Zoom vào `.proto`, `service StudentService`, `rpc GetStudent`, `StudentRequest`.
5. Highlight `Protocol Buffers`, `HTTP/2`, `Streaming`.
6. Kết thúc bằng phần đánh đổi: payload nhị phân cần công cụ; trình duyệt thường cần gRPC-Web.

### Motion

- Accent orange chạy theo các binary packets.
- Ba đường truyền sáng ở tốc độ khác nhau nhưng không gây nhấp nháy.
- Khi nói về streaming, giữ packet animation lâu hơn một nhịp.

### Avatar

- Đặt ở góc trên bên phải để tránh che `.proto`.
- Emphasis khi voice nói `HTTP/2`, `Protobuf`, `streaming`.

### Phụ đề

- Màu highlight caption: amber.
- Nếu voice có câu tuyệt đối về hiệu năng, lower-third bổ sung “Hiệu năng cần benchmark theo bối cảnh”.

## Cảnh 3 — Bảng so sánh

**Audio:** `voices/Canh3.mp3`

**Website:** `#compare`

### Hình ảnh và thao tác

1. Scroll đến heading “Thử đặt cạnh nhau để thấy rõ hơn”.
2. Để bảng so sánh hiện từng hàng bằng reveal animation.
3. Click `SOAP`, giữ 1–2 nhịp để cột SOAP highlight.
4. Click `REST`, giữ để cột REST highlight.
5. Click `GraphQL`, giữ để cột GraphQL highlight.
6. Click `gRPC`, giữ để cột gRPC highlight.
7. Click `Tất cả` để trả lại trạng thái tổng quan.
8. Nếu voice không đủ dài, ưu tiên REST và gRPC vì chúng được dùng trong phần case study và kết luận.

### Motion

- Camera pan ngang theo từng cột.
- Highlight column dùng glow nhẹ, không làm mất độ tương phản chữ.
- Hàng đang được giải thích có opacity 100%; các hàng còn lại giảm nhẹ nhưng vẫn đọc được.

### Avatar

- Đặt trong khoảng trống phía trên bảng hoặc góc phải, không đè lên header bảng.
- Speaking; emphasis khi chuyển bộ lọc.

### Phụ đề

- Caption không được che hàng đầu tiên của bảng.
- Khi voice nêu so sánh, highlight từ khóa tương ứng trên bảng nếu có thể.

## Cảnh 4 — Architectural trade-offs

**Audio:** `voices/Canh4.mp3`

**Website:** `#tradeoffs`

### Hình ảnh và thao tác

1. Scroll đến phần “Được điều này, đổi lại điều gì?”.
2. Giữ detail 01 đang mở ở trạng thái mặc định.
3. Khi voice chuyển sang detail 02, click summary “Dễ đọc hơn hay gọn nhẹ hơn?”.
4. Khi voice chuyển sang detail 03, click summary “Thống nhất chặt hay linh hoạt hơn?”.
5. Kết thúc bằng ba detail cùng hiện trong một chuyển động cuộn chậm.

### Motion

- Mỗi detail mở bằng height transition tự nhiên của CSS.
- Highlight các cặp REST/GraphQL, JSON/Protobuf, SOAP/gRPC/GraphQL.
- Không thêm biểu đồ định lượng nếu voice không có benchmark cụ thể.

### Avatar

- Đặt bên trái phần detail để nội dung bên phải dễ đọc.
- Emphasis theo từng cặp trade-off.

### Phụ đề

- Sử dụng caption 2 dòng tối đa.
- Câu dài chia theo ý nghĩa: ưu điểm ở caption trước, đánh đổi ở caption sau.

## Cảnh 5 — Case study: Student Management System

**Audio:** `voices/Canh5.mp3`

**Website:** `#case`

### Hình ảnh và thao tác

1. Scroll đến heading “Quản lý sinh viên. Vì sao chọn REST?”.
2. Hiển thị thẻ `RESTful`, ASP.NET Core, JSON, OpenAPI.
3. Pan chậm qua minh họa hồ sơ sinh viên và các course card.
4. Lần lượt highlight 4 lý do: tài nguyên CRUD, caching, công cụ .NET, đa nền tảng.
5. Hiển thị phần alternatives SOAP, GraphQL, gRPC.
6. Nếu voice nhắc quy mô, lower-third phải ghi rõ “quy mô giả định trong kịch bản minh họa”.

### Motion

- Student card xuất hiện theo lớp: avatar, tên, mã sinh viên, GPA, course.
- Các lý do reveal theo thứ tự 01 đến 04.
- REST accent mint, alternatives giữ opacity thấp hơn.

### Avatar

- Đặt góc trên bên phải khi thẻ hồ sơ xuất hiện.
- Chuyển sang góc dưới trái khi hiển thị alternatives.

### Phụ đề

- Tên cá nhân trong minh họa phải được coi là dữ liệu giả lập.
- Không mô tả hệ thống là hệ thống thật của trường nếu voice chỉ đang trình bày kịch bản.

## Cảnh 6A — Live demo 200 OK

**Audio:** `voices/Canh6_200OK.mp3`

**Website:** `#demo`

### Hình ảnh và thao tác

1. Scroll đến `STUDENT API EXPLORER`.
2. Chọn scenario `/api/v1/students/1001 — Thành công`.
3. Chờ trạng thái `Sẵn sàng`.
4. Click `Gửi request`.
5. Ghi đủ flow `Client → Gateway → Controller → Response`.
6. Giữ response có `200 OK`, `Content-Type`, `Cache-Control`, `ETag` và JSON student.
7. Zoom vào status trước, sau đó zoom ra để hiển thị payload.

### Motion

- Các node pipeline sáng lần lượt theo delay có sẵn trong website.
- Response code reveal từ status line xuống JSON.
- Dùng accent xanh cho success.

### Avatar và phụ đề

- Avatar thu nhỏ và đặt góc trên bên phải để không che response.
- Caption nằm dưới cùng; response được nâng lên nếu caption trùng vùng JSON.

## Cảnh 6B — Live demo 304 Not Modified

**Audio:** `voices/Canh6_304NotModified.mp3`

**Website:** `#demo`

### Hình ảnh và thao tác

1. Chọn scenario `/api/v1/students/1001 — ETag trùng khớp`.
2. Cho người xem thấy request có `If-None-Match`.
3. Click `Gửi request`.
4. Giữ response `304 Not Modified`, ETag và phần giải thích không có body.
5. Zoom vào câu “Client dùng representation đã lưu trong cache”.

### Motion

- Dùng chuyển động ngắn từ request header `If-None-Match` sang response 304.
- Dùng accent xanh mint hoặc vàng nhạt để phân biệt cache branch với 200.

### Avatar và phụ đề

- Avatar ở góc trên phải.
- Caption highlight `ETag`, `304`, `cache`.

## Cảnh 6C — Live demo 403 Forbidden

**Audio:** `voices/Canh6_403Forbidden.mp3`

**Website:** `#demo`

### Hình ảnh và thao tác

1. Chọn scenario `/api/v1/students/1002 — Không có quyền`.
2. Click `Gửi request`.
3. Giữ flow pipeline sáng đến Controller.
4. Hiển thị `403 Forbidden` và giải thích người dùng không được xem hồ sơ của student khác.
5. Zoom vào request ID 1002 và dòng authorization.

### Motion

- Pipeline dừng trước khi truy xuất dữ liệu.
- Dùng accent đỏ muted cho status 403, không dùng flash mạnh.
- Thêm micro-shake chỉ 2–3 px ở status label nếu phù hợp.

### Avatar và phụ đề

- Avatar chuyển sang emphasis khi status xuất hiện.
- Caption highlight `authorization`, `403 Forbidden`, `không có quyền`.

## Cảnh 6D — Live demo 404 Not Found

**Audio:** `voices/Canh6_404NotFound.mp3`

**Website:** `#demo`

### Hình ảnh và thao tác

1. Chọn scenario `/api/v1/students/99999 — Không tồn tại (Admin)`.
2. Click `Gửi request`.
3. Giữ request ID 99999 trong khung hình.
4. Hiển thị `404 Not Found`, `application/problem+json`, title và detail.
5. Zoom vào cấu trúc Problem Details.

### Motion

- Request đi hết pipeline rồi response dừng ở lỗi tìm kiếm.
- Dùng accent orange-red nhẹ.
- Chuyển từ status line vào JSON lỗi bằng camera push-in 2%.

### Avatar và phụ đề

- Avatar thu nhỏ, đặt góc trên phải.
- Caption highlight `404 Not Found`, `Problem Details`, `ID 99999`.

## Cảnh 7 — Kiến trúc phân tầng và cache-aside

**Audio:** `voices/Canh7.mp3`

**Website:** `#system`

### Hình ảnh và thao tác

1. Scroll đến “Phía sau một lần tra cứu hồ sơ”.
2. Click lần lượt `Client tier`, `Gateway tier`, `Application tier`, `Persistence tier`.
3. Với mỗi tier, giữ detail đủ lâu để đọc heading và 3 bullet.
4. Scroll đến `CACHE-ASIDE FLOW`.
5. Click `Cache hit`, ghi sequence có Redis trả DTO.
6. Click `Cache miss`, ghi sequence qua EF Core và SQL Server.
7. Kết thúc ở đoạn API so sánh ETag và trả 304 hoặc 200.

### Motion

- Tier active dùng accent mint và line indicator.
- Sequence steps xuất hiện cascade theo đúng mutation observer có sẵn.
- Khi đổi Cache hit/miss, dùng wipe ngang nhẹ thay vì cắt cứng.

### Avatar

- Đặt bên trái phần tier detail.
- Khi sequence xuất hiện, chuyển avatar lên góc phải để không che danh sách bước.

### Phụ đề

- Caption giữ nguyên `Redis`, `EF Core`, `SQL Server`, `ETag`, `TTL`.
- Nếu voice nói dữ liệu giả định, chỉ ghi “mô phỏng” khi câu đó thực sự có trong voice.

## Cảnh 8 — Tài liệu tham khảo

**Audio:** `voices/Canh8.mp3`

**Website:** `#references`

### Hình ảnh và thao tác

1. Scroll chậm qua danh sách nguồn.
2. Hiển thị lần lượt Fielding/REST, RFC 9110, SOAP 1.2, GraphQL Specification và gRPC Documentation.
3. Không mở tab external trong lúc quay.
4. Có thể highlight số thứ tự nguồn theo voice.
5. Kết thúc ở liên kết tải `SCRIPT.md` nhưng không click tải xuống.

### Motion

- Source card reveal theo stagger 65 ms.
- Dùng underline motion khi cursor đi qua source được nhắc đến.
- Giữ camera ổn định để người xem có thể đọc tên tài liệu.

### Avatar và phụ đề

- Avatar nhỏ ở góc phải dưới nhưng cao hơn vùng caption.
- Caption đặt chính giữa bên dưới.

## Cảnh 9 — Decision framework và kết luận

**Audio:** `voices/Canh9.mp3`

**Website:** `#decision`

### Hình ảnh và thao tác

1. Scroll đến “Hệ thống của bạn đang cần điều gì?”.
2. Click priority `CRUD & HTTP caching` để hiển thị REST.
3. Click `UI đa dạng & query lồng sâu` để hiển thị GraphQL.
4. Click `Microservices & streaming` để hiển thị gRPC.
5. Click `Legacy & chuẩn WS-*` để hiển thị SOAP.
6. Scroll xuống hybrid architecture.
7. Hiển thị câu kết luận và click `Khám phá lại` để quay về hero.
8. Ở frame cuối, giữ logo API ATLAS và bốn node trong 2 giây trước khi fade out.

### Motion

- Mỗi priority đổi màu theo kiến trúc tương ứng.
- Decision result dùng reveal panel có sẵn.
- Hybrid board xuất hiện bằng fade và translateY nhẹ.
- Kết thúc bằng camera pull-back về toàn cảnh hero.

### Avatar

- Avatar xuất hiện trong phần decision framework.
- Khi nói về hybrid architecture, đặt avatar ở trái để giữ diagram bên phải rõ ràng.
- Ở câu kết thúc, avatar chuyển về idle và fade cùng website.

### Phụ đề

- Highlight lần lượt `REST`, `GraphQL`, `gRPC`, `SOAP`.
- Caption cuối giữ ít nhất 1,5 giây sau khi voice kết thúc.

## 6. Danh sách thao tác tự động hóa

| Mã | Selector hoặc vị trí | Hành động |
|---|---|---|
| A01 | `a[href="#overview"]` / `.actions .button` | Click và scroll đến overview |
| A02 | `#architecture-tabs button[data-index="0"]` | Chọn SOAP |
| A03 | `#architecture-tabs button[data-index="1"]` | Chọn REST |
| A04 | `#architecture-tabs button[data-index="2"]` | Chọn GraphQL |
| A05 | `#architecture-tabs button[data-index="3"]` | Chọn gRPC |
| A06 | `#compare-filter button` theo text | Highlight cột so sánh |
| A07 | `#tradeoffs details:nth-of-type(1) summary` | Mở trade-off cache/payload |
| A08 | `#tradeoffs details:nth-of-type(2) summary` | Mở trade-off JSON/Protobuf |
| A09 | `#tradeoffs details:nth-of-type(3) summary` | Mở trade-off contract/flexibility |
| A10 | `#scenario` option `200` | Chọn demo thành công |
| A11 | `#scenario` option `304` | Chọn demo ETag |
| A12 | `#scenario` option `403` | Chọn demo authorization |
| A13 | `#scenario` option `404` | Chọn demo Problem Details |
| A14 | `#send` | Gửi request |
| A15 | `#tiers button` theo index | Chọn tier |
| A16 | `#cache-hit` | Chọn cache hit |
| A17 | `#cache-miss` | Chọn cache miss |
| A18 | `#decision-options button` theo index | Chọn decision priority |
| A19 | `.closing .button` | Quay về hero |

## 7. Kiểm tra trước khi xuất video

- Website mở được tại `http://localhost:5173`.
- Các file `app.js`, `visuals.js`, `motion.js`, `server.js` không có lỗi cú pháp.
- Tất cả MP3 phát được và đúng thứ tự cảnh.
- Không có khoảng lặng bất thường giữa voice và frame đầu của cảnh.
- Các button được click trước khi quay đúng phần tương ứng.
- Demo 200, 304, 403 và 404 trả đúng nội dung hiển thị.
- Avatar không che code, diagram, status hoặc caption.
- Caption tiếng Việt hiển thị đúng dấu và đúng thuật ngữ kỹ thuật.
- Word-level highlight khớp voice thực tế.
- Không còn các claim không có nguồn như tỷ lệ 95%, 60–80%, 5–10 lần hoặc giảm 70% tải database.
- Dữ liệu 30.000+ sinh viên được trình bày là quy mô giả định trong kịch bản minh họa.
- Các số liệu benchmark nếu xuất hiện trong voice phải có nguồn hoặc được ghi rõ là kết quả phụ thuộc môi trường đo.
- Kiểm tra video ở 100% và 50% scale để bảo đảm caption đọc được.
- Nghe lại toàn bộ voice sau khi mix nhạc nền và sound effect.

## 8. Pipeline dựng đề xuất

1. Khởi động server website.
2. Mở trình duyệt tự động ở 1920×1080.
3. Chạy từng nhóm thao tác theo mục 5, ghi thành clip riêng theo từng file MP3.
4. Tách audio waveform và nhận word-level timestamps cho từng file voice.
5. Tạo subtitle track từ transcript đã kiểm chứng.
6. Ghép avatar speaking theo từng file voice.
7. Thêm motion highlight, cursor click, zoom và chuyển cảnh.
8. Mix voice, nhạc nền và sound effect.
9. Render bản preview độ phân giải thấp để kiểm tra sync.
10. Render bản chính MP4 H.264/AAC 1920×1080 30 fps.
11. Kiểm tra lần cuối trên trình phát video độc lập, không chỉ trong editor.

## 9. Tiêu chuẩn hoàn thành

Video được xem là hoàn thành khi người xem có thể:

- Nhận biết rõ bốn công nghệ và vai trò của từng công nghệ.
- Theo dõi được sự thay đổi của website sau mỗi click.
- Đọc được code, diagram, request và response ở các đoạn quan trọng.
- Nghe voice đồng bộ với animation và avatar.
- Đọc phụ đề theo từng chữ mà không bị che nội dung chính.
- Phân biệt được nội dung mô phỏng với số liệu benchmark hoặc hệ thống triển khai thực tế.
- Hiểu vì sao REST được chọn cho bài toán quản lý sinh viên trong kịch bản.
- Hiểu rằng lựa chọn SOAP, REST, GraphQL hay gRPC phụ thuộc yêu cầu hệ thống, không có công nghệ tốt nhất trong mọi trường hợp.
