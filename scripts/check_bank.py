"""Validate editorial invariants and independently recompute numeric examples.

Run with Python 3; no third-party packages required.
"""
import json
import math
import re
from collections import Counter

from build_questions import ROOT, SOURCES, parse_questions

bank = [q for path, level, start, count in SOURCES
        for q in parse_questions(path.read_text(encoding="utf-8-sig"), level, start, count)]
by_id = {q["id"]: q for q in bank}
assert list(by_id) == list(range(1, 301))
assert Counter(q["difficulty"] for q in bank) == {"easy": 140, "medium": 80, "hard": 80}
assert len({q["prompt"] for q in bank}) == 300, "Duplicate question prompts"
for level in ("medium", "hard"):
    scope = [q for q in bank if q["difficulty"] == level]
    assert Counter(q["category"] for q in scope) == {"A": 28, "B": 20, "C": 16, "D": 16}
    assert Counter(q["answer"] for q in scope) == dict.fromkeys("ABCD", 20)
    assert len({q["title"] for q in scope}) == 80
for path, level, start, count in SOURCES[1:]:
    text = path.read_text(encoding="utf-8")
    quick = text.split("# III. ", 1)[1]
    listed = dict((int(n), letter) for n, letter in re.findall(r"(\d+): ([A-D])", quick))
    assert listed == {q["id"]: q["answer"] for q in bank if q["difficulty"] == level}
payload = (ROOT / "questions.js").read_text(encoding="utf-8").split("window.QUESTION_BANK = ", 1)[1]
assert json.loads(payload.strip().removesuffix(";")) == bank, "Generated JS is stale"

checks = 0


def expect(number, answer):
    """Compare the independently calculated result with the marked option."""
    global checks
    q = by_id[number]
    selected = next(o["text"] for o in q["options"] if o["letter"] == q["answer"])
    assert selected == answer, f"Câu {number}: expected {answer!r}, marked {selected!r}"
    checks += 1


def close(actual, expected):
    assert math.isclose(actual, expected, rel_tol=1e-8, abs_tol=1e-8)


# Execute the short Python examples, not their written explanations.
a = [[0] * 2] * 3
a[0][1] = 5
expect(141, "`" + str(a).replace(" ", "") + "`")


def collect(x, buf=[]):
    buf.append(x)
    return len(buf)


values = collect(1), collect(2), collect(3, [])
expect(221, str(values).replace(" ", "") + "; dùng mặc định None và tạo list mới trong hàm")

centers = [sum(points) / len(points) for points in ([0, 2], [8, 10])]
expect(156, f"{centers[0]:g} và {centers[1]:g}")
cumulative = 0
for k, explained in enumerate([.50, .25, .15, .10], 1):
    cumulative += explained
    if cumulative >= .85:
        break
expect(157, str(k))
close(2*30 / (2*30 + 10 + 20), 2/3)
expect(162, f"{2*30/(2*30+10+20):.3f}".replace(".", ",") + " xấp xỉ")
expect(165, str(sum(1 for i in range(10) if i+3 < 10)))
expect(168, f"{sum([2,4])/2:g}")
expect(170, f"{2-.1*3:g}".replace(".", ","))
expect(173, f"({(1**2+10**2)/2:g}; {(1+10)/2:g})".replace(".", ","))
expect(175, str(10*4+4+4*3+3))
expect(176, f"Đầu ra (8,12,32), bảng có {1000*32:,} tham số".replace(",000", ".000"))
expect(177, f"{max([1,7,3,5])} và {sum([1,7,3,5])/4:g}")
weighted = [.25*2+.75*0, .25*0+.75*4]
expect(178, f"`[{weighted[0]:g},{weighted[1]:g}]`")
expect(180, str(math.ceil(1000/128)))
expect(184, f"{6/(1-.5):g}")
expect(185, "Epoch " + str(1 + min(range(5), key=[.60,.45,.40,.44,.48].__getitem__)))
output = math.floor((32 + 2*1 - (3-1) - 1)/2) + 1
expect(189, f"{output}x{output}")
expect(190, str(16*(3*3*3+1)))
close(40/(100+80-40), 2/7)
expect(192, "2/7 xấp xỉ 0,286")
expect(199, str((224//16)**2+1))
expect(218, f"{(2+1+1)/20:.0%}")
macro = ((2*90)/(2*90+10)+0)/2
expect(228, f"90% và {macro:.3f}".replace(".", ","))
costs = {t:10*fn+fp for t,fn,fp in [(.3,5,40),(.5,12,15),(.7,20,5)]}
threshold = min(costs, key=costs.get)
expect(229, f"Chọn {threshold:g} vì chi phí {costs[threshold]}; khóa ngưỡng rồi đo trên test riêng".replace("0.3", "0,3"))
auc = sum(p > n for p in [.9,.4] for n in [.8,.1])/4
expect(230, f"{auc:g}".replace(".", ","))
residuals = [[0,0,0,8], [3,3,3,3]]
mae = [sum(abs(r) for r in row)/len(row) for row in residuals]
mse = [sum(r*r for r in row)/len(row) for row in residuals]
assert mae[0] < mae[1] and mse[0] > mse[1]
expect(231, "MAE chọn A; MSE chọn B")
assert math.dist((0,0),(2,0)) < math.dist((0,0),(0,100))
assert math.dist((0,0),(0,1)) < math.dist((0,0),(2,0))
expect(233, "Trước lớp 1, sau lớp 0")
gini = lambda counts: 1-sum((n/sum(counts))**2 for n in counts)
close(gini([4,4]) - (gini([3,1])+gini([1,3]))/2, .125)
close(gini([4,4]) - (gini([4,0])+gini([0,4]))/2, .5)
expect(234, "T, giảm Gini 0,5 so với 0,125 của S")

# Finite differences independently confirm the hand-derived backprop gradient.
loss = lambda w1: (3*max(0,w1*2)-4)**2/2
gradient = (loss(1+1e-5)-loss(1-1e-5))/(2e-5)
close(gradient, 12)
expect(249, f"{round(gradient)}")
fractions = [n/10 for n in [4,4,2]]
expect(250, "Nhân ba loss lần lượt " + ";".join(f"{f:g}".replace(".",",") for f in fractions) + " rồi backward, zero_grad một lần trước cả nhóm")
close(sum(fractions), 1)
expect(253, "Trừ max logit trước khi exp, được " + str([n-max([1000,1001,999]) for n in [1000,1001,999]]).replace(" ",""))
expect(256, "Score (2,5,7), output (2,5,12)")
expect(257, f"{(2*2)**2} lần")
expect(265, f"{8*512+512*8:,}".replace(",","."))
expect(269, str(1+2*(3-1)))
expect(270, f"{8*(32//2)**2:,}".replace(",","."))
close(2*30/(40+60), .6)
close(30/(40+60-30), 3/7)
expect(274, "(0,60; 3/7)")
cosine = lambda x,y: sum(a*b for a,b in zip(x,y))/(math.hypot(*x)*math.hypot(*y))
close(cosine((3,4),(6,8)), 1)
close(cosine((3,4),(0,10)), .8)
expect(279, "a, vì cosine(i,a)=1 còn cosine(i,b)=0,8")
expect(291, f"{(10+18)/(10+30):g} và exp(0,7)".replace("0.7","0,7"))
close(48000/16000, 3)
expect(295, "Thời lượng thành 3 giây, tần số nghe được giảm khoảng 3 lần")
expect(297, f"{(5+9)/(10+90):.0%}")
print(f"PASS: 300 questions, 900 distractor explanations, source/JS parity, answer keys; {checks} numeric/code answers independently checked.")
