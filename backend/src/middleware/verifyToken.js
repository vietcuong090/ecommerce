const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  try {
    // Lấy token từ header 'Authorization'
    const token = req.cookies.token;
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).send({ message: 'Token không hợp lệ' });
    }

    // Xác minh token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(401).send({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }

    // Lưu thông tin userId và role vào request
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.log('Error while verifying token:', error);
    res.status(401).send({ message: 'Error while verifying token' });
  }
};

module.exports = verifyToken;
