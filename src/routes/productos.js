const express = require("express");
const router = express.Router();
const productos = require("../api/productos");

router.get("/listar", async (req, res) => {
  try {
    const prods = await productos.listar();
    if (prods.length > 0) {
      res.json(prods);
    } else {
      res.json({ error: "no hay productos cargados" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/listar/:id", async (req, res) => {
  try {
    const prod = await productos.listarPorId(req.params.id);
    if (prod) {
      res.json(prod);
    } else {
      res.json({ error: "producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/agregar", async (req, res) => {
  try {
    const { title, price, thumbnail } = req.body;
    if (title && price && thumbnail) {
      const prod = await productos.guardar({ title, price, thumbnail });
      res.json(prod);
    } else {
      res.json({ error: "debe ingresar title, price y thumbnail" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/actualizar/:id", async (req, res) => {
  try {
    const { title, price, thumbnail } = req.body;
    const id = req.params.id;
    const prod = await productos.actualizar({ id, title, price, thumbnail });
    if (prod) {
      res.json(prod);
    } else {
      res.json({ error: "producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/borrar/:id", async (req, res) => {
  try {
    const prod = await productos.borrar(req.params.id);
    if (prod) {
      res.json(prod);
    } else {
      res.json({ error: "producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
