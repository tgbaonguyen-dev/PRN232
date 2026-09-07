const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const escapeHTML = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const architectures = [
  {
    name: "SOAP",
    label: "FORMAL PROTOCOL",
    sub: "Simple Object Access Protocol",
    description:
      "Một framework nhắn tin với cấu trúc thông điệp rõ ràng. SOAP đặt hợp đồng dịch vụ và các yêu cầu tích hợp doanh nghiệp lên hàng đầu; không chỉ giới hạn ở mô hình gọi hàm từ xa.",
    tags: ["XML Envelope", "WSDL", "WS-*"],
    code: '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">\n  <soap:Header />\n  <soap:Body>\n    <GetStudent xmlns="urn:students">\n      <id>1001</id>\n    </GetStudent>\n  </soap:Body>\n</soap:Envelope>',
    points: [
      "Envelope bao bọc Header tùy chọn và Body; lỗi được mô tả qua Fault.",
      "WSDL định nghĩa contract để sinh mã client/server.",
      "Có thể kết hợp WS-Security, WS-AtomicTransaction và WS-ReliableMessaging.",
    ],
    limit:
      "XML và bộ tiêu chuẩn WS-* có thể làm tăng chi phí cấu hình, xử lý và bảo trì; mức độ ảnh hưởng phụ thuộc cách triển khai.",
  },
  {
    name: "REST",
    label: "ARCHITECTURAL STYLE",
    sub: "Representational State Transfer",
    description:
      "Tài nguyên là trung tâm. URI định danh dữ liệu; phương thức HTTP diễn đạt hành động. Mỗi request mang đủ ngữ cảnh để được xử lý độc lập.",
    tags: ["Resource-oriented", "Stateless", "HTTP caching"],
    code: 'GET    /api/v1/students/1001\nPOST   /api/v1/enrollments\nPUT    /api/v1/students/1001\nPATCH  /api/v1/students/1001\nDELETE /api/v1/enrollments/552\n\nAccept: application/json\nIf-None-Match: "student-1001-v8"',
    points: [
      "GET an toàn và idempotent; PUT, DELETE idempotent; POST thường không idempotent. PATCH tùy cách triển khai.",
      "6 ràng buộc: client–server, stateless, cache, uniform interface, layered system, code-on-demand (tùy chọn).",
      "Cache-Control, ETag và Last-Modified tận dụng ngữ nghĩa HTTP. JSON phổ biến nhưng không bắt buộc.",
    ],
    limit:
      "DTO do server định nghĩa có thể trả thừa dữ liệu hoặc cần nhiều request cho một màn hình, tùy thiết kế endpoint.",
  },
  {
    name: "GraphQL",
    label: "QUERY LANGUAGE & RUNTIME",
    sub: "Ask for exactly what you need",
    description:
      "Client khai báo những trường cần lấy trong schema. Runtime phân tích, xác thực truy vấn và gọi resolver để tạo phản hồi có cấu trúc tương ứng.",
    tags: ["Typed schema", "Client-driven", "Resolvers"],
    code: "query StudentProfile {\n  student(id: 1001) {\n    fullName\n    enrolledCourses {\n      courseCode\n      credits\n    }\n  }\n}",
    points: [
      "Query đọc, Mutation thay đổi dữ liệu, Subscription nhận cập nhật theo thời gian.",
      "Thường dùng endpoint /graphql; subscription có thể được truyền qua WebSocket.",
      "SDL mô tả kiểu dữ liệu; @deprecated hỗ trợ tiến hóa schema. Query có thể giảm over-fetching, nhưng cần kiểm soát resolver và chi phí truy vấn.",
    ],
    limit:
      "Cần xử lý N+1 bằng batching/DataLoader, giới hạn độ sâu và chi phí truy vấn; cache cần thiết kế riêng.",
  },
  {
    name: "gRPC",
    label: "HIGH-PERFORMANCE RPC FRAMEWORK",
    sub: "Contract first. Binary by design.",
    description:
      "Định nghĩa dịch vụ trước, sinh mã sau. gRPC dùng contract để gọi hàm từ xa với kiểu dữ liệu rõ ràng, phù hợp giao tiếp giữa các dịch vụ.",
    tags: ["Protocol Buffers", "HTTP/2", "Streaming"],
    code: 'syntax = "proto3";\n\nservice StudentService {\n  rpc GetStudent (StudentRequest)\n    returns (StudentReply);\n}\n\nmessage StudentRequest {\n  int32 id = 1;\n}',
    points: [
      "File .proto là định nghĩa schema dạng văn bản; protoc sinh stubs cho nhiều ngôn ngữ.",
      "HTTP/2 hỗ trợ multiplexing và nén header HPACK; Protobuf là định dạng nhị phân mặc định.",
      "4 mô hình: unary, server streaming, client streaming, bidirectional streaming.",
    ],
    limit:
      "Payload nhị phân cần công cụ để kiểm tra. Khi gọi từ trình duyệt, thường cần gRPC-Web và hạ tầng tương thích.",
  },
];
function animate(el) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  el.getAnimations().forEach((animation) => animation.cancel());
  el.animate(
    [
      { opacity: 0.15, transform: "translateY(18px) scale(.985)" },
      { opacity: 1, transform: "translateY(0) scale(1)" },
    ],
    { duration: 650, easing: "cubic-bezier(.22,1,.36,1)" },
  );
  [...el.children].forEach((child, i) =>
    child.animate(
      [
        { opacity: 0, transform: "translateY(15px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 650,
        delay: i * 75,
        fill: "backwards",
        easing: "cubic-bezier(.22,1,.36,1)",
      },
    ),
  );
}
function showArchitecture(index, focus = false) {
  const a = architectures[index];
  $$("#architecture-tabs button").forEach((b, i) => {
    b.classList.toggle("active", i === index);
    b.setAttribute("aria-selected", i === index);
    b.tabIndex = i === index ? 0 : -1;
  });
  $("#architecture-panel").setAttribute(
    "aria-labelledby",
    `architecture-${index}`,
  );
  $("#architecture-panel").innerHTML =
    `<div class="architecture-art"><div><span class="eyebrow">THE CONNECTION, VISUALIZED</span><h4>${["Hai bên thống nhất trước cách trao đổi.", "Cần dữ liệu nào, gọi đúng địa chỉ đó.", "Bạn chọn trường nào, API trả trường đó.", "Một kết nối, nhiều luồng cùng chạy."][index]}</h4><p>${["XML đi từ client tới service theo cấu trúc đã thống nhất.", "URI đưa mỗi request tới đúng thực thể cần thao tác.", "Schema nối yêu cầu của client với các resolver dữ liệu.", "Các dịch vụ trao đổi thông điệp nhị phân qua HTTP/2."][index]}</p></div>${apiIllustration(["soap", "rest", "graphql", "grpc"][index], "overview")}</div><div><span class="code-label">${a.label}</span><h3>${a.name}</h3><span class="code-label">${a.sub}</span><p>${a.description}</p><div class="tags">${a.tags.map((t) => `<span>${t}</span>`).join("")}</div><p><strong>Đánh đổi</strong><br>${a.limit}</p></div><div><span class="code-label">A CLOSER LOOK / ${a.name.toUpperCase()}</span><pre>${escapeHTML(a.code)}</pre><ul>${a.points.map((p) => `<li>${p}</li>`).join("")}</ul></div>`;
  animate($("#architecture-panel"));
  if (focus) $(`#architecture-${index}`).focus();
}
$("#architecture-tabs").innerHTML = architectures
  .map(
    (a, i) =>
      `<button id="architecture-${i}" role="tab" aria-controls="architecture-panel" data-index="${i}">${a.name}<small>0${i + 1} ↗</small></button>`,
  )
  .join("");
