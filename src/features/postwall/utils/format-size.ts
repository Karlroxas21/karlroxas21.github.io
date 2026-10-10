/** Asset sizes the way a download dialog shows them: "113 MB". */
export const formatSize = (bytes: number) => `${Math.round(bytes / 1_048_576)} MB`;
