<p align="center"><img src="public/images/giftcatalogbanner.jpg" alt="GiftCatalog Banner" width="100%"></p>

<div align="center">

# GiftCatalog-ALL

### Interactive Telegram Gift Collection Browser & Catalog

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

<br/>

<div align="center">
<a href="https://youtube.com/shorts/j7pTxJF4ZFo">
<img src="https://img.youtube.com/vi/j7pTxJF4ZFo/0.jpg" alt="Watch GiftCatalog Demo" width="600" style="border-radius: 8px;">
</a>
<br>
<p><i>Click to watch GiftCatalog in action</i></p>
</div>

<br/>

> [!TIP]
> **Explore 93+ Telegram gift collections with advanced filtering, beautiful animations, and a smooth browsing experience!**

---

## Overview

GiftCatalog-ALL is a beautiful, interactive web application for browsing and exploring Telegram gift collections. Built with Next.js 15 and modern web technologies, it provides a smooth, responsive experience for discovering and filtering through hundreds of Telegram gifts.

**Features:**
- 🎨 Browse 93+ Telegram gift collections
- 🔍 Advanced filtering by collection, model, backdrop, and pattern
- 🎭 Beautiful animations with Framer Motion and GSAP
- 🌓 Dark/Light theme support
- 📱 Fully responsive design
- ⚡ Lightning-fast performance with Next.js 15
- 🎪 Interactive UI with Lottie animations

---

## Features

### Gift Browser
- **Collection View**: Browse gifts organized by collection
- **Grid Layout**: Beautiful grid display with hover effects
- **Image Optimization**: Next.js Image component for optimal loading
- **Lazy Loading**: Smooth scrolling with lazy-loaded images

### Advanced Filtering
- **Collection Filter**: Filter by specific gift collections
- **Model Filter**: Select specific gift models
- **Backdrop Filter**: Choose backdrop colors
- **Pattern Filter**: Filter by emoji patterns
- **Multi-Select**: Combine multiple filters

### User Experience
- **Smooth Animations**: Framer Motion for fluid transitions
- **GSAP Effects**: Advanced scroll and hover animations
- **Lottie Animations**: Interactive loading states
- **Theme Toggle**: Dark and light mode support
- **Responsive Design**: Works on all devices

### Technical Features
- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Shadcn/ui**: Beautiful UI components
- **MySQL Integration**: Database support for dynamic data
- **API Routes**: Server-side data fetching

---

## Tech Stack

### Frontend
- **Next.js 15.3.2** - React framework with App Router
- **React 18.2** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 3** - Styling
- **Shadcn/ui** - Component library
- **Framer Motion 12** - Animations
- **GSAP 3** - Advanced animations
- **Lottie React** - Lottie animations
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Server-side endpoints
- **MySQL2** - Database integration
- **CORS** - Cross-origin resource sharing

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

---

## Project Structure

```
GiftCatalog-ALL/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Home page
│   │   ├── layout.tsx    # Root layout
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   ├── ui/          # Shadcn/ui components
│   │   └── ...          # Custom components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions
├── public/              # Static assets
│   ├── gifts/          # Gift images
│   ├── images/         # Banner and assets
│   └── icons/          # SVG icons
├── config/             # Configuration files
│   └── netlify.toml    # Netlify deployment config
├── next.config.js      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YUST777/GiftCatalog.git
cd GiftCatalog
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables** (optional)
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Run development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## Deployment

### Netlify

The project is configured for Netlify deployment:

```bash
npm run build
netlify deploy --prod
```

Configuration is in `config/netlify.toml`

### Vercel

Deploy with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YUST777/GiftCatalog)

Or manually:

```bash
npm run build
vercel deploy
```

---

## Features in Detail

### Gift Collections

Browse through 93+ Telegram gift collections including:
- Pudgy Penguins
- Dogs OG
- Not Pixel
- Bored Ape Yacht Club
- Doodles
- Moonbirds
- And many more...

### Filtering System

Advanced multi-criteria filtering:
- **Collection**: Select from 93+ collections
- **Model**: Choose specific gift variations
- **Backdrop**: Filter by background colors
- **Pattern**: Select emoji patterns

### Animations

Smooth, professional animations:
- Page transitions with Framer Motion
- Scroll animations with GSAP
- Hover effects on gift cards
- Loading states with Lottie

### Responsive Design

Optimized for all screen sizes:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

---

## API Routes

### GET /api/gifts
Fetch all gifts with optional filtering

**Query Parameters:**
- `collection` - Filter by collection name
- `model` - Filter by model type
- `backdrop` - Filter by backdrop color
- `pattern` - Filter by pattern type

**Response:**
```json
{
  "gifts": [
    {
      "id": "1",
      "name": "Gift Name",
      "collection": "Collection Name",
      "model": "Model Type",
      "backdrop": "Color",
      "pattern": "Pattern Type",
      "image_url": "/gifts/image.jpg"
    }
  ]
}
```

---

## Development

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

### Code Style

- **ESLint**: Enforces code quality
- **Prettier**: Maintains consistent formatting
- **TypeScript**: Ensures type safety

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Telegram** - For the amazing gift system
- **Next.js Team** - For the incredible framework
- **Shadcn** - For the beautiful UI components
- **Vercel** - For hosting and deployment

---

<div align="center">

### Built with ❤️ for the Telegram Community

*GiftCatalog-ALL - Explore Every Telegram Gift*

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-YUST777-181717?style=flat-square&logo=github)](https://github.com/YUST777)

</div>
