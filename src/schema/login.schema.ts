import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           default: "teste@email.com"
 *         password:
 *           type: string
 *           default: "s3nh4_p0d3r054"
 *     LoginInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

const payload = {
  body: object({
    email: string({
      required_error: "E-mail is required",
    }),
    password: string({
      required_error: "Password is required",
    }),
  }),
};


export const loginSchema = object({
  ...payload,
});

export type LoginInput = TypeOf<typeof loginSchema>;

