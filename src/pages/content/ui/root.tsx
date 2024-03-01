import { createRoot } from 'react-dom/client';
import App from '@pages/content/ui/app';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import injectedStyle from './injected.css?inline';
import { ReviewBlock } from '@root/src/components/ReviewBlock';

refreshOnUpdate('pages/content');

const root = document.createElement('div');
root.id = 'chrome-extension-boilerplate-react-vite-content-view-root';

document.body.append(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);

/** Inject styles into shadow dom */
const styleElement = document.createElement('style');
styleElement.innerHTML = injectedStyle;
shadowRoot.appendChild(styleElement);

/**
 * https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/pull/174
 *
 * In the firefox environment, the adoptedStyleSheets bug may prevent contentStyle from being applied properly.
 * Please refer to the PR link above and go back to the contentStyle.css implementation, or raise a PR if you have a better way to improve it.
 */

createRoot(rootIntoShadow).render(<App />);

async function go() {
  const element = await waitForElement('#averageCustomerReviews');
  console.log('*** element', element);
  createRoot(rootIntoShadow.querySelector('#averageCustomerReviews')).render(<ReviewBlock />);
}

go();
const waitForElement = async (selector, timeout = 30000) => {
  const startTime = Date.now();

  const poll = resolve => {
    const element = rootIntoShadow.querySelector(selector);
    const elapsedTime = Date.now() - startTime;

    if (element) {
      resolve(element);
    } else if (elapsedTime < timeout) {
      setTimeout(() => poll(resolve), 100); // Check every 100ms
    } else {
      resolve(null); // Timeout reached without finding the element
    }
  };

  return new Promise(poll);
};
