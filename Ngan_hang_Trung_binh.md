# NGÂN HÀNG TRUNG BÌNH · OLYMPIC AI UET 2026

# I. PHẠM VI VÀ CÁCH SỬ DỤNG

80 câu tự biên soạn để luyện tập phần 3.1–3.4 của đề cương UET do người học cung cấp. Không phải đề thi chính thức. Mức độ là phân loại sư phạm trong ứng dụng, khác nhãn Lý thuyết/Thực hành/Cả hai của syllabus.

Mức trung bình: vận dụng một đến hai khái niệm, đọc mã, tính nhanh và chọn quy trình đúng.

Mỗi câu có một đáp án tốt nhất theo giả định đã nêu, giải thích cả bốn lựa chọn và ghi nhớ. Thuật ngữ tiếng Anh được giữ khi cần. Mã ngắn giả sử đã import thư viện được nêu. Xem `PHAM_VI_VA_NGUON.md` để đối chiếu từng nhóm kiến thức và nguồn chính thức.

# II. CÂU HỎI

## A. Kỹ năng nền tảng & Học máy cổ điển

### Câu 141 — Python: các hàng dùng chung tham chiếu

Để tạo ma trận đếm, bạn chạy `a = [[0]*2]*3; a[0][1] = 5`. Giá trị `a` là gì?

A. `[[0,5],[0,5],[0,5]]`
B. `[[0,5],[0,0],[0,0]]`
C. `[[5,0],[5,0],[5,0]]`
D. Phát sinh IndexError

**Đáp án: A.** Phép nhân list ngoài lặp lại tham chiếu tới cùng hàng. Sửa phần tử của một hàng làm cả ba tham chiếu thấy `[0,5]`.

**Vì sao các phương án còn lại sai?**

- **B:** Đây là kết quả khi tạo từng hàng độc lập bằng comprehension.
- **C:** Chỉ số 1 chỉ cột thứ hai, không phải cột đầu.
- **D:** Ma trận có ba hàng, mỗi hàng hai phần tử nên chỉ số hợp lệ.

**Ghi nhớ:** Tạo các hàng độc lập bằng `[[0]*2 for _ in range(3)]`.

---

### Câu 142 — NumPy: trừ trung bình từng mẫu

`X` có shape `(5,3)`, mỗi hàng là một mẫu. Cần trừ trung bình của chính hàng đó khỏi từng phần tử. Biểu thức nào đúng?

A. `X - X.mean(axis=0)`
B. `X - X.mean(axis=1, keepdims=True)`
C. `X - X.mean(axis=1)`
D. `X - X.mean()`

**Đáp án: B.** Trung bình có shape `(5,1)` nên broadcast theo ba cột của mỗi hàng.

**Vì sao các phương án còn lại sai?**

- **A:** Trừ trung bình từng đặc trưng trên năm mẫu, khác yêu cầu.
- **C:** Shape `(5,)` không broadcast được với `(5,3)`.
- **D:** Trừ một trung bình chung cho toàn ma trận.

**Ghi nhớ:** Giữ chiều bị rút gọn giúp broadcasting thể hiện đúng ý nghĩa theo hàng/cột.

---

### Câu 143 — pandas: gộp dữ liệu đúng đơn vị

Bảng giao dịch có nhiều dòng cho mỗi `customer_id`; bảng nhãn có đúng một dòng mỗi khách. Cần một mẫu cho mỗi khách với tổng tiền và nhãn. Chọn quy trình đúng.

A. Merge rồi coi mỗi giao dịch là một khách độc lập
B. Drop_duplicates khách rồi lấy tiền của dòng đầu
C. Groupby khách để tính tổng tiền, rồi merge với bảng nhãn theo customer_id
D. Nối hai bảng theo chỉ số dòng

**Đáp án: C.** Tổng hợp trước tạo đúng một hàng mỗi khách; phép gộp thêm nhãn không nhân số mẫu.

**Vì sao các phương án còn lại sai?**

- **A:** Khách nhiều giao dịch bị đếm nhiều lần, sai đơn vị dự đoán.
- **B:** Làm mất các giao dịch còn lại nên không tính được tổng.
- **D:** Chỉ số dòng không bảo đảm cùng khách; phải dùng khóa.

**Ghi nhớ:** Xác định một mẫu tương ứng với thực thể nào trước khi groupby và merge.

---

### Câu 144 — Trực quan hóa: che khuất lớp hiếm

Dữ liệu nhị phân có 990 mẫu lớp 0 và 10 mẫu lớp 1. Heatmap confusion matrix toàn bộ theo số đếm khiến lỗi lớp 1 khó thấy. Cách bổ sung nào hữu ích nhất?

A. Chỉ vẽ accuracy 99% bằng một cột
B. Xóa hàng lớp 0 khỏi tập test
C. Đổi sang biểu đồ đường nhưng bỏ tên lớp
D. Hiển thị thêm confusion matrix chuẩn hóa theo lớp thật, kèm số mẫu từng lớp

**Đáp án: D.** Tỷ lệ theo hàng giúp đọc recall từng lớp; số mẫu giữ thông tin về độ mất cân bằng.

**Vì sao các phương án còn lại sai?**

- **A:** Một số chung tiếp tục che khuất hiệu năng lớp hiếm.
- **B:** Thay đổi phân phối đánh giá và bỏ mất false positive quan trọng.
- **C:** Đổi hình thức không khắc phục việc thiếu tỷ lệ theo lớp.

**Ghi nhớ:** Đọc số đếm và tỷ lệ cùng nhau để tránh diễn giải sai biểu đồ.

---

### Câu 145 — Pipeline: imputation trong cross-validation

Bạn muốn chọn `C` của Logistic Regression bằng CV trên bảng có giá trị thiếu. Median imputation và scaling cần đặt ở đâu?

A. Trong Pipeline được truyền vào GridSearchCV
B. Fit imputer và scaler trên toàn dữ liệu rồi mới CV
C. Fit riêng scaler trên validation từng fold
D. Thay toàn bộ giá trị thiếu bằng nhãn mục tiêu

**Đáp án: A.** Mỗi fold học median và scaler chỉ từ phần train của fold đó.

**Vì sao các phương án còn lại sai?**

- **B:** Các thống kê đã nhìn phần validation của từng fold.
- **C:** Tạo phép biến đổi khác với train, không mô phỏng suy luận thực tế.
- **D:** Dùng đích làm đầu vào gây rò rỉ và không có khi dự đoán.

**Ghi nhớ:** Mọi bước có học thống kê đều phải nằm trong vòng chia train/validation.

---

### Câu 146 — Tensor: đổi thứ tự chiều ảnh

Batch ảnh NHWC có shape `(8,32,32,3)`. Conv2d PyTorch thông thường cần NCHW. Thao tác nào giữ đúng ý nghĩa pixel và kênh?

A. `x.reshape(8,3,32,32)`
B. `x.permute(0,3,1,2)`
C. `x.mean(dim=3)`
D. `x.permute(3,0,1,2)`

**Đáp án: B.** Hoán vị trục chuyển chiều kênh sang vị trí thứ hai, không diễn giải lại thứ tự phần tử.

**Vì sao các phương án còn lại sai?**

- **A:** Reshape không hoán vị các trục; vị trí các kênh/pixel bị diễn giải sai.
- **C:** Bỏ chiều kênh bằng trung bình và mất màu, không tạo NCHW.
- **D:** Đưa kênh thành chiều batch và batch thành chiều kênh.

**Ghi nhớ:** Đổi ý nghĩa trục dùng permute/transpose; đổi cách nhóm phần tử mới dùng reshape.

---

### Câu 147 — CPU/GPU: lỗi device trong huấn luyện

Model đã chuyển sang CUDA; batch `x,y` còn ở CPU. Lần forward báo lỗi khác device. Sửa tối thiểu thế nào?

A. Chỉ gọi `model.eval()`
B. Chỉ tăng batch size
C. Chuyển cả x và y tới device của model trước forward và tính loss
D. Gọi `loss.item()` trước backward để chuyển loss về CPU

**Đáp án: C.** Input, tham số và target tham gia loss phải ở thiết bị tương thích.

**Vì sao các phương án còn lại sai?**

- **A:** Eval đổi hành vi một số lớp, không chuyển thiết bị.
- **B:** Không sửa vị trí bộ nhớ của tensor.
- **D:** item trả số Python và không giữ đồ thị để backward.

**Ghi nhớ:** Kiểm tra device của model, input và target khi gặp lỗi CPU/CUDA.

---

### Câu 148 — Linear Regression: thêm đặc trưng phi tuyến

Đồ thị y theo x dạng parabol; Linear Regression chỉ dùng x có residual hình chữ U. Muốn vẫn dùng mô hình tuyến tính theo tham số, nên làm gì?

A. Chỉ nhân x với 100
B. Đổi y liên tục thành nhãn 0/1 tùy ý
C. Chỉ tăng số vòng lặp của mô hình đã hội tụ
D. Thêm đặc trưng x bình phương và chọn mức regularization trên validation

**Đáp án: D.** Mô hình `b+w1*x+w2*x²` vẫn tuyến tính theo trọng số nhưng biểu diễn được độ cong.

**Vì sao các phương án còn lại sai?**

- **A:** Đổi thang đo không tạo quan hệ parabol.
- **B:** Thay đổi bài toán và mất thông tin mục tiêu.
- **C:** Không thay đổi khả năng biểu diễn của đường thẳng.

**Ghi nhớ:** Tuyến tính theo tham số không có nghĩa chỉ dùng đặc trưng thô tuyến tính.

---

### Câu 149 — Logistic Regression: đổi ngưỡng

Giữ nguyên xác suất của một bộ phân loại nhị phân và quy tắc dự đoán dương khi `p >= t`. Khi giảm t từ 0,7 xuống 0,3 trên cùng tập test, điều gì được bảo đảm nếu có mẫu dương thật?

A. Recall không giảm
B. Precision luôn tăng
C. ROC-AUC luôn tăng
D. Số false positive luôn giảm

**Đáp án: A.** Tập dự đoán dương chỉ mở rộng, nên số true positive không thể giảm.

**Vì sao các phương án còn lại sai?**

- **B:** Các mẫu mới được nhận có thể là false positive nên precision không được bảo đảm tăng.
- **C:** Đổi một ngưỡng không thay đổi thứ tự các score dùng tính AUC.
- **D:** Tập dự đoán dương mở rộng nên false positive không thể giảm.

