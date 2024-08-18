/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "sign-in-bg": "url('/src/assets/signInBg.jpg')",
        "update-profile-bg": "url('/src/assets/updateProfile.jpg')",
      },
      colors: {
        myGray: "#949398ff",
        myYellow: "#f4df4eff",
      },
    },
  },
  plugins: [],
};
