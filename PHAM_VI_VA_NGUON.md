# Đối chiếu phạm vi và tài liệu biên soạn

Ngày rà soát: 20/10/2026. Phạm vi chính là **phần 3, trang 2–3** của `Olp AI SV 2026 UET - Đề cương Ôn tập - Kiểm tra sơ loại.pdf` trong dự án, đối chiếu với [Syllabus IOAI 2026](https://ioai-official.org/wp-content/uploads/2025/10/Syllabus.pdf). Đã đọc đầy đủ bốn trang của đề cương và kiểm tra trực quan hai trang chứa phần 3.

Các tình huống, dữ liệu số và phương án trong hai bộ mới được tự biên soạn. Đây là tài liệu luyện tập, không phải đề thi chính thức hoặc dự đoán đề. Mức Dễ/Trung bình/Khó là phân loại sư phạm của ứng dụng; không đồng nhất với nhãn Lý thuyết/Thực hành/Cả hai trong syllabus. Các yêu cầu lý thuyết chuyên sâu ngoài danh sách đề cương không được thêm vào chỉ để tăng độ khó.

| Mức | Phạm vi ID | Nền tảng/ML | Học sâu | Thị giác | NLP/âm thanh | Tổng |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Dễ, giữ nguyên bộ cũ | 1–140 | 58 | 42 | 20 | 20 | 140 |
| Trung bình | 141–220 | 28 | 20 | 16 | 16 | 80 |
| Khó | 221–300 | 28 | 20 | 16 | 16 | 80 |

Trung bình yêu cầu vận dụng, đọc mã, tính nhanh hoặc lựa chọn quy trình trong một tình huống xác định. Khó yêu cầu nối nhiều điều kiện, phát hiện lỗi không gây exception, tính nhiều bước hoặc cân nhắc chất lượng/tài nguyên. Kiến thức có thể lặp giữa hai mức nhưng thay nhiệm vụ tư duy, không chỉ thay số liệu.

## Ma trận đối chiếu phần 3

Một câu có thể chạm nhiều mục; bảng chỉ ra các câu đại diện ở hai bộ mới. Phủ chủ đề không có nghĩa tài liệu đã liệt kê mọi biến thể, API hoặc mọi kiến thức AI có thể có.

| Mục trong đề cương | Trung bình | Khó | Tài liệu đối chiếu |
| --- | --- | --- | --- |
| Python cơ bản, aliasing, hàm | 141 | 221 | S01 |
| NumPy, broadcasting, view/copy | 142 | 222–223 | S02, S03 |
| pandas, groupby/merge, đơn vị mẫu | 143 | 224 | S04 |
| Matplotlib/Seaborn: đọc biểu đồ, trực quan đánh giá | 144, 163 | 225 | S05, S06 |
| scikit-learn, Pipeline, CV, tuning | 145, 164 | 226–227, 235, 240, 248 | S07, S08 |
| PyTorch, tensor, CPU/GPU | 146–147 | 223, 247, 251, 254 | S09, S10 |
| Linear/Logistic Regression | 148–149 | 229, 231–232 | S11 |
| L1/L2 | 150 | 232 | S11 |
| K-NN | 151 | 233 | S12 |
| Decision Tree | 152 | 234 | S13 |
| SVM | 153 | 235 | S14 |
| Bagging, Random Forest, Gradient Boosting | 154–155 | 236–237 | S15 |
| K-Means | 156 | 238 | S16 |
| PCA | 157 | 239–240 | S17 |
| t-SNE/UMAP | 158 | 241 | S18, S19 |
| DBSCAN, Hierarchical, Spectral Clustering | 159–161 | 242–244 | S16 |
| Accuracy, precision, recall, F1, confusion matrix, ROC | 144, 149, 162–163 | 228–230 | S05 |
| Underfitting/overfitting | 152–153, 185 | 225, 237, 262 | S06, S07 |
| Feature engineering: cửa sổ, thống kê, one-hot, PCA, embedding | 157, 165, 167–168, 176 | 239–240, 246, 248, 255 | S17, S20, S21 |
| Missing/irregular data, imputation, padding, scaling | 145, 151, 166–168 | 227, 232–233, 245–246, 255 | S07, S20, S22 |
| Train/validation/test, augmentation cơ bản | 164, 198, 204 | 224, 226–227, 277–278, 284 | S07, S08, S23 |
| Tokenization/vocab, patch ảnh | 199, 205 | 248, 257, 285 | S21, S24 |
| Perceptron, gradient descent, backprop | 169–171 | 249–252 | S09, S25 |
| ReLU, sigmoid, tanh; MSE/MAE, cross-entropy | 172–174 | 231, 249, 253–254, 264, 268 | S25, S26 |
| MLP, embedding và pooling | 175–177 | 252, 255, 270 | S21, S25 |
| Attention/Transformer cho văn bản và ảnh | 178–179, 199, 211–212 | 256–258, 290 | S24, S27 |
| SGD/mini-batch, gradient accumulation | 170, 180 | 250, 267 | S09, S10 |
| Autoencoder | 181 | 259 | S28 |
| Adam/AdamW, learning rate/hội tụ | 182–183 | 260 | S09, S29 |
| Dropout, Early Stopping, Weight Decay | 182, 184–185 | 260–262 | S09, S29, S30 |
| Khởi tạo trọng số, Batch Normalization | 186–187 | 263–264, 267 | S25, S31 |
| Fine-tuning toàn phần, đóng băng, PEFT | 188 | 251, 265–266 | S23, S32 |
| Convolution, image classification | 189–191 | 269–270 | S24, S33 |
| Object detection: YOLO, SSD, DETR | 192–194 | 271–273 | S34–S37 |
| Image segmentation, U-Net | 195–196, 198 | 274–276 | S26, S38 |
| Encoder ảnh tiền huấn luyện, ResNet, augmentation | 197–198, 204 | 277–278, 284 | S23, S39 |
| GAN | 200 | 282 | S40, S41 |
| Diffusion | 201 | 283 | S42 |
| Self-supervised learning cho ảnh | 202 | 281 | S43 |
| Encoder ảnh-văn bản, CLIP | 203 | 279–280 | S44 |
| BERT, text classification | 205–207, 210 | 286–288 | S21, S45 |
| Language modeling, mô hình encoder-decoder | 208–209, 211–212, 214 | 258, 268, 285, 289–291 | S27, S46 |
| LM tiền huấn luyện, model mở và qua API | 213–214 | 292–293 | S46, S47 |
| HuBERT | 216, 220 | 294, 296 | S48, S49 |
| Whisper, Qwen-Audio, Voxtral | 215, 217–219 | 295, 297–300 | S50–S53 |

## Tài liệu gốc và tài liệu chính thức

Các liên kết mô tả nền tảng kiến thức, API và giới hạn của phương pháp, không phải nguồn sao chép các câu hỏi. Với các họ model, câu hỏi cố ý yêu cầu kiểm tra **checkpoint cụ thể**, không khẳng định mọi biến thể có cùng ngôn ngữ, tốc độ hay khả năng.

- **S01:** [Python: default arguments](https://docs.python.org/3/tutorial/controlflow.html#default-argument-values).
- **S02:** [NumPy: broadcasting](https://numpy.org/doc/stable/user/basics.broadcasting.html).
- **S03:** [NumPy: copies and views](https://numpy.org/doc/stable/user/basics.copies.html).
- **S04:** [pandas: merge, join, concatenate](https://pandas.pydata.org/docs/user_guide/merging.html).
- **S05:** [scikit-learn: metrics and scoring](https://scikit-learn.org/stable/modules/model_evaluation.html).
- **S06:** [scikit-learn: validation and learning curves](https://scikit-learn.org/stable/modules/learning_curve.html).
- **S07:** [scikit-learn: common pitfalls and leakage](https://scikit-learn.org/stable/common_pitfalls.html).
- **S08:** [scikit-learn: cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html).
- **S09:** [PyTorch: optimizing model parameters](https://docs.pytorch.org/tutorials/beginner/basics/optimization_tutorial.html).
- **S10:** [PyTorch: autograd mechanics](https://docs.pytorch.org/docs/2.14/notes/autograd.html).
- **S11:** [scikit-learn: linear models](https://scikit-learn.org/stable/modules/linear_model.html).
- **S12:** [scikit-learn: nearest neighbors](https://scikit-learn.org/stable/modules/neighbors.html).
- **S13:** [scikit-learn: decision trees](https://scikit-learn.org/stable/modules/tree.html).
- **S14:** [scikit-learn: support vector machines](https://scikit-learn.org/stable/modules/svm.html).
- **S15:** [scikit-learn: ensemble methods](https://scikit-learn.org/stable/modules/ensemble.html).
- **S16:** [scikit-learn: clustering](https://scikit-learn.org/stable/modules/clustering.html).
- **S17:** [scikit-learn: PCA and decomposition](https://scikit-learn.org/stable/modules/decomposition.html).
- **S18:** [scikit-learn: manifold learning, t-SNE](https://scikit-learn.org/stable/modules/manifold.html).
- **S19:** [UMAP: FAQ, transform và clustering](https://umap-learn.readthedocs.io/en/latest/faq.html).
- **S20:** [scikit-learn: preprocessing](https://scikit-learn.org/stable/modules/preprocessing.html).
- **S21:** [Hugging Face: text classification](https://huggingface.co/docs/transformers/tasks/sequence_classification).
- **S22:** [scikit-learn: imputation](https://scikit-learn.org/stable/modules/impute.html).
- **S23:** [PyTorch: transfer learning for vision](https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html).
- **S24:** [An Image is Worth 16x16 Words, ViT](https://arxiv.org/abs/2010.11929).
- **S25:** [Dive into Deep Learning: MLP](https://d2l.ai/chapter_multilayer-perceptrons/index.html).
- **S26:** [PyTorch: CrossEntropyLoss](https://docs.pytorch.org/docs/2.14/generated/torch.nn.CrossEntropyLoss.html).
- **S27:** [Attention Is All You Need](https://arxiv.org/abs/1706.03762).
- **S28:** [Keras: convolutional autoencoder cho denoising](https://keras.io/examples/vision/autoencoder/).
- **S29:** [PyTorch: AdamW](https://docs.pytorch.org/docs/2.14/generated/torch.optim.AdamW.html).
- **S30:** [PyTorch: Dropout](https://docs.pytorch.org/docs/2.14/generated/torch.nn.Dropout.html).
- **S31:** [PyTorch: BatchNorm2d](https://docs.pytorch.org/docs/2.14/generated/torch.nn.BatchNorm2d.html).
- **S32:** [LoRA: Low-Rank Adaptation](https://arxiv.org/abs/2106.09685).
- **S33:** [Stanford CS231n: convolutional networks](https://cs231n.github.io/convolutional-networks/).
- **S34:** [YOLO gốc](https://arxiv.org/abs/1506.02640).
- **S35:** [SSD](https://arxiv.org/abs/1512.02325).
- **S36:** [DETR: End-to-End Object Detection with Transformers](https://arxiv.org/abs/2005.12872).
- **S37:** [PyTorch: NMS API](https://docs.pytorch.org/vision/stable/generated/torchvision.ops.nms.html).
- **S38:** [U-Net](https://arxiv.org/abs/1505.04597).
- **S39:** [Deep Residual Learning for Image Recognition, ResNet](https://arxiv.org/abs/1512.03385).
- **S40:** [Generative Adversarial Networks](https://arxiv.org/abs/1406.2661).
- **S41:** [Keras: DCGAN training](https://keras.io/examples/generative/dcgan_overriding_train_step/).
- **S42:** [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239).
- **S43:** [SimCLR](https://arxiv.org/abs/2002.05709).
- **S44:** [CLIP: Learning Transferable Visual Models](https://arxiv.org/abs/2103.00020).
- **S45:** [BERT](https://arxiv.org/abs/1810.04805).
- **S46:** [Hugging Face: causal language modeling](https://huggingface.co/docs/transformers/tasks/language_modeling).
- **S47:** [Hugging Face: pipelines](https://huggingface.co/docs/transformers/main_classes/pipelines).
- **S48:** [HuBERT](https://arxiv.org/abs/2106.07447).
- **S49:** [Hugging Face: audio classification](https://huggingface.co/docs/transformers/tasks/audio_classification).
- **S50:** [Whisper: Robust Speech Recognition](https://arxiv.org/abs/2212.04356).
- **S51:** [Hugging Face: ASR và WER](https://huggingface.co/docs/transformers/tasks/asr).
- **S52:** [Qwen-Audio](https://arxiv.org/abs/2311.07919).
- **S53:** [Mistral: Voxtral Small model card](https://huggingface.co/mistralai/Voxtral-Small-24B-2507).

## Giả định và kiểm tra nội dung

- Các con số trong câu hỏi là dữ liệu giả định phục vụ suy luận, không phải benchmark thực nghiệm của model.
- Khi chỉ số/loss có nhiều quy ước, câu nêu reduction, log tự nhiên, cách gộp hoặc lớp cần đánh giá. Câu về API tránh khẳng định hỗ trợ tác vụ/ngôn ngữ của cả một họ model.
- Các câu tính toán được đối chiếu bằng phép tính độc lập trong `scripts/check_bank.py`: broadcasting, Gini, F1, AUC, loss, gradient, pooling, shape attention, convolution, tham số, Dice/IoU, WER và chi phí ngưỡng.
- `scripts/build_questions.py` kiểm tra ID liên tiếp, bốn lựa chọn khác nhau, đáp án, ba giải thích phương án sai và ghi nhớ. `scripts/check_ui.mjs` kiểm tra hiển thị cả 300 câu ở trạng thái đúng/sai, đổi mức/chủ đề/bộ lọc, migration tiến độ cũ và layout nhiều kích thước.

Các phép kiểm tra tự động không thay thế phản biện chuyên môn. Khi sửa dữ liệu, cần rà lại tính duy nhất của đáp án theo đúng giả định đã viết, đồng thời cập nhật đáp án nhanh nếu thay nhãn trong Markdown.
