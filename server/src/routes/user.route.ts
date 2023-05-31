import express, { Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import { uuid } from "uuidv4";
import { __error } from "../utils";
import User from "../models/User.model";

const upload = multer({ dest: "assets/" });

const router = express.Router();

router.route("/ping").get((req: Request, res: Response) => {
  res.status(200).send("Hi from server");
});

/**
 * @route [POST] /users
 * @description creates a new user.
 * @param {string} name
 * @param {string} lastName
 * @param {string} phoneNumber
 * @param {string} email
 * @param {number} age
 * @param {string} avatar
 * @param {file} avatarFile has the higher priority if exists, will replace 'avatar' field with the uploaded file.
 * @param {string} linkToWebsite
 * @param {string} tags comma-separated tags
 * @returns { status: boolean; message: string; data: User; } success response
 */
router.post("/", upload.single("avatarFile"), (req: Request, res: Response) => {
  return Promise.resolve()
    .then(() => {
      const user = User.build({
        ...req.body,
        owner: "0x0A92DD7B30f0f57343AD99a151dBC37a3F3F95F3",
      });

      if (req.file) {
        const ext = req.file.originalname.split(".").pop();
        const filename = `${uuid()}.${ext}`;
        fs.renameSync(req.file.path, `assets/${filename}`);

        const domain = `${req.protocol}://${req.get("host")}`;
        user.avatar = `${domain}/${filename}`;
      }

      return user.save();
    })
    .then((user) => {
      return res.json({
        status: true,
        message: "User created successfully!",
        data: user,
      });
    })
    .catch((error) => __error(res, error));
});

/**
 * @route [GET] /users/:id
 * @description returns a user for a given id.
 * @param {string} id The id of the user
 * @returns {status: boolean; message: string; data: User } success response
 *
 */
router.get("/:id", (req: Request, res: Response) => {
  return User.findOne({
    where: { id: req.params.id },
  }).then((user) =>
    res.json({ status: true, message: "success", data: user })
  );
});

/**
 * @route [GET] /users
 * @description get the user list by limit & page.
 * @param {string} limit the maximum number of user to load in a request. in query.
 * @param {string} page the page index starting from 1. in query.
 * @returns { status: boolean; message: string; data: User[] } success response
 */
router.get("/", (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const offset = (page - 1) * limit;

  return User.findAll({
    limit,
    offset,
  })
    .then((users) =>
      res.json({ status: true, message: "success", data: users })
    )
    .catch((error) => __error(res, error));
});

/**
 * @route [PATCH] /users/:id
 * @description updates a user by id.
 * @param {string} id The id of the user.
 * @param {...User} _ same payload as in [POST] /users
 * @returns { status: boolean; message: string; data: User }
 */
router.patch(
  "/:id",
  upload.single("avatarFile"),
  (req: Request, res: Response) => {
    return Promise.resolve()
      .then(() => {
        const user = {
          ...req.body,
          owner: "0x0A92DD7B30f0f57343AD99a151dBC37a3F3F95F3",
        };
        if (req.file) {
          const ext = req.file.originalname.split(".").pop();
          const filename = `${uuid()}.${ext}`;
          fs.renameSync(req.file.path, `assets/${filename}`);

          const domain = `${req.protocol}://${req.get("host")}`;
          user.avatar = `${domain}/${filename}`;
        }
        return User.update(user, { where: { id: req.params.id } });
      })
      .then(() => User.findOne({ where: { id: req.params.id } }))
      .then((user) =>
        res.json({ status: true, message: "success", data: user })
      )
      .catch((error) => __error(res, error));
  }
);

/**
 * @route [DELETE] /users/:id
 * @description delete a user by id.
 * @param {string} id The id of the user.
 * @returns { status: boolean, message: string, data: User }
 */
router.delete("/:id", (req: Request, res: Response) => {
  return User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      return User.destroy({ where: { id: req.params.id } }).then(() =>
        res.json({
          status: true,
          message: "success",
          data: user,
        })
      );
    })
    .catch((error) => __error(res, error));
});

export default router;
