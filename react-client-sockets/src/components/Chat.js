function Chat({ users }) {
  if (!users.length) {
    return <p>No users found.</p>;
  }

  return (
    <div className="user-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number || 'N/A'}</td>
              <td>              
            
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Chat;