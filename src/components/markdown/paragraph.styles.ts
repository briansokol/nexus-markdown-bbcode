import { sizeMap } from '@/theme-manager/options';
import type { SizeOption } from '@/theme-manager/types';
import { css } from '@emotion/react';

export const paragraph = (size: SizeOption, isCaption: boolean) => css`
    font-size: ${sizeMap[size]}px;
    line-height: ${sizeMap[size] * 1.3}px;
    font-weight: 300;
    margin: ${isCaption ? '0' : '0 0 1rem'};
`;
