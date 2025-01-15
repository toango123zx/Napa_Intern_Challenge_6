import {
  autoBind,
  HttpResponseBodySuccessDtoSchema,
  PaginationDto,
} from "@/common";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { Request, Response, Router } from "express";
import { BookController } from "./book.controller";
import {
  BodyCreateBookRequestDtoSchema,
  CreateBookRequestDto,
  DeleteBookRequestDtoSchema,
  FindBookRequestDtoSchema,
  FindBooksRequestDtoSchema,
  UpdateBookRequestDto,
  UpdateBookRequestDtoSchema,
} from "./schemas";
import { validationMiddleware } from "@/middlewares/validation.middleware";
import { validateBookExistsMiddleware } from "@/middlewares/validateExists.middleware";

export const bookRegistry = new OpenAPIRegistry();

// boardRegistry.register("Board", BoardSchema);
const bookController = new BookController();

const router = express.Router({ mergeParams: true });
autoBind(bookController);

const registerPaths = () => {
  bookRegistry.registerPath({
    method: "get",
    path: "/book",
    tags: ["Book"],
    request: { query: FindBooksRequestDtoSchema.shape.query },
    // request: { body: PostList, params: PostListsSchema.shape.params },
    // responses: createApiResponse(
    //   HttpResponseBodySuccessDtoSchema(null),
    //   "Success"
    // ),
    responses: {},
  });

  bookRegistry.registerPath({
    method: "get",
    path: "/book/{id}",
    tags: ["Book"],
    request: { params: FindBookRequestDtoSchema.shape.param },
    responses: {},
  });

  bookRegistry.registerPath({
    method: "post",
    path: "/book",
    tags: ["Book"],
    request: { body: BodyCreateBookRequestDtoSchema },
    responses: {},
  });

  bookRegistry.registerPath({
    method: "put",
    path: "/book/{id}",
    tags: ["Book"],
    request: {
      params: UpdateBookRequestDtoSchema.shape.param,
      body: BodyCreateBookRequestDtoSchema,
    },
    responses: {},
  });

  bookRegistry.registerPath({
    method: "delete",
    tags: ["Book"],
    path: "/book/{id}",
    request: { params: DeleteBookRequestDtoSchema.shape.param },
    responses: {},
  });
};

router.get("/", bookController.findAll);
router.get("/:id", bookController.findBookById);
router.post(
  "/",
  validationMiddleware(CreateBookRequestDto, "body"),
  bookController.createBook
);
router.put(
  "/:id",
  validateBookExistsMiddleware(),
  validationMiddleware(UpdateBookRequestDto, "body"),
  bookController.updateBook
);

router.delete(
  "/:id",
  validateBookExistsMiddleware(),
  bookController.deleteBook
);

registerPaths();

export const bookRouter: Router = router;
