import React from 'react';
import styles from './users.module.css';
import { UserDetails } from '../../types';
import UserRow from '../../components/UserRow';

function UsersPage({ users }: { users: UserDetails[] }) {
  if (!users || users.length === 0) {
    return (
      <div className={styles.usersPage}>
        <h1 className={styles.title}>Users List</h1>
        <p>No users found.</p>
      </div>
    );
  }

  return (
    <div className={styles.usersPage}>
      <h1 className={styles.title}>Users List</h1>
      <div className={styles.tableContainer}>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersPage;

export async function getServerSideProps() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    return {
      props: { users },
    };
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return {
      props: { users: [] },
    };
  }
}