**Ghi nhớ:** Phân biệt thay ngưỡng quyết định với thay khả năng xếp hạng của mô hình.

---

### Câu 150 — L1/L2: mục tiêu sparsity

Bảng đã chuẩn hóa có 2.000 đặc trưng, nhiều cột được cho là không liên quan. Muốn một mô hình tuyến tính với nhiều hệ số đúng bằng 0, lựa chọn đầu tiên hợp lý là gì?

A. L2 vì luôn xóa chính xác mọi cột thừa
B. L1 và chọn độ phạt bằng CV
C. Bỏ regularization rồi chọn hệ số lớn nhất trên test
D. Tăng độ phạt tới khi mọi hệ số bằng 0 bất kể validation

**Đáp án: B.** L1 khuyến khích nghiệm thưa; CV cân bằng độ thưa với khả năng dự đoán.

**Vì sao các phương án còn lại sai?**

- **A:** L2 thường co nhỏ hệ số, không tạo sparsity như L1 và không biết cột nào thật sự thừa.
- **C:** Dùng test để lựa chọn làm sai đánh giá; không trực tiếp tối ưu sparsity.
- **D:** Có thể gây underfitting và đánh mất tín hiệu.

**Ghi nhớ:** Sparsity là mục tiêu mô hình hóa cần kiểm tra, không bảo đảm đã tìm đúng mọi biến nhân quả.

---

### Câu 151 — K-NN: khoảng cách và đơn vị đo

K-NN dùng tuổi (18–80) và thu nhập (triệu đồng, 5–5000). Khi đổi thu nhập sang đồng, kết quả thay đổi mạnh. Cách xử lý đúng nhất?

A. Tăng k bằng đúng số mẫu train
B. Chỉ chuẩn hóa nhãn lớp
C. Fit scaler trên train rồi dùng cùng scaler cho validation/test
D. Chuẩn hóa test bằng trung bình test riêng

**Đáp án: C.** Chuẩn hóa làm giảm việc một đơn vị số lớn chi phối khoảng cách.

**Vì sao các phương án còn lại sai?**

- **A:** Mô hình gần như chỉ dự đoán theo đa số, không sửa cơ chế khoảng cách.
- **B:** Khoảng cách được tính trên đầu vào, không trên nhãn.
- **D:** Dùng hệ tọa độ khác train, không nhất quán khi tìm láng giềng.

**Ghi nhớ:** Với mô hình dựa khoảng cách, đơn vị đo là một phần của thiết kế đặc trưng.

---

### Câu 152 — Decision Tree: lá quá nhỏ

Cây đạt train accuracy 100%, validation 71%; nhiều lá chỉ có một mẫu. Can thiệp nào trực tiếp giảm độ phức tạp?

A. Giảm min_samples_leaf từ 2 xuống 1
B. Chuẩn hóa tất cả đặc trưng rồi giữ cây y nguyên
C. Đổi random_state đến khi test cao nhất
D. Tăng min_samples_leaf và chọn bằng validation

**Đáp án: D.** Buộc các lá có nhiều mẫu hơn, giảm chia nhỏ theo nhiễu.

**Vì sao các phương án còn lại sai?**

- **A:** Cho phép thêm lá nhỏ, thường tăng độ phức tạp.
- **B:** Scaling không phải cách chính kiểm soát độ sâu/số lá của cây.
- **C:** Tối ưu theo test làm rò rỉ đánh giá, không xử lý gốc overfitting.

**Ghi nhớ:** Chẩn đoán overfitting bằng khoảng cách train/validation rồi điều chỉnh độ phức tạp.

---

### Câu 153 — SVM: C và regularization

RBF-SVM sau scaling đạt train 100%, validation 75%. Đang dùng C và gamma rất lớn. Thử nghiệm nào phù hợp nhất để giảm overfitting?

A. Tìm C và gamma nhỏ hơn bằng CV trên train
B. Tăng đồng thời C và gamma thật mạnh
C. Chọn C từ nhãn test
D. Bỏ scaling và giữ nguyên gamma

**Đáp án: A.** Giảm C tăng regularization; giảm gamma làm ảnh hưởng kernel ít cục bộ hơn.

**Vì sao các phương án còn lại sai?**

- **B:** Thường cho phép ranh giới phức tạp hơn, không hợp dấu hiệu hiện tại.
- **C:** Dùng nhãn test để tuning làm kết quả không còn độc lập.
- **D:** Làm thay đổi khoảng cách khó kiểm soát, không phải sửa regularization có căn cứ.

**Ghi nhớ:** C và gamma cần chọn cùng với tiền xử lý trong CV.

---

### Câu 154 — Bagging: giảm variance

Một Decision Tree sâu thay đổi dự đoán rất mạnh khi thay vài dòng train. Có nhiều CPU và muốn giảm variance mà không học tuần tự. Nên thử gì?

A. Huấn luyện cùng cây trên đúng dữ liệu và seed nhiều lần
B. Bagging nhiều cây trên các bootstrap sample rồi tổng hợp
C. Chỉ dùng một cây sâu hơn
D. Gradient Boosting vì mọi cây luôn độc lập và song song

**Đáp án: B.** Trung bình/voting các cây đa dạng giúp giảm dao động do mẫu train.

**Vì sao các phương án còn lại sai?**

- **A:** Các cây giống nhau không tạo đa dạng hữu ích.
- **C:** Có thể tăng nhạy với nhiễu thay vì giảm variance.
- **D:** Boosting xây dựng mô hình theo chuỗi để sửa sai, khác yêu cầu.

**Ghi nhớ:** Ensemble có lợi khi thành phần đủ tốt và sai số không hoàn toàn tương quan.

---

### Câu 155 — Gradient Boosting: bước sửa residual

Boosting cho squared error đang dự đoán `[3,5]` với y=`[5,4]`. Cây mới fit residual chính xác `[2,-1]`. Learning rate là 0,1. Dự đoán sau cập nhật là gì?

A. `[5,4]`
B. `[2,-1]`
C. `[3.2,4.9]`
D. `[2.8,5.1]`

**Đáp án: C.** Cộng 0,1 lần residual vào dự đoán cũ: `[3,5]+0,1*[2,-1]`.

**Vì sao các phương án còn lại sai?**

- **A:** Chỉ đúng khi learning rate bằng 1 trong ví dụ này.
- **B:** Đây là residual, không phải tổng dự đoán của ensemble.
- **D:** Đã trừ bước sửa thay vì cộng residual y trừ dự đoán.

**Ghi nhớ:** Boosting cộng từng bước nhỏ; không thay toàn bộ mô hình bằng cây mới.

---

### Câu 156 — K-Means: một bước cập nhật

Dữ liệu 1D `[0,2,8,10]`, tâm khởi tạo 0 và 8. Sau một bước gán cụm gần nhất rồi cập nhật tâm, hai tâm là gì?

A. 0 và 10
B. 2 và 8
C. 5 và 5
D. 1 và 9

**Đáp án: D.** Hai cụm là `{0,2}` và `{8,10}`; tâm mới là trung bình từng cụm.

**Vì sao các phương án còn lại sai?**

- **A:** Đây là hai cực trị, không phải trung bình của các điểm được gán.
- **B:** Đây là các điểm gần giữa, không phải trung bình cụm.
- **C:** 5 là trung bình chung; K-Means cập nhật riêng mỗi cụm.

**Ghi nhớ:** K-Means luân phiên gán về tâm gần nhất và lấy trung bình theo cụm.

---

### Câu 157 — PCA: chọn số thành phần

PCA trên train cho tỷ lệ phương sai lần lượt `0.50,0.25,0.15,0.10`. Muốn giữ ít nhất 85% phương sai với ít thành phần nhất, chọn bao nhiêu?

A. 3
B. 1
C. 2
D. 4

**Đáp án: A.** Hai thành phần chỉ đạt 75%; ba thành phần đạt 90%, vượt ngưỡng 85%.

**Vì sao các phương án còn lại sai?**

- **B:** Chỉ giữ 50%.
- **C:** Tổng 50%+25%=75%, chưa đạt yêu cầu.
- **D:** Đạt 100% nhưng không tối thiểu.

**Ghi nhớ:** Chọn k bằng tổng tích lũy, rồi kiểm tra thêm chất lượng tác vụ sau giảm chiều.

---

### Câu 158 — t-SNE/UMAP: diễn giải hình vẽ

Hai lần chạy t-SNE với seed khác nhau tạo các đảo cụm xoay và dịch vị trí. Kết luận nào hợp lý nhất?

A. Đảo nằm bên phải luôn có nhãn lớn hơn
B. Không gán ý nghĩa cho hướng trục; kiểm tra cấu trúc lân cận và độ ổn định
C. Cụm cách xa gấp đôi chắc chắn khác nhau gấp đôi
D. Chọn seed tạo các đảo đẹp nhất để báo accuracy

**Đáp án: B.** Phép nhúng phục vụ khám phá, vị trí tuyệt đối và khoảng cách xa không tự chứng minh quan hệ ngữ nghĩa.

**Vì sao các phương án còn lại sai?**

- **A:** Trục t-SNE không mang thứ tự nhãn cố định.
- **C:** Khoảng cách xa trong hình không phải thước đo định lượng đáng tin như vậy.
- **D:** Hình vẽ không phải phép đánh giá phân loại độc lập.

**Ghi nhớ:** Dùng t-SNE/UMAP để đặt giả thuyết, rồi kiểm chứng trong không gian và tác vụ gốc.

---

### Câu 159 — DBSCAN: nhiễu và mật độ

DBSCAN đánh dấu phần lớn điểm là noise sau khi đã chọn thang đo phù hợp. Muốn nới điều kiện gom cụm, thử nào hợp lý?

A. Giảm eps và tăng min_samples
B. Tăng số cụm k trong DBSCAN
C. Tăng eps hoặc giảm min_samples rồi kiểm tra lại cấu trúc
D. Coi mọi noise là một cụm chắc chắn có cùng ý nghĩa

**Đáp án: C.** Hai thay đổi này làm điều kiện mật độ dễ đạt hơn; vẫn phải tránh nối nhầm cụm.

**Vì sao các phương án còn lại sai?**

