import { fontFamilyMap, sizeMap } from '@/theme-manager/options';
import type { HeaderLevelConfig } from '@/theme-manager/types';
import { css } from '@emotion/react';

export const header = (headerLevel: HeaderLevelConfig) => css`
    font-size: ${sizeMap[headerLevel.size]}px;
    line-height: ${sizeMap[headerLevel.size] * 1.3}px;
    font-weight: ${headerLevel.bold ? '700' : '300'};
    letter-spacing: 0.3px;
    margin: 0 0 1rem;
    text-transform: ${headerLevel.uppercase ? 'uppercase' : 'none'};
    color: ${headerLevel.color ?? 'inherit'};
    font-style: ${headerLevel.italic ? 'italic' : 'normal'};
    ${headerLevel.fontFamily !== 'default'
        ? `font-family: ${fontFamilyMap[headerLevel.fontFamily].css};`
        : ''}
`;
