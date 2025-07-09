import './style.css';

import DiffChars from './components/DiffChars.vue';
import DiffWords from './components/DiffWords.vue';
import DiffWordsWithSpace from './components/DiffWordsWithSpace.vue';
import DiffLines from './components/DiffLines.vue';
import DiffSentences from './components/DiffSentences.vue';

// Export all components
export {
  DiffChars,
  DiffWords,
  DiffWordsWithSpace,
  DiffLines,
  DiffSentences,
};

// For backward compatibility, export DiffWordsWithSpace as TextDiff
export { DiffWordsWithSpace as TextDiff };
