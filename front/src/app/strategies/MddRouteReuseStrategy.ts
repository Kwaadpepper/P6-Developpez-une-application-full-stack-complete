import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router'
import _ from 'lodash'

/** Interface for object which can store both:
 * An ActivatedRouteSnapshot, which is useful for determining whether or not you should attach a route (see this.shouldAttach)
 * A DetachedRouteHandle, which is offered up by this.retrieve, in the case that you do want to attach the stored route
 */
interface RouteStorageObject {
  snapshot: ActivatedRouteSnapshot
  handle: DetachedRouteHandle
}

export class MddRouteReuseStrategy implements RouteReuseStrategy {
  /**
     * Object which will store RouteStorageObjects indexed by keys
     * The keys will all be a path (as in route.routeConfig.path)
     * This allows us to see if we've got a route stored for the requested path
     */
  storedRoutes: Map<string, RouteStorageObject> = new Map<string, RouteStorageObject>()

  /**
     * Decides when the route should be stored
     * If the route should be stored, I believe the boolean is indicating to a controller whether or not to fire this.store
     * _When_ it is called though does not particularly matter, just know that this determines whether or not we store the route
     * An idea of what to do here: check the route.routeConfig.path to see if it is a path you would like to store
     * @param route This is, at least as I understand it, the route that the user is currently on, and we would like to know if we want to store it
     * @returns boolean indicating that we want to (true) or do not want to (false) store that route
     */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const detach = route.data['reuse'] === true
    console.debug('detaching', route, 'return: ', detach)
    return detach
  }

  /**
     * Constructs object of type `RouteStorageObject` to store, and then stores it for later attachment
     * @param route This is stored for later comparison to requested routes, see `this.shouldAttach`
     * @param handle Later to be retrieved by this.retrieve, and offered up to whatever controller is using this class
     */
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const storedRoute: RouteStorageObject = {
      snapshot: route,
      handle: handle,
    }

    console.debug('store:', storedRoute, 'into: ', this.storedRoutes)
    // routes are stored by path - the key is the path name, and the handle is stored under it so that you can only ever have one object stored for a single path
    if (route.routeConfig && route.routeConfig.path) {
      this.storedRoutes.set(route.routeConfig.path, storedRoute)
    }
  }

  /**
     * Determines whether or not there is a stored route and, if there is, whether or not it should be rendered in place of requested route
     * @param route The route the user requested
     * @returns boolean indicating whether or not to render the stored route
     */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // this will be true if the route has been stored before
    const routeConfigPath = route.routeConfig?.path
    const routeconfig = routeConfigPath ? this.storedRoutes.get(routeConfigPath) : undefined

    // this decides whether the route already stored should be rendered in place of the requested route, and is the return value
    // at this point we already know that the paths match because the storedResults key is the route.routeConfig.path
    // so, if the route.params and route.queryParams also match, then we should reuse the component
    if (routeconfig === undefined) {
      return false
    }

    const paramsMatch: boolean = this.compareObjects(route.params, routeconfig.snapshot.params)
    const queryParamsMatch: boolean = this.compareObjects(route.queryParams, routeconfig.snapshot.queryParams)

    return paramsMatch && queryParamsMatch
  }

  /**
     * Finds the locally stored instance of the requested route, if it exists, and returns it
     * @param route New route the user has requested
     * @returns DetachedRouteHandle object which can be used to render the component
     */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const routeConfigPath = route.routeConfig?.path
    const routeconfig = routeConfigPath ? this.storedRoutes.get(routeConfigPath) : undefined

    // return null if the path does not have a routerConfig OR if there is no stored route for that routerConfig
    if (routeconfig === undefined) {
      return null
    }

    /** returns handle when the route.routeConfig.path is already stored */

    return routeconfig.handle
  }

  /**
     * Determines whether or not the current route should be reused
     * @param future The route the user is going to, as triggered by the router
     * @param curr The route the user is currently on
     * @returns boolean basically indicating true if the user intends to leave the current route
     */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return curr.routeConfig?.data?.['reuse'] === true
  }

  /**
     * This nasty bugger finds out whether the objects are _traditionally_ equal to each other, like you might assume someone else would have put this function in vanilla JS already
     * One thing to note is that it uses coercive comparison (==) on properties which both objects have, not strict comparison (===)
     * @param base The base object which you would like to compare another object to
     * @param compare The object to compare to base
     * @returns boolean indicating whether or not the objects have all the same properties and those properties are ==
     */
  private compareObjects(base: object, compare: object): boolean {
    return _.isEqual(base, compare)
  }
}
