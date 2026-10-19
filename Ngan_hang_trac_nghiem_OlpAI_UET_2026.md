# NGÂN HÀNG ÔN TẬP TRẮC NGHIỆM OLYMPIC TRÍ TUỆ NHÂN TẠO UET 2026

## Cách bộ câu hỏi này được xây dựng

Bộ câu hỏi này bám **đúng phạm vi của file “Đề cương Ôn tập – Giai đoạn 2 – Kiểm tra sơ loại”**: 40 câu/60 phút, mỗi câu 4 phương án A–D, trọng tâm là **chọn giải pháp phù hợp nhất cho một tình huống AI**, xử lý dữ liệu, chẩn đoán huấn luyện, chọn metric, tận dụng mô hình tiền huấn luyện và đọc mã Python/NumPy/pandas/scikit-learn/PyTorch.

Nguồn phạm vi chính:
- Đề cương UET 2026 do người học cung cấp.
- IOAI 2026 Syllabus: https://ioai-official.org/wp-content/uploads/2025/10/Syllabus.pdf

Nguồn tham khảo về **dạng ra đề**:
- IOAI Education Hub: https://ioai-official.org/resources/
- IOAI 2025/2026 task repositories: https://github.com/IOAI-official
- NOAI Singapore 2026 Final MCQ: các câu tình huống, đọc code, chẩn đoán lỗi pipeline/training, tính nhanh.

**Nguyên tắc:** không đưa các mảng ngoài syllabus UET chỉ vì một kỳ thi quốc gia khác có hỏi. Ví dụ, ma trận/Hessian/calculus sâu không được bổ sung nếu không nằm trong đề cương UET.

---

# I. MA TRẬN KIẾN THỨC XUNG QUANH TỪNG MỤC NHỎ

## A. Kỹ năng nền tảng & Học máy cổ điển

### A1. Python cơ bản
Cần nắm: vòng lặp, list/dict/set, slicing, comprehension, hàm, tham số mặc định, scope cơ bản, `enumerate`, `zip`, lỗi mutable/immutable thường gặp; đọc output đoạn code ngắn.

### A2. NumPy
Cần nắm: `ndarray`, shape/dtype, indexing/slicing, broadcasting, axis, reshape/transpose, vectorization, `mean/sum/argmax`, khác biệt giữa view và copy ở mức thực hành.

### A3. pandas
Cần nắm: DataFrame/Series, lọc dòng/cột, `loc/iloc`, missing values, `groupby`, merge/join cơ bản, tránh data leakage khi tiền xử lý.

### A4. Matplotlib/Seaborn
Cần nắm: chọn loại biểu đồ phù hợp; histogram cho phân phối, scatter cho quan hệ hai biến, line cho chuỗi thời gian, confusion-matrix heatmap; không suy luận nhân quả chỉ từ tương quan.

### A5. scikit-learn
Cần nắm: `fit`, `predict`, `transform`, `fit_transform`, Pipeline, train/test split, preprocessing chỉ fit trên train, model API nhất quán.

### A6. PyTorch & tensor
Cần nắm: shape tensor, batch dimension, dtype, broadcasting, `requires_grad`, `backward`, `zero_grad`, `train/eval`, `no_grad`, chuyển device CPU/GPU.

### A7. CPU/GPU
Cần nắm: GPU có lợi cho phép toán tensor song song lớn; overhead chuyển dữ liệu; model và tensor phải cùng device; không phải bài nhỏ nào GPU cũng nhanh hơn.

### A8. Linear Regression
Cần nắm: dự đoán biến liên tục, quan hệ gần tuyến tính, MSE/MAE, ảnh hưởng outlier, feature scaling khi dùng regularization/gradient descent, hệ số và intercept.

### A9. Logistic Regression
Cần nắm: phân loại, logit/sigmoid, probability threshold, binary vs multiclass, cross-entropy/log loss, scaling và regularization.

### A10. L1/L2 regularization
Cần nắm: L1 khuyến khích sparsity/feature selection; L2 co nhỏ trọng số; hệ số regularization quá lớn gây underfitting; không regularize bias theo nhiều convention phổ biến.

### A11. K-NN
Cần nắm: khoảng cách, chọn k, scaling bắt buộc trong nhiều bài, curse of dimensionality, inference chậm, nhạy với nhiễu/outlier và mất cân bằng lớp.

### A12. Decision Tree
Cần nắm: split theo impurity/information gain, dễ overfit nếu cây sâu, không cần scaling, xử lý nonlinear/interaction tốt; `max_depth`, `min_samples_leaf` là hyperparameter quan trọng.

### A13. SVM
Cần nắm: margin, support vectors, linear vs kernel SVM, scaling quan trọng, `C` điều khiển trade-off margin/lỗi, kernel RBF và gamma ở mức sử dụng.

### A14. Ensemble
Cần nắm: bagging giảm variance; Random Forest = bagging + random feature subsets; boosting học tuần tự để sửa lỗi; Gradient Boosting thường mạnh trên tabular; nhiều cây hơn không luôn cải thiện validation đáng kể.

### A15. K-Means
Cần nắm: cần chọn K, tối thiểu hóa within-cluster squared distance, nhạy scale/outlier/khởi tạo, phù hợp cluster gần “cầu” và độ lớn tương đối đồng đều.

### A16. PCA
Cần nắm: giảm chiều tuyến tính không giám sát, giữ phương sai lớn, cần standardize khi thang đo khác nhau, components trực giao; PCA không dùng nhãn.

### A17. t-SNE/UMAP
Cần nắm: chủ yếu cho visualization/embedding thấp chiều; bảo toàn cấu trúc cục bộ; khoảng cách toàn cục và kích thước cụm trên đồ thị không nên diễn giải quá mức; fit trên tập lớn có thể tốn tài nguyên.

### A18. DBSCAN/Hierarchical/Spectral
Cần nắm: DBSCAN tìm cluster mật độ và noise, không cần K nhưng cần `eps/min_samples`; Hierarchical tạo dendrogram; Spectral hữu ích với cluster hình dạng phi lồi nhưng tốn chi phí trên dữ liệu lớn.

### A19. Metrics, confusion matrix, ROC
Cần nắm: Accuracy/Precision/Recall/F1; TP/FP/TN/FN; bài mất cân bằng; threshold; ROC curve và AUC; chọn metric theo chi phí sai lầm.

### A20. Underfitting/Overfitting
Cần nắm: train và validation cùng tệ → underfit; train tốt validation tệ → overfit; giải pháp theo nguyên nhân: tăng/giảm capacity, regularization, augmentation, dữ liệu, early stopping.

### A21. Hyperparameter tuning & Cross-validation
Cần nắm: validation để chọn hyperparameter; test chỉ dùng đánh giá cuối; k-fold; stratified k-fold cho classification mất cân bằng; preprocessing/feature selection phải nằm trong từng fold; time series không shuffle ngẫu nhiên.

### A22. Feature engineering
Cần nắm: one-hot categorical, sliding window time series, statistical features, pooling, PCA, embedding; tránh dùng thông tin tương lai hoặc nhãn gián tiếp.

### A23. Data processing
Cần nắm: missing data, mean/median/forward-fill, padding variable length, normalization vs standardization, train/val/test split, augmentation, tokenization/vocabulary, patching images; mọi thống kê học từ dữ liệu phải fit từ train.

---

## B. Mạng nơ-ron & Học sâu

### B1. Perceptron; Gradient Descent; Backpropagation
Nắm forward pass, loss, gradient, chain rule ở mức ý nghĩa, cập nhật trọng số theo hướng ngược gradient; perceptron chỉ giải được bài tuyến tính phân tách ở dạng cơ bản.

### B2. ReLU, Sigmoid, Tanh
Nắm miền giá trị, saturation/vanishing gradient, dùng sigmoid cho binary output, softmax cho multiclass output (kiến thức lân cận trực tiếp), ReLU phổ biến ở hidden layers.

### B3. Loss functions
Nắm MSE/MAE cho regression; cross-entropy cho classification; multi-label dùng sigmoid + binary cross-entropy chứ không softmax đơn giản; tính ổn định số học của `*_with_logits`.

### B4. MLP
Nắm dense layers, nonlinear activations, capacity, parameter count, input flatten cho tabular/vector; MLP không tận dụng locality ảnh như CNN.

### B5. Embeddings
Nắm vector biểu diễn học được cho token/ảnh/âm thanh; similarity trong không gian embedding; embedding giúp thay one-hot thưa bằng vector dày.

### B6. Pooling
Nắm max/average pooling, giảm spatial/sequence dimension; max giữ activation nổi bật, average tổng hợp xu hướng; pooling làm mất một phần chi tiết.

### B7. Attention & Transformer
Nắm query-key-value, attention score/softmax, self-attention, positional information, encoder/decoder masking, parallelization, quadratic cost theo sequence length ở attention chuẩn.

### B8. SGD & Mini-batch GD
Nắm batch size trade-off, gradient nhiễu vs ổn định, epoch/iteration, shuffle train data; full-batch khác mini-batch.

### B9. Autoencoder
Nắm encoder-bottleneck-decoder, reconstruction loss, anomaly detection/dimensionality reduction ở mức thực hành; không cần nhãn cho reconstruction thông thường.

### B10. Adam, AdamW, momentum, learning rate
Nắm adaptive update, momentum, weight decay tách biệt ở AdamW, dấu hiệu LR quá lớn/quá nhỏ, warmup/decay ở mức sử dụng.

### B11. Dropout, Early Stopping, Weight Decay
Nắm regularization, behavior train/eval của dropout, validation metric cho early stopping, weight decay gần L2 nhưng optimizer semantics có thể khác.

### B12. Weight initialization & Batch Normalization
Nắm Xavier/He ở mức chọn phù hợp activation, tránh gradient quá lớn/nhỏ; BatchNorm dùng batch statistics khi train và running statistics khi eval.

### B13. Fine-tuning
Nắm feature extraction/freeze backbone, full fine-tuning, discriminative LR, parameter-efficient fine-tuning (ví dụ adapter/LoRA như kiến thức lân cận), tài nguyên và nguy cơ catastrophic forgetting.

---

## C. Computer Vision

### C1. Convolutional layer
Nắm kernel, stride, padding, channels, receptive field, output size, parameter count; convolution khai thác locality và weight sharing.

### C2. Image classification
Nắm input preprocessing, logits/probability, top-1, transfer learning, class imbalance, augmentation hợp lý.

### C3. Object detection: YOLO, SSD, DETR
Nắm classification + localization, bounding box, IoU, confidence, NMS với detector truyền thống; YOLO/SSD one-stage; DETR dùng transformer/set prediction và khác pipeline anchor/NMS truyền thống.

### C4. Segmentation: U-Net
Nắm pixel-wise prediction, encoder-decoder, skip connections, binary/multiclass masks, Dice/IoU như metric lân cận thực hành.

### C5. Pretrained vision encoder & augmentation
Nắm ResNet feature extractor, freeze/fine-tune, domain shift, resize/normalize đúng model; augmentation phải giữ nhãn và chỉ áp dụng ngẫu nhiên trên train.

### C6. GAN & Diffusion
Nắm generator/discriminator, adversarial training, mode collapse; diffusion học denoising qua nhiều bước, inference thường chậm hơn GAN nhưng ổn định/chất lượng cao trong nhiều bài.

### C7. Self-supervised vision
Nắm pretext/contrastive/masked image modeling ở mức mục đích: học representation từ dữ liệu không nhãn rồi fine-tune.

### C8. CLIP
Nắm image encoder + text encoder, contrastive alignment, zero-shot classification bằng text prompts, cosine similarity/embedding space.

---

## D. NLP & Âm thanh

### D1. BERT
Nắm encoder-only Transformer, bidirectional context, masked language modeling ở mức khái niệm, `[CLS]` cho classification phổ biến, fine-tuning downstream.

### D2. Language modeling
Nắm next-token probability, autoregressive causal masking, perplexity ở mức ý nghĩa, tokenization, context length, teacher forcing ở mức lân cận.

### D3. Text classification
Nắm tokenizer → encoder/embedding → classifier, padding/mask, class imbalance, suitable metric.

### D4. Encoder-decoder
Nắm encoder biểu diễn input, decoder sinh output, cross-attention, dùng cho translation/summarization/VLM generation.

### D5. Pretrained language models: open-source & API
Nắm lựa chọn theo chất lượng/tài nguyên/latency/privacy/cost, batching, prompt/token limits, fine-tuning vs prompting; không phụ thuộc tên model cụ thể dễ thay đổi.

### D6. HuBERT
Nắm pretrained/self-supervised audio representation encoder; dùng feature extraction/fine-tuning cho speech tasks.

### D7. Whisper, Qwen-Audio, Voxtral
Nắm Whisper chủ yếu speech recognition/translation; Qwen-Audio/Voxtral là audio-language models có khả năng hiểu audio rộng hơn; lựa chọn model theo task chứ không theo “model lớn nhất”.

---

# II. NGÂN HÀNG 140 CÂU TRẮC NGHIỆM

> Mỗi câu có **một đáp án tốt nhất**. Dạng câu được cố ý pha trộn: tình huống, đọc code, tính nhanh, chẩn đoán training và chọn giải pháp.


## A. Kỹ năng nền tảng & Học máy cổ điển

### Câu 1 — Python: list comprehension
Đoạn mã nào tạo danh sách bình phương của các số chẵn từ 0 đến 9?

A. `[x*x for x in range(10) if x % 2 == 0]`
B. `[x for x in range(10) if x*x % 2 == 0]`
C. `[x*x if x % 2 == 0 for x in range(10)]`
D. `[x*x for x in range(0, 10, 3)]`

**Đáp án: A.** Cú pháp comprehension đúng là biểu thức trước, điều kiện `if` sau. `range(10)` tạo các số 0–9; điều kiện giữ `0, 2, 4, 6, 8`, rồi `x*x` tạo kết quả `[0, 4, 16, 36, 64]`.

**Vì sao các phương án còn lại sai?**
- **B:** Điều kiện vẫn lọc được số chẵn vì bình phương số chẵn là chẵn, nhưng biểu thức đầu là `x`, nên kết quả chỉ là `[0, 2, 4, 6, 8]`.
- **C:** Sai cú pháp. `if` dùng để lọc phải nằm sau `for`; nếu đặt trong biểu thức đầu thì phải có đủ dạng `giá_trị_đúng if điều_kiện else giá_trị_sai`.
- **D:** `range(0, 10, 3)` lấy `0, 3, 6, 9`, nên kết quả là `[0, 9, 36, 81]`, không phải bình phương của các số chẵn.

**Ghi nhớ:** Tách comprehension thành ba bước: nguồn dữ liệu → điều kiện lọc → biểu thức biến đổi.

### Câu 2 — Python: mutable object
```python
a = [1, 2]
b = a
b.append(3)
print(a)
```
Kết quả là gì?

A. `[1, 2]`
B. `[1, 2, 3]`
C. `[3]`
D. Lỗi vì `a` và `b` không thể trỏ cùng list

**Đáp án: B.** `b = a` không tạo bản sao; cả hai biến cùng tham chiếu một list mutable. `b.append(3)` sửa trực tiếp list đó, nên đọc qua `a` hay `b` đều thấy `[1, 2, 3]`.

**Vì sao các phương án còn lại sai?**
- **A:** Kết quả này chỉ phù hợp nếu `b` là bản sao độc lập, chẳng hạn tạo bằng `b = a.copy()`. Phép gán thông thường không sao chép list.
- **C:** `append` thêm một phần tử ở cuối, không xóa hai phần tử đã tồn tại. Muốn thay toàn bộ nội dung phải dùng thao tác khác.
- **D:** Python cho phép nhiều tên tham chiếu cùng một đối tượng. Đây là aliasing hợp lệ, không phải lỗi.

**Ghi nhớ:** Phân biệt gán tham chiếu, sao chép nông và sao chép sâu khi làm việc với đối tượng mutable.

### Câu 3 — NumPy: broadcasting
`X` có shape `(100, 5)` và `mu` có shape `(5,)`. Phép `X - mu` cho kết quả shape nào?

A. `(100,)`
B. `(5,)`
C. `(100, 5)`
D. Lỗi shape

**Đáp án: C.** NumPy so khớp shape từ chiều cuối: `5` khớp `5`, còn chiều đầu bị thiếu của `mu` được coi là `1` và broadcast tới `100`. Mỗi hàng của `X` trừ cùng vector `mu`; kết quả giữ shape `(100, 5)`.

**Vì sao các phương án còn lại sai?**
- **A:** Phép trừ theo phần tử không gộp chiều feature. Shape `(100,)` thường xuất hiện sau một phép reduction theo từng hàng, không phải phép trừ này.
- **B:** `mu` được mở rộng để tương thích với `X`; `X` không bị thu nhỏ thành một vector 5 phần tử.
- **D:** Broadcasting hợp lệ vì các chiều tương ứng bằng nhau hoặc một chiều bằng 1. Hai shape này đáp ứng quy tắc đó.

**Ghi nhớ:** Broadcasting mở rộng chiều có kích thước 1 hoặc chiều bị thiếu; nó không tự tính tổng hay trung bình.

### Câu 4 — NumPy: axis
Với `X.shape == (200, 4)`, lệnh `X.mean(axis=0)` trả về gì?

A. Trung bình của từng hàng, shape `(200,)`
B. Trung bình của từng cột/feature, shape `(4,)`
C. Một scalar duy nhất
D. Ma trận `(200, 4)` đã chuẩn hóa

**Đáp án: B.** `axis=0` loại bỏ chiều đầu có 200 hàng bằng cách lấy trung bình qua các hàng. Với mỗi trong 4 feature, NumPy trả về một giá trị trung bình; mặc định `keepdims=False`, nên shape là `(4,)`.

**Vì sao các phương án còn lại sai?**
- **A:** Trung bình từng hàng tương ứng `X.mean(axis=1)`, vì khi đó chiều 4 cột bị gộp, để lại 200 giá trị.
- **C:** Một scalar là kết quả của `X.mean()` khi không chỉ định axis, tức lấy trung bình toàn bộ phần tử.
- **D:** `mean` là phép tổng hợp, không phải standardization. Chuẩn hóa cần thêm phép trừ trung bình và chia độ lệch chuẩn.

**Ghi nhớ:** Axis được chỉ định là chiều bị gộp; các chiều còn lại quyết định shape đầu ra.

### Câu 5 — pandas: xử lý missing value
Một feature thu nhập bị lệch phải mạnh và có vài giá trị cực lớn. Nếu cần impute missing value bằng một thống kê đơn giản, lựa chọn nào thường bền vững hơn?

A. Mean
B. Median
C. Maximum
D. Zero trong mọi trường hợp

**Đáp án: B.** Median là giá trị ở giữa sau khi sắp xếp nên ít bị vài thu nhập cực lớn kéo lệch. Ví dụ `[10, 11, 12, 13, 1000]` có median 12 nhưng mean 209.2; median đại diện phần lớn mẫu tốt hơn trong tình huống này.

**Vì sao các phương án còn lại sai?**
- **A:** Mean dùng độ lớn của mọi giá trị, nên outlier làm giá trị điền bị đẩy cao và có thể tạo thêm nhiều mẫu thiếu mang thu nhập bất thường.
- **C:** Maximum chọn chính giá trị cực đoan nhất, khiến tác động của outlier mạnh hơn thay vì giảm đi.
- **D:** Điền 0 chỉ hợp lý khi có ý nghĩa nghiệp vụ phù hợp. Missing không tự đồng nghĩa với không có thu nhập.

**Ghi nhớ:** Chọn cách impute theo phân phối và ý nghĩa dữ liệu; chỉ học median từ tập train.

### Câu 6 — pandas: lọc dữ liệu
Bạn muốn chọn các dòng `df` có `age >= 18` và `score > 0.8`. Cách đúng là:

A. `df[df.age >= 18 and df.score > 0.8]`
B. `df[(df.age >= 18) & (df.score > 0.8)]`
C. `df[df.age >= 18, df.score > 0.8]`
D. `df.where(df.age >= 18 or df.score > 0.8)`

**Đáp án: B.** Mỗi so sánh tạo một Series boolean. Toán tử `&` kết hợp chúng theo từng dòng; hai cặp ngoặc bảo đảm thứ tự tính đúng. `df[mask]` sau đó chỉ giữ các dòng đồng thời thỏa cả hai điều kiện.

**Vì sao các phương án còn lại sai?**
- **A:** `and` yêu cầu một giá trị đúng/sai duy nhất cho cả Series, nên thường gây lỗi “truth value of a Series is ambiguous”. Nó không kết hợp từng phần tử.
- **C:** Dấu phẩy tạo cách truy cập bằng tuple, không tạo phép AND giữa hai mặt nạ dòng của DataFrame thông thường.
- **D:** `or` gặp vấn đề boolean Series tương tự `and`; ngoài ra `where` giữ hình dạng và thay giá trị không thỏa bằng missing thay vì trực tiếp lọc bỏ dòng.

**Ghi nhớ:** Trong pandas: AND dùng `&`, OR dùng `|`, NOT dùng `~`; đặt ngoặc quanh từng điều kiện.

### Câu 7 — Visualization
Bạn cần kiểm tra xem hai feature số có quan hệ gần tuyến tính hay không. Biểu đồ nào hữu ích nhất?

A. Pie chart
B. Scatter plot
C. Bar chart đếm class
D. Confusion matrix

**Đáp án: B.** Scatter plot đặt hai feature lên hai trục và biểu diễn mỗi mẫu thành một điểm. Đám điểm gần một đường thẳng gợi ý quan hệ tuyến tính; độ phân tán, dạng cong và các điểm ngoại lai cũng dễ quan sát.

**Vì sao các phương án còn lại sai?**
- **A:** Pie chart biểu diễn tỷ trọng các nhóm trong một tổng, không thể hiện quan hệ ghép cặp giữa hai biến số.
- **C:** Bar chart đếm class giúp xem phân bố nhãn, nhưng không giữ các cặp giá trị của hai feature để đánh giá tuyến tính.
- **D:** Confusion matrix so sánh nhãn thật với nhãn dự đoán của classifier; đây không phải công cụ chính để khảo sát hai feature liên tục.

**Ghi nhớ:** Scatter giúp quan sát tương quan; ngay cả quan hệ rất rõ cũng chưa đủ kết luận nhân quả.

### Câu 8 — scikit-learn: tránh leakage
Pipeline chuẩn hóa + Logistic Regression nào an toàn nhất khi cross-validation?

A. Standardize toàn bộ `X`, sau đó mới cross-validation
B. Fit scaler trên cả train và validation mỗi fold
C. Dùng `Pipeline([('scaler', StandardScaler()), ('model', LogisticRegression())])` rồi cross-validation pipeline
D. Bỏ chuẩn hóa vì Logistic Regression không bị ảnh hưởng bởi scale

**Đáp án: C.** `Pipeline` đảm bảo scaler chỉ fit trên phần train của từng fold, tránh data leakage. Mean và độ lệch chuẩn được học lại trong mỗi fold; validation chỉ được `transform` bằng các thống kê đó. Mỗi bước của `Pipeline` phải có cặp `(tên, estimator)` như trong phương án C.

**Vì sao các phương án còn lại sai?**
- **A:** Chuẩn hóa trước CV để validation tham gia tính mean/std, làm quá trình huấn luyện gián tiếp biết phân phối phần dữ liệu cần đánh giá.
- **B:** Gộp train và validation để fit scaler trong mỗi fold vẫn là leakage. Validation không được tham gia bất kỳ bước học thống kê nào.
- **D:** Logistic Regression có regularization hoặc solver dựa gradient thường chịu ảnh hưởng của scale. Bỏ scaling cũng không thay thế được một pipeline đánh giá đúng.

**Ghi nhớ:** Đặt mọi bước có `fit` vào pipeline trước khi cross-validation, kể cả imputation, PCA và feature selection.

### Câu 9 — PyTorch: gradient
Trong vòng lặp train chuẩn, vì sao thường gọi `optimizer.zero_grad()` trước `loss.backward()`?

A. Vì PyTorch không hỗ trợ gradient âm
B. Vì gradient mặc định được cộng dồn qua các lần backward
C. Để chuyển model sang GPU
D. Để đặt loss về 0

**Đáp án: B.** PyTorch tích lũy gradient vào `.grad` qua các lần `backward()`. Nếu mỗi batch là một bước cập nhật độc lập, cần xóa gradient cũ để bước hiện tại dùng đúng gradient của batch hiện tại. Không xóa sẽ vô tình cộng đóng góp từ các batch trước.

