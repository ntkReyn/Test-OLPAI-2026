# NGÂN HÀNG KHÓ · OLYMPIC AI UET 2026

# I. PHẠM VI VÀ CÁCH SỬ DỤNG

80 câu tự biên soạn để luyện tập phần 3.1–3.4 của đề cương UET do người học cung cấp. Không phải đề thi chính thức. Mức độ là phân loại sư phạm trong ứng dụng, khác nhãn Lý thuyết/Thực hành/Cả hai của syllabus.

Mức khó: kết hợp nhiều điều kiện, tính toán nhiều bước, phát hiện lỗi pipeline và chọn giải pháp theo ràng buộc. Không yêu cầu toán nâng cao ngoài đề cương.

Mỗi câu có một đáp án tốt nhất theo giả định đã nêu, giải thích cả bốn lựa chọn và ghi nhớ. Thuật ngữ tiếng Anh được giữ khi cần. Mã ngắn giả sử đã import thư viện được nêu. Xem `PHAM_VI_VA_NGUON.md` để đối chiếu từng nhóm kiến thức và nguồn chính thức.

# II. CÂU HỎI

## A. Kỹ năng nền tảng & Học máy cổ điển

### Câu 221 — Python: trạng thái ẩn giữa các lần gọi

Hàm tạo đặc trưng có mã: `def collect(x, buf=[]): buf.append(x); return len(buf)`. Chạy `collect(1)`, `collect(2)`, rồi `collect(3, [])`. Bộ kết quả và cách sửa tránh chia sẻ ngoài ý muốn là gì?

A. (1,2,1); dùng mặc định None và tạo list mới trong hàm
B. (1,1,1); đổi mặc định thành tuple rỗng nhưng giữ nguyên append
C. (1,2,3); dùng mặc định None nhưng không khởi tạo list khi nhận None
D. (1,2,1); sao chép buf sau khi append, ngay trước return

**Đáp án: A.** Default list được tạo một lần, dùng chung ở hai lần gọi đầu; list truyền riêng ở lần ba độc lập.

**Vì sao các phương án còn lại sai?**

- **B:** Hai lần gọi đầu dùng chung default list nên lần hai trả 2. Tuple rỗng tránh default mutable nhưng không hỗ trợ append, nên cách sửa được đề xuất sẽ gây lỗi.
- **C:** List truyền riêng ở lần ba bắt đầu rỗng nên trả 1. Đổi default thành None còn cần nhánh tạo list mới khi nhận None; nếu không thì append trên None gây lỗi.
- **D:** Bộ kết quả đúng nhưng sao chép sau append là quá muộn: list mặc định đã bị sửa tại append. Muốn tạo trạng thái mới cho mỗi lần gọi mà vẫn tôn trọng list được truyền vào, dùng None rồi chỉ khởi tạo khi cần.

**Ghi nhớ:** Tránh trạng thái mặc định mutable khi mỗi mẫu cần xử lý độc lập.

---

### Câu 222 — NumPy: view và bản sao khi chọn đặc trưng

`a=np.arange(6); b=a[1:4]; c=a[[1,2,3]]; b[0]=99; c[1]=77`. Giá trị cuối của a là gì?

A. `[0,99,77,3,4,5]`
B. `[0,99,2,3,4,5]`
C. `[0,1,2,3,4,5]`
D. `[0,77,2,3,4,5]`

**Đáp án: B.** Basic slice b là view nên sửa a[1]; advanced indexing c tạo copy nên c[1] không sửa a[2].

**Vì sao các phương án còn lại sai?**

- **A:** Nhầm advanced indexing cũng luôn trả view.
- **C:** Bỏ qua tác động của basic slice view.
- **D:** c[1] không trỏ a[1] và c là bản sao.

**Ghi nhớ:** Khi sửa mảng trung gian, xác định thao tác tạo view hay copy trước khi suy luận tác động.

---

### Câu 223 — Broadcasting: loss sai mà vẫn chạy

Model hồi quy xuất pred shape `(4,1)` nhưng target shape `(4,)`. Đoạn `(pred-target)**2` chạy được. Tại sao đây có thể là lỗi nghiêm trọng?

A. Kết quả chắc chắn shape (4,1), không có lỗi
B. NumPy/PyTorch luôn từ chối mọi phép trừ khác shape
C. Broadcast tạo ma trận (4,4), so mọi dự đoán với mọi nhãn; cần căn target thành (4,1)
D. Chỉ cần chia loss cho 4 lần nữa

**Đáp án: C.** Trục cuối 1 của pred và 4 của target được mở rộng; không còn bốn cặp tương ứng.

**Vì sao các phương án còn lại sai?**

- **A:** Quy tắc căn chiều từ phải cho ra (4,4).
- **B:** Broadcasting cho phép phép toán này dù sai ý nghĩa.
- **D:** Đổi hệ số không sửa việc ghép nhầm cặp mẫu.

**Ghi nhớ:** Phép toán chạy thành công không chứng minh shape đúng ngữ nghĩa bài toán.

---

### Câu 224 — pandas: nhãn tương lai bị nhân dòng

Train dự đoán churn mỗi khách tại ngày 1/6. Bảng giao dịch có lịch sử đến 1/7; nhãn ghi churn trong tháng 6. Cách tạo dữ liệu đáng tin cậy nhất?

A. Tổng tiền cả tháng 6 rồi dự đoán churn cùng tháng
B. Merge tất cả giao dịch rồi random split từng dòng
C. Xóa cột ngày sau merge để mô hình không thấy thời gian
D. Lọc giao dịch trước mốc dự đoán, tổng hợp theo khách, rồi merge nhãn với kiểm tra khóa

**Đáp án: D.** Đặc trưng chỉ dùng quá khứ; một hàng mỗi khách và kiểm tra cardinality tránh nhân mẫu.

**Vì sao các phương án còn lại sai?**

- **A:** Dùng hành vi xảy ra sau mốc dự đoán làm đặc trưng.
- **B:** Vừa có tương lai vừa có cùng khách ở nhiều tập.
- **C:** Thông tin tương lai đã nằm trong giá trị đặc trưng dù bỏ cột ngày.

**Ghi nhớ:** Chống leakage phải theo thời điểm thông tin sẵn có, không chỉ theo tên cột.

---

### Câu 225 — Trực quan hóa: learning curve theo dữ liệu

Train/validation dùng cùng metric error. Khi tăng mẫu từ 1.000 lên 10.000, train error và validation error đều hội tụ quanh 30%, khoảng cách nhỏ. Model tuyến tính đã tối ưu ổn. Hướng ưu tiên nào có căn cứ nhất?

A. Thử đặc trưng hoặc mô hình giàu biểu diễn hơn và đánh giá lại
B. Chỉ tăng regularization rất mạnh
C. Khẳng định thêm đúng 100 mẫu sẽ đưa error về 0
D. Chọn lại test đến khi error thấp

**Đáp án: A.** Hai lỗi cao, gần nhau và không cải thiện theo mẫu gợi ý high bias/underfitting.

**Vì sao các phương án còn lại sai?**

- **B:** Thường giảm khả năng fit, không phù hợp dấu hiệu bias cao.
- **C:** Không có căn cứ từ đường học đã quan sát.
- **D:** Thay đổi đánh giá không sửa mô hình và gây chọn lọc kết quả.

**Ghi nhớ:** Đọc cả mức lỗi, khoảng cách và xu hướng theo lượng dữ liệu để chọn can thiệp.

---

### Câu 226 — Cross-validation: selection bias nhiều cấu hình

Nhóm thử 500 cấu hình, chọn theo cùng một CV rồi báo điểm CV cao nhất là hiệu năng cuối. Muốn ước lượng khách quan hơn khi chưa có test riêng, nên làm gì?

A. Lặp lại đúng điểm CV cao nhất trong báo cáo nhiều lần
B. Nested CV: tuning ở vòng trong, đánh giá cấu hình được chọn ở fold ngoài
C. Tuning trực tiếp trên fold ngoài rồi báo điểm đó
D. Chọn cấu hình có tên ngắn nhất thay mọi đánh giá

**Đáp án: B.** Fold ngoài không tham gia chọn cấu hình nên phản ánh cả quy trình lựa chọn.

**Vì sao các phương án còn lại sai?**

- **A:** Không giảm thiên lệch do chọn cực đại trong nhiều thử nghiệm.
- **C:** Vòng ngoài lại bị dùng cho lựa chọn, mất vai trò độc lập.
- **D:** Không dựa vào chất lượng dự đoán.

**Ghi nhớ:** Đánh giá cần bao gồm sự không chắc chắn do quá trình chọn mô hình.

---

### Câu 227 — Chia chuỗi thời gian: cửa sổ chồng lấp

Mỗi mẫu dùng 24 giờ cảm biến dự đoán 6 giờ sau. Các cửa sổ được tạo stride 1 rồi random split. Validation rất cao. Thiết kế nào phù hợp hơn cho dự báo tương lai?

A. Chỉ tăng random seed nhưng giữ random split
B. Fit scaler toàn chuỗi để train và test cùng chuẩn
C. Chia theo thời gian, train ở quá khứ, loại các mẫu có khoảng input/target giao vùng cấm ở ranh giới
D. Xóa timestamp rồi random split lại

**Đáp án: C.** Cửa sổ chồng lấp và nhãn tương lai có thể làm hai tập chia sẻ thông tin; cần gap phù hợp chân trời và thiết kế cửa sổ.

**Vì sao các phương án còn lại sai?**

- **A:** Không loại quan hệ thời gian và sự chồng lấp.
- **B:** Thống kê tương lai tiếp tục ảnh hưởng train.
- **D:** Quan hệ thời gian vẫn còn trong nội dung các cửa sổ.

**Ghi nhớ:** Kiểm tra khoảng thời gian thực của cả input lẫn target khi chia dữ liệu cửa sổ.

---

### Câu 228 — Precision/recall: macro F1 khác accuracy

Hai lớp có số mẫu 90 và 10. Model luôn dự đoán lớp lớn. Với F1 lớp không được dự đoán quy ước là 0, accuracy và macro-F1 xấp xỉ là gì?

A. 90% và 0,90
B. 50% và 0,50
C. 100% và 1
D. 90% và 0,474

**Đáp án: D.** F1 lớp lớn=180/(180+10)=18/19; F1 lớp nhỏ=0; trung bình hai lớp là 9/19.

**Vì sao các phương án còn lại sai?**

- **A:** Macro-F1 không đồng nhất accuracy; nó cho hai lớp trọng số bằng nhau.
- **B:** Accuracy vẫn đếm đúng 90 trên 100 mẫu, không cân bằng theo lớp.
- **C:** Mười mẫu lớp nhỏ đều bị dự đoán sai.

**Ghi nhớ:** Metric trung bình theo mẫu và trung bình theo lớp trả lời các câu hỏi khác nhau.

---

### Câu 229 — Ngưỡng: tối ưu theo chi phí lỗi

Trên validation: t=0,3 cho FN=5, FP=40; t=0,5 cho FN=12, FP=15; t=0,7 cho FN=20, FP=5. Mỗi FN tốn 10 đơn vị, FP tốn 1. Chọn ngưỡng nào trong ba ứng viên và đánh giá tiếp ra sao?

A. Chọn 0,3 vì chi phí 90; khóa ngưỡng rồi đo trên test riêng
B. Chọn 0,7 vì ít FP nhất
C. Chọn 0,5 vì luôn là ngưỡng tối ưu cho mọi ứng dụng
D. Đo ba ngưỡng trên test và chọn thấp nhất rồi báo chính điểm đó

**Đáp án: A.** Chi phí lần lượt 90,135,205. Ngưỡng được chọn bằng validation, không bằng test.

