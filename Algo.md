## Dropdown Class

- params (labels, methods)

methods

- createSelect(labels)
  créé le DOM avec les différents labels comme options return le DOM

- onChange(methods)
  au clic d'une option, comparer la data-value du select avec la value de methods et lancer la méthode de sort appropriée

## PhotographerPage Class

- params (wrapper, id, photographerList, dropdown)

methods

- appendDOMtoWrapper(wrapper)
  - create Header()
  - getPhotographerInfosSection(photographerList)
  - getDropDown(Dropdown)
