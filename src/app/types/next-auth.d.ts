// next-auth.d.ts
import 'next-auth';
import { DefaultSession } from 'next-auth';
import { Profile as GitHubProfile } from 'next-auth/providers/github';

// Extend the Profile interface for GitHub provider
declare module 'next-auth/providers/github' {
  interface Profile extends GitHubProfile {
    login: string; // GitHub login
    avatar_url: string; // GitHub avatar URL
  }
}

// Extend the NextAuth session interface
declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
      profilePic?: string; // Include if needed
      accessToken?: string; // Add accessToken here
    } & DefaultSession['user'];
    accessToken?: string; // Ensure accessToken is also here
  }

  // Extend the JWT interface
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
    profilePic?: string; // Include if needed
    accessToken?: string; // Add accessToken here
  }

  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
    profilePic?: string; // Include if needed
    accessToken?: string; // Add accessToken here
  }
}

// Extend the next-auth jwt module
declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
    profilePic?: string; // Include if needed
    accessToken?: string; // Add accessToken here
  }
}
