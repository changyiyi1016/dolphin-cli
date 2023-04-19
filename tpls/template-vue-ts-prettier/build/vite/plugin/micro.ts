import { join } from 'path';
import { writeFileSync } from 'fs';

export function configMicroAppPlugin(): any {
    let basePath = '';
    return {
        name: 'vite:micro-app',
        apply: 'build',
        configResolved(config) {
            basePath = `${config.base}${config.build.assetsDir}/`;
        },
        // writeBundle 钩子可以拿到完整处理后的文件，但已经无法修改
        writeBundle(options, bundle) {
            for (const chunkName in bundle) {
                if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
                    const chunk = bundle[chunkName];
                    if (chunk.fileName && chunk.fileName.endsWith('.js')) {
                        chunk.code = chunk.code.replace(
                            /(from|import\()(\s*['"])(\.\.?\/)/g,
                            (all, _$1, _$2, $3) => {
                                return all.replace($3, new URL($3, basePath));
                            },
                        );
                        const fullPath = join(options.dir, chunk.fileName);
                        writeFileSync(fullPath, chunk.code);
                    }
                }
            }
        },
    };
}
