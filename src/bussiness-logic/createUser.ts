import { User } from "./types/user";
import { get, save } from "../repository/fileMethods";

export async function createUser(userData: User): Promise<User[]> {
  try {
    const currentUsers = (await get("users")) as User[];

    currentUsers.push(userData);
    // validar que no haya duplicado
    await save("users", currentUsers);
    return currentUsers;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
