import { hash } from "bcryptjs";
import request from "supertest";
import { app } from "../../../../app";
import { createConnection } from "typeorm";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { AppError } from "../../../../shared/errors/AppError";

let connection: Connection;

describe("Create category controller", async () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash('admin', 8);
        await connection.query(`
            INSERT INTO USERS(ID, NAME, EMAIL, PASSWORD, "isAdmin", CREATED_AT, DRIVER_LICENSE) 
            VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
        `);

    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able a new category", async () => {
        const responseToken = await request(app).post('/session').send({
            email: "admin@rentx.com.br",
            password: "admin"
        })
        const { token } = responseToken.body

        const response = await request(app).post("/categories").send({
            name: "Category SuperTest",
            description: "Category Supertest",
        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(201)
    })

    it("Should not be able to create a new category with name exists", async () => {
        expect(async () => {
            const responseToken = await request(app).post('/session').send({
                email: "admin@rentx.com.br",
                password: "admin"
            });

            const { token } = responseToken.body

            const response1 = await request(app).post("/categories").send({
                name: "Category SuperTest",
                description: "Category Supertest",
            }).set({
                Authorization: `Bearer ${token}`
            });

            const response2 = await request(app).post("/categories").send({
                name: "Category SuperTest",
                description: "Category Supertest",
            }).set({
                Authorization: `Bearer ${token}`
            });

        }).rejects.toBeInstanceOf(AppError);
    })
});