**Vì sao các phương án còn lại sai?**

- **B:** Bỏ chi phí FN lớn hơn; tổng chi phí là 205.
- **C:** Tối ưu phụ thuộc chi phí và phân phối, không mặc định 0,5.
- **D:** Test đã tham gia lựa chọn nên không còn độc lập.

**Ghi nhớ:** Tối ưu quyết định theo chi phí thật và tách bước chọn ngưỡng khỏi đánh giá cuối.

---

### Câu 230 — ROC-AUC: đếm cặp xếp hạng

Hai mẫu dương có score 0,9 và 0,4; hai mẫu âm có score 0,8 và 0,1. Không có tie. ROC-AUC bằng bao nhiêu?

A. 1
B. 0,75
C. 0,5
D. 0,25

**Đáp án: B.** Có bốn cặp dương-âm; score dương thắng ba cặp: 0,9 thắng cả hai, 0,4 chỉ thắng 0,1.

**Vì sao các phương án còn lại sai?**

- **A:** Có một cặp bị xếp sai: dương 0,4 thấp hơn âm 0,8.
- **C:** Không phải hai trong bốn mà là ba trong bốn cặp đúng thứ tự.
- **D:** Đây là tỷ lệ cặp xếp sai, không phải AUC.

**Ghi nhớ:** AUC đánh giá thứ tự score giữa dương và âm, không phụ thuộc một ngưỡng đơn lẻ.

---

### Câu 231 — Linear Regression: ngoại lệ và mục tiêu

Hai mô hình hồi quy có residual: A=`[0,0,0,8]`, B=`[3,3,3,3]`. Nếu nghiệp vụ dùng MAE nhưng nhóm chọn theo MSE, kết quả chọn khác nhau thế nào?

A. Cả hai metric chọn A
B. Cả hai metric chọn B
C. MAE chọn A; MSE chọn B
D. Không tính được vì thiếu nhãn gốc

**Đáp án: C.** A có MAE=2, MSE=16; B có MAE=3, MSE=9. Loss bình phương nhạy hơn với sai số 8.

**Vì sao các phương án còn lại sai?**

- **A:** MSE của A lớn hơn B.
- **B:** MAE của A nhỏ hơn B.
- **D:** Residual đã đủ để tính MAE và MSE.

**Ghi nhớ:** Chọn model bằng metric khớp mục tiêu nghiệp vụ, không mặc định loss nào cũng xếp hạng giống nhau.

---

### Câu 232 — L1/L2: scaling và diễn giải hệ số

Hai đặc trưng có cùng nội dung nhưng x2=1000*x1. Dùng L2 không chuẩn hóa, cùng dự đoán có thể đạt bằng hệ số x2 nhỏ hơn rất nhiều. Kết luận nào đúng?

A. L2 luôn bất biến với mọi thay đổi đơn vị đặc trưng
B. Hệ số x1 lớn hơn chứng minh nó quan trọng hơn về nhân quả
C. Fit scaler riêng trên từng mẫu test sẽ giải quyết đúng
D. L2 phạt theo độ lớn hệ số nên thang đo có thể ảnh hưởng nghiệm; cần scaling trong CV

**Đáp án: D.** Cùng đóng góp dự đoán nhưng hệ số nhỏ hơn chịu phạt ít hơn, làm regularization phụ thuộc đơn vị.

**Vì sao các phương án còn lại sai?**

- **A:** Không đúng nếu không điều chỉnh scaling hoặc mức phạt tương ứng.
- **B:** So hệ số khác đơn vị và suy luận nhân quả đều không có căn cứ.
- **C:** Làm thay đổi hệ tọa độ dự đoán và không dùng thống kê train đã học.

**Ghi nhớ:** So hệ số phải xét đơn vị đo, đồng tuyến và cơ chế regularization.

---

### Câu 233 — K-NN: tính khoảng cách sau scaling

Train có A=(0,100) lớp 0, B=(2,0) lớp 1; query Q=(0,0). Với 1-NN Euclidean, trước scaling chọn lớp nào? Nếu chia tọa độ thứ hai cho 100, chọn lớp nào?

A. Trước lớp 1, sau lớp 0
B. Trước lớp 0, sau lớp 1
C. Cả hai là lớp 1
D. Cả hai là lớp 0

**Đáp án: A.** Ban đầu d(Q,A)=100, d(Q,B)=2; sau đổi thang d(Q,A)=1, d(Q,B)=2.

**Vì sao các phương án còn lại sai?**

- **B:** Đã đảo hai so sánh khoảng cách.
- **C:** Sau scaling điểm A gần hơn Q.
- **D:** Trước scaling điểm B gần hơn Q.

**Ghi nhớ:** Scaling có thể thay láng giềng thực sự, không chỉ thay cách in giá trị.

---

### Câu 234 — Decision Tree: chọn split theo Gini

Node có 4 mẫu lớp 0 và 4 lớp 1. Split S tạo hai con (3,1) và (1,3); split T tạo (4,0) và (0,4). Chỉ xét giảm Gini có trọng số, split nào tốt hơn?

A. S vì mỗi node con vẫn có hai lớp
B. T, giảm Gini 0,5 so với 0,125 của S
C. Hai split luôn ngang nhau vì đều chia 4–4 mẫu
D. T nhưng giảm Gini chỉ 0,125

**Đáp án: B.** Node cha Gini=0,5; S còn 0,375, T còn 0 nên T giảm nhiều hơn.

**Vì sao các phương án còn lại sai?**

- **A:** Cây muốn tăng độ thuần theo tiêu chí đã cho, không muốn duy trì trộn lớp.
- **C:** Số lượng con giống nhau nhưng phân bố lớp khác nhau.
- **D:** Đó là mức giảm của S; T tạo hai node thuần.

**Ghi nhớ:** Chất lượng split phụ thuộc impurity có trọng số, không chỉ kích thước hai nhánh.

---

### Câu 235 — SVM: tìm lỗi trong grid search

Nhóm chạy StandardScaler ngoài CV rồi GridSearchCV cho RBF-SVM; grid tăng C, gamma chỉ cho điểm train tốt hơn, validation giảm. Sửa nào giải quyết cả hai vấn đề chính?

A. Giữ scaler toàn dữ liệu, chỉ tăng gamma thêm
B. Fit scaler trên validation rồi dùng cho train
C. Đưa scaler vào Pipeline trong CV và mở grid sang C/gamma nhỏ hơn
D. Chọn cấu hình theo train accuracy cao nhất

**Đáp án: C.** Loại rò rỉ thống kê giữa fold và kiểm tra các ranh giới ít phức tạp hơn.

**Vì sao các phương án còn lại sai?**

- **A:** Không sửa leakage và có thể làm overfit nặng hơn.
- **B:** Đảo vai trò dữ liệu và vẫn để validation tác động train.
- **D:** Không xử lý khả năng khái quát kém đang quan sát.

**Ghi nhớ:** Chẩn đoán pipeline trước rồi mới diễn giải kết quả tuning của mô hình.

---

### Câu 236 — Random Forest: tương quan sai số

100 cây sâu trong ensemble gần như luôn sai trên đúng cùng các mẫu. Thêm 900 bản sao của cùng các cây có bảo đảm giảm mạnh lỗi không?

A. Có, vì lỗi luôn giảm tuyến tính theo số cây
B. Có, vì 1000 phiếu giống nhau trở thành bằng chứng độc lập
C. Chỉ cần lấy ngẫu nhiên nhãn test cho các cây mới
D. Không; cần đa dạng sai số và xem lại đặc trưng, max_features hoặc cách lấy mẫu

**Đáp án: D.** Voting không sửa được lỗi mà hầu hết cây cùng mắc; thêm bản sao không tạo thông tin mới.

**Vì sao các phương án còn lại sai?**

- **A:** Không có quy luật bảo đảm như vậy.
- **B:** Các dự đoán tương quan không phải 1000 bằng chứng độc lập.
- **C:** Làm sai bài toán và rò rỉ test.

**Ghi nhớ:** Giảm variance bằng ensemble phụ thuộc cả số mô hình và tương quan giữa chúng.

---

### Câu 237 — Gradient Boosting: kiểm soát sức chứa

Boosting 1000 cây sâu có train loss gần 0; validation tốt nhất ở cây 180 rồi xấu dần. Ngân sách thử nghiệm hạn chế. Cách chọn baseline tiếp theo có căn cứ?

A. Giữ checkpoint gần 180 theo validation, thử cây nông hơn hoặc regularization và theo dõi early stopping
B. Bắt buộc dùng cây thứ 1000 vì train loss nhỏ nhất
C. Giảm learning rate nhưng giữ mọi thứ và khẳng định luôn hội tụ cùng chất lượng
D. Chọn số cây bằng test loss sau mỗi vòng

**Đáp án: A.** Dấu hiệu overfit nằm cả số bước cộng và sức chứa cây thành phần.

**Vì sao các phương án còn lại sai?**

- **B:** Bỏ qua xu hướng validation.
- **C:** Learning rate tương tác số cây; phải kiểm chứng, không có bảo đảm chung.
- **D:** Test bị dùng như validation.

**Ghi nhớ:** Trong boosting, learning rate, độ sâu và số cây phải được xét cùng nhau.

---

### Câu 238 — K-Means: inertia và lựa chọn k

Inertia trên cùng dữ liệu giảm khi k từ 2 lên 20. Nhóm kết luận k=20 tối ưu vì inertia nhỏ nhất. Nhận xét nào đúng?

A. Inertia phải tăng khi k tăng nên code chắc chắn sai
B. Inertia thường giảm khi tăng k; cần thêm tiêu chí tách cụm, độ ổn định và ý nghĩa sử dụng
C. Inertia nhỏ nhất chứng minh cụm là nhãn thật
D. Chỉ chọn k bằng số chiều dữ liệu bất kể nội dung

**Đáp án: B.** k gần số điểm có thể cho inertia rất nhỏ nhưng không phải phân nhóm hữu ích.

**Vì sao các phương án còn lại sai?**

- **A:** Chia nhiều cụm cho phép giảm khoảng cách tới tâm.
- **C:** K-Means không dùng nhãn và mục tiêu hình học không chứng minh ý nghĩa lớp.
- **D:** Không có quy tắc chung k phải bằng số chiều.

**Ghi nhớ:** Không so các k chỉ bằng một mục tiêu có lợi tự nhiên cho k lớn.

---

### Câu 239 — PCA: mất tín hiệu ít phương sai

Hai feature đã có đơn vị mang ý nghĩa: x1 phương sai 100 nhưng là nhiễu độc lập nhãn; x2 phương sai 0,01 và dấu của x2 quyết định nhãn. PCA không scaling giữ một thành phần. Điều gì có thể xảy ra?

A. Chắc chắn giữ x2 vì PCA biết nhãn
B. Giữ 99% phương sai luôn bảo đảm 99% accuracy
C. Giữ chủ yếu x1 và mất tín hiệu nhãn; cần đánh giá downstream, cân nhắc scaling hoặc không giảm chiều
D. Fit PCA trên test có nhãn sẽ làm phép đánh giá hợp lệ hơn

**Đáp án: C.** PCA tối đa phương sai đầu vào, không tối đa khả năng phân loại.

**Vì sao các phương án còn lại sai?**

- **A:** PCA không dùng y trong mục tiêu chuẩn.
- **B:** Hai phần trăm đo hai đại lượng khác nhau.
- **D:** Dùng test để chọn biến đổi gây leakage.

**Ghi nhớ:** Phương sai được giữ lại không phải tỷ lệ thông tin dự đoán được giữ lại.

---

### Câu 240 — PCA: chuẩn hóa và tránh leakage

