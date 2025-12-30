import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', ...defaultTheme.fontFamily.sans],
                lobster: ['Lobster', 'cursive'],
                eudoxus: ['Eudoxus Sans', ...defaultTheme.fontFamily.sans],
            },

            fontSize: {
                'xxl': '64px',
                'base-lg': '18px',
            },

            fontWeight: {
                normal: 400,
                semibold: 600,
            },

            lineHeight: {
                custom: '28px',
            },

            colors: {
                black60: 'rgba(0,0,0,0.6)',
                black10: 'rgba(0,0,0,0.1)',
                lightBlue: '#E7FAFE',
                transparentBlue: '#E7F9FD00',
                greenA: '#6CC63F1A',
                greenB: '#6CC63F00',
                oliveA: '#7082461A',
                oliveB: '#70824600',
                redA: '#CC261B00',
                redB: '#CC261B1A',
                orangeA: '#F09E0000',
                orangeB: '#F09E001A',
                blackA: '#0000000D',
                blackB: '#00000000',
            },

            width: {
                54: '54px',
                200: '200px',
                620: '620px',
            },

            height: {
                22: '22px',
                60: '60px',
                640: '640px',
            },

            backgroundImage: {
                'gradient-custom':
                    'linear-gradient(180deg, #6CC63F1A 0%, #6CC63F00 20%, #7082461A 40%, #70824600 60%, #CC261B00 70%, #CC261B1A 80%, #F09E0000 90%, #F09E001A 95%, #0000000D 100%)',
            },

            textDecorationThickness: {
                custom: '2px',
            },

            borderRadius: {
                circle: '50%',
            },
        },
    },

    plugins: [
    forms,

    // Plugin utilité personnalisée
    function ({ addUtilities }) {
      addUtilities({
        '.checkbox-rounded': {
          appearance: 'none',
          width: '1.25rem',  // = w-5
          height: '1.25rem', // = h-5
          borderRadius: '9999px', // rounded-full
          borderWidth: '2px',
          borderColor: '#D1D5DB', // gray-300
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
        },
        '.checkbox-rounded:checked': {
          backgroundColor: '#000000',
          borderColor: '#000000',
        },
      })
    }],
}









// import defaultTheme from 'tailwindcss/defaultTheme';
// import forms from '@tailwindcss/forms';

// /** @type {import('tailwindcss').Config} */
// export default {
//     content: [
//         './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
//         './storage/framework/views/*.php',
//         './resources/views/**/*.blade.php',
//         './resources/js/**/*.jsx',
//     ],

//     theme: {
//         extend: {
//             fontFamily: {
//                 sans: ['Figtree', ...defaultTheme.fontFamily.sans],
//             },
//         },
//     },

//     plugins: [forms],
// };
