// "use client";
// import { apiRequest } from "@/services/api";

// const addFriend = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     await apiRequest(
//       "/friends/send",   
//       "POST",
//       { email: friendEmail },
//       token
//     );

//     alert("Friend request sent");
//   } catch (err) {
//     alert(err.message);
//   }
// };



// const acceptRequest = async (requestId) => {
//   try {
//     const token = localStorage.getItem("token");

//     await apiRequest(
//       "/friends/accept",   
//       "POST",
//       { requestId },
//       token
//     );

//     alert("Friend added");
//   } catch (err) {
//     alert(err.message);
//   }
// };

// export default function FriendsPage() {
//   return (
//     <div>
//       Friends Page
//     </div>
//   );
// }