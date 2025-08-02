# PBW Web Architects - Modern React Website

A stunning, modern React website for PBW Web Architects software engineering company, built with the latest design trends and technologies.

## 🚀 Features

- **Modern Design**: Glassmorphism effects, gradients, and micro-interactions
- **Responsive**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Smooth Animations**: Powered by Framer Motion
- **Performance Optimized**: Built with Vite for fast development and build times
- **Accessible**: Following web accessibility best practices
- **SEO Friendly**: Optimized for search engines

## 🛠 Tech Stack

- **React 18** - Latest React with hooks
- **Vite** - Next generation build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Motion library for React
- **Lucide React** - Beautiful SVG icons
- **Modern JavaScript** - ES6+ features

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx      # Navigation with dark mode toggle
│   ├── Hero.jsx        # Hero section with animations
│   ├── About.jsx       # About us section
│   ├── Projects.jsx    # Projects portfolio
│   ├── Testimonials.jsx # Customer testimonials
│   ├── Contact.jsx     # Contact form
│   └── Footer.jsx      # Footer with links
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎨 Design Features

### Modern UI Elements
- **Glassmorphism**: Semi-transparent elements with backdrop blur
- **Gradient Backgrounds**: Beautiful color transitions
- **Card Hover Effects**: Interactive hover animations
- **Smooth Scrolling**: Enhanced user experience
- **Loading States**: Elegant loading animations

### Sections Included
1. **Hero Section**: Eye-catching landing with call-to-action
2. **About Us**: Company story, mission, and values
3. **Projects**: Portfolio showcase with filtering
4. **Testimonials**: Customer feedback carousel
5. **Contact Form**: Modern form with validation
6. **Footer**: Comprehensive site links and information

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd pbw-network-react
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your brand colors
  }
}
```

### Content
Update the content in each component file:
- Company information in `About.jsx`
- Projects in `Projects.jsx`
- Testimonials in `Testimonials.jsx`
- Contact information in `Contact.jsx` and `Footer.jsx`

### Animations
Animations are powered by Framer Motion. Customize them in each component by modifying the `variants` objects.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌙 Dark Mode

Dark mode is implemented using Tailwind's dark mode feature with class strategy. Users can toggle between themes using the button in the navigation.

## 🔧 Performance Optimizations

- **Vite**: Fast build tool with HMR
- **Code Splitting**: Automatic code splitting
- **Image Optimization**: Responsive images with proper sizing
- **CSS Purging**: Unused CSS removal in production
- **Modern JavaScript**: Optimized bundle sizes

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For support, email hello@pbwwebarchitects.com or create an issue in the repository.

---

Built with ❤️ by PBW Web Architects
