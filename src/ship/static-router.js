import express from "express";

export default function staticRouter({ Hull }) {
  const router = express.Router();
  const { Routes } = Hull;
  const { Readme, Manifest } = Routes;

  router.use(express.static(`${process.cwd()}/dist`));
  router.use(express.static(`${process.cwd()}/assets`));

  router.get("/manifest.json", Manifest(`${process.cwd()}/dir`));
  router.get("/", Readme);
  router.get("/readme", Readme);

  return router;
}
