/**
 * themes.js — All PaperFlow theme definitions.
 * 
 * Each theme defines:
 *   - name, label, emoji for display
 *   - colors: paper, ink, secondary, accent, card
 *   - isPremium: whether it requires unlock
 * 
 * "card" is the background for the floating task containers.
 * On light themes it's slightly lighter; on dark themes it's slightly lighter than paper.
 */

const themes = {
  classic: {
    name: 'classic',
    label: 'Classic Paper',
    emoji: '📝',
    isPremium: false,
    colors: {
      paper: '#FDFCF9',
      ink: '#2A2A2A',
      secondary: '#6B6B6B',
      accent: '#D6D3CD',
      card: 'rgba(255,255,255,0.5)',
    },
  },
  darkForest: {
    name: 'darkForest',
    label: 'Dark Forest',
    emoji: '🌲',
    isPremium: true,
    colors: {
      paper: '#0F1F0F',
      ink: '#C8E6C8',
      secondary: '#7DAF7D',
      accent: '#2E4A2E',
      card: 'rgba(255,255,255,0.05)',
    },
  },
  sunsetBreeze: {
    name: 'sunsetBreeze',
    label: 'Sunset Breeze',
    emoji: '🌅',
    isPremium: true,
    colors: {
      paper: '#FFF5ED',
      ink: '#3D2B1F',
      secondary: '#7A5C4A',
      accent: '#E0B896',
      card: 'rgba(255,255,255,0.45)',
    },
  },
  vintagePaper: {
    name: 'vintagePaper',
    label: 'Vintage Paper',
    emoji: '📜',
    isPremium: true,
    colors: {
      paper: '#F5ECD7',
      ink: '#3E3529',
      secondary: '#6E6350',
      accent: '#C4B48E',
      card: 'rgba(255,255,255,0.35)',
    },
  },
  blueSky: {
    name: 'blueSky',
    label: 'Blue Sky',
    emoji: '🌤️',
    isPremium: true,
    colors: {
      paper: '#EDF4FC',
      ink: '#1B2D45',
      secondary: '#4A6A8A',
      accent: '#A0C4E4',
      card: 'rgba(255,255,255,0.45)',
    },
  },
  pinkRose: {
    name: 'pinkRose',
    label: 'Pink Rose',
    emoji: '🌸',
    isPremium: true,
    colors: {
      paper: '#FFF0F3',
      ink: '#3D1F2B',
      secondary: '#8A5568',
      accent: '#E0A0B8',
      card: 'rgba(255,255,255,0.45)',
    },
  },
  blackNight: {
    name: 'blackNight',
    label: 'Black Night',
    emoji: '🌙',
    isPremium: true,
    colors: {
      paper: '#111111',
      ink: '#E0E0E0',
      secondary: '#999999',
      accent: '#3A3A3A',
      card: 'rgba(255,255,255,0.04)',
    },
  },
  redWine: {
    name: 'redWine',
    label: 'Red Wine',
    emoji: '🍷',
    isPremium: true,
    colors: {
      paper: '#1A0A10',
      ink: '#F0D5DD',
      secondary: '#B88090',
      accent: '#5C2535',
      card: 'rgba(255,255,255,0.05)',
    },
  },
  yellowDay: {
    name: 'yellowDay',
    label: 'Yellow Day',
    emoji: '☀️',
    isPremium: true,
    colors: {
      paper: '#FFFCE8',
      ink: '#3A3520',
      secondary: '#7A7040',
      accent: '#D8C870',
      card: 'rgba(255,255,255,0.4)',
    },
  },
}

export default themes
