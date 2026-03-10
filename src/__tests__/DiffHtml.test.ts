import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DiffHtml from '../components/DiffHtml.vue'

describe('DiffHtml', () => {
  it('renders word-level diff without similarity threshold', () => {
    const wrapper = mount(DiffHtml, {
      props: {
        oldText: 'Hello world',
        newText: 'Hello Vue world',
      },
    })
    const html = wrapper.html()
    expect(html).toContain('diff-added')
    expect(html).not.toContain('diff-removed')
  })

  it('renders full replacement when similarity is below threshold', () => {
    const wrapper = mount(DiffHtml, {
      props: {
        oldText: 'It is expressly agreed and understood by the parties that the Husband shall maintain his existing life insurance policy.',
        newText: 'Item 1: House. Item 2: Car. Item 3: Savings.',
        similarityThreshold: 0.3,
      },
    })
    const removedSpans = wrapper.findAll('.diff-removed')
    const addedSpans = wrapper.findAll('.diff-added')
    expect(removedSpans.length).toBe(1)
    expect(addedSpans.length).toBe(1)
    expect(removedSpans[0].text()).toContain('expressly agreed')
    expect(addedSpans[0].text()).toContain('Item 1')
  })

  it('renders word-level diff when similarity is above threshold', () => {
    const wrapper = mount(DiffHtml, {
      props: {
        oldText: 'The quick brown fox jumps over the lazy dog.',
        newText: 'The quick brown fox leaps over the lazy dog.',
        similarityThreshold: 0.3,
      },
    })
    // High similarity — should NOT trigger full replacement
    const removedSpans = wrapper.findAll('.diff-removed')
    const addedSpans = wrapper.findAll('.diff-added')

    // Full replacement would have exactly 1 removed span with the entire old text
    // Word-level diff should NOT contain the full sentence in a single removed span
    expect(addedSpans.length).toBeGreaterThan(0)
    const isFullReplacement = removedSpans.length === 1
      && removedSpans[0].text().includes('The quick brown fox')
    expect(isFullReplacement).toBe(false)
  })

  it('does not trigger full replacement when threshold is null', () => {
    const wrapper = mount(DiffHtml, {
      props: {
        oldText: 'Completely different text here with many words.',
        newText: 'XYZ 123 ABC.',
      },
    })
    // Without threshold, even very dissimilar text uses normal diff
    // Full replacement would produce exactly 1 removed + 1 added with full text
    const removedSpans = wrapper.findAll('.diff-removed')
    const addedSpans = wrapper.findAll('.diff-added')
    const isFullReplacement = removedSpans.length === 1
      && addedSpans.length === 1
      && removedSpans[0].text() === 'Completely different text here with many words.'
      && addedSpans[0].text() === 'XYZ 123 ABC.'
    expect(isFullReplacement).toBe(false)
  })

  it('threshold 0 never triggers full replacement', () => {
    const wrapper = mount(DiffHtml, {
      props: {
        oldText: 'Completely different text here.',
        newText: 'XYZ 123.',
        similarityThreshold: 0,
      },
    })
    // similarity is always >= 0, so `similarity < 0` is never true
    const removedSpans = wrapper.findAll('.diff-removed')
    const addedSpans = wrapper.findAll('.diff-added')
    const isFullReplacement = removedSpans.length === 1
      && addedSpans.length === 1
      && removedSpans[0].text() === 'Completely different text here.'
      && addedSpans[0].text() === 'XYZ 123.'
    expect(isFullReplacement).toBe(false)
  })

  it('threshold 1 triggers full replacement for any non-identical text', () => {
    const wrapper = mount(DiffHtml, {
      props: {
        oldText: 'Hello world',
        newText: 'Hello worlds',
        similarityThreshold: 1,
      },
    })
    // Even a tiny change: similarity < 1, so full replacement triggers
    const removedSpans = wrapper.findAll('.diff-removed')
    const addedSpans = wrapper.findAll('.diff-added')
    expect(removedSpans.length).toBe(1)
    expect(addedSpans.length).toBe(1)
    expect(removedSpans[0].text()).toBe('Hello world')
    expect(addedSpans[0].text()).toBe('Hello worlds')
  })

  it('threshold 1 does not trigger full replacement for identical text', () => {
    const wrapper = mount(DiffHtml, {
      props: {
        oldText: 'Hello world',
        newText: 'Hello world',
        similarityThreshold: 1,
      },
    })
    // similarity === 1, which is NOT < 1, so no full replacement
    const removedSpans = wrapper.findAll('.diff-removed')
    const addedSpans = wrapper.findAll('.diff-added')
    expect(removedSpans.length).toBe(0)
    expect(addedSpans.length).toBe(0)
  })

  it('identical text with threshold set does not trigger full replacement', () => {
    const wrapper = mount(DiffHtml, {
      props: {
        oldText: 'Same content here',
        newText: 'Same content here',
        similarityThreshold: 0.3,
      },
    })
    expect(wrapper.findAll('.diff-removed').length).toBe(0)
    expect(wrapper.findAll('.diff-added').length).toBe(0)
  })

  it('handles empty oldText without error', () => {
    const wrapper = mount(DiffHtml, {
      props: {
        oldText: '',
        newText: 'Some new text',
        similarityThreshold: 0.3,
      },
    })
    // Empty oldText guard: isFullReplacement returns false
    expect(wrapper.html()).toBeTruthy()
    // Should not be full replacement (guard catches empty text)
    const removedSpans = wrapper.findAll('.diff-removed')
    expect(removedSpans.length).toBe(0)
  })

  it('handles empty newText without error', () => {
    const wrapper = mount(DiffHtml, {
      props: {
        oldText: 'Some old text',
        newText: '',
        similarityThreshold: 0.3,
      },
    })
    expect(wrapper.html()).toBeTruthy()
  })

  it('handles both texts empty with threshold', () => {
    const wrapper = mount(DiffHtml, {
      props: {
        oldText: '',
        newText: '',
        similarityThreshold: 0.3,
      },
    })
    // Both empty: isFullReplacement guard returns false (no full replacement)
    expect(wrapper.findAll('.diff-removed').length).toBe(0)
    expect(wrapper.findAll('.diff-added').length).toBe(0)
  })

  // ─── Bug 1: Curly quotes vs straight quotes ────────────────────────

  describe('Bug 1: Curly quotes vs straight quotes', () => {
    it('1a: curly quotes in old, straight in new — no quote diff artifacts', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: '<strong>\u201CClinic\u201D</strong> means a fertility clinic selected by the Intended Parent.',
          newText: '<strong>"Clinic"</strong> means a fertility clinic selected by the Intended Parent and may be changed later.',
        },
      })
      const html = wrapper.html()

      // Quote differences should NOT produce removed spans
      const removedSpans = wrapper.findAll('.diff-removed')
      for (const span of removedSpans) {
        expect(span.text()).not.toMatch(/[\u201C\u201D"]/)
      }

      // "and may be changed later" should be added
      expect(html).toContain('diff-added')
    })

    it('1b: straight quotes in old, curly in new — no quote diff artifacts', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: '<strong>"Clinic"</strong> means a fertility clinic selected by the Intended Parent.',
          newText: '<strong>\u201CClinic\u201D</strong> means a fertility clinic selected by the Intended Parent and may be changed later.',
        },
      })
      const html = wrapper.html()

      // Quote differences should NOT produce removed spans
      const removedSpans = wrapper.findAll('.diff-removed')
      for (const span of removedSpans) {
        expect(span.text()).not.toMatch(/[\u201C\u201D"]/)
      }

      // "and may be changed later" should be added
      expect(html).toContain('diff-added')
    })

    it('1c: plain text curly quotes — no quote diff artifacts', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: '\u201CClinic\u201D means selected by Intended Parent.',
          newText: '"Clinic" means selected by Intended Parent and changed.',
        },
      })
      const html = wrapper.html()

      // "Clinic" should NOT be in a diff-removed span
      const removedSpans = wrapper.findAll('.diff-removed')
      for (const span of removedSpans) {
        expect(span.text()).not.toContain('Clinic')
      }

      // "and changed" should be added
      expect(html).toContain('diff-added')
    })

    it('1d: single curly quotes — no quote diff artifacts', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: 'The \u2018Clinic\u2019 is important.',
          newText: "The 'Clinic' is important and revised.",
        },
      })

      // "Clinic" should NOT be in any diff-removed span
      const removedSpans = wrapper.findAll('.diff-removed')
      for (const span of removedSpans) {
        expect(span.text()).not.toContain('Clinic')
      }

      expect(wrapper.html()).toContain('diff-added')
    })

    it('1e: identical text except quotes — should produce no diff at all', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: '\u201CClinic\u201D means selected.',
          newText: '"Clinic" means selected.',
        },
      })
      expect(wrapper.findAll('.diff-removed').length).toBe(0)
      expect(wrapper.findAll('.diff-added').length).toBe(0)
    })

    it('1f: multiple curly quote pairs across text — no quote artifacts', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: '\u201CClinic\u201D and \u201CDoctor\u201D are defined terms.',
          newText: '"Clinic" and "Doctor" are defined terms.',
        },
      })
      expect(wrapper.findAll('.diff-removed').length).toBe(0)
      expect(wrapper.findAll('.diff-added').length).toBe(0)
    })

    it('1g: curly quotes with similarity threshold — does not cause false full replacement', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: '\u201CClinic\u201D means a fertility clinic selected by the Intended Parent.',
          newText: '"Clinic" means a fertility clinic selected by the Intended Parent.',
          similarityThreshold: 0.8,
        },
      })
      // Texts are essentially identical — should not trigger full replacement
      const removedSpans = wrapper.findAll('.diff-removed')
      const addedSpans = wrapper.findAll('.diff-added')
      expect(removedSpans.length).toBe(0)
      expect(addedSpans.length).toBe(0)
    })
  })

  // ─── Bug 2: HTML tag wrapping mismatch ──────────────────────────────

  describe('Bug 2: HTML tag wrapping mismatch', () => {
    it('2a: old has <strong>, new does not — text shown as unchanged', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: '<strong>"Clinic"</strong> means a fertility clinic selected by the Intended Parent.',
          newText: '"Clinic" means a fertility clinic selected by the Intended Parent and may be changed later.',
          ignoreFormattingTags: true,
        },
      })
      const html = wrapper.html()

      // "Clinic" should NOT be shown as removed
      const removedSpans = wrapper.findAll('.diff-removed')
      for (const span of removedSpans) {
        expect(span.text()).not.toContain('Clinic')
      }

      // Should not have nested diff-removed inside diff-added
      expect(html).not.toMatch(/<span class="diff-added">[^]*?<span class="diff-removed">/)

      // "and may be changed later" should be added
      expect(html).toContain('diff-added')
    })

    it('2b: old does not have <strong>, new has <strong> — text shown as unchanged', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: '"Clinic" means a fertility clinic selected by the Intended Parent.',
          newText: '<strong>"Clinic"</strong> means a fertility clinic selected by the Intended Parent and may be changed later.',
          ignoreFormattingTags: true,
        },
      })
      const html = wrapper.html()

      // "Clinic" should NOT be shown as removed
      const removedSpans = wrapper.findAll('.diff-removed')
      for (const span of removedSpans) {
        expect(span.text()).not.toContain('Clinic')
      }

      // Should not have nested diff-removed inside diff-added
      expect(html).not.toMatch(/<span class="diff-added">[^]*?<span class="diff-removed">/)

      expect(html).toContain('diff-added')
    })

    it('2c: both have <strong> — no spurious diffs (control case)', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: '<strong>"Clinic"</strong> means a fertility clinic selected by the Intended Parent.',
          newText: '<strong>"Clinic"</strong> means a fertility clinic selected by the Intended Parent and may be changed later.',
        },
      })
      // Only "and may be changed later" should be added
      const removedSpans = wrapper.findAll('.diff-removed')
      expect(removedSpans.length).toBe(0)
      expect(wrapper.html()).toContain('diff-added')
    })

    it('2d: old has <em>, new does not — text shown as unchanged', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: '<em>Important</em> clause here.',
          newText: 'Important clause here and more.',
          ignoreFormattingTags: true,
        },
      })
      const removedSpans = wrapper.findAll('.diff-removed')
      for (const span of removedSpans) {
        expect(span.text()).not.toContain('Important')
      }
      expect(wrapper.html()).toContain('diff-added')
    })

    it('2e: old has nested <strong><em>, new has neither — text shown as unchanged', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: '<strong><em>"Clinic"</em></strong> means selected.',
          newText: '"Clinic" means selected and revised.',
          ignoreFormattingTags: true,
        },
      })
      const removedSpans = wrapper.findAll('.diff-removed')
      for (const span of removedSpans) {
        expect(span.text()).not.toContain('Clinic')
      }
      expect(wrapper.html()).toContain('diff-added')
    })

    it('2f: ignoreFormattingTags defaults to false — tag changes cause spurious diff on unchanged text', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: '<strong>"Clinic"</strong> means selected.',
          newText: '"Clinic" means selected.',
        },
      })
      // Without ignoreFormattingTags, the tag difference causes the BUG:
      // "Clinic" text appears inside a diff span even though the text content is identical.
      // This test documents the buggy behavior when the fix is NOT opted into.
      const allDiffSpans = [
        ...wrapper.findAll('.diff-added'),
        ...wrapper.findAll('.diff-removed'),
      ]
      const clinicInDiffSpan = allDiffSpans.some(span => span.text().includes('Clinic'))
      expect(clinicInDiffSpan).toBe(true)
    })

    it('2g: ignoreFormattingTags with identical text — no diffs', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: '<strong>Hello</strong> world',
          newText: 'Hello world',
          ignoreFormattingTags: true,
        },
      })
      expect(wrapper.findAll('.diff-removed').length).toBe(0)
      expect(wrapper.findAll('.diff-added').length).toBe(0)
    })
  })

  // ─── Combined: Bugs 1 + 2 together ─────────────────────────────────

  describe('Combined: Bugs 1 + 2 (curly quotes AND tag mismatch)', () => {
    it('curly quotes in old with <strong>, straight quotes in new without <strong>', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: '<strong>\u201CClinic\u201D</strong> means a fertility clinic selected by the Intended Parent.',
          newText: '"Clinic" means a fertility clinic selected by the Intended Parent and may be changed later.',
          ignoreFormattingTags: true,
        },
      })
      const html = wrapper.html()

      // No spurious diffs from quotes or tags
      const removedSpans = wrapper.findAll('.diff-removed')
      for (const span of removedSpans) {
        expect(span.text()).not.toContain('Clinic')
        expect(span.text()).not.toMatch(/[\u201C\u201D"]/)
      }

      // Only actual text change should be shown
      expect(html).toContain('diff-added')
    })

    it('straight quotes in old without tags, curly quotes in new with <strong>', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: '"Clinic" means a fertility clinic selected by the Intended Parent.',
          newText: '<strong>\u201CClinic\u201D</strong> means a fertility clinic selected by the Intended Parent and may be changed later.',
          ignoreFormattingTags: true,
        },
      })
      const html = wrapper.html()

      const removedSpans = wrapper.findAll('.diff-removed')
      for (const span of removedSpans) {
        expect(span.text()).not.toContain('Clinic')
      }

      expect(html).toContain('diff-added')
    })

    it('identical content with different quotes AND different tags — no diff at all', () => {
      const wrapper = mount(DiffHtml, {
        props: {
          oldText: '<strong>\u201CClinic\u201D</strong> means selected.',
          newText: '"Clinic" means selected.',
          ignoreFormattingTags: true,
        },
      })
      expect(wrapper.findAll('.diff-removed').length).toBe(0)
      expect(wrapper.findAll('.diff-added').length).toBe(0)
    })
  })
})
