/* ============================================
   MENTRA AI - BACKEND SERVER
   Node.js + Express + AI Integration
============================================ */

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Data file path
const DATA_FILE = path.join(__dirname, 'data.json');

// Load data
async function loadData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {
      users: [],
      sessions: [],
      chatHistory: [],
      leaderboard: []
    };
  }
}

// Save data
async function saveData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Generate token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Hash password (simple - use bcrypt in production)
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// ========== AUTHENTICATION ==========

// Sign Up
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields required' 
      });
    }
    
    const data = await loadData();
    
    // Check if user exists
    const existingUser = data.users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email already registered' 
      });
    }
    
    // Create user
    const user = {
      id: crypto.randomUUID(),
      name,
      email,
      password: hashPassword(password),
      coins: 100,
      streak: 0,
      sessions: 0,
      level: 1,
      createdAt: new Date().toISOString()
    };
    
    data.users.push(user);
    
    // Create session
    const token = generateToken();
    const sessionId = crypto.randomUUID();
    
    data.sessions.push({
      id: sessionId,
      userId: user.id,
      token,
      createdAt: new Date().toISOString()
    });
    
    await saveData(data);
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      user: userWithoutPassword,
      token,
      sessionId
    });
    
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error' 
    });
  }
});

// Sign In
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and password required' 
      });
    }
    
    const data = await loadData();
    
    // Find user
    const user = data.users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }
    
    // Check password
    if (user.password !== hashPassword(password)) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }
    
    // Create session
    const token = generateToken();
    const sessionId = crypto.randomUUID();
    
    data.sessions.push({
      id: sessionId,
      userId: user.id,
      token,
      createdAt: new Date().toISOString()
    });
    
    await saveData(data);
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      user: userWithoutPassword,
      token,
      sessionId
    });
    
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error' 
    });
  }
});

// Verify Session
app.post('/api/auth/verify', async (req, res) => {
  try {
    const { token, sessionId } = req.body;
    
    const data = await loadData();
    const session = data.sessions.find(s => s.id === sessionId && s.token === token);
    
    res.json({
      valid: !!session
    });
    
  } catch (error) {
    res.json({ valid: false });
  }
});

// Sign Out
app.post('/api/auth/signout', async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    const data = await loadData();
    data.sessions = data.sessions.filter(s => s.id !== sessionId);
    
    await saveData(data);
    
    res.json({ success: true });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Server error' 
    });
  }
});

// ========== CHAT ==========

// AI Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, teacher, history } = req.body;
    
    console.log('Chat request:', { message, teacher });
    
    // Generate AI response
    const response = generateAIResponse(message, teacher, history);
    
    // Save to history
    const data = await loadData();
    data.chatHistory.push({
      id: crypto.randomUUID(),
      teacher,
      message,
      response,
      timestamp: new Date().toISOString()
    });
    
    await saveData(data);
    
    res.json({
      success: true,
      response
    });
    
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get response' 
    });
  }
});

// ========== AI RESPONSE ENGINE ==========

