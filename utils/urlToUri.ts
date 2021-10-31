export async function urlToUri(url: string): Promise<string> {
  return await fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = function () {
            resolve(this.result as string)
          }
          reader.readAsDataURL(blob)
        })
    )
}
