import db from './db';
import { refreshSchema } from './models/refresh-model';
import { todosSchema } from './models/todos-model';
import { usersSchema } from './models/users-model';

(async () => {
  console.log('reseting...');
  await db.delete(usersSchema);
  await db.delete(todosSchema);
  await db.delete(refreshSchema);
  console.log('reset complete');
})();
