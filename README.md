# AI Practice · Olympic UET 2026

Mở **`index.html`** bằng Chrome, Edge hoặc Firefox để bắt đầu. Không cần cài thư viện, chạy server hay kết nối mạng. Giữ `index.html`, `styles.css`, `app.js` và `questions.js` trong cùng thư mục.

- Chọn một trong bốn đáp án: đáp án đúng hiện **xanh**, lựa chọn sai hiện **đỏ**; lời giải xuất hiện ngay bên dưới. Đáp án được khóa sau khi chọn. Dùng **Thử lại câu này** nếu muốn làm lại.
- Mỗi câu có lời giải chi tiết cho đáp án đúng, phân tích riêng cả ba phương án sai và một phần **Ghi nhớ**. Nếu chọn sai, phương án của bạn được đánh dấu **Bạn đã chọn** trong phần phân tích. Tất cả 140 câu và 420 giải thích phương án sai nằm trong file Markdown nguồn.
- Chuyển câu bằng **Câu trước / Câu tiếp theo**, bản đồ câu hỏi hoặc phím mũi tên. Phím **1–4** tương ứng A–D.
- Lọc theo 4 chủ đề, câu chưa làm, câu sai hoặc câu đã lưu bằng ngôi sao. Tìm câu theo số hoặc nội dung. **Xáo trộn** chỉ đổi thứ tự câu hỏi, giữ nguyên các phương án và tiến độ.
- Đáp án, câu đã lưu và vị trí đang học được lưu trong trình duyệt. **Làm lại từ đầu** xóa tiến độ sau khi xác nhận. Thống kê tính theo chủ đề đang chọn và theo đáp án hiện được lưu của mỗi câu.
- Trong bộ lọc **Chưa làm** hoặc **Câu sai**, danh sách giữ nguyên trong lúc trả lời để bạn đọc được lời giải. Chọn lại bộ lọc để cập nhật danh sách.
- Giao diện vừa một màn hình: cuộn nội dung trong khung câu hỏi/lời giải, còn bảng thống kê và nút chuyển câu luôn hiện. Trên điện thoại, nhấn nút mũi tên cạnh **Bản đồ câu hỏi** ở cuối màn hình để mở danh sách, tìm câu hoặc làm lại từ đầu.

## Cập nhật từ Markdown

Sau khi sửa nội dung trong `Ngan_hang_trac_nghiem_OlpAI_UET_2026.md`, chạy từ thư mục này:

```powershell
python scripts/build_questions.py
```

Sau đó tải lại trang. Script kiểm tra đủ 140 câu liên tiếp; mỗi câu phải có bốn lựa chọn A–D, giải thích đáp án đúng, giải thích riêng cả ba đáp án sai và ghi nhớ. Các mục **Vì sao các phương án còn lại sai?**, dòng `- **B:** ...` (theo chữ cái phương án sai) và **Ghi nhớ:** được dùng để tách dữ liệu hiển thị. Không đổi các nhãn cấu trúc này khi sửa nội dung.

Lời giải được mở rộng ngay trong Markdown và đồng bộ sang `questions.js`. Cú pháp `Pipeline` ở câu 8 và khoảng giá trị tanh ở câu 66 đã được chỉnh cho chính xác; xem phần V của Markdown để đọc các tài liệu chính thức đã đối chiếu. Cập nhật lời giải không xóa tiến độ đang lưu vì ID câu hỏi và đáp án đúng không thay đổi.

## Kiểm tra giao diện

```powershell
node scripts/check_ui.mjs
```

Cần Node 22 và Chrome/Edge đã cài. Bài kiểm tra dùng profile trình duyệt tạm riêng, kiểm tra từng câu ở cả trạng thái chọn đúng/sai, ba phân tích phương án sai, ghi nhớ, lưu tiến độ và bố cục ở các chiều rộng màn hình khác nhau. Có thể đặt biến `CHROME_PATH` nếu trình duyệt nằm ở vị trí khác.

Việc lưu tiến độ phụ thuộc cài đặt trình duyệt. Khi mở bằng `file://`, hãy dùng cùng trình duyệt và giữ nguyên vị trí thư mục để tiếp tục phiên học; nếu trình duyệt chặn lưu, trang sẽ thông báo và vẫn cho phép làm bài trong phiên hiện tại.
