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
})
