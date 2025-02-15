import User, { UserDocument } from "../db/userModel";
import CrudRepository from "./CrudRespository";

class UserRepository extends CrudRepository<UserDocument> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string) {
    return await this.findOne({ email });
  }
}

export default UserRepository;
