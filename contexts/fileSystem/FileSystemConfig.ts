import { type FileSystemConfiguration } from "utils/browserfsCompat";
import { fs9pToBfs } from "contexts/fileSystem/core";

const index = fs9pToBfs();

const FileSystemConfig = (writeToMemory = false): FileSystemConfiguration => ({
  fs: "MountableFileSystem",
  options: {
    "/": {
      fs: "OverlayFS",
      options: {
        readable: {
          fs: "HTTPRequest",
          options: { index },
        },
        writable: {
          fs: writeToMemory ? "InMemory" : "IndexedDB",
        },
      },
    },
  },
});

export default FileSystemConfig;
