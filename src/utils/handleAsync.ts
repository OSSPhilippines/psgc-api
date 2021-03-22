import { Request, Response } from "express";
const handleAsync: (
    asyncFn: (req: Request, res: Response, next: Function) => Promise<void>
) => {} = (asyncFn) => (req: Request, res: Response, next: any) =>
    Promise.resolve(asyncFn(req, res, next)).catch(next);

export default handleAsync;
