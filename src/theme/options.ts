export const sizeList = [
    { value: 1, displayName: 'Very Small' },
    { value: 2, displayName: 'Small' },
    { value: 3, displayName: 'Normal' },
    { value: 4, displayName: 'Big' },
    { value: 5, displayName: 'Very Big' },
    { value: 6, displayName: 'Extra Large' },
];

export const sizeMap = {
    '1': 10,
    '2': 13,
    '3': 16,
    '4': 18,
    '5': 20,
    '6': 24,
};

export const fontFamilyList = [
    { value: 'default', displayName: 'Default (Inter)' },
    { value: 'arial', displayName: 'Arial' },
    { value: 'comic', displayName: 'Comic Sans MS' },
    { value: 'courier', displayName: 'Courier New' },
    { value: 'georgia', displayName: 'Georgia' },
    { value: 'lucida', displayName: 'Lucida Sans Unicode' },
    { value: 'tahoma', displayName: 'Tahoma' },
    { value: 'times', displayName: 'Times New Roman' },
    { value: 'trebuchet', displayName: 'Trebuchet MS' },
    { value: 'verdana', displayName: 'Verdana' },
];

export const fontFamilyMap = {
    default: {
        css: 'Inter, sans-serif',
        bbcode: undefined,
    },
    arial: { css: 'Arial, sans-serif', bbcode: 'Arial' },
    comic: {
        css: "'Comic Sans MS', 'Comic Sans', cursive",
        bbcode: 'Comic Sans MS',
    },
    courier: {
        css: "'Courier New', Courier, monospace",
        bbcode: 'Courier New',
    },
    georgia: {
        css: 'Georgia, serif',
        bbcode: 'Georgia',
    },
    lucida: {
        css: "'Lucida Sans Unicode', sans-serif",
        bbcode: 'Lucida Sans Unicode',
    },
    tahoma: {
        css: 'Tahoma, sans-serif',
        bbcode: 'Tahoma',
    },
    times: {
        css: "'Times New Roman', Times, serif",
        bbcode: 'Times New Roman',
    },
    trebuchet: {
        css: "Trebuchet, 'Trebuchet MS', sans-serif",
        bbcode: 'Trebuchet MS',
    },
    verdana: {
        css: 'Verdana, sans-serif',
        bbcode: 'Verdana',
    },
};
