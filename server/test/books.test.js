import request from "supertest";
import { app, server } from "../app";
import connectionDB from "../database/connectionDB.js";
import bookModel from "../models/bookModel.js";

describe("crudBooks", () => {
  test("should return a response with status 200 and type json", async () => {
    const response = await request(app).get("/books");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
  });

  test("should return a response with status 201 and type json", async () => {
    const response = await request(app).post("/books").send({
      title: "test",
      author: "test",
      description: "test test test",
    });
    expect(response.statusCode).toBe(201);
    expect(response.headers["content-type"]).toContain("application/json");
  });
  afterEach(async () => {
    // Elimina el libro con title "test" después de cada test
    await bookModel.destroy({ where: { title: "test" } });
  });

  test("should delete a book", async () => {
    const book_to_delete = await bookModel.create({
      title: "test",
      author: "test",
      description: "test test test",
    });

    const response = await request(app).delete(`/books/${book_to_delete.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
  });

  test("should update a book", async () => {
    const book_to_update = await bookModel.create({
      title: "test",
      author: "test",
      description: "test test test",
    });

    const response = await request(app)
      .put(`/books/${book_to_update.id}`)
      .send({
        title: "test updated",
        author: "updated author",
        description: "updated description",
      });
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.body.message).toBe("Libro actualizado exitosamente");
  });
  afterEach(async () => {
    // Elimina el libro con title "test" después de cada test
    await bookModel.destroy({ where: { title: "test updated" } });
  });

  afterAll(async () => {
    await connectionDB.close();
    server.close();
  });
});
