import Post from '@/components/Post';
import { cookieBasedClient, isAuthenticated } from '@/utils/amplify-utils';
import { onDelete } from './_actions/actions';

export default async function Home() {
  const entries = await getEntries(); // Call data fetching function

  const isSignedIn = await isAuthenticated();
  if (!isSignedIn) {
    return <div className='text-center pt-20'>You are not signed in. Please sign in to access your journal entries.</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>List of all Journal Entries</h1>
      {entries.map((entry, key) => (
        // <div key={entry.id}>{entry.title}</div>
        <Post key={key} post={entry} onDelete={onDelete} isSignedIn={isSignedIn}/>
      ))}
    </main>
  );
}

async function getEntries() {
  try {
    const isSignedIn = await isAuthenticated();
    if (!isSignedIn) {
      return []; // User not authenticated, return empty array
    }

    const { data: fetchedEntries } = await cookieBasedClient.models.Entry.list({
      selectionSet: ['title', 'id'],
      authMode: 'userPool',
    });
    return fetchedEntries;
  } catch (err) {
    console.error('Error fetching entries:', err);
    return []; // Return empty array on error
  }
}
