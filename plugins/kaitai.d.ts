declare module "*.ksy" {
  const output: {
    new <T>(arrayBuffer: ArrayBuffer, parent?: unknown, root?: unknown): T
  }
  export default output
}
