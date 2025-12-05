
export default {
    root: './',
    build: {
        lib: {
            entry: 'src/js/catmarkdowneditor.js',
            name: 'CatMarkDownEditor',
            formats: ['umd'], // Apenas UMD para simplificar e garantir compatibilidade global
            fileName: () => 'catmarkdowneditor.min.js',
        },
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') {
                        return 'catmarkdowneditor.min.css';
                    }
                    return assetInfo.name;
                },
            },
        },
        // Removido minify: 'terser' para usar o padrão do Vite (esbuild)
        outDir: 'dist',
        emptyOutDir: true,
    },
};
