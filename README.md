# Vue Text Diff

A simple Vue 3 component to display the difference between two blocks of text using character-level diffing. Used for showing inline text diffs, not so much for code diffs, you should probably use [v-code-diff](https://github.com/Shimada666/v-code-diff?tab=readme-ov-file#Props) for that.

## Features

- 🚀 Vue 3 Composition API
- 📝 Character-level text diffing
- 🎨 Customizable styling
- 📦 TypeScript support
- ⚡ Lightweight and fast

## Installation

```bash
npm install vue-text-diff
```

## Usage

```vue
<template>
  <div>
    <TextDiff :old-text="oldText" :new-text="newText" />
  </div>
</template>

<script setup>
import { TextDiff } from 'vue-text-diff'

const oldText = "Hello world"
const newText = "Hello Vue world"
</script>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `old-text` | `String` | ✅ | - | The original text to compare |
| `new-text` | `String` | ✅ | - | The new text to compare against |

## Styling

The component offers two clean ways to customize its appearance:

### Method 1: CSS Custom Properties (Recommended)

Override colors globally using CSS variables:

```css
:root {
  /* Customize the diff colors */
  --text-diff-added-bg: #e6ffed;
  --text-diff-added-color: #1b7332;
  --text-diff-removed-bg: #ffe6e6;
  --text-diff-removed-color: #d73a49;
  --text-diff-removed-decoration: line-through;
}
```

### Method 2: CSS Class Override

Target the CSS classes directly for more complex styling:

```css
/* Override default styles */
.diff-added {
  background-color: #e6ffed !important;
  color: #1b7332 !important;
  font-weight: bold;
  border-radius: 3px;
  padding: 2px 4px;
}

.diff-removed {
  background-color: #ffe6e6 !important;
  color: #d73a49 !important;
  text-decoration: line-through;
  border-radius: 3px;
  padding: 2px 4px;
}

/* Or use higher specificity to avoid !important */
.your-container .text-diff .diff-added {
  background-color: #e6ffed;
  color: #1b7332;
}
```

### Available CSS Classes

- `.text-diff` - Main container
- `.diff-added` - Added text segments
- `.diff-removed` - Removed text segments

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/sitefinitysteve/vue-text-diff.git
cd vue-text-diff
```

2. Install dependencies:
```bash
npm install
```

### Development Workflow

#### Option 1: Live Development (Recommended)

For the fastest development experience with hot reload:

1. Start the demo development server:
```bash
cd demo
npm run dev
```

2. Open your browser to the displayed URL (usually http://localhost:5173)

3. Edit the plugin source files in `src/components/TextDiff.vue`

4. See changes instantly in the demo! ✨

The demo is configured with Vite aliases to point directly to the source files, so no build step is needed during development.

#### Option 2: Build + Test Workflow

If you prefer to test the built version:

1. Build the plugin:
```bash
npm run build
```

2. Start the demo:
```bash
cd demo
npm run dev
```

3. After making changes, rebuild and refresh the demo.

### Building for Production

Build the plugin for distribution:

```bash
npm run build
```

This creates:
- `dist/vue-text-diff.js` - ES module
- `dist/vue-text-diff.umd.cjs` - UMD bundle
- `dist/index.d.ts` - TypeScript declarations
- `dist/style.css` - Component styles

### Testing the Plugin

The `demo/` folder contains a complete Vue 3 application for testing the plugin:

1. **Interactive demo** - Edit text in real-time
2. **Code comparison example** - See JavaScript code differences
3. **Paragraph comparison** - Test with longer text blocks

To run the demo:
```bash
cd demo
npm install  # First time only
npm run dev
```

### Project Structure

```
vue-text-diff/
├── src/
│   ├── components/
│   │   └── TextDiff.vue      # Main component
│   └── index.ts              # Plugin entry point
├── demo/                     # Test application
│   ├── src/
│   │   ├── App.vue          # Demo examples
│   │   └── main.ts
│   └── package.json
├── dist/                     # Built files (generated)
├── package.json
└── README.md
```

### Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server for the plugin |
| `npm run build` | Build the plugin for production |
| `npm run preview` | Preview the built plugin |

### Demo Scripts

Run these from the `demo/` directory:

| Script | Description |
|--------|-------------|
| `npm run dev` | Start demo development server |
| `npm run build` | Build demo for production |
| `npm run preview` | Preview built demo |

## Dependencies

- **vue** ^3.4.21 - Vue 3 framework
- **diff** ^5.2.0 - Text diffing library

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test in the demo application
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

MIT © Steve McNiven-Scott

## Links

- [Repository](https://github.com/sitefinitysteve/vue-text-diff)
- [Issues](https://github.com/sitefinitysteve/vue-text-diff/issues)
- [Vue 3 Documentation](https://vuejs.org/)