Muốn impute, chuẩn hóa, PCA rồi Logistic Regression; cần tuning số thành phần và C bằng CV. Pipeline nào đúng?

A. PCA fit toàn bộ X trước rồi CV phần còn lại
B. Fit PCA riêng train và test với cùng k
C. Chọn k dựa trên accuracy test rồi CV C
D. Imputer → StandardScaler → PCA → LogisticRegression, toàn bộ trong GridSearchCV

**Đáp án: D.** Mỗi fold học tất cả thống kê chỉ trên train của fold; hai siêu tham số được chọn trong cùng quy trình.

**Vì sao các phương án còn lại sai?**

- **A:** Validation đã ảnh hưởng các trục PCA.
- **B:** Hai hệ trục có thể khác nhau; classifier cần cùng phép chiếu đã học.
- **C:** Test đã tham gia chọn một phần mô hình.

**Ghi nhớ:** Biến đổi không dùng nhãn vẫn có thể gây leakage nếu học từ validation/test.

---

### Câu 241 — t-SNE/UMAP: đánh giá embedding cho mẫu mới

Nhóm vẽ t-SNE trên toàn train+test, dùng tọa độ 2D train fit classifier rồi báo test. Muốn pipeline quy nạp triển khai cho mẫu mới, nên thiết kế lại thế nào?

A. Chọn phép biến đổi có transform cho mẫu mới, fit chỉ trên train; tuning trong validation và so baseline ở không gian gốc
B. Tiếp tục fit t-SNE toàn dữ liệu vì không dùng nhãn nên chắc chắn không leakage
C. Đổi seed t-SNE đến khi test đẹp nhất
D. Dùng ảnh scatterplot làm bằng chứng accuracy duy nhất

**Đáp án: A.** UMAP có transform; phải giữ quy trình đưa mẫu mới vào mà không refit chung test.

**Vì sao các phương án còn lại sai?**

- **B:** Phép nhúng vẫn học từ phân phối test và không mô phỏng pipeline quy nạp đã yêu cầu.
- **C:** Test trở thành tiêu chí tuning.
- **D:** Không đo dự đoán trên mẫu độc lập.

**Ghi nhớ:** Xác định tác vụ quy nạp hay transductive trước khi dùng phương pháp nhúng.

---

### Câu 242 — DBSCAN: cùng eps, mật độ khác nhau

Dữ liệu gồm một cụm rất đặc, một cụm thưa và nhiễu. eps nhỏ làm cụm thưa thành noise; eps lớn nối cụm đặc với nhiễu. Kết luận phù hợp nhất?

A. Cứ tăng eps mãi chắc chắn sẽ có đúng hai cụm sạch
B. Một eps toàn cục có thể không phù hợp mật độ khác nhau; kiểm tra metric/scaling và cân nhắc phương pháp khác trong phạm vi
C. Đặt min_samples bằng số lớp thật bảo đảm đúng
D. Chuyển mọi noise vào cụm đặc là khôi phục nhãn đúng

**Đáp án: B.** Vấn đề là giả định mật độ và biểu diễn; không có eps luôn đúng cho mọi cấu trúc.

**Vì sao các phương án còn lại sai?**

- **A:** eps rất lớn có thể gộp tất cả vào một cụm.
- **C:** min_samples là điều kiện mật độ, không phải số cụm.
- **D:** Không có căn cứ hình học hoặc nhãn cho việc gán như vậy.

**Ghi nhớ:** Chẩn đoán giả định của thuật toán khi tuning đơn tham số không giải quyết được cấu trúc dữ liệu.

---

### Câu 243 — Hierarchical Clustering: single-link chaining

Hai nhóm điểm đặc được nối bằng một chuỗi điểm thưa. Single linkage gộp hai nhóm sớm. Can thiệp nào có căn cứ?

A. Đổi thứ tự hiển thị lá rồi coi như đã đổi cụm
B. Giữ nguyên cây và chỉ đổi màu nhãn để sửa tiêu chí
C. Thử complete/average linkage và kiểm tra dendrogram, scaling, khoảng cách
D. Tăng số chiều bằng các cột nhiễu giống nhau ở mọi thử nghiệm

**Đáp án: C.** Single linkage dựa cặp gần nhất nên dễ nối qua chuỗi; linkage khác thay tiêu chí gộp.

**Vì sao các phương án còn lại sai?**

- **A:** Xoay nhánh hiển thị không đổi các bước hợp nhất.
- **B:** Không thay phép phân cụm.
- **D:** Không nhắm cơ chế chaining, có thể làm khoảng cách kém hữu ích.

**Ghi nhớ:** Linkage là giả định về khoảng cách giữa hai tập điểm, ảnh hưởng hình dạng cụm.

---

### Câu 244 — Spectral Clustering: đồ thị bị rời rạc

Spectral Clustering dùng k-NN graph quá thưa tạo rất nhiều thành phần không liên thông ngoài ý muốn. Hai vòng thật bị vỡ thành nhiều mảnh. Việc cần kiểm tra trước tiên?

A. Chỉ tăng n_clusters lên bằng số mẫu
B. Bỏ tọa độ rồi dùng chỉ số dòng làm khoảng cách
C. Khẳng định mọi thành phần rời là lớp ngữ nghĩa thật
D. Độ liên thông của graph và thử tăng số láng giềng có kiểm soát

**Đáp án: D.** Đồ thị là biểu diễn đầu vào của spectral; quá thưa có thể cắt đứt các quan hệ cần thiết.

**Vì sao các phương án còn lại sai?**

- **A:** Không khôi phục cấu trúc hai vòng mong muốn.
- **B:** Mất hình học dữ liệu.
- **C:** Rời rạc có thể do tham số graph, không phải ngữ nghĩa.

**Ghi nhớ:** Với phương pháp đồ thị, chất lượng graph quyết định cấu trúc mà thuật toán nhìn thấy.

---

### Câu 245 — Imputation chuỗi: nhìn vào tương lai

Dự đoán sự kiện tại thời điểm t từ dữ liệu đến t. Code nội suy missing dùng cả điểm tại t+2 trước khi tạo mẫu train và test. Sửa nào phù hợp triển khai online?

A. Dùng thông tin đã có tới t, ví dụ forward-fill kèm tuổi của giá trị và missing mask, rồi đánh giá theo thời gian
B. Giữ nội suy hai phía và chỉ bỏ cột timestamp
C. Dùng backward-fill từ tương lai vì luôn chính xác hơn
D. Fit imputer trên toàn test vì không nhìn y

**Đáp án: A.** Không mượn quan sát tương lai; các đặc trưng bổ sung thể hiện dữ liệu cũ/thiếu.

**Vì sao các phương án còn lại sai?**

- **B:** Giá trị điền đã chứa thông tin t+2.
- **C:** Độ chính xác ngoại tuyến không bảo đảm tính khả dụng online.
- **D:** Vẫn dùng thông tin chưa có lúc dự đoán.

**Ghi nhớ:** Một phép tiền xử lý hợp lệ ngoại tuyến có thể không hợp lệ trong dự đoán thời gian thực.

---

### Câu 246 — Đặc trưng chuỗi không đều: pooling có mất thông tin

Hai chuỗi `[0,0,10]` và `[10,0,0]` có cùng mean, max và độ lệch chuẩn nhưng nhãn phụ thuộc tăng/giảm theo thời gian. Cách bổ sung phù hợp?

A. Chỉ thêm tổng vì tổng chắc chắn phân biệt
B. Giữ thông tin thứ tự bằng slope, chênh cuối-đầu hoặc encoder chuỗi có vị trí
C. Chỉ padding dài hơn rồi mean pooling không mask
D. Thay nhãn để hai chuỗi có cùng lớp

**Đáp án: B.** Các thống kê bất biến hoán vị hiện tại không phân biệt hai chuỗi; cần đặc trưng có thứ tự.

**Vì sao các phương án còn lại sai?**

- **A:** Cả hai tổng đều bằng 10.
- **C:** Không khôi phục thứ tự và có thể thêm sai lệch theo độ dài.
- **D:** Thay đổi bài toán thay vì cải thiện biểu diễn.

**Ghi nhớ:** Pooling gọn dữ liệu nhưng cần kiểm tra xem có loại bỏ tín hiệu quyết định nhãn không.

---

### Câu 247 — GPU: đánh giá nút thắt thực tế

Model nhỏ chạy GPU chậm hơn CPU. Profiling cho thấy 80% thời gian ở chuyển từng mẫu CPU→GPU, compute chỉ 5%. Can thiệp nào nhắm đúng nút thắt?

A. Mua GPU có compute gấp đôi và bảo đảm nhanh gấp đôi
B. Tăng số lớp cho GPU bận hơn rồi coi là tối ưu latency
C. Gộp batch, giảm số lần truyền và benchmark lại; giữ CPU nếu tổng latency vẫn tốt hơn
D. Chỉ đo kernel CUDA, bỏ thời gian truyền khi mục tiêu là end-to-end

**Đáp án: C.** Tăng hiệu quả truyền dữ liệu có thể hữu ích, nhưng model nhỏ không mặc định hưởng lợi từ GPU.

**Vì sao các phương án còn lại sai?**

- **A:** Compute chỉ 5% nên không thể suy ra tăng tốc tổng như vậy.
- **B:** Thay bài toán tính và có thể làm chậm thêm.
- **D:** Không đo đúng đại lượng cần tối ưu.

**Ghi nhớ:** Tối ưu dựa trên profiling và metric triển khai, không chỉ tên thiết bị.

---

### Câu 248 — Pipeline tổng hợp: leakage trong từ vựng và tuning

Phân loại văn bản bằng bag-of-words + Logistic Regression. Nhóm xây vocab bằng cả corpus test, chọn C bằng test F1 rồi giữ nguyên test để báo cáo. Phương án khắc phục đầy đủ nhất?

A. Chỉ đổi random_state của classifier rồi báo lại cùng test
B. Chỉ bỏ từ xuất hiện một lần, vẫn fit vocab toàn corpus và chọn C theo test
C. Chỉ tăng C đến khi train F1=1
D. Vectorizer và classifier trong Pipeline, tuning trên train/CV, đánh giá cuối trên test độc lập chưa dùng

**Đáp án: D.** Cả từ vựng và lựa chọn C đều phải tách khỏi test; test đã dùng cần thay bằng tập giữ riêng mới cho ước lượng độc lập.

**Vì sao các phương án còn lại sai?**

- **A:** Không xóa ảnh hưởng của vocab và tuning đã nhìn test.
- **B:** Cả hai nguồn ảnh hưởng vẫn còn.
- **C:** Không sửa leakage hoặc đánh giá khái quát.

**Ghi nhớ:** Kiểm toán mọi quyết định dùng dữ liệu, gồm cả bước không giám sát và lựa chọn thủ công.

---

## B. Mạng nơ-ron & Học sâu

### Câu 249 — Backprop: đạo hàm qua hai lớp

Mạng scalar `z=w1*x`, `h=ReLU(z)`, `yhat=w2*h`, `L=(yhat-y)²/2`. Tại x=2,w1=1,w2=3,y=4, gradient theo w1 là bao nhiêu?

A. 12
B. 6
C. 4
D. 0

**Đáp án: A.** z=h=2, yhat=6; dL/dyhat=2, dyhat/dh=3, dh/dz=1, dz/dw1=2; tích là 12.

**Vì sao các phương án còn lại sai?**

- **B:** Bỏ hệ số x=2 trong đường truyền tới w1.
- **C:** Đây là gradient theo w2: `(6−4)*h=4`, không phải w1.
- **D:** ReLU ở z=2 dương nên không chặn gradient.

**Ghi nhớ:** Vẽ đường phụ thuộc và nhân các đạo hàm cục bộ; phân biệt gradient theo từng tham số.

