/**
 * category controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async delete(ctx) {
      const { id } = ctx.params;

      // Cari kategori berdasarkan ID
      const category = await strapi.entityService.findOne(
        "api::category.category",
        id
      );

      if (!category) {
        return ctx.notFound("Category not found"); // Kirim status 404
      }

      // Jika ditemukan, hapus kategori
      await strapi.entityService.delete("api::category.category", id);

      return ctx.send({ message: "Category deleted successfully" });
    },
  })
);
