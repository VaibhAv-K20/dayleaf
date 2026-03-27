/**
 * fonts.js — PaperFlow font definitions.
 *
 * Each font defines:
 *   - name: key identifier
 *   - label: display name
 *   - family: CSS font-family value
 *   - isPremium: whether it requires a paid plan
 *   - preview: sample text to show in the picker
 */

const fonts = {
  playfair: {
    name: 'playfair',
    label: 'Playfair Display',
    emoji: '✏️',
    family: "'Playfair Display', ui-serif, Georgia",
    isPremium: false,
    preview: 'Aa',
  },
  dmSerif: {
    name: 'dmSerif',
    label: 'DM Serif Display',
    emoji: '📖',
    family: "'DM Serif Display', ui-serif, Georgia",
    isPremium: true,
    preview: 'Aa',
  },
  lora: {
    name: 'lora',
    label: 'Lora',
    emoji: '🌿',
    family: "'Lora', ui-serif, Georgia",
    isPremium: true,
    preview: 'Aa',
  },
  crimson: {
    name: 'crimson',
    label: 'Crimson Text',
    emoji: '🍂',
    family: "'Crimson Text', ui-serif, Georgia",
    isPremium: true,
    preview: 'Aa',
  },
  ebGaramond: {
    name: 'ebGaramond',
    label: 'EB Garamond',
    emoji: '🏺',
    family: "'EB Garamond', ui-serif, Georgia",
    isPremium: true,
    preview: 'Aa',
  },
  spectral: {
    name: 'spectral',
    label: 'Spectral',
    emoji: '🔮',
    family: "'Spectral', ui-serif, Georgia",
    isPremium: true,
    preview: 'Aa',
  },
}

export default fonts