**Vì sao các phương án còn lại sai?**
- **A:** Gradient âm hoàn toàn hợp lệ, biểu thị hướng thay đổi loss theo tham số. `zero_grad()` không kiểm tra hay loại bỏ dấu âm.
- **C:** Chuyển thiết bị dùng `.to(device)` cho model và tensor. Xóa gradient không di chuyển dữ liệu sang GPU.
- **D:** Loss là một tensor tính từ forward pass. `zero_grad()` tác động bộ đệm gradient của tham số, không đặt giá trị loss về 0.

**Ghi nhớ:** Có thể cố ý giữ gradient để gradient accumulation; khi đó chỉ xóa sau mỗi nhóm mini-batch được thiết kế trước.

### Câu 10 — PyTorch: eval mode
Khi đánh giá model có Dropout và BatchNorm, đoạn nào phù hợp nhất?

A. `model.train();` rồi dự đoán bình thường
B. `model.eval();` và dùng `torch.no_grad()`
C. Chỉ `torch.no_grad()` là đủ trong mọi trường hợp
D. Chỉ `model.eval()` là đủ để không tạo computational graph

**Đáp án: B.** `eval()` đổi hành vi Dropout/BatchNorm; `no_grad()` ngăn lưu gradient không cần thiết. Với cấu hình BatchNorm thông thường, eval dùng running statistics; Dropout ngừng lấy mặt nạ ngẫu nhiên. Hai thao tác giải quyết hai vấn đề khác nhau và thường cần dùng cùng nhau khi đánh giá.

**Vì sao các phương án còn lại sai?**
- **A:** `train()` giữ Dropout ngẫu nhiên và BatchNorm dùng thống kê batch, nên kết quả không phản ánh đúng chế độ suy luận thông thường.
- **C:** `no_grad()` chỉ tắt ghi nhận phép tính cho autograd. Nó không đổi cờ training của module, nên Dropout vẫn có thể tiếp tục drop.
- **D:** `eval()` không tắt autograd. Nếu tham số cần gradient, forward vẫn có thể tạo computational graph và tốn thêm bộ nhớ.

**Ghi nhớ:** Chế độ module (`train/eval`) và chế độ gradient (`no_grad`) là hai cơ chế độc lập.

### Câu 11 — CPU/GPU
Một MLP rất nhỏ dự đoán 20 mẫu. Chuyển sang GPU lại chậm hơn CPU. Giải thích hợp lý nhất?

A. GPU không thể chạy neural network nhỏ
B. Overhead khởi tạo/kernel và truyền dữ liệu có thể lớn hơn lợi ích tính song song
C. CPU luôn nhanh hơn GPU với deep learning
D. GPU chỉ dùng được cho ảnh

**Đáp án: B.** GPU phát huy lợi thế khi workload đủ lớn; bài nhỏ có thể bị overhead chi phối. Khởi tạo môi trường, truyền dữ liệu và khởi chạy kernel đều tốn thời gian. Với MLP nhỏ và 20 mẫu, phần tính toán tiết kiệm được có thể ít hơn các chi phí này.

**Vì sao các phương án còn lại sai?**
- **A:** GPU vẫn chạy được mạng nhỏ. Vấn đề là hiệu quả thời gian của cả pipeline, không phải khả năng thực thi.
- **C:** CPU không luôn nhanh hơn. Khi batch và lượng phép toán đủ lớn, GPU thường tận dụng song song tốt hơn.
- **D:** GPU xử lý tensor cho nhiều tác vụ, gồm ảnh, văn bản, âm thanh và dữ liệu bảng; nó không bị giới hạn ở ảnh.

**Ghi nhớ:** Đo thời gian có warmup và đồng bộ GPU; phân biệt thời gian tính toán với thời gian truyền dữ liệu.

### Câu 12 — Linear Regression: loại bài toán
Bạn dự đoán giá nhà là một số thực. Baseline phù hợp nhất trong các lựa chọn sau?

A. Linear Regression
B. Logistic Regression
C. K-Means
D. DBSCAN

**Đáp án: A.** Giá nhà là target liên tục nên đây là bài toán regression. Linear Regression học hàm dạng `y_hat = w·x + b`, cho phép dự đoán một mức giá thực và làm baseline dễ đánh giá bằng MAE hoặc RMSE.

**Vì sao các phương án còn lại sai?**
- **B:** Logistic Regression thường dự đoán xác suất của các lớp rời rạc, không trực tiếp dự đoán giá liên tục dù tên có chữ “Regression”.
- **C:** K-Means là phân cụm không giám sát, gom các mẫu gần nhau mà không học ánh xạ từ feature tới giá đã gán nhãn.
- **D:** DBSCAN cũng là phân cụm, dựa trên mật độ và có thể đánh dấu nhiễu; nó không phải baseline hồi quy có giám sát.

**Ghi nhớ:** Chọn loại mô hình từ bản chất target trước: số liên tục, nhãn rời rạc hay dữ liệu không nhãn.

### Câu 13 — Linear Regression: outlier
Dataset regression có vài target lỗi cực lớn. Muốn loss ít nhạy hơn với các lỗi cực lớn so với MSE, nên thử:

A. MAE
B. Cross-entropy
C. Accuracy
D. Softmax

**Đáp án: A.** MAE tính trung bình `|y - y_hat|`, còn MSE dùng `(y - y_hat)^2`. Sai số tăng từ 10 lên 100 khiến đóng góp MAE tăng 10 lần nhưng MSE tăng 100 lần, nên MAE giảm sự chi phối tương đối của target lỗi cực lớn.

**Vì sao các phương án còn lại sai?**
- **B:** Cross-entropy phù hợp khi target là nhãn hoặc phân phối xác suất, không phải thay thế trực tiếp cho loss dự đoán giá trị thực trong câu này.
- **C:** Accuracy đo tỷ lệ nhãn dự đoán đúng. Nó không đánh giá độ lệch giữa hai giá trị liên tục theo cách cần cho regression.
- **D:** Softmax biến logits thành phân phối xác suất. Đây là phép biến đổi đầu ra, không phải loss giảm tác động outlier của hồi quy.

**Ghi nhớ:** MAE bền vững hơn với sai số lớn, nhưng vẫn cần kiểm tra và xử lý các nhãn bị lỗi.

### Câu 14 — Linear Regression: dấu hiệu không phù hợp
Residual plot cho thấy residual có dạng cong chữ U rõ rệt theo prediction. Điều này gợi ý gì?

A. Quan hệ tuyến tính đã mô tả rất tốt dữ liệu
B. Có cấu trúc phi tuyến mà mô hình tuyến tính chưa bắt được
C. Chỉ cần tăng batch size
D. Chắc chắn có data leakage

**Đáp án: B.** Residual là chênh lệch giữa quan sát và dự đoán. Dạng chữ U cho thấy mô hình sai có hệ thống ở các vùng prediction khác nhau, gợi ý thiếu thành phần phi tuyến như bậc hai. Có thể thử feature phi tuyến hoặc mô hình linh hoạt hơn và đánh giá trên validation.

**Vì sao các phương án còn lại sai?**
- **A:** Nếu dạng hàm phù hợp, ta kỳ vọng residual phân tán quanh 0 mà không còn xu hướng cong rõ rệt.
- **C:** Batch size ảnh hưởng ước lượng gradient và tài nguyên, nhưng không bổ sung quan hệ phi tuyến còn thiếu vào một mô hình tuyến tính.
- **D:** Residual cong không đủ chứng minh leakage. Leakage liên quan thông tin không hợp lệ đi vào huấn luyện và cần kiểm tra pipeline riêng.

**Ghi nhớ:** Residual còn cấu trúc là dấu hiệu cần xem lại giả định mô hình, không chỉ chỉnh optimizer.

### Câu 15 — Logistic Regression
Logistic Regression thường dùng hàm nào để biến logit nhị phân thành xác suất?

A. ReLU
B. Sigmoid
C. Tanh
D. Max pooling

**Đáp án: B.** Sigmoid có công thức `p = 1 / (1 + exp(-z))`, biến logit thực `z` thành số trong `(0,1)`. Với `z=0`, xác suất là 0.5; logit tăng thì xác suất lớp dương tăng, phù hợp binary classification.

**Vì sao các phương án còn lại sai?**
- **A:** ReLU trả về `max(0,z)` và không có chặn trên, nên đầu ra có thể lớn hơn 1 và không tự là xác suất.
- **C:** Tanh trả về giá trị trong `(-1,1)`, có thể âm. Muốn dùng làm xác suất phải có biến đổi bổ sung.
- **D:** Max pooling chọn giá trị lớn nhất trong một vùng tensor, không ánh xạ logit thành xác suất nhị phân.

**Ghi nhớ:** Một logit nhị phân thường đi với sigmoid; nhiều lớp loại trừ nhau thường dùng softmax.

### Câu 16 — Threshold
Một hệ thống phát hiện bệnh cần ưu tiên bỏ sót ít ca dương tính nhất. Nếu model xuất probability, điều chỉnh nào thường tăng Recall?

A. Tăng threshold dự đoán dương
B. Giảm threshold dự đoán dương
C. Chuyển sang Accuracy làm threshold
D. Tăng số class

**Đáp án: B.** Recall bằng `TP/(TP+FN)`, đo tỷ lệ ca dương tính thật được phát hiện. Giảm threshold làm nhiều mẫu được dự đoán dương hơn; trên tập điểm số cố định, FN không tăng và Recall không giảm. Đổi lại, FP có thể tăng nên cần đánh giá cả Precision.

**Vì sao các phương án còn lại sai?**
- **A:** Tăng threshold làm điều kiện dự đoán dương khắt khe hơn, thường bỏ sót thêm ca dương và giảm Recall.
- **C:** Accuracy là metric tổng hợp, không phải ngưỡng áp lên xác suất của từng mẫu. Nó cũng có thể che lấp việc bỏ sót lớp hiếm.
- **D:** Tăng số class thay đổi định nghĩa bài toán, không phải cách điều chỉnh ngưỡng phát hiện ca dương của classifier hiện tại.

**Ghi nhớ:** Chọn threshold trên validation theo mục tiêu và chi phí lỗi; tăng Recall có thể phải chấp nhận nhiều báo động giả.

### Câu 17 — Logistic Regression và scaling
Hai feature có scale lần lượt khoảng `0–1` và `0–1,000,000`. Với Logistic Regression có regularization và solver dựa gradient, nên làm gì?

A. Standardize feature
B. One-hot cả hai feature
C. Bỏ feature nhỏ
D. Không cần làm gì vì scale không bao giờ ảnh hưởng optimizer

**Đáp án: A.** Standardization đưa các feature về thang đo tương đương, thường bằng `(x - mean)/std`. Nhờ đó gradient ít bị chênh lệch độ lớn do đơn vị đo, và penalty trên hệ số bớt ưu ái feature có giá trị số rất lớn. Scaler phải được fit trên train.

**Vì sao các phương án còn lại sai?**
- **B:** One-hot dành cho biến danh mục. Mã hóa từng giá trị số liên tục thành cột riêng làm mất cấu trúc số và có thể tạo quá nhiều cột.
- **C:** Feature có độ lớn nhỏ vẫn có thể dự báo rất tốt. Đơn vị đo không cho biết feature có hữu ích hay không.
- **D:** Scale có thể làm bài toán tối ưu kém điều kiện và thay đổi tác động của regularization. Vì vậy khẳng định “không bao giờ ảnh hưởng” là sai.

**Ghi nhớ:** Độ lớn số học khác tầm quan trọng dự báo; scaling xử lý đơn vị đo, không thay thế feature selection.

### Câu 18 — L1 vs L2
Bạn có 5,000 feature thưa, nghi rằng chỉ vài chục feature thực sự hữu ích. Regularization nào có xu hướng đưa nhiều hệ số về đúng 0 hơn?

A. L1
B. L2
C. Dropout inference
D. BatchNorm

**Đáp án: A.** L1 thêm penalty tỷ lệ với `sum(|w_j|)`, có xu hướng đưa một số hệ số về đúng 0. Điều này tạo nghiệm sparse và hỗ trợ chọn feature khi nhiều cột ít hữu ích. Mức penalty vẫn phải chọn bằng validation để tránh loại nhầm tín hiệu.

**Vì sao các phương án còn lại sai?**
- **B:** L2 dùng `sum(w_j^2)`, thường co nhiều hệ số nhỏ lại nhưng không tạo nhiều số 0 chính xác như L1.
- **C:** Dropout chuẩn hoạt động khi train và tắt khi inference. Nó tác động activation, không trực tiếp tạo tập hệ số sparse để chọn feature.
- **D:** BatchNorm chuẩn hóa activation và có thể hỗ trợ tối ưu; nó không phải penalty khuyến khích hệ số bằng 0.

**Ghi nhớ:** L1 thường gắn với sparsity; L2 thường gắn với co nhỏ trọng số một cách phân tán.

### Câu 19 — Regularization strength
Khi tăng regularization quá mạnh, cả train và validation accuracy cùng giảm nhiều. Đây có thể là:

A. Underfitting do model bị ràng buộc quá mạnh
B. Data leakage
C. Overfitting nặng hơn
D. Chắc chắn do GPU

**Đáp án: A.** Regularization buộc mô hình ưu tiên nghiệm đơn giản hơn. Nếu quá mạnh, nó có thể bỏ cả quy luật hữu ích, làm train và validation cùng giảm. Đây là dấu hiệu tăng bias hoặc underfitting; nên thử giảm regularization và xem đường cong học.

**Vì sao các phương án còn lại sai?**
- **B:** Leakage là dữ liệu đánh giá hoặc thông tin tương lai lọt vào huấn luyện. Việc tăng penalty không tự tạo ra hiện tượng này.
- **C:** Overfitting điển hình là train tốt nhưng validation kém. Cả hai cùng giảm khi ràng buộc tăng phù hợp underfitting hơn.
- **D:** Không có bằng chứng về lỗi GPU. Thiết bị tính toán không giải thích trực tiếp mối liên hệ giữa penalty và giảm khả năng fit.

**Ghi nhớ:** Regularization có đánh đổi bias–variance; mạnh hơn không đồng nghĩa với tổng quát hóa tốt hơn trong mọi trường hợp.

### Câu 20 — L2
Tác dụng điển hình của L2 là:

A. Khuyến khích nhiều weight lớn hơn
B. Co nhỏ weight, giảm độ phức tạp hiệu dụng
C. Tạo thêm feature mới
D. Thay loss classification bằng regression loss

**Đáp án: B.** L2 cộng một hạng như `lambda * sum(w_j^2)` vào loss. Weight lớn chịu phạt mạnh hơn, nên nghiệm tối ưu thường có hệ số nhỏ hơn và bớt nhạy với nhiễu. Penalty này bổ sung vào loss chính, không đổi loại bài toán.

**Vì sao các phương án còn lại sai?**
- **A:** L2 làm weight lớn đắt hơn trong mục tiêu tối ưu; khuyến khích weight lớn là ngược tác dụng của nó.
- **C:** L2 chỉ ràng buộc các tham số hiện có. Tạo feature mới cần bước feature engineering hoặc biến đổi biểu diễn riêng.
- **D:** Classification vẫn có thể dùng cross-entropy cộng L2. Regularization không biến nhãn rời rạc thành target hồi quy hay thay loss chính bằng MSE.

**Ghi nhớ:** Phân biệt loss đo lỗi dự đoán với regularization ràng buộc độ phức tạp mô hình.

### Câu 21 — K-NN và scaling
Dùng K-NN trên hai feature: tuổi `18–80`, thu nhập `0–2,000,000`. Nếu không scale, điều gì dễ xảy ra?

A. Khoảng cách bị chi phối bởi thu nhập
B. K-NN tự động chuẩn hóa feature
C. Tuổi luôn chi phối khoảng cách
D. Không ảnh hưởng vì K-NN dùng cây quyết định

**Đáp án: A.** K-NN chọn hàng xóm theo khoảng cách trong không gian feature. Với khoảng cách Euclidean, chênh lệch thu nhập hàng trăm nghìn khi bình phương sẽ lấn át chênh lệch tuổi vài chục. Kết quả có thể gần như chỉ phản ánh thu nhập, dù tuổi vẫn mang tín hiệu dự báo.

**Vì sao các phương án còn lại sai?**
- **B:** K-NN thông thường không tự fit scaler. Cần chủ động chuẩn hóa, tốt nhất đặt scaler và K-NN trong cùng pipeline.
- **C:** Tuổi có thang số nhỏ hơn nhiều, nên trong khoảng cách chưa chuẩn hóa nó thường bị thu nhập lấn át, không mặc nhiên chi phối.
- **D:** K-NN dự đoán từ các mẫu lân cận, không dùng quy tắc tách nhánh của Decision Tree. Cách chọn hàng xóm phụ thuộc trực tiếp scale.

**Ghi nhớ:** Với mô hình dựa khoảng cách, luôn kiểm tra đơn vị đo và fit scaling chỉ từ train.

### Câu 22 — K của K-NN
`k=1` đạt train accuracy gần 100% nhưng validation thấp; tăng `k` vừa phải làm validation tốt hơn. Giải thích hợp lý?

A. `k=1` có variance cao và dễ overfit nhiễu
B. `k=1` luôn underfit
C. `k` lớn hơn luôn tốt không giới hạn
D. K-NN không dùng nhãn

**Đáp án: A.** Với `k=1`, dự đoán phụ thuộc đúng một hàng xóm nên một điểm nhiễu có thể làm đổi nhãn cả vùng lân cận. Tăng `k` vừa phải lấy ý kiến nhiều mẫu hơn, làm biên quyết định mượt và giảm variance; validation tăng phù hợp cách giải thích này.

**Vì sao các phương án còn lại sai?**
- **B:** `k=1` thường rất linh hoạt và có thể ghi nhớ train. Train gần 100% nhưng validation thấp gợi ý overfit hơn underfit.
- **C:** Khi `k` quá lớn, các vùng khác lớp bị trộn; mô hình có thể nghiêng về lớp phổ biến và underfit.
- **D:** K-NN classification dùng nhãn của hàng xóm để bỏ phiếu. K-NN regression dùng giá trị target của họ để tổng hợp dự đoán.

**Ghi nhớ:** Chọn `k` bằng validation; `k` nhỏ thường variance cao, `k` lớn tăng mức làm trơn và bias.

### Câu 23 — K-NN ở chiều cao
K-NN suy giảm mạnh khi tăng từ 10 lên 10,000 feature thưa. Khái niệm liên quan nhất?

A. Curse of dimensionality
B. Teacher forcing
C. Mode collapse
D. Vanishing gradient

**Đáp án: A.** Trong không gian nhiều chiều, dữ liệu trở nên thưa và khái niệm “gần” có thể mất ý nghĩa khi nhiều feature nhiễu góp vào khoảng cách. K-NN cần nhiều dữ liệu hơn để tìm hàng xóm thực sự tương đồng; có thể thử chọn feature hoặc giảm chiều rồi đánh giá lại.

**Vì sao các phương án còn lại sai?**
- **B:** Teacher forcing là cách dùng token thật trước đó để huấn luyện mô hình sinh chuỗi, không phải hiện tượng suy giảm khoảng cách ở chiều cao.
- **C:** Mode collapse thuộc huấn luyện GAN, khi generator sinh ít kiểu mẫu, không mô tả lỗi chọn hàng xóm.
- **D:** Vanishing gradient liên quan đạo hàm nhỏ khi tối ưu mạng sâu. K-NN cơ bản không huấn luyện bằng backpropagation.

**Ghi nhớ:** Nhiều feature hơn không luôn tốt hơn; cần xem chất lượng biểu diễn và metric khoảng cách.

### Câu 24 — Decision Tree
Ưu điểm thực hành nào đúng về Decision Tree cơ bản?

A. Bắt buộc phải standardize feature
B. Có thể mô hình hóa quan hệ phi tuyến và interaction mà không cần scaling
C. Luôn generalize tốt nếu cây càng sâu
D. Chỉ dùng cho regression

**Đáp án: B.** Decision Tree chia không gian bằng các điều kiện như `x_j <= threshold`. Nhiều lần chia tạo được vùng dự đoán phi tuyến và tương tác giữa feature. Đổi thang tuyến tính của một feature thường chỉ đổi ngưỡng tương ứng, nên cây cơ bản ít cần scaling.

**Vì sao các phương án còn lại sai?**
- **A:** Standardization không phải yêu cầu bắt buộc của cây chia ngưỡng cơ bản, vì nó không so sánh khoảng cách Euclidean giữa các feature.
- **C:** Cây sâu có thể tạo leaf rất nhỏ và học cả nhiễu. Train tốt hơn không đảm bảo validation tốt hơn.
- **D:** Decision Tree có cả classifier và regressor. Loại target và tiêu chí chia quyết định biến thể cần dùng.

**Ghi nhớ:** Cây thường ít nhạy scale nhưng rất cần kiểm soát độ sâu và số mẫu trong leaf.

### Câu 25 — Overfitting cây
Một tree có depth 30 đạt train 100%, validation 72%. Tree depth 6 đạt train 90%, validation 84%. Chọn model nào hợp lý hơn?

A. Depth 30 vì train accuracy cao nhất
B. Depth 6 vì validation tốt hơn
C. Cả hai giống nhau
D. Không thể dùng validation để chọn model

**Đáp án: B.** Trên cùng validation đáng tin cậy, depth 6 đạt 84% thay vì 72%, nên là lựa chọn hợp lý hơn để dự đoán dữ liệu mới. Depth 30 đạt train 100% nhưng khoảng cách train–validation lớn, gợi ý cây đã học cả chi tiết không khái quát.

**Vì sao các phương án còn lại sai?**
- **A:** Train accuracy chỉ đo mức khớp dữ liệu đã học. Chọn theo train sẽ ưu ái mô hình phức tạp dù tổng quát hóa kém.
- **C:** Hai mô hình khác rõ về kết quả validation và độ phức tạp; không có căn cứ coi chúng tương đương.
- **D:** Validation được dành chính cho chọn hyperparameter. Test mới là tập cần giữ cho đánh giá cuối sau khi chọn xong.

**Ghi nhớ:** Chọn mô hình bằng validation/CV, rồi báo cáo hiệu năng cuối trên test chưa dùng để lựa chọn.

### Câu 26 — Tree hyperparameter
Muốn giảm việc cây tách các leaf rất nhỏ chứa 1–2 mẫu, hyperparameter nào trực tiếp hữu ích?

A. `min_samples_leaf`
B. Learning rate của Adam
C. Number of epochs
D. Tokenizer vocabulary size

**Đáp án: A.** `min_samples_leaf` đặt số mẫu tối thiểu trong mỗi leaf. Ví dụ đặt 5 sẽ không chấp nhận phép chia tạo leaf chỉ có 1–2 mẫu train. Điều này hạn chế dự đoán dựa trên nhóm quá nhỏ và thường giúp giảm variance.

**Vì sao các phương án còn lại sai?**
- **B:** Learning rate của Adam điều khiển bước tối ưu gradient. Decision Tree cơ bản không dùng Adam để xây các phép chia.
- **C:** Cây cơ bản được xây bằng tìm split, không qua các epoch của vòng lặp train mạng nơ-ron.
- **D:** Vocabulary size là tham số biểu diễn token trong NLP, không kiểm soát số mẫu rơi vào một leaf.

**Ghi nhớ:** `max_depth` giới hạn độ sâu; `min_samples_leaf` trực tiếp hạn chế các vùng dự đoán quá ít mẫu.

### Câu 27 — SVM: margin
Linear SVM chủ yếu tìm:

A. Tâm của từng cluster
B. Hyperplane phân tách với margin lớn
C. Trung bình target theo feature
D. Một cây nhiều nhánh

**Đáp án: B.** Linear SVM tìm siêu phẳng `w·x + b = 0` để phân tách lớp với margin lớn. Trong soft-margin SVM, mục tiêu cân bằng độ rộng margin với mức vi phạm phân loại; các support vectors ảnh hưởng quan trọng tới nghiệm.

**Vì sao các phương án còn lại sai?**
- **A:** Tìm tâm cluster là mục tiêu điển hình của K-Means, không phải tối ưu ranh giới có giám sát của SVM classification.
- **C:** Trung bình target theo feature không mô tả mục tiêu maximum-margin. Câu hỏi đang nói về phân loại, không phải dự báo giá trị trung bình.
- **D:** Linear SVM dùng một hàm quyết định tuyến tính, không xây cấu trúc nhánh và leaf như Decision Tree.

**Ghi nhớ:** Từ khóa của SVM là margin, support vectors, hệ số `C` và kernel khi cần biên phi tuyến.

### Câu 28 — SVM: C
Khi giảm `C` trong soft-margin SVM, xu hướng chung là:

