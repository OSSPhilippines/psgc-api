import { Request, Response, NextFunction } from "express";

/* Explanation 
	handleAsync is a function that returns another function.
	handleAsync's parameter is an async function that returns a void
	This async function then takes 3 properties, req, res, and next
	This is what you see in the files, and it's type definition is on line 20
	
	In the next line, after in between => and =, is the same type definition
	This time, it's for app.use inside the index.ts file. It basically tells
	express that handleAsync is a middleware and is going to return nothing.

	TL:DR: We took an (async function that takes req, res, next and returns nothing)
	then used it as a parameter for a function that returns {a function
	that takes in req, res, next and returns nothing}
*/

type Handler<R> = (req: Request, res: Response, next: NextFunction) => R;
const handleAsync: (asyncFn: Handler<Promise<void>>) => Handler<void> = (
    asyncFn
) => {
    return (req, res, next) => {
        Promise.resolve(asyncFn(req, res, next)).catch(next);
    };
};

export default handleAsync;