- **A:** Cả hai làm điều kiện mật độ chặt hơn, có thể tăng noise.
- **B:** DBSCAN không nhận k làm tham số số cụm.
- **D:** Nhãn noise gom những điểm không đạt điều kiện, không khẳng định chúng tương tự nhau.

**Ghi nhớ:** DBSCAN phụ thuộc đồng thời thang đo, eps và min_samples.

---

### Câu 160 — Hierarchical Clustering: cắt dendrogram

Một dendrogram agglomerative cho thấy bốn nhóm chỉ hợp nhất với nhau ở khoảng cách rất lớn, còn các hợp nhất trong từng nhóm có khoảng cách nhỏ. Cách chọn bốn cụm phù hợp nhất?

A. Lấy bốn dòng đầu trong bảng dữ liệu
B. Chỉ định k=4 cho t-SNE
C. Luôn cắt tại khoảng cách 0 bất kể dữ liệu
D. Cắt cây ở ngưỡng giữa các hợp nhất trong nhóm và giữa nhóm

**Đáp án: D.** Giữ nguyên bốn nhánh trước các bước hợp nhất xa tạo bốn cụm.

**Vì sao các phương án còn lại sai?**

- **A:** Thứ tự dòng không mô tả phân cấp khoảng cách.
- **B:** t-SNE không phải thuật toán phân cụm bằng k.
- **C:** Có thể giữ gần như từng điểm riêng, không dựa vào cấu trúc cây.

**Ghi nhớ:** Dendrogram thể hiện quá trình hợp nhất, ngưỡng cắt quyết định mức độ chi tiết.

---

### Câu 161 — Spectral Clustering: cụm phi lồi

Tập điểm có hai vòng tròn đồng tâm, đã biết cần hai cụm và dữ liệu không quá lớn. Phương pháp nào đáng thử hơn K-Means trực tiếp trên tọa độ?

A. Spectral Clustering với đồ thị lân cận phù hợp
B. Linear Regression dự đoán tọa độ x
C. K-Means nhưng bắt buộc tâm nằm ngoài dữ liệu
D. PCA một chiều rồi mặc định tách được hai vòng

**Đáp án: A.** Đồ thị có thể nắm kết nối dọc từng vòng, thay vì chỉ khoảng cách tới một tâm.

**Vì sao các phương án còn lại sai?**

- **B:** Đây là hồi quy, không giải bài toán phân cụm theo cấu trúc hai vòng.
- **C:** Không xử lý đúng sự phi lồi, cũng không phải cập nhật K-Means chuẩn.
- **D:** Chiếu tuyến tính có thể chồng lấp hai vòng, không có bảo đảm.

**Ghi nhớ:** Chọn thuật toán theo hình dạng cụm và kiểm tra tham số xây dựng đồ thị.

---

### Câu 162 — Confusion matrix: tính F1

Bộ phát hiện có TP=30, FP=10, FN=20, TN=140. F1 của lớp dương là bao nhiêu?

A. 0,85
B. 0,667 xấp xỉ
C. 0,75
D. 0,60

**Đáp án: B.** F1=`2TP/(2TP+FP+FN)`=60/90=2/3.

**Vì sao các phương án còn lại sai?**

- **A:** Đây là accuracy `(TP+TN)/200`.
- **C:** Đây là precision `30/(30+10)`.
- **D:** Đây là recall `30/(30+20)`.

**Ghi nhớ:** F1 kết hợp precision và recall, không dùng TN trong công thức nhị phân của lớp dương.

---

### Câu 163 — ROC: chọn trục và đầu vào

Muốn vẽ ROC cho Logistic Regression nhị phân đã huấn luyện. Cần đưa dữ liệu nào vào hàm tính ROC?

A. Chỉ nhãn dự đoán cứng 0/1 để có toàn bộ đường chi tiết
B. Loss train từng epoch mà không có nhãn đánh giá
C. Nhãn thật và score/xác suất của lớp dương trên tập đánh giá
D. Tên lớp đã sắp xếp theo bảng chữ cái

**Đáp án: C.** Quét ngưỡng score tạo các cặp FPR và TPR.

**Vì sao các phương án còn lại sai?**

- **A:** Nhãn cứng chỉ cho rất ít mức ngưỡng, làm mất thông tin xếp hạng.
- **B:** Đó là đường học, không phải ROC.
- **D:** Tên lớp không cung cấp score theo từng mẫu.

**Ghi nhớ:** ROC dùng FPR trên trục ngang, TPR trên trục dọc và score liên tục khi có.

---

### Câu 164 — Cross-validation: dữ liệu theo người

Mỗi người có 20 bản ghi cảm biến. Mục tiêu dự đoán cho người hoàn toàn mới. Cách chia nào phù hợp nhất?

A. Random split từng bản ghi
B. Chia theo số thứ tự cột
C. Đưa person_id vào nhãn thay cho đích cần dự đoán
D. GroupKFold theo person_id, giữ người tách biệt giữa train và validation

**Đáp án: D.** Đánh giá mức khái quát sang người chưa thấy, tránh ghi nhớ đặc điểm cá nhân.

**Vì sao các phương án còn lại sai?**

- **A:** Một người có thể xuất hiện ở cả hai phía, làm đánh giá lạc quan.
- **B:** Cột là đặc trưng, không phải đơn vị cần chia train/validation.
- **C:** Thay đổi bài toán, không đánh giá mục tiêu ban đầu.

**Ghi nhớ:** Đơn vị độc lập khi chia dữ liệu phải phù hợp đối tượng sẽ gặp khi triển khai.

---

### Câu 165 — Sliding window: số mẫu có nhãn tương lai

Chuỗi dài 10 bước; dùng 3 bước liên tiếp dự đoán bước ngay sau đó, stride=1, không padding. Có bao nhiêu cặp input-target hợp lệ?

A. 7
B. 8
C. 3
D. 10

**Đáp án: A.** Input đầu là bước 1–3 dự đoán 4; input cuối 7–9 dự đoán 10, tổng 10−3=7.

**Vì sao các phương án còn lại sai?**

- **B:** Đây là số cửa sổ độ dài 3, nhưng cửa sổ cuối 8–10 không còn target tương lai.
- **C:** Nhầm độ dài cửa sổ với số mẫu sinh ra.
- **D:** Không phải mọi mốc đều có đủ lịch sử và target.

**Ghi nhớ:** Đếm cả điều kiện đủ lịch sử và tồn tại nhãn ở chân trời dự báo.

---

### Câu 166 — Imputation: ngoại lệ làm lệch trung bình

Đặc trưng thu nhập trên train có vài ngoại lệ rất lớn, 10% giá trị thiếu. Muốn baseline imputation ít nhạy với ngoại lệ, nên chọn gì?

A. Trung bình tính trên cả train và test
B. Median của train, có thể kèm cờ missing và đánh giá bằng validation
C. Điền mọi giá trị thiếu bằng mức thu nhập lớn nhất
D. Xóa toàn bộ cột mà không đánh giá

**Đáp án: B.** Median ít bị kéo bởi các giá trị cực lớn; cờ missing có thể giữ tín hiệu về thiếu dữ liệu.

**Vì sao các phương án còn lại sai?**

- **A:** Vừa nhạy ngoại lệ vừa dùng thông tin của test.
- **C:** Gán một cực trị không có căn cứ cho tất cả mẫu thiếu.
- **D:** Có thể bỏ mất một đặc trưng hữu ích; không phải lựa chọn baseline có kiểm chứng.

**Ghi nhớ:** Chọn cách impute theo phân phối và chỉ học thống kê trên train.

---

### Câu 167 — One-hot: hạng mục mới

Train có màu đỏ/xanh, test có màu vàng chưa thấy. Trong Pipeline scikit-learn cần one-hot và muốn tránh lỗi khi suy luận. Cấu hình nào phù hợp?

A. Fit encoder riêng trên test
B. Gán vàng bằng nhãn mục tiêu của mẫu test
C. OneHotEncoder(handle_unknown='ignore') fit trên train
D. Sắp màu theo alphabet rồi dùng mã số như khoảng cách có nghĩa

**Đáp án: C.** Hạng mục chưa thấy được biểu diễn bằng các giá trị 0 trong nhóm cột đó, không làm thay đổi không gian đặc trưng.

**Vì sao các phương án còn lại sai?**

- **A:** Số lượng và ý nghĩa cột có thể khác train.
- **B:** Dùng nhãn không sẵn có trong suy luận và gây rò rỉ.
- **D:** Tạo thứ tự và khoảng cách giả cho biến danh nghĩa.

**Ghi nhớ:** Hạng mục chưa thấy cần một chính sách suy luận nhất quán với encoder đã fit.

---

### Câu 168 — Padding: mean pooling theo độ dài thật

Embedding scalar của một chuỗi có hai token thật `[2,4]`, sau padding thành `[2,4,0,0]`. Mean pooling loại padding phải cho giá trị nào?

A. 1,5
B. 6
C. 4
D. 3

**Đáp án: D.** Tổng token thật là 6, chia cho 2 token thật được 3.

**Vì sao các phương án còn lại sai?**

- **A:** Chia cả bốn vị trí đã tính padding vào mẫu số.
- **B:** Chỉ lấy tổng, chưa chuẩn hóa theo độ dài thật.
- **C:** Đây là max pooling trên hai token thật.

**Ghi nhớ:** Mask phải áp dụng cho cả tổng và số lượng phần tử khi mean pooling chuỗi không đều.

---

## B. Mạng nơ-ron & Học sâu

### Câu 169 — Perceptron: giới hạn của một lớp

Dữ liệu XOR nhị phân: `[0,0]` và `[1,1]` thuộc lớp 0; hai điểm còn lại thuộc lớp 1. Perceptron tuyến tính đơn không fit được dù tối ưu lâu. Cách sửa kiến trúc phù hợp?

A. Thêm lớp ẩn với activation phi tuyến
B. Tăng số epoch của cùng perceptron
C. Chồng nhiều lớp Linear nhưng bỏ mọi activation
D. Chỉ thay batch size từ 4 thành 2

**Đáp án: A.** XOR không phân tách tuyến tính; lớp ẩn phi tuyến có thể tạo biểu diễn phân tách được.

**Vì sao các phương án còn lại sai?**

- **B:** Không thay đổi tập hàm tuyến tính mà mô hình biểu diễn được.
- **C:** Hợp thành các phép affine vẫn là affine.
- **D:** Thay động lực tối ưu nhưng không vượt giới hạn biểu diễn.

