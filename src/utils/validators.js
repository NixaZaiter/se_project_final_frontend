function usernameValidation(vals, next) {
  const username = (vals.username || "").trim();
  if (!username) {
    next.username = "Username is required.";
  } else if (username.length < 2) {
    next.username = "Username must be at least 2 characters.";
  } else if (username.length > 30) {
    next.username = "Username must be 30 characters or less.";
  }
}
function emailValidation(vals, next) {
  const email = (vals.email || "").trim();
  if (!email) {
    next.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    next.email = "Email is invalid.";
  }
}

export const validateAddItem = (vals) => {
  const next = { name: "", imageUrl: "", weather: "" };

  const name = (vals.name || "").trim();
  if (name.length < 2) next.name = "Name must be at least 2 characters.";
  else if (name.length > 15) next.name = "Name must be 15 characters or less.";

  const imageStr = (vals.imageUrl || "").trim();
  const isDataImage = imageStr.startsWith("data:image/");

  if (!imageStr) {
    next.imageUrl = "Please enter a valid image URL.";
  } else if (isDataImage) {
    // data:image/... accepted
  } else {
    try {
      const url = new URL(imageStr);
      if (!["http:", "https:"].includes(url.protocol)) {
        next.imageUrl = "Image URL must use http or https.";
      } else {
        // ensure URL looks like an image (common extensions). Accept query/hash after extension.
        const imageExtPattern = /\.(png|jpe?g|gif|webp|svg)(?:[?#].*)?$/i;
        if (
          !imageExtPattern.test(url.pathname) &&
          !imageExtPattern.test(url.href)
        ) {
          next.imageUrl =
            "Image URL must point to an image (png, jpg, gif, webp, svg).";
        }
      }
    } catch {
      next.imageUrl = "Please enter a valid image URL.";
    }
  }

  if (!["hot", "warm", "cold"].includes(vals.weather)) {
    next.weather = "Please select a weather type.";
  }

  return next;
};

export const validateLogin = (vals) => {
  const next = { email: "", password: "" };
  const password = (vals.password || "").trim();
  if (!password) {
    next.password = "Password is required.";
  }
  if (password && password.length < 6) {
    next.password = "Passwords are at least 6 characters long.";
  }
  emailValidation(vals, next);
  return next;
};

export const validateSignup = (vals) => {
  const next = { email: "", password: "", username: "" };
  const password = (vals.password || "").trim();
  if (!password) {
    next.password = "Password is required.";
  } else if (password.length < 6) {
    next.password = "Password must be at least 6 characters.";
  }
  emailValidation(vals, next);
  usernameValidation(vals, next);

  return next;
};

// export const validateEditProfile = (vals) => {
//   const next = { username: "", avatarURL: "" };

//   usernameValidation(vals, next);
//   avatarValidation(vals, next);

//   return next;
// };
