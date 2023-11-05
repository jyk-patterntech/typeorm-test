// client/src/pages/_app.tsx
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { AppProps } from 'next/app';

// 전체 앱에 대한 다크 테마 생성
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'black'
    }
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;