**Ghi nhớ:** Phân biệt lỗi tối ưu với giới hạn của họ mô hình.

---

### Câu 170 — Gradient descent: một bước cập nhật

Tại w=2, gradient của loss theo w là 3. Dùng SGD không momentum, không weight decay, learning rate=0,1. w mới là bao nhiêu?

A. 2,3
B. 1,7
C. 0,3
D. 1,4

**Đáp án: B.** Cập nhật giảm loss cục bộ theo `w_new=w−lr*gradient=2−0,3`.

**Vì sao các phương án còn lại sai?**

- **A:** Đây là đi cùng chiều gradient thay vì ngược chiều.
- **C:** Đây là độ lớn bước thay đổi, không phải trọng số mới.
- **D:** Đã nhân thêm w vào gradient dù đề đã cho gradient đầy đủ.

**Ghi nhớ:** Gradient là đạo hàm của loss; optimizer dùng nó để tính bước cập nhật.

---

### Câu 171 — Backpropagation: gradient qua ReLU

Một neuron có z=w*x+b=−2, đầu ra ReLU(z), loss khả vi theo đầu ra. Bỏ qua các nhánh khác, gradient truyền qua ReLU tới z là gì?

A. 1
B. −2
C. 0
D. Luôn bằng gradient ở đầu ra

**Đáp án: C.** Với z âm, ReLU hằng bằng 0 nên đạo hàm theo z bằng 0.

**Vì sao các phương án còn lại sai?**

- **A:** Đây là đạo hàm ReLU ở miền z dương.
- **B:** Giá trị đầu vào không bằng đạo hàm của activation.
- **D:** Chỉ đúng nếu đạo hàm cục bộ bằng 1; ở đây bằng 0.

**Ghi nhớ:** Backprop nhân gradient phía sau với đạo hàm cục bộ của từng phép toán.

---

### Câu 172 — Sigmoid/Tanh: activation bão hòa

MLP nhiều lớp dùng sigmoid với pre-activation thường có độ lớn rất cao. Gradient ở các lớp đầu gần 0. Giải thích phù hợp nhất?

A. Sigmoid luôn có đạo hàm bằng 1
B. Tanh không bao giờ bão hòa
C. Tăng độ lớn trọng số ban đầu luôn giải quyết được
D. Sigmoid bão hòa làm đạo hàm nhỏ; tích nhiều đạo hàm nhỏ làm gradient suy giảm

**Đáp án: D.** Đây là một cơ chế vanishing gradient; cần xem lại scaling, khởi tạo và activation.

**Vì sao các phương án còn lại sai?**

- **A:** Đạo hàm là `s*(1−s)`, tối đa 0,25.
- **B:** Tanh cũng có đạo hàm gần 0 khi đầu vào có độ lớn lớn.
- **C:** Thường đẩy activation sâu hơn vào vùng bão hòa.

**Ghi nhớ:** Activation, thang đo đầu vào và khởi tạo cùng ảnh hưởng đường truyền gradient.

---

### Câu 173 — MSE/MAE: tác động của ngoại lệ

Sai số dự đoán của hai mẫu là 1 và 10. Dùng mean reduction. Cặp (MSE, MAE) nào đúng?

A. (50,5; 5,5)
B. (5,5; 50,5)
C. (101; 11)
D. (25,25; 2,75)

**Đáp án: A.** MSE=(1²+10²)/2=50,5; MAE=(1+10)/2=5,5.

**Vì sao các phương án còn lại sai?**

- **B:** Đảo vai trò bình phương và trị tuyệt đối.
- **C:** Đó là tổng, chưa chia số mẫu.
- **D:** Đã chia hai lần thay vì lấy trung bình một lần.

**Ghi nhớ:** MSE phạt sai số lớn mạnh hơn MAE do bình phương.

---

### Câu 174 — Cross-entropy: logits và target

Phân loại đơn nhãn 5 lớp, logits có shape `(16,5)`. Dùng CrossEntropyLoss PyTorch với target chỉ số lớp. Đầu vào nào đúng?

A. Softmax logits rồi target float shape (16,)
B. Logits thô và target long shape (16,) với giá trị 0–4
C. Argmax logits rồi target long
D. Logits shape (5,16) và target shape (16,)

**Đáp án: B.** Loss thực hiện chuẩn hóa nội bộ; mỗi mẫu có một chỉ số lớp.

**Vì sao các phương án còn lại sai?**

- **A:** Vừa chuẩn hóa không cần thiết vừa sai dtype cho target chỉ số.
- **C:** Argmax mất score và không tạo gradient hữu ích qua quyết định rời rạc.
- **D:** Với batch 16, trục class phải là 5 ở chiều thứ hai trong trường hợp này.

**Ghi nhớ:** Kiểm tra shape, dtype và ngữ nghĩa target trước khi chọn loss.

---

### Câu 175 — MLP: đếm tham số

MLP gồm Linear(10,4), ReLU, Linear(4,3); cả hai Linear có bias. Tổng số tham số học được là bao nhiêu?

A. 52
B. 56
C. 59
D. 63

**Đáp án: C.** Lớp đầu 10*4+4=44, lớp sau 4*3+3=15; ReLU không có tham số.

**Vì sao các phương án còn lại sai?**

- **A:** Chỉ đếm trọng số, bỏ 7 bias.
- **B:** Đếm bias lớp đầu nhưng bỏ 3 bias đầu ra.
- **D:** Đã cộng thêm tham số không tồn tại cho ReLU.

**Ghi nhớ:** Linear có số tham số `in_features*out_features + out_features` khi có bias.

---

### Câu 176 — Embedding: tra bảng và cập nhật

Embedding(1000,32) nhận token IDs shape `(8,12)`. Shape đầu ra và số tham số của bảng là gì?

A. Đầu ra (8,1000), bảng có 12.000 tham số
B. Đầu ra (8,32), bảng có 32 tham số
C. Đầu ra (1000,32), bảng có 96 tham số
D. Đầu ra (8,12,32), bảng có 32.000 tham số

**Đáp án: D.** Mỗi trong 96 vị trí token nhận vector 32 chiều; bảng có một vector cho mỗi mục từ.

**Vì sao các phương án còn lại sai?**

- **A:** Nhầm chiều vocab với số token và dùng độ dài chuỗi để đếm bảng.
- **B:** Chưa có pooling; mỗi token vẫn giữ một embedding riêng.
- **C:** Nhầm bảng tham số với đầu ra của batch.

**Ghi nhớ:** Embedding thêm chiều đặc trưng vào shape token ID, không tự gộp chuỗi.

---

### Câu 177 — Pooling: giữ tín hiệu mạnh nhất

Một feature map 2x2 có giá trị `[[1,7],[3,5]]`. Max pooling và average pooling với kernel 2, stride 2 lần lượt cho gì?

A. 7 và 4
B. 5 và 4
C. 7 và 16
D. 16 và 7

**Đáp án: A.** Max là 7; trung bình `(1+7+3+5)/4=4`.

**Vì sao các phương án còn lại sai?**

- **B:** 5 là phần tử cuối, không phải cực đại.
- **C:** 16 là tổng, chưa chia số phần tử.
- **D:** Đổi pooling thành phép tổng và đảo vai trò.

**Ghi nhớ:** Pooling giảm độ phân giải nhưng không có cùng cách giữ thông tin.

---

### Câu 178 — Attention: tổ hợp có trọng số

Một query có attention weights `[0.25,0.75]` trên hai value `[2,0]` và `[0,4]`. Output là gì?

A. `[2,4]`
B. `[0.5,3]`
C. `[1,2]`
D. `[0.75,0.25]`

**Đáp án: B.** Cộng `0,25*[2,0]+0,75*[0,4]` theo từng chiều.

**Vì sao các phương án còn lại sai?**

- **A:** Cộng value mà bỏ các trọng số.
- **C:** Đây là trung bình đều, không dùng weights đã cho.
- **D:** Đây không phải vector value tổng hợp; còn đảo thứ tự trọng số.

**Ghi nhớ:** Attention weights quyết định tỷ lệ đóng góp của value, không phải chính đầu ra.

---

### Câu 179 — Transformer: vì sao cần vị trí

Một Transformer encoder xử lý câu nhưng không có positional information. Khó khăn chính khi nhiệm vụ phụ thuộc thứ tự từ là gì?

A. Không thể nhân ma trận Q và K
B. Mỗi token tự biết vị trí nhờ ID từ vựng
C. Self-attention thuần không tự mã hóa thứ tự chuỗi, nên cần thông tin vị trí
D. Softmax tự sắp xếp các từ theo ngữ pháp

**Đáp án: C.** Quan hệ theo nội dung không đủ phân biệt các hoán vị theo đúng thứ tự cần cho ngôn ngữ.

**Vì sao các phương án còn lại sai?**

- **A:** Các phép toán vẫn hợp lệ dù không thêm vị trí.
- **B:** Một từ có cùng ID ở nhiều vị trí.
- **D:** Softmax chỉ chuẩn hóa score, không suy ra thứ tự ngữ pháp cố định.

**Ghi nhớ:** Nội dung và vị trí là hai nguồn thông tin khác nhau trong Transformer.

---

### Câu 180 — Mini-batch: số bước optimizer

Train có 1.000 mẫu, batch_size=128, không bỏ batch cuối (`drop_last=False`). Mỗi batch cập nhật một lần. Một epoch có bao nhiêu bước?

A. 7
B. 128
C. 1.000
D. 8

**Đáp án: D.** Có 7 batch đủ 128 mẫu và một batch 104 mẫu, tổng ceil(1000/128)=8.

**Vì sao các phương án còn lại sai?**

- **A:** Chỉ đúng nếu bỏ batch cuối thiếu 128 mẫu.
- **B:** Đây là kích thước batch, không phải số batch.
- **C:** Chỉ đúng nếu mỗi mẫu là một batch riêng.

**Ghi nhớ:** Phân biệt số mẫu, batch size, số bước cập nhật và số epoch.

---

### Câu 181 — Autoencoder: denoising

Muốn autoencoder khôi phục ảnh sạch từ ảnh nhiễu tổng hợp. Cặp input-target trong train nên là gì?

