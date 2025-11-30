# CV Editor

A modern, interactive CV builder built with React and Vite. Create professional resumes with real-time preview, intuitive form inputs, and a clean, responsive design.

## 📸 Screenshots

![CV Editor Interface](./public/main-interface.png)
*Main interface showing the editor and live preview side by side*

## ✨ Features

- **📝 Personal Information**: Edit contact details, professional title, and about section
- **🎓 Education Management**: Add multiple education entries with school, degree, and dates
- **💼 Experience Tracking**: Manage work experience with company, position, and descriptions
- **👀 Real-time Preview**: See your CV update instantly as you type
- **✨ Modern UI**: Clean, professional design with TailwindCSS
- **📱 Responsive**: Works seamlessly on desktop and mobile devices
- **⚡ Performance Optimized**: Uses React.memo for efficient re-rendering
- **🔧 Form Validation**: Smart validation with helpful error messages
- **💾 Auto-save**: Changes are reflected immediately in the preview

## 🛠 Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast development server and build tool
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **HTML5** - Semantic markup
- **JavaScript ES6+** - Modern JavaScript features

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/EmreKaplan67/cv-builder.git
cd cv-editor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📖 Usage Guide

### Personal Information
1. Click the "Edit" button in the Personal Info section
2. Fill in your details including name, email, phone, website, location, and professional title
3. Add a brief about section (optional, 500 character limit)
4. Click "Save" to see changes in the preview

### Education
1. Expand the Education section
2. Click "+ Add Education" to add new entries
3. Fill in school name, degree, start/end dates, and location
4. Use the pencil icon to edit existing entries
5. Use the delete button to remove entries

### Experience
1. Expand the Experience section  
2. Click "+ Add Experience" to add new work experiences
3. Include company, position, dates, location, and job description
4. Descriptions support up to 500 characters with character counter
5. Edit or delete entries using the respective buttons

### Preview
- The right panel shows a live preview of your CV
- Updates automatically when you save changes
- Professional formatting suitable for printing or PDF export

## 🎯 Project Goals

This CV Editor was built as part of The Odin Project curriculum to demonstrate:
- React state management and component architecture
- Form handling and validation
- Real-time data synchronization
- Modern UI/UX design principles
- Performance optimization techniques
- Responsive design implementation

## 📁 Project Structure

```
src/
├── components/
│   ├── Cards/          # Main section components (Personal, Education, Experience)
│   ├── Forms/          # Form components for data input
│   ├── UI/             # Reusable UI components
│   ├── Preview/        # CV preview component
│   └── ContentEditor/  # Main editor container
├── contexts/           # React contexts (removed in favor of lifted state)
└── App.jsx            # Main application component
```

## ⚡ Performance Features

- **React.memo**: Individual components only re-render when their data changes
- **State Lifting**: Centralized state management in App component
- **Optimized Re-renders**: Personal info changes don't affect education/experience components
- **Efficient Updates**: Preview updates only when relevant data changes

## 🎨 Design Features

- **Modern Styling**: Clean, professional appearance with shadows and hover effects
- **Form Validation**: Real-time validation with helpful error messages
- **Character Limits**: Textarea fields with live character counters
- **Responsive Layout**: Adapts to different screen sizes
- **Accessibility**: Semantic HTML and proper ARIA labels

## 🔮 Future Enhancements

- [ ] PDF export functionality
- [ ] Multiple CV templates
- [ ] Local storage for saving drafts
- [ ] Import from LinkedIn/other platforms
- [ ] Dark mode support
- [ ] More sections (Skills, Projects, Certifications)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using React and Vite**
