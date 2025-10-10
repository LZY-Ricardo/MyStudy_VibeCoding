import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            collections: {
                heroicons: () => import('@iconify-json/heroicons/icons.json', { with: { type: 'json' } }).then(i => i.default),
                lucide: () => import('@iconify-json/lucide/icons.json', { with: { type: 'json' } }).then(i => i.default)
            }
        })
    ],
    theme: {
        colors: {
            primary: {
                50: '#eff6ff',
                100: '#dbeafe',
                200: '#bfdbfe',
                300: '#93c5fd',
                400: '#60a5fa',
                500: '#3b82f6',
                600: '#2563eb',
                700: '#1d4ed8',
                800: '#1e40af',
                900: '#1e3a8a'
            },
            positive: {
                50: '#fef2f2',
                100: '#fee2e2',
                200: '#fecaca',
                300: '#fca5a5',
                400: '#f87171',
                500: '#ef4444',
                600: '#dc2626',
                700: '#b91c1c',
                800: '#991b1b',
                900: '#7f1d1d'
            },
            negative: {
                50: '#f0fdf4',
                100: '#dcfce7',
                200: '#bbf7d0',
                300: '#86efac',
                400: '#4ade80',
                500: '#22c55e',
                600: '#16a34a',
                700: '#15803d',
                800: '#166534',
                900: '#14532d'
            },
            neutral: {
                50: '#f9fafb',
                100: '#f3f4f6',
                200: '#e5e7eb',
                300: '#d1d5db',
                400: '#9ca3af',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#1f2937',
                900: '#111827'
            }
        }
    },
    shortcuts: {
        'btn-primary': 'px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors duration-200 font-medium',
        'btn-secondary': 'px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-md transition-colors duration-200 font-medium',
        'card': 'bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700',
        'input-field': 'w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400',
        'text-sentiment-positive': 'text-positive-500 bg-positive-50 dark:bg-positive-900/20',
        'text-sentiment-negative': 'text-negative-500 bg-negative-50 dark:bg-negative-900/20',
        'text-sentiment-neutral': 'text-neutral-500 bg-neutral-50 dark:bg-neutral-900/20'
    },
    safelist: [
        'text-sentiment-positive',
        'text-sentiment-negative',
        'text-sentiment-neutral'
    ]
})