A. Input ảnh thêm nhiễu, target ảnh sạch tương ứng
B. Input ảnh sạch, target nhãn tên lớp
C. Input ảnh nhiễu, target một ảnh sạch ngẫu nhiên khác
D. Input và target cùng ảnh nhiễu, không ràng buộc gì khác

**Đáp án: A.** Mục tiêu buộc mạng học phục hồi tín hiệu thay vì sao chép nhiễu.

**Vì sao các phương án còn lại sai?**

- **B:** Đây là phân loại, không phải tái tạo ảnh.
- **C:** Mất cặp tương ứng nên không dạy đúng phép khử nhiễu.
- **D:** Không trực tiếp đặt mục tiêu khôi phục ảnh sạch.

**Ghi nhớ:** Target của autoencoder phải phản ánh loại tái tạo bạn muốn học.

---

### Câu 182 — AdamW: weight decay tách biệt

Bạn dùng AdamW để fine-tune, muốn hiểu weight_decay. Mô tả nào đúng nhất?

A. Weight decay là xác suất tắt neuron
B. AdamW áp dụng co trọng số tách khỏi phép chuẩn hóa gradient thích nghi
C. AdamW bảo đảm validation tăng ở mọi bước
D. AdamW không dùng thông tin gradient quá khứ

**Đáp án: B.** Đây là đặc điểm của decoupled weight decay, khác với cộng phạt L2 vào gradient rồi cho qua cơ chế Adam.

**Vì sao các phương án còn lại sai?**

- **A:** Đó là dropout, không phải weight decay.
- **C:** Không optimizer nào có bảo đảm như vậy cho mọi dữ liệu.
- **D:** AdamW vẫn dùng các ước lượng moment của gradient.

**Ghi nhớ:** Tách vai trò optimizer, learning rate và regularization khi chẩn đoán huấn luyện.

---

### Câu 183 — Learning rate: loss phân kỳ

Sau khi tăng learning rate gấp 100, loss train nhảy lớn và thành NaN; dữ liệu và code trước đó chạy ổn. Thử nghiệm đầu tiên có căn cứ nhất?

A. Tăng tiếp learning rate thêm 100 lần
B. Tăng dropout lên 0,99 trước mọi kiểm tra
C. Khôi phục learning rate thấp hơn và kiểm tra gradient/loss hữu hạn
D. Đổi nhãn validation để loss nhỏ hơn

**Đáp án: C.** Thay đổi mới có khả năng tạo bước cập nhật quá lớn; cần xác minh bằng chạy kiểm soát.

**Vì sao các phương án còn lại sai?**

- **A:** Có thể làm bất ổn nặng hơn.
- **B:** Không trực tiếp sửa bước cập nhật và có thể làm mô hình gần như không học.
- **D:** Làm sai mục tiêu đánh giá, không sửa train.

**Ghi nhớ:** Khi có thay đổi gây lỗi, thử nghiệm một biến và quan sát cả loss lẫn gradient.

---

### Câu 184 — Dropout: kỳ vọng đầu ra

Trong train, PyTorch Dropout(p=0.5) nhận giá trị 6. Nếu phần tử được giữ lại, giá trị đầu ra là bao nhiêu?

A. 6
B. 3
C. 0 trong mọi trường hợp
D. 12

**Đáp án: D.** Inverted dropout nhân phần tử giữ lại với `1/(1−p)=2` để giữ kỳ vọng bằng 6.

**Vì sao các phương án còn lại sai?**

- **A:** Đây là hành vi ở eval; train cần scaling khi giữ lại.
- **B:** Đã nhân với xác suất giữ thay vì chia.
- **C:** 0 chỉ khi phần tử bị loại trong lần lấy mẫu đó.

**Ghi nhớ:** PyTorch Dropout là ngẫu nhiên lúc train và phép đồng nhất khi eval.

---

### Câu 185 — Early stopping: chọn checkpoint

Validation loss các epoch 1–5 lần lượt `0.60,0.45,0.40,0.44,0.48`; train loss giảm liên tục. Theo tiêu chí minimum validation loss, nên dùng checkpoint nào?

A. Epoch 3
B. Epoch 5 vì train loss thấp nhất
C. Epoch 1 vì luôn phải chọn mô hình đơn giản nhất
D. Trung bình nhãn của năm epoch

**Đáp án: A.** Validation loss thấp nhất là 0,40 ở epoch 3; lưu/khôi phục trọng số tương ứng.

**Vì sao các phương án còn lại sai?**

- **B:** Mục tiêu chọn checkpoint là chất lượng validation, không phải chỉ fit train.
- **C:** Không dựa trên tiêu chí đã cho.
- **D:** Nhãn không phải checkpoint và không giải quyết lựa chọn mô hình.

**Ghi nhớ:** Early stopping cần lưu checkpoint tốt nhất, không chỉ dừng tại một epoch muộn.

---

### Câu 186 — Khởi tạo: phá đối xứng

Một lớp ẩn MLP có nhiều neuron, toàn bộ weight và bias đều khởi tạo bằng 0. Vấn đề quan trọng là gì?

A. Mọi phép nhân ma trận đều sai shape
B. Các neuron có thể nhận cùng gradient và học giống nhau, không phá được đối xứng
C. Khởi tạo 0 luôn tạo NaN ngay lập tức
D. Khởi tạo toàn 1000 luôn tốt hơn

**Đáp án: B.** Khởi tạo ngẫu nhiên phù hợp giúp các neuron phát triển biểu diễn khác nhau.

**Vì sao các phương án còn lại sai?**

- **A:** Giá trị 0 không quyết định shape.
- **C:** Không đúng nói chung; vấn đề chính ở đây là đối xứng và luồng gradient.
- **D:** Trọng số quá lớn có thể gây bão hòa hoặc bất ổn.

**Ghi nhớ:** Khởi tạo phải xét activation và độ rộng lớp, đồng thời tránh đối xứng không mong muốn.

---

### Câu 187 — BatchNorm: đánh giá đúng chế độ

Model có BatchNorm và Dropout. Validation đang gọi `torch.no_grad()` nhưng quên `model.eval()`. Điều gì cần sửa?

A. Chỉ giảm batch_size xuống 1
B. Chỉ đặt requires_grad=False cho target
C. Gọi eval trước validation và train lại trước giai đoạn train
D. Gọi zero_grad trên validation sau mỗi batch

**Đáp án: C.** no_grad chỉ tắt ghi đồ thị; eval mới đổi Dropout và BatchNorm sang hành vi đánh giá.

**Vì sao các phương án còn lại sai?**

- **A:** Không đổi chế độ, còn có thể làm thống kê batch kém ổn định.
- **B:** Target thường đã không cần gradient; không đổi hành vi model.
- **D:** Không tắt dropout và không chuyển BatchNorm sang running statistics.

**Ghi nhớ:** Chế độ module và chế độ autograd là hai điều khiển độc lập.

---

### Câu 188 — Fine-tuning: ít nhãn và ít bộ nhớ

Có encoder tiền huấn luyện lớn, 600 mẫu có nhãn và VRAM hạn chế. Baseline nào hợp lý trước khi cân nhắc full fine-tuning?

A. Luôn huấn luyện mọi trọng số từ ngẫu nhiên
B. PEFT nghĩa là chắc chắn không cần forward qua encoder
C. Đánh giá head trên đúng tập đã fit để quyết định
D. Đóng băng encoder, train head nhỏ; sau đó thử PEFT nếu cần

**Đáp án: D.** Giảm số tham số cần cập nhật và nguy cơ overfit; quyết định tiếp bằng validation.

**Vì sao các phương án còn lại sai?**

- **A:** Bỏ kiến thức tiền huấn luyện và tăng nhu cầu dữ liệu/tài nguyên.
- **B:** Vẫn phải dùng mạng gốc để tạo biểu diễn; PEFT chỉ giảm tham số được học.
- **C:** Không đo được khả năng khái quát.

**Ghi nhớ:** Đóng băng, fine-tuning một phần, PEFT và full fine-tuning là các mức can thiệp khác nhau.

---

## C. Thị giác máy tính

### Câu 189 — Convolution: kích thước đầu ra

Conv2d nhận ảnh 32x32, kernel=3, stride=2, padding=1, dilation=1. Kích thước không gian đầu ra là bao nhiêu?

A. 16x16
B. 15x15
C. 17x17
D. 32x32

**Đáp án: A.** Mỗi chiều là floor((32+2−3)/2)+1=16.

**Vì sao các phương án còn lại sai?**

- **B:** Kết quả này bỏ padding trong công thức.
- **C:** Đã làm tròn sai phép chia hoặc cộng dư một vị trí.
- **D:** Stride 2 giảm độ phân giải, dù padding=1.

**Ghi nhớ:** Tính từng chiều bằng công thức có kernel, stride, padding và dilation.

---

### Câu 190 — Convolution: số tham số

Conv2d từ 3 kênh sang 16 kênh, kernel 3x3, groups=1, có bias. Tổng số tham số là gì?

A. 432
B. 448
C. 160
D. 448 nhân với chiều rộng và chiều cao ảnh

**Đáp án: B.** Mỗi filter có 3*3*3=27 weight và một bias; 16*(27+1)=448.

**Vì sao các phương án còn lại sai?**

- **A:** Bỏ qua 16 bias.
- **C:** Quên nhân số kênh đầu vào khi đếm kernel.
- **D:** Weight được chia sẻ giữa các vị trí; số tham số không nhân diện tích ảnh.

**Ghi nhớ:** Số vị trí áp dụng convolution quyết định chi phí tính, không nhân số weight được học.

---

### Câu 191 — Image classification: đối tượng hay toàn ảnh

Ứng dụng chỉ cần trả một trong năm loại hoa cho mỗi ảnh đã crop một bông, không cần tọa độ. Thiết kế đầu ra phù hợp nhất?

A. U-Net xuất nhãn cho từng pixel dù không có mask
B. Detector bắt buộc dự đoán 100 hộp mỗi ảnh
C. Classifier năm logits cho mỗi ảnh, train với nhãn loại hoa
D. Hồi quy một số thực rồi coi khoảng cách tên loài là có nghĩa

**Đáp án: C.** Bài toán là phân loại đơn nhãn toàn ảnh.

**Vì sao các phương án còn lại sai?**

- **A:** Không cần phân đoạn và dữ liệu không cung cấp target pixel.
- **B:** Tạo thêm tác vụ định vị không được yêu cầu.
- **D:** Mã loài không có khoảng cách số tự nhiên; cần phân loại.

