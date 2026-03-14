import re

path = r'd:\cn\Porfolio\ChizNG\src\hooks\useLanguage.js'
with open(path, encoding='utf-8') as f:
    txt = f.read()

EN_KEYS = """
    'projects.page.title': 'Projects & Journey',
    'projects.hero.heading': 'Bridging Business & Dev',
    'projects.hero.body': 'I am shaping my path toward Business Analyst and Bridge System Engineer roles — translating stakeholder needs into actionable technical plans while keeping user experience delightful. Below is how I practice that craft.',
    'projects.hero.github': 'Visit GitHub',
    'projects.hero.contact': 'Contact Me',
    'projects.github.heading': 'GitHub Contribution Graph',
    'projects.github.note': 'Daily commits, experiments & open-source contributions.',
    'projects.exp.heading': 'Experience & Highlights',
    'projects.exp.2025.period': '2025',
    'projects.exp.2025.title': 'Mini Capstone Team Project',
    'projects.exp.2025.body': 'Built a proof-of-concept product with my squad and practiced the full GitHub workflow — backlog planning, pull-request review, and documentation hand-off.',
    'projects.exp.2024.period': '2024',
    'projects.exp.2024.title': 'Foundations: Web Dev & Japanese',
    'projects.exp.2024.body': 'Completed core HTML/CSS/JS training while self-studying Japanese to prepare for a BrSE role that bridges Vietnamese teams with Japanese clients.',
    'projects.certs.heading': 'Coursera Certificates',
    'projects.cert0.desc': 'Eliciting business goals, building requirement traceability, and prioritizing stakeholder value.',
    'projects.cert0.cta': 'View Credential →',
    'projects.cert1.desc': 'Structured interviews, use-case modeling, and documentation ready for engineering handoff.',
    'projects.cert1.cta': 'View Credential →',
    'projects.cert2.desc': 'Translating solution architecture diagrams and clarifying data contracts for offshore teams.',
    'projects.cert2.cta': 'View Credential →',
    'projects.cert3.desc': 'Facilitated sprint reviews, wrote BA-friendly documentation, and aligned priorities between Japan-VN squads.',
    'projects.cert3.cta': 'View Credential →',
    'projects.showcase.heading': 'Selected Projects',
    'projects.proj0.desc': 'Personal lab for testing how requirements become UI deliverables — with API widgets, Spotify data, and publicly visible specs.',
    "projects.proj0.bullet0": "Spotify Now Playing widget derived from the user story 'see what I\\'m listening to now'",
    'projects.proj0.bullet1': 'HSR Enka integration with clearly documented fallback behavior for developers',
    'projects.proj0.cta': 'Visit Site',
    'projects.proj1.desc': 'Website that showcases our teamwork process: shared backlog, GitHub version control, and demo hand-off for a mock client.',
    'projects.proj1.bullet0': 'Transparent commit log so the team can code in parallel',
    'projects.proj1.bullet1': 'Simple role-based guardrails and QA checklist',
    'projects.proj1.cta': 'View Demo',
    "projects.cta.heading": "Let's Create Together",
    "projects.cta.body": "I'm open to collaborations, open-source initiatives, and creative front-end experiments.",
    'projects.cta.start': 'Start a Conversation',
    'projects.cta.linkedin': 'Connect on LinkedIn',"""

VI_KEYS = """
    'projects.page.title': 'Dự án & Hành trình',
    'projects.hero.heading': 'Kết nối Kinh doanh & Kỹ thuật',
    'projects.hero.body': 'Tôi đang định hướng đến vai trò Business Analyst và Bridge SE — chuyển đổi nhu cầu từ stakeholder thành kế hoạch kỹ thuật cụ thể, đồng thời giữ trải nghiệm người dùng thật sự thú vị. Đây là cách tôi rèn luyện điều đó.',
    'projects.hero.github': 'Xem GitHub',
    'projects.hero.contact': 'Liên hệ',
    'projects.github.heading': 'Biểu đồ đóng góp GitHub',
    'projects.github.note': 'Commit hằng ngày, thử nghiệm & đóng góp mã nguồn mở.',
    'projects.exp.heading': 'Kinh nghiệm & Nổi bật',
    'projects.exp.2025.period': '2025',
    'projects.exp.2025.title': 'Dự án Nhóm Mini Capstone',
    'projects.exp.2025.body': 'Xây dựng sản phẩm proof-of-concept cùng nhóm và thực hành toàn bộ quy trình GitHub — lên backlog, review pull-request và bàn giao tài liệu.',
    'projects.exp.2024.period': '2024',
    'projects.exp.2024.title': 'Nền tảng: Web Dev & Tiếng Nhật',
    'projects.exp.2024.body': 'Hoàn thành đào tạo HTML/CSS/JS cốt lõi và tự học tiếng Nhật để chuẩn bị cho vai trò BrSE kết nối đội Việt Nam với khách hàng Nhật Bản.',
    'projects.certs.heading': 'Chứng chỉ Coursera',
    'projects.cert0.desc': 'Xác định mục tiêu kinh doanh, xây dựng ma trận truy xuất yêu cầu và ưu tiên hóa giá trị stakeholder.',
    'projects.cert0.cta': 'Xem chứng chỉ →',
    'projects.cert1.desc': 'Phỏng vấn có cấu trúc, mô hình hóa use-case và tài liệu sẵn sàng bàn giao cho kỹ thuật.',
    'projects.cert1.cta': 'Xem chứng chỉ →',
    'projects.cert2.desc': 'Dịch sơ đồ kiến trúc giải pháp và làm rõ data contract cho đội offshore.',
    'projects.cert2.cta': 'Xem chứng chỉ →',
    'projects.cert3.desc': 'Điều phối sprint review, viết tài liệu BA-friendly và đồng bộ ưu tiên giữa đội Nhật-Việt.',
    'projects.cert3.cta': 'Xem chứng chỉ →',
    'projects.showcase.heading': 'Dự án tiêu biểu',
    'projects.proj0.desc': 'Lab cá nhân để kiểm tra cách yêu cầu trở thành thành phẩm UI — với API widgets, dữ liệu Spotify và spec hiển thị công khai.',
    'projects.proj0.bullet0': 'Widget Spotify Now Playing xuất phát từ user story "xem tôi đang nghe gì"',
    'projects.proj0.bullet1': 'Tích hợp HSR Enka với hành vi fallback được ghi chép rõ ràng cho lập trình viên',
    'projects.proj0.cta': 'Xem trang web',
    'projects.proj1.desc': 'Website trình bày quy trình làm việc nhóm: backlog chung, quản lý phiên bản GitHub và demo bàn giao cho client mô phỏng.',
    'projects.proj1.bullet0': 'Lịch sử commit minh bạch để cả nhóm có thể code song song',
    'projects.proj1.bullet1': 'Phân quyền đơn giản và danh sách kiểm tra QA',
    'projects.proj1.cta': 'Xem demo',
    'projects.cta.heading': 'Cùng tạo ra điều gì đó',
    'projects.cta.body': 'Tôi sẵn sàng hợp tác, tham gia dự án mã nguồn mở và thử nghiệm front-end sáng tạo.',
    'projects.cta.start': 'Bắt đầu trò chuyện',
    'projects.cta.linkedin': 'Kết nối trên LinkedIn',"""

