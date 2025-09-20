import '../styles/globals.css';
function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
module.exports = {
    content: [
        "./src/pages/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins:[],
}
export default MyApp;
