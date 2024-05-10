import axios from "axios";
export var IPHTTP = "http://localhost:8800/api/";
const httprequest = axios.create({
  baseURL: `${IPHTTP}`,
});

export const get = async (apipath, options = {}) => {
  const response = await httprequest.get(apipath, options);
  return response.data;
};
export default httprequest;

// useEffect(() => {
//   const fetchPosts = async () => {
//     const res = await httprequest.get(
//       "posts/timeline/6635989182c5fb2b2edd592b"
//     );
//     return res;
//   };
//   fetchPosts();
// }, []);
