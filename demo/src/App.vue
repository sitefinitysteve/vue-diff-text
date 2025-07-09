<template>
  <div class="demo-container">
    <h1>Vue Text Diff Demo</h1>
    
    <!-- Different diff types display with custom examples -->
    <div class="diff-sections">
      <div class="diff-section">
        <h3>DiffChars (Character Level)</h3>
        <p class="explanation">Best for: Typos, single character changes, minor text corrections</p>
        <div class="text-examples">
          <div class="text-example">
            <strong>Original:</strong> {{ charsExample.oldText }}
          </div>
          <div class="text-example">
            <strong>Modified:</strong> {{ charsExample.newText }}
          </div>
        </div>
        <div class="diff-container">
          <DiffChars :old-text="charsExample.oldText" :new-text="charsExample.newText" />
        </div>
      </div>
      
      <div class="diff-section">
        <h3>DiffWords (Word Level)</h3>
        <p class="explanation">Best for: Word replacements, content changes, ignoring whitespace</p>
        <div class="text-examples">
          <div class="text-example">
            <strong>Original:</strong> {{ wordsExample.oldText }}
          </div>
          <div class="text-example">
            <strong>Modified:</strong> {{ wordsExample.newText }}
          </div>
        </div>
        <div class="diff-container">
          <DiffWords :old-text="wordsExample.oldText" :new-text="wordsExample.newText" />
        </div>
      </div>
      
      <div class="diff-section">
        <h3>DiffWordsWithSpace (Word Level with Space)</h3>
        <p class="explanation">Best for: Word changes AND whitespace/formatting changes</p>
        <div class="text-examples">
          <div class="text-example">
            <strong>Original:</strong> <span class="preserve-spaces">"{{ wordsWithSpaceExample.oldText }}"</span>
          </div>
          <div class="text-example">
            <strong>Modified:</strong> <span class="preserve-spaces">"{{ wordsWithSpaceExample.newText }}"</span>
          </div>
        </div>
        <div class="diff-container">
          <DiffWordsWithSpace :old-text="wordsWithSpaceExample.oldText" :new-text="wordsWithSpaceExample.newText" />
        </div>
      </div>
      
      <div class="diff-section">
        <h3>DiffLines (Line Level)</h3>
        <p class="explanation">Best for: Line-by-line changes, code diffs, structured content</p>
        <div class="text-examples">
          <div class="text-example">
            <strong>Original:</strong>
            <pre class="code-example">{{ linesExample.oldText }}</pre>
          </div>
          <div class="text-example">
            <strong>Modified:</strong>
            <pre class="code-example">{{ linesExample.newText }}</pre>
          </div>
        </div>
        <div class="diff-container">
          <DiffLines :old-text="linesExample.oldText" :new-text="linesExample.newText" />
        </div>
      </div>
      
      <div class="diff-section">
        <h3>DiffSentences (Sentence Level)</h3>
        <p class="explanation">Best for: Paragraph changes, sentence restructuring, content editing</p>
        <div class="text-examples">
          <div class="text-example">
            <strong>Original:</strong> {{ sentencesExample.oldText }}
          </div>
          <div class="text-example">
            <strong>Modified:</strong> {{ sentencesExample.newText }}
          </div>
        </div>
        <div class="diff-container">
          <DiffSentences :old-text="sentencesExample.oldText" :new-text="sentencesExample.newText" />
        </div>
      </div>
    </div>
    
    <!-- Interactive playground -->
    <div class="playground-section">
      <h2>Interactive Playground</h2>
      <p>Edit the text below to see live differences with your preferred diff type:</p>
      
      <div class="playground-controls">
        <label>
          <strong>Choose Diff Type:</strong>
          <select v-model="selectedDiffType">
            <option value="chars">DiffChars</option>
            <option value="words">DiffWords</option>
            <option value="wordsWithSpace">DiffWordsWithSpace</option>
            <option value="lines">DiffLines</option>
            <option value="sentences">DiffSentences</option>
          </select>
        </label>
      </div>
      
      <div class="text-panels">
        <div class="text-panel">
          <h3>Original Text</h3>
          <textarea 
            v-model="playgroundOldText" 
            class="text-editor"
            placeholder="Enter original text..."
          ></textarea>
        </div>
        
        <div class="text-panel">
          <h3>New Text (Editable)</h3>
          <textarea 
            v-model="playgroundNewText" 
            class="text-editor"
            placeholder="Edit the text to see differences..."
          ></textarea>
        </div>
      </div>
      
      <h3>Live Diff Result</h3>
      <div class="diff-container">
        <DiffChars v-if="selectedDiffType === 'chars'" :old-text="playgroundOldText" :new-text="playgroundNewText" />
        <DiffWords v-else-if="selectedDiffType === 'words'" :old-text="playgroundOldText" :new-text="playgroundNewText" />
        <DiffWordsWithSpace v-else-if="selectedDiffType === 'wordsWithSpace'" :old-text="playgroundOldText" :new-text="playgroundNewText" />
        <DiffLines v-else-if="selectedDiffType === 'lines'" :old-text="playgroundOldText" :new-text="playgroundNewText" />
        <DiffSentences v-else-if="selectedDiffType === 'sentences'" :old-text="playgroundOldText" :new-text="playgroundNewText" />
      </div>
    </div>
    
    <!-- Options demo -->
    <div class="options-section">
      <h2>Options Demo</h2>
      <p>Example with custom options (ignoreCase and ignoreWhitespace for DiffWords):</p>
      <div class="options-controls">
        <label>
          <input type="checkbox" v-model="ignoreCase" />
          Ignore Case
        </label>
        <label>
          <input type="checkbox" v-model="ignoreWhitespace" />
          Ignore Whitespace
        </label>
      </div>
      <div class="text-examples">
        <div class="text-example">
          <strong>Original:</strong> "{{ caseSensitiveOldText }}"
        </div>
        <div class="text-example">
          <strong>Modified:</strong> "{{ caseSensitiveNewText }}"
        </div>
      </div>
      <div class="diff-container">
        <DiffWords 
          :old-text="caseSensitiveOldText" 
          :new-text="caseSensitiveNewText" 
          :options="wordsOptions"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { DiffChars, DiffWords, DiffWordsWithSpace, DiffLines, DiffSentences } from 'vue-diff-text'

