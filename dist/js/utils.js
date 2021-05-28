export const uppercaseFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const getPhotographTagSet = (photographers) => {
  const tagSet = new Set();

  photographers.forEach((photograph) => {
    photograph.tags.forEach((tag) => {
      tagSet.add(uppercaseFirstLetter(tag));
    });
  });
  return tagSet;
};

export const isImage = (media) => media.image !== undefined;

export const isSameTagText = (tag, tagClicked) =>
  tag.textContent.toLowerCase() === tagClicked.textContent.toLowerCase();
