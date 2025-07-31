export const generateAvatar = (nameOrEmail) => {
  const base = encodeURIComponent(nameOrEmail);
  console.log("Picture generated")
  return `https://ui-avatars.com/api/?name=${base}&background=random&color=fff`;
};