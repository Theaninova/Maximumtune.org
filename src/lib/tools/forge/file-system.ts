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

  constructor(readonly native: FileSystemEntry) {}

  async readdir(path: string, options?: FileSystemFlags): Promise<FileSystem[]> {
    return new Promise((resolve, reject) =>
      (this.native as FileSystemDirectoryEntry).getDirectory(
        path,
        options,
        (entry: FileSystemDirectoryEntry) => {
          entry.createReader().readEntries(entries => resolve(entries.map(it => new FileSystem(it))))
        },
        error => reject(error),
      ),
    )
  }
}
