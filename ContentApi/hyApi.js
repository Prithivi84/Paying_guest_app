import request, { gql } from "graphql-request";

const Master_Url =
  "https://ap-south-1.cdn.hygraph.com/content/clytvdgmj01fo07vw4xm5e8sf/master";
const Upload_Url =
  "https://api-ap-south-1.hygraph.com/v2/clytvdgmj01fo07vw4xm5e8sf/master";

const GetRooms = async () => {
  const query = gql`
    query GetRooms {
      rooms {
        id
        noOfMembers
        roomName
        roomRent
        description
        createdAt
        updatedAt
      }
    }
  `;
  const results = await request(Master_Url, query);
  return results;
};
const GetMembers = async (id) => {
  const query = gql`
    query MyQuery {
      members(where: { room: { id: "${id}" } }) {
        aadharPhoto
        dateOfBirth
        email
        enrollDate
        gender
        id
        members
        passportPhoto
        phoneNo
        publishedAt
        vehicleNo
        updatedAt
      }
    }
  `;
  const results = await request(Master_Url, query);
  return results;
};
const SetMember = async (data) => {
  console.log("api", data);

  const query = gql`
    mutation MyMutation {
      createMember(
        data: {
          aadharPhoto: "${data.Aurl}"
          dateOfBirth: "${data.dateOfBirth}"
          email: "${data.email}"
          enrollDate: "${data.date}"
          gender: "${data.gender}"
          members: "${data.name}"
          passportPhoto: "${data.Purl}"
          phoneNo: ${data.No}
          room: { connect: { id: "${data.roomId}" } }
          vehicleNo: "${data.Vno}"
        }
      ) {
        id
      }
      publishManyMembers(to: PUBLISHED) {
        count
      }
    }
  `;
  const results = await request(Upload_Url, query);
  return results;
};
const SetNoMember = async (data) => {
  console.log("api", data);

  const query = gql`
    mutation MyMutation {
      updateRoom(
        data: { noOfMembers: ${data.no} }
        where: { id: "${data.roomId}" }
      ) {
        id
      }
      publishRoom(where: { id: "${data.roomId}" }, to: PUBLISHED) {
        id
      }
    }
  `;
  const results = await request(Upload_Url, query);
  return results;
};

export default {
  GetRooms,
  SetMember,
  SetNoMember,
  GetMembers,
};

// mutation MyMutation {
//       createMember(
//         data: {
//           aadharPhoto: "${data.Aurl}"
//           dateOfBirth: "${data.dateOfBirth}"
//           email: "${data.email}"
//           enrollDate: "${data.date}"
//           gender: "${data.gender}"
//           members: "${data.name}"
//           passportPhoto: "${data.Purl}"
//           phoneNo: ${data.no}
//           room: { connect: { id: "${data.roomId}" } }
//           vehicleNo: "${data.Vno}"
//         }
//       )
//       publishManyMembers(to: PUBLISHED) {
//         count
//       }
//     }
