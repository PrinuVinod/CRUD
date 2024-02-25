import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  // Simulate fetching user data based on user ID from the router query
  useEffect(() => {
    // Fetch user data from your API or database using router.query.userId
    const userId = router.query.userId;
    // Example API call or data fetching logic
    fetchUserData(userId);
  }, [router.query.userId]);

  const fetchUserData = async (userId) => {
    try {
      // Example API endpoint for fetching user data
      const response = await fetch(`/api/users/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {userData ? (
        <div>
          <p>
            <strong>User ID:</strong> {userData.id}
          </p>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          {/* Add more user information fields here */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
      <Link href="/">
        <a>Go back to home</a>
      </Link>
    </div>
  );
};

export default ProfilePage;
