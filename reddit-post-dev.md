# Open Source Typing Test - Next.js 15 + React 19 + TypeScript 🚀

**Project**: HaltType - Clean typing speed test with multilingual support

## 🛠️ Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS + Radix UI primitives
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: Better-auth (optional user accounts)
- **Deployment**: Cloudflare Workers ready
- **State Management**: Custom hooks + React Context

## ✨ Features Implemented
- Real-time WPM/accuracy calculations
- 30+ natural languages + 17 programming languages
- Multiple test modes (time-based, word count, quotes)
- Responsive design with mobile-first approach
- Dark theme with clean, minimal UI
- SEO optimized with structured data
- Progressive Web App capabilities

## 🏗️ Architecture Highlights
- **Custom Hooks**: Separated business logic from UI components
- **Real-time Calculations**: Efficient keystroke processing without performance hits
- **Modular Components**: Reusable UI components with proper TypeScript interfaces
- **Database Schema**: Optimized for typing test data and user statistics
- **API Routes**: RESTful endpoints with proper validation

## 📊 Performance
- Lighthouse score: 100/100 (Performance, Accessibility, Best Practices, SEO)
- Real-time typing with <1ms input lag
- Optimized bundle size with code splitting
- Efficient re-rendering during typing sessions

## 🔧 Local Development
```bash
git clone [your-repo]
cd halttype
npm install
npm run dev
```

## 🎯 What I Learned
- Real-time performance optimization in React
- Implementing accurate WPM calculations
- Managing complex typing test state
- Building responsive typing interfaces
- Internationalization for 30+ languages

## 🚀 Try it Live
**Demo**: [Your domain]
**Source**: [Your GitHub repo]

## 🤝 Contributing
Looking for contributors! Especially interested in:
- Additional language support
- Performance optimizations
- UI/UX improvements
- Mobile experience enhancements

**Current roadmap**: User progress tracking, custom text import, multiplayer races, detailed analytics

Feedback and PRs welcome! What would you add to a typing test app?

---

*Built in spare time as a side project. Always learning, always improving! 🎓*

## Code Snippets

**Real-time WPM Calculation:**
```typescript
export function calculateRealTimeWPM(userInput: string, startTime: number): number {
  const timeElapsed = millisecondsToSeconds(Date.now() - startTime);
  const timeInMinutes = secondsToMinutes(timeElapsed);
  const wordsTyped = countWords(userInput);
  return calculateWPM(wordsTyped, timeInMinutes);
}
```

**Custom Hook for Typing State:**
```typescript
export function useTypingTestState(timeLimit?: number) {
  const [state, setState] = useState<TypingTestState>({
    testState: "idle",
    userInput: "",
    currentPosition: 0,
    errors: [],
    // ... more state
  });
  // ... state management logic
}
```