$$("#architecture-tabs button").forEach((b, i) => {
  b.onclick = () => showArchitecture(i);
  b.onkeydown = (e) => {
    let n = i;
    if (e.key === "ArrowRight") n = (i + 1) % 4;
    else if (e.key === "ArrowLeft") n = (i + 3) % 4;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = 3;
    else return;
    e.preventDefault();
    showArchitecture(n, true);
  };
});
showArchitecture(1);
const rows = [
  [
    "Giao thức vận chuyển",
    "HTTP, SMTP, TCP…",
    "HTTP/1.1, HTTP/2, HTTP/3",
    "Thường HTTP; WebSocket cho subscription",
    "HTTP/2 (gRPC tiêu chuẩn)",
  ],
  [
    "Định dạng dữ liệu",
    "XML",
    "JSON, XML và các representation khác",
    "Thường JSON",
    "Protocol Buffers (mặc định)",
  ],
  [
    "Phong cách thiết kế",
    "Operation / contract qua WSDL",
    "Resource + URI + HTTP verbs",
    "Query + typed schema",
    "Contract-first RPC / .proto",
  ],
  [
    "Hiệu năng & payload",
    "XML có overhead lớn",
    "Phụ thuộc DTO và cache",
    "Chọn trường; chi phí resolver cần kiểm soát",
    "Binary gọn; hiệu quả cho service-to-service",
  ],
  [
    "Linh hoạt cho client",
    "Ràng buộc contract",
    "Server quyết định representation",
    "Chọn trường trong schema",
    "Phụ thuộc service contract",
  ],
  [
    "Caching",
    "Thường ở tầng ứng dụng",
    "HTTP cache, ETag, CDN",
    "Client cache / persisted queries",
    "Cache tầng ứng dụng",
  ],
  [
    "Độ phức tạp & công cụ",
    "WSDL, WS-*; cấu hình phức tạp",
    "cURL, Postman, OpenAPI",
    "SDL, resolver, DataLoader",
    "protoc, generated stubs, gRPC-Web",
  ],
  [
    "Ngữ cảnh phù hợp",
    "B2B legacy, tích hợp WS-*",
    "CRUD, public API, Web Portal",
    "BFF, mobile, giao diện nhiều nhu cầu",
    "Microservices, streaming, IoT",
  ],
];
const comparisonDetails = [
  [
    ["Đa dạng transport", "HTTP, SMTP, TCP…"],
    ["Nền tảng HTTP", "HTTP/1.1 · HTTP/2 · HTTP/3"],
    ["Thường dùng HTTP", "Subscription có thể dùng WebSocket"],
    ["HTTP/2", "Transport của gRPC tiêu chuẩn"],
  ],
  [
    ["XML", "Envelope, Header và Body"],
    ["Thường dùng JSON", "Cũng hỗ trợ XML và định dạng khác"],
    ["Thường trả JSON", "Cấu trúc theo trường client chọn"],
    ["Protocol Buffers", "Mặc định: mã hóa nhị phân"],
  ],
  [
    ["Theo thao tác", "Contract dịch vụ qua WSDL"],
    ["Theo tài nguyên", "URI + phương thức HTTP"],
    ["Theo truy vấn", "Query + schema có kiểu dữ liệu"],
    ["Contract-first RPC", "Dịch vụ được định nghĩa qua .proto"],
  ],
  [
    ["Overhead XML", "Thông điệp nhiều thẻ; chi phí parse"],
    ["Phụ thuộc DTO & cache", "Có thể trả thừa hoặc cần nhiều request"],
    ["Chọn dữ liệu cần thiết", "Cần kiểm soát chi phí resolver"],
    ["Nhị phân nhỏ gọn", "Hiệu quả cho service-to-service"],
  ],
  [
    ["Theo contract", "Client tuân thủ hợp đồng dịch vụ"],
    ["Server định hình dữ liệu", "Client nhận representation từ API"],
    ["Chọn trường linh hoạt", "Trong phạm vi schema có sẵn"],
    ["Theo service contract", "Client dùng stubs được sinh mã"],
  ],
  [
    ["Cache ứng dụng", "Thường không tận dụng web cache"],
    ["HTTP cache tự nhiên", "ETag, Cache-Control; CDN khi phù hợp"],
    ["Cần thiết kế thêm", "Client cache hoặc persisted queries"],
    ["Cache ứng dụng", "Ví dụ Redis ở tầng dịch vụ"],
  ],
  [
    ["Cấu hình phức tạp", "WSDL, bộ tiêu chuẩn WS-*"],
    ["Dễ tiếp cận", "cURL, Postman, OpenAPI"],
    ["Quản lý resolver", "SDL, DataLoader, giới hạn query"],
    ["Cần sinh mã", "protoc, stubs; web cần hỗ trợ phù hợp"],
  ],
  [
    ["Tích hợp legacy / B2B", "Hệ thống có yêu cầu chuẩn WS-*"],
    ["CRUD & public API", "Web Portal, quản lý sinh viên"],
    ["BFF & nhiều giao diện", "Mobile, màn hình có nhu cầu khác nhau"],
    ["Microservices & stream", "Giao tiếp nội bộ, luồng thời gian thực"],
  ],
];
$("#comparison").innerHTML =
  '<caption class="sr-only">So sánh tám tiêu chí kỹ thuật giữa SOAP, REST, GraphQL và gRPC</caption><thead><tr><th scope="col">08 TIÊU CHÍ<br>KỸ THUẬT</th>' +
  architectures
    .map(
      (a, i) =>
        `<th scope="col"><span>${a.name}</span><small>${["Giao thức thông điệp", "Kiến trúc tài nguyên", "Ngôn ngữ truy vấn", "Framework RPC"][i]}</small></th>`,
    )
    .join("") +
  "</tr></thead><tbody>" +
  rows
    .map(
      (r, i) =>
        `<tr><th scope="row"><span class="criterion-number">0${i + 1}</span>${r[0]}</th>${comparisonDetails[i].map((c, j) => `<td><span class="mobile-column" aria-hidden="true">${architectures[j].name}</span><strong>${c[0]}</strong><small>${c[1]}</small></td>`).join("")}</tr>`,
    )
    .join("") +
  "</tbody>";
