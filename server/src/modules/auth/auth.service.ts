import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./user.model";
import { env } from "../../config/env";
import { ApiError } from "../../utils/ApiError";

export const authService = {
  async signup(data: { name: string; email: string; password: string }) {
    const existing = await User.findOne({ email: data.email });
    if (existing) {
      throw new ApiError(409, "Email already in use");
    }

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashed,
    });

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      env.jwtSecret,
      { expiresIn: env.jwtExpiresIn } as jwt.SignOptions
    );

    return {
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    };
  },

  async login(data: { email: string; password: string }) {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      env.jwtSecret,
      { expiresIn: env.jwtExpiresIn } as jwt.SignOptions
    );

    return {
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    };
  },
};
