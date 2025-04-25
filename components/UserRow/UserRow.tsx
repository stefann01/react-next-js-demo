import { UserDetails } from '../../types';

function UserRow({ user }: { user: UserDetails }) {
  return (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>
        {user.address.street}, {user.address.suite}, {user.address.city},{' '}
        {user.address.zipcode}
      </td>
      <td>{user.phone}</td>
      <td>
        <a
          href={`http://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {user.website}
        </a>
      </td>
      <td>{user.company.name}</td>
    </tr>
  );
}

export default UserRow;
