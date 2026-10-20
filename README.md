# AI Practice · Olympic UET 2026

Mở **`index.html`** bằng Chrome, Edge hoặc Firefox để bắt đầu. Không cần cài thư viện, chạy server hay kết nối mạng. Giữ `index.html`, `styles.css`, `app.js` và `questions.js` trong cùng thư mục.

- Chọn một trong bốn đáp án: đáp án đúng hiện **xanh**, lựa chọn sai hiện **đỏ**; lời giải xuất hiện ngay bên dưới. Đáp án được khóa sau khi chọn. Dùng **Thử lại câu này** nếu muốn làm lại.
- Chọn **Dễ / Trung bình / Khó** ở cột trái (ngay dưới chủ đề trên điện thoại). Có **300 câu**: 140 câu Dễ ban đầu, 80 câu Trung bình (141–220), 80 câu Khó (221–300). Mỗi mức mới phủ cả bốn mảng của phần 3 đề cương UET.
- Mỗi câu có lời giải cho đáp án đúng, phân tích riêng cả ba phương án sai và **Ghi nhớ**; tổng cộng 300 lời giải đúng, 900 giải thích phương án sai. Nếu chọn sai, phương án của bạn được đánh dấu **Bạn đã chọn**. Trung bình tập trung vận dụng/đọc mã/tính nhanh; Khó tập trung kết hợp điều kiện, chẩn đoán và đánh đổi giải pháp. Câu hỏi mới tự biên soạn, không phải đề thi chính thức.
- Chuyển câu bằng **Câu trước / Câu tiếp theo**, bản đồ câu hỏi hoặc phím mũi tên. Phím **1–4** tương ứng A–D.
- Bốn phương án được tự xáo trộn và gán nhãn A–D khi bắt đầu, cân bằng trong từng mức: 35 đáp án đúng mỗi vị trí ở mức Dễ, 20 ở Trung bình và Khó. Thứ tự được lưu cùng tiến độ nên không thay đổi khi chuyển câu, thử lại hoặc tải lại trang. Khi mở rộng từ bộ 140 câu, thứ tự phương án cũ hợp lệ, đáp án và câu đã lưu được giữ lại.
- Lọc theo 4 chủ đề, câu chưa làm, câu sai hoặc câu đã lưu bằng ngôi sao. Tìm câu theo số hoặc nội dung. **Xáo trộn** đổi thứ tự câu hỏi và các phương án nhưng giữ đúng nội dung đã chọn, kết quả và câu đã lưu. **Làm lại từ đầu** tạo lượt mới với thứ tự phương án mới sau khi xác nhận.
- Đáp án, câu đã lưu, mức độ, chủ đề và vị trí đang học được lưu trong trình duyệt. **Làm lại từ đầu** xóa tiến độ của cả ba mức sau khi xác nhận. Thống kê và số câu theo chủ đề tính trong mức đang chọn; đổi mức không xóa đáp án ở mức khác. Tìm kiếm và bộ lọc trạng thái áp dụng trong mức/chủ đề đang chọn. Khi đổi mức, từ khóa tìm kiếm được xóa, bộ lọc trạng thái vẫn giữ.
- Trong bộ lọc **Chưa làm** hoặc **Câu sai**, danh sách giữ nguyên trong lúc trả lời để bạn đọc được lời giải. Chọn lại bộ lọc để cập nhật danh sách.
- Giao diện vừa một màn hình: cuộn nội dung trong khung câu hỏi/lời giải, còn bảng thống kê và nút chuyển câu luôn hiện. Trên điện thoại, nhấn nút mũi tên cạnh **Bản đồ câu hỏi** ở cuối màn hình để mở danh sách, tìm câu hoặc làm lại từ đầu.

## Cập nhật từ Markdown

Nguồn nội dung là ba file Markdown: `Ngan_hang_trac_nghiem_OlpAI_UET_2026.md` (Dễ), `Ngan_hang_Trung_binh.md`, `Ngan_hang_Kho.md`. Ma trận đối chiếu từng mục trong đề cương và tài liệu gốc nằm trong [PHAM_VI_VA_NGUON.md](PHAM_VI_VA_NGUON.md). Sau khi sửa nội dung, chạy từ thư mục này:

```powershell
python scripts/build_questions.py
python scripts/check_bank.py
```

Sau đó tải lại trang. Script kiểm tra đủ 300 ID liên tiếp theo ba ngân hàng; mỗi câu phải có bốn lựa chọn A–D khác nhau, giải thích đáp án đúng, giải thích riêng cả ba đáp án sai và ghi nhớ. `check_bank.py` còn kiểm tra đồng bộ Markdown/JS, đáp án nhanh và tính độc lập 40 đáp án số/mã. Nếu đổi các số liệu tương ứng, cập nhật phép tính kiểm tra. Các mục **Vì sao các phương án còn lại sai?**, dòng `- **B:** ...` và **Ghi nhớ:** được dùng để tách dữ liệu; không đổi các nhãn cấu trúc này. Nếu sửa đáp án chữ cái trong hai bộ mới, sửa cả phần đáp án nhanh ở cuối file.

Lời giải được mở rộng ngay trong Markdown và đồng bộ sang `questions.js`. Cú pháp `Pipeline` ở câu 8 và khoảng giá trị tanh ở câu 66 đã được chỉnh cho chính xác; xem phần V của Markdown để đọc các tài liệu chính thức đã đối chiếu. Markdown giữ nhãn gốc để dễ biên soạn; giao diện xáo trộn và gán lại nhãn khi hiển thị. Tiến độ lưu theo ID phương án gốc nên cập nhật giao diện hoặc trộn lại không làm sai kết quả đã chọn trước đây.

## Kiểm tra giao diện

```powershell
node scripts/check_ui.mjs
```

Cần Node 22 và Chrome/Edge đã cài. Bài kiểm tra dùng profile tạm riêng, kiểm tra cả 300 câu ở trạng thái đúng/sai, lời giải, đổi mức kết hợp chủ đề/bộ lọc, thống kê, lưu tiến độ, migration 140 câu cũ và bố cục nhiều kích thước màn hình. Không dùng profile đang học của người dùng. Có thể đặt `CHROME_PATH` nếu trình duyệt nằm ở vị trí khác.

Việc lưu tiến độ phụ thuộc cài đặt trình duyệt. Khi mở bằng `file://`, hãy dùng cùng trình duyệt và giữ nguyên vị trí thư mục để tiếp tục phiên học; nếu trình duyệt chặn lưu, trang sẽ thông báo và vẫn cho phép làm bài trong phiên hiện tại.
