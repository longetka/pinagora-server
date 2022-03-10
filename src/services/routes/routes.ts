import express, {Request, Response} from 'express';

class Routers {
    static add(req: Request, res: Response): void {
        let query = req.query;

        console.log(query)
    }
}

export default Routers;