A. Phạt lỗi ít hơn, cho margin mềm/rộng hơn và regularization mạnh hơn
B. Phạt lỗi mạnh hơn tuyệt đối và margin luôn hẹp hơn
C. Không ảnh hưởng model
D. Chuyển SVM thành K-Means

**Đáp án: A.** Một dạng mục tiêu soft-margin là `0.5*||w||^2 + C*sum(xi)`, với `xi` đo vi phạm margin. Giảm `C` làm chi phí vi phạm tương đối nhỏ hơn so với penalty trọng số, nên mô hình chấp nhận nhiều vi phạm hơn để ưu tiên nghiệm được regularize mạnh hơn.

**Vì sao các phương án còn lại sai?**
- **B:** Tăng `C` mới làm vi phạm bị phạt nặng hơn. Quan hệ giữa `C` và margin là xu hướng tối ưu, không phải bảo đảm tuyệt đối cho mọi dữ liệu.
- **C:** `C` là hyperparameter quan trọng và có thể thay đổi biên phân tách cũng như trade-off train–validation.
- **D:** SVM vẫn là thuật toán margin có giám sát. Đổi `C` không biến mục tiêu thành phân cụm centroid của K-Means.

**Ghi nhớ:** Với SVM, `C` nhỏ thường tương ứng regularization mạnh; cần tuning cùng scaling và kernel.

### Câu 29 — SVM: kernel
Dữ liệu hai lớp tạo biên hình vòng tròn và linear SVM rất tệ. Bước thử hợp lý?

A. RBF kernel SVM sau khi scale feature
B. Bỏ nhãn rồi dùng PCA làm classifier
C. Tăng threshold sigmoid
D. Chỉ tăng số epoch của linear SVM vô hạn

**Đáp án: A.** RBF kernel biểu diễn mức tương đồng phi tuyến theo khoảng cách, cho phép SVM tạo ranh giới cong thay vì một đường thẳng. Scale feature trước giúp khoảng cách có ý nghĩa; nên chọn `C` và `gamma` bằng validation, vì kernel phi tuyến vẫn có thể overfit.

**Vì sao các phương án còn lại sai?**
- **B:** PCA không dùng nhãn và không tự là classifier. Hướng phương sai lớn nhất cũng không nhất thiết tách được hai lớp.
- **C:** Đổi threshold không bổ sung khả năng biểu diễn một biên vòng tròn cho linear SVM; sigmoid cũng không phải lời giải chính ở đây.
- **D:** Thêm vòng tối ưu chỉ giúp tìm nghiệm của cùng họ mô hình tuyến tính, không biến một siêu phẳng thành đường tròn.

**Ghi nhớ:** Phân biệt lỗi tối ưu với thiếu khả năng biểu diễn; đổi kernel có thể xử lý vấn đề thứ hai.

### Câu 30 — Bagging
Bagging thường giúp chủ yếu bằng cách:

A. Huấn luyện nhiều model độc lập trên bootstrap samples rồi tổng hợp để giảm variance
B. Huấn luyện model sau bắt buộc sửa residual model trước
C. Giảm số feature về 2 chiều
D. Chỉ dùng một cây rất sâu

**Đáp án: A.** Bagging lấy nhiều bootstrap samples, huấn luyện các mô hình riêng rồi tổng hợp bằng voting hoặc averaging. Khi sai số của các mô hình không quá tương quan, tổng hợp làm giảm dao động so với một mô hình đơn, đặc biệt hữu ích với base learner variance cao như cây sâu.

**Vì sao các phương án còn lại sai?**
- **B:** Huấn luyện tuần tự để sửa lỗi hoặc residual là đặc trưng của boosting, không phải cách xây các thành viên độc lập của bagging.
- **C:** Giảm feature xuống 2 chiều là biến đổi biểu diễn; bagging không bắt buộc giảm chiều hay tạo đồ thị 2D.
- **D:** Một cây sâu có thể là base learner nhưng chưa tạo thành bagging. Cần nhiều mô hình và bước tổng hợp.

**Ghi nhớ:** Bagging giảm variance bằng tổng hợp nhiều mô hình; mức tương quan giữa chúng quyết định lợi ích.

### Câu 31 — Random Forest
Điểm khác quan trọng của Random Forest so với bagging tree đơn thuần là:

A. Mỗi split thường chỉ xem một tập con ngẫu nhiên feature
B. Không dùng bootstrap
C. Chỉ dùng một tree
D. Không thể classification

**Đáp án: A.** Random Forest thêm tính ngẫu nhiên ở tập feature được xét tại mỗi split. Nhờ vậy, một feature mạnh không khiến mọi cây luôn chia giống nhau; các cây bớt tương quan và việc tổng hợp có thể giảm variance hiệu quả hơn bagging tree đơn thuần.

**Vì sao các phương án còn lại sai?**
- **B:** Random Forest thông thường có thể dùng bootstrap và nhiều triển khai bật mặc định. Không dùng bootstrap không phải khác biệt định nghĩa ở câu này.
- **C:** “Forest” gồm nhiều cây rồi tổng hợp dự đoán. Một cây riêng không tạo ra cơ chế ensemble đó.
- **D:** Random Forest hỗ trợ cả classification và regression; giới hạn chỉ một loại tác vụ là sai.

**Ghi nhớ:** Random Forest kết hợp tổng hợp nhiều cây với chọn ngẫu nhiên feature để tăng đa dạng giữa các cây.

### Câu 32 — Boosting
Trong boosting, các base learners thường được huấn luyện:

A. Hoàn toàn độc lập không liên hệ
B. Tuần tự, model sau tập trung sửa sai của ensemble trước
C. Chỉ trên test set
D. Không cần target

**Đáp án: B.** Boosting xây ensemble theo từng bước: learner mới được chọn để cải thiện sai số của ensemble hiện tại. AdaBoost điều chỉnh trọng số mẫu; Gradient Boosting thường fit theo hướng âm gradient của loss. Các thành viên vì vậy có quan hệ phụ thuộc tuần tự.

**Vì sao các phương án còn lại sai?**
- **A:** Huấn luyện các thành viên độc lập phù hợp bagging hơn. Boosting dùng kết quả ensemble trước để quyết định bước học tiếp.
- **C:** Test phải giữ để đánh giá cuối, không được dùng làm dữ liệu huấn luyện các learner.
- **D:** Boosting cho classification/regression dùng target để tính loss hoặc sai số. Không có target thì không thực hiện quy trình có giám sát đang nói tới.

**Ghi nhớ:** Bagging thường tổng hợp song song; boosting cải thiện mô hình tuần tự theo mục tiêu loss.

### Câu 33 — Ensemble size
Random Forest tăng từ 200 lên 2000 cây: train tăng 0.2%, validation không đổi, thời gian tăng gần 10 lần. Quyết định tốt nhất?

A. Giữ 2000 vì nhiều cây luôn tốt hơn
B. Chọn khoảng 200 nếu validation đã bão hòa và chi phí quan trọng
C. Tăng lên 20,000 chắc chắn cải thiện
D. Chuyển validation thành train

**Đáp án: B.** Validation không tăng cho thấy 2000 cây chưa đem lại lợi ích dự báo được quan sát, trong khi chi phí gần gấp 10. Nếu tài nguyên quan trọng, khoảng 200 cây là lựa chọn hợp lý; có thể kiểm tra độ ổn định qua các lần chia trước khi chốt.

**Vì sao các phương án còn lại sai?**
- **A:** Nhiều cây có thể giúp ổn định dự đoán nhưng lợi ích giảm dần. Không nên bỏ qua mức tăng thời gian khi validation đã bão hòa.
- **C:** Tăng tiếp số cây không bảo đảm cải thiện; nhiễu, feature hoặc giới hạn base learner có thể mới là nút thắt.
- **D:** Đưa validation vào train trong lúc còn lựa chọn mô hình làm mất phép đo độc lập cần cho việc so sánh.

**Ghi nhớ:** Chọn cấu hình theo cả chất lượng validation và chi phí train/inference, không chỉ train accuracy.

### Câu 34 — K-Means: scale
Bạn cluster dữ liệu với một feature đo mét và một feature đo milimét nhưng cùng ý nghĩa độ lớn. Trước K-Means nên:

A. Standardize/normalize phù hợp
B. One-hot cả hai
C. Chỉ dùng feature có số lớn hơn
D. Không cần vì K-Means không dùng khoảng cách

**Đáp án: A.** K-Means tối ưu tổng khoảng cách Euclidean bình phương tới centroid. Chỉ đổi đơn vị từ mét sang milimét đã nhân giá trị số lên 1000 và đóng góp bình phương lên một triệu. Chuẩn hóa hoặc quy đổi đơn vị phù hợp tránh việc đơn vị đo tự quyết định cluster.

**Vì sao các phương án còn lại sai?**
- **B:** One-hot dành cho danh mục, không phải cách thông thường để làm hai feature đo đại lượng liên tục có scale tương đương.
- **C:** Giá trị số lớn hơn không đồng nghĩa với thông tin hữu ích hơn; lựa chọn này còn củng cố thiên lệch do đơn vị đo.
- **D:** Khoảng cách tới centroid nằm trực tiếp trong mục tiêu K-Means. Vì vậy scale có thể thay đổi cả việc gán cluster.

**Ghi nhớ:** Trước clustering dựa khoảng cách, xem lại đơn vị, scale và mức quan trọng mong muốn của từng feature.

### Câu 35 — K-Means: hình dạng cluster
Dữ liệu có hai cluster hình “hai mặt trăng” phi lồi. K-Means phân cụm kém. Thuật toán nào có khả năng phù hợp hơn nếu mật độ tách rõ?

A. DBSCAN
B. Linear Regression
C. Logistic Regression
D. PCA rồi luôn chắc chắn đúng

**Đáp án: A.** DBSCAN nối các vùng có mật độ đủ cao thay vì ép mỗi cluster quanh một centroid. Với hai mặt trăng tách biệt về mật độ, nó có thể lần theo hình cong và xem vùng thưa là noise. Kết quả vẫn phụ thuộc `eps`, `min_samples` và scaling.

**Vì sao các phương án còn lại sai?**
- **B:** Linear Regression dự đoán target liên tục có giám sát, không trực tiếp chia dữ liệu không nhãn thành hai cụm cong.
- **C:** Logistic Regression cần nhãn để học phân loại. Bản tuyến tính cũng không tự giải quyết hình học hai mặt trăng.
- **D:** PCA là phép chiếu tuyến tính giữ phương sai, không đảm bảo biến cụm phi lồi thành cụm hình cầu dễ cho K-Means.

**Ghi nhớ:** Chọn clustering theo hình học và mật độ dữ liệu; không có thuật toán luôn thắng cho mọi cấu trúc.

### Câu 36 — K-Means: outlier
Một vài outlier rất xa làm centroid bị kéo lệch. Nguyên nhân chính?

A. K-Means tối ưu khoảng cách bình phương tới centroid nên nhạy outlier
B. K-Means không dùng khoảng cách
C. Centroid luôn là median
D. K-Means chỉ dùng nhãn

**Đáp án: A.** K-Means tối thiểu hóa `sum(||x - centroid||^2)`. Centroid tối ưu của một nhóm là mean, nên một điểm rất xa vừa làm chi phí bình phương lớn vừa kéo mean về phía nó. Đây là lý do cần xem xét outlier trước khi diễn giải cluster.

**Vì sao các phương án còn lại sai?**
- **B:** Khoảng cách là thành phần cốt lõi trong cả bước gán điểm cho cluster và mục tiêu tối ưu K-Means.
- **C:** Centroid K-Means là mean theo từng chiều, không phải median. Các phương pháp dựa median hoặc medoid là thuật toán khác.
- **D:** K-Means không cần nhãn lớp; nó dùng vị trí feature để phân cụm, nên nhãn không giải thích việc centroid bị kéo.

**Ghi nhớ:** Mean và bình phương khoảng cách đều nhạy với điểm cực đoan; cân nhắc xử lý outlier hoặc thuật toán bền vững hơn.

### Câu 37 — PCA
PCA chọn các hướng mới sao cho:

A. Tối đa hóa phương sai theo các component trực giao kế tiếp
B. Tối đa hóa accuracy có nhãn trực tiếp
C. Tối thiểu hóa số class
D. Tạo cluster theo density

**Đáp án: A.** PCA tìm hướng có phương sai lớn nhất của dữ liệu đã được center, rồi các hướng trực giao tiếp theo với phương sai còn lại lớn nhất. Giữ một số component đầu tạo biểu diễn ít chiều hơn, nhưng thông tin được giữ là phương sai chứ không trực tiếp là khả năng dự đoán nhãn.

**Vì sao các phương án còn lại sai?**
- **B:** PCA thông thường không dùng `y`, nên không trực tiếp tối đa classification accuracy. Hướng phương sai nhỏ vẫn có thể chứa tín hiệu phân lớp.
- **C:** Số class là thuộc tính target. Giảm số chiều feature không đồng nghĩa với gộp hay giảm số nhãn.
- **D:** Tạo cluster dựa mật độ là vai trò của các phương pháp như DBSCAN; PCA chỉ biến đổi tọa độ tuyến tính.

**Ghi nhớ:** PCA giữ hướng biến thiên mạnh, không bảo đảm giữ mọi thông tin liên quan tới target.

### Câu 38 — PCA và scaling
Feature A có variance khoảng 1, feature B có variance 1,000,000 chỉ vì đơn vị đo khác. Nếu PCA trực tiếp, điều gì dễ xảy ra?

A. Component bị chi phối bởi feature B
B. PCA tự động one-hot
C. PCA luôn chuẩn hóa về unit variance
D. Không bao giờ ảnh hưởng

**Đáp án: A.** PCA ưu tiên hướng có phương sai lớn. Nếu B có variance vượt trội chỉ vì đơn vị đo, các component đầu dễ nghiêng mạnh theo B thay vì phản ánh mức quan trọng thực tế. Standardization có thể phù hợp khi muốn các feature có cơ hội đóng góp tương đương.

**Vì sao các phương án còn lại sai?**
- **B:** PCA thực hiện biến đổi tuyến tính trên dữ liệu số, không tự chuyển feature thành các cột one-hot.
- **C:** PCA thông thường center dữ liệu nhưng không tự đưa từng feature về unit variance. Ngay cả whitening cũng không thay thế bước scaling đầu vào theo cách đó.
- **D:** Thay scale làm đổi ma trận covariance và có thể đổi hướng component; ảnh hưởng là một vấn đề thực hành quan trọng.

**Ghi nhớ:** Centering trừ mean; scaling còn điều chỉnh độ lớn. PCA cần xem xét cả hai theo ý nghĩa dữ liệu.

### Câu 39 — PCA leakage
Bạn muốn dùng PCA trước classifier và cross-validation. Cách đúng nhất?

A. Fit PCA trên toàn bộ data rồi CV classifier
B. Đặt PCA trong Pipeline để fit lại trên train fold mỗi lần
C. Fit PCA trên test set
D. PCA không thể gây leakage

**Đáp án: B.** PCA học mean và các hướng component từ dữ liệu. Đặt nó trong Pipeline giúp mỗi fold chỉ dùng train fold để học phép chiếu, rồi áp phép chiếu đó lên validation. Nhờ vậy điểm CV phản ánh cả bước giảm chiều trên dữ liệu chưa được quan sát.

**Vì sao các phương án còn lại sai?**
- **A:** Fit trên toàn bộ dữ liệu khiến validation ảnh hưởng tới hướng PCA trước khi được đánh giá, dù PCA không dùng nhãn.
- **C:** Test là tập giữ kín cho đánh giá cuối. Học component từ test làm thông tin của nó đi vào mô hình.
- **D:** Phương pháp không giám sát vẫn có thể gây leakage nếu fit trên dữ liệu ngoài train. Không dùng nhãn không đồng nghĩa không học thông tin.

**Ghi nhớ:** Ranh giới train–validation áp dụng cho mọi bước học từ dữ liệu, không chỉ classifier cuối.

### Câu 40 — t-SNE/UMAP
Trên bản đồ t-SNE 2D, hai cluster trông rất xa nhau. Kết luận nào an toàn nhất?

A. Khoảng cách 2D chính xác bằng khoảng cách toàn cục ở không gian gốc
B. Visualization cho thấy cấu trúc cục bộ có thể tách, nhưng không nên diễn giải quá mức khoảng cách toàn cục
C. Hai cluster chắc chắn là hai class đúng
D. t-SNE đã huấn luyện classifier

**Đáp án: B.** t-SNE cố giữ quan hệ lân cận khi đưa dữ liệu xuống ít chiều. Hình ảnh có thể gợi ý cấu trúc để khảo sát tiếp, nhưng khoảng cách giữa các cụm, diện tích cụm và khoảng trống 2D không phải bản sao chính xác của hình học ban đầu. Nên kiểm tra thêm tham số và dữ liệu gốc.

**Vì sao các phương án còn lại sai?**
- **A:** Giảm chiều phi tuyến không giữ nguyên mọi khoảng cách toàn cục. Hai cụm xa trên hình chưa chắc xa tương ứng trong không gian gốc.
- **C:** Cụm trực quan không chứng minh có hai class thật; cấu trúc có thể do nhiễu, batch hoặc lựa chọn tham số.
- **D:** t-SNE tạo embedding để trực quan hóa, không tự học quy tắc dự đoán nhãn như một classifier.

**Ghi nhớ:** Dùng t-SNE để đặt giả thuyết về cấu trúc, rồi kiểm chứng bằng dữ liệu và phép đánh giá phù hợp.

### Câu 41 — DBSCAN
Lợi thế đặc trưng của DBSCAN là:

A. Không cần chỉ định số cluster K trước và có thể đánh dấu noise
B. Luôn tốt hơn mọi thuật toán clustering
C. Chỉ tìm cluster hình cầu
D. Bắt buộc dữ liệu có nhãn

**Đáp án: A.** DBSCAN xác định các vùng đông điểm qua bán kính `eps` và ngưỡng `min_samples`, rồi mở rộng cluster từ các core points. Số cluster xuất hiện từ cấu trúc mật độ, không cần đặt K trước; các điểm không thuộc vùng mật độ đủ cao có thể được gán là noise.

**Vì sao các phương án còn lại sai?**
- **B:** DBSCAN nhạy với scale và tham số; dữ liệu có mật độ khác nhau hoặc nhiều chiều có thể gây khó khăn. Nó không luôn tốt nhất.
- **C:** Các cluster được nối theo mật độ nên có thể phi lồi, khác giả định cụm quanh centroid thường gặp ở K-Means.
- **D:** DBSCAN là không giám sát, không cần nhãn lớp thật để xác định cluster và noise.

**Ghi nhớ:** Không cần K không có nghĩa không cần tuning; `eps` và `min_samples` vẫn rất quan trọng.

### Câu 42 — Hierarchical Clustering
Output trực quan điển hình giúp xem quá trình gộp/tách cluster là:

A. Dendrogram
B. ROC curve
C. Precision-recall table
D. Learning-rate curve

**Đáp án: A.** Dendrogram là cây biểu diễn quan hệ phân cấp giữa các mẫu hoặc cụm. Trong agglomerative clustering, nó cho thấy các lần gộp và mức khoảng cách khi gộp; cắt cây ở một độ cao giúp hình dung cách chia dữ liệu thành nhiều cluster.

**Vì sao các phương án còn lại sai?**
- **B:** ROC mô tả TPR theo FPR của classifier khi thay threshold, không ghi lại lịch sử gộp cluster.
- **C:** Bảng Precision–Recall phục vụ đánh giá dự đoán có nhãn, không thể hiện cấu trúc cha–con giữa các cụm.
- **D:** Learning-rate curve mô tả giá trị learning rate theo bước train, không liên quan trực tiếp cây phân cấp.

**Ghi nhớ:** Chiều cao gộp trong dendrogram phụ thuộc metric và linkage; cần đọc cùng cấu hình thuật toán.

### Câu 43 — Spectral Clustering
Khi nào Spectral Clustering đáng cân nhắc hơn K-Means?

A. Cluster có cấu trúc phi lồi/phức tạp nhưng graph similarity thể hiện tốt
B. Dataset hàng trăm triệu mẫu và cần thuật toán cực nhẹ mặc định
C. Target liên tục
D. Chỉ có một feature constant

**Đáp án: A.** Spectral Clustering xây graph similarity giữa các mẫu, dùng các eigenvectors liên quan graph Laplacian để tạo biểu diễn rồi phân cụm. Nếu graph nối mạnh trong mỗi cụm và yếu giữa các cụm, phương pháp có thể xử lý hình dạng phi lồi tốt hơn K-Means trực tiếp.

**Vì sao các phương án còn lại sai?**
- **B:** Xây graph và giải bài toán eigenvectors có thể tốn bộ nhớ, tính toán. Đây không phải lựa chọn mặc định cực nhẹ cho hàng trăm triệu mẫu.
- **C:** Target liên tục gợi ý regression; Spectral Clustering là phương pháp phân cụm không giám sát, không trực tiếp dự đoán target đó.
- **D:** Một feature constant không chứa khoảng cách phân biệt hữu ích để tạo graph có cấu trúc cụm rõ.

**Ghi nhớ:** Spectral Clustering phụ thuộc chất lượng graph similarity và có chi phí mở rộng cần cân nhắc.

### Câu 44 — Accuracy trong dữ liệu mất cân bằng
Dataset có 99% class 0 và 1% class 1. Model luôn đoán 0 đạt 99% accuracy. Kết luận đúng nhất?

A. Model xuất sắc cho mọi mục tiêu
B. Accuracy có thể gây hiểu lầm; cần xem Recall/Precision/F1 cho class 1
C. Cần chuyển thành regression
D. Chắc chắn ROC-AUC = 1

**Đáp án: B.** Nếu có 1000 mẫu gồm 10 mẫu class 1, đoán toàn 0 vẫn đúng 990 mẫu nhưng bỏ sót cả 10 positive. Recall class 1 bằng 0; Precision không xác định theo công thức vì không có dự đoán positive và thường được phần mềm quy ước là 0.

**Vì sao các phương án còn lại sai?**
- **A:** Model không phát hiện được một positive nào, nên không thể coi là xuất sắc cho mục tiêu cần phát hiện class 1.
- **C:** Mất cân bằng không làm target rời rạc trở thành liên tục. Cần đổi cách đánh giá hoặc huấn luyện classification, không tự đổi bài toán.
- **D:** Accuracy tại một threshold không quyết định ROC-AUC. Nếu mọi mẫu có cùng score, AUC là 0.5, không phải 1.

**Ghi nhớ:** Luôn xem confusion matrix và metric của lớp quan trọng khi class distribution lệch mạnh.

### Câu 45 — Precision
TP = 80, FP = 20. Precision là:

A. 0.20
B. 0.80
C. 0.50
D. 4.00

**Đáp án: B.** Precision xét trong toàn bộ mẫu được dự đoán positive có bao nhiêu mẫu đúng: `TP/(TP+FP) = 80/(80+20) = 0.80`. Nghĩa là cứ 100 dự đoán positive thì có 80 đúng và 20 báo động giả.

**Vì sao các phương án còn lại sai?**
- **A:** `0.20 = FP/(TP+FP)` là tỷ lệ dự đoán positive sai, bù với Precision trong ví dụ này.
- **C:** 0.50 sẽ phù hợp khi TP bằng FP. Ở đây TP gấp 4 FP nên tỷ lệ đúng trong nhóm positive phải lớn hơn một nửa.
- **D:** `4.00 = TP/FP` là tỷ số hai số đếm, không phải Precision; metric này nằm trong `[0,1]` khi mẫu số dương.

**Ghi nhớ:** Precision hỏi “đã báo positive thì đáng tin bao nhiêu?”, nên mẫu số chứa FP, không phải FN.

### Câu 46 — Recall
TP = 80, FN = 40. Recall là:

A. 80/120 ≈ 0.667
B. 80/100 = 0.8
C. 40/120 ≈ 0.333
D. 1.5

**Đáp án: A.** Recall xét trên tất cả positive thật: `TP/(TP+FN) = 80/(80+40) = 2/3 ≈ 0.667`. Mô hình phát hiện 80 trong 120 ca positive và bỏ sót 40 ca, tương đương khoảng một phần ba.

**Vì sao các phương án còn lại sai?**
- **B:** Mẫu số 100 không được suy ra từ TP và FN đã cho. Recall phải chia cho tổng 120 positive thật.
- **C:** `40/120` là tỷ lệ bỏ sót, còn gọi false negative rate; nó bằng `1 - Recall` trong bài này.
- **D:** Recall là tỷ lệ trên tổng positive thật nên không thể lớn hơn 1. Giá trị 1.5 không hợp lệ.

