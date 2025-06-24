# Lendsqr Frontend Test

A React-based frontend implementation for the Lendsqr admin dashboard, built with TypeScript and Vite.

## 🚀 Features

- **Authentication**

  - Login page with form validation
  - Secure session management

- **Dashboard Layout**

  - Responsive sidebar navigation
  - Organization switcher
  - User profile menu
  - Global search functionality

- **Users Management**

  - Users listing with pagination
  - Detailed user view
  - User status management
  - Filtering and search capabilities

- **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts for all screen sizes
  - Touch-friendly interactions

## 🛠️ Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** SCSS Modules
- **State Management:** React Context API
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form
- **Type Checking:** TypeScript

## 📦 Project Structure

```
lendsqr-fe-test/
├── src/
│   ├── assets/          # Static assets (images, icons, etc.)
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   └── App.tsx         # Root component
├── public/             # Public assets
└── package.json        # Project dependencies
```

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/omotosho-cloud/lendsqr-fe-test.git
   cd lendsqr-fe-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🧪 Testing

- **Run unit tests**

  ```bash
  npm test
  ```

- **Run E2E tests**
  ```bash
  npm run test:e2e
  ```

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Authors

- **Omotosho Temitope** - _Initial work_ - (https://github.com/omotosho-cloud)

## 🙏 Acknowledgments

- Lendsqr team for the opportunity
