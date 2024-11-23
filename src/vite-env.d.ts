/// <reference types="vite/client" />

declare module "*?base64" {
    const value: string;
    export = value;
};

declare module "*.yml" {
    const value: any;
    export = value;
};
