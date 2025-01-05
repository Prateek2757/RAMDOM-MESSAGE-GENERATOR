"use client";
import { useSession, signIn, signOut } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed In As {session.user.email}
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <>
      <div className="text-red-600">Sign out</div>
      <button
        onClick={() => signIn()}
        className="bg-orange-500 px-3 py-2 mt-4 mx-4 rounded "
      >
        Sign In
      </button>
    </>
  );
};

export default page;
