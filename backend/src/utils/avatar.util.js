export const generateAvatar = (nameOrEmail) => {
  const base = encodeURIComponent(nameOrEmail);
  return `https://ui-avatars.com/api/?name=${base}&background=random&color=fff`;
};
