import { Resolver, InputType, Field, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ) {
    const { username, password } = options;
    const hashedPassword = await argon2.hash(password);
    const user = await em.create(User, {
      username: username,
      password: hashedPassword,
    });

    await em.persistAndFlush(user);

    return user;
  }
}
