import { gql, useQuery } from "@apollo/client";

const query = gql`
  query {
    posts {
      id
      title
    }
  }
`;

type post = {
  id: number;
  title: string;
};

const Graph: React.FC = () => {
  const { loading, error, data } = useQuery(query);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div>
      {data.posts.map((post: post) => (
        <div key={post.id}>
          {post.id}
          {post.title}
        </div>
      ))}
    </div>
  );
};

export default Graph;
