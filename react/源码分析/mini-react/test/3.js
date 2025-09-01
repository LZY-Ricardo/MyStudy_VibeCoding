let root = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null
    },
    right: null
  },
  right: {
    val: 3,
    left: null,
    right: null
  }
}

let fiber = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {xxx}
    }
  }
}

let fiber2 = {
  val: 11,
  next: {
    val: 22,
    next: null
  }
}