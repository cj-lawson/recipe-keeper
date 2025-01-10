'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="1.5px"
        color="#10b981"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default Providers;