function generateAIResponse(message, teacherId, history) {
  const msg = message.toLowerCase();
  
  // Teacher personalities
  const teachers = {
    alex: {
      name: 'Prof. Alex',
      style: 'analytical and structured',
      specialty: 'math and science'
    },
    sophia: {
      name: 'Dr. Sophia',
      style: 'creative and encouraging',
      specialty: 'languages and arts'
    }
  };
  
  const teacher = teachers[teacherId] || teachers.alex;
  
  // Greeting
  if (/(hi|hello|hey|greetings|howdy)/i.test(msg)) {
    const greetings = [
      `Hey there! 👋 I'm ${teacher.name}, and I'm thrilled to help you learn today! What sparks your curiosity?`,
      `Hello! 🌟 ${teacher.name} here! Ready to dive into something new? What would you like to explore?`,
      `Hi! 😊 Great to see you! I'm ${teacher.name}, your ${teacher.specialty} expert. What can I teach you today?`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Math
  if (/(math|calculate|equation|algebra|geometry|calculus|statistics)/i.test(msg)) {
    return `Excellent math question! 🔢 Let me break this down using my ${teacher.style} approach:

**Understanding the Problem:**
First, let's identify what we know and what we need to find.

**Step-by-Step Solution:**
1. 📊 Define the variables
2. 🎯 Apply the relevant formula or theorem
3. ✅ Calculate carefully
4. 🔍 Verify our answer

**Key Insight:** ${teacherId === 'alex' ? 'In mathematics, precision and logic are everything. Each step builds on the previous one.' : 'Math is like art - there can be multiple beautiful paths to the same answer!'}

Want me to work through a specific problem with you? 🚀`;
  }
  
  // Science
  if (/(science|physics|chemistry|biology|astronomy|geology)/i.test(msg)) {
    return `Fascinating science question! 🔬 Let's explore this together:

**The Core Concept:**
${teacherId === 'alex' ? 'Think of this scientifically - cause and effect, hypothesis and testing.' : 'Imagine science as storytelling - every element has a role in the bigger picture!'}

**Breaking It Down:**
• 🌟 **Fundamentals**: Every complex idea starts with simple building blocks
• 🔗 **Connections**: See how different concepts relate
• 💡 **Real-World**: This applies to everyday life!

**Deeper Understanding:**
${teacherId === 'alex' ? 'The scientific method guides us: observe, hypothesize, test, conclude.' : 'Let your curiosity lead! Science is about asking "why?" and "what if?"'}

What specific aspect would you like to dive deeper into? 🎯`;
  }
  
  // Programming/Coding
  if (/(code|coding|programming|python|javascript|java|c\+\+|developer|software)/i.test(msg)) {
    return `Awesome! Let's talk coding! 💻

**${teacherId === 'alex' ? 'Logical Approach' : 'Creative Problem-Solving'}:**

\`\`\`javascript
// Think like a programmer:
function master(skill) {
  const steps = [
    'Understand the problem',
    'Break it into smaller parts',
    'Write clean code',
    'Test thoroughly'
  ];
  
  return steps.map(step => {
    return practice(step) + document(step);
  });
}
\`\`\`

**Key Principles:**
${teacherId === 'alex' ? '1. Logic first, syntax second\n2. Debug systematically\n3. Optimize intelligently' : '1. Express your ideas in code\n2. Experiment fearlessly\n3. Learn from every error'}

What language or concept are you working with? 🚀`;
  }
  
  // Languages (English, Spanish, etc.)
  if (/(language|english|spanish|french|grammar|vocabulary|writing)/i.test(msg)) {
    return `Languages are beautiful! ✨ Let's explore this:

**${teacherId === 'sophia' ? 'Artistic' : 'Analytical'} Approach to Language:**

${teacherId === 'sophia' ? 
  '🎨 **Language as Art:**\n- Every word paints a picture\n- Grammar is the canvas structure\n- Expression is your unique style\n\n💫 **Tips for Mastery:**\n• Read widely and voraciously\n• Write daily, even just a paragraph\n• Speak without fear of mistakes\n• Immerse yourself in the culture' 
  : 
  '📚 **Structured Learning:**\n- Grammar rules form the foundation\n- Vocabulary expands your toolkit\n- Practice builds fluency\n\n✅ **Systematic Steps:**\n• Master core grammar concepts\n• Build vocabulary thematically\n• Practice with real materials\n• Track your progress'}

What aspect of language learning interests you most? 🌍`;
  }
  
  // Study tips / Learning
  if (/(study|learn|focus|memory|concentrate|exam|test)/i.test(msg)) {
    return `Let's optimize your learning! 🎯

**${teacher.name}'s Study Strategy:**

${teacherId === 'alex' ?
  '📊 **Data-Driven Learning:**\n\n1. **Pomodoro Technique**: 25min focus + 5min break\n2. **Active Recall**: Test yourself constantly\n3. **Spaced Repetition**: Review at intervals\n4. **Feynman Method**: Teach to understand\n\n📈 **Track Your Progress:**\n- Set measurable goals\n- Time your practice\n- Analyze weak areas\n- Optimize your schedule'
  :
  '🌈 **Creative Learning:**\n\n1. **Make It Visual**: Draw, diagram, mindmap\n2. **Tell Stories**: Connect facts to narratives\n3. **Use All Senses**: Don\'t just read - do!\n4. **Find Joy**: Love what you learn\n\n✨ **Stay Inspired:**\n- Create a beautiful study space\n- Use colors and art\n- Reward yourself\n- Study with passion'}

Which technique would you like to try first? 🚀`;
  }
  
  // Default intelligent response
  return `Great question about "${message}"! 🤔

**${teacher.name}'s Perspective:**

${teacherId === 'alex' ?
  '🎯 **Analytical Breakdown:**\n\nLet me approach this systematically:\n\n• **Core Concept**: This relates to fundamental principles in ' + teacher.specialty + '\n• **Key Points**: Breaking down complex ideas into manageable parts\n• **Application**: How this applies in real scenarios\n• **Next Steps**: Building on this foundation\n\n📊 The key is understanding the underlying structure and logic.'
  :
  '✨ **Creative Exploration:**\n\nLet\'s think about this from different angles:\n\n• **The Big Picture**: How this fits into ' + teacher.specialty + '\n• **Making Connections**: Linking to what you already know\n• **Practical Magic**: Using this in real life\n• **Your Journey**: Building your unique understanding\n\n🌟 Learning is an art - let your curiosity guide you!'}

Want me to explain any part in more detail? Or shall we try some examples? 💡`;
}

// ========== LEADERBOARD ==========

app.get('/api/leaderboard', async (req, res) => {
  try {
    const data = await loadData();
    
    // Sort users by coins
    const leaderboard = data.users
      .map(({ password, ...user }) => user) // Remove password
      .sort((a, b) => b.coins - a.coins)
      .slice(0, 100)
      .map((user, index) => ({
        rank: index + 1,
        name: user.name,
        coins: user.coins,
        level: user.level,
        streak: user.streak
      }));
    
    res.json({
      success: true,
      leaderboard
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get leaderboard' 
    });
  }
});

// ========== USER STATS ==========

app.post('/api/user/update', async (req, res) => {
  try {
    const { userId, coins, streak, sessions, level } = req.body;
    
    const data = await loadData();
    const user = data.users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    if (coins !== undefined) user.coins = coins;
    if (streak !== undefined) user.streak = streak;
    if (sessions !== undefined) user.sessions = sessions;
    if (level !== undefined) user.level = level;
    
    await saveData(data);
    
    const { password, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      user: userWithoutPassword
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update user' 
    });
  }
});

// ========== HEALTH CHECK ==========

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// ========== START SERVER ==========

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║                                       ║
║      🚀 MENTRA AI SERVER RUNNING     ║
║                                       ║
║      Port: ${PORT}                        ║
║      Status: ✅ READY                 ║
║      Environment: Development         ║
║                                       ║
╚═══════════════════════════════════════╝
  `);
  
  console.log('📍 Endpoints:');
  console.log('   POST /api/auth/signup');
  console.log('   POST /api/auth/signin');
  console.log('   POST /api/auth/signout');
  console.log('   POST /api/chat');
  console.log('   GET  /api/leaderboard');
  console.log('   POST /api/user/update');
  console.log('   GET  /api/health');
  console.log('\n🌐 Ready to accept requests!\n');
});

// Error handling
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});
