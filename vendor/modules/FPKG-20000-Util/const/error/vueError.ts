
/**
 * Vue Error Structor
 * @param message: string;
 * @param code: number;
 */
type VueErrorStructor = IVueError;

interface IVueError {
  code: number;
  message?: string,
}

class VueError extends Error implements IVueError {
  code: number;

  constructor(params: VueErrorStructor) {
    super(params.message);
    this.name = 'VueError';
    this.code = params.code;
  }
}

export default VueError;

export { IVueError, VueErrorStructor };