**Ghi nhớ:** Recall hỏi “positive thật đã tìm được bao nhiêu?”, nên mẫu số chứa FN, không phải FP.

### Câu 47 — F1
Precision = 0.8, Recall = 0.5. F1 gần nhất là:

A. 0.65
B. 0.615
C. 0.4
D. 1.3

**Đáp án: B.** F1 là trung bình điều hòa của Precision và Recall: `2PR/(P+R)`. Thay `P=0.8`, `R=0.5` được `2*0.8*0.5/(0.8+0.5) = 0.8/1.3 ≈ 0.615`. Nó phạt sự chênh lệch giữa hai metric mạnh hơn trung bình cộng.

**Vì sao các phương án còn lại sai?**
- **A:** `0.65 = (0.8+0.5)/2` là trung bình cộng. F1 dùng trung bình điều hòa nên không tính theo công thức này.
- **C:** `0.4 = P*R` mới chỉ là tích của hai metric, thiếu hệ số 2 và phép chia cho `P+R`.
- **D:** `1.3 = P+R` là mẫu số trung gian, không phải kết quả. F1 hợp lệ phải nằm trong `[0,1]`.

**Ghi nhớ:** F1 cao đòi hỏi cả Precision lẫn Recall tương đối tốt; một metric quá thấp sẽ kéo F1 xuống.

### Câu 48 — Chọn metric theo mục tiêu
Hệ thống lọc email spam: đánh nhầm email quan trọng thành spam gây thiệt hại lớn. Với class “spam” là positive, nên ưu tiên:

A. Precision cao cho dự đoán spam
B. Recall spam bằng mọi giá
C. Train accuracy 100%
D. MSE

**Đáp án: A.** Với spam là positive, email hợp lệ bị chặn là false positive. Precision cao nghĩa là trong các email bị gắn spam, tỷ lệ spam thật cao, phù hợp mục tiêu tránh chặn nhầm. Vẫn cần theo dõi Recall và số lượng FP thực tế để tránh mô hình gần như không chặn gì.

**Vì sao các phương án còn lại sai?**
- **B:** Tối đa Recall bằng mọi giá có thể khiến hệ thống gắn spam cho quá nhiều email hợp lệ, trái chi phí sai lầm đã nêu.
- **C:** Train accuracy cao không chứng minh ít chặn nhầm trên dữ liệu mới, nhất là khi mất cân bằng và overfitting.
- **D:** MSE không trực tiếp biểu thị độ đáng tin của nhóm dự đoán spam; Precision và confusion matrix gắn với yêu cầu rõ hơn.

**Ghi nhớ:** Xác định positive và lỗi gây thiệt hại trước khi chọn metric; Precision cao không đồng nghĩa FP tuyệt đối bằng 0.

### Câu 49 — ROC curve
ROC curve biểu diễn:

A. Precision theo Recall
B. True Positive Rate theo False Positive Rate khi thay đổi threshold
C. Train loss theo epoch
D. Learning rate theo batch

**Đáp án: B.** ROC vẽ `TPR = TP/(TP+FN)` trên trục dọc và `FPR = FP/(FP+TN)` trên trục ngang qua nhiều threshold. Mỗi threshold tạo một điểm, thể hiện đánh đổi giữa phát hiện positive và báo nhầm negative.

**Vì sao các phương án còn lại sai?**
- **A:** Precision theo Recall là PR curve. Mẫu số của Precision khác mẫu số FPR, nên hai đồ thị cung cấp thông tin khác nhau.
- **C:** Train loss theo epoch là learning curve của quá trình tối ưu, không phải đường cong thay đổi threshold phân loại.
- **D:** Learning rate theo batch mô tả schedule của optimizer; nó không dùng TP, FP, TN, FN để tạo đường ROC.

**Ghi nhớ:** ROC dùng Recall/TPR và FPR; với lớp positive rất hiếm nên xem thêm PR curve.

### Câu 50 — Underfitting
Train accuracy 61%, validation 60%; tăng dữ liệu nhưng vẫn tương tự, model rất đơn giản. Chẩn đoán đầu tiên hợp lý?

A. Underfitting
B. Overfitting nặng
C. Data leakage chắc chắn
D. Validation tốt bất thường

**Đáp án: A.** Train 61% và validation 60% đều thấp trong bối cảnh bài toán, lại gần nhau; model rất đơn giản có thể chưa học được quy luật cần thiết. Thêm dữ liệu không khắc phục được giới hạn biểu diễn này. Có thể thử feature tốt hơn, tăng capacity hoặc giảm regularization nếu đang quá mạnh.

**Vì sao các phương án còn lại sai?**
- **B:** Overfitting nặng thường thể hiện train cao hơn validation rõ rệt. Ở đây mô hình còn khớp train kém.
- **C:** Các con số này không đủ chứng minh leakage. Cần kiểm tra nguồn feature và cách chia dữ liệu để kết luận.
- **D:** Validation 60% không vượt train và không có dấu hiệu tốt bất thường; nó cùng phản ánh mức học còn thấp.

**Ghi nhớ:** Chẩn đoán train/validation phải gắn baseline của bài toán; hai tập cùng kém thường gợi ý bias cao.

### Câu 51 — Overfitting
Train loss giảm đều về gần 0, validation loss giảm đến epoch 15 rồi tăng. Biện pháp phù hợp nhất trong số sau?

A. Early stopping quanh điểm validation tốt nhất
B. Tiếp tục train vô hạn
C. Xóa validation set
D. Tăng model size ngay lập tức

**Đáp án: A.** Sau khoảng epoch 15, mô hình tiếp tục giảm lỗi trên train nhưng chất lượng validation xấu đi, gợi ý đang học các chi tiết không khái quát. Early stopping theo dõi validation, dùng patience và khôi phục checkpoint có metric tốt nhất thay vì mặc định lấy epoch cuối.

**Vì sao các phương án còn lại sai?**
- **B:** Train tiếp vô hạn không bảo đảm cải thiện validation; khi đã overfit, khoảng cách giữa hai tập có thể tăng thêm.
- **C:** Xóa validation chỉ làm mất khả năng quan sát vấn đề, không thay đổi việc mô hình học nhiễu của train.
- **D:** Tăng model size ngay có thể tăng khả năng ghi nhớ và chưa xử lý nguyên nhân quan sát được. Cần đánh giá có kiểm soát.

**Ghi nhớ:** Dừng theo chất lượng dữ liệu chưa học và giữ checkpoint tốt nhất, không chỉ nhìn train loss giảm.

### Câu 52 — Hyperparameter tuning
Tập nào nên dùng để quyết định `max_depth`, `C`, learning rate hoặc số layer?

A. Validation set/CV
B. Test set liên tục
C. Chỉ train set
D. Không cần dữ liệu

**Đáp án: A.** Validation hoặc CV cho phép so sánh các cấu hình trên dữ liệu không dùng để fit tham số của lần huấn luyện tương ứng. Chọn hyperparameter xong mới dùng test để ước lượng hiệu năng cuối; việc này giảm thiên lệch do lựa chọn cấu hình theo chính tập đánh giá.

**Vì sao các phương án còn lại sai?**
- **B:** Xem test liên tục để chỉnh cấu hình khiến quá trình lựa chọn thích nghi với test, làm điểm báo cáo lạc quan hơn thực tế.
- **C:** Chọn chỉ theo train dễ ưu tiên mô hình ghi nhớ dữ liệu, không cho biết cấu hình nào tổng quát hóa tốt hơn.
- **D:** Có thể đặt giá trị ban đầu theo kinh nghiệm, nhưng quyết định cấu hình tốt cần bằng chứng đánh giá trên dữ liệu phù hợp.

**Ghi nhớ:** Tham số học trên train; hyperparameter chọn bằng validation/CV; test dành cho đánh giá cuối.

### Câu 53 — Cross-validation leakage
Bạn chạy 5-fold CV nhưng trước đó đã `SelectKBest.fit_transform(X, y)` trên toàn bộ dataset. Điểm CV cao bất thường. Sai ở đâu?

A. Feature selection đã dùng thông tin từ validation fold
B. 5-fold luôn sai
C. SelectKBest không thể dùng cho classification
D. Chỉ cần tăng số fold là hết leakage

**Đáp án: A.** `SelectKBest` dùng quan hệ giữa `X` và `y` để chọn feature. Fit trên toàn bộ dữ liệu khiến cả nhãn của validation fold góp phần quyết định cột được giữ, nên điểm CV không còn đánh giá một pipeline chưa thấy validation. Cần đặt selector trong Pipeline và fit lại ở từng fold.

**Vì sao các phương án còn lại sai?**
- **B:** 5-fold không tự sai; vấn đề là thứ tự fit feature selection so với việc tách fold, không phải số 5.
- **C:** SelectKBest dùng được cho classification khi chọn scoring function phù hợp, ví dụ `f_classif` hoặc `mutual_info_classif`.
- **D:** Tăng số fold vẫn để selector đã thấy toàn bộ nhãn. Chỉ đổi K không sửa được leakage trước bước CV.

**Ghi nhớ:** Feature selection có giám sát phải nằm trong từng fold; lựa chọn feature cũng là một bước học.

### Câu 54 — Feature engineering: time series
Dự đoán nhu cầu giờ tiếp theo từ chuỗi lịch sử. Feature nào hợp lệ?

A. Mean của 24 giờ trước thời điểm dự đoán
B. Mean của 24 giờ sau thời điểm dự đoán
C. Target tương lai trực tiếp
D. Giá trị được ghi nhận sau khi kết quả đã xảy ra

**Đáp án: A.** Trung bình 24 giờ trước có thể tính được tại thời điểm dự đoán, nên mô hình có thể dùng giống nhau khi train và khi triển khai. Khi tạo rolling feature cần căn mốc thời gian và shift phù hợp để cửa sổ không chứa target của giờ cần dự báo.

**Vì sao các phương án còn lại sai?**
- **B:** Giá trị trong 24 giờ sau chưa tồn tại tại thời điểm dự đoán. Dùng chúng tạo future leakage dù feature có tương quan cao.
- **C:** Target tương lai chính là điều cần dự đoán, không thể đưa trực tiếp làm đầu vào trong tác vụ thực tế này.
- **D:** Giá trị ghi nhận sau kết quả không sẵn có lúc ra quyết định, nên tạo lệch giữa train và inference.

**Ghi nhớ:** Với time series, kiểm tra thời điểm thông tin thực sự sẵn có, không chỉ timestamp ghi trong bảng.

### Câu 55 — Feature engineering: categorical
Một feature `city` có 5 giá trị danh mục không có thứ tự tự nhiên. Cách cơ bản phù hợp?

A. One-hot encoding
B. Gán 1–5 và mặc định coi khoảng cách số có ý nghĩa
C. Lấy log(city)
D. PCA trực tiếp trên chuỗi ký tự

**Đáp án: A.** One-hot tạo các cột chỉ báo cho từng thành phố, biểu diễn thuộc/không thuộc một nhóm mà không giả định thành phố nào lớn hơn hay gần hơn. Với 5 danh mục, đây là baseline đơn giản; có thể bỏ một cột trong một số mô hình tuyến tính để tránh phụ thuộc tuyến tính.

**Vì sao các phương án còn lại sai?**
- **B:** Gán mã 1–5 rồi coi khoảng cách có ý nghĩa áp đặt thứ tự giả. Ví dụ chênh mã 4 không thể hiện hai thành phố khác nhau gấp 4 lần.
- **C:** Logarithm không được định nghĩa trực tiếp trên tên thành phố và không tạo cách biểu diễn danh mục phù hợp.
- **D:** PCA cần đầu vào số; không áp dụng trực tiếp lên chuỗi tên thành phố chưa được mã hóa.

**Ghi nhớ:** Phân biệt categorical nominal với ordinal; cách encoding cần tôn trọng quan hệ thực giữa các giá trị.

### Câu 56 — Standardization vs normalization
Standardization thường biến feature thành dạng:

A. Mean gần 0, standard deviation gần 1
B. Luôn trong `[0,1]`
C. Chỉ gồm 0 và 1
D. Tổng tất cả feature bằng 1

**Đáp án: A.** Standardization thường dùng `z = (x - mean_train)/std_train`. Với feature không constant, dữ liệu train sau biến đổi có mean gần 0 và std gần 1; validation/test dùng cùng thống kê nên không bắt buộc có mean/std giống hệt. Phép này cũng không làm phân phối tự trở thành Gaussian.

**Vì sao các phương án còn lại sai?**
- **B:** Khoảng `[0,1]` thường là mục tiêu của min-max scaling. Standardized values có thể âm hoặc lớn hơn 1.
- **C:** Giá trị chỉ gồm 0 và 1 là biểu diễn nhị phân, không phải kết quả chung của trừ mean và chia std.
- **D:** Tổng feature bằng 1 gắn với một kiểu chuẩn hóa khác, không phải điều kiện của standardization theo từng feature.

**Ghi nhớ:** Phân biệt z-score, min-max scaling và chuẩn hóa norm; từ “normalization” có thể được dùng theo nhiều nghĩa.

### Câu 57 — Imputation leakage
Bạn tính median của mỗi feature trên toàn bộ dataset rồi mới split train/test. Vấn đề là:

A. Test data đã ảnh hưởng thống kê preprocessing của train
B. Median luôn sai
C. Chỉ mean mới gây leakage
D. Không vấn đề nếu test không có label

**Đáp án: A.** Median là thống kê được học từ dữ liệu. Tính trước khi split khiến phân phối của test ảnh hưởng đến giá trị điền trong train, làm đánh giá không còn mô phỏng dữ liệu chưa thấy. Cần split trước, fit imputer trên train, rồi chỉ transform validation/test.

**Vì sao các phương án còn lại sai?**
- **B:** Median có thể rất phù hợp với dữ liệu lệch hoặc outlier; lỗi nằm ở nguồn dữ liệu dùng để tính, không phải bản thân median.
- **C:** Cả mean, median, độ lệch chuẩn và các thống kê học từ toàn bộ dữ liệu đều có thể làm rò rỉ thông tin.
- **D:** Không cần nhãn test vẫn có thể leakage. Phân phối feature của test đã tham gia quyết định preprocessing.

**Ghi nhớ:** Dùng `fit` trên train và `transform` trên phần còn lại; trong CV phải thực hiện lại theo từng fold.

### Câu 58 — Variable-length sequence
Batch có câu dài ngắn khác nhau. Cách phổ biến để tạo tensor batch là:

A. Padding về cùng chiều dài và dùng mask để bỏ qua pad khi cần
B. Xóa mọi câu ngắn
C. Lặp câu ngắn cho đủ độ dài
D. Chuẩn hóa token ID bằng mean/std

**Đáp án: A.** Padding bổ sung pad token để các câu trong batch có cùng chiều dài, thường bằng câu dài nhất batch. Attention mask giúp mô hình bỏ qua pad khi tổng hợp thông tin; loss mask hoặc ignore index loại các vị trí pad khỏi loss khi tác vụ yêu cầu.

**Vì sao các phương án còn lại sai?**
- **B:** Xóa câu ngắn làm mất dữ liệu hữu ích và có thể gây bias theo độ dài, trong khi padding giải quyết được việc tạo batch.
- **C:** Lặp nội dung câu ngắn thay đổi ngữ nghĩa và thống kê token. Pad token được nhận biết bằng mask không tạo vấn đề đó.
- **D:** Token ID là mã danh mục. Trừ mean/chia std của ID không mang ý nghĩa như chuẩn hóa feature liên tục và không giải quyết độ dài.

**Ghi nhớ:** Pad để xếp tensor; mask để tránh mô hình học hoặc tính loss trên phần đệm không mang nội dung.


## B. Mạng nơ-ron & Học sâu

### Câu 59 — Perceptron
Perceptron một lớp cơ bản không có hidden layer khó giải trực tiếp bài XOR vì:

A. XOR không tuyến tính phân tách trong không gian đầu vào gốc
B. XOR có quá nhiều dữ liệu
C. Perceptron chỉ dùng cho regression
D. Perceptron không có trọng số

**Đáp án: A.** Với XOR, `(0,0)` và `(1,1)` thuộc một lớp, còn `(0,1)` và `(1,0)` thuộc lớp kia. Không có một đường thẳng tách đúng hai cặp điểm chéo này trong không gian gốc. Perceptron không có hidden layer chỉ tạo ranh giới tuyến tính nên bị giới hạn biểu diễn.

**Vì sao các phương án còn lại sai?**
- **B:** XOR có thể minh họa chỉ bằng bốn điểm. Khó khăn đến từ hình học phân lớp, không phải số lượng dữ liệu quá lớn.
- **C:** Perceptron cơ bản là mô hình phân loại tuyến tính, không bị giới hạn chỉ dùng regression.
- **D:** Perceptron có trọng số và thường có bias. Chính dạng tuyến tính của score mới gây giới hạn ở XOR.

**Ghi nhớ:** Thêm hidden layer phi tuyến hoặc feature tương tác có thể làm bài toán không tuyến tính phân tách trở nên giải được.

### Câu 60 — Perceptron update
Một mẫu bị phân loại sai. Quy tắc cập nhật perceptron có mục tiêu chính là:

A. Dịch chuyển trọng số để tăng score cho class đúng ở lần sau
B. Xóa toàn bộ trọng số
C. Giảm số feature về 1
D. Luôn tăng learning rate vô hạn

**Đáp án: A.** Với nhãn `y` thuộc `{-1,+1}`, một quy tắc chuẩn khi dự đoán sai là `w <- w + lr*y*x`, `b <- b + lr*y`. Bước này tăng signed score `y*(w·x+b)` cho mẫu vừa sai, giúp dịch ranh giới theo hướng có lợi cho lớp đúng.

**Vì sao các phương án còn lại sai?**
- **B:** Xóa mọi weight làm mất kết quả đã học. Quy tắc perceptron chỉ điều chỉnh theo mẫu sai, không reset toàn bộ sau mỗi lỗi.
- **C:** Cập nhật weight không thay đổi số feature đầu vào; giảm chiều là thao tác khác.
- **D:** Learning rate quá lớn không bảo đảm học tốt và không phải quy tắc bắt buộc. Mục tiêu là chỉnh hướng phân loại, không tăng bước vô hạn.

**Ghi nhớ:** Perceptron cập nhật theo sai phân loại; gradient descent tối ưu loss khả vi là một cơ chế khác.

### Câu 61 — Gradient descent
Nếu gradient của loss theo một weight là `+4` và learning rate `0.1`, cập nhật gradient descent cơ bản là:

A. `w_new = w + 0.4`
B. `w_new = w - 0.4`
C. `w_new = 0.4`
D. `w_new = w / 4`

**Đáp án: B.** Gradient descent dùng `w_new = w - lr*grad`. Thay số được `w_new = w - 0.1*4 = w - 0.4`. Gradient dương cho biết loss tăng khi tăng weight cục bộ, nên bước giảm loss đi theo chiều giảm weight.

**Vì sao các phương án còn lại sai?**
- **A:** Dấu cộng đi cùng chiều gradient, tương ứng gradient ascent cục bộ, trái mục tiêu giảm loss.
- **C:** 0.4 là độ lớn bước cập nhật, không phải giá trị weight mới. Giá trị mới còn phụ thuộc weight hiện tại.
- **D:** Chia weight cho gradient không phải quy tắc gradient descent và bỏ qua learning rate đã cho.

**Ghi nhớ:** Phân biệt weight hiện tại, gradient và độ lớn bước; công thức cơ bản luôn trừ tích learning rate với gradient.

### Câu 62 — Learning rate quá lớn
Train loss dao động mạnh, thậm chí tăng giảm thất thường và không hội tụ. Nguyên nhân có khả năng cao là:

A. Learning rate quá lớn
B. Learning rate chắc chắn bằng 0
C. Model đang ở eval mode nên luôn tốt hơn
D. Dataset đã chuẩn hóa quá đúng

**Đáp án: A.** Learning rate quá lớn làm bước `-lr*grad` vượt qua vùng có loss thấp rồi liên tục nhảy qua lại, thậm chí phân kỳ. Giảm learning rate là một kiểm tra hợp lý, nhưng cũng cần xem dữ liệu, gradient và độ ổn định số học vì dao động không chỉ có một nguyên nhân.

**Vì sao các phương án còn lại sai?**
- **B:** LR bằng 0 không cập nhật weight qua optimizer, nên không giải thích trực tiếp việc weight nhảy mạnh và loss phân kỳ.
- **C:** Eval thay hành vi một số layer, không bảo đảm loss luôn tốt hơn và không tự quyết định độ ổn định bước tối ưu.
- **D:** Chuẩn hóa đúng thường hỗ trợ tối ưu. Không có cơ chế chung nào khiến “chuẩn hóa quá đúng” gây dao động như mô tả.

**Ghi nhớ:** Loss dao động mạnh gợi ý kiểm tra learning rate; loss đứng yên lại cần chẩn đoán theo hướng khác.

### Câu 63 — Backpropagation
Vai trò của backpropagation là:

A. Tính gradient của loss theo các tham số bằng cách lan truyền đạo hàm ngược qua computational graph
B. Tạo train/test split
C. Giảm chiều bằng PCA
D. Chọn số cluster K

**Đáp án: A.** Backpropagation áp dụng chain rule từ loss ngược qua computational graph để tính gradient của các tham số. Các đạo hàm trung gian được tái sử dụng để tính hiệu quả. Optimizer sau đó dùng gradient cập nhật weight; bản thân backward không thay thế bước optimizer.

**Vì sao các phương án còn lại sai?**
- **B:** Train/test split là bước tổ chức dữ liệu trước đánh giá, không cần lan truyền đạo hàm qua mạng.
- **C:** PCA tìm hướng phương sai lớn bằng đại số tuyến tính; đó không phải vai trò chung của backpropagation.
- **D:** Chọn K là lựa chọn cấu hình clustering, không phải kết quả trực tiếp của lan truyền gradient từ loss.

**Ghi nhớ:** Forward tính dự đoán/loss; backward tính gradient; optimizer thực hiện cập nhật tham số.

### Câu 64 — ReLU
Ưu điểm phổ biến của ReLU ở hidden layer so với sigmoid là:

A. Giảm vấn đề saturation ở miền dương và tính toán đơn giản
B. Output luôn là probability tổng bằng 1
C. Không bao giờ có neuron chết
D. Chỉ dùng được cho output layer

**Đáp án: A.** ReLU là `max(0,x)`, có đạo hàm bằng 1 khi `x>0`. Miền dương không bão hòa như sigmoid, nên giúp gradient truyền qua nhiều layer dễ hơn trong nhiều mạng. Tuy nhiên miền âm có gradient 0, vì thế ReLU vẫn có thể gặp dead neurons.

**Vì sao các phương án còn lại sai?**
- **B:** Đầu ra ReLU không có chặn trên và các phần tử không bắt buộc tổng bằng 1. Tính chất đó phù hợp softmax hơn.
- **C:** Neuron luôn nhận đầu vào âm có thể không truyền gradient qua ReLU, nên “không bao giờ chết” là khẳng định sai.
- **D:** ReLU được dùng rất phổ biến ở hidden layers; không bị giới hạn chỉ cho output layer.

**Ghi nhớ:** ReLU giảm saturation ở miền dương, nhưng không loại bỏ mọi vấn đề gradient trong mạng sâu.

### Câu 65 — Sigmoid output
Bài binary classification với một logit output thường dùng:

A. Sigmoid để chuyển logit thành xác suất dương
B. Max pooling
C. K-Means
D. PCA

**Đáp án: A.** Một logit `z` được sigmoid biến thành xác suất lớp dương `1/(1+exp(-z))`. Có thể chọn threshold để tạo nhãn. Khi train bằng PyTorch `BCEWithLogitsLoss`, truyền logit trực tiếp vào loss vì sigmoid đã được gộp bên trong để ổn định số học.

**Vì sao các phương án còn lại sai?**
- **B:** Max pooling tổng hợp activation trong một vùng, không biến một logit thành xác suất thuộc lớp dương.
- **C:** K-Means phân cụm không giám sát, không phải hàm kích hoạt của output nhị phân có giám sát.
- **D:** PCA giảm chiều theo phương sai, không tạo xác suất positive từ logit của classifier.

**Ghi nhớ:** Sigmoid dùng để diễn giải xác suất; loss “with logits” thường cần đầu vào chưa qua sigmoid.

### Câu 66 — Tanh
Điểm khác chính giữa `tanh` và sigmoid là:

A. `tanh` có output trong `(-1,1)`, sigmoid trong `(0,1)` với đầu vào hữu hạn
B. `tanh` không phi tuyến
C. Sigmoid có output âm
D. Cả hai luôn tránh vanishing gradient hoàn toàn

