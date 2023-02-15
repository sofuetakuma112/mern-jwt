const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  user,
  revokeToken,
  refreshToken
} = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, user);
// ログアウトする際にCookiesを削除する必要がありますがCookiesの削除はバックエンド側で行います。
router.delete("/revoke_token", revokeToken);
router.get('/refresh_token', refreshToken);


module.exports = router;
