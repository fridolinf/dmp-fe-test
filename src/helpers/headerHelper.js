export function HeaderAuth(token = localStorage.getItem("_d_idToken")) {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
}

export function Header() {
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
}
