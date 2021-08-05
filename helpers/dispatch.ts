import redirectToRandomPlantPage from '../usecases/redirectToRandomPlantPage.ts'

export enum Msg {
  redirectToRandomPlantPage = 'redirectToRandomPlantPage'
}

// How to deal with dependency injection when dispatched from an effect
// could have an option to tell we want inject the dependency inside dispatch,

type dispatch = (msg: Msg, payload: any, deps: any) => Promise<any>
export const dispatch:dispatch = (msg, payload, deps) => {
  switch(msg) {
    case Msg.redirectToRandomPlantPage:
      return redirectToRandomPlantPage(payload)
  }
}
