import path from "path";

export function isDevFn(mode: string): boolean {
    return mode === "development" || mode === "dev";
}

export function isProdFn(mode: string): boolean {
    return mode === "prod" || mode === "PROD" || mode === "production";
}

export function isTestFn(mode: string): boolean {
    return mode === "test";
}

export function isReportMode(): boolean {
    return process.env.VITE_REPORT === "true";
}

export function wrapperEnv(envConfig: Record<string, any>) {
    const ret: any = {};

    for (const envName of Object.keys(envConfig)) {
        let realName = envConfig[envName].replace(/\\n/g, "\n");
        realName = realName === "true" ? true : (realName === "false" ? false : realName);

        if (envName === "VITE_PORT") realName = Number(realName);

        if (envName === "VITE_PROXY") {
            try {
                realName = JSON.parse(realName);
            } catch (err) {}
        }

        ret[envName] = realName
    }

    return ret;
}


export function getRootPath(...dir: string[]) {
    return path.resolve(process.cwd(), ...dir);
}