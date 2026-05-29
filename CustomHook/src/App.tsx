import  useFetch from "./useFetch";

type User = {
  address: {
    city: string;
    geo: { lat: string; lng: string };
    street: string;
    suite: string;
    zipcode: string;
  };
  company: { name: string; catchPhrase: string; bs: string };
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
};

const App = () => {
  // console.log(useFetch('https://jsonplaceholder.typicode.com/users').data);
  const { data, loading, error } = useFetch<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  )

  return (
    <div>
      <h1>Custom Hook Usage</h1>
      <p>{loading ? 'Loading...' : ''}</p>
      <p>{error ? 'Error' + error : ''}</p>
      {data?.map((user) => (
        <p key={user.id}>{user.name} {user.email}</p>
      ))}
    </div>
  )
}

export default App;