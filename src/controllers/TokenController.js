import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenCntroller {
  async login(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        erros: ['Credenciais invalidas'],
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        erros: ['Credenciais invalidas'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        erros: ['Credenciais invalidas'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}

export default new TokenCntroller();
