import { object, string, array, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       required:
 *         - title
 *         - itemId
 *         - price
 *         - images
 *         - user
 *       properties:
 *         title:
 *           type: string
 *           default: "Pato de pelúcia"
 *         itemId:
 *           type: string
 *           default: "12345678"
 *         price:
 *           type: string
 *           default: "100.00"
 *         images:
 *           type: array
 *           default: ["https://imgur.com/t/duck/nSLx53D"]
 *         user:
 *           type: object
 *           default:
 *             id: 1234567
 *     CreateFavoriteInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         itemId:
 *           type: string
 *         price:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *     CreateFavoriteResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         itemId:
 *           type: string
 *         price:
 *           type: string
 *         images:
 *           type: array
 *         user:
 *           type: object
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     ListFavoritesResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           title:
 *             type: string
 *           itemId:
 *             type: string
 *           price:
 *             type: string
 *           images:
 *             type: array
 *           user:
 *             type: object
 *           createdAt:
 *             type: string
 *           updatedAt:
 *             type: string
 */


const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    itemId: string({
      required_error: "ItemId is required",
    }),
    price: string({
      required_error: "Price is required",
    }),
    images: array(string({
      required_error: "Images is required",
    })).min(1),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: "userId is required",
    }),
  }),
};


export const createFavoriteSchema = object({
  ...payload,
  ...params,
});

export type CreateFavoriteInput = TypeOf<typeof createFavoriteSchema>;

