# Pokémon Mood Matcher (React + Tailwind) — Skeleton

Ứng dụng web giúp bạn tìm Pokémon phù hợp với cảm xúc hiện tại của mình bằng cách kết hợp AI Gemini và PokéAPI.
Người dùng chọn tâm trạng (happy, sad, angry, calm...), mô tả cảm xúc của mình, và hệ thống sẽ gợi ý Pokémon tương ứng cùng lý do phù hợp.

## Setup
1. Clone repo
2. Copy `.env.example` to `.env` and set `VITE_GEMINI_API_KEY`
3. Install dependencies: `npm install`
4. Run dev server: `npm run dev`
5. Open `http://localhost:5173`

---

## 🧠 Cách ứng dụng AI
🔹 AI sử dụng: Ứng dụng này sử dụng Google Gemini 

🔹 Vai trò của AI

Gợi ý Pokémon phù hợp với cảm xúc người dùng → AI nhận mô tả tâm trạng và đưa ra một Pokémon phù hợp.

Giải thích vì sao Pokémon đó hợp với cảm xúc → AI sinh một đoạn mô tả ngắn (2–3 câu) thể hiện sự đồng cảm với cảm xúc của người dùng.

## 🛠️ Các API và công nghệ khác
- PokéAPI: Dùng để lấy thông tin chi tiết của Pokémon (ảnh, hệ, chỉ số hp, attack, defense, …).
- React + Vite: Xây dựng giao diện người dùng.
- TailwindCSS: Thiết kế giao diện nhanh và gọn.
- .env: Bảo mật API key của Gemini.

--- 

## 🎨 Quyết định thiết kế

Thiết kế 3 bước (step-based flow):

- Chọn cảm xúc
- Mô tả chi tiết cảm xúc
- Hiển thị Pokémon được chọn và lý do

## 🤖 Vai trò của AI trong quá trình phát triển

Phát triển từ ý tưởng chọn ra một pokemon ngẫu nhiên.

| Hỗ trợ từ AI | Cách tôi sử dụng | Cách tôi chỉnh sửa |
|---------------|------------------|--------------------|
| **Lên ý tưởng** | Dùng ChatGPT để tham khảo xem ý tưởng của bản thân có tính hay ho mới lạ không | Tham khảo từ ý tưởng có sẵn, từ AI gợi ý và phát triển thêm |
| **Viết khung code React, logic gọi API** | Dùng ChatGPT để sinh khung code ban đầu từ ý tưởng và Gemini tạo ảnh background | Tự chỉnh sửa cú pháp, tối ưu lại khung code, thêm xử lý lỗi và logic kiểm tra dữ liệu |
| **Tạo UI cơ bản với TailwindCSS** | AI giúp tôi sinh layout 3 bước | Tôi cải thiện bố cục, thêm animation 3D và responsive |
| **Gợi ý nên kết hợp thêm AI** | Dựa trên gợi ý, tôi tinh chỉnh lại prompt, phát triển việc áp dụng AI để chỉ trả về tên Pokémon | Giới hạn đầu ra, thêm logic “clean” kết quả |
| **Debug lỗi import module @google/genai** | AI hướng dẫn cách chuyển từ GoogleGenerativeAI → GoogleGenAI (phiên bản mới) | Tôi kiểm tra và xác nhận với tài liệu chính thức để sửa dứt điểm |

---

## 📦 Cấu trúc thư mục

```text
Web_PokemonsMoodMatcher/
├── public/
│   ├── favicon.png
├── src/
│   ├── assets/bg/placeholder.png
│   ├── components/
│   │   ├── MoodSelector.jsx
│   │   └── PokemonCard.jsx
│   ├── services/
│   │   ├── gemini.js
│   │   └── pokeapi.js
│   ├── styles/
│   │   ├── animations.css
│   │   └── main.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── README.md
├── postcss.config.cjs
├── tailwind.config.cjs
├── vite.config.js
└── .env
```

---

## Deploy
- Push to GitHub and deploy on Vercel or Netlify.
- On the deployment platform, set env var `VITE_GEMINI_API_KEY`.

---




