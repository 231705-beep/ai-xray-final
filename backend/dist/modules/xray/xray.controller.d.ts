import { XrayService } from './xray.service';
export declare class XrayController {
    private readonly xrayService;
    constructor(xrayService: XrayService);
    uploadFile(file: Express.Multer.File, req: any): Promise<import("./entities/xray.entity").XRay>;
    getMyXrays(req: any): Promise<import("./entities/xray.entity").XRay[]>;
    getXray(id: string): Promise<import("./entities/xray.entity").XRay>;
}
