import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { err, loadConfig } from '../helpers/utils.js';

/**
@api {post} /api/auth/login Log In User
@apiVersion 1.0.0
@apiName LogIn
@apiGroup Auth

@apiParamExample {json} Request-Example:
{
	 "username": "tutormeplz",
	 "password": "kjsdkjsdj6777336d7sdbsjdbsjbdj"
}

@apiSuccess {String} token Auth token
@apiSuccessExample {json} Success-Response:
HTTP/1.1 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5MTkzYjhmLWE2MmYtNGQzMS05ZTQ3LWNiNDRiMmRkM2Y1ZiIsImlhdCI6MTU5NzQ5MzE2OH0.Kj6zdkvhD0_7Bb9dvnJr9oK3pu5mbO-_4JokBQC9BlU"
}
*/

const logIn = async (req, res) => {
  try {
    const config = await loadConfig();

    const adminUsername = config.adminUsername;
    const adminPasswordHash = config.adminPasswordHash;

    if (adminUsername !== req.body.username) {
      throw err(400, 'Invalid credentials');
    }

    if (adminPasswordHash !== req.body.password) {
      throw err(400, 'Invalid credentials');
    }

    const token = jwt.sign({ username: adminUsername }, config.jwtSecret);

    return res.send({ token });
  } catch (e) {
    console.log(e);

    if (e.status) {
      return res.status(e.status).send({ error: e.message });
    }
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

const hashPassword = async (req, res) => {
  try {
    const config = await loadConfig();

    const hashedPassword = crypto
      .pbkdf2Sync(req.body.password, config.adminSalt, 1000, 64, 'sha512')
      .toString('hex');

    return res.send({ hashedPassword });
  } catch (e) {
    console.log(e);

    if (e.status) {
      return res.status(e.status).send({ error: e.message });
    }
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

const authController = {
  logIn,
  hashPassword,
};

export default authController;
