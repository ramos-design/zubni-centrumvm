import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

/* ── Verze webu ─────────────────────────────────────────────
   Každá verze je samostatná kopie celé stránky ve složce
   src/versions/<id>/, takže se dají vyvíjet nezávisle na sobě.
   Novou verzi přidáš tak, že složku zkopíruješ a doplníš záznam
   do VERSIONS níž. */

export type VersionId = string;

export interface VersionMeta {
  id: VersionId;
  label: string;
  description: string;
}

export const VERSIONS: VersionMeta[] = [
  { id: 'v1', label: 'Verze 1', description: 'Zaoblený design' },
  { id: 'v2', label: 'Verze 2', description: 'Ostré hrany' },
  { id: 'v3', label: 'Verze 3', description: 'Hero: 2 boxy + měnící se fotky' },
];

export const DEFAULT_VERSION: VersionId = VERSIONS[0].id;

const STORAGE_KEY = 'zc-vm-version';

function isKnown(id: string | null): id is VersionId {
  return !!id && VERSIONS.some((v) => v.id === id);
}

function readInitialVersion(): VersionId {
  if (typeof window === 'undefined') return DEFAULT_VERSION;
  const fromUrl = new URLSearchParams(window.location.search).get('v');
  if (isKnown(fromUrl)) return fromUrl;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isKnown(stored)) return stored;
  } catch {
    /* localStorage může být zakázané — spadneme na výchozí verzi */
  }
  return DEFAULT_VERSION;
}

interface VersionContextValue {
  version: VersionId;
  setVersion: (id: VersionId) => void;
  versions: VersionMeta[];
}

const VersionContext = createContext<VersionContextValue>({
  version: DEFAULT_VERSION,
  setVersion: () => {},
  versions: VERSIONS,
});

export function VersionProvider({ children }: { children: ReactNode }) {
  const [version, setVersionState] = useState<VersionId>(readInitialVersion);

  // Verze žije v URL (?v=...) i v localStorage, aby přežila reload i sdílení odkazu.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, version);
    } catch {
      /* ignore */
    }
    const url = new URL(window.location.href);
    if (url.searchParams.get('v') !== version) {
      url.searchParams.set('v', version);
      window.history.replaceState({}, '', url);
    }
  }, [version]);

  const setVersion = useCallback((id: VersionId) => {
    if (isKnown(id)) setVersionState(id);
  }, []);

  const value = useMemo(
    () => ({ version, setVersion, versions: VERSIONS }),
    [version, setVersion]
  );

  return <VersionContext.Provider value={value}>{children}</VersionContext.Provider>;
}

export function useVersion() {
  return useContext(VersionContext);
}
