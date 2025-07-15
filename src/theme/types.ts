export type fontFamily =
    | 'default'
    | 'arial'
    | 'comic'
    | 'courier'
    | 'georgia'
    | 'lucida'
    | 'tahoma'
    | 'times'
    | 'trebuchet'
    | 'verdana';

export type SizeOption = '1' | '2' | '3' | '4' | '5' | '6';

export type HeaderLevel = '1' | '2';

export interface HeaderLevelConfig {
    size: SizeOption;
    color?: string;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    uppercase: boolean;
    fontFamily: fontFamily;
}

export interface HeaderConfig {
    level1: HeaderLevelConfig;
    level2: HeaderLevelConfig;
}

export interface ColorConfig {
    red: string;
    green: string;
    blue: string;
    yellow: string;
    purple: string;
    orange: string;
    pink: string;
}

export interface TextConfig {
    size: SizeOption;
}

export interface ThemeConfig {
    header: HeaderConfig;
    colors: ColorConfig;
    paragraph: TextConfig;
    caption: TextConfig;
}

// set ordered and unordered lists styles based on paragraph
