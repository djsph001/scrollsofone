import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './Routes';
import './index.css';

export const createRoot = ViteReactSSG(
  { routes },
);
