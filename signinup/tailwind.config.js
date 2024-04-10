/** @type {import('tailwindcss').Config} */
export default  {
  content: ['./index.html', 
  './src/components/Homepage/Homepage.jsx', 
  './src/components/components1/*.{js,jsx,ts,tsx}',
  './src/components/constants/*.{js,jsx,ts,tsx}'
], // Include only Homepage.jsx for Tailwind CSS processing
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: true, // Enable preflight to include base styles
  },
}