JA_KEYS = """
    'projects.page.title': 'プロジェクト & 歩み',
    'projects.hero.heading': 'ビジネスと開発をつなぐ',
    'projects.hero.body': 'Business AnalystとBridge SEを目指し、ステークホルダーのニーズを具体的な技術計画に落とし込みながら、ユーザー体験を大切にしています。以下はその実践の記録です。',
    'projects.hero.github': 'GitHubを見る',
    'projects.hero.contact': 'お問い合わせ',
    'projects.github.heading': 'GitHub 貢献グラフ',
    'projects.github.note': '日々のコミット・実験・オープンソース貢献。',
    'projects.exp.heading': '経験 & ハイライト',
    'projects.exp.2025.period': '2025',
    'projects.exp.2025.title': 'ミニキャップストーンチームプロジェクト',
    'projects.exp.2025.body': 'チームでPoC製品を構築し、バックログ計画・プルリクレビュー・ドキュメント引き渡しなどGitHubの全ワークフローを実践しました。',
    'projects.exp.2024.period': '2024',
    'projects.exp.2024.title': '基礎：Web開発 & 日本語',
    'projects.exp.2024.body': 'HTML/CSS/JSの基礎研修を修了し、日本の顧客とベトナムチームをつなぐBrSEを目指して独学で日本語を学びました。',
    'projects.certs.heading': 'Courseraの修了証',
    'projects.cert0.desc': 'ビジネス目標の引き出し・要件トレーサビリティの構築・ステークホルダー価値の優先順位付け。',
    'projects.cert0.cta': '修了証を見る →',
    'projects.cert1.desc': '構造化インタビュー・ユースケースモデリング・エンジニアリング引き渡し用ドキュメント作成。',
    'projects.cert1.cta': '修了証を見る →',
    'projects.cert2.desc': 'ソリューションアーキテクチャ図の変換とオフショアチーム向けデータ契約の明確化。',
    'projects.cert2.cta': '修了証を見る →',
    'projects.cert3.desc': 'スプリントレビューの進行・BAドキュメント作成・日越チーム間の優先事項調整。',
    'projects.cert3.cta': '修了証を見る →',
    'projects.showcase.heading': '主なプロジェクト',
    'projects.proj0.desc': 'UIデリバラブルへの要件変換を検証する個人ラボ — APIウィジェット・Spotifyデータ・公開仕様書付き。',
    'projects.proj0.bullet0': 'Spotify Now Playingウィジェット — 「今聴いている曲を表示する」というユーザーストーリーから誕生',
    'projects.proj0.bullet1': 'HSR Enka統合 — 開発者向けにフォールバック動作を明記',
    'projects.proj0.cta': 'サイトを見る',
    'projects.proj1.desc': 'チームワークプロセスを紹介するウェブサイト：共有バックログ・GitHubバージョン管理・模擬クライアントへのデモ引き渡し。',
    'projects.proj1.bullet0': '透明なコミット履歴でチーム並行開発を実現',
    'projects.proj1.bullet1': 'シンプルな権限設計とQAチェックリスト',
    'projects.proj1.cta': 'デモを見る',
    'projects.cta.heading': 'いっしょに作りましょう',
    'projects.cta.body': 'コラボレーション・オープンソース・クリエイティブなフロントエンド実験、いつでも歓迎です。',
    'projects.cta.start': '話しかける',
    'projects.cta.linkedin': 'LinkedInでつながる',"""

# Insert after each gallery.page.close line
txt = txt.replace(
    "    'gallery.page.close': 'Close',\n  },\n  vi:",
    "    'gallery.page.close': 'Close'," + EN_KEYS + "\n  },\n  vi:"
)
txt = txt.replace(
    "    'gallery.page.close': 'Đóng',\n  },\n  ja:",
    "    'gallery.page.close': 'Đóng'," + VI_KEYS + "\n  },\n  ja:"
)
txt = txt.replace(
    "    'gallery.page.close': '閉じる',\n  },\n};",
    "    'gallery.page.close': '閉じる'," + JA_KEYS + "\n  },\n};"
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(txt)

print(f"Done. Lines: {len(txt.splitlines())}")
