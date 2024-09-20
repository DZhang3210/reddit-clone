import { convexAuth } from "@convex-dev/auth/server";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
import { DataModel } from "./_generated/dataModel";

const CustomPassword = Password<DataModel>({
  profile(params) {
    return {
      email: params.email as string,
      name: params.name as string,
      likedPosts: [],
      followingThreads: [],
      savedPosts: [],
    };
  },
});

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [CustomPassword, Google, GitHub],
  // providers: [
  //   CustomPassword,
  //   Google({
  //     profile(googleProfile, tokens) {
  //       return {
  //         name: googleProfile.name,
  //         email: googleProfile.email,
  //         image: googleProfile.avatar_url,

  //         likedPosts: [],
  //         followingThread: [],
  //         savedPosts: [],
  //       };
  //     },
  //   }),
  //   GitHub({
  //     profile(githubProfile, tokens) {
  //       return {
  //         name: githubProfile.name || "",
  //         email: githubProfile.email || "",
  //         image: githubProfile.avatar_url || "",
  //         likedPosts: [],
  //         followingThread: [],
  //         savedPosts: [],
  //       };
  //     },
  //   }),
  // ],
});
