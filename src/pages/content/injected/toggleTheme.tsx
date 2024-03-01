import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { ReviewBlock } from '../ui/components/ReviewBlock';
import { createRoot } from 'react-dom/client';
refreshOnUpdate('pages/content/injected/toggleTheme');

async function injectPlugin() {
  createRoot(document.querySelector('#averageCustomerReviews')).render(<ReviewBlock />);
}

void injectPlugin();