**Ghi nhớ:** Chọn đầu ra theo thông tin sản phẩm cần, không chỉ theo độ lớn mô hình.

---

### Câu 192 — IoU: tính giao trên hợp

Hai bounding box có diện tích 100 và 80, giao nhau diện tích 40. IoU bằng bao nhiêu?

A. 0,5
B. 0,4
C. 2/9 xấp xỉ 0,222
D. 2/7 xấp xỉ 0,286

**Đáp án: D.** Hợp=100+80−40=140; IoU=40/140.

**Vì sao các phương án còn lại sai?**

- **A:** Đây là giao chia diện tích hộp thứ hai, không phải hợp.
- **B:** Đây là giao chia diện tích hộp thứ nhất.
- **C:** Đã cộng hai diện tích mà không trừ vùng giao.

**Ghi nhớ:** IoU chuẩn hóa phần giao bằng phần hợp để đo độ trùng khớp hình học.

---

### Câu 193 — YOLO/SSD: ràng buộc triển khai

Nhóm cần phát hiện nhiều vật trên video và có giới hạn 30 ms/frame trên thiết bị cụ thể. Cách chọn giữa các checkpoint YOLO/SSD phù hợp nhất?

A. Benchmark cả độ chính xác và latency end-to-end trên thiết bị đích
B. Chọn mọi YOLO vì tên gọi bảo đảm dưới 30 ms
C. Chỉ so sánh số epoch tiền huấn luyện
D. Đo FPS nhưng bỏ bước resize, chuyển dữ liệu và hậu xử lý khỏi ngân sách tổng

**Đáp án: A.** Tốc độ phụ thuộc checkpoint, input, runtime và phần cứng; cần đo theo yêu cầu thực tế.

**Vì sao các phương án còn lại sai?**

- **B:** Tên họ mô hình không bảo đảm latency trên mọi cấu hình.
- **C:** Không đo tốc độ hay chất lượng trên miền ứng dụng.
- **D:** Không phản ánh latency end-to-end đã yêu cầu.

**Ghi nhớ:** Lựa chọn detector cần cả metric định vị/phân loại và phép đo triển khai.

---

### Câu 194 — DETR: dự đoán theo tập

DETR gốc xuất nhiều object query. Mô tả nào đúng về cách học tránh các dự đoán trùng cho cùng đối tượng?

A. Mỗi query bắt buộc khớp với mọi đối tượng cùng lúc
B. Dùng matching một-một giữa dự đoán và ground truth trong huấn luyện
C. Mọi query đều phải là một vật thật
D. DETR chỉ trả một nhãn cho toàn ảnh

**Đáp án: B.** Set prediction và matching là phần cốt lõi để học một dự đoán cho mỗi đối tượng; query dư học no-object.

**Vì sao các phương án còn lại sai?**

- **A:** Matching một-một không gán tất cả đối tượng cho một query.
- **C:** Số query thường lớn hơn số vật, có nhãn no-object.
- **D:** DETR là detector có nhãn và bounding box cho nhiều đối tượng.

**Ghi nhớ:** Phân biệt tập dự đoán object với phân loại toàn ảnh.

---

### Câu 195 — U-Net: skip connection

Trong U-Net, decoder upsample có kích thước không gian khớp encoder. Tại sao nối đặc trưng encoder cùng độ phân giải vào decoder?

A. Để xóa toàn bộ thông tin không gian
B. Để không cần mask nhãn trong mọi cách train có giám sát
C. Kết hợp chi tiết định vị từ encoder với ngữ cảnh của decoder
D. Để đầu ra chỉ còn một vector nhãn toàn ảnh

**Đáp án: C.** Downsampling làm mất chi tiết; skip giúp phân đoạn ranh giới chính xác hơn.

**Vì sao các phương án còn lại sai?**

- **A:** Ngược mục đích giữ chi tiết của skip.
- **B:** Skip là thiết kế mạng, không thay thế nhãn giám sát.
- **D:** U-Net thường dự đoán dày đặc theo pixel.

**Ghi nhớ:** Skip trong U-Net phục vụ kết hợp thông tin ở các thang độ phân giải.

---

### Câu 196 — Segmentation: accuracy nền cao

Ảnh có 99% pixel nền. Model luôn đoán nền được accuracy 99% nhưng bỏ hết tổn thương. Nên bổ sung đánh giá nào?

A. Chỉ accuracy toàn ảnh rồi kết luận tốt
B. Số tham số model thay cho metric
C. Loss của riêng pixel nền
D. Dice/IoU và recall của vùng tổn thương

**Đáp án: D.** Các độ đo tập trung vùng đích làm lộ việc model bỏ sót toàn bộ foreground.

**Vì sao các phương án còn lại sai?**

- **A:** Tiếp tục bị nền chi phối.
- **B:** Kích thước mạng không đo chất lượng phân đoạn.
- **C:** Không cho biết khả năng phát hiện vùng tổn thương.

**Ghi nhớ:** Metric cho phân đoạn mất cân bằng phải phản ánh lớp foreground quan trọng.

---

### Câu 197 — ResNet: dùng encoder tiền huấn luyện

Muốn dùng ResNet tiền huấn luyện làm feature extractor cho 10 lớp ảnh mới. Bước nào phù hợp?

A. Thay head phân loại, dùng preprocessing đúng checkpoint và train head trên train
B. Giữ head 1000 lớp và gán nhãn mới tùy ý vào 10 vị trí
C. Chuẩn hóa ảnh test bằng mean riêng từng lớp thật
D. Luôn đổi thứ tự RGB thành BGR bất kể checkpoint

**Đáp án: A.** Head cũ thuộc tập nhãn cũ; preprocessing nhất quán giúp dùng biểu diễn đã học.

**Vì sao các phương án còn lại sai?**

- **B:** Không học ánh xạ phù hợp tác vụ mới.
- **C:** Khi suy luận không biết nhãn lớp thật để làm bước này.
- **D:** Tiền xử lý phải theo yêu cầu của trọng số cụ thể.

**Ghi nhớ:** Checkpoint bao gồm giả định về đầu vào và nhãn; transfer cần điều chỉnh đúng phần.

---

### Câu 198 — Augmentation: segmentation đồng bộ

Train U-Net, bạn lật ngang ảnh nhưng giữ nguyên mask. Hậu quả và cách sửa phù hợp?

A. Không có ảnh hưởng vì U-Net tự căn chỉnh mọi mask
B. Ảnh và mask lệch nhãn; áp dụng cùng phép lật hình học cho cả hai
C. Chỉ tăng số epoch
D. Lật mask theo một hướng ngẫu nhiên độc lập

**Đáp án: B.** Mỗi pixel ảnh phải tương ứng đúng pixel nhãn sau biến đổi.

**Vì sao các phương án còn lại sai?**

- **A:** Mạng không tự sửa cặp giám sát bị sai tùy ý.
- **C:** Huấn luyện lâu hơn trên nhãn lệch không khắc phục pipeline.
- **D:** Vẫn có thể làm ảnh và mask không tương ứng.

**Ghi nhớ:** Augmentation hình học của ảnh phải đồng bộ với box, mask hoặc keypoint.

---

### Câu 199 — Patch ảnh: số token

Ảnh RGB 224x224 chia thành patch không chồng lấp 16x16; thêm một token CLS. Encoder nhận bao nhiêu token ảnh kể cả CLS?

A. 196
B. 589
C. 197
D. 225

**Đáp án: C.** Có `(224/16)²=196` patch và một CLS; RGB nằm trong vector của mỗi patch.

**Vì sao các phương án còn lại sai?**

- **A:** Bỏ token CLS đã nêu.
- **B:** Đã đếm ba kênh thành ba token riêng cho mỗi patch rồi cộng CLS.
- **D:** Nhầm kích thước ảnh với số patch theo cả hai chiều.

**Ghi nhớ:** Đếm patch theo lưới không gian; số kênh ảnh ảnh hưởng độ dài vector patch.

---

### Câu 200 — GAN: mode collapse

GAN sinh ra ảnh khá sắc nét nhưng gần như tất cả đều cùng một kiểu khuôn mặt dù noise khác nhau. Vấn đề phù hợp nhất?

A. Overfitting của classifier nhãn test chắc chắn
B. Mọi ảnh sắc nét đều chứng minh GAN đã học đủ phân phối
C. Noise đầu vào khác nhau bảo đảm đầu ra đa dạng
D. Mode collapse; cần đánh giá đa dạng cùng chất lượng và điều chỉnh train

**Đáp án: D.** Generator bỏ qua nhiều mode của phân phối, nên đẹp mắt chưa đồng nghĩa bao phủ dữ liệu.

**Vì sao các phương án còn lại sai?**

- **A:** Không có bằng chứng về classifier hay nhãn test trong tình huống.
- **B:** Độ sắc nét không đo được tính đa dạng.
- **C:** Generator có thể học gần như bỏ qua noise.

**Ghi nhớ:** Đánh giá mô hình sinh cần cả chất lượng, đa dạng và dấu hiệu ghi nhớ dữ liệu.

---

### Câu 201 — Diffusion: train và sampling

Với diffusion dự đoán noise, một bước train thông thường gồm thao tác nào?

A. Lấy ảnh sạch, chọn timestep, thêm noise theo lịch rồi dự đoán noise đã thêm
B. Chỉ phân loại ảnh thành thật/giả bằng discriminator
C. Xóa timestep vì mọi mức noise hoàn toàn giống nhau
D. Lấy noise bất kỳ làm target không liên quan ảnh nhiễu

**Đáp án: A.** Tạo cặp giám sát từ ảnh và noise; khi sampling dùng quá trình khử nhiễu nhiều bước.

**Vì sao các phương án còn lại sai?**

- **B:** Đây là thành phần thường gặp của GAN, không phải mục tiêu noise prediction đã nêu.
- **C:** Timestep cho biết mức nhiễu cần xử lý.
- **D:** Làm sai quan hệ giữa input và target.

**Ghi nhớ:** Timestep và lịch noise xác định bài toán khử nhiễu mà mạng được học.

---

### Câu 202 — Self-supervised vision: cặp tăng cường

Trong một baseline contrastive, hai ảnh crop/đổi màu từ cùng ảnh gốc được dùng làm cặp positive. Mục tiêu trực tiếp là gì?

