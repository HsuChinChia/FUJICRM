import VueError, { IVueError } from './vueError';
import { ComponentPublicInstance } from "vue";

/**
 * Router Error Structor
 * @param message: string;
 * @param code: number;
 * @param vm: Vue;
 */
type routerErrorStructor = IRouterError;

interface IRouterError extends IVueError{
  vm: ComponentPublicInstance;
}

class RouterError extends VueError implements IRouterError {
  vm: ComponentPublicInstance;

  constructor(params: routerErrorStructor) {
    super(params);

    this.name = 'RouterError';
    this.vm = params.vm;
  }
}

export default RouterError;

export { routerErrorStructor };
