export class CancelError extends Error {
    constructor() {
      super()
      this.message = 'Cancelled'
    }
  }
  