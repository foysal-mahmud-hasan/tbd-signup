import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

const Noir = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#e0f4ff',     // Lightest shade of #009EF7
            100: '#b3e1ff',
            200: '#80cbff',
            300: '#4db5ff',
            400: '#1a9fff',
            500: '#009EF7',     // Base color #009EF7
            600: '#0089db',
            700: '#006bb5',
            800: '#004c88',
            900: '#002d5b',
            950: '#001b37'      // Darkest shade
        },
        colorScheme: {
            light: {
                primary: {
                    color: '#009EF7',
                    contrastColor: '#ffffff',
                    hoverColor: '#0089db',
                    activeColor: '#006bb5'
                },
                highlight: {
                    background: '#009EF7',
                    focusBackground: '#006bb5',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                },
            },
            dark: {
                primary: {
                    color: '#e0f4ff',
                    contrastColor: '#001b37',
                    hoverColor: '#b3e1ff',
                    activeColor: '#80cbff'
                },
                highlight: {
                    background: '#e0f4ff',
                    focusBackground: '#80cbff',
                    color: '#001b37',
                    focusColor: '#001b37'
                }
            }
        }
    }
});

export default Noir;