---

### Câu 250 — Gradient accumulation: batch cuối nhỏ

Muốn gradient tương đương mean loss trên 10 mẫu, chia thành micro-batch 4,4,2 và chỉ step một lần. Không có dropout/BatchNorm, loss cộng được theo mẫu. Nếu mỗi micro-batch trả mean loss, cần backward thế nào?

A. Chia mọi loss cho 3
B. Nhân ba loss lần lượt 0,4;0,4;0,2 rồi backward, zero_grad một lần trước cả nhóm
C. Backward nguyên ba mean loss rồi step
D. Zero_grad trước từng micro-batch rồi chỉ step sau micro-batch cuối

**Đáp án: B.** Trọng số theo số mẫu cho tổng gradient trung bình đúng 10 mẫu.

**Vì sao các phương án còn lại sai?**

- **A:** Cho batch 2 mẫu cùng trọng số batch 4 mẫu, sai trung bình theo mẫu.
- **C:** Cộng ba trung bình không phải mean của 10 mẫu.
- **D:** Xóa gradient hai batch đầu nên chỉ còn batch cuối.

**Ghi nhớ:** Tích lũy gradient cần xét reduction, số mẫu và thời điểm zero_grad/step.

---

### Câu 251 — Autograd: detach nhầm đường học

Code `features=encoder(x).detach(); logits=head(features); loss.backward()` dùng optimizer gồm encoder và head. Vì sao encoder không học?

A. Optimizer chứa encoder là đủ dù đồ thị bị cắt
B. Chỉ tăng learning rate encoder sẽ sửa
C. Detach cắt đồ thị từ features về encoder; bỏ detach nếu muốn fine-tune encoder
D. Phải đổi mọi input thành requires_grad=True mới học được tham số

**Đáp án: C.** Head vẫn nhận gradient qua features như hằng đầu vào, nhưng encoder không còn đường từ loss.

**Vì sao các phương án còn lại sai?**

- **A:** Optimizer không tự tạo gradient cho đường phụ thuộc đã bị detach.
- **B:** Không có gradient thì tăng learning rate không khôi phục đường học.
- **D:** Tham số encoder có thể nhận gradient mà không cần gradient của input, nếu không detach.

**Ghi nhớ:** Danh sách tham số optimizer và đồ thị autograd đều phải cho phép đường cập nhật mong muốn.

---

### Câu 252 — MLP: nhiều lớp nhưng vẫn tuyến tính

Hai lớp `h=W1*x+b1`, `y=W2*h+b2` không activation. Nhóm tăng hidden size để học ranh giới XOR. Nhận xét đúng nhất?

A. Cứ hidden size đủ lớn thì chắc chắn học mọi ranh giới dù không activation
B. Bias khiến hợp thành không thể viết thành một lớp affine
C. Chỉ đổi MSE sang cross-entropy sẽ tạo phi tuyến ẩn cần thiết
D. Toàn mạng vẫn affine: W2*W1*x + W2*b1+b2; cần phi tuyến để vượt giới hạn đó

**Đáp án: D.** Thêm chiều ẩn không thay tính affine của hợp thành.

**Vì sao các phương án còn lại sai?**

- **A:** Họ hàm vẫn affine bất kể độ rộng.
- **B:** Hai bias gộp thành `W2*b1+b2`.
- **C:** Loss thay mục tiêu tối ưu, không làm feature map tuyến tính trở thành phi tuyến.

**Ghi nhớ:** Sức biểu diễn phụ thuộc phép biến đổi giữa các lớp, không chỉ số lượng tham số.

---

### Câu 253 — Cross-entropy: softmax ổn định

Logits của ba lớp là `[1000,1001,999]`. Tính softmax trực tiếp bằng exp gây overflow. Phép biến đổi nào giữ nguyên xác suất nhưng ổn định hơn?

A. Trừ max logit trước khi exp, được [-1,0,-2]
B. Chia mọi logit cho 1001
C. Clip mọi logit về 1
D. Chỉ lấy argmax rồi dùng như softmax cho backward

**Đáp án: A.** Nhân cả tử và mẫu với cùng hệ số exp(−1001) không đổi tỷ lệ, nhưng tránh exp số quá lớn.

**Vì sao các phương án còn lại sai?**

- **B:** Đổi chênh lệch logits nên đổi phân phối, tương tự thay temperature.
- **C:** Làm ba giá trị bằng nhau và mất thứ tự/độ chênh.
- **D:** Mất phân phối score và đường gradient của softmax.

**Ghi nhớ:** Dùng loss/log-softmax ổn định từ thư viện thay vì exp thủ công không kiểm soát.

---

### Câu 254 — MSE: broadcasting và chẩn đoán gradient

Hồi quy một đầu ra có train loss gần hằng dù model thay đổi theo input. Kiểm tra thấy pred `(B,1)`, y `(B,)`; B>1. Can thiệp nào cần làm trước khi tăng độ sâu?

A. Thêm 20 lớp mà giữ loss sai shape
B. Căn shape pred và y giống nhau, kiểm tra loss trên vài cặp mẫu rồi train lại
C. Chuyển y sang integer dù mục tiêu liên tục
D. Tăng weight decay tới khi pred hằng

**Đáp án: B.** Broadcasting có thể tối ưu so từng dự đoán với mọi nhãn, kéo về trung bình thay vì quan hệ từng mẫu.

**Vì sao các phương án còn lại sai?**

- **A:** Tăng năng lực không sửa mục tiêu ghép mẫu sai.
- **C:** Dtype integer không sửa broadcasting và có thể mất thông tin.
- **D:** Củng cố biểu hiện xấu thay vì sửa lỗi loss.

**Ghi nhớ:** Trước khi quy lỗi cho kiến trúc, kiểm tra bài toán loss mà code thực sự tính.

---

### Câu 255 — Mask mean pooling: lệch do độ dài

Hai câu có cùng ba token thật, encoder trả cùng embedding tại token thật. Câu thứ hai bị padding thêm 20 vị trí có vector khác 0. Muốn biểu diễn pooling không đổi vì padding, cần gì?

A. Chỉ đặt token ID padding bằng 0 rồi mean toàn chuỗi
B. Chỉ mask loss ở cuối
C. Mask embedding padding khỏi tổng và chia số token thật; mask attention theo yêu cầu encoder
D. Lấy tổng không chia số token thật để mọi độ dài luôn tương đương

**Đáp án: C.** Chỉ bỏ khỏi tổng mà chia chiều dài padded vẫn sai; mask encoder và mask pooling giải quyết hai vị trí tác động.

**Vì sao các phương án còn lại sai?**

- **A:** ID=0 không bảo đảm hidden state=0 và mẫu số vẫn sai.
- **B:** Không loại ảnh hưởng padding khỏi biểu diễn dùng cho classifier.
- **D:** Không có tính chuẩn hóa theo độ dài và không đúng mean pooling yêu cầu.

**Ghi nhớ:** Padding có thể ảnh hưởng attention, pooling và loss; mask ở đúng từng bước.

---

### Câu 256 — Attention: kích thước và mask

Một head có Q `(2,5,8)`, K `(2,7,8)`, V `(2,7,12)`. Hai batch độc lập. Shape score trước softmax và output là gì?

A. Score (2,8,8), output (2,7,12)
B. Score (2,5,5), output (2,5,8)
C. Không hợp lệ vì số query khác số key
D. Score (2,5,7), output (2,5,12)

**Đáp án: D.** Q nhân K chuyển vị hai chiều cuối tạo query×key; weights nhân V giữ chiều query và chiều value.

**Vì sao các phương án còn lại sai?**

- **A:** Nhầm chiều embedding với số vị trí query/key.
- **B:** Chỉ phù hợp một số shape self-attention khác, không phải dữ liệu đề.
- **C:** Cross-attention cho phép số query và key khác nhau; chiều Q/K mới phải khớp.

**Ghi nhớ:** Attention nối hai tập vị trí qua chiều đặc trưng Q/K chung, rồi tổng hợp V theo query.

---

### Câu 257 — Transformer: chi phí khi tăng độ phân giải

Ảnh đầu vào tăng mỗi chiều gấp đôi, patch size cố định. Với self-attention toàn cục, bỏ CLS và giữ số head, độ rộng như cũ, số phần tử ma trận attention mỗi head tăng bao nhiêu lần?

A. 16 lần
B. 2 lần
C. 4 lần
D. 8 lần

**Đáp án: A.** Số patch tăng 4 lần; ma trận có N*N phần tử nên tăng 4²=16 lần.

**Vì sao các phương án còn lại sai?**

- **B:** Chỉ tính tăng một chiều ảnh, chưa tính lưới patch và bình phương attention.
- **C:** Đây là mức tăng số token, không phải số cặp token.
- **D:** Không theo quan hệ bình phương của N ở attention toàn cục.

**Ghi nhớ:** Chi phí attention theo số token có thể tăng nhanh hơn diện tích đầu vào.

---

### Câu 258 — Causal mask: sửa leakage trong LM

LM dự đoán token kế tiếp có validation loss gần 0 nhưng sinh tự hồi quy rất kém. Kiểm tra decoder self-attention đang nhìn cả chuỗi target thật. Sửa nào đúng?

A. Chỉ giảm temperature lúc sinh
B. Áp causal mask, kiểm tra shift target đúng một lần và loại padding khỏi loss
C. Cho model xem thêm token tương lai khi báo validation để ổn định hơn
D. Chỉ tăng số epoch trên pipeline cũ

**Đáp án: B.** Ngăn nhìn tương lai, khớp điều kiện suy luận và tránh loss bị padding chi phối.

**Vì sao các phương án còn lại sai?**

- **A:** Không sửa leakage trong quá trình học và đánh giá.
- **C:** Tăng sự lệch giữa validation và suy luận.
- **D:** Học tốt hơn một bài toán sai điều kiện.

**Ghi nhớ:** Validation phải mô phỏng thông tin thật sự có khi model được sử dụng.

---

### Câu 259 — Autoencoder: anomaly score theo train

Autoencoder train chỉ trên dữ liệu bình thường. Muốn báo bất thường bằng reconstruction error nhưng validation có nhãn ít. Thiết kế nào hợp lý?

A. Mặc định error cao luôn là bất thường thật trong mọi miền
B. Train autoencoder công suất rất lớn trên cả test rồi báo error thấp
C. Chọn ngưỡng bằng validation đại diện cho chi phí FP/FN, rồi khóa và đánh giá trên test độc lập
D. Chọn ngưỡng sao cho test accuracy cao nhất rồi gọi test độc lập

**Đáp án: C.** Reconstruction error chỉ là score; ngưỡng và mức khái quát cần kiểm chứng.

**Vì sao các phương án còn lại sai?**

- **A:** Đổi miền hoặc nhiễu có thể làm dữ liệu bình thường khó tái tạo.
- **B:** Làm leakage và có thể học tái tạo cả bất thường.
- **D:** Test đã dùng để chọn quyết định.

**Ghi nhớ:** Autoencoder không tự tạo ranh giới bất thường có ý nghĩa chỉ vì có reconstruction loss.

---

### Câu 260 — Adam và L2: không đồng nhất AdamW

Nhóm thay Adam cộng L2 vào loss bằng AdamW với cùng learning rate và cùng hệ số số học, kỳ vọng mọi trọng số sau mỗi bước giống hệt. Nhận xét đúng?

A. Luôn giống nhau vì cả hai có chữ weight
B. AdamW hoàn toàn bỏ gradient loss
C. Chỉ khác nhau khi train trên GPU
D. Không bảo đảm; L2 trong gradient đi qua moment/adaptive scaling, AdamW tách bước decay

