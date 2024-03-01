import { useEffect } from 'react';
import '../pages/content/ui/injected.css';
export function ReviewBlock() {
  useEffect(() => {
    console.log('***', window.location.href);
  }, []);

  return <div className="text-3xl">Hello</div>;
}
