import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers($usernames: [String]!) {
    getUser(usernames: $usernames) {
      name
      username
      avatar
      gitHub
      ranking
      solved {
        easySolved
        mediumSolved
        hardSolved
        solvedProblem
      }
    }
  }
`;

function App() {
  const { data, loading } = useQuery(GET_USERS, {
    variables: {
      usernames: ["ShivendraLeet", "Utkarsh-Mishra", "hemant-sharma_9782"],
    },
  });
  if (loading) {
    return <h1 className="text-center mt-5"><div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div></h1>;
  }

  const users = data.getUser;

  const sortusers = (users, key) => {
    return [...users].sort((a, b) => b.solved[key] - a.solved[key]); //the sorting will be automatically done in the descending order
  };

  const easySolvedKey = "easySolved";
  const mediumSolvedKey = "mediumSolved";
  const hardSolvedKey = "hardSolved";

  const easySortedUsers = sortusers(users, easySolvedKey);
  const mediumSortedUsers = sortusers(users, mediumSolvedKey);
  const hardSortedUsers = sortusers(users, hardSolvedKey);
  
  console.log(easySortedUsers)
  console.log(mediumSortedUsers )
  console.log(hardSortedUsers)
  return (

    
    <div className="container mt-5 bg-danger pt-5 rounded-3" >
      <h1 className="my-3 text-center text-light">Leaderboard for the coding enthus in Leetcode</h1>

      <div className="d-flex justify-content-center flex-wrap container mt-5">
        <div className="mx-5 mb-5">
          <h3 className="my-4 text-light">Difficulty -EASY</h3>

          {easySortedUsers.map((user, index) => {
           return <div key={index} className="card my-2">
              <div className="card-body">
                <i><p>{`${index + 1}: ${user.username} solved ${
                  user.solved.easySolved
                }`}</p></i>
              </div>
            </div>;
          })}
        </div>

        <div  className="mx-5 mb-5">
          <h3 className="my-4 text-light">Difficulty -MEDIUM</h3>

          {mediumSortedUsers.map((user, index) => {
            return <div key={index} className="card my-2">
              <div className="card-body">
               <i> <p>{`${index + 1}: ${user.username} solved ${
                  user.solved.mediumSolved
                }`}</p></i>
              </div>
            </div>;
          })}
        </div>

        <div  className="mx-5 mb-5">
          <h3 className="my-4 text-light">Difficulty -HARD</h3>

          {hardSortedUsers.map((user, index) => {
            return <div key={index} className="card my-2">
              <div className="card-body">
                <i><p>{`${index + 1}: ${user.username} solved ${
                  user.solved.hardSolved
                }`}</p></i>
              </div>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
