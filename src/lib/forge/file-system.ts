export class FileSystem {
  get isDirectory() {
    return this.native.isDirectory
  }

  get isFile() {
    return this.native.isFile
  }

  get name() {
    return this.native.name
  }

  get fullPath() {
    return this.native.fullPath
  }

  constructor(readonly native: FileSystemEntry, readonly root: FileSystem = null) {
    this.root ||= this
  }

  async getDirectory(path: string, options?: FileSystemFlags): Promise<FileSystem[]> {
    return new Promise((resolve, reject) =>
      (this.native as FileSystemDirectoryEntry).getDirectory(
        path,
        options,
        (entry: FileSystemDirectoryEntry) => {
          entry
            .createReader()
            .readEntries(entries => resolve(entries.map(it => new FileSystem(it, this.root))))
        },
        error => reject(error),
      ),
    )
  }

  async getFile(path: string, options?: FileSystemFlags): Promise<File> {
    return new Promise((resolve, reject) =>
      (this.native as FileSystemDirectoryEntry).getFile(
        path,
        options,
        (entry: FileSystemEntry) =>
          (entry as FileSystemFileEntry).file(
            file => resolve(file),
            error => reject(error),
          ),
        error => reject(error),
      ),
    )
  }

  // TODO
  // async glob(pattern: string): Promise<File[]> {
  //   const minimatch = new Minimatch(pattern);
  //   const out: File[] = []
  //
  //   let currentDir = this.native as FileSystemDirectoryEntry
  //   currentDir.createReader().readEntries((entries) => {
  //
  //   })
  //   minimatch.match()
  // }
}
