/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        atedd: {
          bg: '#0B0B0D',
          surface: '#111114',
          raised: '#17171B',
          'border': 'rgba(255,255,255,0.06)',
          'border-input': '#1F1F24',
          'text-primary': '#F4EFE4',
          'text-muted': '#948D7E',
          'text-dim': '#5F5A51',
          gold: '#C9A227',
          'gold-soft': '#E6C765',
          'gold-deep': '#9A7B1C',
          ember: '#FF5C2C',
          violet: '#B266FF',
          lime: '#CCFF00',
          cyan: '#00FFFF',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Space Grotesk', 'serif'],
        body: ['Hanken Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        '2xl': '16px',
        'pill': '9999px',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'glow-gold': '0 0 60px rgba(201,162,39,0.15)',
        'glow-ember': '0 0 60px rgba(255,92,44,0.15)',
        'glow-violet': '0 0 60px rgba(178,102,255,0.15)',
        'glow-lime': '0 0 60px rgba(204,255,0,0.15)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "walkIn": {
          from: { opacity: "0", transform: "translateX(-80px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "walkInUp": {
          from: { opacity: "0", transform: "translateY(50px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scaleIn": {
          from: { opacity: "0", transform: "scale(0.85)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "fadeIn": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { filter: "drop-shadow(0 0 5px rgba(201,162,39,0.3))" },
          "50%": { filter: "drop-shadow(0 0 15px rgba(201,162,39,0.6))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "walkIn": "walkIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "walkInUp": "walkInUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scaleIn": "scaleIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fadeIn": "fadeIn 1.2s ease-out forwards",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      transitionTimingFunction: {
        'atedd': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}