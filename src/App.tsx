import type { ComponentType } from 'react';
import PageV1 from './versions/v1/Page';
import PageV2 from './versions/v2/Page';
import PageV3 from './versions/v3/Page';
import PageV4 from './versions/v4/Page';
import { VersionProvider, useVersion } from './versions/VersionContext';

const PAGES: Record<string, ComponentType> = {
  v1: PageV1,
  v2: PageV2,
  v3: PageV3,
  v4: PageV4,
};

function ActiveVersion() {
  const { version } = useVersion();
  const Page = PAGES[version] ?? PageV1;
  // key = remount při přepnutí verze, ať se nemíchá stav mezi verzemi
  return <Page key={version} />;
}

export default function App() {
  return (
    <VersionProvider>
      <ActiveVersion />
    </VersionProvider>
  );
}
