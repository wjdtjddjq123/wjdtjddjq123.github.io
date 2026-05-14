/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body:    ['"Outfit"', 'sans-serif'],
        mono:    ['"pretendard"', 'monospace'],
      },

      // ── Semantic color tokens via CSS vars ──────────────
      // withOpacity helper pattern — Tailwind v3 safe
      colors: {
        bg:          'hsl(var(--bg) / <alpha-value>)',
        surface:     'hsl(var(--surface) / <alpha-value>)',
        'surface-2': 'hsl(var(--surface-2) / <alpha-value>)',
        border:      'hsl(var(--border) / <alpha-value>)',
        'border-2':  'hsl(var(--border-2) / <alpha-value>)',
        tx:          'hsl(var(--tx) / <alpha-value>)',
        'tx-2':      'hsl(var(--tx-2) / <alpha-value>)',
        'tx-3':      'hsl(var(--tx-3) / <alpha-value>)',
        accent: {
          DEFAULT: '#5B8EFF',
          2:       '#3D6FE8',
          3:       '#7AABFF',
        },
        // Primitive scales
        primary: {
          50:'#eef3ff',100:'#dce7ff',200:'#bbd0ff',300:'#90adff',
          400:'#6385ff',500:'#5B8EFF',600:'#3555f0',700:'#2c42d8',
          800:'#2838ae',900:'#273489',
        },
        neutral: {
          0:'#ffffff',   50:'#f8f9fc', 100:'#f0f2f8',
          200:'#e2e5f0',300:'#c8ccdc',400:'#8e93a8',
          500:'#666b82',600:'#4a4f63',700:'#333748',
          800:'#1e2030',900:'#10121c',950:'#080910',
        },
        success: { 50:'#edfdf5', 500:'#22c880', 700:'#158655' },
        warning: { 50:'#fffbeb', 500:'#f59e0b', 700:'#b45309' },
        error:   { 50:'#fef2f2', 500:'#ef4444', 700:'#b91c1c' },
        info:    { 50:'#eff6ff', 500:'#3b82f6', 700:'#1d4ed8' },
      },

      spacing: {
        xs:'4px', sm:'8px', md:'16px', lg:'24px', xl:'32px',
        '2xl':'48px','3xl':'64px','4xl':'96px','5xl':'128px',
        1:'4px',2:'8px',3:'12px',4:'16px',5:'20px',6:'24px',
        7:'28px',8:'32px',9:'36px',10:'40px',11:'44px',12:'48px',
        14:'56px',16:'64px',20:'80px',24:'96px',28:'112px',
        32:'128px',36:'144px',40:'160px',44:'176px',48:'192px',
        52:'208px',56:'224px',60:'240px',64:'256px',
        72:'288px',80:'320px',96:'384px',
      },

      borderRadius: {
        sm:'4px', DEFAULT:'8px', md:'8px', lg:'12px',
        xl:'16px','2xl':'24px','3xl':'32px', full:'9999px',
      },

      boxShadow: {
        sm:  '0 1px 3px rgba(0,0,0,.12)',
        md:  '0 4px 8px rgba(0,0,0,.12)',
        lg:  '0 10px 20px rgba(0,0,0,.14)',
        xl:  '0 20px 32px rgba(0,0,0,.14)',
        'glow-sm':'0 0 14px rgba(91,142,255,.30)',
        'glow':   '0 0 28px rgba(91,142,255,.40)',
        'glow-lg':'0 0 56px rgba(91,142,255,.45)',
        none:'none',
      },

      fontSize: {
        '2xs':['0.625rem',  { lineHeight:'1rem' }],
        xs:   ['0.75rem',   { lineHeight:'1.1rem' }],
        sm:   ['0.875rem',  { lineHeight:'1.4rem' }],
        base: ['1rem',      { lineHeight:'1.65rem' }],
        lg:   ['1.125rem',  { lineHeight:'1.75rem' }],
        xl:   ['1.25rem',   { lineHeight:'1.875rem' }],
        '2xl':['1.5rem',    { lineHeight:'2rem' }],
        '3xl':['1.875rem',  { lineHeight:'2.25rem' }],
        '4xl':['2.25rem',   { lineHeight:'2.5rem' }],
        '5xl':['3rem',      { lineHeight:'1' }],
        '6xl':['3.75rem',   { lineHeight:'.95' }],
        '7xl':['4.5rem',    { lineHeight:'.9' }],
        '8xl':['6rem',      { lineHeight:'.88' }],
        '9xl':['8rem',      { lineHeight:'.85' }],
      },

      keyframes: {
        'fade-up':  { from:{ opacity:'0', transform:'translateY(32px)' }, to:{ opacity:'1', transform:'none' } },
        'fade-in':  { from:{ opacity:'0' }, to:{ opacity:'1' } },
        'scale-in': { from:{ opacity:'0', transform:'scale(.95)' }, to:{ opacity:'1', transform:'none' } },
        'float':    { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-12px)' } },
        'spin-slow':{ to:{ transform:'rotate(360deg)' } },
        'marquee':  { from:{ transform:'translateX(0)' }, to:{ transform:'translateX(-50%)' } },
      },
      animation: {
        'fade-up':  'fade-up .6s ease forwards',
        'fade-in':  'fade-in .5s ease forwards',
        'scale-in': 'scale-in .3s ease forwards',
        'float':    'float 4s ease-in-out infinite',
        'spin-slow':'spin-slow 10s linear infinite',
        'marquee':  'marquee 22s linear infinite',
      },
    },
  },
  plugins: [],
}
