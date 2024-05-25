import { cookieBasedClient } from "@/utils/amplify-utils";

export default async function Home() {

  const {data: entries} = await cookieBasedClient.models.Entry.list({
    selectionSet: ["title", "id"]
  })

  console.log(entries)
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1> List of all Journal entries</h1>
      {
        entries.map((entry) => {
          console.log(entry)
          return (
            <>{entry.title}</>
          )
        })
      }
    </main>
  );
}
