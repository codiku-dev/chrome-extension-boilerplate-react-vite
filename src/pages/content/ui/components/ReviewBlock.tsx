import { useEffect } from 'react';

export function ReviewBlock() {
  useEffect(() => {
    console.log('***', window.location.href);
  }, []);

  return <div className="">Hello</div>;
}
