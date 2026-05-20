# 🚀 MENTRA AI - Ultimate EdTech Platform

<div align="center">

![MENTRA Logo](https://img.shields.io/badge/MENTRA-AI%20Learning-6C63FF?style=for-the-badge&logo=rocket)
![Version](https://img.shields.io/badge/version-1.0.0-FF0080?style=for-the-badge)
![Status](https://img.shields.io/badge/status-READY-39FF14?style=for-the-badge)

**AI-Powered Education Platform with 3D Avatar Teachers, Voice Interaction, and Live Whiteboard**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Demo](#-demo)

</div>

---

## ✨ Features

### 🤖 AI-Powered Teachers
- **Prof. Alex** - Math & Science Expert
- **Dr. Sophia** - Languages & Arts Specialist
- Real-time AI responses with personality
- Context-aware conversations

### 🎭 3D Avatar System
- Fully animated 3D teacher avatars
- Eye blinking and mouth talking animations
- Facial expressions that respond to conversation
- Male and female avatar designs

### 🎤 Voice Interaction
- Speech recognition for voice input
- Text-to-speech responses from AI teachers
- Real-time voice waveform visualization
- Voice transcript history

### 📷 Image Analysis
- Upload images and ask questions
- AI analyzes and explains visual content
- Support for diagrams, charts, and photos

### 📺 YouTube Summary
- Paste any YouTube video link
- Get instant AI-powered summaries
- Extract key points and concepts

### ✏️ Live Whiteboard
- Draw and write in real-time
- Multiple colors and tools
- Eraser functionality
- Save and download drawings

### 🎨 Premium UI/UX
- Cyberpunk dark theme
- Glassmorphism effects
- Smooth animations
- Custom cursor system
- Responsive mobile design

### 🎮 Gamification
- Earn coins for learning
- Track daily streaks
- Level progression system
- Global leaderboard

---

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

1. **Download all files to a folder:**
```
mentra/
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
└── data.json
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the server:**
```bash
npm start
```

4. **Open in browser:**
```
http://localhost:3000
```

---

## 📖 Usage

### 🔐 Authentication

**Demo Account:**
- Email: `demo@mentra.ai`
- Password: `demo123`

**Create New Account:**
1. Click "Sign Up" tab
2. Enter your name, email, and password
3. Click "Create Account"

### 💬 Chat with AI Teachers

1. **Select a Teacher:**
   - Click on Prof. Alex (Math & Science)
   - Or Dr. Sophia (Languages & Arts)

2. **Start Learning:**
   - Type your question in the chat
   - Press Enter or click Send
   - Get instant AI-powered responses

3. **Ask About Images:**
   - Click the 📷 icon
   - Upload an image
   - Ask questions about it

4. **Summarize Videos:**
   - Click the ▶️ icon
   - Paste YouTube link
   - Get instant summary

### 🎤 Voice Mode

1. Navigate to "Voice Mode" in sidebar
2. Select a teacher
3. Click the microphone button
4. Speak your question
5. AI teacher responds with voice

### ✏️ Whiteboard

1. Navigate to "Whiteboard" in sidebar
2. Select pen or eraser tool
3. Choose your color
4. Draw or write
5. Save your work

---

## 🎨 Customization

### Change Colors

Edit `style.css`:
```css
:root {
  --neon-violet: #6C63FF;
  --neon-pink: #FF0080;
  --neon-cyan: #00FFD1;
}
```

### Add New Teachers

Edit `script.js`:
```javascript
teachers: {
  newteacher: {
    name: 'Prof. New',
    specialty: 'Your Specialty',
    emoji: '👨‍🏫',
    personality: 'helpful',
    voicePitch: 1.0,
    voiceRate: 1.0
  }
}
```

---

## 🔧 Advanced Configuration

### Environment Variables

Create `.env` file:
```env
PORT=3000
NODE_ENV=development
```

### API Integration

For production AI responses, add your API keys in `server.js`:
```javascript
const OPENAI_API_KEY = 'your-key-here';
```

---

## 📱 Mobile Support

MENTRA is fully responsive and works on:
- ✅ Desktop (1920x1080+)
- ✅ Laptop (1366x768+)
- ✅ Tablet (768x1024+)
- ✅ Mobile (375x667+)

---

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Heroku
```bash
heroku create mentra-app
git push heroku main
```

### Deploy to Netlify
1. Build static files
2. Upload to Netlify
3. Configure redirects

---

## 📊 Features Checklist

- ✅ Authentication (Sign In / Sign Up)
- ✅ 3D Avatar Teachers
- ✅ AI Chat System
- ✅ Voice Recognition
- ✅ Text-to-Speech
- ✅ Image Upload & Analysis
- ✅ YouTube Video Summary
- ✅ Live Whiteboard
- ✅ Coin & Streak System
- ✅ Level Progression
- ✅ Leaderboard
- ✅ Responsive Design
- ✅ Custom Cursor
- ✅ Dark Theme
- ✅ Premium Animations

---

## 🎯 Student Features

### Learning Tools
- 💬 **Chat** - Ask anything, get instant AI answers
- 🎤 **Voice** - Speak naturally with AI teachers
- ✏️ **Whiteboard** - Draw, write, visualize concepts
- 📷 **Image** - Upload diagrams for explanations
- 📺 **Video** - Get YouTube video summaries

### Gamification
- 💰 **Coins** - Earn 5-20 coins per interaction
- 🔥 **Streaks** - Daily learning streaks
- ⭐ **Levels** - Progress through levels
- 🏆 **Leaderboard** - Compete globally

---

## 🔒 Security

- ✅ Password hashing (SHA-256)
- ✅ Session management
- ✅ CORS protection
- ✅ Input validation
- ✅ XSS protection

**Production Recommendations:**
- Use bcrypt for password hashing
- Add JWT authentication
- Enable HTTPS
- Add rate limiting
- Use environment variables

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change port in server.js
```

### Voice not working
- Enable microphone permissions
- Use HTTPS in production
- Check browser compatibility

### Images not uploading
- Check file size (<5MB)
- Verify file format (jpg, png, gif, webp)
- Check browser console for errors

---

## 📚 Tech Stack

### Frontend
- HTML5
- CSS3 (Glassmorphism, Animations)
- Vanilla JavaScript
- Canvas API (Whiteboard)
- Web Speech API (Voice)

### Backend
- Node.js
- Express.js
- File-based JSON database
- AI response engine

### APIs
- Speech Recognition API
- Speech Synthesis API
- File Reader API

---

## 🎓 For Developers

### Project Structure
```
mentra/
├── index.html          # Main HTML structure
├── style.css           # Complete styling (1638 lines)
├── script.js           # Frontend logic + AI
├── server.js           # Backend API server
├── package.json        # Dependencies
├── data.json          # Database
└── README.md          # This file
```

### Key Functions

**Authentication:**
- `handleSignIn(e)` - User login
- `handleSignUp(e)` - User registration
- `loginSuccess(user)` - Post-login handler

**Chat System:**
- `sendChatMessage(e)` - Send message
- `getAIResponse(msg)` - Get AI reply
- `addChatMessage()` - Display message

**Voice System:**
- `toggleVoiceRecording()` - Start/stop mic
- `speakText(text)` - Text-to-speech
- `processVoiceInput()` - Handle voice input

**Teachers:**
- `selectTeacher(id)` - Choose teacher
- `create3DAvatar(id)` - Generate avatar
- `animateAvatarTalking()` - Animate mouth

---

## 🌟 Future Features

- [ ] AI image generation
- [ ] PDF document analysis
- [ ] Group study rooms
- [ ] Live video classes
- [ ] Mobile app (React Native)
- [ ] Homework helper
- [ ] Quiz generation
- [ ] Progress analytics
- [ ] Parent dashboard
- [ ] Teacher admin panel

---

## 📝 License

MIT License - Created by Gigamergestudio ☺️ 

---

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console errors
3. Verify all files are present
4. Check Node.js version

---

## 🎉 Quick Test

1. Open `http://localhost:3000`
2. Login with: demo@mentra.ai / demo123
3. Select Prof. Alex
4. Type: "What is calculus?"
5. Get instant AI response!

---

<div align="center">

**Built with ❤️ for the future of education**

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-FF0080?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-Powered-6C63FF?style=for-the-badge)

MENTRA ~ Powered by Gigamergestudio ☺️ 
</div>
