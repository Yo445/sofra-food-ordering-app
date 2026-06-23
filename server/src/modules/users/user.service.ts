import { User } from "../auth/user.model";
import { ApiError } from "../../utils/ApiError";

export const userService = {
  async getProfile(userId: string) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return { id: user._id, name: user.name, email: user.email, role: user.role };
  },
};