**Đáp án: D.** Hai cơ chế không tương đương nói chung khi optimizer thích nghi.

**Vì sao các phương án còn lại sai?**

- **A:** Tên gọi không chứng minh phương trình cập nhật giống nhau.
- **B:** AdamW vẫn tối ưu loss bằng gradient thích nghi.
- **C:** Khác cơ chế cập nhật, không phụ thuộc riêng loại thiết bị.

**Ghi nhớ:** Khi đổi optimizer, phải tuning lại và kiểm tra quy ước regularization.

---

### Câu 261 — Dropout: train loss cao hơn validation

Model dùng dropout train p=0,5; validation tắt dropout. Không có leakage, hai tập cùng phân phối. Train loss hơi cao hơn validation loss. Kết luận phù hợp?

A. Điều này có thể do regularization/noise lúc train; so thêm train ở eval mode để chẩn đoán
B. Chắc chắn validation bị sai vì train loss luôn phải thấp hơn
C. Bật dropout trên validation bắt buộc sẽ làm đánh giá đúng hơn
D. Xóa mọi regularization ngay vì model chắc chắn underfit

**Đáp án: A.** Loss hai chế độ không đo chính xác cùng mạng hiệu dụng.

**Vì sao các phương án còn lại sai?**

- **B:** Không có định luật như vậy khi điều kiện tính khác nhau.
- **C:** Đánh giá thông thường dùng eval; bật lại thay điều kiện suy luận.
- **D:** Chưa đủ bằng chứng; cần so điều kiện và xu hướng đầy đủ.

**Ghi nhớ:** So loss cần kiểm tra chế độ, augmentation, regularization và cách lấy trung bình.

---

### Câu 262 — Early stopping: tránh dùng test như validation

Nhóm lưu checkpoint có test F1 cao nhất mỗi epoch và báo chính test F1 đó. Muốn kết quả dùng để so model đáng tin hơn, cần gì?

A. Đổi tên biến test_loader thành val_loader rồi giữ báo cáo cũ
B. Validation riêng để chọn checkpoint; test giữ độc lập để đánh giá cuối
C. Chỉ lấy trung bình top 3 test F1 đã quan sát
D. Tăng patience trên cùng test để hợp lệ hóa

**Đáp án: B.** Chọn epoch là một dạng lựa chọn mô hình nên không dùng test.

**Vì sao các phương án còn lại sai?**

- **A:** Đổi tên không tạo ra một tập độc lập mới.
- **C:** Vẫn chọn theo test, không loại thiên lệch.
- **D:** Vẫn để test điều khiển huấn luyện.

**Ghi nhớ:** Checkpoint, ngưỡng và prompt đều là quyết định mô hình phải tách khỏi test.

---

### Câu 263 — BatchNorm: đóng băng tham số chưa đủ

Fine-tune head với backbone chứa BatchNorm. Đã đặt requires_grad=False cho mọi tham số backbone nhưng gọi model.train() ở mỗi epoch. Running mean backbone vẫn đổi. Cách giải thích/sửa đúng?

A. requires_grad=False phải tự khóa mọi buffer, nên quan sát là bất khả thi
B. Gọi no_grad riêng cho target là đủ
C. Running statistics là buffer, không phụ thuộc requires_grad; đặt backbone.eval() sau model.train() nếu muốn giữ nguyên
D. Chỉ loại backbone khỏi optimizer thì running mean sẽ tự dừng

**Đáp án: C.** Freeze tham số chỉ chặn gradient, không ngăn cập nhật trạng thái BatchNorm ở train mode.

**Vì sao các phương án còn lại sai?**

- **A:** Buffer và tham số có cơ chế cập nhật khác nhau.
- **B:** Không đổi chế độ BatchNorm.
- **D:** Running stats cập nhật khi forward ở train, không qua optimizer.

**Ghi nhớ:** Đóng băng một module cần xét cả tham số, buffer và chế độ train/eval.

---

### Câu 264 — Khởi tạo ReLU: chết nhiều neuron

MLP sâu có nhiều neuron luôn nhận z âm trên mọi mẫu; gradient qua chúng bằng 0. Bias khởi tạo âm lớn, dữ liệu chưa chuẩn hóa. Hướng xử lý có căn cứ nhất?

A. Tăng độ âm của mọi bias để neuron chết ổn định hơn
B. Chỉ tăng số epoch bảo đảm mọi neuron tự sống lại
C. Đặt mọi weight giống hệt nhau để tăng đa dạng
D. Kiểm tra phân phối z/gradient, chuẩn hóa đầu vào và dùng khởi tạo phù hợp ReLU, tránh bias âm cực đoan

**Đáp án: D.** Can thiệp trực tiếp vào việc activation luôn rơi ở miền đạo hàm 0.

**Vì sao các phương án còn lại sai?**

- **A:** Làm tín hiệu khó đi vào miền dương hơn.
- **B:** Gradient qua ReLU đang 0 nên không có bảo đảm hồi phục.
- **C:** Ngược với mục tiêu phá đối xứng.

**Ghi nhớ:** Quan sát activation và gradient theo lớp giúp phân biệt vấn đề khởi tạo với thiếu dữ liệu.

---

### Câu 265 — PEFT: đếm tham số low-rank

Một ma trận weight 512x512 được giữ cố định. Adapter dùng ΔW=B*A, A shape `(8,512)`, B `(512,8)`, không bias. Có bao nhiêu tham số trainable cho adapter này?

A. 8.192
B. 262.144
C. 4.096
D. 270.336

**Đáp án: A.** A có 4096 và B có 4096; không tính lại 262144 weight nền đã đóng băng.

**Vì sao các phương án còn lại sai?**

- **B:** Đây là số phần tử ma trận đầy đủ, không phải hai factor trainable.
- **C:** Chỉ đếm một trong hai factor.
- **D:** Đã cộng weight nền dù đề nêu giữ cố định.

**Ghi nhớ:** Low-rank adaptation giảm số tham số học, nhưng vẫn cần forward và bộ nhớ cho model nền.

---

### Câu 266 — Fine-tuning: optimizer quên nhóm mới

Ban đầu train head với optimizer chỉ chứa head.parameters(). Sau đó mở requires_grad=True cho backbone nhưng giữ nguyên optimizer. Vì sao backbone chưa đổi dù có gradient?

A. requires_grad=True tự thêm mọi tham số vào mọi optimizer
B. Optimizer chưa có tham số backbone; cần thêm param group hoặc tạo optimizer phù hợp
C. Phải gọi argmax trước backward để encoder được cập nhật
D. Chỉ chuyển head sang CPU

**Đáp án: B.** Có gradient chưa đủ; step chỉ cập nhật các tham số đã đăng ký.

**Vì sao các phương án còn lại sai?**

- **A:** Optimizer giữ danh sách riêng, không tự theo dõi mọi thay đổi.
- **C:** Argmax không khôi phục đăng ký tham số và có thể cắt đường gradient.
- **D:** Không xử lý optimizer và còn tạo lỗi device.

**Ghi nhớ:** Kiểm tra requires_grad, đường autograd, danh sách optimizer và learning rate khi tham số không đổi.

---

### Câu 267 — Mini-batch và BatchNorm: không hoàn toàn tương đương

Tích lũy gradient từ 8 micro-batch nhỏ để mô phỏng một batch lớn, model có BatchNorm train mode. Vì sao kết quả không nhất thiết trùng batch lớn dù đã chia loss đúng?

A. Gradient accumulation không bao giờ có thể dùng với mạng nơ-ron
B. Chia loss đúng bắt buộc làm mọi trạng thái model giống nhau
C. BatchNorm tính thống kê riêng từng micro-batch nên forward và gradient khác
D. Chuyển dtype target sang long luôn làm hai quy trình trùng nhau

**Đáp án: C.** Tích lũy chỉ gộp gradient, không hợp nhất các batch statistics đã dùng trong forward.

**Vì sao các phương án còn lại sai?**

- **A:** Vẫn dùng được, chỉ không bảo đảm tương đương tuyệt đối trong điều kiện này.
- **B:** Không thay cơ chế thống kê phụ thuộc batch.
- **D:** Dtype target không gộp running statistics.

**Ghi nhớ:** Tương đương gradient theo mẫu cần xét cả các phép toán và trạng thái phụ thuộc batch.

---

### Câu 268 — Softmax: confidence tăng nhưng accuracy giữ nguyên

Nhân mọi logits phân loại đơn nhãn với hệ số dương 10. Trên cùng dữ liệu, argmax không đổi nhưng log loss có thể thay đổi. Kết luận đúng?

A. Accuracy luôn tăng vì xác suất lớn nhất cao hơn
B. Log loss luôn giảm cho mọi mẫu
C. Nhân logits với số dương tương đương đổi nhãn thật
D. Accuracy giữ nguyên; độ sắc của xác suất thay đổi nên log loss có thể tăng hoặc giảm

**Đáp án: D.** Hệ số dương giữ thứ tự logits, nhưng làm mô hình tự tin hơn, kể cả ở những mẫu sai.

**Vì sao các phương án còn lại sai?**

- **A:** Nhãn argmax vẫn y nguyên.
- **B:** Ở mẫu dự đoán sai, tăng tự tin có thể phạt nặng hơn.
- **C:** Không thay target hoặc thứ tự lớp.

**Ghi nhớ:** Độ đúng của nhãn và chất lượng xác suất là hai khía cạnh khác nhau.

---

## C. Thị giác máy tính

### Câu 269 — Convolution: hai lớp và receptive field

Hai lớp convolution liên tiếp đều kernel=3, stride=1, dilation=1; không pooling. Xét pixel đầu ra ở xa biên. Receptive field theo mỗi chiều so với input gốc là bao nhiêu?

A. 5
B. 6
C. 9
D. 3

**Đáp án: A.** Lớp đầu nhìn 3 vị trí; lớp hai ghép 3 vị trí lân cận có receptive field chồng nhau, tổng 3+2=5.

**Vì sao các phương án còn lại sai?**

- **B:** Cộng 3+3 mà không trừ phần chồng lấp.
- **C:** Nhân hai kích thước kernel như các vùng không chồng lấp.
- **D:** Bỏ qua việc lớp thứ hai mở rộng phạm vi input ảnh hưởng.

**Ghi nhớ:** Receptive field tăng theo kernel và bước nhảy tích lũy của các lớp trước.

---

### Câu 270 — Convolution/pooling: đếm đầu vào Linear

Input NCHW `(8,3,32,32)`, Conv2d(3,8,kernel=3,padding=1,stride=1), rồi MaxPool2d(2,2), flatten từ dim=1. Linear kế tiếp nhận in_features bao nhiêu?

A. 16.384
B. 2.048
C. 8.192
D. 768

**Đáp án: B.** Conv giữ 32x32 với 8 kênh; pool thành 16x16; mỗi mẫu có 8*16*16 phần tử.

**Vì sao các phương án còn lại sai?**

- **A:** Đã nhân thêm batch size 8 vào số feature của mỗi mẫu.
- **C:** Bỏ qua giảm kích thước không gian do pooling.
- **D:** Nhầm số kênh output với số kênh input và sai độ phân giải sau pool.

**Ghi nhớ:** Tách batch dimension khỏi số feature khi nối CNN với fully connected layer.

---

### Câu 271 — IoU và NMS: hai hộp cùng lớp

Hai box cùng lớp, score 0,9 và 0,8, IoU=0,7. Greedy NMS chuẩn dùng ngưỡng IoU=0,5, không có box khác. Kết quả và rủi ro ở cảnh đông là gì?

A. Giữ cả hai vì score đều trên 0,5
B. Chỉ giữ box 0,8 vì score thấp ít trùng hơn
C. Giữ box 0,9, loại box 0,8; có thể loại nhầm một vật thật bị che khuất
D. Loại cả hai vì IoU lớn

