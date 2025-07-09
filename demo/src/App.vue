<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div class="max-w-6xl mx-auto px-6 py-12">
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Vue Text Diff Demo
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Compare text changes at different levels - from individual characters to entire sentences
        </p>
      </div>
      
      <!-- Different diff types display with custom examples -->
      <div class="space-y-12 mb-20">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-red-500 to-pink-500 px-8 py-6">
            <h3 class="text-2xl font-bold text-white mb-2">DiffChars (Character Level)</h3>
            <p class="text-red-100 text-lg">Best for: Typos, single character changes, minor text corrections</p>
          </div>
          <div class="p-8">
            <div class="bg-gray-50 rounded-xl p-6 mb-6 border-l-4 border-red-500">
              <div class="mb-4">
                <span class="inline-block bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full mb-2">Original</span>
                <div class="font-mono text-gray-800">{{ charsExample.oldText }}</div>
              </div>
              <div>
                <span class="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-2">Modified</span>
                <div class="font-mono text-gray-800">{{ charsExample.newText }}</div>
              </div>
            </div>
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 font-mono text-base leading-relaxed border-2 border-gray-200">
              <DiffChars :old-text="charsExample.oldText" :new-text="charsExample.newText" />
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-6">
            <h3 class="text-2xl font-bold text-white mb-2">DiffWords (Word Level)</h3>
            <p class="text-orange-100 text-lg">Best for: Word replacements, content changes, ignoring whitespace</p>
          </div>
          <div class="p-8">
            <div class="bg-gray-50 rounded-xl p-6 mb-6 border-l-4 border-orange-500">
              <div class="mb-4">
                <span class="inline-block bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full mb-2">Original</span>
                <div class="font-mono text-gray-800">{{ wordsExample.oldText }}</div>
              </div>
              <div>
                <span class="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-2">Modified</span>
                <div class="font-mono text-gray-800">{{ wordsExample.newText }}</div>
              </div>
            </div>
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 font-mono text-base leading-relaxed border-2 border-gray-200">
              <DiffWords :old-text="wordsExample.oldText" :new-text="wordsExample.newText" />
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-green-500 to-teal-500 px-8 py-6">
            <h3 class="text-2xl font-bold text-white mb-2">DiffWordsWithSpace (Word Level with Space)</h3>
            <p class="text-green-100 text-lg">Best for: Word changes AND whitespace/formatting changes</p>
          </div>
          <div class="p-8">
            <div class="bg-gray-50 rounded-xl p-6 mb-6 border-l-4 border-green-500">
              <div class="mb-4">
                <span class="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-2">Original</span>
                <div class="font-mono text-gray-800 whitespace-pre-wrap">"{{ wordsWithSpaceExample.oldText }}"</div>
              </div>
              <div>
                <span class="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-2">Modified</span>
                <div class="font-mono text-gray-800 whitespace-pre-wrap">"{{ wordsWithSpaceExample.newText }}"</div>
              </div>
            </div>
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 font-mono text-base leading-relaxed border-2 border-gray-200">
              <DiffWordsWithSpace :old-text="wordsWithSpaceExample.oldText" :new-text="wordsWithSpaceExample.newText" />
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-6">
            <h3 class="text-2xl font-bold text-white mb-2">DiffLines (Line Level)</h3>
            <p class="text-blue-100 text-lg">Best for: Document revisions, meeting notes, structured text changes</p>
          </div>
          <div class="p-8">
            <div class="bg-gray-50 rounded-xl p-6 mb-6 border-l-4 border-blue-500">
              <div class="mb-4">
                <span class="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-2">Original</span>
                <div class="bg-white rounded-lg p-4 text-sm border border-gray-200 whitespace-pre-line">{{ linesExample.oldText }}</div>
              </div>
              <div>
                <span class="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-2">Modified</span>
                <div class="bg-white rounded-lg p-4 text-sm border border-gray-200 whitespace-pre-line">{{ linesExample.newText }}</div>
              </div>
            </div>
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 font-mono text-base leading-relaxed border-2 border-gray-200">
              <DiffLines :old-text="linesExample.oldText" :new-text="linesExample.newText" />
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-6">
            <h3 class="text-2xl font-bold text-white mb-2">DiffSentences (Sentence Level)</h3>
            <p class="text-purple-100 text-lg">Best for: Paragraph changes, sentence restructuring, content editing</p>
          </div>
          <div class="p-8">
            <div class="bg-gray-50 rounded-xl p-6 mb-6 border-l-4 border-purple-500">
              <div class="mb-4">
                <span class="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full mb-2">Original</span>
                <div class="font-mono text-gray-800">{{ sentencesExample.oldText }}</div>
              </div>
              <div>
                <span class="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-2">Modified</span>
                <div class="font-mono text-gray-800">{{ sentencesExample.newText }}</div>
              </div>
            </div>
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 font-mono text-base leading-relaxed border-2 border-gray-200">
              <DiffSentences :old-text="sentencesExample.oldText" :new-text="sentencesExample.newText" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Interactive playground -->
      <div class="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden mb-20">
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-8">
          <h2 class="text-3xl font-bold text-white mb-3">Interactive Playground</h2>
          <p class="text-indigo-100 text-lg">Edit the text below to see live differences with your preferred diff type</p>
        </div>
        
        <div class="p-8">
          <div class="mb-8">
            <label class="block text-lg font-semibold text-gray-700 mb-4">
              Choose Diff Type:
            </label>
            <select v-model="selectedDiffType" class="w-full md:w-auto px-6 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white shadow-sm">
              <option value="chars">🔍 DiffChars</option>
              <option value="words">📝 DiffWords</option>
              <option value="wordsWithSpace">📄 DiffWordsWithSpace</option>
              <option value="lines">📋 DiffLines</option>
              <option value="sentences">📖 DiffSentences</option>
            </select>
          </div>
          
          <div class="grid md:grid-cols-2 gap-8 mb-8">
            <div class="space-y-4">
              <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span class="w-3 h-3 bg-red-500 rounded-full"></span>
                Original Text
              </h3>
              <textarea 
                v-model="playgroundOldText" 
                class="w-full h-48 p-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-mono text-sm leading-relaxed resize-none shadow-sm"
                placeholder="Enter original text..."
              ></textarea>
            </div>
            
            <div class="space-y-4">
              <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span class="w-3 h-3 bg-green-500 rounded-full"></span>
                New Text (Editable)
              </h3>
              <textarea 
                v-model="playgroundNewText" 
                class="w-full h-48 p-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-mono text-sm leading-relaxed resize-none shadow-sm"
                placeholder="Edit the text to see differences..."
              ></textarea>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
              Live Diff Result
            </h3>
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 font-mono text-base leading-relaxed border-2 border-gray-200 min-h-[120px]">
              <DiffChars v-if="selectedDiffType === 'chars'" :old-text="playgroundOldText" :new-text="playgroundNewText" />
              <DiffWords v-else-if="selectedDiffType === 'words'" :old-text="playgroundOldText" :new-text="playgroundNewText" />
              <DiffWordsWithSpace v-else-if="selectedDiffType === 'wordsWithSpace'" :old-text="playgroundOldText" :new-text="playgroundNewText" />
              <DiffLines v-else-if="selectedDiffType === 'lines'" :old-text="playgroundOldText" :new-text="playgroundNewText" />
              <DiffSentences v-else-if="selectedDiffType === 'sentences'" :old-text="playgroundOldText" :new-text="playgroundNewText" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Options demo -->
      <div class="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div class="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-8">
          <h2 class="text-3xl font-bold text-white mb-3">Options Demo</h2>
          <p class="text-teal-100 text-lg">Example with custom options (ignoreCase and ignoreWhitespace for DiffWords)</p>
        </div>
        
        <div class="p-8">
          <div class="flex flex-wrap gap-6 mb-8">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                v-model="ignoreCase" 
                class="w-5 h-5 text-teal-600 border-2 border-gray-300 rounded focus:ring-teal-500 focus:ring-2 transition-all"
              />
              <span class="text-lg font-medium text-gray-700 group-hover:text-teal-600 transition-colors">
                Ignore Case
              </span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                v-model="ignoreWhitespace" 
                class="w-5 h-5 text-teal-600 border-2 border-gray-300 rounded focus:ring-teal-500 focus:ring-2 transition-all"
              />
              <span class="text-lg font-medium text-gray-700 group-hover:text-teal-600 transition-colors">
                Ignore Whitespace
              </span>
            </label>
          </div>
          
          <div class="bg-gray-50 rounded-xl p-6 mb-6 border-l-4 border-teal-500">
            <div class="mb-4">
              <span class="inline-block bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full mb-2">Original</span>
              <div class="font-mono text-gray-800">"{{ caseSensitiveOldText }}"</div>
            </div>
            <div>
              <span class="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-2">Modified</span>
              <div class="font-mono text-gray-800">"{{ caseSensitiveNewText }}"</div>
            </div>
          </div>
          
          <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 font-mono text-base leading-relaxed border-2 border-gray-200">
            <DiffWords 
              :old-text="caseSensitiveOldText" 
              :new-text="caseSensitiveNewText" 
              :options="wordsOptions"
            />
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="text-center mt-16 py-8 border-t border-gray-200">
        <p class="text-gray-600">
          Built with ❤️ using Vue 3 and Tailwind CSS
        </p>
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
  oldText: `Meeting Notes - Project Alpha
Date: March 15, 2024
Attendees: Sarah, Mike, Jessica

Action Items:
- Review budget proposal
- Schedule client meeting
- Update project timeline`,
  newText: `Meeting Notes - Project Alpha (URGENT)
Date: March 15, 2024
Attendees: Sarah, Mike, Jessica, David

Action Items:
- Review and approve budget proposal by Friday
- Schedule client meeting for next week
- Update project timeline with new milestones
- Prepare presentation for stakeholders`
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