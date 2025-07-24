
'use client';

import React from 'react';
import type { Section, Element, ElementType } from '@/types';
import { cn } from '@/lib/utils';
import { PageRenderer as LegacyPageRenderer } from '@/components/PageRenderer';

/**
 * Represents the entire state of a landing page in the builder.
 * It's simply an array of sections.
 */
export interface BuilderState {
  page: Section[];
}

export const PreviewContent = ({ pageData }: { pageData: { name: string, content: BuilderState } }) => {
    // This is the component that will render the actual page content.
    // It's designed to be simple and rely on the PageRenderer.
    if (!pageData?.content?.page) {
        return <div>Contenido no válido.</div>;
    }
    return <LegacyPageRenderer sections={pageData.content.page} />;
};
