import { useState, useEffect } from "react";
import axios from "axios";

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

type UserCardProps = {
  user: User
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div
      style={{
        border: "1px, solid, black",
        margin: "5px",
        padding: "5px",
        borderRadius: "10px",
      }}
    >
      <h3>User Info</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>City: {user.address.city}</p>
    </div>
  );
};

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");

  const getLastName = (fullName: string): string => {
    const trimmed = fullName.trim();
    const parts = trimmed.split(" ");
    return parts.length > 0 ? parts[parts.length - 1] : "";
  };

  const sortedUsers = [...users].sort((a, b) => {
    const lastNameA = getLastName(a.name);
    const lastNameB = getLastName(b.name);

    return isAscending
      ? lastNameA.localeCompare(lastNameB)
      : lastNameB.localeCompare(lastNameA);
  });

  const filteredUsers = sortedUsers.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users",
        );
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch data: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div>
      <h1>User List</h1>
      <button onClick={() => setIsAscending(!isAscending)}>
        Sort: {isAscending ? "A to Z" : "Z to A"}
      </button>
      <div>
        <input
          type="text"
          placeholder="Search Users..."
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
      </div>
      <p>{loading ? "Loading..." : ""}</p>
      <p>{error ? error : ""}</p>
      {filteredUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default App;