**Đáp án: C.** NMS ưu tiên score cao và xóa box trùng vượt ngưỡng, nhưng hai vật gần nhau cũng có thể overlap mạnh.

**Vì sao các phương án còn lại sai?**

- **A:** Đề cho ngưỡng IoU, không phải chỉ ngưỡng confidence.
- **B:** Greedy NMS thường bắt đầu từ score cao nhất.
- **D:** NMS giữ box đang được chọn làm đại diện.

**Ghi nhớ:** Phân biệt ngưỡng score và ngưỡng overlap; kiểm tra hậu xử lý trên cảnh đông.

---

### Câu 272 — Detection: matching không cho đếm trùng TP

Một ảnh có một ground-truth box. Hai dự đoán cùng lớp đều IoU đạt ngưỡng, scores 0,9 và 0,8. Khi đánh giá detection một-một theo score, nên đếm thế nào?

A. 2 TP vì cả hai IoU đạt
B. 0 TP và 2 FN
C. 1 TP và 1 TN
D. 1 TP và 1 FP

**Đáp án: D.** Dự đoán score cao khớp ground truth; dự đoán trùng không được dùng lại cùng ground truth để tạo TP thứ hai.

**Vì sao các phương án còn lại sai?**

- **A:** Đếm trùng một vật làm phóng đại recall/precision.
- **B:** Có dự đoán hợp lệ nên không bỏ lỡ ground truth.
- **C:** Detection không coi box dư là true negative theo cách này; nó là FP.

**Ghi nhớ:** Đánh giá detection cần matching với ground truth, không chỉ kiểm tra từng box độc lập.

---

### Câu 273 — YOLO/SSD/DETR: so sánh công bằng

Detector A dùng ảnh 1280px trên GPU lớn, detector B dùng 640px trên CPU; A có mAP cao hơn và FPS cao hơn. Muốn chọn cho camera nhúng giới hạn RAM, điều gì cần làm?

A. Đo lại các ứng viên với pipeline và phần cứng đích, kiểm tra độ phân giải, mAP và latency/RAM
B. Kết luận mọi checkpoint của họ A đều thắng B
C. Chỉ xếp theo mAP, bỏ RAM vì đã có GPU benchmark
D. Chỉ so số layer rồi suy ra FPS chính xác

**Đáp án: A.** So sánh cũ trộn khác biệt model với input và phần cứng, chưa trả lời ràng buộc triển khai.

**Vì sao các phương án còn lại sai?**

- **B:** Một phép đo không kiểm soát không chứng minh ưu thế cả họ model.
- **C:** Thiết bị đích có ràng buộc RAM và latency riêng.
- **D:** Operator, kích thước feature map và runtime cũng quyết định tốc độ.

**Ghi nhớ:** Đánh giá các họ detector bằng cùng tác vụ và ràng buộc thực tế, tránh khẳng định theo tên.

---

### Câu 274 — Segmentation: Dice và IoU

Mask dự đoán có 40 pixel dương; mask thật có 60; phần giao 30. Cặp (Dice, IoU) nào đúng?

A. (3/7; 0,60)
B. (0,60; 3/7)
C. (0,75; 0,50)
D. (0,30; 0,30)

**Đáp án: B.** Dice=2*30/(40+60)=0,60; IoU=30/(40+60−30)=3/7.

**Vì sao các phương án còn lại sai?**

- **A:** Đảo hai công thức.
- **C:** Đây là precision và recall của pixel dương, không phải Dice và IoU.
- **D:** Không chuẩn hóa theo đúng mẫu số của mỗi độ đo.

**Ghi nhớ:** Dice và IoU cùng đo overlap nhưng có mẫu số khác nhau.

---

### Câu 275 — U-Net: resize mask nhiều lớp

Mask segmentation chứa ID nguyên 0,1,2. Pipeline resize mask bằng bilinear rồi làm tròn; vùng biên xuất hiện ID không phản ánh lớp ban đầu. Cách sửa đúng?

A. Dùng blur mạnh hơn trước khi làm tròn
B. Chuyển mask thành float rồi coi mọi giá trị giữa 0 và 2 là lớp mới
C. Dùng nội suy nearest-neighbor cho mask nhãn và đồng bộ hình học với ảnh
D. Chỉ resize ảnh, giữ mask ở kích thước cũ

**Đáp án: C.** ID lớp là hạng mục, không nên trộn số học như cường độ ảnh.

**Vì sao các phương án còn lại sai?**

- **A:** Trộn các lớp nhiều hơn, không bảo toàn nhãn.
- **B:** Thay đổi tập nhãn vô nghĩa.
- **D:** Làm lệch tương ứng pixel khi kích thước không khớp.

**Ghi nhớ:** Phân biệt nội suy ảnh liên tục với nội suy chỉ số lớp rời rạc.

---

### Câu 276 — Segmentation: chọn loss và shape

U-Net phân đoạn đơn nhãn 4 lớp cho mỗi pixel, logits `(B,4,H,W)`, mask `(B,H,W)` long, ID 0–3. Thiết kế loss phù hợp nhất?

A. Argmax logits trước loss để đơn giản hóa gradient
B. BCEWithLogitsLoss với mask chỉ số giữ shape (B,H,W) không chuyển đổi
C. Softmax theo chiều batch rồi MSE với ID lớp
D. CrossEntropyLoss trên logits và mask chỉ số, có thể cân trọng số lớp theo train

**Đáp án: D.** Class axis là chiều 1; mỗi pixel có một nhãn trong 4 lớp.

**Vì sao các phương án còn lại sai?**

- **A:** Argmax loại score và không cho đường học hữu ích.
- **B:** BCE yêu cầu target tương thích đầu ra nhị phân theo từng kênh; shape/ý nghĩa hiện tại không khớp.
- **C:** Trộn xác suất giữa các mẫu và coi ID có khoảng cách số.

**Ghi nhớ:** Ngữ nghĩa nhãn theo pixel quyết định trục class, dtype target và loss.

---

### Câu 277 — Augmentation: bảo toàn nhãn theo miền

Phân loại chữ số gồm 6 và 9. Nhóm xoay ảnh 180 độ nhưng giữ nhãn, coi như augmentation an toàn. Nhận xét phù hợp?

A. Biến đổi có thể đổi ngữ nghĩa 6↔9 nên cần giới hạn hoặc cập nhật nhãn có căn cứ
B. Mọi phép quay luôn bảo toàn mọi nhãn phân loại
C. Tăng xác suất quay lên 1 sẽ tự sửa nhiễu nhãn
D. Chỉ kiểm tra ảnh có cùng số pixel là đủ

**Đáp án: A.** Augmentation phải bảo toàn target đối với tác vụ cụ thể.

**Vì sao các phương án còn lại sai?**

- **B:** Không đúng khi hướng là tín hiệu quyết định lớp.
- **C:** Có thể tạo hệ thống nhãn sai lớn hơn.
- **D:** Kích thước không bảo đảm nội dung mang cùng nhãn.

**Ghi nhớ:** Một augmentation tốt cho miền này có thể phá nhãn ở miền khác.

---

### Câu 278 — Transfer learning: validation đổi miền

ResNet pretrained cho val 95% trên ảnh cùng studio nhưng 63% trên ảnh điện thoại thật. Tuning nhiều epoch trên studio không cải thiện điện thoại. Ưu tiên nào hợp lý?

A. Chỉ báo 95% vì pretrained luôn khái quát mọi camera
B. Xây validation đại diện ảnh điện thoại, kiểm tra preprocessing và thích nghi bằng dữ liệu/augmentation hợp lệ
C. Chuẩn hóa mỗi ảnh điện thoại bằng thống kê của nhãn thật của ảnh
D. Đổi nhãn ảnh điện thoại theo dự đoán cũ để accuracy tăng

**Đáp án: B.** Có dấu hiệu domain shift; tối ưu studio không đo đúng phân phối triển khai.

**Vì sao các phương án còn lại sai?**

- **A:** Bỏ qua bằng chứng miền đích.
- **C:** Không khả dụng khi suy luận và rò rỉ nhãn.
- **D:** Làm sai đánh giá thay vì sửa khái quát.

**Ghi nhớ:** Phân phối validation phải gần điều kiện sử dụng nếu dùng nó để chọn mô hình.

---

### Câu 279 — CLIP: vector chuẩn hóa và cosine

Embedding ảnh i=(3,4), hai embedding text a=(6,8), b=(0,10). Theo cosine similarity, a hay b khớp hơn và vì sao?

A. b, vì norm của b lớn hơn norm của i
B. Hai mô tả luôn hòa vì norm của a và b đều bằng 10
C. a, vì cosine(i,a)=1 còn cosine(i,b)=0,8
D. Không thể so vì ảnh và text phải có số chiều khác nhau

**Đáp án: C.** a cùng hướng với i; độ lớn vector không quyết định cosine.

**Vì sao các phương án còn lại sai?**

- **A:** Norm lớn không đồng nghĩa hướng gần hơn.
- **B:** Cùng norm vẫn có góc khác nhau với ảnh.
- **D:** Encoder CLIP tạo embedding trong không gian chung cùng chiều.

**Ghi nhớ:** Khi dùng cosine, chuẩn hóa vector hoặc chia tích vô hướng cho tích norm.

---

### Câu 280 — CLIP: lựa chọn prompt và test

Nhóm thử 100 bộ prompt cho CLIP zero-shot, chọn bộ có test accuracy cao nhất rồi báo là zero-shot test độc lập. Cách làm đúng hơn?

A. Không cập nhật weight nên dùng test chọn prompt luôn hợp lệ
B. Đổi tên prompt thành label để loại thiên lệch
C. Chỉ báo tốt nhất trong 100 bộ và bỏ số lần thử
D. Chọn prompt trên tập phát triển, khóa template và đo trên test chưa dùng

**Đáp án: D.** Không train weight vẫn có lựa chọn theo dữ liệu; prompt tuning theo test làm lệch đánh giá.

**Vì sao các phương án còn lại sai?**

- **A:** Lựa chọn thủ công vẫn đưa thông tin test vào hệ thống.
- **B:** Đổi tên không đổi việc sử dụng test.
- **C:** Che mất quá trình lựa chọn không tạo đánh giá độc lập.

**Ghi nhớ:** Quy trình đánh giá bao gồm cả lựa chọn prompt, preprocessing và hậu xử lý.

---

### Câu 281 — Self-supervised vision: positive sai ngữ nghĩa

Dataset ảnh có đối tượng rất nhỏ ở góc; hai crop ngẫu nhiên của cùng ảnh thường chỉ một crop chứa vật. Contrastive pretraining lại kéo hai view sát nhau. Nguy cơ và điều chỉnh nào hợp lý?

A. Positive có thể mất tín hiệu vật; thiết kế crop giữ vùng liên quan và kiểm tra downstream
B. Hai crop cùng ảnh luôn có cùng thông tin cho mọi tác vụ
C. Chỉ dùng embedding hằng sẽ giải quyết tốt mọi phân loại
D. Tăng độ crop đến khi không còn vật là cách tối ưu chắc chắn

**Đáp án: A.** Bất biến được học có thể xóa đặc trưng quan trọng nếu view chỉ còn nền.

**Vì sao các phương án còn lại sai?**

- **B:** Không đúng khi vật bị crop mất.
- **C:** Collapse làm mất khả năng phân biệt.
- **D:** Càng có nguy cơ học nền thay vật.

**Ghi nhớ:** Thiết kế view tự giám sát phải xét loại thông tin cần giữ cho downstream.

---

### Câu 282 — GAN: ảnh giống dữ liệu train

