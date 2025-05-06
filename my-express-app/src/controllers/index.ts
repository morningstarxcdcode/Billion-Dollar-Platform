import { Request, Response } from 'express';

class IndexController {
    getIndex(req: Request, res: Response): void {
        res.send('Welcome to the Express App!');
    }
}

export default IndexController;