**Đáp án: A.** `tanh(x)` có miền giá trị `(-1,1)` với đầu vào hữu hạn và có thể cho số âm; sigmoid nằm trong `(0,1)`. Tanh có output đối xứng quanh 0, nhưng cả hai vẫn bão hòa khi đầu vào có độ lớn lớn và đạo hàm tiến gần 0.

**Vì sao các phương án còn lại sai?**
- **B:** Tanh là hàm phi tuyến; đạo hàm và độ dốc thay đổi theo đầu vào, không phải một hàm tuyến tính.
- **C:** Sigmoid chuẩn luôn dương và nhỏ hơn 1 với đầu vào hữu hạn, nên không sinh output âm.
- **D:** Khi sigmoid hoặc tanh bão hòa, đạo hàm gần 0; nhân nhiều đạo hàm nhỏ vẫn có thể gây vanishing gradient.

**Ghi nhớ:** Zero-centered không đồng nghĩa miễn nhiễm vanishing gradient; xem cả miền giá trị và đạo hàm.

### Câu 67 — Loss regression
Bạn dự đoán nhiệt độ thực. Loss cơ bản phù hợp nhất trong các lựa chọn là:

A. MSE
B. Cross-entropy multiclass
C. IoU
D. Accuracy

**Đáp án: A.** Nhiệt độ là giá trị liên tục. MSE tính trung bình bình phương sai số giữa dự đoán và nhiệt độ thật, nên phản ánh cả hướng lẫn độ lớn sai lệch thông qua mức phạt. Nó là baseline hồi quy phù hợp; MAE có thể hữu ích hơn nếu outlier là vấn đề.

**Vì sao các phương án còn lại sai?**
- **B:** Multiclass cross-entropy dùng cho nhãn thuộc các lớp rời rạc, không trực tiếp khớp một nhiệt độ thực.
- **C:** IoU đo độ chồng lấp giữa vùng hoặc tập hợp, thường dùng cho box/mask, không đo sai số nhiệt độ scalar.
- **D:** Accuracy đếm nhãn đúng, không đánh giá tự nhiên mức sai 0.1 độ so với 10 độ trong regression.

**Ghi nhớ:** Loại target quyết định loss nền tảng; sau đó chọn biến thể theo nhiễu và chi phí sai số.

### Câu 68 — MSE vs MAE
Dataset có nhiều outlier target do lỗi cảm biến. Muốn giảm mức phạt cực mạnh lên outlier, nên thử:

A. MAE
B. MSE lớn hơn nữa
C. Softmax
D. Accuracy

**Đáp án: A.** MAE tăng tuyến tính theo sai số tuyệt đối, còn MSE tăng theo bình phương. Một lỗi cảm biến rất lớn vì vậy ít chi phối MAE hơn MSE. Chuyển loss có thể giúp robust hơn, nhưng cần kiểm tra nguồn lỗi vì không phải mọi outlier đều là dữ liệu sai.

**Vì sao các phương án còn lại sai?**
- **B:** Tăng ảnh hưởng MSE vẫn ưu tiên sai số lớn, trái mục tiêu giảm sự chi phối của target lỗi.
- **C:** Softmax tạo phân phối xác suất qua các lớp, không phải loss robust cho dự đoán số thực.
- **D:** Accuracy là metric nhãn rời rạc và không trực tiếp kiểm soát mức phạt lên sai số hồi quy lớn.

**Ghi nhớ:** Robust loss giảm tác động outlier, nhưng không thay thế kiểm tra chất lượng và ý nghĩa nhãn.

### Câu 69 — Multiclass classification
Bài có đúng một class trong 10 class cho mỗi ảnh. Output layer hợp lý nhất là:

A. 10 logits + cross-entropy/softmax semantics
B. 1 scalar MSE bất kể class
C. 10 sigmoid độc lập là bắt buộc
D. PCA output

**Đáp án: A.** Mỗi ảnh có đúng một trong 10 lớp nên model tạo 10 logits. Softmax diễn giải chúng thành xác suất tổng bằng 1; cross-entropy khuyến khích xác suất lớp thật cao. Với PyTorch `CrossEntropyLoss`, truyền logits trực tiếp, không softmax trước loss.

**Vì sao các phương án còn lại sai?**
- **B:** MSE trên một số class index áp đặt khoảng cách giả giữa các lớp, chẳng hạn coi lớp 9 xa lớp 1 hơn lớp 2.
- **C:** Sigmoid độc lập phù hợp multi-label hơn; không bắt buộc tổng xác suất bằng 1 nên không phải lựa chọn chuẩn ở đây.
- **D:** PCA output biểu diễn phương sai của feature, không có sẵn ý nghĩa 10 lớp hoặc mục tiêu supervised classification.

**Ghi nhớ:** Một lớp duy nhất → softmax/cross-entropy; nhiều nhãn đồng thời → sigmoid/BCE theo từng nhãn.

### Câu 70 — Multi-label classification
Một ảnh có thể đồng thời có nhãn `dog`, `outdoor`, `running`. Loss phù hợp nhất?

A. Binary cross-entropy với sigmoid độc lập cho từng nhãn
B. Softmax cross-entropy bắt buộc một class duy nhất
C. MSE trên class index
D. K-Means loss

**Đáp án: A.** Ba nhãn có thể đồng thời đúng, nên mỗi nhãn cần một xác suất riêng và một target 0/1. Sigmoid cùng binary cross-entropy theo từng nhãn cho phép cả `dog`, `outdoor` và `running` cùng có xác suất cao, không phải cạnh tranh tổng bằng 1.

**Vì sao các phương án còn lại sai?**
- **B:** Softmax cross-entropy một lớp giả định các lớp loại trừ nhau, trái tình huống ảnh có nhiều nhãn đúng đồng thời.
- **C:** Class index đơn lẻ không biểu diễn được mọi tổ hợp nhãn theo cách tự nhiên; MSE trên index còn tạo khoảng cách lớp giả.
- **D:** K-Means tối ưu khoảng cách tới centroid, không trực tiếp học các target nhãn nhị phân có giám sát.

**Ghi nhớ:** “Độc lập” ở đây là cách mô hình hóa output/loss từng nhãn, không khẳng định các nhãn ngoài đời không liên quan nhau.

### Câu 71 — MLP parameter count
Layer dense nhận 20 input và có 10 neuron output, có bias. Số tham số là:

A. 20
B. 200
C. 210
D. 30

**Đáp án: C.** Mỗi trong 10 neuron output cần 20 weight, nên có `20*10 = 200` weight. Mỗi neuron có thêm một bias, tổng 10 bias. Tổng số tham số học là `200 + 10 = 210`, không phụ thuộc số mẫu trong batch.

**Vì sao các phương án còn lại sai?**
- **A:** 20 chỉ là số input feature; mỗi feature còn nối tới cả 10 neuron, không chỉ có một weight cho toàn layer.
- **B:** 200 đếm đúng phần weight nhưng thiếu 10 bias mà đề đã nói có sử dụng.
- **D:** 30 là tổng số input và output units, không phải số liên kết có weight cộng bias.

**Ghi nhớ:** Dense có bias: số tham số bằng `n_in*n_out + n_out`; batch size không tham gia công thức.

### Câu 72 — MLP cho ảnh
Vì sao CNN thường hiệu quả hơn MLP thuần trên ảnh lớn?

A. CNN khai thác locality và weight sharing nên ít tham số hơn so với fully connected trên pixel
B. MLP không thể dùng gradient descent
C. CNN không cần dữ liệu
D. MLP chỉ dùng cho text

**Đáp án: A.** CNN dùng kernel nhỏ xử lý vùng lân cận và dùng lại cùng trọng số tại nhiều vị trí. So với kết nối mọi pixel vào mọi neuron, cách này thường giảm tham số và tận dụng cấu trúc không gian. Đây là inductive bias hữu ích cho ảnh, không phải bảo đảm CNN luôn thắng mọi MLP.

**Vì sao các phương án còn lại sai?**
- **B:** MLP huấn luyện được bằng gradient descent và backpropagation giống nhiều mạng nơ-ron khác.
- **C:** CNN vẫn cần dữ liệu hoặc pretrained weights và dữ liệu thích nghi phù hợp; kiến trúc không tự cung cấp kiến thức bài toán.
- **D:** MLP nhận vector số và dùng được cho ảnh đã flatten, dữ liệu bảng, text embedding và nhiều loại đầu vào khác.

**Ghi nhớ:** Lợi thế CNN đến từ locality và weight sharing, không phải vì MLP không thể xử lý ảnh.

### Câu 73 — Embedding
So với one-hot vector kích thước vocabulary 100,000, embedding dimension 256 có ưu điểm thực hành nào?

A. Biểu diễn dense nhỏ hơn và có thể học quan hệ ngữ nghĩa
B. Luôn khôi phục chính xác nghĩa từ không cần training
C. Không có tham số học
D. Chỉ chứa 0 và 1

**Đáp án: A.** Mỗi token được ánh xạ tới vector dense 256 chiều thay cho one-hot 100,000 chiều. Vector học được qua mục tiêu train có thể đặt các token liên quan gần nhau. Bảng embedding vẫn có khoảng `100000*256` tham số nếu học riêng từng token, nên biểu diễn ngắn không có nghĩa không tốn bộ nhớ.

**Vì sao các phương án còn lại sai?**
- **B:** Ngữ nghĩa không tự xuất hiện chính xác từ vector ngẫu nhiên; cần training hoặc pretrained embeddings và vẫn có giới hạn.
- **C:** Embedding layer thông thường có bảng trọng số học được. Freeze bảng pretrained chỉ ngừng cập nhật, không làm tham số biến mất.
- **D:** Dense embeddings thường chứa số thực, bao gồm cả số âm tùy mô hình, không chỉ 0 và 1.

**Ghi nhớ:** Phân biệt số chiều vector mỗi token với tổng số tham số của cả bảng embedding.

### Câu 74 — Similarity embedding
Hai câu có cosine similarity cao trong embedding space thường được hiểu là:

A. Vector hướng tương tự, thường biểu diễn nội dung/đặc trưng gần nhau tùy model
B. Hai câu chắc chắn từng ký tự giống nhau
C. Hai vector có norm bằng 0
D. Hai class luôn giống nhãn thật

**Đáp án: A.** Cosine similarity bằng `(u·v)/(||u||*||v||)` với hai vector khác 0. Giá trị gần 1 nghĩa là hai hướng gần nhau. Nếu embedding được học tốt cho tác vụ, điều này thường gợi ý nội dung tương tự, nhưng không bảo đảm cùng nghĩa hoặc cùng nhãn trong mọi trường hợp.

**Vì sao các phương án còn lại sai?**
- **B:** Câu khác từng ký tự vẫn có thể diễn đạt cùng ý và có embedding gần nhau. Cosine không phải phép so sánh chuỗi chính xác.
- **C:** Norm bằng 0 làm công thức cosine không xác định nếu không có xử lý đặc biệt; đó không phải ý nghĩa của cosine cao.
- **D:** Similarity là tín hiệu từ representation, không phải chứng minh nhãn thật giống nhau; mô hình có thể bỏ sót khác biệt quan trọng.

**Ghi nhớ:** Chọn metric similarity phù hợp cách embedding được train và kiểm chứng bằng ví dụ của tác vụ thực tế.

### Câu 75 — Max pooling
Max pooling `2×2` stride 2 trên feature map `32×32` thường tạo spatial size:

A. `64×64`
B. `32×32`
C. `16×16`
D. `2×2`

**Đáp án: C.** Với pooling không padding, mỗi chiều có `floor((32-2)/2)+1 = 16` vị trí cửa sổ. Vì cả chiều cao lẫn chiều rộng đều còn 16, output spatial là `16×16`; số channel thông thường giữ nguyên.

**Vì sao các phương án còn lại sai?**
- **A:** `64×64` là tăng độ phân giải, trái tác dụng downsampling của pooling stride 2 này.
- **B:** `32×32` giữ nguyên kích thước, bỏ qua việc cửa sổ nhảy 2 vị trí ở cả hai chiều.
- **D:** `2×2` là kích thước cửa sổ pooling, không phải số vị trí cửa sổ trên toàn feature map.

**Ghi nhớ:** Phân biệt kernel size với output size; stride quyết định mật độ các vị trí được lấy mẫu.

### Câu 76 — Max vs average pooling
Nếu muốn giữ tín hiệu activation mạnh nhất trong mỗi vùng nhỏ, chọn:

A. Max pooling
B. Average pooling
C. Standardization
D. One-hot encoding

**Đáp án: A.** Max pooling giữ activation lớn nhất mỗi vùng, nên phù hợp khi muốn giữ tín hiệu nổi bật bất kể vị trí chính xác trong vùng nhỏ. Ví dụ vùng `[1, 2, 8, 1]` cho output 8; average pooling cho 3 và làm tín hiệu đỉnh yếu hơn.

**Vì sao các phương án còn lại sai?**
- **B:** Average pooling lấy trung bình, phù hợp tổng hợp mức phản hồi chung nhưng không giữ nguyên activation mạnh nhất.
- **C:** Standardization điều chỉnh thang đo theo mean/std, không chọn phần tử lớn nhất trong vùng spatial.
- **D:** One-hot mã hóa giá trị danh mục thành vector chỉ báo, không tổng hợp activation của feature map.

**Ghi nhớ:** Max giữ tín hiệu đỉnh, average giữ xu hướng chung; cả hai đều có thể làm mất chi tiết vị trí.

### Câu 77 — Attention: Q/K/V
Trong self-attention, attention weight giữa token thường được tạo từ tương tác của:

A. Query và Key
B. Value và label thật
C. Learning rate và batch size
D. Padding và optimizer

**Đáp án: A.** Trong scaled dot-product attention, score là `QK^T/sqrt(d_k)`, sau đó softmax tạo weights. Query biểu thị điều token đang tìm, key biểu thị cách các token được đối chiếu; weights cuối cùng được dùng tổng hợp các value tương ứng.

**Vì sao các phương án còn lại sai?**
- **B:** Value chứa nội dung được tổng hợp; label thật không trực tiếp tham gia công thức tạo attention weights khi inference.
- **C:** Learning rate và batch size là cấu hình huấn luyện, không phải hai biểu diễn token dùng để tính tương thích attention.
- **D:** Padding mask có thể loại vị trí không hợp lệ, nhưng padding và optimizer không thay thế tương tác Query–Key.

**Ghi nhớ:** Q/K quyết định chú ý tới đâu; V cung cấp thông tin được trộn theo mức chú ý đó.

### Câu 78 — Attention softmax
Sau khi tính attention scores cho một query, softmax chủ yếu để:

A. Chuyển scores thành trọng số không âm tổng bằng 1
B. Tăng sequence length
C. Xóa positional encoding
D. Chuẩn hóa feature về mean 0 std 1

**Đáp án: A.** Softmax biến scores của một query thành weights không âm tổng bằng 1 trên các vị trí được phép attend. Trọng số lớn hơn dành cho key có score cao hơn; nhân weights với V tạo tổng có trọng số. Mask cần được áp đúng để pad hoặc tương lai không nhận attention.

**Vì sao các phương án còn lại sai?**
- **B:** Softmax giữ nguyên số phần tử scores, không tạo thêm token hay tăng sequence length.
- **C:** Nó chuẩn hóa scores, không xóa positional information đã được mô hình sử dụng để tạo Q/K/V.
- **D:** Mean 0, std 1 là mục tiêu của standardization, không phải chuẩn hóa theo tổng của softmax.

**Ghi nhớ:** Softmax chuẩn hóa theo trục các key của từng query, không trộn mọi token của cả batch thành một phân phối.

### Câu 79 — Positional information
Vì self-attention thuần không tự biết thứ tự token, Transformer thường cần:

A. Positional encoding/position embeddings
B. K-Means centroid
C. ROC curve
D. One-hot label ở mọi layer

**Đáp án: A.** Self-attention thuần xử lý quan hệ giữa các token mà không tự gắn số thứ tự cho chúng. Positional encoding, learned position embeddings hoặc cơ chế vị trí tương đương đưa thông tin thứ tự vào mô hình, giúp phân biệt các câu có cùng từ nhưng đổi vị trí.

**Vì sao các phương án còn lại sai?**
- **B:** Centroid K-Means mô tả tâm cluster, không gắn vị trí đầu–cuối cho token trong chuỗi.
- **C:** ROC curve là công cụ đánh giá classifier, không cung cấp tín hiệu thứ tự cho Transformer.
- **D:** Nhãn thật không có sẵn trong các hidden layer khi inference; one-hot label cũng không tự biểu diễn vị trí token.

**Ghi nhớ:** Token identity trả lời “là token gì”; positional information bổ sung “ở đâu hoặc cách token khác bao xa”.

### Câu 80 — Causal mask
Trong autoregressive language model, causal mask dùng để:

A. Ngăn token hiện tại nhìn token tương lai khi dự đoán next token
B. Ngăn token nhìn quá khứ
C. Xóa toàn bộ attention
D. Chuẩn hóa audio

**Đáp án: A.** Ở vị trí `t`, mô hình next-token được dùng để dự đoán token `t+1`, nên chỉ được dùng thông tin đến `t`. Causal mask chặn attention tới các vị trí tương lai, làm điều kiện train phù hợp với inference khi token tiếp theo chưa được sinh.

**Vì sao các phương án còn lại sai?**
- **B:** Quá khứ chính là ngữ cảnh cần dùng để dự đoán. Chặn nó sẽ loại bỏ thông tin hợp lệ và không thực hiện mục tiêu causal đúng.
- **C:** Mask chỉ chặn các cặp vị trí không hợp lệ, không xóa toàn bộ attention tới token hiện tại và quá khứ.
- **D:** Chuẩn hóa audio là bước tiền xử lý tín hiệu khác, không phải chức năng của mặt nạ thứ tự trong language model.

**Ghi nhớ:** Causal mask chặn tương lai; padding mask chặn pad. Hai mask giải quyết hai loại vị trí không hợp lệ khác nhau.

### Câu 81 — Chi phí attention
Với self-attention chuẩn, khi sequence length tăng gấp đôi, phần ma trận attention theo cặp token thường tăng gần:

A. 2 lần
B. 4 lần
C. Không đổi
D. 8 lần bắt buộc cho mọi thành phần model

**Đáp án: B.** Với `n` token, một head attention có ma trận scores kích thước `n×n`. Tăng lên `2n` tạo `(2n)*(2n) = 4n^2` phần tử, nên phần tương tác theo cặp tăng khoảng 4 lần khi các chiều khác giữ nguyên. Đây không phải kết luận mọi thành phần Transformer đều tăng như vậy.

**Vì sao các phương án còn lại sai?**
- **A:** 2 lần là mức tăng tuyến tính, bỏ qua việc cả số query lẫn số key đều tăng gấp đôi.
- **C:** Số cặp token tăng nên chi phí attention chuẩn không thể giữ nguyên chỉ vì số head không đổi.
- **D:** 8 lần không suy ra từ ma trận `n×n`; các thành phần khác còn có quy luật scale khác nhau.

**Ghi nhớ:** Phân biệt chi phí tương tác attention bậc hai với projection/MLP thường tuyến tính theo số token khi hidden size cố định.

### Câu 82 — Mini-batch
Batch size quá lớn so với bộ nhớ GPU gây lỗi OOM. Cách xử lý trực tiếp nhất?

A. Giảm batch size
B. Tăng vocabulary
C. Tăng độ phân giải ảnh
D. Bỏ loss

**Đáp án: A.** Giảm batch size làm giảm số mẫu xử lý đồng thời, thường giảm đáng kể activation và các bộ đệm phụ thuộc batch. Weight, gradient tham số và optimizer state không nhất thiết giảm theo batch size, nhưng đây vẫn là cách trực tiếp xử lý OOM do batch quá lớn.

**Vì sao các phương án còn lại sai?**
- **B:** Vocabulary lớn hơn có thể làm embedding và output layer lớn hơn, tăng bộ nhớ thay vì giảm.
- **C:** Ảnh độ phân giải cao hơn tạo feature maps lớn hơn và thường dùng nhiều bộ nhớ hơn.
- **D:** Bỏ loss làm mất mục tiêu học có giám sát, không phải cách sửa hợp lệ cho một vòng train đang cần cập nhật model.

**Ghi nhớ:** Có thể dùng gradient accumulation để giữ effective batch size lớn trong khi mỗi micro-batch vừa bộ nhớ.

### Câu 83 — SGD shuffle
Với dữ liệu i.i.d. thông thường, vì sao thường shuffle train data mỗi epoch?

A. Giảm phụ thuộc vào thứ tự mẫu và giúp mini-batch gradient đại diện hơn
B. Để tăng số class
C. Để test leakage tốt hơn
D. Vì optimizer yêu cầu label được sắp xếp

**Đáp án: A.** Nếu dữ liệu được xếp theo class hoặc nguồn thu thập, các batch liên tiếp có thể rất lệch. Shuffle ở dữ liệu i.i.d. giảm sự phụ thuộc đó, giúp các mini-batch đại diện hơn cho train và tránh optimizer liên tục bị kéo theo từng khối dữ liệu có cấu trúc.

**Vì sao các phương án còn lại sai?**
- **B:** Shuffle chỉ đổi thứ tự mẫu, không tạo hoặc xóa nhãn lớp nên số class giữ nguyên.
- **C:** Shuffle không phải cách tạo hay kiểm tra test leakage; ranh giới train/test phải được xử lý riêng trước đó.
- **D:** Optimizer không yêu cầu sắp nhãn. Ngược lại, batch chỉ gồm một lớp do thứ tự có thể làm huấn luyện khó hơn.

**Ghi nhớ:** Shuffle phù hợp dữ liệu i.i.d.; time series và dữ liệu có phụ thuộc nhóm cần cách chia/xử lý riêng.

### Câu 84 — Autoencoder
Autoencoder cơ bản học bằng cách:

A. Nén input qua latent representation rồi tái tạo lại input
B. Dự đoán class bắt buộc có label
C. Tối đa hóa số cluster
D. Chỉ sinh text autoregressive

**Đáp án: A.** Autoencoder đưa input qua encoder để tạo latent representation rồi dùng decoder tái tạo input. Loss so sánh bản tái tạo với chính input, nên không cần nhãn lớp bên ngoài. Bottleneck hoặc ràng buộc khác giúp model học biểu diễn thay vì chỉ sao chép tùy ý.

**Vì sao các phương án còn lại sai?**
- **B:** Classification cần nhãn lớp là một tác vụ khác; autoencoder cơ bản tự lấy input làm reconstruction target.
- **C:** Số cluster không phải đại lượng cần tối đa hóa trong reconstruction loss của autoencoder.
- **D:** Autoencoder dùng được cho ảnh, vector và nhiều loại dữ liệu; không bị giới hạn vào sinh text autoregressive.

**Ghi nhớ:** Encoder tạo biểu diễn; decoder tái tạo. Mục tiêu reconstruction khác với học dự đoán nhãn.

### Câu 85 — Autoencoder anomaly detection
Nếu autoencoder train chủ yếu trên dữ liệu “bình thường”, anomaly có thể được phát hiện nhờ:

A. Reconstruction error cao bất thường
B. Accuracy classification luôn 100%
C. K-Means K bằng 1
D. Learning rate bằng 0

**Đáp án: A.** Autoencoder học cách tái tạo những cấu trúc thường gặp trong train bình thường. Mẫu bất thường có thể không được tái tạo tốt nên có reconstruction error cao. Cần chọn threshold trên dữ liệu đánh giá phù hợp, vì model quá linh hoạt đôi khi tái tạo tốt cả anomaly.

**Vì sao các phương án còn lại sai?**
- **B:** Autoencoder reconstruction không tự cung cấp classifier hay bảo đảm accuracy 100%; phát hiện anomaly cần tiêu chí riêng.
- **C:** Đặt K bằng 1 là lựa chọn của K-Means, không phải cơ chế giải thích reconstruction error của autoencoder.
- **D:** Learning rate 0 khiến tham số không học qua optimizer; nó không tạo quy tắc phân biệt mẫu bình thường và bất thường.

**Ghi nhớ:** Reconstruction error là tín hiệu anomaly cần kiểm chứng, không phải chứng nhận chắc chắn một mẫu bất thường.

### Câu 86 — Adam
Đặc điểm thực hành của Adam là:

A. Dùng moving averages của gradient và squared gradient để điều chỉnh bước cập nhật theo tham số
B. Không dùng gradient
C. Chỉ dùng cho linear regression
D. Luôn cần batch size 1

