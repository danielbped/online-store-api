import { object, string, array, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           default: "Lisan"
 *         lastName:
 *           type: string
 *           default: "Al-gaib"
 *         email:
 *           type: string
 *           default: "lisan-algaib@arrakis.com"
 *         password:
 *           type: string
 *           default: "chani123"
 *     CreateUserInput:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

const payload = {
  body: object({
    firstName: string({
      required_error: "FirstName is required",
    }),
    lastName: string({
      required_error: "LastName is required",
    }),
    password: string({
      required_error: "Password is required",
    }),
    email: array(string({
      required_error: "E-mail is required",
    })).min(1),
  }),
};


export const createUserSchema = object({
  ...payload,
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;

