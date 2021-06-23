## onLoad

X - json = JSON(photographers, medias)
X - urlID = URL ID param
X - wrapperDOM = DOM wrapper element

- arrays :

X - dropdownLabels : [
{
value: 'popularity',
label: 'Popularité'
},
...
]
X - dropdownSortMethods : [
{
value : 'popularity',
sort : sorByPopularity
},
...
]

- photographerArray(chaque Photographer)
  Loop chaque photographer dans json.photographers
  pour son id, on crée une array depuis json.medias qui contient tous les medias avec l'id correspondante
  on créé ensuite une nouvelle instance de Photograph avec photograph et l'array des medias comme params
  on ajoute cette instance à l'array photographerArray

- objects instanciation :
  - Photographer(json.photographers, mediasArray)
  - PhotographerList(photographerArray)
  - Homepage(wrapperDOM, PhotographerList)
  - PhotographerPage(wrapperDOM, PhotographerList, urlID, DropDown)
  - Dropdown(labels, sortMethods)

## Photographer Class

- params (photographerObject, mediasArray)

methods

- createHomePageArticle()
  construit le DOM à partir de photographerObject et renvoie le DOM

- createPhotographerInfosSection()
  construit le DOM du header pour la page photographe et le return

## PhotographerList Class

- params (photographerListArray)

methods

- createPhotographerList()

## Dropdown Class

- params (labels, methods)

methods

- createSelect(labels)
  créé le DOM avec les différents labels comme options return le DOM

- onChange(methods)
  au clic d'une option, comparer la data-value du select avec la value de methods et lancer la méthode de sort appropriée

## Homepage Class

- params (wrapperDOM, PhotographerList)

methods

- appendDOMtoWrapper
  - create header(PhotographerList)
    - createLogo
    - createNav
      tags Set (PhotographerList)
      loop tous les tags de chaque photographer
      ajoute chaque tag dans le set pour avoir une collection unique
  - getPhotographerListDOM(PhotographerList)
  - create backToTopBtn()

## PhotographerPage Class

- params (wrapper, id, photographerList, dropdown)

methods

- appendDOMtoWrapper(wrapper)
  - create Header()
  - getPhotographerInfosSection(photographerList)
  - getDropDown(Dropdown)
