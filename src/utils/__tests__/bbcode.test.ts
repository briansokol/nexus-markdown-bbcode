import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { cleanBBCode, cleanString, useCleanChildren } from '../bbcode';

describe('BBCode utilities', () => {
    describe('cleanString', () => {
        /**
         * Test that cleanString handles basic whitespace normalization
         */
        it('should normalize multiple spaces into single spaces', () => {
            const result = cleanString('  hello   world  ', false);
            expect(result).toBe(' hello world ');
        });

        /**
         * Test that cleanString replaces line breaks with spaces
         */
        it('should replace line breaks with spaces', () => {
            const result = cleanString('hello\nworld\r\ntest', false);
            expect(result).toBe('hello world test');
        });

        /**
         * Test that cleanString handles mixed line breaks and spaces
         */
        it('should handle mixed line breaks and multiple spaces', () => {
            const result = cleanString('  hello  \n  world  \r\n  test  ', false);
            expect(result).toBe(' hello world test ');
        });

        /**
         * Test that cleanString applies uppercase conversion when requested
         */
        it('should convert to uppercase when requested', () => {
            const result = cleanString('hello world', true);
            expect(result).toBe('HELLO WORLD');
        });

        /**
         * Test that cleanString preserves leading and trailing spaces
         */
        it('should preserve leading and trailing spaces', () => {
            const result = cleanString(' hello world ', false);
            expect(result).toBe(' hello world ');
        });

        /**
         * Test that cleanString handles empty strings
         */
        it('should handle empty strings', () => {
            expect(cleanString('', false)).toBe('');
            expect(cleanString('', true)).toBe('');
        });

        /**
         * Test that cleanString handles strings with only whitespace
         */
        it('should normalize strings with only whitespace', () => {
            expect(cleanString('   \n \r\n   ', false)).toBe(' ');
            expect(cleanString('   \n \r\n   ', true)).toBe(' ');
        });
    });

    describe('cleanBBCode', () => {
        /**
         * Test that cleanBBCode handles simple strings
         */
        it('should clean simple strings by normalizing whitespace', () => {
            const result = cleanBBCode('  hello   world  ', false);
            expect(result).toBe(' hello world ');
        });

        /**
         * Test that cleanBBCode handles line breaks
         */
        it('should replace line breaks with spaces', () => {
            const result = cleanBBCode('hello\nworld\r\ntest', false);
            expect(result).toBe('hello world test');
        });

        /**
         * Test that cleanBBCode handles uppercase conversion
         */
        it('should convert to uppercase when requested', () => {
            const result = cleanBBCode('hello world', true);
            expect(result).toBe('HELLO WORLD');
        });

        /**
         * Test that cleanBBCode handles null and undefined
         */
        it('should handle null and undefined', () => {
            expect(cleanBBCode(null, false)).toBe(null);
            expect(cleanBBCode(undefined, false)).toBe(undefined);
        });

        /**
         * Test that cleanBBCode handles arrays
         */
        it('should clean arrays of strings', () => {
            const result = cleanBBCode(['hello  ', '  world\n'], false);
            expect(result).toEqual(['hello ', ' world ']);
        });

        /**
         * Test that cleanBBCode handles numbers and booleans
         */
        it('should return numbers and booleans as-is', () => {
            expect(cleanBBCode(42, false)).toBe(42);
            expect(cleanBBCode(true, false)).toBe(true);
            expect(cleanBBCode(false, false)).toBe(false);
        });
    });

    describe('useCleanChildren', () => {
        /**
         * Test that useCleanChildren hook works with simple text
         */
        it('should clean simple text children', () => {
            const { result } = renderHook(() => useCleanChildren('  hello   world  '));
            expect(result.current).toBe(' hello world ');
        });

        /**
         * Test that useCleanChildren hook works with uppercase option
         */
        it('should handle uppercase option', () => {
            const { result } = renderHook(() => useCleanChildren('hello world', true));
            expect(result.current).toBe('HELLO WORLD');
        });

        /**
         * Test that useCleanChildren hook memoizes results
         */
        it('should memoize results', () => {
            const { result, rerender } = renderHook(
                ({ children, uppercase }) => useCleanChildren(children, uppercase),
                { initialProps: { children: 'hello world', uppercase: false } },
            );

            const firstResult = result.current;

            // Rerender with same props
            rerender({ children: 'hello world', uppercase: false });
            expect(result.current).toBe(firstResult); // Should be same reference

            // Rerender with different props
            rerender({ children: 'hello world', uppercase: true });
            expect(result.current).not.toBe(firstResult); // Should be different reference
            expect(result.current).toBe('HELLO WORLD');
        });

        /**
         * Test that useCleanChildren hook handles null children
         */
        it('should handle null children', () => {
            const { result } = renderHook(() => useCleanChildren(null));
            expect(result.current).toBe(null);
        });

        /**
         * Test that useCleanChildren hook handles complex children
         */
        it('should handle complex children structures', () => {
            const complexChildren = ['Text  ', ' with\n', 'multiple   parts'];
            const { result } = renderHook(() => useCleanChildren(complexChildren));
            expect(result.current).toEqual(['Text ', ' with ', 'multiple parts']);
        });
    });
});
