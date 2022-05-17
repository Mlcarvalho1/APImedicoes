import User from '../models/User';

class UserService {
  store = (data) => User.create(data);
}

export default new UserService();
