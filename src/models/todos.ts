type Todo = { title: string; body: string; user_id: number };

/*
 * Cool, now how to handle associations?
 * 1) Niavely, just get what you want and don't worry
 * 2) ????
 * 3) Convince ourselves an ORM will help; regret everything; go back to (1)
 *
 * Probably best to cram all the models in a single file. We don't have many ande
 * it'll be easier for everyone to grok what's going on.
 */
