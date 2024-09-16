'use client';

import {
  QueryClient,
  QueryClientProvider as QueryProvider
} from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

export function QueryClientProvider({ children }: PropsWithChildren) {
  return <QueryProvider client={queryClient}>{children}</QueryProvider>;
}