**Đáp án: A.** Adam duy trì trung bình trượt của gradient và gradient bình phương, thường ký hiệu `m` và `v`. Sau hiệu chỉnh bias, bước cập nhật dùng thông tin hướng từ `m` và điều chỉnh độ lớn theo `sqrt(v)`. Nhờ vậy mỗi tham số có mức điều chỉnh thích nghi theo lịch sử gradient.

**Vì sao các phương án còn lại sai?**
- **B:** Adam cần gradient để cập nhật các moment và weight; nó không phải thuật toán tối ưu không đạo hàm.
- **C:** Adam dùng được cho nhiều mạng và tác vụ khả vi, không chỉ Linear Regression.
- **D:** Adam có thể dùng batch size 1 hoặc mini-batch lớn hơn; không có yêu cầu cố định bằng 1.

**Ghi nhớ:** Adaptive optimizer vẫn cần chọn learning rate và các hyperparameter; không có bảo đảm luôn tốt hơn SGD.

### Câu 87 — AdamW
Điểm thực hành thường được nhấn mạnh ở AdamW là:

A. Tách weight decay khỏi gradient update thích nghi của Adam
B. Không có learning rate
C. Không dùng momentum
D. Chỉ dùng CPU

**Đáp án: A.** AdamW tách bước co nhỏ weight do weight decay khỏi phần gradient được Adam chuẩn hóa thích nghi. Cách này khác với cộng L2 vào loss rồi để Adam xử lý chung gradient, vì ở Adam hai cách không tương đương nói chung. Learning rate và mức decay vẫn cần tuning.

**Vì sao các phương án còn lại sai?**
- **B:** AdamW vẫn có learning rate để xác định mức cập nhật; tách decay không loại bỏ hyperparameter này.
- **C:** AdamW vẫn giữ first moment kiểu momentum cùng second moment của Adam.
- **D:** Thuật toán không bị giới hạn CPU; model và trạng thái optimizer có thể được dùng trên GPU phù hợp.

**Ghi nhớ:** L2 trong loss và weight decay tách biệt có thể khác tác dụng với optimizer thích nghi như Adam.

### Câu 88 — Learning rate quá nhỏ
Loss giảm rất chậm nhưng ổn định, gradient hữu hạn, model có khả năng học. Điều chỉnh đầu tiên có thể thử:

A. Tăng learning rate vừa phải
B. Đặt learning rate về 0
C. Xóa optimizer
D. Bỏ train data

**Đáp án: A.** Khi gradient hữu hạn và mô hình có thể học, learning rate quá nhỏ có thể khiến mỗi bước chỉ thay đổi weight rất ít. Tăng vừa phải rồi theo dõi validation và độ ổn định là thử nghiệm hợp lý; không tăng tùy ý vì LR quá lớn lại có thể phân kỳ.

**Vì sao các phương án còn lại sai?**
- **B:** LR bằng 0 làm optimizer không cập nhật weight theo gradient, trái mục tiêu tăng tốc học.
- **C:** Xóa optimizer mà không có cơ chế cập nhật thay thế khiến tham số không được tối ưu.
- **D:** Bỏ train data không cung cấp tín hiệu học; loss giảm chậm không phải lý do loại toàn bộ dữ liệu.

**Ghi nhớ:** Tăng LR cần đi kèm quan sát đường cong loss; loss chậm còn có thể do dữ liệu, kiến trúc hoặc gradient yếu.

### Câu 89 — Warmup/decay
Trong fine-tuning Transformer, warmup learning rate ở đầu training thường nhằm:

A. Tránh cập nhật quá mạnh ngay khi optimizer/model vừa bắt đầu, sau đó mới đạt LR mục tiêu
B. Tăng sequence length
C. Thay tokenizer
D. Tắt gradient

**Đáp án: A.** Warmup bắt đầu với learning rate nhỏ rồi tăng dần tới giá trị mục tiêu trong một số bước. Nó hạn chế cập nhật đột ngột khi các thống kê optimizer và các phần model mới còn chưa ổn định. Sau warmup có thể dùng decay, nhưng đó là giai đoạn điều chỉnh khác.

**Vì sao các phương án còn lại sai?**
- **B:** Sequence length là cấu hình dữ liệu/context, không tự tăng khi learning rate warmup.
- **C:** Warmup không đổi vocabulary hay cách chia token; tokenizer là thành phần biểu diễn đầu vào riêng.
- **D:** Gradient vẫn được tính trong warmup. Bước cập nhật nhỏ hơn khác với tắt gradient hoàn toàn.

**Ghi nhớ:** Warmup điều khiển độ lớn bước tối ưu lúc đầu, không thay dữ liệu hay cấu trúc tokenizer.

### Câu 90 — Dropout
Trong training, dropout làm gì?

A. Ngẫu nhiên zero một phần activation để regularize
B. Luôn zero cùng một neuron vĩnh viễn
C. Chỉ chạy khi `model.eval()`
D. Thay loss bằng MSE

**Đáp án: A.** Dropout chuẩn lấy mặt nạ ngẫu nhiên và đặt một phần activation bằng 0 trong training. Việc đó khiến mạng bớt phụ thuộc vào một nhóm activation cố định, giúp regularize. Với inverted dropout, activation giữ lại còn được scale để bảo toàn kỳ vọng.

**Vì sao các phương án còn lại sai?**
- **B:** Mặt nạ được lấy ngẫu nhiên qua các lần forward; dropout không xóa vĩnh viễn một neuron cố định như pruning.
- **C:** Dropout chuẩn hoạt động ở train và tắt ở eval. Một số kỹ thuật chủ động bật dropout khi suy luận là trường hợp đặc biệt.
- **D:** Dropout biến đổi activation, không thay loss classification hay regression thành MSE.

**Ghi nhớ:** Dropout là regularization ngẫu nhiên trong train, cần phân biệt với xóa cấu trúc mạng cố định.

### Câu 91 — Dropout eval
Khi `model.eval()` trong PyTorch, Dropout chuẩn sẽ:

A. Tắt việc random drop và dùng toàn bộ activation với scaling đã được xử lý theo convention
B. Drop mạnh hơn
C. Xóa weight
D. Bắt buộc train lại

**Đáp án: A.** Với Dropout chuẩn trong PyTorch, `eval()` biến module thành phép đồng nhất: không lấy mặt nạ drop ngẫu nhiên. Do PyTorch đã scale activation giữ lại bằng `1/(1-p)` lúc train, eval không cần tự nhân thêm hệ số đó. Nhờ vậy output không dao động vì dropout.

**Vì sao các phương án còn lại sai?**
- **B:** Eval không tăng xác suất drop; nó tắt cơ chế random drop của module chuẩn.
- **C:** Chuyển chế độ không xóa weight hoặc activation lưu trong kiến trúc. Nó chỉ thay hành vi forward của một số layer.
- **D:** Không cần train lại chỉ vì gọi eval; có thể đổi qua lại `train()` và `eval()` theo công đoạn.

**Ghi nhớ:** `no_grad()` không tắt dropout; cần `eval()` để có hành vi suy luận chuẩn.

### Câu 92 — Early stopping
Tiêu chí tốt để early stopping là:

A. Theo dõi validation metric/loss và dừng khi không cải thiện sau một số patience
B. Dừng khi train loss lần đầu giảm
C. Theo dõi test set sau mỗi batch
D. Dừng ngẫu nhiên

**Đáp án: A.** Early stopping theo dõi validation loss hoặc metric và dừng sau một số lần đánh giá không cải thiện, gọi là patience. Nên xác định chiều “tốt hơn” của metric và lưu checkpoint tốt nhất; checkpoint cuối trước khi dừng chưa chắc là checkpoint nên triển khai.

**Vì sao các phương án còn lại sai?**
- **B:** Train loss bắt đầu giảm là dấu hiệu mô hình đang học, không phải bằng chứng đã đạt chất lượng tốt nhất trên dữ liệu mới.
- **C:** Dùng test sau mỗi batch để quyết định dừng khiến test tham gia lựa chọn mô hình, tạo thiên lệch đánh giá.
- **D:** Dừng ngẫu nhiên không dùng thông tin chất lượng validation nên không thực hiện mục tiêu của early stopping.

**Ghi nhớ:** Early stopping cũng là lựa chọn mô hình; dùng validation và khôi phục checkpoint tốt nhất.

### Câu 93 — Weight decay
Tăng weight decay quá mạnh thường có nguy cơ:

A. Underfitting vì trọng số bị ép nhỏ quá mức
B. Chắc chắn overfit hơn
C. Tăng số tham số
D. Làm model chuyển thành K-NN

**Đáp án: A.** Weight decay ép weight nhỏ hơn trong quá trình tối ưu. Nếu quá mạnh, mô hình khó dùng các hệ số đủ lớn để biểu diễn quy luật thật, nên train lẫn validation có thể kém và underfit. Giảm decay là một hướng kiểm tra khi cả hai cùng xấu.

**Vì sao các phương án còn lại sai?**
- **B:** Weight decay thường nhằm giảm overfitting; không có quy luật tăng decay chắc chắn làm overfit hơn.
- **C:** Đổi decay không thêm layer hay weight, nên số tham số của kiến trúc giữ nguyên.
- **D:** Mô hình vẫn là kiến trúc hiện tại; co nhỏ trọng số không biến thuật toán dự đoán thành K-NN.

**Ghi nhớ:** Phân biệt số tham số với capacity hiệu dụng; regularization có thể giảm cái sau mà không đổi cái trước.

### Câu 94 — Weight initialization
Dùng toàn bộ weight khởi tạo bằng 0 cho hidden layer nhiều neuron thường có vấn đề gì?

A. Các neuron đối xứng có thể nhận gradient giống nhau và học cùng feature
B. Luôn hội tụ nhanh nhất
C. Tự động tạo dropout
D. Tăng diversity neuron

**Đáp án: A.** Nếu các neuron hidden tương đương có weight giống hệt nhau, chúng có thể nhận activation và gradient giống nhau, rồi tiếp tục học cùng đặc trưng. Khởi tạo toàn 0 không phá đối xứng; với ReLU còn có thể làm gradient bằng 0 tại điểm khởi tạo tùy cách định nghĩa đạo hàm.

**Vì sao các phương án còn lại sai?**
- **B:** Khởi tạo 0 có thể khiến mạng không học được hoặc giảm số đặc trưng độc lập, nên không bảo đảm hội tụ nhanh nhất.
- **C:** Dropout cần mặt nạ ngẫu nhiên trong forward. Weight bằng 0 không tự tạo cơ chế này.
- **D:** Các neuron có cùng trạng thái khởi tạo và gradient giống nhau thường kém đa dạng hơn, trái với phát biểu.

**Ghi nhớ:** Hidden weights cần khởi tạo phá đối xứng; bias bằng 0 thường vẫn hợp lệ khi weights được khởi tạo phù hợp.

### Câu 95 — He initialization
Với mạng dùng ReLU, lựa chọn initialization thường phù hợp là:

A. He/Kaiming initialization
B. Mọi weight bằng 1000
C. Mọi weight bằng 0
D. One-hot initialization

**Đáp án: A.** He/Kaiming initialization chọn scale weight theo số kết nối đầu vào hoặc đầu ra để ổn định độ lớn tín hiệu qua các layer ReLU. Trong dạng fan-in phổ biến, variance weight xấp xỉ `2/fan_in`, tính đến việc ReLU loại phần âm. Điều này hỗ trợ gradient và activation không co/phình quá nhanh.

**Vì sao các phương án còn lại sai?**
- **B:** Mọi weight rất lớn có thể làm activation và gradient bùng nổ; các giá trị giống nhau còn không phá đối xứng tốt.
- **C:** Toàn 0 không phá đối xứng giữa neuron hidden và có thể làm mạng không học được đặc trưng khác nhau.
- **D:** One-hot là cách biểu diễn danh mục, không phải quy tắc khởi tạo chuẩn để ổn định variance của mạng ReLU nói chung.

**Ghi nhớ:** Chọn initialization phù hợp activation và fan-in/fan-out, thay vì chọn độ lớn weight tùy ý.

### Câu 96 — BatchNorm train/eval
Khác biệt chính của BatchNorm giữa train và eval là:

A. Train dùng batch statistics; eval dùng running statistics đã tích lũy
B. Train không có affine parameters
C. Eval luôn dùng statistics của chính một sample
D. BatchNorm chỉ hoạt động trên GPU

**Đáp án: A.** Với cấu hình theo dõi running statistics mặc định, BatchNorm dùng mean/variance của mini-batch lúc train và cập nhật các thống kê tích lũy. Lúc eval, nó dùng running mean/variance đã học, làm dự đoán ít phụ thuộc batch inference. Nếu tắt `track_running_stats`, hành vi này có ngoại lệ.

**Vì sao các phương án còn lại sai?**
- **B:** Khi `affine=True`, scale và bias học được vẫn tồn tại và được dùng trong train lẫn eval. Chúng khác với running statistics.
- **C:** Eval mặc định dùng thống kê tích lũy, không luôn tính lại từ một sample hiện tại; làm vậy còn có thể thiếu đủ phần tử để ước lượng.
- **D:** BatchNorm có thể chạy trên CPU hoặc GPU phù hợp. Thiết bị không định nghĩa khác biệt train–eval.

**Ghi nhớ:** Running statistics là buffer khác với affine parameters; chế độ module quyết định cách dùng thống kê.

### Câu 97 — Feature extraction
Dataset nhỏ, model ResNet pretrained mạnh, tài nguyên hạn chế. Chiến lược ban đầu hợp lý?

A. Freeze phần lớn encoder và train classifier head trước
B. Xóa pretrained weights rồi train từ đầu bắt buộc
C. Dùng K-Means thay classification
D. Tăng ảnh lên kích thước bất kỳ không theo model

**Đáp án: A.** Pretrained encoder đã học các đặc trưng hữu ích. Freeze phần lớn encoder rồi train head mới giảm số tham số cần cập nhật và chi phí backward, tạo baseline phù hợp dữ liệu ít. Sau đó có thể mở dần các layer nếu validation cho thấy cần thích nghi sâu hơn.

**Vì sao các phương án còn lại sai?**
- **B:** Train từ đầu bỏ lợi thế pretraining và thường cần nhiều dữ liệu, compute hơn; không phải yêu cầu bắt buộc.
- **C:** K-Means không tự thay thế classifier có nhãn; cluster thu được chưa chắc khớp các lớp mục tiêu.
- **D:** Kích thước và preprocessing phải tương thích model. Thay đổi tùy ý có thể làm sai phân phối đầu vào hoặc tăng compute không cần thiết.

**Ghi nhớ:** Với dataset nhỏ, bắt đầu từ pretrained features và head đơn giản trước khi tăng mức fine-tuning.

### Câu 98 — Full fine-tuning
Khi nào full fine-tuning đáng cân nhắc hơn chỉ freeze encoder?

A. Có đủ dữ liệu/tài nguyên và domain mới khác đáng kể, cần điều chỉnh representation sâu hơn
B. Khi không có GPU và dataset cực nhỏ bắt buộc
C. Khi model không có tham số
D. Khi target không liên quan input

**Đáp án: A.** Domain mới khác nhiều có thể cần thay đổi representation bên trong, điều mà encoder bị freeze không làm được. Khi có đủ dữ liệu và tài nguyên, full fine-tuning cho phép cập nhật sâu hơn. Đổi lại cần learning rate thận trọng và validation để tránh overfit hoặc làm mất kiến thức hữu ích.

**Vì sao các phương án còn lại sai?**
- **B:** Không có GPU không tuyệt đối cấm fine-tuning, nhưng dữ liệu cực ít và tài nguyên thấp không tạo lý do bắt buộc mở toàn bộ model.
- **C:** Model không có tham số thì không có weight để cập nhật theo nghĩa full fine-tuning đang xét.
- **D:** Nếu target không liên quan input, tăng số tham số học không tự tạo tín hiệu dự báo có thể tổng quát hóa.

**Ghi nhớ:** Mức fine-tuning nên cân bằng độ khác domain, lượng dữ liệu, compute và chất lượng validation.

### Câu 99 — Parameter-efficient fine-tuning
Mục tiêu của parameter-efficient fine-tuning là:

A. Chỉ cập nhật một phần nhỏ tham số/bổ sung module nhỏ để giảm memory và compute
B. Luôn train toàn bộ model từ đầu
C. Không cần dữ liệu
D. Chỉ thay tokenizer mà không tối ưu gì

**Đáp án: A.** PEFT giữ phần lớn backbone cố định và chỉ học một tập tham số nhỏ hoặc module bổ sung. Ví dụ LoRA biểu diễn phần cập nhật weight bằng các ma trận hạng thấp. Cách này thường giảm bộ nhớ gradient/optimizer và dung lượng checkpoint, nhưng vẫn phải chạy nhiều phép tính forward của backbone.

**Vì sao các phương án còn lại sai?**
- **B:** Train toàn bộ từ đầu là mục tiêu khác, tốn tham số cập nhật và không tận dụng backbone cố định như PEFT.
- **C:** Vẫn cần dữ liệu hoặc tín hiệu tối ưu cho tác vụ thích nghi; ít tham số học hơn không đồng nghĩa không cần học.
- **D:** Chỉ thay tokenizer mà không tối ưu tham số không phải cơ chế PEFT và còn có thể làm lệch mapping với embedding pretrained.

**Ghi nhớ:** PEFT giảm phần cần cập nhật, không làm model gốc biến mất hay tự đảm bảo chất lượng bằng full fine-tuning.

### Câu 100 — Fine-tuning learning rate
Bạn fine-tune encoder pretrained và head mới. Một chiến lược hợp lý là:

A. Dùng learning rate nhỏ hơn cho backbone và lớn hơn cho head mới
B. Dùng LR cực lớn cho backbone để “quên” pretraining ngay
C. Không cần optimizer cho head
D. Chỉ cập nhật BatchNorm running mean, không weight nào khác

**Đáp án: A.** Backbone pretrained đã chứa đặc trưng hữu ích, nên LR nhỏ giúp điều chỉnh từ từ thay vì phá hỏng chúng. Head mới thường khởi tạo ngẫu nhiên và cần học nhanh hơn. Có thể tạo các parameter groups với LR khác nhau và chọn mức phù hợp trên validation.

**Vì sao các phương án còn lại sai?**
- **B:** LR cực lớn dễ làm mất representation pretrained và gây bất ổn; “quên ngay” không phải mục tiêu thích nghi thông thường.
- **C:** Head mới có weight cần học. Nếu không có cơ chế cập nhật, nó không thể tự tối ưu chỉ nhờ backbone đã pretrained.
- **D:** Chỉ đổi running mean của BatchNorm không học được classifier head mới và không tương đương fine-tuning encoder/head.

**Ghi nhớ:** Các phần model có mức độ trưởng thành khác nhau có thể cần learning rate và lịch unfreeze khác nhau.


## C. Computer Vision

### Câu 101 — Convolution output size
Input ảnh `32×32`, convolution kernel `3×3`, stride 1, padding 1. Spatial output là:

A. `30×30`
B. `31×31`
C. `32×32`
D. `34×34`

**Đáp án: C.** Với dilation 1, mỗi chiều output là `floor((W + 2P - K)/S) + 1`. Thay `W=32`, `P=1`, `K=3`, `S=1` được `floor(31)+1 = 32`. Hai chiều giống nhau nên output spatial là `32×32`; padding vừa đủ bù phần mất do kernel 3.

**Vì sao các phương án còn lại sai?**
- **A:** `30×30` là kết quả nếu padding bằng 0. Nó bỏ qua hai phía đệm mỗi phía 1 pixel đã cho.
- **B:** 31 là giá trị trung gian trước khi cộng 1 vị trí đầu tiên trong công thức đếm cửa sổ.
- **D:** `34×34` là kích thước sau đệm trước khi convolution, không phải kích thước sau khi kernel trượt qua.

**Ghi nhớ:** Dilation, padding, kernel và stride đều ảnh hưởng output size; luôn nêu các giả định khi tính.

### Câu 102 — Convolution parameter count
Conv2d có `in_channels=3`, `out_channels=16`, kernel `3×3`, có bias. Số tham số là:

A. 432
B. 448
C. 144
D. 4,608

**Đáp án: B.** Với convolution thông thường `groups=1`, mỗi output channel có kernel `3×3` trải trên 3 input channels, tức 27 weight. Có 16 output channels nên `16*27=432` weight; cộng 16 bias được 448. Kích thước ảnh và batch không làm tăng số tham số này.

**Vì sao các phương án còn lại sai?**
- **A:** 432 đếm đúng weight nhưng thiếu một bias cho mỗi trong 16 output channels.
- **C:** 144 là `16*3*3`, bỏ qua việc mỗi kernel còn phải trải trên cả 3 input channels, chưa kể bias.
- **D:** 4608 không theo công thức `C_out*(C_in*K_h*K_w+1)`; số vị trí kernel được dùng lại không phải tham số riêng.

**Ghi nhớ:** Conv2d chuẩn có bias: `C_out*(C_in*K_h*K_w+1)`; grouped convolution cần điều chỉnh theo `groups`.

### Câu 103 — Weight sharing
Lý do convolution có ít tham số hơn fully connected trên ảnh lớn là:

A. Cùng một kernel được dùng lại ở nhiều vị trí spatial
B. Convolution không có weight
C. Mỗi pixel có một model riêng
D. Convolution luôn giảm ảnh về 1 pixel

**Đáp án: A.** Một kernel học được quét qua nhiều vị trí ảnh bằng cùng bộ trọng số. Vì vậy cùng một mẫu cục bộ có thể được phát hiện ở nhiều nơi mà không cần weight riêng cho từng pixel. Kết hợp receptive field cục bộ, cơ chế này thường giảm tham số so với fully connected trên ảnh lớn.

**Vì sao các phương án còn lại sai?**
- **B:** Convolution có weight học được trong các kernel và có thể có bias; ít tham số không có nghĩa không có tham số.
- **C:** Một model riêng cho mỗi pixel sẽ mất chính cơ chế chia sẻ và thường làm số tham số tăng mạnh.
- **D:** Conv không bắt buộc giảm ảnh về 1 pixel. Output size phụ thuộc kernel, stride, padding và dilation.

**Ghi nhớ:** Weight sharing là dùng cùng detector tại nhiều vị trí, không phải học bộ detector mới cho từng vị trí.

### Câu 104 — Stride
Tăng stride từ 1 lên 2 trong convolution thường làm:

A. Spatial resolution giảm nhanh hơn
B. Số channel luôn tăng gấp đôi
C. Kernel nhỏ lại
D. Không ảnh hưởng kích thước output

**Đáp án: A.** Stride 2 làm kernel nhảy 2 vị trí thay vì 1 theo mỗi chiều, nên có ít vị trí output hơn khi các cấu hình khác giữ nguyên. Với ảnh đủ lớn và padding phù hợp, spatial size thường giảm gần một nửa mỗi chiều, nhưng cần công thức để tính chính xác.

**Vì sao các phương án còn lại sai?**
- **B:** Số output channel do `out_channels` quyết định, không tự nhân đôi khi đổi stride.
- **C:** Kernel size và stride là hai hyperparameter riêng; tăng bước trượt không tự đổi kích thước kernel.
- **D:** Stride nằm trong mẫu số công thức output size, nên thường ảnh hưởng rõ kích thước spatial.

**Ghi nhớ:** Stride điều khiển lấy mẫu theo không gian; channel count điều khiển số feature maps đầu ra.

### Câu 105 — Padding
Padding thường được dùng để:

A. Kiểm soát kích thước output và giữ thông tin biên tốt hơn
B. Tăng số label
C. Thay loss function
D. Tạo train/test split

**Đáp án: A.** Padding bổ sung giá trị quanh biên để kernel có thể đặt tại nhiều vị trí hơn, nhờ đó kiểm soát mức giảm kích thước. Ví dụ kernel 3, stride 1, padding 1 giữ nguyên spatial size. Cách đệm có thể tạo hiệu ứng biên nên không đồng nghĩa khôi phục thông tin đã mất.

**Vì sao các phương án còn lại sai?**
- **B:** Padding thêm vị trí tensor, không thêm loại nhãn trong target.
- **C:** Loss vẫn được chọn theo tác vụ. Đệm input không thay định nghĩa cross-entropy, MSE hay loss khác.
- **D:** Train/test split chia các mẫu thành tập dữ liệu; padding biến đổi cấu trúc một mẫu, không thực hiện việc chia tập.

**Ghi nhớ:** Padding kiểm soát hình học output; loại padding cũng là giả định về vùng ngoài biên ảnh.

### Câu 106 — Image classification transfer learning
Bạn có 2,000 ảnh mèo/chó. ResNet pretrained ImageNet có sẵn. Bước đầu hợp lý nhất?

