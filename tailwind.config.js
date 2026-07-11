/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 覆盖所有React文件，确保样式生效
  ],
  theme: {
    extend: {
      colors: {
        // 律所专属主题色：深蓝色（专业、权威感）
        primary: '#165DFF',
        secondary: '#0F3A8A',
        accent: '#4080FF'
      },
      fontFamily: {
        // B端系统专业无衬线字体
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}