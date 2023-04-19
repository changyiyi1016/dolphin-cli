import { generateAntColors, primaryColor } from '../config/themeConfig';
import { getThemeVariables } from 'ant-design-vue/dist/theme';
import { resolve } from 'path';

/**
 * less global variable
 */
export function generateModifyVars(dark = false) {
    const palettes = generateAntColors(primaryColor);
    // const primary = palettes[5];
    const primary = '#3180F6';

    const primaryColorObj: Record<string, string> = {};

    for (let index = 0; index < 10; index++) {
        primaryColorObj[`primary-${index + 1}`] = palettes[index];
    }

    const modifyVars = getThemeVariables({ dark });
    return {
        ...modifyVars,
        // Used for global import to avoid the need to import each style file separately
        // reference:  Avoid repeated references
        hack: `${modifyVars.hack} @import (reference) "${resolve('src/design/config.less')}";`,
        'primary-color': primary,
        'title-text-color': '#000',
        'text-color': '#4A4B5B',
        '@table-header-bg': '#F5F7FA',
        '@table-header-color': '#19181F',
        '@select-selection-item-bg': '#F5F8FA',
        '@select-selection-item-border-color': '#E4EAEE',
        '@tabs-card-head-background': '#F5F8FA',
        '@border-color-split': '#E4EAEE',
        ...primaryColorObj,
        'info-color': primary,
        'processing-color': primary,
        'success-color': '#55D187', //  Success color
        'error-color': '#FD7670', //  False color
        'warning-color': '#EFBD47', //   Warning color
        //'border-color-base': '#EEEEEE',
        'font-size-base': '14px', //  Main font size
        'border-radius-base': '2px', //  Component/float fillet
        'link-color': primary, //   Link color
        'app-content-background': '#fafafa', //   Link color
    };
}
