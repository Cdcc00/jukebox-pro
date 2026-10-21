import express from "express";
const router = express.Router();
export default router;
import requireBody from "#middleware/requireBody";
import {
  createUser,
  getUserById,
  getUserByUsernameAndPassword,
} from "#db/queries/users";
import { createToken } from "#utils/jwt";

router
  .route("/register")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser({ username, password });
    const token = createToken({ id: user.id });
    res.status(201).send(token);
  });

router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);

    if (!user) return res.status(401).send("No user found.");

    const token = createToken({ id: user.id });
    res.status(200).send(token);
  });
