export const createSession = async ({
  password,
}: {
  password: string;
}): boolean => {
  const response = await fetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  if (response.ok) {
    return;
  }

  switch (response.status) {
    case 403:
      throw new Error("Incorrect password");
    default:
      throw new Error("Unknown error");
  }
};

export const listEntries = async () => {
  const response = await fetch("/api/entries", {
    method: "GET",
  });

  if (response.ok) {
    return await response.json();
  }

  switch (response.status) {
    case 401:
    case 403:
      throw new Error("Access denied");

    default:
      throw new Error("Unknown error");
  }
};