$("#compare-filter").innerHTML = ["Tất cả", ...architectures.map((a) => a.name)]
  .map(
    (n, i) =>
      `<button aria-pressed="${i === 0}" class="${i === 0 ? "active" : ""}">${n}</button>`,
  )
  .join("");
$$("#compare-filter button").forEach(
  (b, i) =>
    (b.onclick = () => {
      $$("#compare-filter button").forEach((x) => {
        x.classList.toggle("active", x === b);
        x.setAttribute("aria-pressed", x === b);
      });
      $$("#comparison tr").forEach((r) =>
        [...r.children].forEach((c, j) =>
          c.classList.toggle("highlight", i > 0 && i === j),
        ),
      );
    }),
);
const controller = `[ApiController]\n[Authorize]\n[Route("api/v1/students")]\npublic class StudentsController(IStudentService service) : ControllerBase\n{\n    [HttpGet("{id:int}")]\n    public async Task<IActionResult> Get(int id)\n    {\n        // JWT claim mapping must preserve "sub" in this example.\n        if (User.FindFirst("sub")?.Value != id.ToString()\n            && !User.IsInRole("Admin")) return Forbid();\n\n        var student = await service.GetByIdAsync(id);\n        if (student is null) return NotFound(new ProblemDetails {\n            Title = "Sinh viên không tồn tại", Status = 404,\n            Instance = Request.Path\n        });\n\n        var etag = new Microsoft.Net.Http.Headers.EntityTagHeaderValue(\n            $"\\"{student.RowVersionHash}\\"");\n        Response.GetTypedHeaders().ETag = etag;\n        Response.Headers.CacheControl = "private, max-age=300";\n        var matches = Request.GetTypedHeaders().IfNoneMatch;\n        if (matches?.Any(tag => tag ==\n            Microsoft.Net.Http.Headers.EntityTagHeaderValue.Any\n            || tag.Compare(etag, useStrongComparison: false)) == true)\n            return StatusCode(304); // No response body\n\n        return Ok(student);\n    }\n}`;
$("#controller-code").textContent = controller;
function updateRequest() {
  const value = $("#scenario").value;
  const id = value === "404" ? "99999" : value === "403" ? "1002" : "1001";
  $("#request-code").textContent =
    `GET /api/v1/students/${id} HTTP/1.1\nHost: api.fpt.edu.vn\nAccept: application/json\nAuthorization: Bearer <${value === "404" ? "admin" : "student-1001"}-demo-token>\n${value === "304" ? 'If-None-Match: "student-1001-v8"\n' : ""}\n// Accept: yêu cầu phản hồi JSON\n// JWT: danh tính và vai trò người dùng\n// ETag: kiểm tra phiên bản tài nguyên`;
}
updateRequest();
$("#scenario").onchange = () => {
  updateRequest();
  $("#response-status").textContent = "Sẵn sàng";
  $("#response-code").textContent =
    "// Nhấn “Gửi request” để chạy kịch bản đã chọn.";
  $$("#request-flow span").forEach((x) => x.classList.remove("lit"));
};
const student = {
  id: 1001,
  studentCode: "SE170001",
  fullName: "Nguyễn Văn An",
  email: "annvse170001@fpt.edu.vn",
  major: "Software Engineering",
  campus: "Hà Nội",
  currentSemester: 8,
  cumulativeGpa: 3.68,
  academicStatus: "Active",
  enrolledCourses: [
    {
      courseCode: "PRN232",
      courseName: "Advanced Programming with .NET",
      credits: 3,
    },
    { courseCode: "PRM392", courseName: "Mobile Programming", credits: 3 },
  ],
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
$("#send").onclick = async () => {
  const button = $("#send"),
    status = $("#scenario").value;
  button.disabled = true;
  $("#scenario").disabled = true;
  button.innerHTML = "Đang xử lý <span>⋯</span>";
  $("#response-status").textContent = "Đang gửi…";
  $("#response-code").textContent = "// Request đang đi qua pipeline…";
  $$("#request-flow span").forEach((x) => x.classList.remove("lit"));
  for (const node of $$("#request-flow span")) {
    node.classList.add("lit");
    await delay(
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 30 : 330,
    );
  }
  const statuses = {
    200: "200 OK",
    304: "304 Not Modified",
    403: "403 Forbidden",
    404: "404 Not Found",
  };
  $("#response-status").textContent = statuses[status];
  let result = `HTTP/1.1 ${statuses[status]}\n`;
  if (status === "200")
    result +=
      'Content-Type: application/json\nCache-Control: private, max-age=300\nETag: "student-1001-v8"\n\n' +
      JSON.stringify(student, null, 2);
  if (status === "304")
    result +=
      'ETag: "student-1001-v8"\nCache-Control: private, max-age=300\n\n// Không có body.\n// Client dùng representation đã lưu trong cache.\n// 304 và 200 là hai nhánh phản hồi loại trừ nhau.';
  if (status === "403")
    result +=
      "\n// Người dùng student-1001 không có quyền\n// xem hồ sơ của student-1002.\n// Dừng trước khi truy xuất dữ liệu.";
  if (status === "404")
    result +=
      "Content-Type: application/problem+json\n\n" +
      JSON.stringify(
        {
          type: "about:blank",
          title: "Sinh viên không tồn tại",
          status: 404,
          detail: "Không tìm thấy hồ sơ sinh viên với mã ID 99999.",
          instance: "/api/v1/students/99999",
        },
        null,
        2,
      );
  $("#response-code").textContent = result;
  button.disabled = false;
  $("#scenario").disabled = false;
  button.innerHTML = "Gửi request <span>↗</span>";
};
const tiers = [
  [
    "Client tier",
    "React · Flutter · LMS",
    "Mọi thứ bắt đầu từ một lần bấm.",
    "Giao diện gửi HTTPS request với access token. Mỗi nền tảng dùng cùng contract HTTP/JSON.",
    [
      "React / TypeScript Web Portal",
      "Flutter / MAUI Mobile App",
      "Canvas / Edunext LMS",
    ],
  ],
  [
    "Gateway tier",
    "YARP · TLS · Rate limit",
    "Request được kiểm tra trước khi đi tiếp.",
    "Gateway định tuyến và xử lý các mối quan tâm chung trước khi chuyển request tới ứng dụng.",
    [
      "TLS termination",
      "Rate limiting và IP filtering",
      "Xác thực JWT; backend vẫn kiểm tra quyền",
    ],
  ],
  [
    "Application tier",
    "Controller · Service · DTO",
    "Đến lúc xử lý yêu cầu.",
    "Controller tiếp nhận request; service áp dụng quy tắc nghiệp vụ. Middleware xử lý lỗi bao quanh pipeline, không phải tầng gọi sau controller.",
    [
      "StudentsController và authorization",
      "StudentService + DTO mapping",
      "Exception-handling middleware",
    ],
  ],
  [
    "Persistence tier",
    "Redis · EF Core · SQL Server",
    "Tìm dữ liệu ở đâu cho nhanh?",
    "Cache-aside đọc Redis trước, truy vấn SQL Server qua EF Core khi cache miss; sau đó ghi lại cache với TTL.",
    [
      "Redis cache key theo tài nguyên / phạm vi truy cập",
      "EF Core truy vấn và ánh xạ entity",
      "SQL Server lưu dữ liệu quan hệ; vô hiệu cache khi cập nhật",
    ],
  ],
];
$("#tiers").innerHTML = tiers
  .map(
    (t, i) =>
      `<button><span>0${i + 1}</span><div><strong>${t[0]}</strong><small>${t[1]}</small></div><span>↗</span></button>`,
  )
  .join("");
function showTier(i) {
  $$("#tiers button").forEach((b, j) => {
    b.classList.toggle("active", i === j);
    b.setAttribute("aria-pressed", i === j);
  });
  const t = tiers[i];
  $("#tier-detail").innerHTML =
    `<span class="eyebrow">TIER 0${i + 1} / ${t[0].toUpperCase()}</span><h3>${t[2]}</h3><p>${t[3]}</p><ul>${t[4].map((x) => `<li>${x}</li>`).join("")}</ul>`;
  animate($("#tier-detail"));
}
$$("#tiers button").forEach((b, i) => (b.onclick = () => showTier(i)));
showTier(0);
function showSequence(hit) {
  $("#cache-hit").classList.toggle("active", hit);
  $("#cache-miss").classList.toggle("active", !hit);
  $("#cache-hit").setAttribute("aria-pressed", hit);
  $("#cache-miss").setAttribute("aria-pressed", !hit);
  const steps = [
    "Client → Gateway: GET + Bearer JWT",
    "Gateway → API: xác thực và kiểm tra quyền",
    "Service → Redis: student:profile:1001",
    ...(hit
      ? ["Redis → Service: trả DTO từ cache"]
      : [
          "Cache miss → EF Core → SQL Server",
          "SQL → Service: entity → DTO",
          "Service → Redis: ghi cache, TTL 300 giây",
        ]),
    "API: so sánh If-None-Match với ETag",
    "Trùng ETag → 304; khác / thiếu ETag → 200 + JSON",
  ];
  $("#sequence-steps").innerHTML = steps.map((s) => `<li>${s}</li>`).join("");
  animate($("#sequence-steps"));
}
$("#cache-hit").onclick = () => showSequence(true);
$("#cache-miss").onclick = () => showSequence(false);
showSequence(true);
const sources = [
  [
    "REST Architectural Foundations",
    "Roy Fielding · Dissertation, Chapter 5 · 2000",
    "https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm",
  ],
  [
    "HTTP Semantics",
    "IETF · RFC 9110 · 2022",
    "https://www.rfc-editor.org/rfc/rfc9110",
  ],
  [
    "Problem Details for HTTP APIs",
    "IETF · RFC 9457 (thay thế RFC 7807) · 2023",
    "https://www.rfc-editor.org/rfc/rfc9457",
  ],
  [
    "SOAP 1.2 Messaging Framework",
    "W3C · Recommendation · 2007",
    "https://www.w3.org/TR/soap12-part1/",
  ],
  [
    "GraphQL Specification",
    "GraphQL Foundation · October 2021",
    "https://spec.graphql.org/October2021/",
  ],
  [
    "gRPC & Protocol Buffers",
    "gRPC · Introduction & Documentation",
    "https://grpc.io/docs/what-is-grpc/introduction/",
  ],
  [
    "Richardson Maturity Model",
    "Martin Fowler · 2010",
    "https://martinfowler.com/articles/richardsonMaturityModel.html",
  ],
  [
    "GraphQL at PayPal Checkout",
    "PayPal Technology · Case study · 2018",
    "https://medium.com/paypal-tech/graphql-a-success-story-for-paypal-checkout-3482f7242689",
  ],
  [
    "Breadth-first GraphQL Execution",
    "Shopify Engineering · Case study",
    "https://shopify.engineering/faster-breadth-first-graphql-execution",
  ],
];
$("#sources").innerHTML = sources
  .map(
    (s, i) =>
      `<a href="${s[2]}" target="_blank" rel="noopener noreferrer"><span>${String(i + 1).padStart(2, "0")}</span><div><strong>${s[0]}</strong><small>${s[1]}</small></div><b>↗</b></a>`,
  )
  .join("");
const decisions = [
  [
    "CRUD & HTTP caching",
    "REST",
    "Hệ thống hướng tài nguyên, dữ liệu có cấu trúc và nhiều thao tác CRUD. REST giúp tận dụng HTTP và đơn giản hóa tích hợp với Web, Mobile, public API.",
  ],
  [
    "UI đa dạng & query lồng sâu",
    "GraphQL",
    "Client cần chọn dữ liệu khác nhau cho nhiều màn hình. GraphQL là lựa chọn phù hợp ở BFF, đi kèm quản lý resolver, batching, phân quyền theo trường và giới hạn query.",
  ],
  [
    "Microservices & streaming",
    "gRPC",
    "Các dịch vụ nội bộ cần contract rõ ràng, hiệu quả truyền tải và streaming. Hãy đo tải thực tế, tính đến hạ tầng HTTP/2 và công cụ vận hành.",
  ],
  [
    "Legacy & chuẩn WS-*",
    "SOAP",
    "Hệ thống đối tác đã dùng WSDL hoặc yêu cầu chuẩn WS-Security, WS-AtomicTransaction. Lợi ích tương thích hợp đồng có thể lớn hơn chi phí XML và cấu hình.",
  ],
];
$("#decision-options").innerHTML = decisions
  .map((d, i) => `<button><span>PRIORITY 0${i + 1}</span>${d[0]}</button>`)
  .join("");
function decide(i) {
  $$("#decision-options button").forEach((b, j) => {
    b.classList.toggle("active", i === j);
    b.setAttribute("aria-pressed", i === j);
  });
  $("#decision-result").innerHTML =
    `<h3>${decisions[i][1]} <span>↗</span></h3><div><span class="eyebrow">HƯỚNG TIẾP CẬN ĐỀ XUẤT</span><p>${decisions[i][2]}</p></div>`;
  animate($("#decision-result"));
}
$$("#decision-options button").forEach((b, i) => (b.onclick = () => decide(i)));
decide(0);
const chapters = $$(".chapter");
const names = [
  "Mở đầu",
  "Bốn kiến trúc",
  "Bảng so sánh",
  "Sự đánh đổi",
  "Bài toán sinh viên",
  "Live demo",
  "Kiến trúc hệ thống",
  "Tài liệu tham khảo",
  "Khung lựa chọn",
];
$("#menu nav").innerHTML = chapters
  .map(
    (c, i) =>
      `<a style="transition-delay:${i * 35}ms" href="#${c.id}"><span class="eyebrow">0${i + 1}</span> ${names[i]}</a>`,
  )
  .join("");
function menu(open) {
  $("#menu").classList.toggle("open", open);
  $("#menu").inert = !open;
  $("#menu-button").setAttribute("aria-expanded", open);
  $("#menu-button").setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
  document.body.style.overflow = open ? "hidden" : "";
  if (open) $("#menu a").focus();
}
$("#menu-button").onclick = () => menu(!$("#menu").classList.contains("open"));
$$("#menu a").forEach((a) => (a.onclick = () => menu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && $("#menu").classList.contains("open")) {
    menu(false);
    $("#menu-button").focus();
  }
  if ($("#menu").classList.contains("open") && e.key === "Tab") {
    const list = [$("#menu-button"), ...$$("#menu a")];
    const first = list[0],
      last = list.at(-1);
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
document.documentElement.classList.add("js");
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }),
  { threshold: 0.06 },
);
$$(".reveal").forEach((e) => observer.observe(e));

