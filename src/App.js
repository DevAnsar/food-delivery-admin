// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import AuthProvider from './providers/AuthProvider';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <AuthProvider>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <Router />
      </AuthProvider>
    </ThemeConfig>
  );
}