// Custom examples for each diff type
const charsExample = {
  oldText: "The quick brown fox jumps over the lazy dog.",
  newText: "The quik brown fox jumped over the laxy dog!"
}

const wordsExample = {
  oldText: "Vue.js is a progressive JavaScript framework for building user interfaces.",
  newText: "Vue.js is a powerful JavaScript library for creating modern web applications."
}

const wordsWithSpaceExample = {
  oldText: "Hello    world!   How   are   you?",
  newText: "Hello world! How are you today?"
}

const linesExample = {
  oldText: `function greet(name) {
  console.log("Hello, " + name);
  return "Welcome";
}`,
  newText: `function greet(name, age) {
  console.log(\`Hello, \${name}!\`);
  console.log(\`You are \${age} years old.\`);
  return "Welcome to our site";
}`
}

const sentencesExample = {
  oldText: "Vue.js is easy to learn. It has great documentation. Many developers love it.",
  newText: "Vue.js is incredibly easy to learn and has excellent documentation. Many developers absolutely love it because of its simplicity."
}

// Interactive playground
const selectedDiffType = ref('chars')
const playgroundOldText = ref("The quick brown fox jumps over the lazy dog.")
const playgroundNewText = ref("The quik brown fox jumped over the laxy dog!")

// Options demo
const caseSensitiveOldText = "Hello    WORLD!   How are you?"
const caseSensitiveNewText = "hello world! How are you today?"
const ignoreCase = ref(false)
const ignoreWhitespace = ref(false)

const wordsOptions = computed(() => ({
  ignoreCase: ignoreCase.value,
  ignoreWhitespace: ignoreWhitespace.value,
}))
</script>

<style scoped>
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

h2 {
  color: #34495e;
  margin: 40px 0 20px 0;
  font-size: 24px;
}

h3 {
  margin: 0 0 15px 0;
  color: #34495e;
  font-size: 18px;
}

.explanation {
  color: #666;
  font-style: italic;
  margin-bottom: 15px;
  font-size: 14px;
}

.text-examples {
  margin-bottom: 15px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 15px;
}

.text-example {
  margin-bottom: 10px;
  font-size: 14px;
}

.text-example:last-child {
  margin-bottom: 0;
}

.preserve-spaces {
  white-space: pre-wrap;
  font-family: 'Monaco', 'Courier New', monospace;
  background-color: #f1f3f4;
  padding: 2px 4px;
  border-radius: 3px;
}

.code-example {
  background-color: #f1f3f4;
  border: 1px solid #d0d7de;
  border-radius: 4px;
  padding: 10px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 12px;
  white-space: pre;
  margin: 5px 0;
}

.diff-sections {
  margin-bottom: 40px;
}

.diff-section {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e9ecef;
}

.diff-section:last-child {
  border-bottom: none;
}

.playground-section {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 2px solid #e9ecef;
}

.playground-controls {
  margin-bottom: 20px;
}

.playground-controls select {
  margin-left: 10px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.text-panels {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.text-panel {
  flex: 1;
  min-width: 0;
}

.text-editor {
  width: 100%;
  height: 200px;
  padding: 15px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
  box-sizing: border-box;
}

.text-editor:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.diff-container {
  width: 100%;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  min-height: 60px;
}

.options-section {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 2px solid #e9ecef;
}

.options-controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.options-controls label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.options-controls input[type="checkbox"] {
  transform: scale(1.2);
}

/* Responsive design */
@media (max-width: 768px) {
  .text-panels {
    flex-direction: column;
  }
  
  .demo-container {
    padding: 15px;
  }
  
  .options-controls {
    flex-direction: column;
    gap: 10px;
  }
  
  .text-examples {
    font-size: 12px;
  }
}
</style>