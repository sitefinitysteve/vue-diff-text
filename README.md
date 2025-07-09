# Vue Diff Text

A comprehensive Vue 3 component library for displaying differences between two blocks of text using multiple diffing strategies. Perfect for showing inline text diffs with different granularity levels.

## Features

- 🚀 Vue 3 Composition API
- 📝 Multiple diff strategies: Characters, Words, Words with Space, Lines, and Sentences
- 🎨 Customizable styling with CSS variables
- 📦 TypeScript support
- ⚡ Lightweight and fast
- 🔧 Configurable options support for all diff types

## Installation

```bash
npm install vue-diff-text
```

## Components

This library provides five different diff components, each using a different diffing strategy:

### DiffChars
Character-level diffing - highlights individual character differences.

### DiffWords
Word-level diffing - highlights whole word differences, ignoring whitespace.

### DiffWordsWithSpace
Word-level diffing - highlights whole word differences, including whitespace changes.

### DiffLines
Line-level diffing - highlights entire line differences.

### DiffSentences
Sentence-level diffing - highlights entire sentence differences.

## Usage

### Basic Usage

```vue
<template>
  <div>
    <!-- Character-level diff -->
    <DiffChars :old-text="oldText" :new-text="newText" />
    
    <!-- Word-level diff -->
    <DiffWords :old-text="oldText" :new-text="newText" />
    
    <!-- Word-level diff with space -->
    <DiffWordsWithSpace :old-text="oldText" :new-text="newText" />
    
    <!-- Line-level diff -->
    <DiffLines :old-text="oldText" :new-text="newText" />
    
    <!-- Sentence-level diff -->
    <DiffSentences :old-text="oldText" :new-text="newText" />
  </div>
</template>

<script setup>
import { DiffChars, DiffWords, DiffWordsWithSpace, DiffLines, DiffSentences } from 'vue-diff-text'

const oldText = "Hello world"
const newText = "Hello Vue world"
</script>
```

### Advanced Usage with Options

All components support passing options to the underlying `jsdiff` functions:

```vue
<template>
  <div>
    <!-- Word diff with case insensitive matching -->
    <DiffWords 
      :old-text="oldText" 
      :new-text="newText" 
      :options="{ ignoreCase: true }"
    />
    
    <!-- Line diff ignoring whitespace -->
    <DiffLines 
      :old-text="oldText" 
      :new-text="newText" 
      :options="{ ignoreWhitespace: true }"
    />
  </div>
</template>

<script setup>
import { DiffWords, DiffLines } from 'vue-diff-text'

const oldText = "Hello WORLD"
const newText = "hello world"
</script>
```

### Backward Compatibility

For backward compatibility, `TextDiff` is still available as an alias for `DiffWordsWithSpace`:

```vue
<template>
  <div>
    <!-- This still works -->
    <TextDiff :old-text="oldText" :new-text="newText" />
  </div>
</template>

<script setup>
import { TextDiff } from 'vue-diff-text'

const oldText = "Hello world"
const newText = "Hello Vue world"
</script>
```

## Props

All components share the same props:

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `old-text` | `String` | ✅ | - | The original text to compare |
| `new-text` | `String` | ✅ | - | The new text to compare against |
| `options` | `Object` | ❌ | `{}` | Options passed to the underlying jsdiff function |

## Options

Each component supports different options based on the underlying `jsdiff` function:

### Common Options

Most diff functions support these options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ignoreCase` | `Boolean` | `false` | Ignore case differences |
| `ignoreWhitespace` | `Boolean` | `false` | Ignore whitespace differences |

### DiffWords / DiffWordsWithSpace Specific Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ignoreCase` | `Boolean` | `false` | Ignore case differences |

### DiffLines Specific Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ignoreWhitespace` | `Boolean` | `false` | Ignore whitespace differences |
| `newlineIsToken` | `Boolean` | `false` | Treat newlines as separate tokens |

For a complete list of options, refer to the [jsdiff documentation](https://github.com/kpdecker/jsdiff#options).

## Styling

The components offer two clean ways to customize their appearance:

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
git clone https://github.com/sitefinitysteve/vue-diff-text.git
cd vue-diff-text
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

3. Edit the plugin source files in `src/components/`

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

The `demo/` folder contains a complete Vue 3 application for testing all components:

1. **Interactive demo** - Edit text in real-time
2. **Multiple diff types** - Compare all diff strategies side by side
3. **Options testing** - Test different configuration options
4. **Paragraph comparison** - Test with longer text blocks

To run the demo:
```bash
cd demo
npm install  # First time only
npm run dev
```

### Project Structure

```
vue-diff-text/
├── src/
│   ├── components/
│   │   ├── DiffChars.vue           # Character-level diff
│   │   ├── DiffWords.vue           # Word-level diff
│   │   ├── DiffWordsWithSpace.vue  # Word-level diff with space
│   │   ├── DiffLines.vue           # Line-level diff
│   │   └── DiffSentences.vue       # Sentence-level diff
│   └── index.ts                    # Plugin entry point
├── demo/                           # Test application
│   ├── src/
│   │   ├── App.vue                # Demo examples
│   │   └── main.ts
│   └── package.json
├── dist/                           # Built files (generated)
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

## Migration from v0.0.1

If you're upgrading from the original version:

1. `TextDiff` is now `DiffWordsWithSpace` (but `TextDiff` still works for backward compatibility)
2. All components now support an `options` prop
3. You can now choose from 5 different diff strategies

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

- [Repository](https://github.com/sitefinitysteve/vue-diff-text)
- [Issues](https://github.com/sitefinitysteve/vue-diff-text/issues)
- [Vue 3 Documentation](https://vuejs.org/)
- [jsdiff Documentation](https://github.com/kpdecker/jsdiff)