A. Buộc mọi ảnh trong dataset có cùng embedding
B. Học embedding gần nhau cho hai view giữ cùng nội dung liên quan
C. Dự đoán chính xác nhãn lớp thủ công dù train không cung cấp nhãn
D. Chứng minh mọi augmentation đều giữ nguyên ngữ nghĩa

**Đáp án: B.** Tạo giám sát từ dữ liệu không nhãn để học biểu diễn hữu ích cho tác vụ sau.

**Vì sao các phương án còn lại sai?**

- **A:** Làm mất khả năng phân biệt và gây collapse biểu diễn.
- **C:** Mục tiêu tiền huấn luyện không yêu cầu nhãn lớp thủ công.
- **D:** Chọn augmentation vẫn cần phù hợp miền và tác vụ.

**Ghi nhớ:** Giám sát tự sinh phải khuyến khích bất biến hữu ích và tránh phá tín hiệu quan trọng.

---

### Câu 203 — CLIP: zero-shot classification

Có CLIP và 4 lớp ảnh mới, chưa có nhãn train. Cách tạo baseline zero-shot đúng?

A. So trực tiếp token ID của tên lớp với pixel RGB
B. Dùng text encoder riêng mà không nhìn ảnh
C. Mã hóa mô tả của bốn lớp và ảnh, so độ tương đồng trong không gian chung
D. Mặc định similarity cao nhất là xác suất đã được hiệu chuẩn

**Đáp án: C.** Nhãn dự đoán lấy từ mô tả phù hợp nhất với embedding ảnh.

**Vì sao các phương án còn lại sai?**

- **A:** Hai kiểu số không nằm trong cùng không gian ngữ nghĩa.
- **B:** Không có thông tin về ảnh cần phân loại.
- **D:** Similarity và softmax không tự bảo đảm hiệu chuẩn trên miền mới.

**Ghi nhớ:** Prompt mô tả lớp là một phần của baseline CLIP và cần đánh giá trên miền đích.

---

### Câu 204 — Dữ liệu ảnh: chia trước augmentation

Có 500 ảnh gốc, mỗi ảnh sinh 10 biến thể gần giống. Cách chia train/test nào tránh rò rỉ nhất?

A. Trộn 5.000 biến thể rồi random split từng ảnh
B. Đưa ảnh gốc vào train và toàn bộ biến thể vào test
C. Chọn test bằng các ảnh model dự đoán đúng nhất
D. Chia theo ảnh gốc trước, chỉ augment phần train

**Đáp án: D.** Mọi biến thể của một ảnh nằm cùng phía, test đo ảnh gốc chưa thấy.

**Vì sao các phương án còn lại sai?**

- **A:** Các bản gần trùng có thể nằm cả train và test.
- **B:** Test vẫn có cùng nội dung nguồn đã thấy.
- **C:** Làm sai mục tiêu đánh giá độc lập.

**Ghi nhớ:** Ảnh gốc, người, phiên chụp hoặc video có thể là đơn vị nhóm cần giữ tách biệt.

---

## D. Xử lý ngôn ngữ tự nhiên & Âm thanh

### Câu 205 — Tokenization: dùng đúng tokenizer

Bạn fine-tune một BERT checkpoint có tokenizer riêng. Thay tokenizer bằng bộ tách từ tự tạo rồi dùng ID mới cho embedding cũ gây rủi ro gì?

A. ID mới có thể trỏ sai ý nghĩa trong bảng embedding đã học
B. Không có rủi ro vì mọi ID chỉ là số bất kỳ dùng hoán đổi được
C. Tokenizer mới luôn làm model nhanh và chính xác hơn
D. Chỉ thay tên biến tokenizer là đủ sửa ánh xạ

**Đáp án: A.** Checkpoint gắn với ánh xạ token-ID; cần tokenizer tương thích hoặc cập nhật bảng embedding có chủ đích.

**Vì sao các phương án còn lại sai?**

- **B:** ID là chỉ mục vào các vector có ý nghĩa đã học, không đổi tùy ý được.
- **C:** Phải đánh giá; không có bảo đảm chung.
- **D:** Tên biến không thay quan hệ giữa token, ID và embedding.

**Ghi nhớ:** Tokenizer là một phần của mô hình tiền huấn luyện, không chỉ là bước tách chuỗi.

---

### Câu 206 — BERT: phân loại câu

Muốn phân loại cảm xúc đơn nhãn bằng BERT. Thiết kế nào phù hợp?

A. Sinh token liên tiếp bằng argmax trực tiếp trên mọi hidden state BERT gốc
B. Tokenize đúng checkpoint, dùng biểu diễn câu với head phân loại và fine-tune trên train
C. Dùng token ID lớn nhất trong câu làm nhãn
D. Không dùng attention mask dù batch có padding dài

**Đáp án: B.** Encoder tạo biểu diễn theo ngữ cảnh; head ánh xạ sang nhãn cảm xúc.

**Vì sao các phương án còn lại sai?**

- **A:** BERT encoder không tự trở thành decoder sinh tự hồi quy bằng cách đó.
- **C:** ID từ vựng không mã hóa nhãn cảm xúc.
- **D:** Padding có thể ảnh hưởng biểu diễn nếu không được loại theo quy ước của model.

**Ghi nhớ:** Chọn head, mask và loss khớp với bài toán phân loại.

---

### Câu 207 — Masked language modeling: ngữ cảnh hai phía

Câu chứa `Hôm nay trời [MASK] nên tôi mang ô`. Đặc điểm nào khiến BERT phù hợp dự đoán vị trí MASK?

A. BERT chỉ được nhìn token đầu tiên của câu
B. MASK phải luôn là nhãn cảm xúc
C. Encoder hai chiều có thể dùng cả ngữ cảnh trước và sau MASK
D. BERT bắt buộc bỏ toàn bộ dấu tiếng Việt

**Đáp án: C.** Pretraining masked token khuyến khích biểu diễn dựa trên hai phía ngữ cảnh.

**Vì sao các phương án còn lại sai?**

- **A:** Không đúng cơ chế encoder hai chiều.
- **B:** MASK là vị trí token bị che, không phải nhãn tác vụ mặc định.
- **D:** Yêu cầu này không đúng chung; tiền xử lý theo tokenizer/checkpoint.

**Ghi nhớ:** Masked LM và causal LM dùng các điều kiện ngữ cảnh khác nhau.

---

### Câu 208 — Causal LM: căn chỉnh nhãn

Với chuỗi token `[A,B,C,D]`, bạn tự triển khai next-token loss, không dùng model tự shift labels. Cặp input-target đúng là gì?

A. Input [A,B,C], target [A,B,C] và bỏ mask
B. Input [B,C,D], target [A,B,C]
C. Input [A], target [A,B,C,D] mà không có decoder theo chuỗi
D. Input [A,B,C], target [B,C,D] với causal mask

**Đáp án: D.** Mỗi vị trí dự đoán token kế tiếp chỉ từ tiền tố có sẵn.

**Vì sao các phương án còn lại sai?**

- **A:** Khuyến khích sao chép token đang thấy thay vì dự đoán token sau.
- **B:** Đây là hướng ngược yêu cầu next-token.
- **C:** Không tạo căn chỉnh từng vị trí như quy trình đã yêu cầu.

**Ghi nhớ:** Kiểm tra thư viện có shift labels nội bộ để tránh shift hai lần.

---

### Câu 209 — Language modeling: perplexity

Hai LM dùng cùng tokenizer và cùng tập đánh giá; mean token NLL theo log tự nhiên lần lượt là 1 và 2. Kết luận nào đúng?

A. Perplexity lần lượt là e và e²; mô hình thứ nhất tốt hơn theo NLL
B. Perplexity lần lượt là 1 và 2
C. Perplexity lớn hơn luôn tốt hơn
D. Có thể so trực tiếp mọi perplexity dù tokenizer khác nhau

**Đáp án: A.** Perplexity=exp(mean NLL), nhỏ hơn là tốt hơn với điều kiện đánh giá tương đương.

**Vì sao các phương án còn lại sai?**

- **B:** Đây là NLL, chưa lấy hàm mũ.
- **C:** Thể hiện mô hình gán xác suất thấp hơn cho token thật, nên không đúng.
- **D:** Đơn vị token thay đổi làm phép so sánh trực tiếp dễ sai.

**Ghi nhớ:** So perplexity phải giữ nhất quán dữ liệu, tokenizer và cách bỏ padding.

---

### Câu 210 — Text classification: nhiều nhãn độc lập

Một bài báo có thể đồng thời thuộc Công nghệ và Giáo dục. Có 6 nhãn, không loại trừ nhau. Head và loss phù hợp?

A. Softmax 6 lớp với đúng một chỉ số target
B. 6 logits, sigmoid theo từng nhãn và BCEWithLogitsLoss khi train
C. Argmax embedding chiều lớn nhất làm nhãn
D. Chỉ hồi quy số lượng nhãn đúng

**Đáp án: B.** Mỗi nhãn là một quyết định nhị phân; loss nhận logits để tính ổn định.

**Vì sao các phương án còn lại sai?**

- **A:** Ép các nhãn cạnh tranh tổng bằng 1, không mô hình hóa nhiều nhãn độc lập.
- **C:** Chiều embedding không tự tương ứng nhãn.
- **D:** Không xác định nhãn cụ thể nào xuất hiện.

**Ghi nhớ:** Phân biệt multi-class đơn nhãn và multi-label trước khi chọn loss.

---

### Câu 211 — Encoder-decoder: dịch máy

Trong mô hình dịch Transformer encoder-decoder, decoder cần thông tin nào khi dự đoán từ đích tiếp theo?

A. Toàn bộ câu đích thật kể cả tương lai khi suy luận
B. Chỉ độ dài câu nguồn, bỏ nội dung
C. Tiền tố câu đích và biểu diễn câu nguồn từ encoder
D. Nhãn cảm xúc của câu nguồn thay cho encoder state

**Đáp án: C.** Self-attention causal xử lý tiền tố đích, cross-attention truy cập nguồn.

**Vì sao các phương án còn lại sai?**

- **A:** Khi suy luận chưa có các token tương lai.
- **B:** Không đủ để xác định bản dịch.
- **D:** Đây không phải biểu diễn đủ cho dịch tổng quát.

**Ghi nhớ:** Encoder-decoder nối hai chuỗi có vai trò và độ dài có thể khác nhau.

