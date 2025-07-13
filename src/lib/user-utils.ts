export interface DisplayUser {
  name: string;
  email: string;
  image: string;
}

export function getDisplayUser(user: any): DisplayUser {
  if (!user) {
    return {
      name: "Guest",
      email: "",
      image: "",
    };
  }

  // Extract first name only
  const fullName = user.name || user.email?.split("@")[0] || "User";
  const firstName = fullName.split(" ")[0];

  return {
    name: firstName,
    email: user.email || "",
    image: user.image || "",
  };
}