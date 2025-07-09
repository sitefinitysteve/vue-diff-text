<template>
  <div class="demo-container">
    <h1>Vue Text Diff Demo</h1>
    
    <!-- Side by side layout for original text and editable new text -->
    <div class="text-panels">
      <div class="text-panel">
        <h3>Original Text</h3>
        <div class="text-display">{{ oldText }}</div>
      </div>
      
      <div class="text-panel">
        <h3>New Text (Editable)</h3>
        <textarea 
          v-model="newText" 
          class="text-editor"
          placeholder="Edit the text to see differences..."
        ></textarea>
      </div>
    </div>
    
    <!-- Full width diff display -->
    <h3>Diff Result</h3>
    <div class="diff-container">
      <TextDiff :old-text="oldText" :new-text="newText" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TextDiff } from 'vue-text-diff'

const oldText = `Vue.js is a popular JavaScript framework for building user interfaces. Developers like it because it is easy to learn and has good documentation. Many people use Vue.js to make web apps fast and simple.

When working with Vue.js, you can use components to split your code. This helps keep projects organized but sometimes it can be confusing for beginners. Vue.js also has a big community that helps with problems.`

const newText = ref(`Vue.js is a popular and powerful JavaScript framework for building modern user interfaces. Developers like it because it is easy to learn, well-documented, and has excellent community support. Many people use Vue.js to make web apps that are fast, responsive, and simple to maintain.

When working with Vue.js, you can use reusable components to split your code into logical pieces. This helps keep large projects organized and scalable, but sometimes it can be confusing for beginners who are just starting out. Vue.js also has a big, active community that helps with useful resources.`)

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

h3 {
  margin: 0 0 15px 0;
  color: #34495e;
  font-size: 18px;
}

.text-panels {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.text-panel {
  flex: 1;
  min-width: 0; /* Allows flex items to shrink below their content size */
}

.text-display {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  height: 400px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-y: auto;
  box-sizing: border-box;
}

.text-editor {
  width: 100%;
  height: 400px;
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
}

/* Responsive design */
@media (max-width: 768px) {
  .text-panels {
    flex-direction: column;
  }
  
  .demo-container {
    padding: 15px;
  }
}
</style>