---

### Câu 212 — Vision-language: nối encoder ảnh và decoder

Muốn sinh caption ảnh bằng encoder ảnh tiền huấn luyện và decoder ngôn ngữ. Cần gì ngoài hai checkpoint riêng rẽ?

A. Chỉ đổi đuôi file ảnh sang .txt
B. Ghép hai model bất kỳ là chắc chắn caption đúng ngay
C. Bỏ ảnh, chỉ cấp token bắt đầu câu
D. Cơ chế nối biểu diễn và huấn luyện trên cặp ảnh-caption phù hợp

**Đáp án: D.** Kích thước và ngữ nghĩa đặc trưng phải được căn chỉnh để decoder dùng được thông tin ảnh.

**Vì sao các phương án còn lại sai?**

- **A:** Không mã hóa ảnh thành biểu diễn có nghĩa cho decoder.
- **B:** Không bảo đảm giao diện và không gian biểu diễn tương thích.
- **C:** Decoder có thể sinh câu nhưng không có căn cứ nội dung ảnh.

**Ghi nhớ:** Tính đa phương thức cần một cơ chế căn chỉnh giữa các nguồn biểu diễn.

---

### Câu 213 — LM qua API: so sánh có kiểm soát

So sánh hai mô hình qua API cho phân loại văn bản. Quy trình nào đáng tin cậy nhất?

A. Dùng cùng tập giữ riêng, cùng rubric, lưu phiên bản/prompt/cấu hình và đo cả chất lượng lẫn latency
B. Mỗi model nhận một tập test khác độ khó
C. Chỉnh prompt liên tục bằng test rồi báo điểm cuối là đánh giá độc lập
D. Chỉ xem một câu trả lời nghe tự tin

**Đáp án: A.** Các điều kiện nhất quán giúp phân biệt khác biệt model với khác biệt cách gọi.

**Vì sao các phương án còn lại sai?**

- **B:** Không cô lập được tác động của model.
- **C:** Test đã trở thành dữ liệu phát triển.
- **D:** Độ tự tin ngôn ngữ không thay thế đánh giá trên tập đại diện.

**Ghi nhớ:** Đánh giá mô hình tiền huấn luyện cần tái lập điều kiện và giữ tập test độc lập.

---

### Câu 214 — Sinh văn bản: kiểm soát ngẫu nhiên

Đang lấy mẫu token từ softmax(logits/temperature), logits không đồng hạng. Khi giảm temperature dương về gần 0, điều gì thường xảy ra?

A. Phân phối tiến tới đồng đều
B. Phân phối tập trung hơn vào token logit cao nhất
C. Model chắc chắn hết mọi lỗi kiến thức
D. Số tham số model giảm

**Đáp án: B.** Chia cho số dương nhỏ tăng chênh lệch logits trước softmax.

**Vì sao các phương án còn lại sai?**

- **A:** Điều này thường xảy ra khi temperature tăng rất lớn.
- **C:** Thay cách lấy mẫu không bảo đảm tính đúng sự thật.
- **D:** Temperature không thay kiến trúc hay số tham số.

**Ghi nhớ:** Điều khiển độ ngẫu nhiên khác với cải thiện độ đúng của kiến thức.

---

### Câu 215 — Âm thanh: resample đúng nghĩa

Checkpoint audio yêu cầu 16 kHz; file thực tế 48 kHz. Xử lý nào đúng?

A. Chỉ đổi metadata từ 48000 thành 16000
B. Giữ mọi mẫu và nhân biên độ với 3
C. Resample waveform từ 48 xuống 16 kHz trước processor
D. Đổi nhãn của file thành 16

**Đáp án: C.** Cần đổi số mẫu theo thời gian thực, đồng thời khai báo đúng sampling rate.

**Vì sao các phương án còn lại sai?**

- **A:** Làm sai thời lượng/tần số diễn giải, không thực hiện resampling.
- **B:** Thay âm lượng, không đổi tần số lấy mẫu.
- **D:** Nhãn tác vụ không xử lý waveform.

**Ghi nhớ:** Sampling rate là số mẫu mỗi giây, không phải một tên định dạng có thể đổi tùy ý.

---

### Câu 216 — HuBERT: học biểu diễn không transcript

Có nhiều giờ lời nói chưa chép và ít dữ liệu có nhãn. Đặc điểm nào của HuBERT phù hợp để tận dụng dữ liệu chưa chép?

A. HuBERT bắt buộc có transcript chuẩn cho mọi giờ pretraining
B. HuBERT chỉ nhận văn bản đầu vào
C. Không có transcript thì không thể học bất kỳ đặc trưng nào
D. Học dự đoán các hidden unit từ clustering ở vùng bị mask

**Đáp án: D.** Tạo mục tiêu tự giám sát từ âm thanh, rồi có thể thích nghi cho tác vụ có nhãn.

**Vì sao các phương án còn lại sai?**

- **A:** Mục tiêu hidden unit không yêu cầu transcript như vậy.
- **B:** Đây là mô hình biểu diễn âm thanh lời nói.
- **C:** Self-supervised learning chính là một cách học từ dữ liệu không nhãn thủ công.

**Ghi nhớ:** Phân biệt mục tiêu tiền huấn luyện tự giám sát với tác vụ downstream có nhãn.

---

### Câu 217 — Whisper: ASR thay vì phân loại âm thanh

Cần chép lời tiếng Việt từ file họp. Baseline nào phù hợp nhất về đầu ra?

A. Checkpoint Whisper đa ngôn ngữ phù hợp, với processor và cấu hình tác vụ chép lời
B. Một classifier chỉ trả nhãn nhạc/tiếng nói
C. K-Means trên thời lượng rồi lấy ID cụm làm câu chữ
D. Whisper luôn trả văn bản đúng tuyệt đối trong mọi môi trường

**Đáp án: A.** ASR ánh xạ audio sang chuỗi từ; cần kiểm tra hỗ trợ ngôn ngữ của checkpoint cụ thể.

**Vì sao các phương án còn lại sai?**

- **B:** Không sinh transcript.
- **C:** Cụm thời lượng không cung cấp chuỗi từ.
- **D:** Tiếng ồn, giọng và miền nội dung có thể gây lỗi.

**Ghi nhớ:** Chọn model theo loại đầu ra và kiểm tra thực nghiệm trên ngôn ngữ/miền đích.

---

### Câu 218 — WER: tính lỗi chép lời

Transcript chuẩn có 20 từ. Dự đoán cần 2 substitution, 1 deletion và 1 insertion để khớp. WER là bao nhiêu?

A. 10%
B. 20%
C. 15%
D. 80%

**Đáp án: B.** WER=(S+D+I)/N=(2+1+1)/20=0,20.

**Vì sao các phương án còn lại sai?**

- **A:** Chỉ tính substitution, bỏ deletion và insertion.
- **C:** Bỏ một loại lỗi trong tổng.
- **D:** Đây là 1−WER trong ví dụ này, không phải WER.

**Ghi nhớ:** WER dùng số từ của transcript chuẩn làm mẫu số, có thể vượt 100% nếu nhiều insertion.

---

### Câu 219 — Qwen-Audio/Voxtral: hiểu nội dung âm thanh

Cần hỏi bằng văn bản về nội dung một đoạn audio, trả lời bằng văn bản. Cách chọn hệ thống phù hợp?

A. Chọn mọi model có chữ Audio vì bảo đảm mọi ngôn ngữ và tác vụ
B. Đưa đường dẫn file vào một text-only model không có công cụ đọc audio
C. Thử checkpoint audio-language hỗ trợ audio+text như Qwen-Audio hoặc Voxtral phù hợp và đánh giá tác vụ
D. Chỉ đo dung lượng file audio

**Đáp án: C.** Cần năng lực nhận audio và hiểu câu hỏi, không chỉ một nhãn âm thanh; khả năng cụ thể tùy checkpoint.

**Vì sao các phương án còn lại sai?**

- **A:** Tên họ không bảo đảm toàn bộ năng lực.
- **B:** Model không nhận được nội dung waveform từ đường dẫn đơn thuần.
- **D:** Không thể trả lời về nội dung bằng kích thước file.

**Ghi nhớ:** Kiểm tra input, output và tác vụ được hỗ trợ ở đúng model card.

---

### Câu 220 — Audio classification: chia theo người nói

Huấn luyện phân loại cảm xúc lời nói; mỗi người đọc nhiều câu. Muốn dùng cho người nói mới. Quy trình nào phù hợp?

A. Random split các đoạn ngắn từ cùng bản ghi vào mọi tập
B. Nối mọi audio rồi gán một nhãn cảm xúc cho toàn bộ
C. Chỉ đánh giá trên người đã xuất hiện trong train rồi khẳng định cho người mới
D. Tách người nói giữa train/validation/test và pooling embedding có mask độ dài

**Đáp án: D.** Vừa đo khái quát sang người mới vừa tránh padding làm sai biểu diễn chuỗi.

**Vì sao các phương án còn lại sai?**

- **A:** Có thể rò rỉ giọng và nền âm thanh.
- **B:** Mất nhãn và ranh giới từng mẫu.
- **C:** Không đo đúng tình huống triển khai.

**Ghi nhớ:** Thiết kế chia tập và xử lý độ dài quan trọng không kém lựa chọn audio encoder.

---

# III. ĐÁP ÁN NHANH

141: A | 142: B | 143: C | 144: D | 145: A | 146: B | 147: C | 148: D | 149: A | 150: B | 151: C | 152: D | 153: A | 154: B | 155: C | 156: D | 157: A | 158: B | 159: C | 160: D | 161: A | 162: B | 163: C | 164: D | 165: A | 166: B | 167: C | 168: D | 169: A | 170: B | 171: C | 172: D | 173: A | 174: B | 175: C | 176: D | 177: A | 178: B | 179: C | 180: D | 181: A | 182: B | 183: C | 184: D | 185: A | 186: B | 187: C | 188: D | 189: A | 190: B | 191: C | 192: D | 193: A | 194: B | 195: C | 196: D | 197: A | 198: B | 199: C | 200: D | 201: A | 202: B | 203: C | 204: D | 205: A | 206: B | 207: C | 208: D | 209: A | 210: B | 211: C | 212: D | 213: A | 214: B | 215: C | 216: D | 217: A | 218: B | 219: C | 220: D