// Additional diagrams remain part of the content, without recording controls.
$(".case-feature .stat").insertAdjacentHTML(
  "beforebegin",
  studentIllustration(),
);
$(".closing").insertAdjacentHTML(
  "beforebegin",
  `<div class="shell"><div class="hybrid-board"><div><span class="eyebrow">HYBRID ARCHITECTURE</span><h3>Mỗi phần của hệ thống,<br><em>một cách kết nối phù hợp.</em></h3><p>REST hoặc GraphQL phục vụ Web và Mobile. gRPC kết nối các dịch vụ trong mạng nội bộ.</p><div class="tags" style="margin-top:20px"><span>North–South</span><span>East–West</span></div></div>${apiIllustration("hybrid", "hybrid")}</div></div>`,
);


// ============================================================================
// SLIDE DECK PRESENTATION SYSTEM
// ============================================================================
(function initSlideDeck() {
  document.body.classList.add("slide-deck-mode");
  const slides = [...$$(".chapter")];
  slides.forEach((s) => s.classList.add("slide"));

  let currentSlide = 0;

  function updateSlideUI() {
    slides.forEach((s, i) => {
      const isActive = i === currentSlide;
      s.classList.toggle("active", isActive);
      s.setAttribute("aria-hidden", String(!isActive));
      if (isActive) {
        s.scrollTop = 0;
        // Make all reveal items in active slide visible immediately
        s.querySelectorAll(".reveal").forEach((el) =>
          el.classList.add("visible"),
        );
        s.querySelectorAll(".reveal-item").forEach((el) =>
          el.classList.add("in-view"),
        );
      }
    });

    // Update slide counter and name in bottom bar
    const numText = `0${currentSlide + 1} / 0${slides.length}`;
    const nameText = names[currentSlide] || "";
    const numEl = $("#slide-number");
    const nameEl = $("#slide-name");
    if (numEl) numEl.textContent = numText;
    if (nameEl) nameEl.textContent = nameText;

    // Update Prev / Next buttons state
    const prevBtn = $("#slide-prev");
    const nextBtn = $("#slide-next");
    const edgePrev = $("#edge-prev");
    const edgeNext = $("#edge-next");
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (edgePrev) edgePrev.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide === slides.length - 1;
    if (edgeNext) edgeNext.disabled = currentSlide === slides.length - 1;

    // Update indicator dots
    $$(".slide-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
      dot.setAttribute("aria-current", i === currentSlide ? "step" : "false");
    });

    // Update main nav active link
    const activeId = slides[currentSlide]?.id;
    $$(".nav nav a").forEach((a) => {
      const href = a.getAttribute("href");
      a.classList.toggle("current", href === `#${activeId}`);
    });

    // Update URL hash without causing viewport jumping
    if (activeId && window.location.hash !== `#${activeId}`) {
      history.replaceState(null, "", `#${activeId}`);
    }
  }

  function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;
    currentSlide = index;
    updateSlideUI();
  }

  function nextSlide() {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }

  // Generate indicator dots
  const dotsContainer = $("#slide-dots");
  if (dotsContainer) {
    dotsContainer.innerHTML = slides
      .map(
        (_, i) =>
          `<button class="slide-dot ${i === 0 ? "active" : ""}" data-index="${i}" aria-label="Đến slide 0${i + 1}: ${names[i] || ""}"></button>`,
      )
      .join("");
    $$(".slide-dot").forEach((d) => {
      d.onclick = () => goToSlide(Number(d.dataset.index));
    });
  }

  // Button clicks
  $("#slide-prev")?.addEventListener("click", prevSlide);
  $("#slide-next")?.addEventListener("click", nextSlide);
  $("#edge-prev")?.addEventListener("click", prevSlide);
  $("#edge-next")?.addEventListener("click", nextSlide);

  // Fullscreen button
  $("#fullscreen-btn")?.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  // Intercept all hash links (e.g. Nav bar, Hero CTA, Footer links)
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const targetId = href.slice(1);
      const targetIdx = slides.findIndex((s) => s.id === targetId);
      if (targetIdx !== -1) {
        e.preventDefault();
        goToSlide(targetIdx);
      }
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
    if (
      document.activeElement?.tagName === "SELECT" &&
      (e.key === "ArrowUp" || e.key === "ArrowDown")
    )
      return;
    if ($("#menu")?.classList.contains("open")) return;

    if (
      e.key === "ArrowRight" ||
      e.key === "ArrowDown" ||
      e.key === "PageDown" ||
      (e.key === " " && document.activeElement?.tagName !== "BUTTON")
    ) {
      e.preventDefault();
      nextSlide();
    } else if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowUp" ||
      e.key === "PageUp"
    ) {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "Home") {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goToSlide(slides.length - 1);
    } else if (/^[1-9]$/.test(e.key)) {
      const num = parseInt(e.key, 10) - 1;
      if (num < slides.length) {
        e.preventDefault();
        goToSlide(num);
      }
    } else if (e.key === "f" || e.key === "F") {
      if (!["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    }
  });

  // Initial sync with URL hash
  const initialHash = window.location.hash.slice(1);
  if (initialHash) {
    const initIdx = slides.findIndex((s) => s.id === initialHash);
    if (initIdx !== -1) currentSlide = initIdx;
  }
  updateSlideUI();

  window.addEventListener("hashchange", () => {
    const h = window.location.hash.slice(1);
    const idx = slides.findIndex((s) => s.id === h);
    if (idx !== -1 && idx !== currentSlide) goToSlide(idx);
  });
})();
