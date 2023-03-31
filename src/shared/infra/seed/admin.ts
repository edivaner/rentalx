import { hash } from "bcryptjs";
import { getConnection } from "typeorm";
import createConnection from '../../../database';
import { v4 as uuidV4 } from "uuid";

async function create() {
    const connection = await createConnection("localhost");
    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(`
        INSERT INTO USERS(ID, NAME, EMAIL, PASSWORD, "isAdmin", CREATED_AT, DRIVER_LICENSE) 
        VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
    `);

    await connection.close();
}

create().then(() => console.log("user admin created!"));