A. Dùng pretrained encoder, thay classification head rồi fine-tune phù hợp
B. Bắt buộc train CNN rất sâu từ random initialization
C. Dùng K-Means và coi cluster là nhãn thật
D. Không normalize ảnh theo yêu cầu model

**Đáp án: A.** Encoder pretrained ImageNet đã học nhiều đặc trưng ảnh có thể tái sử dụng. Thay head cho hai lớp mèo/chó rồi train head hoặc fine-tune có kiểm soát tận dụng được kiến thức đó với 2000 ảnh. Cần preprocessing đúng pretrained weights, tách validation và augmentation chỉ trên train.

**Vì sao các phương án còn lại sai?**
- **B:** Train mạng sâu từ đầu thường cần nhiều dữ liệu/compute hơn và không phải bắt buộc khi đã có model pretrained phù hợp.
- **C:** Cluster không tự có nghĩa mèo/chó; K-Means có thể tách theo nền, màu hoặc yếu tố khác thay vì nhãn mục tiêu.
- **D:** Bỏ normalization/preprocessing cần thiết làm phân phối đầu vào khác lúc pretraining và có thể giảm chất lượng đáng kể.

**Ghi nhớ:** Transfer learning gồm cả dùng đúng weight lẫn đúng preprocessing, không chỉ thay layer cuối.

### Câu 107 — Class imbalance trong ảnh
Dataset có 95% class A, 5% class B. Model đạt 95% accuracy nhưng Recall class B gần 0. Hành động hợp lý?

A. Xem metric theo class và cân nhắc class weights/resampling/augmentation phù hợp
B. Kết luận model hoàn hảo
C. Xóa class B
D. Chỉ tăng image resolution

**Đáp án: A.** Đoán toàn class A đã có thể đạt 95% accuracy, nên con số tổng không nói lên khả năng phát hiện B. Cần confusion matrix, Precision/Recall/F1 từng lớp; class weights hoặc resampling có thể tăng mức chú ý tới B, rồi kiểm tra đánh đổi trên validation có phân phối phù hợp.

**Vì sao các phương án còn lại sai?**
- **B:** Recall B gần 0 nghĩa là bỏ sót gần hết lớp B; không thể gọi mô hình hoàn hảo nếu B là lớp cần phát hiện.
- **C:** Xóa B loại bỏ một phần bài toán thay vì giải quyết chất lượng dự đoán cho lớp đó.
- **D:** Độ phân giải cao hơn không trực tiếp sửa mất cân bằng; có thể tăng compute mà không cải thiện Recall B.

**Ghi nhớ:** Cân bằng dữ liệu train là một can thiệp; đánh giá vẫn phải phản ánh phân phối và chi phí lỗi thực tế.

### Câu 108 — Detection vs classification
Bài toán “xác định có bao nhiêu ô tô và vị trí từng ô tô trong ảnh” là:

A. Image classification
B. Object detection
C. PCA
D. Autoencoder reconstruction

**Đáp án: B.** Object detection dự đoán từng instance cùng nhãn và vị trí, thường bằng bounding boxes. Sau khi lọc dự đoán theo ngưỡng và xử lý trùng phù hợp, có thể đếm số box ô tô để ước lượng số xe trong ảnh.

**Vì sao các phương án còn lại sai?**
- **A:** Classification toàn ảnh có thể cho biết ảnh chứa ô tô, nhưng không mặc định trả số lượng và vị trí từng chiếc.
- **C:** PCA chỉ biến đổi feature xuống ít chiều, không tự tạo nhãn và tọa độ cho các object.
- **D:** Reconstruction tái tạo ảnh đầu vào, không có mục tiêu bắt buộc liệt kê từng ô tô và bounding box.

**Ghi nhớ:** Classification trả nhãn ảnh; detection trả nhãn và vị trí từng object; segmentation trả nhãn theo pixel.

### Câu 109 — IoU
Bounding box prediction và ground truth trùng nhau hoàn toàn. IoU bằng:

A. 0
B. 0.5
C. 1
D. Phụ thuộc learning rate

**Đáp án: C.** IoU bằng diện tích giao chia diện tích hợp: `|P ∩ G| / |P ∪ G|`. Với hai box không suy biến trùng hoàn toàn, cả giao lẫn hợp bằng diện tích cùng một box, nên tỷ số là 1, mức chồng lấp tối đa.

**Vì sao các phương án còn lại sai?**
- **A:** IoU 0 tương ứng không có diện tích giao, trái trường hợp box trùng hoàn toàn.
- **B:** IoU 0.5 nghĩa là diện tích giao bằng một nửa diện tích hợp, không phải hai box giống hệt nhau.
- **D:** Khi đã cố định hai box, IoU chỉ phụ thuộc hình học của chúng. Learning rate không tham gia công thức.

**Ghi nhớ:** Phân biệt diện tích hợp với tổng diện tích hai box; phần giao chỉ được tính một lần trong hợp.

### Câu 110 — NMS
Một detector tạo nhiều box chồng lấp mạnh quanh cùng một object. NMS truyền thống dùng để:

A. Giữ box confidence cao và loại bớt box trùng lặp theo IoU
B. Tăng số box càng nhiều càng tốt
C. Chuẩn hóa pixel
D. Huấn luyện tokenizer

**Đáp án: A.** NMS truyền thống thường chọn box confidence cao nhất, rồi loại các box cùng nhóm xử lý có IoU vượt ngưỡng với box đó; quy trình lặp lại với các box còn lại. Mục tiêu là giảm nhiều dự đoán cho cùng object, không thay thế bước model dự đoán box.

**Vì sao các phương án còn lại sai?**
- **B:** Giữ càng nhiều box trùng càng dễ đếm sai và tăng false positives. NMS được dùng để giảm trùng, không nhân số box.
- **C:** Chuẩn hóa pixel là preprocessing trước model. NMS xử lý các dự đoán box/score ở đầu ra.
- **D:** Tokenizer thuộc biểu diễn chuỗi văn bản; NMS không học vocabulary hay phân tách token.

**Ghi nhớ:** Ngưỡng IoU NMS quá thấp có thể loại nhầm hai object đứng sát; cần chọn theo dữ liệu và detector.

### Câu 111 — YOLO/SSD/DETR
Phát biểu nào đúng nhất?

A. YOLO và SSD là one-stage detectors; DETR dùng Transformer và set prediction
B. DETR là K-Means cho ảnh
C. YOLO chỉ segmentation
D. SSD là language model

**Đáp án: A.** YOLO và SSD là các họ detector one-stage, dự đoán lớp và box trực tiếp trong một pipeline không dùng stage proposal riêng kiểu two-stage. DETR gốc dùng Transformer và set prediction với matching để học tập object dự đoán, khác cách xử lý nhiều ứng viên bằng NMS truyền thống.

**Vì sao các phương án còn lại sai?**
- **B:** DETR là object detector có giám sát, không phải thuật toán tìm centroid không giám sát như K-Means.
- **C:** YOLO có nguồn gốc và nhiều phiên bản cho detection; các biến thể segmentation không làm nó trở thành họ chỉ có segmentation.
- **D:** SSD trong ngữ cảnh này là Single Shot MultiBox Detector, không phải language model sinh token.

**Ghi nhớ:** Nhận biết mục tiêu và pipeline của từng họ model; tránh suy diễn mọi biến thể đều có chi tiết giống bản gốc.

### Câu 112 — Segmentation
Bài “gán nhãn từng pixel là đường, xe, người, vỉa hè” là:

A. Image classification
B. Semantic segmentation
C. Regression một scalar
D. Clustering bắt buộc

**Đáp án: B.** Semantic segmentation gán cho mỗi pixel một class như đường, xe, người hoặc vỉa hè. Output giữ cấu trúc không gian dày đặc thay vì một nhãn cho toàn ảnh. Semantic segmentation không nhất thiết phân biệt hai object khác nhau nếu chúng cùng class.

**Vì sao các phương án còn lại sai?**
- **A:** Image classification trả nhãn toàn ảnh, không đáp ứng yêu cầu biết từng pixel thuộc loại nào.
- **C:** Một scalar không chứa đủ thông tin để biểu diễn class tại mọi vị trí ảnh.
- **D:** Segmentation có thể được huấn luyện có giám sát bằng mask. Không có yêu cầu bắt buộc phải dùng clustering.

**Ghi nhớ:** Semantic segmentation phân biệt class của pixel; instance segmentation còn tách các object cùng class.

### Câu 113 — U-Net skip connections
Skip connections trong U-Net giúp chủ yếu:

A. Kết hợp feature mức cao từ encoder với chi tiết spatial độ phân giải cao ở decoder
B. Xóa hoàn toàn encoder
C. Chỉ giảm learning rate
D. Tạo bounding boxes

**Đáp án: A.** U-Net nối feature maps từ các mức encoder sang decoder ở độ phân giải tương ứng. Decoder kết hợp thông tin ngữ nghĩa đã qua nén với chi tiết vị trí còn giữ trong feature encoder, giúp phục hồi biên và cấu trúc nhỏ khi tạo mask segmentation.

**Vì sao các phương án còn lại sai?**
- **B:** Skip connections dùng thông tin từ encoder, không xóa encoder; thiếu encoder thì không còn nguồn feature để kết hợp theo cách đó.
- **C:** Learning rate do optimizer/scheduler điều khiển. Skip connections là cấu trúc đường truyền feature, không trực tiếp đặt LR.
- **D:** U-Net chuẩn dự đoán mask theo pixel. Skip connections không tự biến output thành tập bounding boxes của detector.

**Ghi nhớ:** Chi tiết spatial có thể mất khi downsample; skip connections bổ sung lại thông tin ở độ phân giải cao.

### Câu 114 — Dice/IoU
Trong segmentation với foreground nhỏ, metric nào thường hữu ích hơn Accuracy pixel đơn thuần?

A. IoU hoặc Dice
B. MSE của learning rate
C. Top-5 accuracy của ImageNet bắt buộc
D. PCA explained variance

**Đáp án: A.** Nếu foreground chỉ chiếm 1% pixel, đoán toàn background vẫn được 99% pixel accuracy. IoU foreground bằng `TP/(TP+FP+FN)` và Dice bằng `2TP/(2TP+FP+FN)` nên phản ánh việc tìm đúng vùng foreground rõ hơn, không để số lượng TN nền áp đảo trực tiếp.

**Vì sao các phương án còn lại sai?**
- **B:** Learning rate là hyperparameter, không phải mask target. MSE của LR không đo vùng phân đoạn đúng hay sai.
- **C:** Top-5 classification accuracy đo nhãn ảnh, không đo sự khớp pixel của mask foreground nhỏ.
- **D:** Explained variance của PCA đo thông tin phương sai giữ lại khi giảm chiều, không phản ánh chất lượng segmentation.

**Ghi nhớ:** Cần nói rõ metric tính theo class và cách xử lý mask rỗng; Dice/IoU cao hơn thường là tốt hơn.

### Câu 115 — Pretrained encoder domain shift
ResNet pretrained ảnh tự nhiên hoạt động kém trên ảnh X-quang. Lựa chọn hợp lý?

A. Fine-tune có kiểm soát và dùng preprocessing/augmentation phù hợp domain
B. Kết luận pretrained model không bao giờ dùng được ngoài ImageNet
C. Chỉ đổi tên class
D. Tăng số epoch mà không kiểm tra validation

**Đáp án: A.** Ảnh X-quang khác ảnh tự nhiên về texture, số channel, phân bố cường độ và cấu trúc mục tiêu. Fine-tuning có kiểm soát cùng preprocessing và augmentation đúng domain cho phép thích nghi representation. Cần đánh giá bằng validation phù hợp và tránh chia các ảnh liên quan cùng đối tượng sang hai tập.

**Vì sao các phương án còn lại sai?**
- **B:** Pretraining vẫn có thể cung cấp feature hữu ích ngoài ImageNet. Mức lợi ích cần đo, không thể phủ định mọi trường hợp.
- **C:** Đổi tên class không thay weights hoặc phân phối feature nên không giải quyết khác biệt domain.
- **D:** Thêm epoch mà không theo dõi validation có thể tăng overfit, nhất là khi dataset domain mới ít.

**Ghi nhớ:** Domain shift cần kiểm tra cả dữ liệu, preprocessing và representation, không chỉ số epoch.

### Câu 116 — Image augmentation
Augmentation nào không phù hợp nếu hướng trái/phải là thông tin nhãn quan trọng, ví dụ ảnh ký hiệu “rẽ trái/rẽ phải”?

A. Random horizontal flip không kiểm soát
B. Resize nhất quán
C. Normalize theo statistics phù hợp
D. Crop nhẹ không làm mất object

**Đáp án: A.** Lật ngang biển “rẽ trái” có thể tạo hình giống “rẽ phải”. Nếu giữ nhãn cũ sau biến đổi, ta đưa mẫu mâu thuẫn vào train. Vì vậy không được áp flip tùy ý khi hướng là yếu tố quyết định class; nếu dùng phải biến đổi nhãn đúng theo ý nghĩa tác vụ.

**Vì sao các phương án còn lại sai?**
- **B:** Resize nhất quán và phù hợp model thường giữ hướng trái/phải; nó không phải biến đổi đảo nhãn như flip trong ví dụ.
- **C:** Normalize phù hợp điều chỉnh cường độ pixel, không tự hoán đổi ngữ nghĩa trái với phải.
- **D:** Crop nhẹ đã giả định không mất object và vẫn cần giữ dấu hiệu phân biệt nhãn, nên không phải lựa chọn gây đảo hướng rõ như A.

**Ghi nhớ:** Augmentation chỉ hợp lệ khi giữ đúng nhãn hoặc có quy tắc cập nhật nhãn tương ứng.

### Câu 117 — GAN
GAN gồm hai thành phần chính:

A. Generator và discriminator cạnh tranh trong adversarial training
B. Encoder và K-Means
C. Logistic Regression và PCA
D. Tokenizer và ROC curve

**Đáp án: A.** Generator tạo dữ liệu giả từ latent input, còn discriminator học phân biệt mẫu thật với mẫu sinh. Hai thành phần tương tác qua mục tiêu đối kháng: generator cố tạo mẫu thuyết phục hơn, discriminator cố nhận biết tốt hơn. Sự cạnh tranh này cung cấp tín hiệu học cho generator.

**Vì sao các phương án còn lại sai?**
- **B:** Encoder và K-Means có thể dùng trong hệ thống biểu diễn/phân cụm, nhưng không tạo cặp sinh–phân biệt đối kháng của GAN chuẩn.
- **C:** Logistic Regression và PCA là các công cụ khác; chỉ ghép tên chúng không mô tả hai vai trò cốt lõi của GAN.
- **D:** Tokenizer biểu diễn text, ROC đánh giá classifier; chúng không phải hai mạng cạnh tranh để học phân phối sinh.

**Ghi nhớ:** GAN học qua tín hiệu đối kháng, khác autoencoder tái tạo trực tiếp hoặc diffusion học denoising.

### Câu 118 — Mode collapse
Trong GAN, mode collapse là hiện tượng:

A. Generator chỉ tạo ra một số kiểu mẫu hạn chế dù dữ liệu thật đa dạng
B. Loss luôn bằng 0 vì model hoàn hảo
C. Ảnh bị chuẩn hóa về mean 0
D. Batch size quá lớn duy nhất

**Đáp án: A.** Mode collapse xảy ra khi generator chỉ sinh một vài kiểu mẫu, dù dữ liệu thật có nhiều nhóm đa dạng. Ví dụ dữ liệu có nhiều chữ số nhưng generator chủ yếu tạo một loại chữ số. Mẫu riêng lẻ có thể trông thật, trong khi độ bao phủ phân phối vẫn rất kém.

**Vì sao các phương án còn lại sai?**
- **B:** Loss nhỏ không tự chứng minh GAN hoàn hảo; các loss đối kháng không đo trực tiếp đủ chất lượng lẫn độ đa dạng.
- **C:** Chuẩn hóa ảnh về mean 0 là preprocessing, không có nghĩa generator mất đa dạng các kiểu mẫu.
- **D:** Không có nguyên nhân duy nhất là batch size lớn. Collapse có thể liên quan mất cân bằng huấn luyện và động học tối ưu đối kháng.

**Ghi nhớ:** Đánh giá model sinh cần xem cả độ chân thực và độ đa dạng, không chỉ một ảnh đẹp hoặc một giá trị loss.

### Câu 119 — Diffusion model
Mô tả đúng nhất về diffusion model sinh ảnh là:

A. Học quá trình denoising để dần biến nhiễu thành mẫu dữ liệu
B. Chỉ dùng một linear layer
C. Không cần training
D. Luôn nhanh hơn GAN khi inference vì chỉ cần một bước

**Đáp án: A.** Diffusion học khử nhiễu ở các mức nhiễu khác nhau của dữ liệu. Khi sinh, quy trình thường bắt đầu từ noise và dùng các bước khử nhiễu để dần tạo mẫu có cấu trúc. Số bước và sampler ảnh hưởng rõ tốc độ/chất lượng; các biến thể rút gọn không làm mô tả nhiều bước thông thường mất giá trị.

**Vì sao các phương án còn lại sai?**
- **B:** Model denoising thực tế thường là mạng phi tuyến có khả năng biểu diễn lớn, không bị giới hạn ở một linear layer.
- **C:** Khả năng khử nhiễu được học từ dữ liệu; diffusion không tự sinh đúng phân phối mà không có training/pretrained model.
- **D:** Diffusion thường cần nhiều lần chạy mạng; một số model được rút gọn ít bước không chứng minh nó luôn nhanh hơn GAN.

**Ghi nhớ:** So sánh tốc độ phải gắn model, sampler, số bước, độ phân giải và phần cứng cụ thể.

### Câu 120 — CLIP & self-supervised/contrastive learning
Một hệ thống muốn zero-shot phân loại ảnh bằng tên class dạng text. Mô hình phù hợp nhất trong syllabus là:

A. CLIP, so khớp embedding ảnh và text
B. K-Means thuần
C. Linear Regression
D. Autoencoder chỉ reconstruction

**Đáp án: A.** CLIP học image encoder và text encoder để cặp ảnh–mô tả đúng có embedding tương đồng. Khi zero-shot classification, ta mã hóa mô tả các class và chọn class có text embedding giống image embedding nhất. Không cần train classifier mới cho chính tập class đó, nhưng chất lượng phụ thuộc prompt và domain.

**Vì sao các phương án còn lại sai?**
- **B:** K-Means thuần không học ánh xạ chung giữa tên class dạng text và nội dung ảnh, nên cluster không tự mang ngữ nghĩa class.
- **C:** Linear Regression cơ bản không có sẵn hai encoder ảnh–text đã được căn chỉnh để so khớp zero-shot.
- **D:** Reconstruction-only autoencoder học tái tạo ảnh, không mặc định liên kết biểu diễn ảnh với mô tả ngôn ngữ.

**Ghi nhớ:** Zero-shot dựa vào kiến thức và alignment đã học trước, không có nghĩa model chưa từng được train.

## D. NLP & Âm thanh

### Câu 121 — BERT architecture
BERT tiêu chuẩn được xem là:

A. Encoder-only Transformer
B. Decoder-only autoregressive model
C. CNN detector
D. K-Means clustering model

**Đáp án: A.** BERT tiêu chuẩn là một stack Transformer encoders dùng self-attention hai chiều trên input. Nó tạo representation theo ngữ cảnh cho từng token và thường được gắn head cho tác vụ downstream. Mục tiêu masked language modeling khi pretrain khác next-token generation của decoder-only causal model.

**Vì sao các phương án còn lại sai?**
- **B:** Decoder-only autoregressive model thường chỉ attend quá khứ để sinh token tiếp theo. Đây không phải kiến trúc BERT tiêu chuẩn.
- **C:** BERT xử lý chuỗi token bằng Transformer, không phải CNN detector trả bounding boxes trong ảnh.
- **D:** K-Means tìm centroid cluster, không có các layer attention và mục tiêu học contextual language representation của BERT.

**Ghi nhớ:** Phân biệt encoder-only, decoder-only và encoder–decoder theo cách attention và vai trò biểu diễn/sinh chuỗi.

### Câu 122 — BERT context
Điểm mạnh chính của BERT so với language model causal một chiều trong representation là:

A. Có thể dùng ngữ cảnh cả bên trái và bên phải token trong encoder
B. Chỉ đọc token bên trái
C. Không dùng attention
D. Không cần tokenization

**Đáp án: A.** BERT encoder có thể dùng token ở cả hai phía trong chuỗi đầu vào để biểu diễn một vị trí. Nhờ vậy ngữ cảnh xuất hiện sau một từ cũng giúp phân biệt nghĩa của nó. Causal model thông thường không được dùng token tương lai khi dự đoán next token.

**Vì sao các phương án còn lại sai?**
- **B:** Chỉ đọc bên trái là ràng buộc causal một chiều, bỏ qua đặc trưng bidirectional đang được hỏi của BERT.
- **C:** Self-attention là thành phần trung tâm của Transformer encoder trong BERT, không phải thành phần bị loại bỏ.
- **D:** BERT vẫn cần tokenization để biến văn bản thành token IDs và các input liên quan trước khi vào encoder.

**Ghi nhớ:** Ngữ cảnh hai chiều phù hợp nhiều tác vụ hiểu input đầy đủ; nó không thể dùng nguyên xi để nhìn trước target khi sinh causal.

### Câu 123 — BERT `[CLS]`
Trong text classification, cách phổ biến là:

A. Dùng representation của `[CLS]` hoặc pooled output đưa qua classifier head
B. Dùng K-Means trên raw string bắt buộc
C. Xóa toàn bộ attention mask
D. Chỉ dùng token cuối mà không train head

**Đáp án: A.** `[CLS]` là token đặc biệt thường đặt ở đầu chuỗi BERT. Hidden representation của nó hoặc pooled output được đưa qua classifier head và học với nhãn tác vụ. Đây là cách tổng hợp biểu diễn cả câu phổ biến, dù mean pooling hoặc cách pooling khác cũng có thể phù hợp.

**Vì sao các phương án còn lại sai?**
- **B:** K-Means không bắt buộc trong classification và raw strings chưa có khoảng cách số phù hợp để chạy như các vector feature.
- **C:** Bỏ attention mask có thể khiến pad được xem là nội dung thật, làm sai biểu diễn khi batch chứa câu dài ngắn khác nhau.
- **D:** Token cuối của BERT không mặc định là dự đoán class; vẫn cần phương pháp pooling/head và quá trình học phù hợp.

**Ghi nhớ:** Representation toàn câu không tự có nghĩa nhãn; classifier head ánh xạ nó sang class của bài toán.

### Câu 124 — BERT fine-tuning
Dataset sentiment nhỏ. Chiến lược hợp lý nhất là:

A. Fine-tune BERT pretrained với classifier head, learning rate nhỏ phù hợp
B. Train BERT từ đầu trên vài nghìn câu bắt buộc
C. Dùng image augmentation
D. Dùng object detector

**Đáp án: A.** BERT pretrained đã học cấu trúc ngôn ngữ từ lượng text lớn. Gắn classifier head rồi fine-tune với LR nhỏ giúp thích nghi cho sentiment mà không học ngôn ngữ lại từ đầu. Với tập nhỏ, cần validation, early stopping và có thể freeze bớt layer nếu overfit hoặc thiếu tài nguyên.

**Vì sao các phương án còn lại sai?**
- **B:** Vài nghìn câu thường không đủ thay thế pretraining quy mô lớn; train từ đầu không phải điều bắt buộc và thường kém hiệu quả.
- **C:** Image augmentation như lật ảnh không áp dụng trực tiếp cho chuỗi văn bản. Biến đổi text phải bảo toàn sentiment nếu sử dụng.
- **D:** Object detector trả vị trí vật thể ảnh, không tạo pipeline phù hợp cho phân loại cảm xúc câu.

**Ghi nhớ:** Dataset nhỏ thường hưởng lợi từ pretrained encoder, nhưng vẫn cần đánh giá để tránh overfit khi fine-tune.

### Câu 125 — Language modeling
Autoregressive language model học chủ yếu:

A. Xác suất token tiếp theo dựa trên các token trước đó
B. Số cluster của câu
C. Bounding box của token
D. Reconstruction ảnh

**Đáp án: A.** Autoregressive LM phân rã xác suất chuỗi thành tích `p(x_t | x_1,...,x_(t-1))`. Khi train, model học dự đoán token tiếp theo từ prefix hợp lệ; khi sinh, token mới được nối vào prefix rồi tiếp tục dự đoán. Vì vậy thứ tự và causal mask rất quan trọng.

