class NetworkError extends Error {
  constructor(message = "Network connection failure") {
    super(message);
    this.name = "NetworkError";
  }
}

export default NetworkError;
