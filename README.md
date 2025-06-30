# 📰 Northcoders News - Frontend

A modern, responsive social news platform built with React. Users can browse articles, filter by topics, sort, vote, and comment – similar to Reddit – with a sleek, intuitive interface.

## 🚀 Live Demo

**View the Deployed App:** [https://news-api-ly.netlify.app/](https://news-api-ly.netlify.app/)


## 📖 About This Project

Northcoders News is a social news aggregation, content rating, and discussion website similar to Reddit. Users can:

- **Browse Articles:** View all articles with beautiful card-based layouts
- **Filter by Topics:** Explore articles by specific topics (coding, cooking, football, etc.)
- **Sort & Filter:** Sort articles by date, votes, or comment count in ascending/descending order
- **Vote on Articles:** Upvote or downvote articles with real-time feedback
- **Read & Comment:** View full articles and engage in discussions
- **Responsive Design:** Seamless experience across desktop, tablet, and mobile devices

### 🎨 Design Features

- **Modern UI:** Glassmorphism effects and clean typography
- **Figma-Inspired:** Professional design system with consistent spacing and colors
- **Accessibility:** ARIA labels, keyboard navigation, and screen reader support
- **Performance:** Optimized with lazy loading and efficient state management

## 🔗 Backend Repository

**Backend API:** [https://github.com/Lauren21717/news-BE](https://github.com/Lauren21717/news-BE)


## 🛠 Tech Stack

- **Frontend:** React 18, React Router, JavaScript ES6+
- **Styling:** Tailwind CSS, CSS3
- **API:** RESTful API integration with custom fetch utilities
- **State Management:** React Hooks (useState, useEffect, useParams, useSearchParams)
- **Build Tool:** Vite
- **Version Control:** Git & GitHub

## ⚙️ Prerequisites

- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher

*Check your Node version with:*
```bash
node --version
```

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Lauren21717/nc-news.git
cd nc-news
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

### 4. Open in Browser
Navigate to [http://localhost:5173](http://localhost:5173) to view the application.

## 📁 Project Structure

```
nc-news/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Navigation header
│   │   ├── ArticlesList.jsx        # Main articles view with pagination
│   │   ├── ArticleCard.jsx         # Individual article preview
│   │   ├── SingleArticle.jsx       # Full article view
│   │   ├── TopicsList.jsx          # Topics overview page
│   │   ├── TopicArticles.jsx       # Topic-filtered articles
│   │   ├── SortControls.jsx        # Modern sorting interface
│   │   ├── CommentsList.jsx        # Comments display
│   │   ├── CommentCard.jsx         # Individual comment
│   │   ├── AddComment.jsx          # Comment form with validation
│   │   ├── VotingButtons.jsx       # Article voting with optimistic updates
│   │   ├── NotFound.jsx            # 404 error pages
│   │   └── ErrorBoundary.jsx       # Error boundary component
│   ├── utils/
│   │   ├── api.js                  # API utilities and functions
│   │   └── validation.js           # Form validation utilities
│   ├── App.jsx                     # Main app component and routing
│   ├── App.css                     # Global styles
│   └── main.jsx                    # React entry point
├── package.json
└── README.md
```

## ✨ Key Features

### 🎯 Core Functionality
- **Article Management:** Browse, filter, and sort articles
- **Topic Navigation:** Filter articles by specific topics
- **Real-time Voting:** Upvote/downvote with optimistic UI updates
- **Comment System:** Add, view, and delete comments
- **Pagination:** Load more articles with infinite scroll

### 🎨 User Experience
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Loading States:** Skeleton loaders and smooth transitions
- **Error Handling:** User-friendly error pages with helpful actions
- **Form Validation:** Real-time validation with clear feedback
- **URL State:** Shareable URLs for sorted/filtered views

### 🔧 Technical Highlights
- **Modern React Patterns:** Hooks, component composition, custom hooks
- **Performance Optimized:** Lazy loading, debounced inputs, efficient re-renders
- **Accessibility:** WCAG compliant with semantic HTML and ARIA labels
- **Error Boundaries:** Graceful error handling and recovery
- **Clean Code:** Modular components with separation of concerns

## 🎮 How to Use

### Browsing Articles
1. **View All Articles:** Homepage displays all articles in a responsive grid
2. **Filter by Topic:** Click topic links to view articles from specific categories
3. **Sort Articles:** Use the modern sort controls to organize by date, votes, or comments
4. **Load More:** Click "Load More" to see additional articles

### Reading & Engaging
1. **Read Articles:** Click any article title or "Read More" to view the full content
2. **Vote on Articles:** Use the upvote/downvote buttons to rate articles
3. **Add Comments:** Share your thoughts using the comment form
4. **Navigate:** Use breadcrumb navigation and back links to explore

### Error Handling
- **404 Pages:** Custom error pages for missing articles, topics, or routes
- **Network Issues:** Retry buttons for failed requests
- **Form Validation:** Real-time feedback for comment submissions

## 🚀 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🌐 API Integration

This frontend connects to a custom REST API with the following endpoints:

- `GET /api/articles` - Fetch articles with sorting/filtering
- `GET /api/articles/:article_id` - Fetch single article
- `GET /api/articles/:article_id/comments` - Fetch article comments
- `POST /api/articles/:article_id/comments` - Add new comment
- `PATCH /api/articles/:article_id` - Update article votes
- `DELETE /api/comments/:comment_id` - Delete comment
- `GET /api/topics` - Fetch all topics

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory (if needed):
```env
VITE_API_URL=https://your-api-url.herokuapp.com/api
```

### API Base URL
Update the API base URL in `src/utils/api.js`:
```javascript
const BASE_URL = 'https://your-api-url.herokuapp.com/api';
```

## 🎨 Design System

### Colors
- **Primary:** Green (#059669)
- **Secondary:** Gray tones for text and backgrounds
- **Error:** Red (#EF4444) for validation and errors
- **Success:** Green for confirmations

### Typography
- **Font Family:** Inter (Google Fonts)
- **Headings:** Bold, large sizes with proper hierarchy
- **Body Text:** Clean, readable with good contrast

### Components
- **Glassmorphism:** Semi-transparent backgrounds with backdrop blur
- **Card Design:** Subtle shadows and rounded corners
- **Buttons:** Consistent hover states and transitions
- **Forms:** Clean inputs with validation styling

## 🤝 Contributing

This is a portfolio project, but if you'd like to suggest improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Future Enhancements

- **User Authentication:** Login/logout functionality
- **User Profiles:** Individual user pages and avatars
- **Real-time Updates:** WebSocket integration for live comments
- **Advanced Filtering:** Date ranges, multiple topic selection
- **Dark Mode:** Theme toggle for user preference
- **Bookmarking:** Save favorite articles
- **Search:** Full-text search across articles
- **Social Sharing:** Share articles on social media

## 🐛 Known Issues

- Placeholder images from Picsum may occasionally load slowly
- Optimistic comment updates may briefly show loading states on slow connections


## 📄 License

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)