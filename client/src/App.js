import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/posts')
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err.response, 'No posts for you!')
      })
  })
  return (
    <div className="App">
      {posts.map(post => {
        return (
          <div key={post.id} className='postContainer'>
            <h2>Posts</h2>
            <h3>{post.title}</h3>
            <h3>{post.contents}</h3>
          </div>
        )
      })}
    </div>
  );
}

export default App;