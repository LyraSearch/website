import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, transformerAttributifyJsx } from 'unocss'

export default defineConfig({
    presets: [
        presetAttributify(),
        presetIcons({
        extraProperties: {
            'display': 'block',
            'vertical-align': 'middle',
          }
      }), presetUno()],
    transformers: [transformerAttributifyJsx()],
    shortcuts: {
        'container-full': 'm-auto w-full',
        'container-xl': 'm-auto w-11/12',
        'container-lg': 'm-auto w-9/12',
        'container-md': 'm-auto w-3/6',
        'container-sm': 'm-auto w-2/6',
        'demo-input': 'rounded-md p-2 text-slate-900 border-2 border-violet-300 w-full outline-0 shadow-none text-1.3rem'
    }
})