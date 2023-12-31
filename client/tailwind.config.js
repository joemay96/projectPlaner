/** @type {import('tailwindcss').Config} */
module.exports = {
    // content: [],
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: ['light', "dark"], //'pastel', 'coffee'], //bumblebee
        fontFamily: {
            sans: [
                'Comfortaa',
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'Arial',
                'Noto Sans',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji',
            ],
            serif: [
                // 'Poor Story',
                'ui-serif',
                'Georgia',
                'Cambria',
                'Times New Roman',
                'Times, serif',
            ],
            mono: [
                'ui-monospace',
                'SFMono-Regular',
                'Menlo',
                'Monaco',
                'Consolas',
                'Liberation Mono',
                'Courier New',
                'monospace',
            ],
            title: ['Caveat'],
            poor: ['Poor Story'],
        },
    },
    plugins: [require('daisyui')],

    // daisyUI config (optional)
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: '',
        darkTheme: 'dark',
        lightTheme: 'light',
        // lightTheme: 'pastel',
        // darkTheme: 'coffee',
    },
};