**Vì sao các phương án còn lại sai?**
- **B:** Đếm hoặc tìm số cluster không biểu diễn phân phối xác suất token tiếp theo và không phải objective language modeling này.
- **C:** Bounding box thuộc định vị không gian, không phải target cơ bản của language model trên chuỗi token.
- **D:** Reconstruction ảnh là tác vụ khác; một model đa phương thức có thể thêm mục tiêu ảnh nhưng đó không phải định nghĩa autoregressive LM.

**Ghi nhớ:** Language modeling học phân phối chuỗi; quá trình sinh dùng lặp lại phân phối token điều kiện theo prefix.

### Câu 126 — Causal leakage
Trong training next-token model, nếu token ở vị trí `t` được attention trực tiếp tới token `t+1` là target cần dự đoán, điều gì xảy ra?

A. Data leakage do model nhìn tương lai
B. Regularization tốt hơn
C. Tự động tạo padding đúng
D. Không ảnh hưởng vì attention không dùng thông tin token

**Đáp án: A.** Nếu representation tại `t` nhìn được token `t+1` đang làm target, model có thể đọc trực tiếp đáp án thay vì học dự đoán từ quá khứ. Train loss có thể rất thấp nhưng inference không có token tương lai đó. Cần shift input/target và causal mask nhất quán.

**Vì sao các phương án còn lại sai?**
- **B:** Đây là thêm thông tin không hợp lệ, không phải regularization. Regularization không cho phép model nhìn target cần dự đoán.
- **C:** Padding mask và causal mask có mục đích khác; nhìn target tương lai không tự làm phần pad được xử lý đúng.
- **D:** Attention dùng representation của token để tổng hợp thông tin. Do đó nhìn target có thể ảnh hưởng trực tiếp prediction.

**Ghi nhớ:** Teacher forcing cho input token thật trước đó là hợp lệ; nhìn trực tiếp token đang phải dự đoán là leakage.

### Câu 127 — Perplexity
Hai language model đánh giá trên cùng test set có perplexity 18 và 25. Nếu các điều kiện khác giống nhau, model nào tốt hơn về next-token likelihood?

A. Model perplexity 18
B. Model perplexity 25
C. Hai model chắc chắn bằng nhau
D. Không thể so sánh dù cùng tokenizer/evaluation setup

**Đáp án: A.** Perplexity thường bằng `exp(mean negative log-likelihood)` khi dùng log tự nhiên. Exponential tăng đơn điệu, nên perplexity 18 tương ứng loss next-token trung bình thấp hơn 25 trên cùng tokenizer, tập test và cách đánh giá. Đây là tiêu chí likelihood, không bảo đảm tốt hơn ở mọi tác vụ downstream.

**Vì sao các phương án còn lại sai?**
- **B:** Perplexity lớn hơn nghĩa là target tokens được gán xác suất kém hơn theo trung bình log, không phải tốt hơn.
- **C:** Hai giá trị khác nhau biểu thị mean log-likelihood khác nhau trong cùng setup; không thể kết luận chắc chắn bằng nhau.
- **D:** Điều kiện cùng tokenizer và evaluation setup chính là cơ sở để so sánh. Thiếu điều kiện đó mới cần thận trọng hơn.

**Ghi nhớ:** Perplexity thấp hơn tốt hơn cho likelihood trong cùng điều kiện; không so tùy ý giữa tokenizer hoặc cách tính loss khác nhau.

### Câu 128 — Tokenization
Vì sao subword tokenization hữu ích hơn vocabulary chỉ chứa từ nguyên vẹn trong nhiều NLP system?

A. Có thể biểu diễn từ hiếm/chưa thấy bằng các mảnh nhỏ, kiểm soát kích thước vocabulary
B. Luôn tạo đúng một token cho mỗi câu
C. Loại bỏ hoàn toàn OOV trong mọi ngôn ngữ mà không có trade-off
D. Không cần vocabulary

**Đáp án: A.** Subword chia từ thành các đơn vị nhỏ có thể tái sử dụng, nên từ hiếm hoặc dạng biến thể có thể được ghép từ những mảnh đã biết. Điều này cân bằng vocabulary size với độ dài chuỗi, thay vì cần một mục riêng cho mọi từ nguyên vẹn.

**Vì sao các phương án còn lại sai?**
- **B:** Một câu thường được chia thành nhiều token; số lượng phụ thuộc văn bản và thuật toán, không cố định bằng một.
- **C:** Khả năng xử lý ký tự chưa biết tùy tokenizer, có dùng byte fallback hay không; vẫn có trade-off về độ dài và chất lượng phân mảnh.
- **D:** Subword tokenizer vẫn dùng tập đơn vị/mã hóa đã định nghĩa. Các token hoặc byte cần ánh xạ sang IDs cho model.

**Ghi nhớ:** Token không đồng nghĩa từ; so sánh context length hoặc perplexity cần xét tokenizer cụ thể.

### Câu 129 — Text classification pipeline
Thứ tự pipeline hợp lý cho BERT text classification là:

A. Tokenize → padding/attention mask → encoder → classifier head
B. PCA → YOLO → tokenizer
C. K-Means → object detection
D. Normalize ảnh → U-Net

**Đáp án: A.** Tokenizer tạo token IDs và special tokens; padding cùng attention mask tạo batch hợp lệ. Encoder biến input thành contextual representations, rồi classifier head ánh xạ biểu diễn câu sang logits nhãn. Trong nhiều thư viện, tokenization, padding và tạo mask có thể thực hiện trong cùng một lời gọi.

**Vì sao các phương án còn lại sai?**
- **B:** PCA và YOLO không chuyển raw text thành input IDs phù hợp BERT; YOLO còn là detector ảnh.
- **C:** K-Means rồi object detection không tạo contextual language representation hay classifier sentiment/toxic theo pipeline BERT.
- **D:** Normalize ảnh và U-Net thuộc xử lý ảnh/segmentation, không phải chuỗi bước chuẩn cho BERT text classification.

**Ghi nhớ:** Input phải đúng tokenizer của pretrained model và mask phải đi cùng token IDs khi dùng padding.

### Câu 130 — NLP class imbalance
Phân loại toxic comment có 2% positive. Metric nào nên xem thêm ngoài Accuracy?

A. Precision, Recall, F1 của positive class
B. Chỉ MSE
C. Chỉ explained variance PCA
D. Chỉ number of tokens

**Đáp án: A.** Nếu positive chỉ 2%, đoán mọi bình luận là negative đã đạt 98% accuracy nhưng bỏ sót toàn bộ toxic comments. Precision đo độ đáng tin khi gắn toxic, Recall đo tỷ lệ toxic thật được phát hiện, F1 cân bằng hai đại lượng. Cần chọn threshold theo chi phí chặn nhầm và bỏ sót.

**Vì sao các phương án còn lại sai?**
- **B:** Chỉ MSE không làm rõ hai loại lỗi FP/FN trong nhiệm vụ phân loại lệch lớp này.
- **C:** Explained variance của PCA đánh giá phép giảm chiều, không đo model có tìm đúng toxic comments hay không.
- **D:** Số token liên quan độ dài và chi phí xử lý, không trực tiếp đo phân loại đúng positive class.

**Ghi nhớ:** Không đánh giá tác vụ lớp hiếm chỉ bằng accuracy; cần metric theo lớp và confusion matrix.

### Câu 131 — Encoder-decoder
Machine translation từ tiếng Việt sang tiếng Anh phù hợp tự nhiên với:

A. Encoder-decoder: encoder đọc câu nguồn, decoder sinh câu đích
B. K-Means
C. Linear Regression
D. U-Net

**Đáp án: A.** Encoder đọc toàn bộ câu nguồn và tạo representation; decoder sinh các token câu đích, thường dựa trên prefix đích cùng thông tin nguồn qua cross-attention. Kiến trúc này xử lý tự nhiên hai chuỗi có độ dài khác nhau và học sự tương ứng ngữ nghĩa giữa chúng.

**Vì sao các phương án còn lại sai?**
- **B:** K-Means phân cụm vector, không có cơ chế mặc định sinh bản dịch theo từng token từ câu nguồn.
- **C:** Linear Regression cơ bản dự đoán giá trị số liên tục, không mô hình hóa tự nhiên chuỗi token đích biến độ dài.
- **D:** U-Net chuẩn là kiến trúc ảnh encoder–decoder cho mask; tên encoder–decoder không làm mọi kiến trúc có cấu trúc đó phù hợp dịch máy.

**Ghi nhớ:** Encoder–decoder là một lựa chọn tự nhiên cho translation, không có nghĩa decoder-only không thể thực hiện dịch.

### Câu 132 — Cross-attention
Trong Transformer encoder-decoder, cross-attention ở decoder cho phép:

A. Decoder chú ý tới representations của encoder
B. Encoder chỉ nhìn token tương lai
C. Model bỏ input source
D. Tạo cluster density

**Đáp án: A.** Trong cross-attention, query thường đến từ trạng thái decoder, còn key/value từ encoder output. Mỗi bước sinh có thể chú ý những phần input nguồn phù hợp, như các từ cần dịch lúc đó. Nó khác self-attention của decoder, nơi Q/K/V lấy từ cùng chuỗi phía đích.

**Vì sao các phương án còn lại sai?**
- **B:** Cross-attention ở decoder không đặt quy tắc encoder chỉ nhìn tương lai. Encoder source thường xử lý ngữ cảnh hai chiều hợp lệ.
- **C:** Mục tiêu của cross-attention là dùng input source rõ hơn, không bỏ nó khỏi quá trình sinh.
- **D:** Attention weights là mức tương thích query–key, không phải phép tạo cluster theo mật độ như DBSCAN.

**Ghi nhớ:** Self-attention nhìn trong một nguồn representation; cross-attention truy vấn thông tin từ một nguồn khác.

### Câu 133 — Teacher forcing
Trong training decoder autoregressive, teacher forcing thường nghĩa là:

A. Cung cấp token ground-truth trước đó làm input cho bước dự đoán tiếp theo trong training
B. Luôn dùng prediction sai của model
C. Tắt loss
D. Chỉ dùng unlabeled audio

**Đáp án: A.** Khi train với teacher forcing, để dự đoán token tiếp theo ta cho decoder prefix đích thật đã được dịch chuyển, thay vì bắt nó luôn dùng token vừa tự dự đoán. Điều này cho tín hiệu học ổn định và có thể tính nhiều vị trí song song với causal mask. Inference lại thường dùng prefix tự sinh.

**Vì sao các phương án còn lại sai?**
- **B:** Dùng prediction của model là cơ chế khác; teacher forcing thông thường dùng ground-truth tokens trước đó, không cố ý dùng prediction sai.
- **C:** Vẫn tính loss giữa dự đoán và token target. Bỏ loss sẽ bỏ tín hiệu tối ưu supervised này.
- **D:** Teacher forcing dùng cho nhiều tác vụ sinh chuỗi và không bị giới hạn vào audio không nhãn.

**Ghi nhớ:** Token thật trước đó được dùng làm input, nhưng token target hiện tại vẫn phải được mask để tránh leakage.

### Câu 134 — Open-source vs API LLM
Dữ liệu cực nhạy cảm không được rời hạ tầng nội bộ. Yêu cầu này ưu tiên phương án nào hơn?

A. Chạy model open-source/on-premise nếu chất lượng và tài nguyên đáp ứng
B. Gửi toàn bộ dữ liệu tới API công khai bất kể chính sách
C. Chỉ dùng model lớn nhất theo tên
D. Bỏ encryption và logging

**Đáp án: A.** Khi dữ liệu bắt buộc ở lại nội bộ, model chạy trong hạ tầng được kiểm soát có thể đáp ứng ràng buộc này nếu chất lượng, tài nguyên và điều kiện sử dụng phù hợp. Cần xét cả pipeline, logging và các dịch vụ phụ để dữ liệu không vô tình rời hệ thống.

**Vì sao các phương án còn lại sai?**
- **B:** Gửi dữ liệu ra API công khai bất kể chính sách vi phạm trực tiếp điều kiện của đề bài, dù model API có chất lượng cao.
- **C:** Số tham số hay tên model không chứng minh đáp ứng yêu cầu triển khai, latency, bộ nhớ hoặc chất lượng tác vụ.
- **D:** Bỏ các kiểm soát như encryption hoặc logging phù hợp không giải quyết yêu cầu nội bộ và còn làm mất khả năng bảo vệ/kiểm tra hệ thống.

**Ghi nhớ:** Ràng buộc triển khai là điều kiện loại trừ cần kiểm tra trước khi tối ưu chất lượng và chi phí.

### Câu 135 — Chọn model theo tài nguyên
Ứng dụng cần latency thấp trên GPU nhỏ, accuracy giảm rất ít được chấp nhận. Cách chọn phù hợp nhất?

A. So sánh model theo quality-latency-memory và chọn model nhỏ đáp ứng SLA
B. Luôn chọn model nhiều tham số nhất
C. Chọn ngẫu nhiên
D. Chỉ nhìn train loss

**Đáp án: A.** Cần benchmark chất lượng trên dữ liệu đại diện cùng latency, thông lượng và bộ nhớ ở phần cứng mục tiêu. Nếu model nhỏ đạt ngưỡng chất lượng chấp nhận và SLA, nó phù hợp hơn model lớn vượt tài nguyên. Có thể xét thêm quantization hoặc batching nếu cách dùng cho phép.

**Vì sao các phương án còn lại sai?**
- **B:** Nhiều tham số thường tăng chi phí và không bảo đảm mức tăng chất lượng đáng giá trên tác vụ cụ thể.
- **C:** Chọn ngẫu nhiên không kiểm chứng được điều kiện latency thấp và bộ nhớ GPU nhỏ mà đề yêu cầu.
- **D:** Train loss không cho biết chất lượng trên dữ liệu mới hay thời gian inference và bộ nhớ thực tế.

**Ghi nhớ:** Model “tốt nhất” là model đáp ứng mục tiêu thực tế trong ngân sách, không mặc nhiên là model lớn nhất.

### Câu 136 — Prompting vs fine-tuning
Bạn có API LLM, cần thay đổi nhẹ cách trả lời cho một tác vụ với ít ví dụ và muốn thử nhanh. Bước đầu hợp lý?

A. Thử prompting/few-shot trước, chỉ fine-tune nếu cần nhất quán/khả năng đặc thù hơn
B. Bắt buộc fine-tune hàng tỷ tham số ngay
C. Dùng K-Means
D. Bỏ đánh giá validation

**Đáp án: A.** Với ít ví dụ và yêu cầu đổi nhẹ cách trả lời, prompt rõ ràng cùng vài ví dụ cho phép thử nhanh mà chưa cần cập nhật weight. Nên có bộ đánh giá cố định để xem mức cải thiện. Fine-tuning đáng cân nhắc khi cần tính nhất quán hoặc khả năng đặc thù mà prompting chưa đạt.

**Vì sao các phương án còn lại sai?**
- **B:** Không có yêu cầu phải fine-tune hàng tỷ tham số. Việc đó tăng chi phí và cần dữ liệu/đánh giá phù hợp trước khi chứng minh lợi ích.
- **C:** K-Means không trực tiếp thay đổi hành vi sinh câu trả lời của LLM theo hướng dẫn tác vụ.
- **D:** Không đánh giá khiến ta không biết prompt hay fine-tuning có tốt hơn baseline và có gây lỗi mới không.

**Ghi nhớ:** Bắt đầu bằng thử nghiệm có baseline và đánh giá; tăng độ phức tạp chỉ khi kết quả cho thấy cần thiết.

### Câu 137 — HuBERT
HuBERT trong syllabus phù hợp nhất với vai trò:

A. Pretrained audio/speech encoder học representation từ âm thanh, dùng feature extraction/fine-tuning
B. Object detector ảnh
C. Tabular random forest
D. Diffusion image generator

**Đáp án: A.** HuBERT học representation giọng nói bằng masked prediction các hidden units/pseudo-labels từ audio. Encoder pretrained có thể cung cấp feature hoặc được fine-tune cho tác vụ như nhận dạng giọng nói hay phân loại audio. Representation cần kết hợp head/decoder và cách huấn luyện phù hợp mục tiêu cuối.

**Vì sao các phương án còn lại sai?**
- **B:** Object detector ảnh trả nhãn và vị trí vật thể theo pixel, khác mục tiêu representation speech của HuBERT.
- **C:** Random Forest trên dữ liệu bảng là ensemble cây, không phải speech encoder học từ waveform.
- **D:** Diffusion image generator học sinh ảnh bằng khử nhiễu, không phải cơ chế masked speech representation của HuBERT.

**Ghi nhớ:** HuBERT cung cấp representation audio; nó không mặc định là hệ hỏi–đáp hoàn chỉnh trên mọi loại âm thanh.

### Câu 138 — Audio feature transfer
Bạn có ít dữ liệu gán nhãn cảm xúc giọng nói. Chiến lược hợp lý với HuBERT là:

A. Dùng pretrained HuBERT làm encoder rồi train/fine-tune classifier head
B. Chuyển waveform thành class bằng K-Means và dừng lại
C. Dùng U-Net segmentation ảnh
D. Xóa toàn bộ pretrained weights bắt buộc

**Đáp án: A.** Dùng HuBERT pretrained để mã hóa audio tận dụng representation đã học từ nhiều dữ liệu lời nói. Có thể pooling feature theo thời gian rồi train classifier cảm xúc; nếu dữ liệu và tài nguyên cho phép, fine-tune một phần encoder với LR nhỏ và validation theo người nói phù hợp.

**Vì sao các phương án còn lại sai?**
- **B:** K-Means có thể tạo nhóm acoustic nhưng không tự gán đúng các lớp cảm xúc. Trong HuBERT, clustering phục vụ pseudo-label pretrain chứ không thay classifier cuối.
- **C:** U-Net segmentation ảnh không trực tiếp là pipeline phân loại cảm xúc từ audio với encoder HuBERT.
- **D:** Xóa weights bỏ kiến thức pretrained hữu ích khi nhãn ít; train từ đầu không phải yêu cầu của transfer learning.

**Ghi nhớ:** Học pseudo-label acoustic và dự đoán nhãn cảm xúc là hai mục tiêu khác nhau, cần head và đánh giá riêng.

### Câu 139 — Whisper
Tác vụ chính phù hợp nhất với Whisper là:

A. Automatic speech recognition và speech translation
B. Object detection
C. Image segmentation
D. Tabular clustering

**Đáp án: A.** Whisper là model speech-to-text đa tác vụ, nổi bật ở chép lời và dịch lời nói sang tiếng Anh. Nó nhận audio và sinh văn bản theo tác vụ hỗ trợ; đây là công cụ phù hợp khi đầu ra chính cần là transcript hoặc bản dịch lời nói.

**Vì sao các phương án còn lại sai?**
- **B:** Object detection cần đầu vào ảnh và đầu ra vị trí vật thể; không phải tác vụ chính của Whisper.
- **C:** Image segmentation cần mask theo pixel; Whisper không phải model ảnh được thiết kế tạo các mask đó.
- **D:** Tabular clustering gom các hàng dữ liệu theo feature, khác bài toán chuyển speech thành text của Whisper.

**Ghi nhớ:** Speech recognition, speech translation và hỏi–đáp về âm thanh là các tác vụ khác nhau, dù đều nhận audio.

### Câu 140 — Chọn audio model
Ứng dụng cần “nghe một đoạn audio rồi trả lời câu hỏi về nội dung và âm thanh”, không chỉ chép lời. Cách suy nghĩ đúng nhất?

A. Xem xét audio-language model như Qwen-Audio/Voxtral; Whisper phù hợp hơn khi trọng tâm là transcription/translation
B. Whisper luôn tối ưu cho mọi bài audio reasoning
C. Chỉ dùng Linear Regression trên waveform thô
D. Dùng CLIP image-text vì audio và image giống nhau

**Đáp án: A.** Cần hỏi–đáp về audio nên phải xét model có khả năng kết hợp hiểu âm thanh với chỉ dẫn/ngôn ngữ, như các biến thể Qwen-Audio hoặc Voxtral phù hợp. Transcript từ Whisper có thể hỗ trợ hỏi về lời nói, nhưng không mặc định giữ đủ thông tin tiếng động, giọng điệu hay mọi tín hiệu phi ngôn ngữ.

**Vì sao các phương án còn lại sai?**
- **B:** Chất lượng ASR tốt không bảo đảm tối ưu mọi audio reasoning task. Cần benchmark khả năng và modality đầu vào/đầu ra của đúng phiên bản model.
- **C:** Linear Regression trên waveform thô không có sẵn cơ chế hiểu câu hỏi ngôn ngữ và sinh câu trả lời đa dạng về audio.
- **D:** CLIP image–text không có audio encoder mặc định; không thể coi waveform và ảnh là cùng modality mà bỏ qua cách biểu diễn/huấn luyện.

**Ghi nhớ:** Chọn đúng loại model rồi kiểm tra đúng phiên bản, ngôn ngữ, context audio, tài nguyên và chất lượng trên tác vụ cần làm.

---

# III. CÁC BẪY GIÁM KHẢO DỄ RA

1. **Data leakage**: fit scaler/PCA/feature selector/imputer trên toàn bộ data trước CV; dùng thông tin tương lai ở time series; dùng test set để tune.
2. **Metric sai mục tiêu**: Accuracy trên dữ liệu lệch; Precision vs Recall không gắn với chi phí FP/FN; threshold thay đổi metric.
3. **Train/validation diagnosis**: train tốt, validation tệ = overfit; cả hai tệ = underfit; validation loss tăng sau một epoch = cân nhắc early stopping.
4. **Scale-sensitive models**: K-NN, SVM, Logistic Regression/gradient-based model thường hưởng lợi từ scaling; Decision Tree/Random Forest ít phụ thuộc scale hơn.
5. **Softmax vs sigmoid**: multiclass mutually-exclusive → softmax/cross-entropy; multi-label independent → sigmoid/BCE.
6. **`train()` vs `eval()`**: Dropout và BatchNorm đổi hành vi; `no_grad()` không thay thế `eval()`.
7. **GPU**: model/tensor phải cùng device; workload nhỏ có thể không nhanh hơn CPU.
8. **Cross-validation**: preprocessing phải nằm trong fold; classification mất cân bằng nên cân nhắc stratification; time series không random shuffle như i.i.d.
9. **Transformer**: causal mask chặn tương lai; positional information cần cho thứ tự; self-attention chuẩn có cost tăng nhanh theo sequence length.
10. **CV**: augmentation phải giữ nguyên semantic label; IoU/NMS trong detection; skip connections của U-Net giúp phục hồi detail.
11. **Pretrained model**: dataset nhỏ → freeze/feature extraction trước; domain shift/đủ dữ liệu → fine-tune sâu hơn; chọn model theo tài nguyên.
12. **Câu tính nhanh**: Precision/Recall/F1; output convolution; số tham số dense/conv; shape tensor sau pooling/reshape.

# IV. CÁCH ÔN TỪ NGÂN HÀNG NÀY

- Lượt 1: làm câu mà **không xem đáp án**, đánh dấu câu sai theo chủ đề A1–D7.
- Lượt 2: với mỗi câu sai, tự nói được 3 ý: **khi nào dùng – ưu/nhược điểm – dấu hiệu không phù hợp**.
- Lượt 3: tự đặt biến thể: đổi dữ liệu mất cân bằng, đổi threshold, đổi shape, đổi train/validation curve, đổi một dòng code gây leakage.
- Lượt 4: bốc ngẫu nhiên 40 câu, làm trong 60 phút để mô phỏng đúng format UET.

# V. TÀI LIỆU ĐỐI CHIẾU CHO PHẦN GIẢI THÍCH MỞ RỘNG

- Câu 8, 39, 53: [scikit-learn Pipeline — các bước `(name, estimator)` và cross-validation](https://scikit-learn.org/stable/modules/generated/sklearn.pipeline.Pipeline.html).
- Câu 10, 96: [PyTorch BatchNorm1d — running statistics và ngoại lệ `track_running_stats=False`](https://docs.pytorch.org/docs/stable/generated/torch.nn.BatchNorm1d.html?highlight=mean).
- Câu 65, 70: [PyTorch BCEWithLogitsLoss — sigmoid kết hợp binary cross-entropy](https://docs.pytorch.org/docs/stable/generated/torch.nn.BCEWithLogitsLoss.html).
- Câu 137, 138: [HuBERT — bài báo gốc về masked prediction của hidden units](https://arxiv.org/abs/2106.07447).
- Câu 139: [Whisper — mô tả chính thức về speech recognition và speech translation](https://github.com/openai/whisper).
- Câu 140: [Voxtral Mini — model card chính thức về audio understanding và transcription](https://huggingface.co/mistralai/Voxtral-Mini-3B-2507).
