# Vue Diff Text

I needed a way to show text differences in my Vue 3 apps, so I built this wrapper around the fantastic [jsdiff](https://github.com/kpdecker/jsdiff) library by [@kpdecker](https://github.com/kpdecker). It gives you five different ways to highlight changes between text blocks, from character-level precision to sentence-level overview.

**⚠️ Important:** This library is designed for **text and paragraph comparisons**, not code diffing. If you need to compare code with syntax highlighting, use [v-code-diff](https://github.com/Shimada666/v-code-diff) instead.

## What you get

- Works with Vue 3 Composition API
- Five different diff strategies: characters, words, words with spaces, lines, and sentences
- Perfect for text, documents, and prose comparisons
- Easy to customize with CSS variables
- Full TypeScript support
- Lightweight (just a thin wrapper around jsdiff)
- Pass any options that jsdiff supports

## Installation

```bash
npm install vue-diff-text
```

## Demo

![Vue Diff Text Demo](DemoPreview.png)

*To run this demo locally: `git clone` this repo, `cd demo`, `npm install`, then `npm run dev`*

## The five components

Each component uses a different diffing strategy depending on what level of detail you need:

**DiffChars** - Shows every single character change. Great for catching typos or small edits.

**DiffWords** - Highlights word-level changes but ignores whitespace. Perfect for most text editing scenarios.

**DiffWordsWithSpace** - Like DiffWords but also shows whitespace changes. Useful when formatting matters.

**DiffLines** - Shows entire line changes. Good for comparing plain text files or when you want a high-level overview.

**DiffSentences** - Highlights sentence-level changes. Nice for prose and document editing.

## How to use it

> **⚠️ Important:** You should import the CSS file for styling to work. It's not mandatory, you CAN implement the classes yourself.

> ```javascript
> import 'vue-diff-text/dist/style.css'
> ```

### Basic example

```vue
<template>
  <div>
    <!-- Pick whichever diff type makes sense for your use case -->
    <DiffChars :old-text="oldText" :new-text="newText" />
    <DiffWords :old-text="oldText" :new-text="newText" />
    <DiffWordsWithSpace :old-text="oldText" :new-text="newText" />
    <DiffLines :old-text="oldText" :new-text="newText" />
    <DiffSentences :old-text="oldText" :new-text="newText" />
  </div>
</template>

<script setup>
import { DiffChars, DiffWords, DiffWordsWithSpace, DiffLines, DiffSentences } from 'vue-diff-text'
import 'vue-diff-text/dist/style.css'

const oldText = "Hello world"
const newText = "Hello Vue world"
</script>
```

### Passing options

Since this is just a wrapper around jsdiff, you can pass any options that jsdiff supports:

```vue
<template>
  <div>
    <!-- Ignore case differences -->
    <DiffWords 
      :old-text="oldText" 
      :new-text="newText" 
      :options="{ ignoreCase: true }"
    />
    
    <!-- Ignore whitespace when comparing lines -->
    <DiffLines 
      :old-text="oldText" 
      :new-text="newText" 
      :options="{ ignoreWhitespace: true }"
    />
  </div>
</template>

<script setup>
import { DiffWords, DiffLines } from 'vue-diff-text'
import 'vue-diff-text/dist/style.css'

const oldText = "Hello WORLD"
const newText = "hello world"
</script>
```

### Legacy support

If you were using the old `TextDiff` component, it still works (it's just an alias for `DiffWordsWithSpace`):

```vue
<template>
  <TextDiff :old-text="oldText" :new-text="newText" />
</template>

<script setup>
import { TextDiff } from 'vue-diff-text'
import 'vue-diff-text/dist/style.css'

const oldText = "Hello world"
const newText = "Hello Vue world"
</script>
```

## Props

All components take the same props:

- `old-text` (required) - The original text
- `new-text` (required) - The new text to compare
- `options` (optional) - Any options to pass to jsdiff

## Options

The options you can pass depend on which diff type you're using. Here are the most common ones:

**For most components:**
- `ignoreCase: true` - Ignore case differences
- `ignoreWhitespace: true` - Ignore whitespace differences

**For DiffLines:**
- `newlineIsToken: true` - Treat newlines as separate tokens

Check the [jsdiff docs](https://github.com/kpdecker/jsdiff#options) for the complete list of what each diff type supports.

## Styling

**You must import the CSS file for styling to work.** Add this import to your component or main.js:

```javascript
import 'vue-diff-text/dist/style.css'
```

You can then customize the look in two ways:

### CSS variables (easiest)

Just override the CSS variables to change colors:

```css
:root {
  --text-diff-added-bg: #e6ffed;
  --text-diff-added-color: #1b7332;
  --text-diff-removed-bg: #ffe6e6;
  --text-diff-removed-color: #d73a49;
  --text-diff-removed-decoration: line-through;
}
```

### Direct CSS classes

If you need more control, target these classes. Note that all styles are scoped under `.text-diff`:

```css
.text-diff {
  white-space: pre-wrap;
  word-wrap: break-word;
  /* Add your custom container styles here */
}

.text-diff .diff-added {
  background-color: #e6ffed;
  color: #1b7332;
  font-weight: bold;
  border-radius: 3px;
  padding: 2px 4px;
}

.text-diff .diff-removed {
  background-color: #ffe6e6;
  color: #d73a49;
  text-decoration: line-through;
  border-radius: 3px;
  padding: 2px 4px;
}
```

The available classes are:
- `.text-diff` - Main container (each component has this)
- `.text-diff .diff-added` - Added text spans
- `.text-diff .diff-removed` - Removed text spans

## Development

Want to contribute or just mess around with the code? Here's how to get started.

### Setup

You'll need Node.js 18+ and npm (or yarn, whatever you prefer).

```bash
git clone https://github.com/sitefinitysteve/vue-diff-text.git
cd vue-diff-text
npm install
```

### Working on it

The easiest way to develop is to use the demo app with hot reload:

```bash
cd demo
npm run dev
```

This spins up a dev server (usually at http://localhost:5173) where you can see all the components in action. The demo is set up with Vite aliases so it points directly to the source files - no build step needed.

Just edit the files in `src/components/` and your changes will show up instantly.

If you want to test the built version instead:

```bash
npm run build
cd demo
npm run dev
```

### Building

When you're ready to build:

```bash
npm run build
```

This creates the dist files (ES module, UMD bundle, TypeScript declarations, and CSS).

### Testing

The demo folder has a complete Vue 3 app for testing. It lets you:
- Edit text in real-time and see the diffs
- Compare all five diff types side by side
- Test different options
- Try it with longer text blocks

```bash
cd demo
npm install  # First time only
npm run dev
```

### Project layout

```
vue-diff-text/
├── src/
│   ├── components/          # The five diff components
│   └── index.ts            # Main entry point
├── demo/                   # Test app
├── dist/                   # Built files
└── package.json
```

Available scripts:
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview built version

For the demo (run from `demo/`):
- `npm run dev` - Start demo server
- `npm run build` - Build demo
- `npm run preview` - Preview built demo

## Dependencies

- **vue** ^3.4.21 - Vue 3 framework
- **diff** ^5.2.0 - The core diffing library by [@kpdecker](https://github.com/kpdecker) that does all the heavy lifting

## Contributing

Found a bug or want to add a feature? Pull requests are welcome!

1. Fork it
2. Create your feature branch
3. Make your changes
4. Test it in the demo app
5. Commit and push
6. Open a pull request

## License

MIT © Steve McNiven-Scott

## Thanks

Huge thanks to [@kpdecker](https://github.com/kpdecker) for creating and maintaining [jsdiff](https://github.com/kpdecker/jsdiff). This library wouldn't exist without his excellent work on the underlying diffing algorithms.

## Links

- [GitHub repo](https://github.com/sitefinitysteve/vue-diff-text)
- [Issues](https://github.com/sitefinitysteve/vue-diff-text/issues)
- [Vue 3 docs](https://vuejs.org/)
- [jsdiff docs](https://github.com/kpdecker/jsdiff)
- [v-code-diff](https://github.com/Shimada666/v-code-diff) - For code diffing with syntax highlighting
