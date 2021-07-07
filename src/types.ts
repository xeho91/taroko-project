export interface ContactSchema {
    id: number;
    first_name: string;
    last_name: string;
    job: string;
    description: string;
}

export interface IconifyIcon {
    body: string;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    rotate?: number;
    hFlip?: boolean;
    vFlip?: boolean;
}
