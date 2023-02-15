const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Token = require("../models/Token");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: passwordHash,
  });

  const token = generateToken(user.email);
  const refresh_token = generateRefreshToken(user.email);
  await Token.create({
    userId: user._id,
    token: refresh_token,
  });

  res.cookie("token", token, { httpOnly: true });
  res.cookie("refresh_token", refresh_token, { httpOnly: true });

  return res.status(201).json({ message: "ユーザが作成されました。" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "メールアドレスかパスワードに誤りがあります。" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res
      .status(400)
      .json({ message: "メールアドレスかパスワードに誤りがあります。" });
  }

  const token = generateToken(user.email);
  const refresh_token = generateRefreshToken(user.email);
  await Token.create({
    userId: user._id,
    token: refresh_token,
  });

  res.cookie("token", token, { httpOnly: true });
  res.cookie("refresh_token", refresh_token, { httpOnly: true });

  return res.status(200).json({ message: "ログインに成功しました。" });
};

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const generateRefreshToken = (email) => {
  return jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
};

const user = async (req, res) => {
  const email = req.email;
  const user = await User.findOne({ email }).select("-password");
  if (!user) {
    return res.status(404).json({ message: "ユーザは存在しません。" });
  }

  return res.status(200).json({ user });
};

const revokeToken = async (req, res) => {
  const refresh_token = req.cookies.refresh_token;

  res.clearCookie("token");
  res.clearCookie("refresh_token");

  try {
    const token = await Token.findOne({ token: refresh_token });
    if (token) {
      await token.remove();
    }
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }

  return res.status(200).json({ message: "ログアウト処理が完了しました。" });
};

const refreshToken = async (req, res) => {
  const refresh_token = req.cookies.refresh_token;

  const token = await Token.findOne({ token: refresh_token });
  if (!token) {
    // DBに保存されていないリフレッシュトークンの場合は無効とみなす
    return res.status(401).json({ message: "有効でないトークンです。" });
  }

  jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "有効でないトークンです。" });
      } else {
        const email = decoded.email;
        const token = generateToken(email);

        return res
          .status(201)
          .json({ message: "新しいアクセストークンを作成しました。", token });
      }
    }
  );
};

exports.signup = signup;
exports.login = login;
exports.user = user;
exports.revokeToken = revokeToken;
exports.refreshToken = refreshToken;
