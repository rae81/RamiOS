const S_IFMT = 0o170000;
const S_IFREG = 0o100000;
const S_IFDIR = 0o040000;
const S_IFLNK = 0o120000;

export enum FileType {
  FILE = S_IFREG,
  DIRECTORY = S_IFDIR,
  SYMLINK = S_IFLNK,
}

export class Stats {
  public atimeMs: number;

  public birthtimeMs: number;

  public blksize = 4096;

  public blocks: number;

  public ctimeMs: number;

  public dev = 0;

  public fileData: Buffer | null = null;

  public gid = 0;

  public ino = 0;

  public mode: number;

  public mtimeMs: number;

  public nlink = 1;

  public rdev = 0;

  public size: number;

  public uid = 0;

  public get atime(): Date {
    return new Date(this.atimeMs);
  }

  public get birthtime(): Date {
    return new Date(this.birthtimeMs);
  }

  public get ctime(): Date {
    return new Date(this.ctimeMs);
  }

  public get mtime(): Date {
    return new Date(this.mtimeMs);
  }

  constructor(
    itemType: FileType,
    size: number,
    mode?: number,
    atimeMs = Date.now(),
    mtimeMs = atimeMs,
    ctimeMs = mtimeMs,
    uid = 0,
    gid = 0,
    birthtimeMs = ctimeMs
  ) {
    this.size = size;
    this.atimeMs = atimeMs;
    this.mtimeMs = mtimeMs;
    this.ctimeMs = ctimeMs;
    this.birthtimeMs = birthtimeMs;
    this.uid = uid;
    this.gid = gid;
    this.mode = mode || (itemType === FileType.FILE ? 0o644 : 0o777) | itemType;
    this.blocks = Math.ceil(size / 512);
  }

  public isBlockDevice(): boolean {
    return false;
  }

  public isCharacterDevice(): boolean {
    return false;
  }

  public isDirectory(): boolean {
    return (this.mode & S_IFMT) === S_IFDIR;
  }

  public isFIFO(): boolean {
    return false;
  }

  public isFile(): boolean {
    return (this.mode & S_IFMT) === S_IFREG;
  }

  public isSocket(): boolean {
    return false;
  }

  public isSymbolicLink(): boolean {
    return (this.mode & S_IFMT) === S_IFLNK;
  }
}

export type ApiError = Error & {
  code: string;
  path?: string;
};

export type BFSCallback<T> = (error?: ApiError | null, value?: T) => unknown;

export type FileSystem = Record<string, unknown>;

export type FileSystemConfiguration = {
  fs: string;
  options?: Record<string, FileSystemConfiguration | object | string>;
};

type FsCallback<T = unknown> = (error?: ApiError | null, value?: T) => unknown;

export type FSModule = {
  [key: string]: unknown;
  exists?: (path: string, callback: (exists: boolean) => void) => void;
  getRootFS?: () => MountableFileSystem;
  lstat?: (path: string, callback: FsCallback<Stats>) => void;
  mkdir?: (
    path: string,
    options: unknown,
    callback: (error?: ApiError | null) => void
  ) => void;
  readFile?: (
    path: string,
    callback: FsCallback<Buffer>
  ) => void;
  readdir?: (
    path: string,
    callback: FsCallback<string[]>
  ) => void;
  rename?: (
    oldPath: string,
    newPath: string,
    callback: (error?: ApiError | null) => void
  ) => void;
  rmdir?: (
    path: string,
    callback: (error?: ApiError | null) => void
  ) => void;
  stat?: (path: string, callback: FsCallback<Stats>) => void;
  unlink?: (
    path: string,
    callback: (error?: ApiError | null) => void
  ) => void;
  writeFile?: (
    path: string,
    data: Buffer | string,
    options: unknown,
    callback: (error?: ApiError | null) => void
  ) => void;
};

type CacheMap = Map<string, unknown> | Record<string, unknown>;

type CreatedFs = {
  _FS?: {
    DB_NAME: () => string;
    DB_STORE_NAME: string;
  };
  _cache?: {
    map?: CacheMap;
  };
  _data?: Buffer;
  data?: Buffer;
  empty?: (callback?: (error?: ApiError | null) => void) => void;
  getName?: () => string;
};

export type HTTPRequest = CreatedFs;

export type InMemory = CreatedFs;

export type IndexedDB = CreatedFs;

export type IsoFS = CreatedFs;

export type OverlayFS = CreatedFs & {
  getOverlayedFileSystems?: () => {
    readable?: HTTPRequest;
    writable?: IndexedDB | InMemory;
  };
};

export type ZipFS = CreatedFs;

export type EmscriptenFileSystem = CreatedFs;

export type MountableFileSystem = FSModule & {
  _getFs?: (path: string) => { fs?: unknown } | undefined;
  mntMap: Record<string, unknown>;
  mount?: (path: string, fileSystem: unknown) => void;
  mountList: string[];
  umount?: (path: string) => void;
};

type CreateFactory<T = unknown> = {
  Create?: (options: object, callback: BFSCallback<T>) => void;
};

export type BrowserFSModule = {
  BFSRequire: (name: string) => FSModule;
  EmscriptenFS?: unknown;
  FileSystem: {
    Emscripten?: CreateFactory<EmscriptenFileSystem>;
    FileSystemAccess?: CreateFactory<FileSystem>;
    HTTPRequest?: CreateFactory<FileSystem>;
    InMemory?: CreateFactory<InMemory>;
    IndexedDB?: CreateFactory<IndexedDB>;
    IsoFS?: CreateFactory<IsoFS>;
    MountableFileSystem?: CreateFactory<MountableFileSystem>;
    OverlayFS?: CreateFactory<OverlayFS>;
    ZipFS?: CreateFactory<ZipFS>;
  };
  configure: (
    config: FileSystemConfiguration,
    callback: () => void
  ) => void;
};
