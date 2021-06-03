export const uppercaseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

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

export const isSameTagText = (tag, tagClicked) => {
  return tag.textContent.toLowerCase() === tagClicked.textContent.toLowerCase();
};

export const sortByLikes = (a, b) => {
  return (
    parseInt(b.getAttribute('data-likes')) - parseInt(a.getAttribute('data-likes'))
  );
};

export const sortByDate = (a, b) => {
  const firstDate = new Date(a.getAttribute('data-date'));
  const secondDate = new Date(b.getAttribute('data-date'));

  return firstDate - secondDate;
};

export const sortByTitle = (a, b) => {
  const firstTitle = a.getAttribute('data-title').toLowerCase();
  const secondTitle = b.getAttribute('data-title').toLowerCase();

  if (firstTitle < secondTitle) {
    return -1;
  }
  if (firstTitle > secondTitle) {
    return 1;
  }
  return 0;
};
