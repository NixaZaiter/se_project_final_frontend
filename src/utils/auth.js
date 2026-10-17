export const authorizeUser = async (data) => {
  const response = await fetch("./db.json");
  const database = await response.json();

  const user = database.users.find((u) => u.email === data.email);

  if (!user) {
    const notFoundError = new Error("User not found");
    notFoundError.status = 404;
    notFoundError.name = "NotFoundError";
    throw notFoundError;
  }
  if (user.password !== data.password) {
    const unauthorizedError = new Error("Incorrect password");
    unauthorizedError.status = 401;
    unauthorizedError.name = "UnauthorizedError";
    throw unauthorizedError;
  }
  return { ...user, token: "a fake token" };
};

export const checkToken = (data) => {
  // Pretend we did a fetch request that gave us back a user
  return new Promise((resolve, reject) => {
    if (!data.token) return null;
    resolve({ ...data, _id: "fake-id" });
    reject("Promise rejected");
  });
};
