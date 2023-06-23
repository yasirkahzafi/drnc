export function getFileName(url: string) {
  return decodeURIComponent(new URL(url).pathname.split("/").pop()!);
}
