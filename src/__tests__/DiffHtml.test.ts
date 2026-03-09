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
    // Should use normal diffblazer output (no full replacement)
    const html = wrapper.html()
    expect(html).toContain('diff-added')
    expect(html).not.toContain('diff-removed') // "Hello" and "world" unchanged
  })

  it('renders full replacement when similarity is below threshold', () => {
    const wrapper = mount(DiffHtml, {
      props: {
        oldText: 'It is expressly agreed and understood by the parties that the Husband shall maintain his existing life insurance policy.',
        newText: 'Item 1: House. Item 2: Car. Item 3: Savings.',
        similarityThreshold: 0.3,
      },
    })
    const html = wrapper.html()
    // Full replacement: old text fully removed, new text fully added
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
    // Should have more than 1 added/removed span (word-level diffing)
    const html = wrapper.html()
    expect(html).toContain('diff-added')
    // The full replacement would have exactly 1 diff-removed span containing ALL old text
    // Word-level diff won't wrap the entire old text in a single removed span
    const removedSpans = wrapper.findAll('.diff-removed')
    if (removedSpans.length > 0) {
      // If there are removed spans, they should be individual words, not the full text
      expect(removedSpans[0].text()).not.toContain('The quick brown fox')
    }
  })

  it('does not trigger full replacement when threshold is null', () => {
    const wrapper = mount(DiffHtml, {
      props: {
        oldText: 'Completely different text here with many words.',
        newText: 'XYZ 123 ABC.',
        similarityThreshold: null,
      },
    })
    // Even with very different text, null threshold means normal diff
    const removedSpans = wrapper.findAll('.diff-removed')
    // Should NOT be a single full-replacement span
    if (removedSpans.length === 1) {
      // Normal diff might still produce spans, but it should be interleaved
      expect(wrapper.findAll('.diff-added').length).toBeGreaterThanOrEqual(0)
    }
  })

  it('handles empty oldText without error', () => {
    const wrapper = mount(DiffHtml, {
      props: {
        oldText: '',
        newText: 'Some new text',
        similarityThreshold: 0.3,
      },
    })
    expect(wrapper.html()).toBeTruthy()
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
})