GAN tạo ảnh đẹp nhưng nhiều ảnh gần trùng train. Muốn kiểm tra chất lượng trước dùng làm augmentation, cần ưu tiên gì?

A. Chỉ nhìn 5 ảnh đẹp nhất rồi kết luận đủ đa dạng
B. Kiểm tra nearest neighbors với train, độ đa dạng và lợi ích trên validation thật tách nguồn
C. Đưa ảnh sinh gần trùng train vào test để chứng minh model tốt
D. Độ phân giải cao bảo đảm không thể ghi nhớ

**Đáp án: B.** Phân biệt sinh hữu ích với ghi nhớ; augmentation chỉ có ích nếu cải thiện tổng quát.

**Vì sao các phương án còn lại sai?**

- **A:** Mẫu chọn lọc không phát hiện sao chép hoặc collapse toàn bộ.
- **C:** Test mất độc lập nguồn nội dung.
- **D:** Kích thước ảnh không ngăn memorization.

**Ghi nhớ:** Ảnh sinh dùng trong học máy cũng phải được kiểm toán nguồn, đa dạng và hiệu quả đánh giá.

---

### Câu 283 — Diffusion: tốc độ sampling và chất lượng

Hai cấu hình sampler cùng checkpoint: A 50 bước, B 10 bước. B nhanh hơn nhưng chi tiết kém trên tập prompt đánh giá. Cách quyết định phù hợp nhất?

A. 10 bước luôn đúng bằng chất lượng 50 bước với mọi sampler
B. 50 bước chắc chắn tốt nhất cho mọi thiết bị và ứng dụng
C. Đo quality/latency trên yêu cầu thực tế, chọn cấu hình đáp ứng cả hai; không mặc định ít bước giữ nguyên chất lượng
D. Chọn bằng dung lượng file checkpoint vì hai sampler khác số bước

**Đáp án: C.** Số bước và thuật toán sampling tương tác chất lượng/tốc độ, phải benchmark.

**Vì sao các phương án còn lại sai?**

- **A:** Không có bảo đảm chung đó.
- **B:** Có thể vượt ngân sách latency; mục tiêu không chỉ chất lượng.
- **D:** Checkpoint như nhau nên dung lượng không giải thích khác biệt sampling.

**Ghi nhớ:** Phân biệt trọng số đã học với cách chạy quá trình sinh khi suy luận.

---

### Câu 284 — Dataset video: rò rỉ giữa frame

Trích một frame mỗi giây từ 20 video, random split frame đạt 99%; khi gặp video mới chỉ 70%. Cách đánh giá lại tốt nhất?

A. Chỉ tăng khoảng cách tên file giữa train và test
B. Thêm nhiều frame liên tiếp từ cùng video vào test
C. Xóa camera ID khỏi bảng rồi giữ split cũ
D. Chia theo video/phiên quay, giữ các frame cùng nguồn ở cùng tập và đánh giá trên video mới

**Đáp án: D.** Frame gần nhau chia sẻ nền, nhân vật và điều kiện; random frame split không đo đúng khái quát sang video mới.

**Vì sao các phương án còn lại sai?**

- **A:** Tên file khác không chứng minh nội dung độc lập.
- **B:** Có thể làm leakage mạnh hơn.
- **C:** Dấu hiệu camera và nội dung vẫn có trong pixel.

**Ghi nhớ:** Đơn vị chia ảnh/video cần theo nguồn độc lập phù hợp tình huống triển khai.

---

## D. Xử lý ngôn ngữ tự nhiên & Âm thanh

### Câu 285 — Tokenizer: so chi phí và perplexity công bằng

Model A tách cùng văn bản thành 100 token, model B thành 160 token. Nhóm thấy perplexity B thấp hơn và suy ra B hiểu tốt hơn, chi phí cũng thấp hơn. Nhận xét đúng?

A. Không suy ra trực tiếp; tokenizer khác làm đơn vị perplexity khác và chi phí còn phụ thuộc số token cùng đơn giá
B. Perplexity thấp hơn luôn đồng nghĩa ít tiền hơn
C. Cùng văn bản luôn có cùng số token ở mọi model
D. Chỉ so số ký tự tên model để chọn

**Đáp án: A.** Cần metric tác vụ trên cùng dữ liệu và tính chi phí theo cách tính thực tế của mỗi model.

**Vì sao các phương án còn lại sai?**

- **B:** Perplexity không phải số token hoặc giá tính phí.
- **C:** Tokenizer và vocabulary khác nhau có thể chia khác nhau.
- **D:** Không đo chất lượng hoặc tài nguyên.

**Ghi nhớ:** Giữ đơn vị đo nhất quán và tách chất lượng dự đoán khỏi chi phí sử dụng.

---

### Câu 286 — BERT: mean pooling và token đặc biệt

Hai câu được batch với padding khác độ dài. Nhóm mean tất cả hidden state kể cả PAD rồi dùng cosine cho tìm kiếm. Muốn baseline pooling có ý nghĩa hơn, cần gì?

A. Giữ PAD vì ID giống nhau sẽ tự triệt tiêu khi cộng
B. Áp mask để chỉ gộp token mong muốn, chuẩn hóa phù hợp và đánh giá trên cặp truy vấn-tài liệu đại diện
C. Chỉ lấy chiều embedding đầu tiên vì luôn là độ tương đồng
D. Fit threshold bằng toàn bộ nhãn test rồi báo test nguyên vẹn

**Đáp án: B.** Loại ảnh hưởng padding; encoder tiền huấn luyện không tự bảo đảm mọi pooling tối ưu cho similarity.

**Vì sao các phương án còn lại sai?**

- **A:** Các hidden state có ngữ cảnh và không tự triệt tiêu.
- **C:** Không có ý nghĩa cố định như vậy cho một chiều.
- **D:** Thêm leakage vào bước quyết định.

**Ghi nhớ:** Pooling và mục tiêu tiền huấn luyện quyết định tính hữu ích của sentence embedding.

---

### Câu 287 — Text classification: nhãn ít nhưng tài liệu dài

BERT checkpoint giới hạn input 512 token; nhãn tài liệu thường do đoạn cuối quyết định. Cắt luôn 512 token đầu cho validation thấp. Can thiệp nào có căn cứ?

A. Tăng max_length tùy ý lên 50000 dù checkpoint không hỗ trợ
B. Chỉ tăng epoch của pipeline đã cắt mất bằng chứng
C. Chia thành chunk có ranh giới phù hợp, encode và tổng hợp có mask; đánh giá các chiến lược trên validation
D. Đưa nhãn vào đầu tài liệu để model phân loại dễ hơn

**Đáp án: C.** Giữ được bằng chứng ở cuối trong giới hạn model, rồi học/chọn cách gộp theo tác vụ.

**Vì sao các phương án còn lại sai?**

- **A:** Không bảo đảm positional/input capacity của model đáp ứng.
- **B:** Không khôi phục thông tin không có trong input.
- **D:** Rò rỉ đích và không khả dụng khi dự đoán.

**Ghi nhớ:** Xác minh bằng chứng cho nhãn có nằm trong phần input thực tế mà model nhận hay không.

---

### Câu 288 — Multi-label: chọn ngưỡng theo lớp

Phân loại nhiều nhãn có tần suất khác nhau; model trả 8 sigmoid scores. Muốn cải thiện macro-F1. Chiến lược nào hợp lệ?

A. Dùng argmax bắt buộc đúng một nhãn
B. Chọn ngưỡng từng lớp để test F1 cao nhất rồi báo chính test
C. Chỉ tối ưu accuracy của nhãn phổ biến rồi khẳng định macro-F1 tăng
D. Chọn ngưỡng chung hoặc theo lớp trên validation, kiểm soát overfit và khóa trước test

**Đáp án: D.** Một ngưỡng 0,5 không luôn tối ưu; nhiều ngưỡng cũng cần đủ dữ liệu để chọn đáng tin.

**Vì sao các phương án còn lại sai?**

- **A:** Loại khả năng nhiều nhãn và mẫu không có nhãn.
- **B:** Test trở thành dữ liệu phát triển.
- **C:** Macro cho các lớp trọng số ngang nhau, không theo số mẫu lớp phổ biến.

**Ghi nhớ:** Ngưỡng là một phần của mô hình ra quyết định và cần quy trình lựa chọn riêng.

---

### Câu 289 — Teacher forcing: lệch train và suy luận

Mô hình dịch train tốt với teacher forcing nhưng sai một từ sớm thì bản dịch tự sinh dễ lệch tiếp. Phát biểu nào phù hợp?

A. Train thường nhận tiền tố đích thật, còn suy luận nhận các token tự sinh; phải đánh giá giải mã tự hồi quy
B. Teacher forcing nghĩa là luôn có bản dịch chuẩn khi triển khai
C. Chỉ cần báo token accuracy trên tiền tố thật để khẳng định mọi câu sinh đúng
D. Cấp toàn bộ target thật cho decoder lúc test là đánh giá sinh hợp lệ

**Đáp án: A.** Sai số có thể tích lũy khi phân phối tiền tố khác nhau; loss teacher-forced chưa đo hết chất lượng bản dịch sinh.

**Vì sao các phương án còn lại sai?**

- **B:** Khi suy luận bản dịch đích chưa biết.
- **C:** Không đo tác động lỗi tích lũy và giải mã.
- **D:** Nhìn tương lai làm sai điều kiện sử dụng.

**Ghi nhớ:** Đánh giá mô hình chuỗi cần cả loss theo token và đầu ra sinh trong điều kiện thực tế.

---

### Câu 290 — Encoder-decoder: ba loại attention mask

Dịch máy dùng source có PAD, target có PAD và teacher forcing. Decoder có self-attention cùng cross-attention. Cấu hình khái niệm nào đúng?

A. Chỉ mask source PAD, target được nhìn toàn bộ tương lai
B. Self-attention đích chặn tương lai và PAD theo quy ước; cross-attention chặn source PAD; loss bỏ target PAD
C. Chỉ bỏ PAD khỏi loss là đủ cho mọi attention
D. Mask mọi token source thật và chỉ giữ PAD

**Đáp án: B.** Mỗi mask xử lý một nơi có thể đưa thông tin không hợp lệ hoặc padding vào tính toán.

**Vì sao các phương án còn lại sai?**

- **A:** Gây leakage trong next-token prediction của decoder.
- **C:** PAD vẫn có thể ảnh hưởng biểu diễn qua attention.
- **D:** Loại chính thông tin nguồn cần để dịch.

**Ghi nhớ:** Mask attention và ignore_index trong loss có mục đích khác nhau; đọc quy ước boolean của API cụ thể.

---

### Câu 291 — LM: trung bình loss theo token thật

Hai batch có tổng NLL lần lượt 10 trên 10 token thật và 18 trên 30 token thật. Bỏ PAD. Mean token NLL toàn tập và perplexity là gì?

A. 0,8 và exp(0,8)
B. 28 và exp(28)
C. 0,7 và exp(0,7)
D. 0,7 và 0,7

**Đáp án: C.** Tổng NLL=28 trên 40 token; phải trọng số theo số token thật.

**Vì sao các phương án còn lại sai?**

- **A:** 0,8 là trung bình hai mean batch 1 và 0,6, bỏ khác biệt số token.
- **B:** Chưa chia tổng số token thật.
- **D:** Perplexity là hàm mũ của mean NLL theo log tự nhiên.

**Ghi nhớ:** Khi batch có độ dài khác nhau, gộp tổng loss và số token thay vì trung bình các mean không trọng số.

---

### Câu 292 — LM qua API: đầu ra cấu trúc và đánh giá

Ứng dụng cần trích 3 trường từ văn bản, đầu ra JSON phải hợp schema. Model có thể gọi qua API, chưa fine-tune. Cách xây baseline đáng tin cậy?

A. Chỉ kiểm tra chuỗi bắt đầu bằng dấu {
B. Một JSON hợp lệ chứng minh mọi trường đều đúng sự thật
C. Chọn ví dụ test làm few-shot rồi báo nguyên test là độc lập
D. Prompt/schema rõ ràng, dùng chế độ cấu trúc nếu có, validate JSON và đo cả đúng schema lẫn đúng nội dung trên tập giữ riêng

**Đáp án: D.** JSON hợp lệ chưa đồng nghĩa giá trị đúng; capability phải kiểm tra ở API/model cụ thể.

**Vì sao các phương án còn lại sai?**

- **A:** Không bảo đảm parse được, đúng schema hoặc đúng nội dung.
- **B:** Schema chỉ kiểm cấu trúc/kiểu, không bảo đảm nội dung.
- **C:** Test đã ảnh hưởng prompt.

**Ghi nhớ:** Tách chất lượng định dạng, chất lượng nội dung và quy trình xử lý khi model không đáp ứng.

---

### Câu 293 — Mô hình mở và API: ràng buộc offline

Hệ thống phải chạy khi mất mạng và dữ liệu không được rời máy; RAM giới hạn. Cách chọn mô hình ngôn ngữ phù hợp nhất?

A. Chọn checkpoint chạy cục bộ đáp ứng tài nguyên/chất lượng và benchmark offline, kiểm tra điều kiện sử dụng
B. Gọi API từ xa rồi chỉ tắt lưu log là bảo đảm offline
C. Chọn model lớn nhất bất kể RAM vì tải được file là chạy được
D. Số tham số nhỏ nhất luôn có chất lượng tốt nhất

**Đáp án: A.** API từ xa không đáp ứng mất mạng; model cục bộ vẫn cần chứng minh đủ RAM và chất lượng.

**Vì sao các phương án còn lại sai?**

- **B:** Vẫn cần mạng và truyền dữ liệu ra máy chủ.
- **C:** Bộ nhớ suy luận còn gồm weight và trạng thái/activation liên quan.
- **D:** Không có bảo đảm; cần đánh giá trên tác vụ.

**Ghi nhớ:** Chọn cách triển khai theo ràng buộc khả dụng và tài nguyên cùng metric tác vụ.

---

### Câu 294 — Audio: chia đoạn và rò rỉ người/phiên

Một corpus lời nói mỗi người thu trong một phòng riêng. Random split đoạn đạt 98% cảm xúc; phòng mới giảm mạnh. Thiết kế kiểm chứng nào phù hợp nhất?

A. Xóa trường tên phòng nhưng giữ nguyên waveform và split
B. Giữ người/phiên/phòng tách giữa các tập theo mục tiêu, kiểm tra mô hình có dựa vào nền âm thanh không
C. Tăng số đoạn trùng từ mỗi bản ghi vào cả hai tập
D. Chỉ chuẩn hóa âm lượng là bảo đảm xóa mọi đặc trưng phòng

**Đáp án: B.** Phòng và người có thể tạo shortcut tương quan nhãn; cần đánh giá trên nguồn độc lập.

**Vì sao các phương án còn lại sai?**

- **A:** Âm học của phòng vẫn tồn tại trong tín hiệu.
- **C:** Củng cố shortcut và rò rỉ.
- **D:** Room acoustics không chỉ là mức âm lượng.

**Ghi nhớ:** Split đúng nguồn là cách kiểm tra shortcut mà chỉ xóa metadata không giải quyết được.

---

### Câu 295 — Âm thanh: đổi sampling rate giả

File có 48.000 mẫu/giây được gán nhầm metadata 16.000 mẫu/giây mà không resample. Với 48.000 mẫu gốc một giây, model sẽ diễn giải thời lượng và pitch thế nào so với gốc?

A. Thời lượng vẫn 1 giây, pitch giữ nguyên
B. Thời lượng thành 1/3 giây, pitch tăng 3 lần
C. Thời lượng thành 3 giây, tần số nghe được giảm khoảng 3 lần
D. Chỉ âm lượng tăng 3 lần

**Đáp án: C.** Cùng số mẫu phát/diễn giải ở tốc độ bằng một phần ba làm thời gian kéo dài và pitch hạ.

**Vì sao các phương án còn lại sai?**

- **A:** Điều đó cần resample đúng để số mẫu đổi theo sampling rate.
- **B:** Đây là hướng ngược, tương ứng diễn giải mẫu với sampling rate cao hơn.
- **D:** Sampling rate không trực tiếp là hệ số biên độ.

**Ghi nhớ:** Khai báo sampling rate phải khớp waveform; đổi metadata không thay thế resampling.

---

### Câu 296 — HuBERT: frozen encoder và audio pooling

Muốn phân loại cảm xúc với HuBERT frozen. Audio có độ dài khác nhau; padding tạo thêm hidden frame. Pipeline nào hợp lý?

A. Mean toàn bộ hidden frame kể cả PAD và bỏ mọi độ dài
B. Chuyển waveform thành token chữ bằng cách ép int từng mẫu
C. Chỉ đặt no_grad nhưng giữ dropout train để đặc trưng luôn ổn định
D. Processor đúng checkpoint, encoder frozen ở eval, pooling mask theo độ dài hidden frame, train classifier

**Đáp án: D.** Mask phải tương ứng độ dài sau downsampling của encoder, không mặc định cùng chiều waveform.

**Vì sao các phương án còn lại sai?**

- **A:** Làm biểu diễn phụ thuộc lượng padding.
- **B:** Không phải tiền xử lý audio mà HuBERT được thiết kế để nhận.
- **C:** no_grad không tắt dropout; cần eval nếu muốn feature extractor ổn định.

**Ghi nhớ:** Audio encoder có thể đổi độ dài chuỗi; mask pooling cần phản ánh độ dài đầu ra thật.

---

### Câu 297 — ASR: WER gộp theo corpus

File A chuẩn 10 từ có 5 lỗi; file B chuẩn 90 từ có 9 lỗi. Corpus WER tính gộp là bao nhiêu, nếu các lỗi đã được xác định theo cùng chuẩn?

A. 14%
B. 30%
C. 10%
D. 50%

**Đáp án: A.** Cộng 14 lỗi chia tổng 100 từ chuẩn; không cho hai file trọng số ngang nhau.

**Vì sao các phương án còn lại sai?**

- **B:** Đây là trung bình không trọng số của WER 50% và 10%.
- **C:** Chỉ lấy WER file dài và bỏ file A.
- **D:** Chỉ lấy WER file ngắn và bỏ file B.

**Ghi nhớ:** Phân biệt corpus WER theo tổng từ với trung bình WER theo file và nêu rõ cách tổng hợp.

---

### Câu 298 — Whisper: chép lời hay dịch sang tiếng Anh

Một checkpoint Whisper đa ngôn ngữ hỗ trợ cả transcription và translation. Input tiếng Việt nhưng cấu hình task=translate sinh tiếng Anh. Muốn transcript tiếng Việt, cần làm gì?

A. Đổi nhãn đánh giá thành tiếng Anh rồi gọi là transcript tiếng Việt
B. Chọn task transcription và ngôn ngữ phù hợp nếu API yêu cầu, kiểm tra processor/decoder config
C. Chỉ tăng sampling rate để model trả tiếng Việt
D. Mặc định mọi checkpoint mang tên Whisper có cùng hỗ trợ ngôn ngữ

**Đáp án: B.** Hai tác vụ có mục tiêu đầu ra khác nhau; đây có thể là cấu hình tác vụ thay vì lỗi nhận dạng ngôn ngữ.

**Vì sao các phương án còn lại sai?**

- **A:** Thay đổi mục tiêu, không đáp ứng yêu cầu.
- **C:** Sampling rate không chọn tác vụ dịch hay chép lời.
- **D:** Cần kiểm tra checkpoint cụ thể, có biến thể chỉ tiếng Anh.

**Ghi nhớ:** Kiểm tra model variant, language và task trước khi kết luận model audio không đủ năng lực.

---

### Câu 299 — Audio-language: transcript có thể mất thông tin

Muốn hỏi liệu giọng người nói trong audio nghe tức giận hay bình thản. Pipeline chỉ dùng ASR rồi text-only LM. Hạn chế chính và phép so sánh phù hợp?

A. Transcript luôn lưu chính xác mọi cao độ và cường độ
B. LM văn bản chắc chắn suy ra mọi cảm xúc thật từ cùng một câu
C. Transcript mất ngữ điệu; so với hệ nhận audio trực tiếp như checkpoint Qwen-Audio/Voxtral phù hợp trên tập có nhãn
D. Chọn model theo WER thấp nhất bảo đảm emotion accuracy cao nhất

**Đáp án: C.** Nội dung từ không giữ đầy đủ prosody; cần đánh giá khả năng nghe âm thanh cho tác vụ này.

**Vì sao các phương án còn lại sai?**

- **A:** Chuỗi từ thường không giữ các đặc điểm âm học đó.
- **B:** Cùng câu có thể được nói với ngữ điệu khác nhau.
- **D:** WER đo chép từ, không trực tiếp đo nhận cảm xúc.

**Ghi nhớ:** Tác vụ phụ thuộc tín hiệu phi ngôn từ cần biểu diễn giữ được âm thanh liên quan.

---

### Câu 300 — Audio/VLM: so model theo tác vụ và ngôn ngữ

Hai audio-language checkpoint cho câu trả lời trôi chảy nhưng khác nhau trên audio tiếng Việt có tiếng ồn. Nhóm định chọn model dựa một demo tiếng Anh sạch. Quy trình nào phù hợp hơn?

A. Mọi model đa phương thức có khả năng audio tiếng Việt ngang nhau
B. Chỉ đo độ dài câu trả lời; càng dài càng đúng
C. Dùng câu trả lời model lớn làm nhãn chuẩn duy nhất mà không kiểm tra
D. Tạo tập tiếng Việt đại diện có nhiễu, rubric theo câu hỏi, đo đúng nội dung, lỗi và latency với cùng điều kiện

**Đáp án: D.** Demo khác ngôn ngữ/điều kiện không đại diện miền đích; cần capability của đúng checkpoint.

**Vì sao các phương án còn lại sai?**

- **A:** Input đa phương thức không bảo đảm năng lực đồng đều.
- **B:** Độ dài không đo tính đúng nội dung audio.
- **C:** Có thể truyền lỗi model vào đánh giá, không có ground truth đáng tin.

**Ghi nhớ:** Đánh giá multimodal phải khớp modality, ngôn ngữ, điều kiện thu và đầu ra thực tế cần dùng.

---

# III. ĐÁP ÁN NHANH

221: A | 222: B | 223: C | 224: D | 225: A | 226: B | 227: C | 228: D | 229: A | 230: B | 231: C | 232: D | 233: A | 234: B | 235: C | 236: D | 237: A | 238: B | 239: C | 240: D | 241: A | 242: B | 243: C | 244: D | 245: A | 246: B | 247: C | 248: D | 249: A | 250: B | 251: C | 252: D | 253: A | 254: B | 255: C | 256: D | 257: A | 258: B | 259: C | 260: D | 261: A | 262: B | 263: C | 264: D | 265: A | 266: B | 267: C | 268: D | 269: A | 270: B | 271: C | 272: D | 273: A | 274: B | 275: C | 276: D | 277: A | 278: B | 279: C | 280: D | 281: A | 282: B | 283: C | 284: D | 285: A | 286: B | 287: C | 288: D | 289: A | 290: B | 291: C | 292: D | 293: A | 294: B | 295: C | 296: D | 297: A | 298: B | 299: C | 300: D
